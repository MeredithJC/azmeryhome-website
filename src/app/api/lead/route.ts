import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchemas, metaSchema } from "@/lib/forms/schemas";
import { formConfigs, leadMeta } from "@/lib/forms/configs";
import type { LeadType } from "@/lib/site";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (spec §18.4). Per-instance on serverless,
// but blocks rapid repeat submissions. For production hardening consider a
// shared store (e.g. Upstash) — noted for Phase 2.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const LEAD_TYPES = Object.keys(formConfigs) as LeadType[];

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { leadType, data, meta } = (payload ?? {}) as {
    leadType?: string;
    data?: unknown;
    meta?: unknown;
  };

  if (!leadType || !LEAD_TYPES.includes(leadType as LeadType)) {
    return NextResponse.json({ error: "Unknown form type." }, { status: 400 });
  }
  const type = leadType as LeadType;

  // Honeypot: if the hidden field is filled, silently accept but do nothing —
  // don't tip off bots (spec §18.4). Read the raw value before schema parsing.
  const rawHoneypot = (meta as { company_website?: unknown } | null)?.company_website;
  if (typeof rawHoneypot === "string" && rawHoneypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const metaParsed = metaSchema.safeParse(meta ?? {});

  // Server-side validation with the same schema the client used.
  const parsed = leadSchemas[type].safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const values = parsed.data as Record<string, unknown>;
  const subject = buildSubject(type, values, metaParsed.success ? metaParsed.data : {});
  const { text, html } = renderEmail(type, values, metaParsed.success ? metaParsed.data : {});

  // Deliver via Resend when configured. If not configured, accept the lead so
  // the UX works, but log clearly that no email was sent (spec §18.1, §24).
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.LEAD_INBOX_EMAIL || site.contact.email;
  const from = process.env.LEAD_FROM_EMAIL || "AZMERYHOME <onboarding@resend.dev>";

  if (!apiKey || !inbox) {
    console.warn(
      `[lead] RESEND not configured — lead NOT emailed. type=${type} subject="${subject}"`,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const replyTo = typeof values.email === "string" ? values.email : undefined;
    const { error } = await resend.emails.send({
      from,
      to: inbox,
      subject,
      replyTo,
      text,
      html,
    });
    if (error) {
      console.error("[lead] Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[lead] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}

/** Distinct subject lines per lead type (spec §18.4). */
function buildSubject(
  type: LeadType,
  values: Record<string, unknown>,
  meta: { propertyRef?: string },
): string {
  const base = leadMeta[type].subject;
  const ref =
    (typeof values.propertyAddress === "string" && values.propertyAddress) ||
    (typeof values.propertyOfInterest === "string" && values.propertyOfInterest) ||
    meta.propertyRef ||
    "";
  return ref ? `${base} — ${ref}` : base;
}

/** Render a readable text + HTML email using the config field labels. */
function renderEmail(
  type: LeadType,
  values: Record<string, unknown>,
  meta: { pageUrl?: string; propertyRef?: string; utm?: Record<string, string> },
): { text: string; html: string } {
  const config = formConfigs[type];
  const labelFor = (name: string) =>
    config.fields.find((f) => f.name === name)?.label ?? name;

  const rows: [string, string][] = [];
  for (const field of config.fields) {
    if (field.name === "consent" || field.name === "company_website") continue;
    const raw = values[field.name];
    if (raw == null || raw === "") continue;
    rows.push([labelFor(field.name), String(raw)]);
  }
  rows.push(["Consent to contact", values.consent ? "Yes" : "No"]);
  if (meta.pageUrl) rows.push(["Submitted from", meta.pageUrl]);
  if (meta.utm && Object.keys(meta.utm).length)
    rows.push(["UTM", JSON.stringify(meta.utm)]);
  rows.push(["Received", new Date().toISOString()]);

  const text =
    `${leadMeta[type].label}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#181d21;max-width:640px">
      <h2 style="color:#181d21;border-bottom:2px solid #b78423;padding-bottom:8px">
        ${leadMeta[type].label}
      </h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;background:#f4f2ee;font-weight:600;vertical-align:top;width:38%">${escapeHtml(
              k,
            )}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e6e3dc">${escapeHtml(
              v,
            )}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  return { text, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

"use client";

import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { LeadType } from "@/lib/site";
import { formConfigs } from "@/lib/forms/configs";
import { Field } from "./Fields";
import { Button } from "@/components/ui/Button";

/**
 * Generic, accessible lead form (spec §18.4). Driven by the declarative config
 * for `leadType`. Validates on the client with the shared zod schema, captures
 * source metadata + a honeypot, POSTs to /api/lead, and routes to the matching
 * thank-you page on success. react-hook-form preserves entered data on error.
 */
export function LeadForm({
  leadType,
  propertyRef,
}: {
  leadType: LeadType;
  /** Auto-populates "property of interest" when submitted from a property page. */
  propertyRef?: string;
}) {
  const config = formConfigs[leadType];
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Record<string, unknown>>({
    // config.schema is a union of object schemas typed loosely as ZodTypeAny;
    // cast to zodResolver's expected parameter type. Runtime validation is exact.
    resolver: zodResolver(
      config.schema as Parameters<typeof zodResolver>[0],
    ) as Resolver<Record<string, unknown>>,
    defaultValues: propertyRef
      ? { propertyOfInterest: propertyRef }
      : undefined,
  });

  async function onSubmit(values: Record<string, unknown>) {
    setSubmitError(null);
    try {
      const utm = collectUtm();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType,
          data: values,
          meta: {
            pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
            propertyRef,
            utm,
            // Honeypot value travels with the payload (see hidden input below).
            company_website: (values as { company_website?: string }).company_website ?? "",
          },
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      router.push(`/thank-you/${leadType}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {config.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            register={register}
            error={errors[field.name] as never}
          />
        ))}
      </div>

      {/* Honeypot — hidden from users, must stay empty (spec §18.4). */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Do not fill this field</label>
        <input
          id="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website")}
        />
      </div>

      {submitError && (
        <p role="alert" className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : config.submitLabel}
        </Button>
        <p className="text-xs text-slate">
          We respect your privacy. See our{" "}
          <a href="/privacy" className="underline hover:text-gold">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/** Pull UTM params from the current URL for source attribution (spec §18.4). */
function collectUtm(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return Object.keys(utm).length ? utm : undefined;
}

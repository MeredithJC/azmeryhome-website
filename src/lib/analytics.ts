import { track } from "@vercel/analytics";
import type { LeadType } from "./site";

/**
 * Privacy-conscious custom events (spec §14, §20). Conversions are defined by
 * lead type — not just total submissions — so the company can measure seller
 * leads, buyer inquiries, deals, capital and vendor conversions separately.
 * Safe no-op if analytics isn't loaded.
 */
export function trackLeadSubmit(leadType: LeadType, propertyRef?: string) {
  try {
    track("lead_submit", {
      leadType,
      ...(propertyRef ? { propertyRef } : {}),
    });
  } catch {
    // no-op
  }
}

/** Track a CTA click by audience/label (spec §14). */
export function trackCtaClick(label: string, href: string) {
  try {
    track("cta_click", { label, href });
  } catch {
    // no-op
  }
}

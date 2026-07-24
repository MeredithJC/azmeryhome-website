import type { Property } from "./types";

/**
 * Active + past property inventory (spec §6, §18.2).
 *
 * To add a property: append an object here and push — Vercel auto-deploys.
 * Sold properties are NOT deleted; setting status "sold" removes them from
 * active inventory while keeping them available as portfolio work (spec §6.4).
 *
 * NOTE: No active for-sale inventory has been provided yet. When the owner
 * supplies a real listing (address, price, listing-agent info, photos — spec
 * §24), add it here with status "for-sale" or "coming-soon".
 */
export const properties: Property[] = [];

export function getActiveProperties(): Property[] {
  return properties
    .filter((p) => p.status !== "sold")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getFeaturedProperties(): Property[] {
  // Prefer For Sale, then Coming Soon / Under Contract.
  return getActiveProperties();
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAllPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}

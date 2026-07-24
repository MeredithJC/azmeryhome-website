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

/*
 * ---------------------------------------------------------------------------
 * COPY-PASTE TEMPLATE — add a real listing by pasting an object like this one
 * into the `properties` array above, then push (Vercel auto-deploys). Put photos
 * under public/properties/<slug>/ and reference them by path. Delete fields that
 * don't apply; optional fields are marked. (Spec §18.2)
 * ---------------------------------------------------------------------------
 *
 * {
 *   slug: "1234-elm-st",                       // used in the URL: /properties/1234-elm-st
 *   status: "for-sale",                        // for-sale | under-contract | sold | coming-soon
 *   publicLocation: "1234 Elm Street",         // street address, or an approved public location
 *   city: "Houston",
 *   state: "TX",
 *   zip: "77002",                              // optional
 *   price: 379000,                             // optional — set null to hide price
 *   beds: 3,
 *   baths: 2,
 *   squareFeet: 1720,                          // optional
 *   propertyType: "Single-family residence",
 *   shortDescription: "Fully renovated 3-bed in the heart of Houston.",
 *   fullDescription: [
 *     "First paragraph written for home buyers (not investors).",
 *     "Second paragraph with more detail.",
 *   ],
 *   features: ["Open-concept living", "Two-car garage", "Large backyard"],
 *   renovationHighlights: ["New roof", "Quartz countertops", "Updated HVAC"],
 *   gallery: [
 *     { src: "/properties/1234-elm-st/kitchen.jpg", alt: "Renovated kitchen with quartz counters" },
 *     { src: "/properties/1234-elm-st/living.jpg",  alt: "Bright open-concept living room" },
 *   ],
 *   heroImage: { src: "/properties/1234-elm-st/front.jpg", alt: "Front exterior of 1234 Elm Street" }, // optional
 *   mapQuery: "1234 Elm Street, Houston, TX",   // optional — shows an embedded map
 *   listingAgent: {                             // optional — only when represented by a licensed agent
 *     name: "Agent Name",
 *     contact: "agent@brokerage.com",
 *     brokerage: "Brokerage Name",
 *   },
 *   publishedAt: "2026-07-23",                  // ISO date
 *   soldAt: undefined,                          // set an ISO date when sold
 *   seo: {
 *     title: "1234 Elm Street | Renovated Home for Sale in Houston",
 *     description: "3-bed, 2-bath renovated home in Houston by AZMERYHOME.",
 *   },
 *   linkedProjectSlug: "de-priest",             // optional — link to a Projects case study
 * }
 */

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

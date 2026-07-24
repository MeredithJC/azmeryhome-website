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
export const properties: Property[] = [
  {
    slug: "8414-de-priest-st",
    status: "for-sale",
    publicLocation: "8414 De Priest Street",
    city: "Houston",
    state: "TX",
    zip: "77088",
    price: 204999,
    beds: 3,
    baths: 2,
    squareFeet: 1560,
    propertyType: "Single-family residence",
    shortDescription:
      "A fully updated 3-bed, 2-bath brick home on a large, private lot in northwest Houston.",
    fullDescription: [
      "Freshly renovated and move-in ready, this three-bedroom, two-bath home in the Lincoln City area of northwest Houston pairs classic brick construction with modern updates throughout.",
      "Inside, you'll find new wood flooring across the entire home, a bright living area, and an updated kitchen with new appliances. Outside, a generous, tree-lined lot offers real privacy — including a newly installed front fence and a peaceful backyard view.",
    ],
    features: [
      "Brick exterior on all four sides",
      "Large 0.16-acre lot with mature trees",
      "Newly installed front fence",
      "Driveway gate",
      "Open living area",
      "Move-in ready",
    ],
    renovationHighlights: [
      "New roof",
      "New HVAC system",
      "New wood flooring throughout",
      "New kitchen appliances (refrigerator, oven, microwave)",
    ],
    heroImage: {
      src: "/projects/de-priest/after/after-03.jpg",
      alt: "Renovated exterior of 8414 De Priest Street — white brick home with a new roof",
    },
    gallery: [
      {
        src: "/projects/de-priest/after/after-07.jpg",
        alt: "Renovated kitchen with a center island, quartz counters and pendant lighting",
      },
      {
        src: "/projects/de-priest/after/after-04.jpg",
        alt: "Kitchen with new stainless steel appliances and white shaker cabinets",
      },
      {
        src: "/projects/de-priest/after/after-10.jpg",
        alt: "Kitchen island with a stainless sink and pendant lights",
      },
      {
        src: "/projects/de-priest/after/after-05.jpg",
        alt: "Open living area flowing into the kitchen with new wood-look flooring",
      },
      {
        src: "/projects/de-priest/after/after-08.jpg",
        alt: "Bright living room with a new front door and windows",
      },
      {
        src: "/projects/de-priest/after/after-01.jpg",
        alt: "Renovated bedroom with fresh paint and new flooring",
      },
      {
        src: "/projects/de-priest/after/after-06.jpg",
        alt: "Second bedroom with a ceiling fan and new flooring",
      },
      {
        src: "/projects/de-priest/after/after-09.jpg",
        alt: "Entry hallway with new doors and flooring",
      },
      {
        src: "/projects/de-priest/after/after-02.jpg",
        alt: "Fenced backyard with fresh sod",
      },
    ],
    mapQuery: "8414 De Priest St, Houston, TX 77088",
    listingAgent: {
      name: "Karelle Guedou",
      brokerage: "HomeSmart",
      contact: "281-617-6023",
      license: "TREC #0837337",
    },
    publishedAt: "2026-07-23",
    seo: {
      title:
        "8414 De Priest St, Houston TX 77088 | Renovated Home for Sale | AZMERYHOME",
      description:
        "Fully renovated 3-bed, 2-bath brick home on a large private lot in northwest Houston. New roof, HVAC, flooring and kitchen appliances. Offered by AZMERYHOME.",
    },
    linkedProjectSlug: "de-priest",
  },
];

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

/** Content models for Property and Project (spec §18.2, §18.3). */

export type PropertyStatus =
  | "for-sale"
  | "under-contract"
  | "sold"
  | "coming-soon";

export type ProjectStatus =
  | "renovation"
  | "for-sale"
  | "sold"
  | "hold"
  | "rental";

export type Strategy = "fix-flip" | "buy-hold" | "rental";

export interface GalleryImage {
  /** Public path under /public, e.g. "/properties/de-priest/kitchen.jpg". */
  src: string;
  /** Meaningful alt text — describe the image, do not keyword-stuff (spec §15). */
  alt: string;
  /** Optional caption shown under the image (spec §17). */
  caption?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
}

export interface Property {
  slug: string;
  status: PropertyStatus;
  /** Full street address, or an approved public location if address is withheld. */
  publicLocation: string;
  city: string;
  state: string;
  zip?: string;
  /** Only display when authorized (spec §6.2). Null hides price. */
  price?: number | null;
  beds: number;
  baths: number;
  squareFeet?: number;
  propertyType: string;
  shortDescription: string;
  /** Buyer-facing overview (spec §6.2), plain paragraphs. */
  fullDescription: string[];
  features: string[];
  renovationHighlights: string[];
  gallery: GalleryImage[];
  heroImage?: GalleryImage;
  /** Optional map/location embed data (spec §6.2). */
  mapQuery?: string;
  /** Only when represented by a licensed listing agent and display is approved. */
  listingAgent?: {
    name: string;
    contact: string;
    brokerage?: string;
    /** License number for attribution, e.g. "TREC #0837337". */
    license?: string;
  };
  publishedAt: string; // ISO date
  soldAt?: string; // ISO date
  seo: SeoMeta;
  /** Links a sold/active property to its Projects case study (spec §6.4). */
  linkedProjectSlug?: string;
}

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  generalLocation: string;
  strategy: Strategy;
  facts: {
    beds?: number;
    baths?: number;
    squareFeet?: number;
    propertyType?: string;
  };
  /** What made the property worth pursuing (spec §10). */
  opportunity: string;
  /** Practical renovation overview — no confidential cost data (spec §10). */
  renovationSummary: string;
  beforeImages: GalleryImage[];
  duringImages: GalleryImage[];
  afterImages: GalleryImage[];
  outcome: string;
  featured: boolean;
  seo: SeoMeta;
  linkedPropertySlug?: string;
}

export const STRATEGY_LABEL: Record<Strategy, string> = {
  "fix-flip": "Fix & Flip",
  "buy-hold": "Buy & Hold",
  rental: "Rental",
};

export const PROPERTY_STATUS_LABEL: Record<PropertyStatus, string> = {
  "for-sale": "For Sale",
  "under-contract": "Under Contract",
  sold: "Sold",
  "coming-soon": "Coming Soon",
};

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  renovation: "Renovation",
  "for-sale": "For Sale",
  sold: "Sold",
  hold: "Hold",
  rental: "Rental",
};

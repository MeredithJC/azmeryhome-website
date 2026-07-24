import type { Project } from "./types";

/**
 * Project portfolio / case studies (spec §10, §18.3).
 *
 * The De Priest renovation is seeded as the first case study (spec §5.5, §10)
 * using PLACEHOLDER copy and image paths. Replace `isPlaceholder`, the copy,
 * and the gallery with approved facts and real photos before launch (spec §24).
 * Do not publish financing terms, lender info, contractor disputes, private
 * budget details, or other internal matters (spec §10).
 */
export const projects: Project[] = [
  {
    slug: "de-priest",
    title: "The De Priest Renovation",
    status: "for-sale",
    generalLocation: "Lincoln City, Houston, TX 77088",
    strategy: "fix-flip",
    facts: {
      beds: 3,
      baths: 2,
      squareFeet: 1560,
      propertyType: "Single-family residence",
    },
    opportunity:
      "AZMERYHOME identified 8414 De Priest — a solid brick single-family home on an unusually large, private lot in the Lincoln City area of northwest Houston — as a strong candidate for a full cosmetic and systems refresh. Its four-sides brick construction and generous, tree-lined lot gave us a durable, classic home to build on.",
    renovationSummary:
      "We modernized the home throughout while preserving its classic brick character: a new roof, a new HVAC system, and new wood flooring across the entire house. The kitchen was updated with new appliances, and we added a new front fence for privacy and improved curb appeal.",
    beforeImages: [
      {
        src: "/projects/de-priest/placeholder-before.svg",
        alt: "De Priest property before renovation — photo to be provided",
      },
    ],
    duringImages: [
      {
        src: "/projects/de-priest/placeholder-during.svg",
        alt: "De Priest property during renovation — photo to be provided",
      },
    ],
    afterImages: [
      {
        src: "/projects/de-priest/placeholder-after.svg",
        alt: "De Priest property after renovation — photo to be provided",
      },
    ],
    outcome:
      "The renovated three-bedroom, two-bath home is currently offered for sale in northwest Houston.",
    featured: true,
    seo: {
      title: "The De Priest Renovation | AZMERYHOME Houston Project",
      description:
        "A Houston-area fix & flip renovation project by AZMERYHOME. Case study with before, during and after highlights.",
    },
    linkedPropertySlug: "8414-de-priest-st",
  },
];

/** True when a project still contains placeholder content (owner input pending). */
export function isPlaceholderProject(p: Project): boolean {
  return (
    p.opportunity.startsWith("PLACEHOLDER") ||
    p.renovationSummary.startsWith("PLACEHOLDER")
  );
}

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured) ?? projects[0];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

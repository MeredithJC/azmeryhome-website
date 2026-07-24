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
        src: "/projects/de-priest/before/before-08.jpg",
        alt: "8414 De Priest Street exterior before renovation — brick home with an overgrown lot",
      },
      {
        src: "/projects/de-priest/before/before-01.jpg",
        alt: "Kitchen before renovation, in its original condition",
      },
      {
        src: "/projects/de-priest/before/before-05.jpg",
        alt: "Kitchen and living area before renovation",
      },
      {
        src: "/projects/de-priest/before/before-04.jpg",
        alt: "Open living area before renovation, showing ceiling damage",
      },
      {
        src: "/projects/de-priest/before/before-03.jpg",
        alt: "Bedroom before renovation, in its original condition",
      },
      {
        src: "/projects/de-priest/before/before-06.jpg",
        alt: "Second bedroom before renovation",
      },
      {
        src: "/projects/de-priest/before/before-07.jpg",
        alt: "Third bedroom before renovation",
      },
      {
        src: "/projects/de-priest/before/before-02.jpg",
        alt: "Bathroom before renovation, in its original condition",
      },
    ],
    // Photos captured during renovation can be added here later.
    duringImages: [],
    // After (renovated) photos pending owner-provided files.
    afterImages: [],
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

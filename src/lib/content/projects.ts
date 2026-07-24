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
    status: "renovation",
    generalLocation: "Houston, Texas",
    strategy: "fix-flip",
    facts: {
      // PLACEHOLDER: replace with approved property facts.
      propertyType: "Single-family residence",
    },
    opportunity:
      "PLACEHOLDER — Add the approved summary of what made the De Priest property worth pursuing: its condition, location, and renovation potential. Use only owner-approved facts (spec §10, §24).",
    renovationSummary:
      "PLACEHOLDER — Add a practical overview of the renovation scope (the kinds of improvements made). Do not include confidential cost data unless intentionally published (spec §10).",
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
      "PLACEHOLDER — Add the approved current status / outcome for this project.",
    featured: true,
    seo: {
      title: "The De Priest Renovation | AZMERYHOME Houston Project",
      description:
        "A Houston-area fix & flip renovation project by AZMERYHOME. Case study with before, during and after highlights.",
    },
    // linkedPropertySlug: "de-priest", // set when an associated property page exists
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

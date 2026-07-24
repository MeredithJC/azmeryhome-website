import type { Metadata } from "next";
import { site } from "./site";

interface PageSeoInput {
  title: string;
  description: string;
  /** Path beginning with "/", used for canonical + OG url. */
  path: string;
  /** Optional social-share image path. Falls back to the generated site OG. */
  image?: string;
  /** Set true for utility routes that should be noindex (spec §15). */
  noindex?: boolean;
}

/** Build per-page Metadata with canonical + Open Graph (spec §15). */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: PageSeoInput): Metadata {
  const canonical = new URL(path, site.url).toString();
  // When no page-specific image is given, omit images so the file-based
  // generated opengraph-image (app/opengraph-image.tsx) is used as the default.
  const ogImage = image ? new URL(image, site.url).toString() : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: canonical,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

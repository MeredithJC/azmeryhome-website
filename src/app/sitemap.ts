import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPropertySlugs } from "@/lib/content/properties";
import { getAllProjectSlugs } from "@/lib/content/projects";

/**
 * XML sitemap, generated automatically and updated when properties/projects
 * are published or retired (spec §15). Utility routes (thank-you) are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/properties",
    "/about",
    "/what-we-do",
    "/projects",
    "/sell-to-us",
    "/partner-with-us",
    "/contact",
    "/buyer-list",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path || "/", site.url).toString(),
    lastModified: now,
    changeFrequency: path === "" || path === "/properties" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const propertyEntries: MetadataRoute.Sitemap = getAllPropertySlugs().map(
    (slug) => ({
      url: new URL(`/properties/${slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: new URL(`/projects/${slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...propertyEntries, ...projectEntries];
}

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt configured intentionally (spec §15). Discovery crawlers are
 * permitted; utility routes (thank-you, API) are disallowed. AI/discovery
 * crawlers are allowed by default per the company's content-use policy (§16).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}

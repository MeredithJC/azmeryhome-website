import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Web app manifest (spec §3 app icon, §18.5 performance basics). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Houston Real Estate Investment`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#181d21",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}

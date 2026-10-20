import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = ["", "/ark-i", "/emporos", "/emporos/demo", "/mark8", "/back-bone"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() }));
}

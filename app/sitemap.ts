import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

type Route = { path: string; priority: number; changeFrequency: "monthly" | "yearly"; updated: string };

// Bump a route's date when its content changes, so crawlers trust lastModified.
const routes: Route[] = [
  { path: "", updated: "2026-10-20", priority: 1, changeFrequency: "monthly" },
  { path: "/emporos", updated: "2026-10-20", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ark-i", updated: "2026-10-20", priority: 0.7, changeFrequency: "yearly" },
  { path: "/mark8", updated: "2026-10-20", priority: 0.7, changeFrequency: "yearly" },
  { path: "/back-bone", updated: "2026-10-20", priority: 0.7, changeFrequency: "yearly" },
  { path: "/emporos/demo", updated: "2026-10-20", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency, updated }) => ({ url: `${SITE_URL}${path}`, lastModified: updated, changeFrequency, priority }));
}

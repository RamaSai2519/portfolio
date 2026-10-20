import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

type Route = { path: string; priority: number; changeFrequency: "monthly" | "yearly" };

const routes: Route[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/emporos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ark-i", priority: 0.7, changeFrequency: "yearly" },
  { path: "/mark8", priority: 0.7, changeFrequency: "yearly" },
  { path: "/back-bone", priority: 0.7, changeFrequency: "yearly" },
  { path: "/emporos/demo", priority: 0.5, changeFrequency: "monthly" },
];

// Built once per deploy, so lastModified is the deploy date.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority }));
}

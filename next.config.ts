import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback: the PNG screenshots shrink by roughly 5–10x.
    formats: ["image/avif", "image/webp"],
    // Caps generated widths at what the layouts actually use (frames top out near 1100 CSS px).
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],
    // Next 16 only serves listed qualities; these match the quality props used on the site.
    qualities: [70, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;

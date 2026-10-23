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
  // Short links for the WhatsApp assistant demos, e.g. /demo/ycdc. One wildcard covers every lead,
  // so adding a lead (a Mongo config on the Lambda) needs no change here. These redirect (not proxy)
  // so the demo page loads from the Lambda origin and its /chat calls stay same-origin. Unknown
  // slugs get the Lambda's friendly not-found page.
  async redirects() {
    const demoOrigin = "https://mle6d4x5dvnu7hl63wsytb25ea0tfqrm.lambda-url.ap-south-1.on.aws";
    return [
      {
        source: "/demo/:slug",
        destination: `${demoOrigin}/demo/lead_:slug`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

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
  // Short links for the WhatsApp assistant demos, e.g. /demo/ycdc. These redirect (not proxy)
  // so the demo page loads from the Lambda origin and its /chat calls stay same-origin.
  async redirects() {
    const demoOrigin = "https://mle6d4x5dvnu7hl63wsytb25ea0tfqrm.lambda-url.ap-south-1.on.aws";
    const leads = ["ndc", "ycdc", "ayushman", "komali", "shaakya", "nischitha", "properties21", "aesthetics", "jupiter"];
    return leads.map((lead) => ({
      source: `/demo/${lead}`,
      destination: `${demoOrigin}/demo/lead_${lead}`,
      permanent: false,
    }));
  },
};

export default nextConfig;

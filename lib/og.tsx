import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** The share card used by every page's opengraph-image.tsx: wordmark, headline, a footer line and the accent rule. */
export function ogImage({ eyebrow, headline, footer, accent = "#00a3ff" }: { eyebrow?: string; headline: string; footer: string; accent?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#030308", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, color: "#eef4ff" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
            rama sathya sai<span style={{ color: "#39ff14" }}>.</span>
          </div>
          {eyebrow && <div style={{ display: "flex", fontSize: 28, color: accent }}>/ {eyebrow}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2, maxWidth: 1040 }}>{headline}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#a9b4cc", maxWidth: 1040 }}>{footer}</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: accent, borderRadius: 4 }} />
      </div>
    ),
    ogSize,
  );
}

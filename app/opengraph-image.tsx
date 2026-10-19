import { ImageResponse } from "next/og";

export const alt = "rama sathya sai. I ship websites and the systems behind them.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0a0a14", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, color: "#f2f3f7" }}>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
          rama sathya sai<span style={{ color: "#3fc84e" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2, maxWidth: 1000 }}>
            I ship websites and the systems behind them.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#b6b8c8" }}>Journeymen · Emporos · ARK-I · mark8 · back_bone · resume_builder</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#3fc84e", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}

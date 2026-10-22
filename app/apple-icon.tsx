import { ImageResponse } from "next/og";

// PNG version of icon.svg: iOS home screens and some crawlers ignore SVG icons.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 800, color: "#f2f3f7", marginLeft: -36, marginTop: -12 }}>r</div>
        <div style={{ position: "absolute", left: 106, top: 102, width: 34, height: 34, borderRadius: 17, background: "#007ba7" }} />
      </div>
    ),
    size,
  );
}

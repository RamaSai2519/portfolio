import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Emporos: A Nifty options desk with sixteen risk rules.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    eyebrow: "Emporos",
    headline: "A Nifty options desk with sixteen risk rules.",
    footer: "Angel One · 24 paper books · one live book · five locks",
    accent: "#b07cff",
  });
}

import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "mark8: Scoring 100–500 support calls a day, in real time.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    eyebrow: "mark8",
    headline: "Scoring 100–500 support calls a day, in real time.",
    footer: "A seven-part, 100-point rubric for Sukoon Unlimited",
    accent: "#ff1f45",
  });
}

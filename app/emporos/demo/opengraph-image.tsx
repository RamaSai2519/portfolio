import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Emporos demo: The trading dashboard, replaying an invented day.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    eyebrow: "Emporos demo",
    headline: "The trading dashboard, replaying an invented day.",
    footer: "Simulated data · every control switched off",
    accent: "#ffc933",
  });
}

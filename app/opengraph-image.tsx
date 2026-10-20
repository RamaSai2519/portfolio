import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "rama sathya sai. I ship websites and the systems behind them.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    headline: "I ship websites and the systems behind them.",
    footer: "Journeymen · Emporos · ARK-I · mark8 · back_bone · resume_builder",
  });
}

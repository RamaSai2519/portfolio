import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "back_bone: The Flask-on-Lambda backend behind Sukoon Unlimited.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    eyebrow: "back_bone",
    headline: "The Flask-on-Lambda backend behind Sukoon Unlimited.",
    footer: "83 endpoints · a scheduler every five minutes",
    accent: "#8fcdf0",
  });
}

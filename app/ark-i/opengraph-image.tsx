import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "ARK-I: One stateful model, six stateless specialists.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    eyebrow: "ARK-I",
    headline: "One stateful model, six stateless specialists.",
    footer: "Sukoon Unlimited's WhatsApp assistant · gpt-4o · Flask · MongoDB",
    accent: "#ff2d95",
  });
}

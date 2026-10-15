import { ogContentType, ogSize, renderOgImage } from "@/lib/og/image";

// Default link preview for every page that doesn't define its own.
export const alt = "Aseer: designing digital products people trust, grounded in research.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Product designer & HCI researcher",
    title: "Designing digital products people trust, grounded in research.",
    highlight: "trust",
  });
}

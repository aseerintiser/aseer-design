import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Case study and project screenshots will be added as project assets
    // arrive (see Portfolio_Content_Architecture_Blueprint.md, Part 6).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

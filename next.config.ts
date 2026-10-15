import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // All images are self-hosted in public/ (the Framer CDN copies moved
    // to public/media/framer/ in Phase 0), so no remote hosts are allowed.
  },
};

export default nextConfig;

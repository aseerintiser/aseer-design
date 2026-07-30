import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Milestone 2 migration: real screenshots/GIFs from the live site are
    // referenced directly from Framer's asset CDN rather than downloaded
    // and self-hosted. The build environment used for this migration
    // can't fetch binaries from framerusercontent.com (network
    // allowlist), so re-encoding/self-hosting isn't possible from here --
    // next/image still optimizes these on request in production, it just
    // fetches the source bytes from Framer instead of /public. See the
    // Milestone 2 report for the TODO to self-host these properly.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
};

export default nextConfig;

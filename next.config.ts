import type { NextConfig } from "next";

/**
 * Old links from the Framer version of aseer.design, sent to their pages
 * on this site, so links already shared (CVs, LinkedIn, applications)
 * keep working. The case study paths come from the Career Archive, which
 * records them as aseer.design/projects-main/<slug>; /about-me is the old
 * About page. Any other old case link lands on the matching case if its
 * slug is the same, and otherwise on the Work index.
 */
const caseSlugs = [
  "convay-mobile-app-revamp",
  "convay-ai-for-physical-meetings",
  "convay-design-system",
  "convay-notifications",
  "fitvibe",
  "travelmate-ai",
  "cultural-festival-platform",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/about-me", destination: "/about", permanent: true },
      { source: "/projects-main/convay-ai", destination: "/work/convay-ai-for-physical-meetings", permanent: true },
      ...caseSlugs.map((slug) => ({
        source: `/projects-main/${slug}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
      { source: "/projects-main/:path*", destination: "/work", permanent: true },
      { source: "/projects-main", destination: "/work", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // All images are self-hosted in public/ (the Framer CDN copies moved
    // to public/media/framer/ in Phase 0), so no remote hosts are allowed.
  },
};

export default nextConfig;

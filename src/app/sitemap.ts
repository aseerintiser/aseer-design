import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";

const siteUrl = "https://aseer.design";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/research", "/about", "/resume"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    }),
  );

  const caseStudyRoutes = caseStudies.map((project) => ({
    url: `${siteUrl}/${project.track}/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}

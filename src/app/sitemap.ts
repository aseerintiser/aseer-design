import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { publicationPages } from "@/content/publications";

const siteUrl = "https://aseer.design";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/research",
    "/about",
    "/resume",
    "/design-showcase",
    "/testimonials",
    "/certifications",
    "/articles",
    "/ask",
    "/design-notes",
  ].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    }),
  );

  const caseStudyRoutes = caseStudies.map((project) => ({
    url: `${siteUrl}/${project.track}/${project.slug}`,
    lastModified: new Date(),
  }));

  // Scholar-ready paper pages (see app/publications/[slug]).
  const publicationRoutes = publicationPages().map(({ page }) => ({
    url: `${siteUrl}/publications/${page.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...publicationRoutes];
}

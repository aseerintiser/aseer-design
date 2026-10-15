import { caseStudies, getCaseStudy } from "@/content/projects";
import { ogContentType, ogSize, renderOgImage, yearsFrom } from "@/lib/og/image";

export const alt = "Link preview for a case study by Aseer";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender every preview at build time, so the image route never has
// to read font files at request time.
export function generateStaticParams() {
  return caseStudies
    .filter((project) => project.track === "work")
    .map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  const years = project ? yearsFrom(project.meta.duration) : "";
  return renderOgImage({
    eyebrow: ["Case study", years].filter(Boolean).join(" · "),
    title: project?.title ?? "Aseer",
  });
}

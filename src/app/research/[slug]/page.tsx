import type { Metadata } from "next";
import { site } from "@/content/site";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { caseStudies, getCaseStudy } from "@/content/projects";

export function generateStaticParams() {
  return caseStudies
    .filter((project) => project.track === "research")
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  // Phase 0: own og:title/url per page. Without these, every shared
  // case study inherited the homepage's title and URL from layout.tsx.
  const description = project.oneLineScope.replace(/\*+/g, "");
  return {
    title: project.title,
    description,
    openGraph: {
      type: "article",
      siteName: site.name,
      title: project.title,
      description,
      url: `/research/${project.slug}`,
    },
  };
}

export default async function ResearchCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project || project.track !== "research") {
    notFound();
  }

  return <CaseStudyLayout caseStudy={project} />;
}

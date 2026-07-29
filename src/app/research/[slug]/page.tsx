import type { Metadata } from "next";
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
  return {
    title: project.title,
    description: project.oneLineScope,
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

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjectsByTrack } from "@/content/projects";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research on trust, AI, and public-service technology, feeding directly into how I design.",
};

export default function ResearchIndexPage() {
  const projects = getProjectsByTrack("research");
  const flagship = projects.filter((project) => project.isFlagship);
  const rest = projects.filter((project) => !project.isFlagship);

  return (
    <Section density="open">
      <Heading level={1}>Research</Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        Research on trust, AI, and public-service technology, feeding
        directly into how I design.
      </Text>
      {/* Same reasoning as the Work index: the single flagship (Lumi)
          gets a full-width feature row instead of competing at equal
          size with the other two research entries. */}
      <Grid className="mt-12" gap="lg">
        {flagship.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-8 lg:col-span-12">
            <ProjectCard project={project} />
          </div>
        ))}
        {rest.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-4">
            <ProjectCard project={project} />
          </div>
        ))}
      </Grid>
    </Section>
  );
}

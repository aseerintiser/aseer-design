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

  return (
    <Section density="open">
      <Heading level={1}>Research</Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        Research on trust, AI, and public-service technology, feeding
        directly into how I design.
      </Text>
      <Grid className="mt-12" gap="lg">
        {projects.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-4">
            <ProjectCard project={project} />
          </div>
        ))}
      </Grid>
    </Section>
  );
}

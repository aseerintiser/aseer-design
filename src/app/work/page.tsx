import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjectsByTrack } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Product and UX design case studies, mostly at Convay, an enterprise, government-adjacent platform.",
};

export default function WorkIndexPage() {
  const projects = getProjectsByTrack("work");

  return (
    <Section density="open">
      <Heading level={1}>Work</Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        Product and UX design work, mostly at Convay, an enterprise,
        government-adjacent platform.
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

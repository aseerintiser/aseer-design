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
      {/* Resume Strategy milestone (Resume-Strategy-Research.md, Option
          D) originally placed a quiet "view my academic CV" line here,
          next to the content that makes it relevant. Removed: the
          /resume page already carries the same link ("Looking for a
          fuller academic record instead? View my academic CV."), so
          this was the same fact stated twice on the site for no added
          reason -- one honest placement is enough. */}
      {/* Same reasoning as the Work index: the single flagship (Lumi)
          gets a full-width feature row instead of competing at equal
          size with the other two research entries.

          Visual Polish milestone: `rest` currently has exactly 2
          entries (RoboCarnival, Tailoring Game Difficulty to Player
          Types). The Work index's equivalent col-span-4 works there
          because 12/4 divides evenly into 3 full rows for 6 items;
          with only 2 items here, that same col-span-4 left one item on
          its own row with two empty column-tracks beside it at lg.
          col-span-6 gives these two entries an even, two-up row that
          fills the full 12 columns instead. */}
      <Grid className="mt-12" gap="lg">
        {flagship.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-8 lg:col-span-12">
            <ProjectCard project={project} />
          </div>
        ))}
        {rest.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-4 lg:col-span-6">
            <ProjectCard project={project} />
          </div>
        ))}
      </Grid>
    </Section>
  );
}

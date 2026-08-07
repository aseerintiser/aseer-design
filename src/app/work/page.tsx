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
    "Product and UX design work, mostly at Convay, an enterprise, government-adjacent platform. Other work spans fitness, travel, and cultural experiences.",
};

export default function WorkIndexPage() {
  const projects = getProjectsByTrack("work");
  // Flagships first, then everything else, each in its own DOM order --
  // the two size treatments below only make sense in this sequence.
  const flagship = projects.filter((project) => project.isFlagship);
  const rest = projects.filter((project) => !project.isFlagship);

  return (
    <Section density="open">
      {/* Back to the original line ("mostly at Convay"), which Aseer
          preferred over an in-between rewrite that leaned on the
          homepage's own phrasing. The undersell that line originally
          drew flags for (the other three entries -- FitVibe, TravelMate
          AI, the Arenberg cultural festival platform -- read as an
          afterthought) is fixed with a second, plain sentence instead
          of restructuring the first one. */}
      <Heading level={1}>Work</Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        Product and UX design work, mostly at Convay, an enterprise,
        government-adjacent platform. Other work spans fitness, travel,
        and cultural experiences.
      </Text>
      {/* Every card was previously the same size regardless of weight,
          so a flagship project and a minor one competed for exactly the
          same visual attention -- there was no real hierarchy on the
          index, just a uniform grid. Flagships now take a wider column
          (half-width pair at lg) and everything else settles into a
          plainer three-up row. */}
      <Grid className="mt-12" gap="lg">
        {flagship.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-8 lg:col-span-6">
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

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { projectSummaries } from "@/content/projects";

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
};

export default function HomePage() {
  const flagshipWork = projectSummaries.find(
    (project) => project.track === "work" && project.isFlagship,
  );
  const flagshipResearch = projectSummaries.find(
    (project) => project.track === "research" && project.isFlagship,
  );

  return (
    <>
      {/* Hero. Design Brief must-have: no animation may delay a
          visitor's access to real content, so the hero renders
          immediately; the Reveal below is a quick, one-time entrance,
          not a gate. Foundation only here -- the fuller "kinetic
          headline" treatment described in the Creative Direction is
          content/motion work for a later milestone, not this one. */}
      <Section density="open" as="section">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {site.title}
          </p>
          <Heading level={1} size="display" className="mt-3 max-w-4xl">
            {site.name}
          </Heading>
          <Text size="lead" muted className="mt-6 max-w-[var(--measure)]">
            {site.heroProofPoint}
          </Text>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/work">View Work</Button>
            <Button href="/research" variant="secondary">
              View Research
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Track split. Blueprint Part 3: "not just two nav links but a
          visual or textual bridge explaining how the two connect." */}
      <Section density="default" tone="dark">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Heading level={3}>Design</Heading>
            <Text muted className="mt-2">
              Product and UX design work, mostly at Convay, an enterprise,
              government-adjacent platform.
            </Text>
          </div>
          <div>
            <Heading level={3}>Research</Heading>
            <Text muted className="mt-2">
              Research on trust, AI, and public-service technology, feeding
              directly into how I design.
            </Text>
          </div>
        </div>
      </Section>

      {/* Featured previews */}
      <Section density="default">
        <div className="grid gap-8 md:grid-cols-2">
          {flagshipWork && (
            <div>
              <p className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">
                Featured work
              </p>
              <ProjectCard project={flagshipWork} />
            </div>
          )}
          {flagshipResearch && (
            <div>
              <p className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">
                Featured research
              </p>
              <ProjectCard project={flagshipResearch} />
            </div>
          )}
        </div>
      </Section>

      {/* Current status. Blueprint Part 3: closes the logistics gap
          before it becomes a reason to hesitate. */}
      <Section density="default">
        <Text muted>{site.currentStatus}</Text>
      </Section>
    </>
  );
}

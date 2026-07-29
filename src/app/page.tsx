import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { KineticHeadline } from "@/components/ui/KineticHeadline";
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
      {/* Hero. Asymmetric 7/5 split rather than a centered stack, per the
          Creative Direction's "controlled asymmetry, not centered stacks
          by default." The headline is the one kinetic-motion moment on
          the page (plays once, on load, never loops); everything else in
          the text column renders immediately -- no animation gates a
          visitor's access to real content. The visual panel is a
          generated abstract composition (no real photography exists
          yet) that overlaps the section below it for a touch of real
          depth instead of a flat stack. */}
      <Section density="open" as="section" className="overflow-visible">
        <Grid gap="lg" className="items-center">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Eyebrow>{site.title}</Eyebrow>
            <Heading level={1} size="display" className="mt-3 max-w-4xl">
              <KineticHeadline text={site.name} />
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
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative -mb-24 aspect-[4/5] w-full max-w-sm justify-self-end overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.35)] md:-mb-32">
                <ProjectVisual
                  seed={site.name}
                  monogram={site.shortName.charAt(0)}
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </Grid>
      </Section>

      {/* Track split. Blueprint Part 3: "not just two nav links but a
          visual or textual bridge explaining how the two connect."
          Oversized ghost numerals are the one deliberate editorial
          "chapter marker" device (Design Brief Nice-to-Have), reused
          nowhere else on this page so it stays a considered accent
          rather than a repeated tic. */}
      <Section density="default" tone="dark" className="pt-32 md:pt-40">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-10 -left-1 font-[family-name:var(--font-display)] text-7xl text-[var(--color-text)]/10 select-none"
            >
              01
            </span>
            <Heading level={3} className="relative">
              Design
            </Heading>
            <Text muted className="relative mt-2">
              Product and UX design work, mostly at Convay, an enterprise,
              government-adjacent platform.
            </Text>
          </div>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-10 -left-1 font-[family-name:var(--font-display)] text-7xl text-[var(--color-text)]/10 select-none"
            >
              02
            </span>
            <Heading level={3} className="relative">
              Research
            </Heading>
            <Text muted className="relative mt-2">
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

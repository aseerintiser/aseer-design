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
            {/* The headline's word-stagger runs roughly 0.05-0.55s after
                mount (see wordContainer/wordItem in lib/motion). Without a
                delay here, the proof point and CTAs would render instantly
                and sit still for half a second next to a headline still
                animating -- two disconnected timings in one hero. A single
                Reveal at 0.35s brings them in while the last word or two is
                still settling, so the whole hero reads as one coordinated
                entrance instead of "headline animation, then everything
                else." */}
            <Reveal delay={0.35}>
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
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal delay={0.15}>
              {/* justify-self-end was a no-op here: this div's parent is
                  Reveal's motion.div, not the Grid directly, so
                  justify-self never had a grid container to act against
                  and the panel was silently rendering flush-left (default
                  block position) at every breakpoint, not just mobile.
                  Margin-based alignment works regardless of parent display
                  type: mx-auto centers it under the stacked mobile/md
                  layout, and lg:mr-0 (overriding the mx-auto margin-right
                  at that breakpoint) pushes it flush right once the 7/5
                  split is actually in effect. */}
              <div className="relative -mb-24 aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.35)] md:-mb-32 lg:mr-0">
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
        {/* Standardized on the shared Grid component (was a raw ad hoc
            `grid md:grid-cols-2`) so every section on the page places
            content with the same 4/8/12-column system instead of two
            slightly different grid implementations living side by side.
            gap="md" is overridden to a flat gap-8, reproducing the
            original's asymmetric gap-12→gap-8 stepdown at md and up. */}
        <Grid gap="md" className="gap-12 md:gap-8">
          <div className="relative col-span-4 md:col-span-4 lg:col-span-6">
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
          <div className="relative col-span-4 md:col-span-4 lg:col-span-6">
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
        </Grid>
      </Section>

      {/* Featured previews. Same standardization: was a raw
          `grid md:grid-cols-2`. */}
      <Section density="default">
        <Grid gap="md" className="gap-8">
          {flagshipWork && (
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">
                Featured work
              </p>
              <ProjectCard project={flagshipWork} />
            </div>
          )}
          {flagshipResearch && (
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">
                Featured research
              </p>
              <ProjectCard project={flagshipResearch} />
            </div>
          )}
        </Grid>
      </Section>

      {/* Current status. Blueprint Part 3: closes the logistics gap
          before it becomes a reason to hesitate. */}
      <Section density="default">
        <Text muted>{site.currentStatus}</Text>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { KineticHeadline } from "@/components/ui/KineticHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
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
      {/* Hero. Milestone 2: headline, bio, skill lines, and portrait are
          migrated verbatim from the live homepage (content/site.ts).
          Asymmetric 7/5 split rather than a centered stack, per the
          Creative Direction's "controlled asymmetry, not centered stacks
          by default" -- the live page itself doesn't use a strict grid,
          so this split is a structural/formatting improvement, not a
          content change. The headline is the one kinetic-motion moment
          on the page (plays once, on load, never loops); everything else
          in the text column renders immediately -- no animation gates a
          visitor's access to real content. */}
      <Section density="open" as="section" className="overflow-visible">
        <Grid gap="lg" className="items-center">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Heading level={1} size="display" className="max-w-4xl">
              <KineticHeadline text={site.tagline} />
            </Heading>
            {/* The headline's word-stagger runs roughly 0.05-0.55s after
                mount (see wordContainer/wordItem in lib/motion). Without a
                delay here, the bio and CTAs would render instantly and
                sit still for half a second next to a headline still
                animating -- two disconnected timings in one hero. A
                single Reveal at 0.35s brings them in while the last word
                or two is still settling, so the whole hero reads as one
                coordinated entrance instead of "headline animation, then
                everything else." */}
            <Reveal delay={0.35}>
              <div className="mt-6 max-w-[var(--measure)] space-y-4">
                {site.bio.map((paragraph, index) => (
                  <Text key={index} size={index === 0 ? "lead" : "body"} muted={index > 0}>
                    {renderInlineMarkdown(paragraph)}
                  </Text>
                ))}
              </div>
              <div className="mt-6 space-y-1">
                {site.skillLines.map((line) => (
                  <p key={line} className="text-sm text-[var(--color-text-muted)]">
                    {line}
                  </p>
                ))}
              </div>
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
              {/* justify-self-end was a no-op here previously: this div's
                  parent is Reveal's motion.div, not the Grid directly, so
                  justify-self never had a grid container to act against.
                  Margin-based alignment works regardless of parent display
                  type: mx-auto centers it while stacked on mobile/md, and
                  lg:mr-0 (overriding mx-auto's margin-right at that
                  breakpoint) pushes it flush right once the 7/5 split is
                  actually in effect. */}
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.35)] lg:mr-0">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  width={site.portrait.width}
                  height={site.portrait.height}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 384px, 90vw"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 rounded-[var(--radius-full)] bg-[var(--color-bg)]/90 px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--color-text)] shadow-[0_4px_16px_rgba(0,0,0,0.18)] backdrop-blur"
                >
                  {site.badge}
                </span>
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

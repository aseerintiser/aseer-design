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
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
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
              {/* Milestone 3: previously two bare paragraphs, visually
                  indistinguishable from any other muted text on the page
                  -- easy to read as leftover copy rather than a
                  considered accent. A thin top rule sets this apart as
                  its own quiet strip, and uppercase/tracked type (the
                  same treatment Eyebrow uses elsewhere) reads as a
                  deliberate label row instead of two stray sentences. */}
              <div className="mt-6 space-y-1.5 border-t border-[var(--color-border)] pt-4">
                {site.skillLines.map((line) => (
                  <p
                    key={line}
                    className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase"
                  >
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
                  actually in effect.

                  Milestone 3: `group` + a slow hover scale on the image
                  gives the one static, non-interactive element in the
                  hero a small amount of the same considered-craft touch
                  every other surface on the site has, without being
                  distracting -- it only responds to a deliberate hover,
                  and the shadow deepens in step so the lift reads as one
                  physical motion rather than the image just zooming. */}
              <div className="group relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.35)] transition-shadow duration-[var(--duration-slow)] ease-[var(--ease-standard)] hover:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.45)] lg:mr-0">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  width={site.portrait.width}
                  height={site.portrait.height}
                  priority
                  className="h-full w-full object-cover transition-transform duration-[700ms] ease-[var(--ease-standard)] group-hover:scale-[1.04]"
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
          "chapter marker" device (Design Brief Nice-to-Have), echoed at
          a smaller scale next to "Featured work"/"Featured research"
          below so the two sections read as one continuous thread rather
          than two unrelated blocks (Milestone 3).

          density="open" (was "default" + an untracked one-off
          pt-32/md:pt-40 override): the override wasn't wrong visually,
          but it was an arbitrary number instead of a value traceable to
          the 8-point spacing scale everything else on the page uses --
          "open" gives the same generous, hero-adjacent breathing room
          from the actual token system instead. The two columns now
          enter as one coordinated stagger (StaggerContainer/Item, the
          same pattern used for grouped content elsewhere on the site)
          instead of appearing instantly -- previously this was the
          first of three sections below the hero with no entrance motion
          at all, a real gap against the rest of the site's "considered
          motion throughout" standard. */}
      <Section density="open" tone="dark">
        {/* Standardized on the shared Grid component (was a raw ad hoc
            `grid md:grid-cols-2`) so every section on the page places
            content with the same 4/8/12-column system instead of two
            slightly different grid implementations living side by side.
            gap="md" is overridden to a flat gap-8, reproducing the
            original's asymmetric gap-12→gap-8 stepdown at md and up. */}
        <StaggerContainer>
          <Grid gap="md" className="gap-12 md:gap-8">
            <StaggerItem className="relative col-span-4 md:col-span-4 lg:col-span-6">
              <span
                aria-hidden="true"
                className="absolute -top-10 -left-1 font-[family-name:var(--font-display)] text-7xl text-[var(--color-text)]/10 select-none"
              >
                01
              </span>
              {/* level=2 (was 3): this is the first heading below the
                  hero's h1, so it must be an h2 to avoid skipping a
                  level in the document outline. size=3 keeps the
                  original, smaller visual treatment -- level and size
                  are independent on this component for exactly this
                  reason. */}
              <Heading level={2} size={3} className="relative">
                Design
              </Heading>
              <Text muted className="relative mt-2">
                Product and UX design work, mostly at Convay, an enterprise,
                government-adjacent platform.
              </Text>
            </StaggerItem>
            <StaggerItem className="relative col-span-4 md:col-span-4 lg:col-span-6">
              <span
                aria-hidden="true"
                className="absolute -top-10 -left-1 font-[family-name:var(--font-display)] text-7xl text-[var(--color-text)]/10 select-none"
              >
                02
              </span>
              <Heading level={2} size={3} className="relative">
                Research
              </Heading>
              <Text muted className="relative mt-2">
                Research on trust, AI, and public-service technology, feeding
                directly into how I design.
              </Text>
            </StaggerItem>
          </Grid>
        </StaggerContainer>
      </Section>

      {/* Featured previews. Same standardization: was a raw
          `grid md:grid-cols-2`. Milestone 3: each label is now prefixed
          with the same "01"/"02" numeral used in the Track split section
          just above (at a much quieter scale), so this reads as that
          section's direct continuation -- "01 Design" pays off as
          "01 Featured work" -- rather than two disconnected blocks that
          happen to sit next to each other. showFlagshipBadge={false}
          because that pill would otherwise repeat "Featured work" as
          "Flagship" a second time in the same glance; the Work/Research
          index grids, which have no label above each card, still show
          it. Also now a coordinated stagger entrance, matching the
          Track split section instead of appearing with no motion at
          all. */}
      <Section density="default">
        <StaggerContainer>
          <Grid gap="md" className="gap-8">
            {flagshipWork && (
              <StaggerItem className="col-span-4 md:col-span-4 lg:col-span-6">
                <p className="mb-3 flex items-baseline gap-2 text-sm font-medium text-[var(--color-text-muted)]">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-[var(--color-text)]/25"
                  >
                    01
                  </span>
                  Featured work
                </p>
                <ProjectCard project={flagshipWork} showFlagshipBadge={false} />
              </StaggerItem>
            )}
            {flagshipResearch && (
              <StaggerItem className="col-span-4 md:col-span-4 lg:col-span-6">
                <p className="mb-3 flex items-baseline gap-2 text-sm font-medium text-[var(--color-text-muted)]">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-[var(--color-text)]/25"
                  >
                    02
                  </span>
                  Featured research
                </p>
                <ProjectCard project={flagshipResearch} showFlagshipBadge={false} />
              </StaggerItem>
            )}
          </Grid>
        </StaggerContainer>
      </Section>

      {/* Current status. Blueprint Part 3: closes the logistics gap
          before it becomes a reason to hesitate.

          Milestone 3: tone="dark" (was the default light tone). Every
          section above already alternates dark/light/dark; this last
          one was light too, so the page actually read as
          light-dark-light-light -- the "section-level light/dark
          alternation as a pacing device" the design system is built
          around wasn't really in effect on its own homepage. This
          closes the page on the same quiet dark note the Track split
          opened with, and gives the page a real light→dark→light→dark
          rhythm on the way to the (light) footer. Reveal wraps it since
          it was the last remaining section with no entrance motion.

          Visual QA milestone: confirmed live at a real 1920px viewport --
          `density="default"` gave one short status line the same
          vertical padding as a full content section, and with no width
          constraint of its own the line just sat pinned to the left of
          the full-width dark band, reading as an empty, unfinished-
          looking section rather than a deliberate closing beat. `dense`
          matches the tighter rhythm this line's actual weight calls for,
          and centering it turns a stray leftover line into a considered,
          quiet closing statement. */}
      <Section density="dense" tone="dark">
        <Reveal>
          <Text muted className="text-center">
            {site.currentStatus}
          </Text>
        </Reveal>
      </Section>
    </>
  );
}

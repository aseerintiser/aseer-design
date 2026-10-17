import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { LocalTime } from "@/components/ui/LocalTime";
import { Reveal } from "@/components/ui/Reveal";
import { HeroStory } from "@/components/home/HeroStory";
import { HoverStage } from "@/components/home/HoverStage";
import { Voices } from "@/components/home/Voices";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { site } from "@/content/site";
import { about } from "@/content/about";
import { projectSummaries } from "@/content/projects";
import { chapterFor } from "@/content/chapters";
import {
  bridgeToConvay,
  bridgeToFitvibe,
  convayChapter,
  fitvibeFeature,
  lumiFeature,
  moreResearch,
  person,
} from "@/content/home";

export const metadata: Metadata = {
  title: `${site.name} · ${site.title}`,
};

function thumbnailOf(slug: string) {
  const project = projectSummaries.find((p) => p.slug === slug);
  if (!project?.thumbnail) throw new Error(`Missing thumbnail for ${slug}`);
  return project.thumbnail;
}

/** Mono label used for section and project indexes. */
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/** A true one-line handover between projects (see content/home.ts). */
function Bridge({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-16 flex items-center gap-5 md:my-24">
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
      <p className="max-w-[34ch] text-center font-[family-name:var(--font-display)] text-lg italic text-[var(--color-text-muted)] md:text-xl">
        {children}
      </p>
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}

function CaseLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium">
      <span className="link-ink">{children}</span>
      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
    </Link>
  );
}

/**
 * Homepage (Phase 2): one story in four acts.
 *
 * 1. The hook: who Aseer is, the promise, and his real path, with the
 *    work playing along it.
 * 2. The work: the featured five, newest first, each led by its outcome
 *    and one evidence chip, with a true one-line bridge between them.
 * 3. The depth: more research, then three voices from people he worked
 *    with.
 * 4. The person: how he got here and what he is looking for. The
 *    contact block in the footer closes the page.
 *
 * The first two acts are the screening room (night); the last two move
 * to paper for calmer reading.
 */
export default function HomePage() {
  // The trailer's poster is the largest thing on the first screen, so the
  // browser fetches it first instead of after the card posters below.
  preload("/loops/trailer.webp", { as: "image", fetchPriority: "high" });

  const lumiChapter = chapterFor("lumi");

  return (
    <>
      {/* Act 1 · the hook */}
      <Section tone="dark" density="dense" className="pt-8 pb-14 md:pt-10 md:pb-16">
        <HeroStory
          intro={
            <div>
              {/* One item per line on phones, one row from sm up: the
                  line count never depends on how wide the mono font is,
                  so nothing below shifts when the font arrives. */}
              <p className="flex flex-col gap-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
                  <span>Open to roles</span>
                </span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>{site.title}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>
                  Finland <LocalTime />
                </span>
              </p>
              <Heading level={1} size="display" className="mt-5">
                Designing digital products people <mark className="italic">trust</mark>, grounded in
                research.
              </Heading>
              <Text size="lead" className="mt-6 max-w-[36rem] text-[var(--color-text-muted)]">
                {renderInlineMarkdown(site.bio[0])}
              </Text>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#work">See the work</Button>
                <Button href="/research" variant="secondary">
                  Read the research
                </Button>
              </div>
            </div>
          }
        />
      </Section>

      {/* Act 2 · the work */}
      <Section tone="dark" density="default" id="work" className="scroll-mt-16 border-t border-[var(--color-border)]">
        <div className="max-w-3xl">
          <Label>Selected work · newest first</Label>
          <Heading level={2} className="mt-3">
            Five projects, from a thesis on trust back to my first client app.
          </Heading>
        </div>

        {/* Lumi, large */}
        <Reveal>
          <article className="mt-14 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <HoverStage
              href={lumiFeature.href}
              label={`Open the ${lumiFeature.title} case study`}
              chapter={lumiChapter}
              media={thumbnailOf("lumi")}
              sizes="(min-width: 1024px) 58vw, 92vw"
              className="lg:col-span-7"
            />
            <div className="lg:col-span-5">
              <Label>{lumiFeature.index}</Label>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-none tracking-[-0.02em]">
                {lumiFeature.title}
              </h3>
              <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed">{lumiFeature.outcome}</p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">{lumiFeature.role}</p>
              <EvidenceChip evidence={lumiFeature.evidence} className="mt-5" />
              <div>
                <CaseLink href={lumiFeature.href}>{lumiFeature.cta}</CaseLink>
              </div>
            </div>
          </article>
        </Reveal>

        <Bridge>{bridgeToConvay}</Bridge>

        {/* The Convay chapter: one header, three cases */}
        <section aria-labelledby="convay-chapter">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Label>{convayChapter.label}</Label>
              <h3 id="convay-chapter" className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1]">
                Convay
              </h3>
            </div>
            <p className="text-[var(--color-text-muted)] lg:col-span-7 lg:pt-7">{convayChapter.context}</p>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
            {convayChapter.projects.map((project) => (
              <Reveal key={project.slug}>
                <article>
                  <HoverStage
                    href={project.href}
                    label={`Open the Convay ${project.title} case study`}
                    chapter={chapterFor(project.slug)}
                    media={thumbnailOf(project.slug)}
                    sizes="(min-width: 768px) 30vw, 92vw"
                  />
                  <h4 className="mt-5 font-[family-name:var(--font-display)] text-2xl leading-tight">
                    <Link href={project.href} className="link-ink no-underline">
                      {project.title}
                    </Link>
                  </h4>
                  <p className="mt-2 leading-relaxed">{project.outcome}</p>
                  <EvidenceChip evidence={project.evidence} className="mt-4" />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Bridge>{bridgeToFitvibe}</Bridge>

        {/* FitVibe, compact: the origin */}
        <Reveal>
          <article className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            <HoverStage
              href={fitvibeFeature.href}
              label={`Open the ${fitvibeFeature.title} case study`}
              chapter={chapterFor("fitvibe")}
              media={thumbnailOf("fitvibe")}
              sizes="(min-width: 768px) 34vw, 92vw"
              className="md:col-span-5 lg:col-span-4"
            />
            <div className="md:col-span-7 lg:col-span-6">
              <Label>{fitvibeFeature.index}</Label>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1]">
                {fitvibeFeature.title}
              </h3>
              <p className="mt-4 leading-relaxed">{fitvibeFeature.outcome}</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{fitvibeFeature.role}</p>
              <EvidenceChip evidence={fitvibeFeature.evidence} className="mt-4" />
              <div>
                <CaseLink href={fitvibeFeature.href}>Open the case study</CaseLink>
              </div>
            </div>
          </article>
        </Reveal>

        <Link
          href="/work"
          className="group mt-20 flex items-center justify-between gap-6 border-y border-[var(--color-border)] py-6"
        >
          <span className="text-[var(--color-text-muted)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-text)]">
            All work, including Convay Notifications, TravelMate AI and the aRENEWberg festival app
          </span>
          <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs tracking-[0.14em] uppercase">
            Index
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Section>

      {/* Act 3 · the depth */}
      <Section density="default" id="research" className="scroll-mt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Label>More research</Label>
            <Heading level={2} className="mt-3">
              More studies, from social robots to game difficulty.
            </Heading>
            <div>
              <CaseLink href="/research">All research</CaseLink>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {moreResearch.map((item) => {
              const media = thumbnailOf(item.slug);
              return (
                <Link key={item.slug} href={item.href} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)]">
                    <Image
                      src={media.src}
                      width={media.width}
                      height={media.height}
                      alt={media.alt}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                      className={`h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-entrance)] group-hover:scale-[1.03] ${chapterFor(item.slug).medium === "photo" ? "stage-photo-grade" : ""}`}
                    />
                  </div>
                  <Label className="mt-4">{item.label}</Label>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight">
                    <span className="link-ink no-underline">{item.title}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.line}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-24">
          <Label>In their words · LinkedIn recommendations</Label>
          <Heading level={2} size={3} className="mt-3 max-w-2xl" display>
            What managers and clients wrote, with the originals one click away.
          </Heading>
          <div className="mt-10">
            <Voices />
          </div>
          <div>
            <CaseLink href="/testimonials">All recommendations</CaseLink>
          </div>
        </div>
      </Section>

      {/* Act 4 · the person */}
      <Section density="default" id="about" className="scroll-mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="overflow-hidden rounded-[var(--radius-lg)]">
              <Image
                src={about.portrait.src}
                width={about.portrait.width}
                height={about.portrait.height}
                alt={about.portrait.alt}
                sizes="(min-width: 768px) 30vw, 92vw"
                className="stage-photo-grade h-auto w-full"
              />
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-7">
            <Label>About</Label>
            <Heading level={2} className="mt-3">
              {person.heading}
            </Heading>
            <div className="mt-6 space-y-4">
              {person.lines.map((line) => (
                <Text key={line} className="max-w-[var(--measure)]">
                  {line}
                </Text>
              ))}
            </div>
            <p className="mt-8 max-w-[var(--measure)] border-l-2 border-[var(--color-text)] pl-5 text-[var(--color-text)]">
              {person.lookingFor}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="secondary">
                More about me
              </Button>
              <Button href="#contact" withArrow={false}>
                Get in touch
              </Button>
            </div>
            <p className="mt-6 max-w-[var(--measure)] text-sm text-[var(--color-text-muted)]">
              You can also{" "}
              <Link href="/ask" className="link-ink font-medium text-[var(--color-text)]">
                ask the portfolio a question
              </Link>
              . It answers in my own words, quoted from this site.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

import Link from "next/link";
import type { CaseStudy, CaseStudyBlock } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { MetaRow } from "@/components/ui/MetaRow";
import { Stage, type StageMedia } from "@/components/ui/Stage";
import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { HoverStage } from "@/components/home/HoverStage";
import { CaseStudyBody } from "./CaseStudyBody";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { chapterFor } from "@/content/chapters";
import { inShort } from "@/content/inShort";
import { projectSummaries } from "@/content/projects";
import { trailers } from "@/content/trailers";
import { site } from "@/content/site";
import { CaseTrailer } from "./CaseTrailer";

/** The case hero: the project's trailer when it has one (see
 * content/trailers.ts), otherwise its still, full bleed. */
function heroStillFor(caseStudy: CaseStudy): StageMedia | null {
  return trailers[caseStudy.slug] ? null : (caseStudy.thumbnail ?? null);
}

const SKIP_KEYS = new Set(["src", "href", "alt", "poster", "loopSrc", "fallbackSrc", "id", "type"]);

/** Reading time from the words a visitor actually reads, at about 225
 * words a minute. */
function readingMinutes(blocks: CaseStudyBlock[]) {
  let words = 0;
  const walk = (value: unknown, key?: string) => {
    if (key && SKIP_KEYS.has(key)) return;
    if (typeof value === "string") words += value.split(/\s+/).filter(Boolean).length;
    else if (Array.isArray(value)) value.forEach((item) => walk(item));
    else if (value && typeof value === "object")
      Object.entries(value).forEach(([childKey, child]) => walk(child, childKey));
  };
  walk(blocks);
  return Math.max(1, Math.round(words / 225));
}

/**
 * Case study page (Phase 3 template).
 *
 * 1. The hero, on night: a trail back to Work or Research, the title,
 *    the one-line scope, role, time, tools and reading time, and the
 *    project's trailer, a short film for anyone who won't read further.
 * 2. In short (featured cases): problem, role, key decision and result
 *    with its evidence, so a recruiter can stop after one screen.
 * 3. The body, in numbered chapters with a chapter rail (see
 *    CaseStudyBody).
 * 4. The next case, as a full stage rather than a small link.
 */
export function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  const chapter = chapterFor(caseStudy.slug);
  const trackLabel = caseStudy.track === "work" ? "Work" : "Research";
  const trackHref = caseStudy.track === "work" ? "/work" : "/research";
  const trailer = trailers[caseStudy.slug];
  const still = heroStillFor(caseStudy);
  const summary = inShort[caseStudy.slug];
  const minutes = caseStudy.body ? readingMinutes(caseStudy.body) : null;

  const metaItems = [
    ...(caseStudy.liveMeta
      ? [
          { label: "Role", value: caseStudy.liveMeta.role.join(", ") },
          { label: "Category", value: caseStudy.liveMeta.category.join(", ") },
          { label: "Duration", value: caseStudy.meta.duration },
          { label: "Tools", value: caseStudy.liveMeta.tools.join(", ") },
          ...(caseStudy.liveMeta.status ? [{ label: "Status", value: caseStudy.liveMeta.status }] : []),
        ]
      : [
          { label: "Role", value: caseStudy.meta.role },
          { label: "Team", value: caseStudy.meta.team },
          { label: "Duration", value: caseStudy.meta.duration },
          { label: "Tools", value: caseStudy.meta.tools },
        ]),
    ...(minutes ? [{ label: "Reading time", value: `${minutes} min` }] : []),
  ];

  const nextSlug = caseStudy.nextCaseStudy?.href.split("/").pop();
  const next = nextSlug ? projectSummaries.find((project) => project.slug === nextSlug) : undefined;

  return (
    <article>
      {/* Printed copies say where they came from and how to reach Aseer. */}
      <p className="hidden border-b border-[#999] pb-2 font-[family-name:var(--font-mono)] text-[9pt] text-[#444] print:flex print:justify-between">
        <span>
          {site.name} · aseer.design{trackHref}/{caseStudy.slug}
        </span>
        <span>{site.email}</span>
      </p>

      {/* 1. Hero */}
      <header data-tone="dark" className="overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
        <Container className="pt-10 md:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] uppercase">
              <li>
                <Link href={trackHref} className="text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-text)]">
                  {trackLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[var(--color-text-muted)]">/</li>
              <li aria-current="page" className="text-[var(--color-text)]">
                {chapter.name}
              </li>
            </ol>
          </nav>
          <Heading level={1} size="display" className="mt-4 max-w-5xl">
            {caseStudy.title}
          </Heading>
          <Text size="lead" className="mt-5 max-w-[var(--measure)] text-[var(--color-text-muted)]">
            {renderInlineMarkdown(caseStudy.oneLineScope)}
          </Text>
          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <MetaRow
              items={metaItems}
              className={
                metaItems.length > 5
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                  : metaItems.length > 4
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                    : undefined
              }
            />
          </div>
        </Container>
        {(trailer || still) && (
          <Container className="mt-12 pb-12 md:mt-16 md:pb-16">
            {trailer ? (
              <CaseTrailer trailer={trailer} />
            ) : (
              still && (
                <Stage
                  chapter={chapter}
                  media={still}
                  shape="wide"
                  priority
                  sizes="(min-width: 1280px) 1200px, 92vw"
                  className="rounded-[var(--radius-lg)]"
                />
              )
            )}
          </Container>
        )}
      </header>

      {/* 2. In short */}
      {summary && (
        <Section density="dense" className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] py-12 md:py-16">
          <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            In short{minutes ? ` · ${minutes} min read` : ""}
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "The problem", value: summary.problem },
              { label: "My role", value: summary.role },
              { label: "Key decision", value: summary.decision },
              { label: "Result", value: summary.result },
            ].map((item) => (
              <div key={item.label} className="border-t border-[var(--color-border-strong)] pt-4">
                <dt className="font-[family-name:var(--font-display)] text-lg">{item.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">
                  {item.value}
                  {item.label === "Result" && (
                    <span className="mt-3 block">
                      <EvidenceChip evidence={summary.evidence} />
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* 3. The body */}
      {caseStudy.body ? (
        <CaseStudyBody
          blocks={caseStudy.body}
          referenceMarks={caseStudy.referenceMarks}
          heroSrcs={[trailer?.src, caseStudy.thumbnail?.src].filter((src): src is string => Boolean(src))}
          numberFigures={caseStudy.track === "research"}
          tint={chapter.tint}
          claims={caseStudy.claims}
        />
      ) : (
        <Section density="open" measure="narrow">
          <Heading level={2}>Full case study in progress</Heading>
          <Text muted className="mt-4">
            The role, team, duration, and tools above are accurate. The full write-up, covering
            context, decisions and trade-offs, evidence, and outcome, is still being drafted.
          </Text>
        </Section>
      )}

      {/* 4. The next case */}
      {caseStudy.nextCaseStudy && (
        <section data-tone="dark" aria-labelledby="next-case" className="bg-[var(--color-bg)] text-[var(--color-text)] print:hidden">
          <Container className="py-16 md:py-24">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  Next case study
                </p>
                <h2 id="next-case" className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1]">
                  <Link href={caseStudy.nextCaseStudy.href} className="link-ink no-underline">
                    {caseStudy.nextCaseStudy.title}
                  </Link>
                </h2>
                <Link href={caseStudy.nextCaseStudy.href} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  <span className="link-ink">Open the case study</span>
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
                </Link>
              </div>
              {next?.thumbnail && (
                <HoverStage
                  href={caseStudy.nextCaseStudy.href}
                  label={`Open the next case study: ${caseStudy.nextCaseStudy.title}`}
                  chapter={chapterFor(next.slug)}
                  media={next.thumbnail}
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className="lg:col-span-7"
                />
              )}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

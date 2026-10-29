import type { CSSProperties } from "react";
import type { CaseStudyBlock, ClaimNote } from "@/content/types";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { PullQuote } from "@/components/ui/PullQuote";
import { CaseStudyImage } from "./CaseStudyImage";
import { ImageRow } from "./ImageRow";
import { RevealGroup } from "./RevealGroup";
import { Callout } from "./Callout";
import { Divider } from "./Divider";
import { Timeline } from "./Timeline";
import { LinkCard } from "./LinkCard";
import { ControlledMedia } from "./ControlledMedia";
import { TrustAsymmetryDemo } from "./TrustAsymmetryDemo";
import { BeforeAfterFlow } from "./BeforeAfterFlow";
import { PainPointList } from "./PainPointList";
import { ComparisonDiagram } from "./ComparisonDiagram";
import { VariantComparison } from "./VariantComparison";
import { PhaseFilmstrip } from "./PhaseFilmstrip";
import { AnnotatedScreen } from "./AnnotatedScreen";
import { ScreenPlayer } from "./ScreenPlayer";
import { CostChart } from "./CostChart";
import { ChapterNav, type Chapter } from "./ChapterNav";
import { ParticipantsFigure } from "@/components/research/ParticipantsFigure";
import { StudyDesignFigure } from "@/components/research/StudyDesignFigure";
import { CopyText } from "@/components/ui/CopyText";
import { claimIds, renderInlineMarkdown, renderInlineWithClaims } from "@/lib/inline-markdown";
import { EvidenceClaim, EvidenceMargin, EvidenceProvider } from "./EvidenceLayer";
import { cn, slugify } from "@/lib/utils";

/** Registry for the "interactive" block type's bespoke components (see
 * CaseStudyBlock in content/types.ts for why this is a named registry
 * rather than a generic data-driven block like revealGroup/timeline). */
const interactiveComponents = {
  "lumi-trust-asymmetry": TrustAsymmetryDemo,
} as const;

/** Registered research figures (Phase 4), drawn from each study's own
 * content. See the "figure" block in content/types.ts. */
const figureComponents = {
  "lumi-participants": ParticipantsFigure,
  "lumi-study-design": StudyDesignFigure,
  "lumi-trust-asymmetry": TrustAsymmetryDemo,
} as const;

/** "Figure 3." before a caption, on research pages. */
function FigureLabel({ n }: { n?: number }) {
  if (!n) return null;
  return (
    <span className="mr-1.5 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.1em] text-[var(--color-text)] uppercase">
      Figure {n}.
    </span>
  );
}

/** Evidence-layer claims inside paragraph and list text. */
function renderClaim(id: string, content: React.ReactNode, key: string) {
  return (
    <EvidenceClaim key={key} id={id}>
      {content}
    </EvidenceClaim>
  );
}

/** The claim ids a block carries, in reading order. */
function blockClaims(block: CaseStudyBlock): string[] {
  if (block.type === "paragraph") return claimIds(block.text);
  if (block.type === "list") return block.items.flatMap(claimIds);
  return [];
}

function renderBlock(
  block: CaseStudyBlock,
  key: number,
  referenceMarks?: Record<string, string>,
  figureNumbers?: Map<CaseStudyBlock, number>,
) {
  switch (block.type) {
    case "heading":
      // Semantic level 3 (not 4) here: the section-opening heading above
      // is an h2, so an in-section sub-heading must be an h3 to avoid
      // skipping a level in the document outline. `size={4}` keeps the
      // smaller visual treatment the source's sub-headings call for --
      // semantic level and visual size are independent on this
      // component precisely so accessibility and design don't conflict.
      return (
        <Heading key={key} level={3} size={4} display={false} className="mt-10">
          {block.text}
        </Heading>
      );
    case "paragraph":
      return (
        <Text
          key={key}
          size={block.variant === "caption" ? "small" : undefined}
          muted={block.variant === "caption"}
          className={block.variant === "caption" ? "mt-3 text-center" : "mt-4"}
        >
          {renderInlineWithClaims(block.text, renderClaim)}
        </Text>
      );
    case "list":
      return (
        <ul key={key} className="mt-4 list-disc space-y-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index} className="text-[var(--color-text)]">
              {renderInlineWithClaims(item, renderClaim)}
            </li>
          ))}
        </ul>
      );
    case "metricGrid":
      // Same dt-above/dd-below, font-mono tabular-nums pattern as
      // MetaRow's case-study meta row, just at stat scale (--text-h3)
      // instead of metadata scale -- reused deliberately rather than a
      // new visual treatment. grid-cols-1 on mobile stacks every metric
      // full width (no horizontal overflow risk even for the longer
      // label), sm:grid-cols-3 lines all three up once there's room.
      //
      // min-h-8 on every label reserves the same two-line height
      // regardless of whether a given label actually wraps ("Countries"
      // is one line, "Government platform capacity" is two) -- without
      // it the three numbers below started at different heights, since
      // a grid row's items each begin flush after their own label's
      // real height. Reserving a shared label height keeps all three
      // numbers on one visual baseline, which is the whole point of a
      // scannable stat row.
      return (
        <dl key={key} className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.label}>
              <dt className="min-h-8 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                {item.label}
              </dt>
              <dd className="mt-1 font-mono text-[length:var(--text-h3)] font-medium tabular-nums text-[var(--color-text)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      );
    case "quote":
      return (
        <div key={key} className="mt-6">
          <PullQuote text={block.text} attribution={block.attribution} size={block.size} />
        </div>
      );
    case "image":
      return (
        <div key={key} className="mt-6">
          <CaseStudyImage
            src={block.src}
            width={block.width}
            height={block.height}
            alt={block.alt}
            caption={block.caption}
            figureNumber={figureNumbers?.get(block)}
            enlargeable={block.enlargeable}
          />
        </div>
      );
    case "imageRow":
      return (
        <div key={key} className="mt-6">
          <ImageRow images={block.images} enlargeable={block.enlargeable} tuki={block.tuki} />
        </div>
      );
    case "link": {
      // Convay AI for Physical Meetings rebuild: `referenceMarks` is
      // undefined for every case study except that one, so this stays
      // exactly "mt-4" with a single <a> child -- byte-for-byte the same
      // markup as before -- everywhere `mark` is falsy. See the
      // `referenceMarks` note on CaseStudy in content/types.ts.
      const mark = referenceMarks?.[block.text];
      return (
        <p key={key} className={cn("mt-4", mark && "flex items-center gap-2")}>
          {mark && (
            <span
              aria-hidden="true"
              className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-accent)]/40 px-1 text-[10px] font-semibold tracking-wide text-[var(--color-accent)]"
            >
              {mark}
            </span>
          )}
          <a
            href={block.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium link-ink"
          >
            {block.text}
          </a>
        </p>
      );
    }
    case "revealGroup":
      return <RevealGroup key={key} groups={block.groups} />;
    case "callout":
      return <Callout key={key} text={block.text} />;
    case "divider":
      return <Divider key={key} />;
    case "timeline":
      return <Timeline key={key} steps={block.steps} />;
    case "linkCard":
      return <LinkCard key={key} text={block.text} href={block.href} />;
    case "video":
      return (
        <div key={key} className="mt-6">
          <ControlledMedia
            src={block.src}
            poster={block.poster}
            width={block.width}
            height={block.height}
            alt={block.alt}
            caption={block.caption}
          />
        </div>
      );
    case "interactive": {
      const InteractiveComponent = interactiveComponents[block.key];
      return <InteractiveComponent key={key} />;
    }
    case "beforeAfterFlow":
      return (
        <BeforeAfterFlow
          key={key}
          oldLabel={block.oldLabel}
          oldSteps={block.oldSteps}
          newLabel={block.newLabel}
          newSteps={block.newSteps}
        />
      );
    case "painPointList":
      return <PainPointList key={key} items={block.items} />;
    case "twoColumnCompare":
      return (
        <ComparisonDiagram
          key={key}
          leftLabel={block.leftLabel}
          leftText={block.leftText}
          rightLabel={block.rightLabel}
          rightText={block.rightText}
          caption={block.caption}
        />
      );
    case "flowSteps":
      // Reuses Timeline rather than a bespoke chip-and-arrow layout: an
      // earlier version built its own horizontal-chips-plus-arrow-glyph
      // diagram, which broke visually the moment it needed to wrap (a
      // step's trailing arrow could end up stranded at the end of one
      // row with its target chip pushed to the next). Timeline's
      // node-and-connecting-line pattern is already proven elsewhere on
      // this site and has no such wrap case, since flex-1 items shrink
      // together instead of wrapping.
      return <Timeline key={key} steps={block.steps.map((step) => ({ label: step }))} />;
    case "variantComparison":
      return <VariantComparison key={key} label={block.label} variants={block.variants} />;
    case "phaseGroup":
      return (
        <PhaseFilmstrip key={key} label={block.label} intro={block.intro} images={block.images} />
      );
    case "annotated":
      return (
        <div key={key} className="mt-8">
          <AnnotatedScreen label={block.label} image={block.image} device={block.device} notes={block.notes} />
        </div>
      );
    case "screenPlayer":
      return (
        <div key={key} className="mt-8">
          <ScreenPlayer label={block.label} screens={block.screens} />
        </div>
      );
    case "costChart":
      return (
        <div key={key} className="mt-8">
          <CostChart label={block.label} caption={block.caption} items={block.items} />
        </div>
      );
    case "details":
      return (
        <details
          key={key}
          className="group/details mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius-lg)] px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
            <span>{block.summary}</span>
            <span
              aria-hidden="true"
              className="font-[family-name:var(--font-mono)] text-base leading-none text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] group-open/details:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-[var(--color-border)] px-5 pt-2 pb-6">
            {block.blocks.map((child, index) => renderBlock(child, index, referenceMarks, figureNumbers))}
          </div>
        </details>
      );
    case "figure": {
      const FigureComponent = block.key ? figureComponents[block.key] : null;
      return (
        <figure key={key} className="mt-8">
          {FigureComponent && <FigureComponent />}
          {block.blocks?.map((child, index) => renderBlock(child, index, referenceMarks, figureNumbers))}
          <figcaption className="mt-3 max-w-[var(--measure)] text-sm text-[var(--color-text-muted)]">
            <FigureLabel n={figureNumbers?.get(block)} />
            <span className="font-medium text-[var(--color-text)]">{block.title}.</span>
            {block.caption ? ` ${block.caption}` : ""}
            {block.illustrative && (
              <span className="mt-2 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.08em] uppercase">
                <span aria-hidden="true" className="inline-block h-px w-4 bg-[var(--color-text-muted)]" />
                Illustrative · {block.illustrative}
              </span>
            )}
          </figcaption>
        </figure>
      );
    }
    case "aside":
      return (
        <aside
          key={key}
          aria-label={block.label}
          className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] px-5 py-5 sm:px-6"
        >
          <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            {block.label}
          </p>
          <ul className="mt-3 space-y-2">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 bg-[var(--color-text)]" />
                <span>{renderInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "citation":
      return (
        <div key={key} className="mt-6 rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)] px-5 py-5 sm:px-6">
          <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            {block.label}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-lg leading-relaxed">
            {renderInlineMarkdown(block.text)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CopyText text={block.text.replace(/\*/g, "")} label="Copy citation" />
            {block.note && <span className="text-sm text-[var(--color-text-muted)]">{block.note}</span>}
          </div>
        </div>
      );
    default:
      return null;
  }
}

/** Blocks that carry visuals or interactions get the wider measure;
 * running text keeps the reading measure (about 68 characters). */
const WIDE_BLOCKS = new Set<CaseStudyBlock["type"]>([
  "image",
  "imageRow",
  "video",
  "phaseGroup",
  "variantComparison",
  "twoColumnCompare",
  "beforeAfterFlow",
  "interactive",
  "revealGroup",
  "timeline",
  "flowSteps",
  "metricGrid",
  "figure",
  "annotated",
  "screenPlayer",
  "costChart",
]);

/** Drops media that duplicates the case hero (Phase 3): the header stage
 * already plays the project's loop, so the same loop opening the body
 * would show it twice in a row. A single image that opens the body, ahead
 * of every chapter, was the old page's hero shot, so the stage replaces
 * it too (Lumi and aRENEWberg open with a still of the same screen the
 * stage is already playing). */
function withoutHeroDuplicates(blocks: CaseStudyBlock[], heroSrcs: string[]) {
  if (!heroSrcs.length) return blocks;
  const isHero = (src: string) => heroSrcs.includes(src);
  const result: CaseStudyBlock[] = [];
  let beforeFirstHeading = true;
  for (const [index, block] of blocks.entries()) {
    if (index === 0 && block.type === "image" && !block.caption) continue;
    if (block.type === "heading" && block.level === 3) beforeFirstHeading = false;
    if (beforeFirstHeading) {
      if (block.type === "image" && isHero(block.src)) continue;
      if (block.type === "imageRow") {
        const images = block.images.filter((image) => !isHero(image.src));
        if (!images.length) continue;
        result.push({ ...block, images });
        continue;
      }
    }
    result.push(block);
  }
  return result;
}

/**
 * The case study body (Phase 3 template).
 *
 * One calm paper page instead of alternating dark and light bands: past
 * two, the alternation stopped reading as pacing and started reading as
 * stripes. Each level-3 heading starts a numbered chapter. On wide
 * screens a chapter rail sits beside the reading column; on smaller
 * screens a slim bar under the navigation does the same job. Text keeps
 * the reading measure; visuals and interactive moments get a wider one.
 */
export function CaseStudyBody({
  blocks,
  referenceMarks,
  heroSrcs = [],
  numberFigures = false,
  tint,
  companion,
  claims,
}: {
  /** The chapter rail's mascot, if the project has one (see ChapterNav). */
  companion?: "tuki";
  blocks: CaseStudyBlock[];
  /** Evidence notes for the claims marked in the text (see EvidenceLayer). */
  claims?: Record<string, ClaimNote>;
  /** The case's chapter color, for dark moments inside the body (the
   * prototype player sits on the same lit ground as the project films). */
  tint?: string;
  /** Convay AI for Physical Meetings rebuild: see the `referenceMarks`
   * note on CaseStudy in content/types.ts. Undefined for every other
   * case study, which keeps every "link" block's markup unchanged. */
  referenceMarks?: Record<string, string>;
  /** Sources already playing in the case hero, removed from the body. */
  heroSrcs?: string[];
  /** Research pages number figures and captioned images in reading order. */
  numberFigures?: boolean;
}) {
  const sections: { heading: CaseStudyBlock & { type: "heading" }; body: CaseStudyBlock[] }[] = [];
  for (const block of withoutHeroDuplicates(blocks, heroSrcs)) {
    if (block.type === "heading" && block.level === 3) {
      sections.push({ heading: block, body: [] });
      continue;
    }
    if (sections.length === 0) {
      // Content before the first chapter heading: an untitled opening.
      sections.push({ heading: { type: "heading", level: 3, text: "" }, body: [] });
    }
    sections[sections.length - 1]!.body.push(block);
  }

  // Figure numbers in reading order: figure blocks and captioned images.
  const figureNumbers = new Map<CaseStudyBlock, number>();
  if (numberFigures) {
    let figure = 0;
    const visit = (block: CaseStudyBlock) => {
      if (block.type === "figure" || (block.type === "image" && block.caption)) {
        figureNumbers.set(block, ++figure);
      }
      if (block.type === "details") block.blocks.forEach(visit);
    };
    sections.forEach((section) => section.body.forEach(visit));
  }

  // Evidence notes, numbered in reading order.
  const numberedClaims: Record<string, ClaimNote & { n: number }> = {};
  if (claims) {
    let claimNumber = 0;
    sections.forEach((section) =>
      section.body.forEach((block) =>
        blockClaims(block).forEach((id) => {
          const note = claims[id];
          if (note && !numberedClaims[id]) numberedClaims[id] = { ...note, n: ++claimNumber };
        }),
      ),
    );
  }

  const sectionHasClaims = (body: CaseStudyBlock[]) =>
    body.some((block) => blockClaims(block).some((id) => numberedClaims[id]));

  let n = 0;
  const chapters: Chapter[] = [];
  const numbered = sections.map((section) => {
    if (!section.heading.text) return { ...section, id: undefined, n: 0 };
    n += 1;
    const id = `ch-${slugify(section.heading.text)}`;
    chapters.push({ id, n, title: section.heading.text });
    return { ...section, id, n };
  });

  return (
    <div
      id="case-body"
      style={tint ? ({ "--chapter-tint": tint } as CSSProperties) : undefined}
      className="mx-auto w-full max-w-7xl px-4 pt-12 pb-24 sm:px-6 md:pt-16 lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-14 lg:px-8 lg:pt-20"
    >
      <ChapterNav chapters={chapters} containerId="case-body" companion={companion} />
      <EvidenceProvider notes={numberedClaims} className="min-w-0">
        {numbered.map((section, index) => (
          <section
            key={index}
            id={section.id}
            aria-labelledby={section.id ? `${section.id}-title` : undefined}
            className={cn("scroll-mt-32 lg:scroll-mt-24", index > 0 && "mt-16 md:mt-24")}
          >
            {section.id && (
              <header className="mb-2 max-w-[var(--measure)]">
                <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  Chapter {String(section.n).padStart(2, "0")}
                </p>
                <Heading level={2} id={`${section.id}-title`} className="mt-2">
                  {section.heading.text}
                </Heading>
              </header>
            )}
            {section.body.map((block, blockIndex) => {
              const ids = blockClaims(block).filter((id) => numberedClaims[id]);
              return (
                <div
                  key={blockIndex}
                  data-note-barrier={claims && WIDE_BLOCKS.has(block.type) ? "" : undefined}
                  className={cn(
                    WIDE_BLOCKS.has(block.type) ? "max-w-[var(--measure-wide)]" : "max-w-[var(--measure)]",
                    // A paragraph with marked claims gets its notes in the
                    // margin beside it on wide screens.
                    ids.length > 0 &&
                      "xl:grid xl:max-w-none xl:grid-cols-[minmax(0,var(--measure))_15rem] xl:items-start xl:gap-10",
                    // Each block sits in its own wrapper, so `first:` cannot
                    // see a sub-heading that opens a chapter; trim it here.
                    blockIndex === 0 && "[&>h3]:mt-4",
                  )}
                >
                  {renderBlock(block, blockIndex, referenceMarks, figureNumbers)}
                  {ids.length > 0 && <EvidenceMargin ids={ids} />}
                </div>
              );
            })}
            {/* Margin notes may run past a chapter's last paragraph; this
                marks where they have to stop (see EvidenceLayer). */}
            {sectionHasClaims(section.body) && <div data-note-barrier="" aria-hidden="true" />}
          </section>
        ))}
        {/* On paper there is no margin to hover, so the notes for the
            numbered claims are listed once at the end. */}
        {Object.keys(numberedClaims).length > 0 && (
          <section className="mt-16 hidden border-t border-[#999] pt-6 print:block">
            <h2 className="font-[family-name:var(--font-display)] text-[14pt]">Sources for the numbered claims</h2>
            <ol className="mt-3 space-y-2 text-[9.5pt] leading-snug">
              {Object.values(numberedClaims)
                .sort((a, b) => a.n - b.n)
                .map((note) => (
                  <li key={note.n} className="flex gap-3">
                    <span className="w-4 shrink-0 font-[family-name:var(--font-mono)]">{note.n}</span>
                    <span>
                      <strong className="font-medium">{note.label}.</strong> {note.source}
                    </span>
                  </li>
                ))}
            </ol>
          </section>
        )}
      </EvidenceProvider>
    </div>
  );
}

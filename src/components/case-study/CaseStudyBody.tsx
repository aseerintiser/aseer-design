import type { CaseStudyBlock } from "@/content/types";
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
import { ReducedMotionHero } from "./ReducedMotionHero";
import { ChapterNav, type Chapter } from "./ChapterNav";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { cn } from "@/lib/utils";

/** Registry for the "interactive" block type's bespoke components (see
 * CaseStudyBlock in content/types.ts for why this is a named registry
 * rather than a generic data-driven block like revealGroup/timeline). */
const interactiveComponents = {
  "lumi-trust-asymmetry": TrustAsymmetryDemo,
} as const;

function renderBlock(
  block: CaseStudyBlock,
  key: number,
  referenceMarks?: Record<string, string>,
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
          {renderInlineMarkdown(block.text)}
        </Text>
      );
    case "list":
      return (
        <ul key={key} className="mt-4 list-disc space-y-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index} className="text-[var(--color-text)]">
              {renderInlineMarkdown(item)}
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
            enlargeable={block.enlargeable}
          />
        </div>
      );
    case "imageRow":
      return (
        <div key={key} className="mt-6">
          <ImageRow images={block.images} enlargeable={block.enlargeable} />
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
    case "reducedMotionHero":
      return (
        <div key={key} className="mt-6">
          <ReducedMotionHero
            loopSrc={block.loopSrc}
            fallbackSrc={block.fallbackSrc}
            width={block.width}
            height={block.height}
            loopAlt={block.loopAlt}
            fallbackAlt={block.fallbackAlt}
          />
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
            {block.blocks.map((child, index) => renderBlock(child, index, referenceMarks))}
          </div>
        </details>
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
  "reducedMotionHero",
  "phaseGroup",
  "variantComparison",
  "twoColumnCompare",
  "beforeAfterFlow",
  "interactive",
  "revealGroup",
  "timeline",
  "flowSteps",
  "metricGrid",
]);

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
      if (block.type === "reducedMotionHero" && isHero(block.loopSrc)) continue;
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
}: {
  blocks: CaseStudyBlock[];
  /** Convay AI for Physical Meetings rebuild: see the `referenceMarks`
   * note on CaseStudy in content/types.ts. Undefined for every other
   * case study, which keeps every "link" block's markup unchanged. */
  referenceMarks?: Record<string, string>;
  /** Sources already playing in the case hero, removed from the body. */
  heroSrcs?: string[];
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
    <div id="case-body" className="mx-auto w-full max-w-7xl px-4 pt-12 pb-24 sm:px-6 md:pt-16 lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-14 lg:px-8 lg:pt-20">
      <ChapterNav chapters={chapters} containerId="case-body" />
      <div className="min-w-0">
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
            {section.body.map((block, blockIndex) => (
              <div
                key={blockIndex}
                className={cn(
                  WIDE_BLOCKS.has(block.type) ? "max-w-[var(--measure-wide)]" : "max-w-[var(--measure)]",
                  // Each block sits in its own wrapper, so `first:` cannot
                  // see a sub-heading that opens a chapter; trim it here.
                  blockIndex === 0 && "[&>h3]:mt-4",
                )}
              >
                {renderBlock(block, blockIndex, referenceMarks)}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

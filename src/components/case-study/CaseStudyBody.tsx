import type { CaseStudyBlock } from "@/content/types";
import { Section } from "@/components/layout/Section";
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
import { renderInlineMarkdown } from "@/lib/inline-markdown";

/** Registry for the "interactive" block type's bespoke components (see
 * CaseStudyBlock in content/types.ts for why this is a named registry
 * rather than a generic data-driven block like revealGroup/timeline). */
const interactiveComponents = {
  "lumi-trust-asymmetry": TrustAsymmetryDemo,
} as const;

/** Ghost numeral matching the one used for placeholder/research case
 * studies, reused here so migrated and not-yet-written case studies
 * share the same chapter-marker device. */
function SectionNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="mb-2 block font-[family-name:var(--font-display)] text-sm text-[var(--color-text-muted)]/70 select-none"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

function renderBlock(block: CaseStudyBlock, key: number) {
  switch (block.type) {
    case "heading":
      // Semantic level 3 (not 4) here: the section-opening heading above
      // is an h2, so an in-section sub-heading must be an h3 to avoid
      // skipping a level in the document outline. `size={4}` keeps the
      // smaller visual treatment the source's sub-headings call for --
      // semantic level and visual size are independent on this
      // component precisely so accessibility and design don't conflict.
      return (
        <Heading key={key} level={3} size={4} display={false} className="mt-8 first:mt-0">
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
    case "link":
      return (
        <p key={key} className="mt-4">
          <a
            href={block.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[var(--color-accent)] underline underline-offset-4"
          >
            {block.text}
          </a>
        </p>
      );
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
    default:
      return null;
  }
}

/**
 * Renders a migrated case study's real body content (Milestone 2).
 * Unlike the seven-section framework used for not-yet-written case
 * studies, live content is split into Sections at each top-level
 * ("heading", level 3) block, preserving each project's own organic
 * structure (e.g. "Convay at a Glance", "The Problem", "Design Process
 * & Reasoning") exactly as it exists on the live site, rather than
 * force-fitting it into Context/Decisions/Evidence/Outcome/Reflection.
 * Section tone alternates light/dark for scroll rhythm, same as
 * everywhere else on the site.
 */
export function CaseStudyBody({ blocks }: { blocks: CaseStudyBlock[] }) {
  const sections: { heading: CaseStudyBlock & { type: "heading" }; body: CaseStudyBlock[] }[] = [];

  for (const block of blocks) {
    if (block.type === "heading" && block.level === 3) {
      sections.push({ heading: block, body: [] });
      continue;
    }
    if (sections.length === 0) {
      // Content appearing before the first level-3 heading (rare) --
      // start an implicit untitled section rather than dropping it.
      sections.push({ heading: { type: "heading", level: 3, text: "" }, body: [] });
    }
    sections[sections.length - 1]!.body.push(block);
  }

  return (
    <>
      {sections.map((section, index) => (
        // Visual QA milestone: this Section previously used the default
        // (1280px) container width, while the paragraph/list text inside
        // it was separately capped to the narrower reading measure with
        // no auto-centering -- on real wide viewports that left the text
        // hugging the container's left edge with 500-700px of dead,
        // unbalanced space to its right. Narrowing the container itself
        // to the reading measure means every block in a section (heading,
        // paragraph, list, quote, callout, timeline, image) shares one
        // centered column with equal margins on both sides, which reads
        // as an intentional editorial layout instead of a rendering bug.
        <Section
          key={index}
          density={index === sections.length - 1 ? "open" : "default"}
          tone={index % 2 === 1 ? "dark" : undefined}
          measure="narrow"
        >
          {section.heading.text && <SectionNumber n={index + 1} />}
          {section.heading.text && <Heading level={2}>{section.heading.text}</Heading>}
          {section.body.map((block, blockIndex) => renderBlock(block, blockIndex))}
        </Section>
      ))}
    </>
  );
}

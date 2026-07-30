import type { CaseStudyBlock } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { PullQuote } from "@/components/ui/PullQuote";
import { CaseStudyImage } from "./CaseStudyImage";
import { ImageRow } from "./ImageRow";
import { renderInlineMarkdown } from "@/lib/inline-markdown";

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
        <Text key={key} className="mt-4 max-w-[var(--measure)]">
          {renderInlineMarkdown(block.text)}
        </Text>
      );
    case "list":
      return (
        <ul key={key} className="mt-4 max-w-[var(--measure)] list-disc space-y-2 pl-5">
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
          <PullQuote text={block.text} attribution={block.attribution} />
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
          />
        </div>
      );
    case "imageRow":
      return (
        <div key={key} className="mt-6">
          <ImageRow images={block.images} />
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
        <Section
          key={index}
          density={index === sections.length - 1 ? "open" : "default"}
          tone={index % 2 === 1 ? "dark" : undefined}
        >
          {section.heading.text && <SectionNumber n={index + 1} />}
          {section.heading.text && <Heading level={2}>{section.heading.text}</Heading>}
          {section.body.map((block, blockIndex) => renderBlock(block, blockIndex))}
        </Section>
      ))}
    </>
  );
}

import type { CaseStudy } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { MetaRow } from "@/components/ui/MetaRow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CaseStudyBody } from "./CaseStudyBody";
import { renderInlineMarkdown } from "@/lib/inline-markdown";

/** Large ghost numeral marking each section, an editorial "chapter
 * marker" device (Design Brief Nice-to-Have) that also reinforces the
 * fixed seven-part structure itself -- a reviewer can see at a glance
 * how far through the framework they are. */
function SectionNumber({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      className="mb-2 block font-[family-name:var(--font-display)] text-sm text-[var(--color-text-muted)]/70 select-none"
    >
      {n}
    </span>
  );
}

/**
 * Case-study page shell: header (title, scope, meta) plus either real
 * migrated content or an honest "not written yet" placeholder.
 *
 * Originally this rendered a fixed seven-section framework
 * (Portfolio_Content_Architecture_Blueprint.md Part 5) for every case
 * study. Milestone 2 replaced that with `caseStudy.body` -- migrated
 * live-site content that keeps each project's own organic section
 * structure instead of force-fitting it into that template (see
 * CaseStudyBody.tsx). Case studies without real content yet (the
 * research track, still sourced only from the Career Archive) fall back
 * to a single consolidated placeholder panel instead of pretending six
 * distinct sections exist.
 */
export function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  // Migrated (Milestone 2) case studies carry richer, multi-value
  // Role/Category/Tools straight from the live site's CATEGORY/ROLE/TOOLS
  // lines. Team and Duration have no live-site equivalent (the source
  // site doesn't state them per project) so those still come from the
  // archive-sourced `meta` fields either way.
  const metaItems = caseStudy.liveMeta
    ? [
        { label: "Role", value: caseStudy.liveMeta.role.join(", ") },
        { label: "Category", value: caseStudy.liveMeta.category.join(", ") },
        { label: "Duration", value: caseStudy.meta.duration },
        { label: "Tools", value: caseStudy.liveMeta.tools.join(", ") },
      ]
    : [
        { label: "Role", value: caseStudy.meta.role },
        { label: "Team", value: caseStudy.meta.team },
        { label: "Duration", value: caseStudy.meta.duration },
        { label: "Tools", value: caseStudy.meta.tools },
      ];

  return (
    <article>
      <ScrollProgress />

      {/* 1. Header. Role, team, duration, and tools are real facts
          (sourced from the career archive or migrated from the live
          site), so these render regardless of contentStatus -- only the
          narrative sections below are gated on it. */}
      <Section as="header" density="open">
        <Eyebrow>{caseStudy.track === "work" ? "Work" : "Research"}</Eyebrow>
        <Heading level={1} size="display" className="mt-2 max-w-4xl">
          {caseStudy.title}
        </Heading>
        <Text size="lead" muted className="mt-4 max-w-[var(--measure)]">
          {renderInlineMarkdown(caseStudy.oneLineScope)}
        </Text>
        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          <MetaRow items={metaItems} />
        </div>
      </Section>

      {caseStudy.body ? (
        <CaseStudyBody blocks={caseStudy.body} />
      ) : (
        /* One honest, considered "not written yet" state instead of six
           sections that would otherwise all repeat the same generic
           filler sentence (and repeat it identically across every other
           case study on the site) -- that pattern reads as an abandoned
           template, not a portfolio still being written. This says the
           same thing once, clearly, and stops. */
        <Section density="open" tone="dark" measure="narrow">
          <SectionNumber n="—" />
          <Heading level={2}>Full case study in progress</Heading>
          <Text muted className="mt-4">
            The role, team, duration, and tools above are accurate. The full
            write-up, covering context, decisions and trade-offs, evidence,
            and outcome, is still being drafted.
          </Text>
        </Section>
      )}
    </article>
  );
}

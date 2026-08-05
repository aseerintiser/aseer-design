import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { MetaRow } from "@/components/ui/MetaRow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CaseStudyBody } from "./CaseStudyBody";
import { renderInlineMarkdown } from "@/lib/inline-markdown";

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
        // Convay Mobile App Revamp rebuild: optional 5th field. Every
        // other case study's liveMeta omits `status`, so this array
        // stays exactly four items everywhere else.
        ...(caseStudy.liveMeta.status
          ? [{ label: "Status", value: caseStudy.liveMeta.status }]
          : []),
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
          narrative sections below are gated on it.

          Convay Mobile App Revamp rebuild: `compactHero` trims this
          section's bottom padding from the shared "open" density down
          to a single tighter gap when set. 01_Audit.md measured roughly
          1,000px of dead space between this header and the first hero
          visual on the live page -- two independently-padded sections
          stacked back to back, reading as a loading gap rather than an
          intentional pause. Scoped to a per-case-study opt-in (default
          unset) specifically so no other case study's header spacing
          changes; every other case study still gets the full "open"
          padding on both sides exactly as before. */}
      <Section
        as="header"
        density="open"
        className={caseStudy.compactHero ? "pb-[var(--space-xl)] md:pb-[var(--space-2xl)]" : undefined}
      >
        <Eyebrow>{caseStudy.track === "work" ? "Work" : "Research"}</Eyebrow>
        <Heading level={1} size="display" className="mt-2 max-w-4xl">
          {caseStudy.title}
        </Heading>
        <Text size="lead" muted className="mt-4 max-w-[var(--measure)]">
          {renderInlineMarkdown(caseStudy.oneLineScope)}
        </Text>
        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          <MetaRow
            items={metaItems}
            className={metaItems.length > 4 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : undefined}
          />
        </div>
      </Section>

      {caseStudy.body ? (
        <CaseStudyBody blocks={caseStudy.body} referenceMarks={caseStudy.referenceMarks} />
      ) : (
        /* One honest, considered "not written yet" state instead of six
           sections that would otherwise all repeat the same generic
           filler sentence (and repeat it identically across every other
           case study on the site) -- that pattern reads as an abandoned
           template, not a portfolio still being written. This says the
           same thing once, clearly, and stops. */
        <Section density="open" tone="dark" measure="narrow">
          {/* Typography cleanup milestone: this panel previously opened
              with a ghost em-dash numeral standing in for a section
              number that doesn't exist yet. There's no real chapter to
              count here, so the honest fix is to not show a numeral at
              all, rather than invent a placeholder glyph. */}
          <Heading level={2}>Full case study in progress</Heading>
          <Text muted className="mt-4">
            The role, team, duration, and tools above are accurate. The full
            write-up, covering context, decisions and trade-offs, evidence,
            and outcome, is still being drafted.
          </Text>
        </Section>
      )}

      {/* Convay Mobile App Revamp rebuild: "next case study" link, kept
          out of the shared, sitewide Footer component on purpose --
          Footer.tsx renders once in app/layout.tsx with no per-page
          props, so adding a link there would either affect every page
          or require restructuring how every page mounts its footer.
          Rendering it here instead, as the last thing in this one case
          study's own content, gets the same reading-order outcome
          (dead-ends fixed, "keep exploring" reads before "get in
          touch") without touching Footer or any other page. Styled to
          match the footer's own link weight (text + arrow, muted, no
          button chrome) so it reads as one continuous close rather than
          two visually different systems. */}
      {caseStudy.nextCaseStudy && (
        <Section density="dense" measure="narrow">
          <Link
            href={caseStudy.nextCaseStudy.href}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:text-[var(--color-text)]"
          >
            Next case study: {caseStudy.nextCaseStudy.title}
            <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
          </Link>
        </Section>
      )}
    </article>
  );
}

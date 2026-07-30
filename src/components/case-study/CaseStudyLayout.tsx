import type { CaseStudy, SourcedMetric } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { MetaRow } from "@/components/ui/MetaRow";
import { EvidenceStatusTag } from "@/components/ui/EvidenceStatusTag";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { Eyebrow } from "@/components/ui/Eyebrow";

function MetricList({ metrics }: { metrics: SourcedMetric[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {metrics.map((metric) => (
        <StaggerItem
          key={metric.label}
          className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"
        >
          <dl>
            <div className="flex items-start justify-between gap-2">
              <dt className="text-sm text-[var(--color-text-muted)]">
                {metric.label}
              </dt>
              <EvidenceStatusTag status={metric.status} />
            </div>
            <dd className="mt-1 font-mono text-xl font-medium tabular-nums">
              {metric.value}
            </dd>
          </dl>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

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
 * The reusable seven-section case-study template, implementing
 * Portfolio_Content_Architecture_Blueprint.md Part 5 exactly in this
 * order: Header, Context, Role & Collaboration, Decisions & Trade-offs,
 * Evidence & Testing, Outcome, Reflection.
 *
 * Motion is deliberately uneven across sections rather than one Reveal
 * wrapped around everything: Context and Role & Collaboration are plain
 * paragraphs and render directly (per the Creative Direction's "plain
 * text generally doesn't need one at all"); Decisions and the metric
 * blocks are the sections that actually benefit from a reveal (data,
 * discrete items) and use a coordinated stagger instead of N identical
 * fade-ups.
 *
 * The seven sections only render once `caseStudy.contentStatus` is
 * "complete". While it's "placeholder" (every case study right now),
 * a single consolidated section renders instead -- see the
 * `isPlaceholder` branch below.
 */
export function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  const isPlaceholder = caseStudy.contentStatus === "placeholder";

  return (
    <article>
      <ScrollProgress />

      {/* 1. Header. Role, team, duration, and tools are real facts
          (sourced from the career archive), so these render regardless
          of contentStatus -- only the six narrative sections below are
          gated on it. */}
      <Section as="header" density="open">
        <Eyebrow>{caseStudy.track === "work" ? "Work" : "Research"}</Eyebrow>
        <Heading level={1} size="display" className="mt-2 max-w-4xl">
          {caseStudy.title}
        </Heading>
        <Text size="lead" muted className="mt-4 max-w-[var(--measure)]">
          {caseStudy.oneLineScope}
        </Text>
        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          <MetaRow
            items={[
              { label: "Role", value: caseStudy.meta.role },
              { label: "Team", value: caseStudy.meta.team },
              { label: "Duration", value: caseStudy.meta.duration },
              { label: "Tools", value: caseStudy.meta.tools },
            ]}
          />
        </div>
      </Section>

      {isPlaceholder ? (
        /* One honest, considered "not written yet" state instead of six
           sections that would otherwise all repeat the same generic
           filler sentence (and repeat it identically across every other
           case study on the site) -- that pattern reads as an abandoned
           template, not a portfolio still being written. This says the
           same thing once, clearly, and stops. */
        <Section density="open" tone="dark">
          <SectionNumber n="—" />
          <Heading level={2}>Full case study in progress</Heading>
          <Text muted className="mt-4 max-w-[var(--measure)]">
            The role, team, duration, and tools above are accurate. The full
            write-up, covering context, decisions and trade-offs, evidence,
            and outcome, is still being drafted.
          </Text>
        </Section>
      ) : (
        <>
          {/* 2. Context */}
          <Section density="default">
            <SectionNumber n="01" />
            <Heading level={2}>Context</Heading>
            <Text className="mt-4 max-w-[var(--measure)]">{caseStudy.context}</Text>
          </Section>

          {/* 3. Role & Collaboration */}
          <Section density="default" tone="dark">
            <SectionNumber n="02" />
            <Heading level={2}>Role &amp; Collaboration</Heading>
            <Text className="mt-4 max-w-[var(--measure)]">
              {caseStudy.roleAndCollaboration}
            </Text>
          </Section>

          {/* 4. Decisions & Trade-offs */}
          <Section density="default">
            <SectionNumber n="03" />
            <Heading level={2}>Decisions &amp; Trade-offs</Heading>
            <StaggerContainer className="mt-6 space-y-8">
              {caseStudy.decisions.map((decision) => (
                <StaggerItem key={decision.title}>
                  <Heading level={3} display={false}>
                    {decision.title}
                  </Heading>
                  <Text className="mt-2 max-w-[var(--measure)]">{decision.body}</Text>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Section>

          {/* 5. Evidence & Testing */}
          <Section density="dense" tone="dark">
            <SectionNumber n="04" />
            <Heading level={2}>Evidence &amp; Testing</Heading>
            <Text className="mt-4 max-w-[var(--measure)]">
              {caseStudy.evidence.body}
            </Text>
            {caseStudy.evidence.metrics && caseStudy.evidence.metrics.length > 0 && (
              <div className="mt-6">
                <MetricList metrics={caseStudy.evidence.metrics} />
              </div>
            )}
          </Section>

          {/* 6. Outcome */}
          <Section density="default">
            <SectionNumber n="05" />
            <Heading level={2}>Outcome</Heading>
            <Text className="mt-4 max-w-[var(--measure)]">{caseStudy.outcome.body}</Text>
            {caseStudy.outcome.metrics && caseStudy.outcome.metrics.length > 0 && (
              <div className="mt-6">
                <MetricList metrics={caseStudy.outcome.metrics} />
              </div>
            )}
          </Section>

          {/* 7. Reflection. Extra-open density and no numeral -- a
              deliberate quiet beat at the close, per the Creative
              Direction's "deliberately large, empty beat... mirrors a pause
              before a closing scene." */}
          <Section density="open">
            <Heading level={2}>Reflection</Heading>
            <Text size="lead" className="mt-4 max-w-[var(--measure)]">
              {caseStudy.reflection}
            </Text>
          </Section>
        </>
      )}
    </article>
  );
}

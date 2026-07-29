import type { CaseStudy, SourcedMetric } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { MetaRow } from "@/components/ui/MetaRow";
import { EvidenceStatusTag } from "@/components/ui/EvidenceStatusTag";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Reveal } from "@/components/ui/Reveal";

function MetricList({ metrics }: { metrics: SourcedMetric[] }) {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <dt className="text-sm text-[var(--color-text-muted)]">
              {metric.label}
            </dt>
            <EvidenceStatusTag status={metric.status} />
          </div>
          <dd className="mt-1 text-xl font-medium">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The reusable seven-section case-study template, implementing
 * Portfolio_Content_Architecture_Blueprint.md Part 5 exactly in this
 * order: Header, Context, Role & Collaboration, Decisions & Trade-offs,
 * Evidence & Testing, Outcome, Reflection. Every project case study
 * (Milestones 4-7 of the wider roadmap) renders through this one
 * component so the framework only needs to be built once, per the
 * Blueprint's own writing-order rationale.
 *
 * Density alternates deliberately (open hero, dense evidence, open
 * reflection) per the Creative Direction's pacing rule; this is
 * structure only for this milestone; body copy throughout is
 * placeholder pending the per-project writing milestones.
 */
export function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article>
      <ScrollProgress />

      {/* 1. Header */}
      <Section as="header" density="open">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          {caseStudy.track === "work" ? "Work" : "Research"}
        </p>
        <Heading level={1} size="display" className="mt-2">
          {caseStudy.title}
        </Heading>
        <Text size="lead" muted className="mt-4 max-w-[var(--measure)]">
          {caseStudy.oneLineScope}
        </Text>
        <div className="mt-8">
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

      {/* 2. Context */}
      <Section density="default">
        <Reveal>
          <Heading level={2}>Context</Heading>
          <Text className="mt-4 max-w-[var(--measure)]">
            {caseStudy.context}
          </Text>
        </Reveal>
      </Section>

      {/* 3. Role & Collaboration */}
      <Section density="default" tone="dark">
        <Reveal>
          <Heading level={2}>Role &amp; Collaboration</Heading>
          <Text className="mt-4 max-w-[var(--measure)]">
            {caseStudy.roleAndCollaboration}
          </Text>
        </Reveal>
      </Section>

      {/* 4. Decisions & Trade-offs */}
      <Section density="default">
        <Heading level={2}>Decisions &amp; Trade-offs</Heading>
        <div className="mt-6 space-y-8">
          {caseStudy.decisions.map((decision) => (
            <Reveal key={decision.title}>
              <Heading level={3} display={false}>
                {decision.title}
              </Heading>
              <Text className="mt-2 max-w-[var(--measure)]">{decision.body}</Text>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Evidence & Testing */}
      <Section density="dense" tone="dark">
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
        <Heading level={2}>Outcome</Heading>
        <Text className="mt-4 max-w-[var(--measure)]">
          {caseStudy.outcome.body}
        </Text>
        {caseStudy.outcome.metrics && caseStudy.outcome.metrics.length > 0 && (
          <div className="mt-6">
            <MetricList metrics={caseStudy.outcome.metrics} />
          </div>
        )}
      </Section>

      {/* 7. Reflection */}
      <Section density="open">
        <Heading level={2}>Reflection</Heading>
        <Text size="lead" className="mt-4 max-w-[var(--measure)]">
          {caseStudy.reflection}
        </Text>
      </Section>
    </article>
  );
}

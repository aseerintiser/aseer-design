interface FlowStepsDiagramProps {
  steps: string[];
}

/**
 * Real step-sequence component, replacing the live page's inline
 * italicized arrow text ("set meeting context -> record audio -> ...")
 * with an actual visual diagram (Convay AI for Physical Meetings
 * rebuild, 04_Visual_Specification.md). Five labeled chips connected by
 * arrows on wide viewports; stacks vertically with downward chevrons
 * below ~640px per the same spec.
 *
 * A real ordered list under the hood (<ol>), not styled <div>s standing
 * in for meaningful content, so a screen reader gets the same five-step
 * sequence a sighted reader sees, per 07_Implementation_Guide.md's
 * accessibility note. The arrows/chevrons are decorative (aria-hidden);
 * the list order itself carries the sequence.
 *
 * Generic and content-agnostic, like BeforeAfterFlow -- called out in
 * 04_Visual_Specification.md as a good candidate for other case studies
 * describing a linear flow in prose only.
 */
export function FlowStepsDiagram({ steps }: FlowStepsDiagramProps) {
  return (
    <ol className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col items-center gap-2 sm:flex-row sm:gap-0">
          <span className="rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-text)_25%,transparent)] px-4 py-2 text-center text-sm text-[var(--color-text)]">
            {step}
          </span>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center px-2 text-[var(--color-text-muted)] sm:px-3"
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

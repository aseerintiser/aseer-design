interface TimelineProps {
  steps: { label: string; detail?: string }[];
}

/**
 * An ordered sequence of short labeled steps -- a research
 * methodology's pilot-to-main-study arc, or a product's process phases.
 * A real `<ol>` (this is genuinely ordered content, not decoration), so
 * screen-reader users get the sequence for free without extra ARIA.
 *
 * Vertical, node-and-line-on-the-left on mobile; horizontal,
 * node-and-line-on-top on desktop -- a real layout change at the
 * breakpoint, not a shrunk copy of one orientation.
 */
export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className="mt-6 flex flex-col md:flex-row md:items-start">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={index} className="flex gap-4 md:flex-1 md:flex-col md:items-center md:gap-0 md:text-center">
            <div className="flex flex-col items-center md:w-full md:flex-row">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-medium text-[var(--color-accent-contrast)]">
                {index + 1}
              </span>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="mt-1 w-px flex-1 bg-[var(--color-border-strong)] md:mt-0 md:ml-2 md:h-px md:w-auto"
                />
              )}
            </div>
            <div className={isLast ? "pb-0" : "pb-6 md:pb-0"}>
              <p className="font-medium text-[var(--color-text)] md:mt-3">{step.label}</p>
              {step.detail && (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{step.detail}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

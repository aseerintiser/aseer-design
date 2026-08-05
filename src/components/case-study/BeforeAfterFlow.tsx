import { cn } from "@/lib/utils";

interface BeforeAfterFlowProps {
  oldLabel: string;
  oldSteps: string[];
  newLabel: string;
  newSteps: string[];
}

function FlowColumn({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: string[];
  tone: "old" | "new";
}) {
  return (
    <div className="flex-1">
      <p className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
        {label}
      </p>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-full)] font-mono text-xs font-medium",
                tone === "new"
                  ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                  : "border border-[var(--color-border)] text-[var(--color-text-muted)]",
              )}
            >
              {index + 1}
            </span>
            <span className="text-sm text-[var(--color-text)]">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Before/after entry-flow comparison (Convay Mobile App Revamp rebuild,
 * 06_Assets_Checklist.md "New asset 1"). Makes the "five taps to three"
 * claim in Outcome and Impact visible instead of only stated, without
 * screenshots on either side: no authentic screenshot of the old,
 * pre-revamp app exists anywhere in the project's files, and the
 * package this component was built from draws a hard line against ever
 * recreating one to make a comparison look more dramatic than the real
 * evidence supports. Both sides are plain labeled step chips instead,
 * which is also the more honest choice for a fair comparison: showing
 * real screens on the new side next to invented text on the old side
 * would have made the "old" flow look worse than a fair side-by-side
 * actually earns.
 *
 * Generic and content-agnostic (like Timeline/RevealGroup), not
 * Convay-specific by construction, in case a future case study has a
 * real, countable before/after change worth showing this way.
 */
export function BeforeAfterFlow({
  oldLabel,
  oldSteps,
  newLabel,
  newSteps,
}: BeforeAfterFlowProps) {
  return (
    // No role="img" here on purpose: the ordered lists below already
    // give a screen reader the real, granular structure ("Old flow,
    // step 1 of 5: Open app"...), which is more useful than flattening
    // it into one summary string would be.
    <div className="mt-6 grid grid-cols-1 gap-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 sm:grid-cols-2 sm:p-8">
      <FlowColumn label={oldLabel} steps={oldSteps} tone="old" />
      <FlowColumn label={newLabel} steps={newSteps} tone="new" />
    </div>
  );
}

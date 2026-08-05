import { cn } from "@/lib/utils";

interface ComparisonDiagramProps {
  leftLabel: string;
  leftText: string;
  rightLabel: string;
  rightText: string;
  caption?: string;
}

/**
 * "Online meetings vs. physical meetings" comparison (Convay AI for
 * Physical Meetings rebuild, 06_Assets_Checklist.md "new asset: online
 * vs. physical comparison diagram"). Gives The Problem section a visual
 * anchor without fabricating a product screenshot that doesn't exist --
 * this is a plain, labeled, two-column diagram built from tokens, not a
 * photographic or illustrative asset, per the package's own instruction
 * to build rather than source it.
 *
 * The left column gets a thin accent top border to read as the
 * resolved/positive side; the right stays plain, implying
 * resolved-versus-unresolved without inventing a color the token set
 * doesn't have (04_Visual_Specification.md).
 *
 * Generic and content-agnostic, like BeforeAfterFlow/PainPointList, not
 * Convay-specific by construction.
 */
export function ComparisonDiagram({
  leftLabel,
  leftText,
  rightLabel,
  rightText,
  caption,
}: ComparisonDiagramProps) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          className={cn(
            "rounded-[var(--radius-md)] border border-[var(--color-border)] p-6",
            "border-t-2 border-t-[var(--color-accent)]",
          )}
        >
          <p className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
            {leftLabel}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text)]">{leftText}</p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-6">
          <p className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
            {rightLabel}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text)]">{rightText}</p>
        </div>
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm text-[var(--color-text-muted)]">{caption}</p>
      )}
    </div>
  );
}

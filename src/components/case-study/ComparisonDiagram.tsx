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
 * Both columns get identical, plain borders. An earlier version gave
 * the left column a thin accent top border to imply "resolved" versus
 * the right column's "unresolved," but rendered, that just looked like
 * an inconsistent border, since this site has no existing convention
 * where an accent-colored border edge means "this one already works."
 * The text itself already states the contrast clearly; two visually
 * even cards read as more deliberate than a color cue with no
 * established meaning.
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
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-6">
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

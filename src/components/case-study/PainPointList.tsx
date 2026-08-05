interface PainPointListProps {
  items: { label: string; note: string }[];
}

/**
 * Research-synthesis artifact (Convay Mobile App Revamp rebuild,
 * 06_Assets_Checklist.md "New asset 2"). Gives the Research & Reasoning
 * section, otherwise five paragraphs of unbroken text, one small piece
 * of visual evidence: the pain points the surrounding copy already
 * names, synthesized into a short annotated list rather than left
 * buried in a paragraph. Built entirely from existing type and color
 * tokens, no illustration or chart. Generic and content-agnostic, like
 * Timeline/RevealGroup, not Convay-specific by construction.
 */
export function PainPointList({ items }: PainPointListProps) {
  return (
    <ul className="mt-6 space-y-4 border-l-2 border-[var(--color-border)] pl-6">
      {items.map((item) => (
        <li key={item.label} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[27px] h-2 w-2 rounded-[var(--radius-full)] bg-[var(--color-accent)]"
          />
          <p className="font-medium text-[var(--color-text)]">{item.label}</p>
          <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{item.note}</p>
        </li>
      ))}
    </ul>
  );
}

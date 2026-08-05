import { cn } from "@/lib/utils";

interface MetaItem {
  label: string;
  value: string;
}

interface MetaRowProps {
  items: MetaItem[];
  /** Optional grid-column override, additive only -- every existing
   * call site omits this and keeps today's exact `sm:grid-cols-4`
   * layout. Added for the Convay Mobile App Revamp rebuild, whose meta
   * row has a 5th (Status) field and needs a grid that resolves cleanly
   * to one row at wide viewports instead of leaving one item stranded
   * alone on its own line. */
  className?: string;
}

/**
 * Design Brief must-have: "Role, team size, duration, and tools stated
 * plainly at the top of every case study." A definition list so the
 * label/value pairing is real markup, not just visual proximity, which
 * matters for screen reader users landing on a case study.
 */
export function MetaRow({ items, className }: MetaRowProps) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4", className)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            {item.label}
          </dt>
          <dd className="mt-1 font-mono text-sm font-medium tabular-nums text-[var(--color-text)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

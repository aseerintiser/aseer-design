interface MetaItem {
  label: string;
  value: string;
}

interface MetaRowProps {
  items: MetaItem[];
}

/**
 * Design Brief must-have: "Role, team size, duration, and tools stated
 * plainly at the top of every case study." A definition list so the
 * label/value pairing is real markup, not just visual proximity, which
 * matters for screen reader users landing on a case study.
 */
export function MetaRow({ items }: MetaRowProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

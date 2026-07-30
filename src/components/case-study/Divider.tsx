/**
 * A minimal visual break between two beats inside the same section --
 * for when a new heading would be too heavy-handed but a plain
 * paragraph break isn't enough. Deliberately just a short, centered
 * rule, not a full-width line, so it reads as a breath, not a section
 * boundary (Section already owns full boundaries via headings/tone).
 */
export function Divider() {
  return (
    <div className="mt-8 mb-2 flex justify-center" aria-hidden="true">
      <div className="h-px w-16 bg-[var(--color-border-strong)]" />
    </div>
  );
}

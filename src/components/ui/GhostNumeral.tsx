/**
 * Small muted chapter numeral (e.g. "01") used above a numbered
 * section heading. Extracted from CaseStudyBody.tsx's private
 * `SectionNumber` (Milestone 2) so the Certifications page rebuild can
 * reuse the exact same device instead of inventing a second one --
 * both pages should read as the same design system, not two similar
 * but slightly different numbering styles. Purely a move: the markup,
 * classes, and rendered output are unchanged from the original.
 */
export function GhostNumeral({ n }: { n: number | string }) {
  return (
    <span
      aria-hidden="true"
      className="mb-2 block font-[family-name:var(--font-display)] text-sm text-[var(--color-text-muted)]/70 select-none"
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}

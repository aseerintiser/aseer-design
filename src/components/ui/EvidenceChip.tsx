import type { Evidence } from "@/content/home";
import { cn } from "@/lib/utils";

const statusLabel: Record<Evidence["status"], string> = {
  verified: "Verified",
  own: "My own account",
  directional: "Directional",
};

/**
 * One claim with its evidence status, shown by shape first so it never
 * depends on color: a full dot for verified (a document anyone can
 * check), a half dot for my own account or an internal record, an empty
 * ring for directional estimates. The status word is always readable by
 * screen readers and appears as a tooltip on hover.
 */
export function EvidenceChip({ evidence, className }: { evidence: Evidence; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.6875rem] leading-tight tracking-[0.02em] text-[var(--color-text-muted)]",
        className,
      )}
      title={statusLabel[evidence.status]}
    >
      <EvidenceGlyph status={evidence.status} />
      <span className="sr-only">{statusLabel[evidence.status]}: </span>
      <span>{evidence.text}</span>
    </span>
  );
}

export function EvidenceGlyph({ status }: { status: Evidence["status"] }) {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-[var(--color-text)]" aria-hidden="true">
      {status === "verified" && <circle cx="6" cy="6" r="5" fill="currentColor" />}
      {status === "own" && (
        <>
          <circle cx="6" cy="6" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 1.6a4.4 4.4 0 0 1 0 8.8z" fill="currentColor" />
        </>
      )}
      {status === "directional" && (
        <circle cx="6" cy="6" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      )}
    </svg>
  );
}

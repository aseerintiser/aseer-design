"use client";

import { useId, useRef } from "react";
import type { Evidence } from "@/content/home";
import { usePopoverPlacement } from "@/lib/use-popover-placement";
import { cn } from "@/lib/utils";

export const statusLabel: Record<Evidence["status"], string> = {
  verified: "Verified",
  own: "My own account",
  directional: "Directional",
};

export const statusMeaning: Record<Evidence["status"], string> = {
  verified: "Checked against a record outside me, one anyone can ask for.",
  own: "What I did and saw, or an internal record. Honest, not audited.",
  directional: "An estimate or a small sample. Read it as a signal.",
};

/**
 * One claim with its evidence status, shown by shape first so it never
 * depends on color: a full dot for verified, a half dot for my own
 * account or an internal record, an empty ring for directional
 * estimates.
 *
 * The chip is a button. Pressing it opens a small source card (the
 * browser's popover, so Escape and a click elsewhere close it) that says
 * what the status means and where the claim comes from.
 */
export function EvidenceChip({ evidence, className }: { evidence: Evidence; className?: string }) {
  const id = useId();
  const cardId = `evidence-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  usePopoverPlacement(buttonRef, cardRef);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        popoverTarget={cardId}
        className={cn(
          "inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border)] px-3 py-1.5 text-left font-[family-name:var(--font-mono)] text-[0.6875rem] leading-tight tracking-[0.02em] text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]",
          className,
        )}
      >
        <span className="text-[var(--color-text)]">
          <EvidenceGlyph status={evidence.status} />
        </span>
        <span className="sr-only">{statusLabel[evidence.status]}: </span>
        <span>{evidence.text}</span>
        <span className="sr-only"> (show the source)</span>
      </button>
      <div ref={cardRef} id={cardId} popover="auto" className="evidence-card">
        <EvidenceCardBody status={evidence.status} source={evidence.source} />
      </div>
    </>
  );
}

/** What goes inside a source card: the status, what it means, and where
 * the claim comes from. Spans only, so it can sit inside a paragraph. */
export function EvidenceCardBody({
  status,
  source,
  label,
}: {
  status: Evidence["status"];
  source?: string;
  label?: string;
}) {
  return (
    <>
      <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] uppercase">
        <span className="text-[#f2f0ea]">
          <EvidenceGlyph status={status} />
        </span>
        {statusLabel[status]}
      </span>
      {label && <span className="mt-2 block font-medium">{label}</span>}
      <span className="mt-2 block text-sm leading-relaxed text-[#c9c5ba]">{statusMeaning[status]}</span>
      {source && (
        <span className="mt-3 block border-t border-[#2c2b27] pt-3 text-sm leading-relaxed">
          <span className="block font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[#9c998f] uppercase">
            Source
          </span>
          {source}
        </span>
      )}
    </>
  );
}

export function EvidenceGlyph({ status }: { status: Evidence["status"] }) {
  return (
    <svg viewBox="0 0 12 12" className="inline-block h-3 w-3 shrink-0 text-current" aria-hidden="true">
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

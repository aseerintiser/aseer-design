"use client";

import { useId, useRef } from "react";
import type { Evidence } from "@/content/home";
import { usePopoverPlacement } from "@/lib/use-popover-placement";
import { cn } from "@/lib/utils";

/**
 * One claim, as a small chip with a highlighter stroke: the same yellow
 * that marks claims in the case study text, so a highlighted claim
 * always means "this has a source".
 *
 * The chip is a button. Pressing it opens a small source card (the
 * browser's popover, so Escape and a click elsewhere close it) that says
 * where the claim comes from.
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
        <EvidenceStroke />
        <span>{evidence.text}</span>
        <span className="sr-only"> (show the source)</span>
      </button>
      <div ref={cardRef} id={cardId} popover="auto" className="evidence-card">
        <EvidenceCardBody source={evidence.source} />
      </div>
    </>
  );
}

/** What goes inside a source card: the claim's name, when there is one,
 * and where it comes from. Spans only, so it can sit inside a paragraph. */
export function EvidenceCardBody({ source, label }: { source?: string; label?: string }) {
  return (
    <>
      {label && <span className="block font-medium">{label}</span>}
      {source && (
        <span className={cn("block text-sm leading-relaxed", label && "mt-3 border-t border-[#2c2b27] pt-3")}>
          <span className="block font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[#9c998f] uppercase">
            Source
          </span>
          <span className="mt-1 block">{source}</span>
        </span>
      )}
    </>
  );
}

/** A short stroke of highlighter, the evidence layer's one visual cue. */
export function EvidenceStroke() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[5px] w-3 shrink-0 -skew-x-12 rounded-[1px] bg-[rgb(255_216_74)]"
    />
  );
}

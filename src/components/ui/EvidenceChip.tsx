"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import type { Evidence } from "@/content/home";
import { cn } from "@/lib/utils";

const statusLabel: Record<Evidence["status"], string> = {
  verified: "Verified",
  own: "My own account",
  directional: "Directional",
};

const statusMeaning: Record<Evidence["status"], string> = {
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

  // Popovers open in the top layer; place the card under its chip (or
  // above it near the bottom of the screen), and keep it there on scroll.
  const place = useCallback(() => {
    const button = buttonRef.current;
    const card = cardRef.current;
    if (!button || !card) return;
    const rect = button.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 32);
    const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
    const below = rect.bottom + 8;
    const height = card.offsetHeight;
    const top = below + height > window.innerHeight - 8 ? Math.max(8, rect.top - height - 8) : below;
    card.style.width = `${width}px`;
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let open = false;
    const onToggle = (event: Event) => {
      open = (event as ToggleEvent).newState === "open";
      if (open) place();
    };
    const onMove = () => {
      if (open) place();
    };
    card.addEventListener("toggle", onToggle);
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      card.removeEventListener("toggle", onToggle);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [place]);

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
      <div
        ref={cardRef}
        id={cardId}
        popover="auto"
        className="evidence-card fixed m-0 rounded-[var(--radius-md)] border border-[#2c2b27] bg-[#151513] p-4 text-left text-[#f2f0ea] shadow-[0_24px_48px_-20px_rgb(0_0_0/0.7)]"
      >
        <p className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] uppercase">
          <span className="text-[#f2f0ea]">
            <EvidenceGlyph status={evidence.status} />
          </span>
          {statusLabel[evidence.status]}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#c9c5ba]">{statusMeaning[evidence.status]}</p>
        {evidence.source && (
          <p className="mt-3 border-t border-[#2c2b27] pt-3 text-sm leading-relaxed">
            <span className="block font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[#9c998f] uppercase">
              Source
            </span>
            {evidence.source}
          </p>
        )}
      </div>
    </>
  );
}

export function EvidenceGlyph({ status }: { status: Evidence["status"] }) {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-current" aria-hidden="true">
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

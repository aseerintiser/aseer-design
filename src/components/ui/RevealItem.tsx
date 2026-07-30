"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { cn } from "@/lib/utils";

interface RevealItemProps {
  /** Always visible, the default scan. */
  label: string;
  /** Hidden until the reader taps/clicks -- one line, not a second
   * paragraph of new information. */
  detail: string;
  className?: string;
}

/**
 * A label plus one additional line of detail, hidden until tapped or
 * clicked. The one genuinely new interaction pattern this component
 * library didn't already have (Milestone: Lumi, "Milestone B").
 *
 * Deliberately click/tap-toggle rather than hover-to-reveal: hover has
 * no equivalent on touch devices, and mixing "hover shows it, click does
 * something else" is two inconsistent paths to the same content. A real
 * `<button>` with `aria-expanded` covers mouse, touch, and keyboard with
 * one interaction, which is also why this is a generically reusable
 * primitive rather than a Lumi-specific one -- any future case study
 * that wants to state something briefly by default and let a reader dig
 * one level deeper on demand can reach for this directly.
 */
export function RevealItem({ label, detail, className }: RevealItemProps) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const detailId = useId();

  // Visual Polish milestone: the button previously carried the row's
  // only vertical padding (py-1, ~28px total with line-height) -- under
  // the 44px touch-target minimum for a tap-to-reveal control. min-h-11
  // plus its own py-2.5 now guarantees a real 44px target regardless of
  // label length; the wrapper's padding was trimmed to compensate so
  // rows don't end up double-padded and overly loose.
  return (
    <div className={cn("border-b border-[var(--color-border)] py-1 last:border-b-0", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 w-full items-center justify-between gap-3 py-2.5 text-left"
      >
        <span className="font-medium text-[var(--color-text)]">
          {renderInlineMarkdown(label)}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
            open && "rotate-45",
          )}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
            <path
              fill="currentColor"
              d="M7 1a1 1 0 0 1 2 0v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 1 1 0-2h6Z"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={detailId}
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-1 pb-1 text-sm text-[var(--color-text-muted)]">
              {renderInlineMarkdown(detail)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

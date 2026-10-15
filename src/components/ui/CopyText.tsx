"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Copies a piece of text (a citation, a reference) and confirms in place
 * and to screen readers. If the clipboard is unavailable the text is
 * still on the page to select by hand, so nothing is lost.
 */
export function CopyText({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border-strong)] px-3.5 py-1.5 text-sm font-medium transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)]",
        className,
      )}
    >
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Select the text to copy" : label}
      </span>
    </button>
  );
}

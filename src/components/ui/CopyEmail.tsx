"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Copies the email address and says so, in place and to screen readers.
 * Falls back to the mailto link (rendered next to it) where the
 * clipboard is unavailable.
 */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border-strong)] px-4 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)]",
        className,
      )}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

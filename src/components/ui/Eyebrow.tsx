import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase label that sits above a page or case-study H1 (role
 * title on Home, "Work"/"Research" track on case studies). Was
 * duplicated inline in two places with identical classes; extracted so
 * the treatment can only drift on purpose.
 *
 * Phase 1 identity: set in IBM Plex Mono, the evidence voice, so labels
 * read as one consistent system with the meta rows and link previews.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

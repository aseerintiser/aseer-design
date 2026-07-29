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
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-wide text-[var(--color-text-muted)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /**
   * Section-level light/dark alternation as a pacing device (Creative
   * Direction: "Should Have"). Applying `data-tone="dark"` flips every
   * color token for this subtree only; contrast for the dark set is
   * defined and checked independently in globals.css.
   */
  tone?: "default" | "dark";
  /**
   * Vertical density. "open" for breathing, generous hero/section-break
   * moments; "dense" for evidence-heavy sections (metrics, status tags);
   * "default" for ordinary body sections. The contrast between open and
   * dense sections is the pacing device the Creative Direction describes
   * as borrowed from film editing.
   */
  density?: "default" | "open" | "dense";
  measure?: "default" | "narrow" | "wide";
  /** Skip the Container wrapper for full-bleed hero/section-break media. */
  fullBleed?: boolean;
}

// Wired directly to the 8-point spacing tokens defined in globals.css,
// so the "generous at the extremes, tight in evidence sections" contrast
// the Creative Direction calls for is a real, traceable relationship
// between these three values, not three independently-guessed numbers.
const densityClass = {
  default: "py-[var(--space-3xl)] md:py-[var(--space-4xl)]",
  open: "py-[var(--space-4xl)] md:py-[var(--space-5xl)]",
  dense: "py-[var(--space-xl)] md:py-[var(--space-2xl)]",
} as const;

export function Section({
  children,
  className,
  as: Component = "section",
  tone = "default",
  density = "default",
  measure = "default",
  fullBleed = false,
}: SectionProps) {
  return (
    <Component
      data-tone={tone === "dark" ? "dark" : undefined}
      className={cn(
        "w-full",
        tone === "dark" && "bg-[var(--color-bg)] text-[var(--color-text)]",
        densityClass[density],
        className,
      )}
    >
      {fullBleed ? (
        children
      ) : (
        <Container measure={measure}>{children}</Container>
      )}
    </Component>
  );
}

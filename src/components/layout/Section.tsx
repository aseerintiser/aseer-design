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

const densityClass = {
  default: "py-12 md:py-16",
  open: "py-20 md:py-32",
  dense: "py-8 md:py-10",
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

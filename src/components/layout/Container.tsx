import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element when semantics require it. */
  as?: ElementType;
  /**
   * Narrower reading column for case-study body copy (Design Brief
   * must-have). Use "wide" for content that should still be narrower
   * than the full 12-column grid but wider than pure body text (e.g. a
   * two-column decision block).
   */
  measure?: "default" | "narrow" | "wide";
}

const measureClass = {
  default: "max-w-7xl",
  narrow: "max-w-[var(--measure)]",
  wide: "max-w-[var(--measure-wide)]",
} as const;

/**
 * Base horizontal container: centers content, applies responsive
 * side padding, and caps width. Every page section sits inside one of
 * these (directly, or via <Section>).
 */
export function Container({
  children,
  className,
  as: Component = "div",
  measure = "default",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        measureClass[measure],
        className,
      )}
    >
      {children}
    </Component>
  );
}

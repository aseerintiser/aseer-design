import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  children: ReactNode;
  /** Semantic level. Every page must have exactly one level=1. */
  level: HeadingLevel;
  /**
   * Visual size, independent of semantic level, so hierarchy can be
   * correct for accessibility while the display can differ (e.g. a
   * visually small h1 above a large decorative sub-line).
   */
  size?: HeadingLevel | "display";
  /** Use the expressive display face (Fraunces). Defaults to true for
   * display/1/2, false for smaller sizes, matching the Creative
   * Direction's "one loud, considered moment, everything else quiet"
   * rule. */
  display?: boolean;
  className?: string;
  id?: string;
}

// Fluid, clamp-based sizes (tokens defined in globals.css) instead of
// fixed breakpoint jumps -- type scales continuously with the viewport
// rather than visibly snapping at md:, which is one of the more
// reliable "hand-tuned vs. default-Tailwind" tells. Tracking tightens at
// larger sizes, a standard optical adjustment for display type that the
// previous flat `tracking-tight` on every size ignored.
//
// Explicit font-weight per size: Fraunces is a variable font, so with no
// weight declared it renders at the browser default (400) everywhere,
// including the homepage hero at up to 5.5rem. The Design Brief calls
// for "an immediately confident type moment" in the first five seconds;
// a regular-weight serif at that scale reads as tentative, not
// confident, however good the typeface choice is. Weight steps down as
// size steps down, so the effect is "considered," not "everything bold."
const sizeClass: Record<HeadingLevel | "display", string> = {
  display:
    "text-[length:var(--text-display)] font-[560] leading-[1.03] tracking-[-0.03em]",
  1: "text-[length:var(--text-h1)] font-[560] leading-[1.08] tracking-[-0.025em]",
  2: "text-[length:var(--text-h2)] font-[540] leading-[1.15] tracking-[-0.015em]",
  3: "text-[length:var(--text-h3)] font-[520] leading-snug tracking-[-0.01em]",
  4: "text-[length:var(--text-h4)] leading-snug",
};

const tagForLevel: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

export function Heading({
  children,
  level,
  size,
  display,
  className,
  id,
}: HeadingProps) {
  const Component = tagForLevel[level];
  const resolvedSize = size ?? level;
  const useDisplayFont = display ?? (resolvedSize === "display" || resolvedSize === 1 || resolvedSize === 2);

  return (
    <Component
      id={id}
      className={cn(
        sizeClass[resolvedSize],
        useDisplayFont ? "font-[family-name:var(--font-display)]" : "font-[family-name:var(--font-sans)] font-medium",
        className,
      )}
    >
      {children}
    </Component>
  );
}

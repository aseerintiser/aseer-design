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

const sizeClass: Record<HeadingLevel | "display", string> = {
  display: "text-5xl md:text-7xl leading-[1.05] tracking-tight",
  1: "text-4xl md:text-6xl leading-[1.1] tracking-tight",
  2: "text-3xl md:text-4xl leading-[1.15] tracking-tight",
  3: "text-2xl md:text-3xl leading-snug",
  4: "text-lg md:text-xl leading-snug",
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

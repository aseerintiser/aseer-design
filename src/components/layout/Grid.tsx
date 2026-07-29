import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  className?: string;
  /** Gap token, mapped to the 8-point spacing scale in globals.css. */
  gap?: "sm" | "md" | "lg";
}

const gapClass = {
  sm: "gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-12",
} as const;

/**
 * The 12-column grid (Design Brief must-have). Children place themselves
 * with `col-span-*` utilities. Deliberately not opinionated about column
 * spans itself, since the Creative Direction calls for controlled
 * asymmetry (unequal-width blocks, full-bleed breaks) rather than a
 * rigid, always-even split.
 */
export function Grid({ children, className, gap = "md" }: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
        gapClass[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}

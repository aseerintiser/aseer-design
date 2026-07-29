import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: ReactNode;
  as?: ElementType;
  /** "body" for ordinary copy, "lead" for a slightly larger intro line,
   * "small" for meta/caption text. */
  size?: "body" | "lead" | "small";
  muted?: boolean;
  className?: string;
}

const sizeClass = {
  lead: "text-lg md:text-xl leading-relaxed",
  body: "text-base leading-relaxed",
  small: "text-sm leading-normal",
} as const;

/**
 * Quiet, highly legible body copy in the Inter (sans) face throughout,
 * per the Creative Direction's typography philosophy: the display face
 * is reserved for headings, body text stays deliberately undramatic so
 * long-form reading never fights the eye.
 */
export function Text({
  children,
  as: Component = "p",
  size = "body",
  muted = false,
  className,
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeClass[size],
        muted ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}

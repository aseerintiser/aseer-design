"use client";

import type { ReactNode } from "react";
import { useAmbientMotion } from "@/lib/motion-preference";
import { cn } from "@/lib/utils";

/**
 * A very slow drift across a still, like a camera move over a frame, so
 * the film collage on About reads as a glance at the films rather than a
 * flat picture. It is ambient motion, so it follows the same rule as the
 * project films: off with "reduce motion" unless the visitor turns motion
 * on, and the footer switch stops it.
 */
export function SlowPan({ children, className }: { children: ReactNode; className?: string }) {
  const moving = useAmbientMotion();
  return <div className={cn("h-full w-full", moving && "slow-pan", className)}>{children}</div>;
}

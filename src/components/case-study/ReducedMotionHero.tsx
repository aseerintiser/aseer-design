"use client";

import { LoopVideo } from "@/components/ui/LoopVideo";

interface ReducedMotionHeroProps {
  loopSrc: string;
  fallbackSrc: string;
  width: number;
  height: number;
  loopAlt: string;
  fallbackAlt: string;
}

/**
 * Hero establishing animation with a reduced-motion still (Convay AI for
 * Physical Meetings).
 *
 * Phase 1: this used to be a 35 MB GIF swapped for a still through
 * <picture media="(prefers-reduced-motion)">, because a GIF cannot be
 * paused. It is now a 3.5 MB loop, so the same intent is met more
 * simply: the curated still is the poster, the loop plays only while
 * visible and has a pause button, and with reduced motion on the still
 * stays until the visitor chooses to play.
 */
export function ReducedMotionHero({
  loopSrc,
  fallbackSrc,
  width,
  height,
  loopAlt,
}: ReducedMotionHeroProps) {
  return (
    <figure className="mx-auto max-w-full">
      <div
        className="mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{ maxWidth: Math.min(width, 800), aspectRatio: `${width} / ${height}` }}
      >
        <LoopVideo
          src={loopSrc}
          poster={fallbackSrc}
          alt={loopAlt}
          width={width}
          height={height}
          className="h-full w-full"
        />
      </div>
    </figure>
  );
}

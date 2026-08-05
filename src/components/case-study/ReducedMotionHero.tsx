"use client";

import { useReducedMotion } from "motion/react";
import { useLightbox } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";

interface ReducedMotionHeroProps {
  gifSrc: string;
  fallbackSrc: string;
  width: number;
  height: number;
  gifAlt: string;
  fallbackAlt: string;
}

/**
 * Hero establishing animation with a `prefers-reduced-motion` fallback
 * (Convay AI for Physical Meetings rebuild, 05_Interaction_and_Motion.md:
 * "a GIF genuinely cannot be motion-reduced any other way"). A looping
 * GIF can't respond to that media query the way a CSS- or JS-driven
 * animation could, so the whole image is swapped via a native
 * `<picture><source media="(prefers-reduced-motion: reduce)">`, which
 * also means the browser only ever requests the one image it actually
 * needs, not both. next/image doesn't support a `<source>`-based
 * conditional swap, so this one hero visual uses plain `<picture>`/
 * `<img>` rather than next/image -- the same kind of native-element
 * exception ControlledMedia already makes for click-to-play video.
 *
 * `useReducedMotion` (already used elsewhere on this site for scroll
 * reveals) picks the matching aria-label and lightbox target; the
 * `<picture>` swap above is the part that's actually load-bearing for
 * correctness, since it works even before this component hydrates.
 */
export function ReducedMotionHero({
  gifSrc,
  fallbackSrc,
  width,
  height,
  gifAlt,
  fallbackAlt,
}: ReducedMotionHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const { open } = useLightbox();
  const cappedWidth = Math.min(width, 800);
  const activeAlt = shouldReduceMotion ? fallbackAlt : gifAlt;
  const activeSrc = shouldReduceMotion ? fallbackSrc : gifSrc;

  return (
    <figure className="mx-auto max-w-full">
      <div
        className="mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{ maxWidth: cappedWidth }}
      >
        <button
          type="button"
          onClick={() => open([{ src: activeSrc, width, height, alt: activeAlt }], 0)}
          aria-label={`View larger: ${activeAlt}`}
          className="group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]"
        >
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet={fallbackSrc} />
            {/* eslint-disable-next-line @next/next/no-img-element -- see note above on why next/image can't do this swap. */}
            <img
              src={gifSrc}
              width={width}
              height={height}
              alt={activeAlt}
              className="h-auto w-full transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90"
            />
          </picture>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <ExpandIcon className="h-5 w-5 text-white" />
          </span>
        </button>
      </div>
    </figure>
  );
}

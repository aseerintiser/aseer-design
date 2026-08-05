"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroSequence } from "@/content/heroSequence";
import { easing, heroSequenceCrossfadeS, heroSequenceHoldMs } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Homepage hero's editorial asset sequence (Hero Craftsmanship
 * milestone). Desktop-only (see page.tsx: the hero's right column,
 * hidden below `lg`) -- every prior review of this hero benchmarked at
 * real wide-desktop viewports, where the typographic column stops well
 * short of the container edge; the mobile/tablet hero never had that
 * problem and is unchanged here.
 *
 * One frame is visible at a time, held for `heroSequenceHoldMs`, then
 * crossfaded to the next over `heroSequenceCrossfadeS` using the same
 * entrance easing curve the rest of the site's motion already relies
 * on. That's the entire motion vocabulary here: a hold, then a slow
 * dissolve. No slides, no scale, no parallax -- "cinematography, not
 * animation," per the brief this milestone was built against.
 *
 * Entirely decorative and `aria-hidden`: every idea a frame represents
 * (research, design systems, human-AI interaction...) is already stated
 * in the hero's own text (site.skillLines), so nothing here is the only
 * place that information exists. That also sidesteps WCAG 2.2.2 (no
 * screen-reader user is ever exposed to five-second auto-advancing
 * content that they can't already get from the page's real text).
 *
 * Respects prefers-reduced-motion by freezing on the first frame,
 * matching the reduced-motion fallback every other motion primitive on
 * this site already uses (instant, no cycling, no exit animation).
 */
export function HeroSequence() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      // Skip the advance while the tab isn't visible rather than
      // tearing down the interval -- a small courtesy so a backgrounded
      // tab isn't silently cycling frames (and decoding video) nobody
      // is looking at.
      if (document.hidden) return;
      setIndex((current) => (current + 1) % heroSequence.length);
    }, heroSequenceHoldMs);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const activeIndex = shouldReduceMotion ? 0 : index;
  // Non-null: activeIndex is always 0 or a value produced by
  // `current % heroSequence.length` above, so it's guaranteed in range.
  // noUncheckedIndexedAccess can't see that invariant on its own.
  const frame = heroSequence[activeIndex]!;

  return (
    <div aria-hidden="true" className="select-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <AnimatePresence>
          <motion.div
            key={frame.label}
            className="absolute inset-0"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : heroSequenceCrossfadeS,
              ease: easing.entrance,
            }}
          >
            {frame.type === "video" ? (
              // Plays the moment it mounts (i.e. the moment it becomes
              // the active frame) rather than a native `autoPlay`
              // attribute, matching ProjectCard.tsx's own established,
              // resilient pattern for this exact situation.
              <video
                ref={(el) => {
                  el?.play().catch(() => {
                    // Autoplay can still be rejected in rare cases; the
                    // first frame is a fine fallback, nothing to recover.
                  });
                }}
                src={frame.src}
                loop
                muted
                playsInline
                preload="metadata"
                className={cn("h-full w-full object-cover grayscale")}
              />
            ) : (
              <Image
                src={frame.src}
                width={frame.width}
                height={frame.height}
                alt=""
                unoptimized={frame.src.endsWith(".gif")}
                className={cn("h-full w-full object-cover grayscale")}
                sizes="(min-width: 1024px) 33vw, 0px"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 h-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={frame.label}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: easing.standard }}
            className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase"
          >
            {frame.label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

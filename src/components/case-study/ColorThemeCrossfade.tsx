"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Convay Design System rebuild, MOTION_SPEC.md "Motion 1 -- Light/dark
 * theme crossfade": the case study's core claim ("one system, two
 * themes") was previously proven with two static side-by-side images.
 * This replaces that pairing in Section 04 (Foundations -> Color) with
 * a real toggle, so a reader triggers the switch themselves instead of
 * being told it works -- the same layout holding together as every
 * color swaps. (The hero grid still shows both images as plain static
 * tiles; MOTION_SPEC scopes this interaction to Section 04 only.)
 *
 * Both images stay mounted and stacked (`absolute inset-0`) so the
 * crossfade never shifts layout; the hidden one is `aria-hidden` so a
 * screen reader only ever encounters the currently-visible image's alt
 * text, not both at once.
 *
 * Duration/easing: MOTION_SPEC calls for 300-400ms, ease-in-out. None
 * of the site's three shared durations (0.15/0.2/0.25s, lib/motion.ts)
 * reach that range, so this uses its own 0.35s constant paired with the
 * site's existing `easing.standard` curve -- the same approach
 * TrustAsymmetryDemo takes for its own narratively-specific timings: a
 * bespoke duration for one specific, spec'd moment, not a new global
 * token. `prefers-reduced-motion` collapses the transition to instant
 * (duration 0); the toggle still works and both images stay reachable
 * either way, per MOTION_SPEC's explicit "never hide the dark-mode
 * image behind motion-only access" requirement.
 */

const LIGHT_IMAGE = {
  src: "https://framerusercontent.com/images/Pz3gr4au6hAzTaXAeWRxckpYxW4.png",
  width: 839,
  height: 1067,
  alt: "Convay interface built with the design system's light-mode color variables.",
};

const DARK_IMAGE = {
  src: "https://framerusercontent.com/images/RFIwMbzOBq1i3CiHl7feTRCmbc.png",
  width: 839,
  height: 1063,
  alt: "The same interface built with the design system's dark-mode color variables.",
};

const CROSSFADE_DURATION = 0.35;

export function ColorThemeCrossfade() {
  const [isDark, setIsDark] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
          {isDark ? "Dark mode" : "Light mode"}
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle dark mode preview"
          onClick={() => setIsDark((current) => !current)}
          className="inline-flex h-6 w-11 shrink-0 items-center rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-1 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]"
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-4 w-4 rounded-[var(--radius-full)] bg-[var(--color-text)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
              isDark && "translate-x-5",
            )}
          />
        </button>
      </div>

      <div
        className="relative mx-auto mt-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{ maxWidth: 420, aspectRatio: `${LIGHT_IMAGE.width} / ${LIGHT_IMAGE.height}` }}
      >
        {[LIGHT_IMAGE, DARK_IMAGE].map((image) => {
          const visible = isDark ? image === DARK_IMAGE : image === LIGHT_IMAGE;
          return (
            <motion.div
              key={image.src}
              className="absolute inset-0"
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : CROSSFADE_DURATION,
                ease: easing.standard,
              }}
              aria-hidden={!visible}
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className="h-full w-full object-cover"
                sizes="420px"
                quality={90}
              />
            </motion.div>
          );
        })}
      </div>
      <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
        The same interface built from the light and dark variants of the same color variables, not
        redesigned twice.
      </p>
    </div>
  );
}

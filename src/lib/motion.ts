/**
 * Motion foundation.
 * -----------------------------------------------------------------------
 * Source of truth: Portfolio_Creative_Direction_Premium.md, "Motion
 * Philosophy" ("tuned easing and duration, roughly 150-250ms, never
 * default browser transition timing") and Claude_Code_Design_Brief_v2.md
 * ("prefers-reduced-motion respected everywhere, no exceptions").
 *
 * This file is the single source for animation timing so that every
 * component (CSS transitions via globals.css tokens, or Motion/Framer
 * Motion variants here) is tuned consistently rather than reaching for
 * arbitrary per-component durations.
 */

/**
 * Two speeds, mirrored from the tokens in globals.css (Phase 1).
 *
 * `duration` is the interface speed: hover, press, menus and reveals,
 * 150 to 300 ms, so nothing ever reads as lag.
 *
 * `story` is only for moments that carry the research finding (the
 * trust line, the Lumi meter, the trailer): trust rises slowly and
 * breaks fast, so a rise takes about 1.2 s and a break 140 ms. Never use
 * `story` for ordinary interface feedback.
 */
export const duration = {
  fast: 0.15,
  base: 0.2,
  slow: 0.3,
} as const;

/** Story-moment timing in seconds. See the note above. */
export const story = {
  rise: 1.2,
  break: 0.14,
} as const;

/** Cubic-bezier easing curves, matched to the tokens in globals.css. */
export const easing = {
  standard: [0.4, 0, 0.2, 1],
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.7, 0, 0.84, 0],
  /** For story rises: a patient start that settles gently. */
  rise: [0.45, 0, 0.2, 1],
} as const;

/**
 * A small set of reusable Motion variants for the "scroll reveals follow
 * reading order and hierarchy, not a uniform fade-up on everything" rule.
 * Components choose which of these (if any) makes sense; plain text is
 * not expected to use any of them, per the same rule.
 */
export const revealUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.entrance },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.standard },
  },
};

/**
 * Variants with all motion collapsed to an instant, no-displacement
 * state. Passed to components when `prefers-reduced-motion` is active so
 * content still appears (opacity 1, no transform), just without the
 * animated transition. This is the reduced-motion backstop for
 * JS-driven animation; see globals.css for the equivalent CSS-transition
 * backstop.
 */
export const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * Stagger container for a small group of related items (a handful of
 * decisions, a grid of metrics) that should read as one coordinated
 * entrance rather than N independent identical fade-ups triggering as
 * the visitor scrolls past each one. Used sparingly, per the Creative
 * Direction's "follow reading order and hierarchy" rule -- not applied
 * to plain paragraphs.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.entrance },
  },
};

/** Reduced-motion equivalents for the stagger pair above. */
export const reducedStaggerContainer = { hidden: {}, visible: {} };
export const reducedStaggerItem = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * Per-word entrance for the homepage's kinetic headline moment (Design
 * Brief "Should Have": "one kinetic-headline moment on the homepage
 * hero, plays once on load, never loops"). A slight upward slide with a
 * soft blur-out-to-sharp lands as more considered than a plain fade.
 */
export const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

export const wordItem = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow * 1.6, ease: easing.entrance },
  },
};

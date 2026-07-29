"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  wordContainer,
  wordItem,
  reducedStaggerContainer,
  reducedStaggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

interface KineticHeadlineProps {
  text: string;
  className?: string;
}

/**
 * The homepage's one signature motion moment (Design Brief "Should
 * Have": "one kinetic-headline moment on the homepage hero, plays once
 * on load, never loops"). Splits the headline into words and staggers
 * them in with a soft blur-to-sharp entrance, once, on mount -- not on
 * scroll, since this is the very first thing a visitor sees.
 *
 * Accessibility: the full string is exposed once via aria-label on the
 * wrapper; the individual word spans are aria-hidden so a screen reader
 * doesn't read word-by-word with the animation's timing or pauses.
 * Falls back to a plain, instant render under prefers-reduced-motion.
 */
export function KineticHeadline({ text, className }: KineticHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const container = shouldReduceMotion ? reducedStaggerContainer : wordContainer;
  const item = shouldReduceMotion ? reducedStaggerItem : wordItem;

  return (
    <motion.span
      aria-label={text}
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.15em] align-bottom"
        >
          <motion.span className="inline-block" variants={item}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

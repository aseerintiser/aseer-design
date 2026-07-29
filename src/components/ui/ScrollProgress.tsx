"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Scroll-tied progress indicator for long case-study reads (Creative
 * Direction "Wow Factor, Tastefully" #6: "Quiet, functional, reads as
 * premium craft precisely because it's useful, not because it's
 * flashy.") A spring smooths the raw scroll value so it doesn't feel
 * mechanical; motion respects prefers-reduced-motion automatically for
 * the spring's physical animation, and the bar itself conveys state
 * instantly either way since it's driven by scroll position, not a
 * timed animation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[var(--color-accent)]"
    />
  );
}

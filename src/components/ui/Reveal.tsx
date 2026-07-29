"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { revealUp, reducedMotionVariants } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds, for staggering a handful of related elements. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal for content that benefits from one (images,
 * data, evidence blocks), per the Creative Direction's "scroll reveals
 * follow reading order and hierarchy, not a uniform fade-up on
 * everything" rule. Plain body text should generally be rendered
 * directly, not wrapped in this, so it stays instantly legible.
 *
 * Respects prefers-reduced-motion by swapping in a zero-duration variant
 * rather than skipping the animation wrapper altogether, so layout does
 * not shift for reduced-motion users.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : revealUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  staggerContainer,
  staggerItem,
  reducedStaggerContainer,
  reducedStaggerItem,
} from "@/lib/motion";

/**
 * A small group of related items (a handful of decisions, a grid of
 * metrics) entering as one coordinated stagger rather than each
 * triggering its own identical fade-up independently as the visitor
 * scrolls past. Deliberately not used on plain paragraphs -- see
 * CaseStudyLayout, where Context and Role & Collaboration render
 * directly instead of through this, per the Creative Direction's
 * "scroll reveals follow reading order and hierarchy, not a uniform
 * fade-up on everything" rule.
 */
export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? reducedStaggerContainer : staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? reducedStaggerItem : staggerItem}
    >
      {children}
    </motion.div>
  );
}

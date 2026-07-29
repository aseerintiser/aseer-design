"use client";

import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ProjectSummary } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";
import { cn } from "@/lib/utils";

const scaleLabel: Record<ProjectSummary["scale"], string> = {
  feature: "Feature-level",
  product: "Product-level",
  platform: "Platform-level",
  research: "Research",
};

interface ProjectCardProps {
  project: ProjectSummary;
  className?: string;
}

/**
 * Shared card for the Work and Research index grids.
 *
 * Redesigned per the Creative Direction's explicit Avoid: "the generic
 * bordered-box-with-drop-shadow card... let the image and a considered
 * hover state carry the visual weight." There is no border and no
 * whole-card translate here; instead the media block itself scales
 * gently on hover, a cursor-tracked "View case study" label appears
 * (the Nice-to-Have this brief calls out for exactly this use), and
 * elevation is a soft, real shadow rather than a jump. No real
 * screenshots exist yet, so the media block is a deterministic
 * generated visual (ProjectVisual), not an invented image.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const isContingent = project.status === "contingent";
  const href = `/${project.track === "work" ? "work" : "research"}/${project.slug}`;
  const shouldReduceMotion = useReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30, mass: 0.4 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  }

  return (
    <Link href={href} className={cn("group block", className)}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.28)]"
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <ProjectVisual
            seed={project.slug}
            monogram={project.title.charAt(0)}
            className="h-full w-full transition-transform duration-[600ms] ease-[var(--ease-standard)] group-hover:scale-[1.06]"
          />
        </div>

        {/* Cursor-tracked wayfinding label. One of the two narrow, named
            uses for a custom cursor treatment in the Creative Direction
            ("most usefully on project thumbnails... adds real wayfinding
            information"). Desktop, fine-pointer only via the hidden
            sm:block behavior implied by hover support; hidden entirely
            under reduced motion since it's a moving element that adds
            nothing essential (the whole card is already the link). */}
        {!shouldReduceMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-[var(--radius-full)] bg-[var(--color-bg)] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap text-[var(--color-text)] shadow-[0_4px_16px_rgba(0,0,0,0.18)] md:flex"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              hovering ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.15 }}
          >
            View case study
          </motion.span>
        )}

        <div className="space-y-2 bg-[var(--color-bg)] p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-lg">
              {project.title}
            </h3>
            {project.isFlagship && (
              <span className="shrink-0 rounded-[var(--radius-full)] bg-[var(--color-accent)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent-contrast)]">
                Flagship
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {scaleLabel[project.scale]}
            {isContingent ? " · Decision pending" : ""}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-[var(--color-text)]">
            <span>{project.oneLineScope}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-[var(--color-accent)] opacity-0 transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0 group-hover:opacity-100"
            >
              <path
                fill="currentColor"
                d="M9.3 3.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4L11.6 9H2a1 1 0 1 1 0-2h9.6L9.3 4.7a1 1 0 0 1 0-1.4Z"
              />
            </svg>
          </p>
        </div>
      </div>
    </Link>
  );
}

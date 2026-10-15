"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ProjectSummary } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";
import { Stage } from "./Stage";
import { chapterFor } from "@/content/chapters";
import { ArrowIcon } from "./ArrowIcon";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
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
  /** Milestone 3: suppress the "Flagship" pill when the card already sits
   * under its own "Featured work"/"Featured research" label (the
   * homepage's two hero previews) -- showing both says the same thing
   * twice in the same glance. Index grids (Work/Research pages), which
   * have no such label above each card, keep the pill by default. */
  showFlagshipBadge?: boolean;
  /** For a card that spans a full row (see Stage's "wide" shape). */
  wide?: boolean;
}

/**
 * Shared card for the Work and Research index grids (and the homepage's
 * two featured previews).
 *
 * Phase 1: the media sits on the shared Stage (see Stage.tsx), so every
 * project is framed the same way whatever its original treatment. There
 * is no border and no whole-card translate; on hover or focus the
 * stage's window lifts slightly and its loop plays, a cursor-tracked
 * "View case study" label appears, and elevation is a soft, real shadow.
 * Projects without a thumbnail fall back to the generated ProjectVisual.
 */
export function ProjectCard({
  project,
  className,
  showFlagshipBadge = true,
  wide = false,
}: ProjectCardProps) {
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

  // Media Experience milestone: Work/Research index pages and the
  // homepage's featured row can easily have half a dozen of these video
  // thumbnails mounted at once. `autoPlay` on every one of them meant
  // every video thumbnail decoded and played continuously the instant
  // the page loaded, on/off screen alike -- real, needless CPU/battery
  // cost, especially on mobile, for thumbnails nobody is currently
  // looking at. An IntersectionObserver instead plays only the ones
  // actually on screen and pauses the rest, so the "one improvement,
  // whole-portfolio benefit" this milestone asks for applies to every
  // current and future video thumbnail without each page needing its
  // own logic. Also respects prefers-reduced-motion: a reader who's
  // asked for less motion gets the static first frame instead of
  // several autoplaying videos in a row.
  // Phase 1: the loop plays only while someone is looking at this card:
  // on hover or keyboard focus with a mouse, or while the card sits in
  // the middle band of the screen on a touch device (no hover there).
  // It stops as soon as attention moves on, so a grid of cards never
  // has several clips running at once.
  const [focused, setFocused] = useState(false);
  const [centred, setCentred] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCentred(Boolean(entry?.isIntersecting)),
      { rootMargin: "-35% 0px -35% 0px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const playing = hovering || focused || centred;
  const chapter = chapterFor(project.slug);

  return (
    <Link
      href={href}
      className={cn("group block", className)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.28)]"
      >
        {project.thumbnail ? (
          <Stage
            chapter={chapter}
            media={project.thumbnail}
            playing={playing}
            shape={wide ? "wide" : "standard"}
            sizes={wide ? "(min-width: 1024px) 60vw, 90vw" : undefined}
          />
        ) : (
          <div className="aspect-[4/3] w-full overflow-hidden">
            <ProjectVisual
              seed={project.slug}
              monogram={project.title.charAt(0)}
              className="h-full w-full"
            />
          </div>
        )}

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
            <h3 className="font-[family-name:var(--font-display)] text-xl leading-snug">
              {project.title}
            </h3>
            {project.isFlagship && showFlagshipBadge && (
              <span className="shrink-0 rounded-[var(--radius-full)] bg-[var(--color-accent)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent-contrast)]">
                Flagship
              </span>
            )}
          </div>
          <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
            {scaleLabel[project.scale]}
            {isContingent ? " · Decision pending" : ""}
          </p>
          <p className="flex items-start gap-1.5 text-sm text-[var(--color-text)]">
            {/* line-clamp-2: migrated (Milestone 2) case studies carry a
                full multi-sentence intro paragraph in oneLineScope (real
                content, verbatim from the live site's own project intro),
                which is the right length for the case-study header but
                far too long for a compact index card. Clamping is a
                visual/formatting change only -- the underlying text is
                untouched, just visually truncated with an ellipsis. */}
            <span className="line-clamp-2">{renderInlineMarkdown(project.oneLineScope)}</span>
            <ArrowIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 -translate-x-1 text-[var(--color-accent)] opacity-0 transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0 group-hover:opacity-100" />
          </p>
        </div>
      </div>
    </Link>
  );
}

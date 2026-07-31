"use client";

import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ProjectSummary } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";
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
}

/**
 * Shared card for the Work and Research index grids (and the homepage's
 * two featured previews).
 *
 * Redesigned per the Creative Direction's explicit Avoid: "the generic
 * bordered-box-with-drop-shadow card... let the image and a considered
 * hover state carry the visual weight." There is no border and no
 * whole-card translate here; instead the media block itself scales
 * gently on hover, a cursor-tracked "View case study" label appears
 * (the Nice-to-Have this brief calls out for exactly this use), and
 * elevation is a soft, real shadow rather than a jump.
 *
 * Milestone 2 migrated real screenshots/GIFs for most case studies, so
 * (Milestone 3) the media block now prefers `project.thumbnail` -- the
 * case study's own opening shot -- and only falls back to the generated
 * ProjectVisual placeholder for projects that don't have one yet
 * (research track, still unwritten) or where the real assets don't crop
 * cleanly into a 4:3 card (see content/projects.ts per-project notes).
 */
export function ProjectCard({ project, className, showFlagshipBadge = true }: ProjectCardProps) {
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
          {project.thumbnail ? (
            project.thumbnail.src.endsWith(".mp4") ? (
              // Thumbnail Refresh milestone: a few case studies' opening
              // shots are screen recordings, not static screenshots --
              // motion (a scrolling design-token panel, a chat widget
              // cycling through prompts) is the whole point of the asset.
              // A native looping .gif could show the same motion, but at
              // these resolutions/durations a GIF is a genuinely
              // enormous file (the raw source clips were 24-48MB each)
              // for zero visual benefit over video; muted/autoplay/loop
              // video is visually indistinguishable from a looping GIF
              // to anyone looking at the card, at roughly 1-3MB instead
              // of tens of MB. Same object-cover/hover-scale treatment as
              // the Image branch below so it's indistinguishable from a
              // static or GIF thumbnail in layout, radius, and hover
              // behavior -- only the underlying element differs.
              <video
                src={project.thumbnail.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={project.thumbnail.alt}
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-standard)] group-hover:scale-[1.06]"
              />
            ) : (
              <Image
                src={project.thumbnail.src}
                width={project.thumbnail.width}
                height={project.thumbnail.height}
                alt={project.thumbnail.alt}
                unoptimized={project.thumbnail.src.endsWith(".gif")}
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-standard)] group-hover:scale-[1.06]"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            )
          ) : (
            <ProjectVisual
              seed={project.slug}
              monogram={project.title.charAt(0)}
              className="h-full w-full transition-transform duration-[600ms] ease-[var(--ease-standard)] group-hover:scale-[1.06]"
            />
          )}
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
            {project.isFlagship && showFlagshipBadge && (
              <span className="shrink-0 rounded-[var(--radius-full)] bg-[var(--color-accent)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent-contrast)]">
                Flagship
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
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

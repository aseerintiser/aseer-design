"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAmbientMotion } from "@/lib/motion-preference";
import { Tuki } from "./Tuki";

export interface Chapter {
  id: string;
  n: number;
  title: string;
}

interface ChapterNavProps {
  chapters: Chapter[];
  /** The element whose scroll progress the bar shows (the case body). */
  containerId: string;
  /** A mascot that rides along with the reader (TravelMate's Tuki): it
   * marks the current chapter on the rail like a "you are here" stop on
   * a transit line, and rides the progress bar on small screens. */
  companion?: "tuki";
}

/** Tuki hops whenever the chapter changes, flapping while he moves.
 * With motion paused or reduced, he simply moves to the new stop. */
const HOP = { duration: 0.56, times: [0, 0.42, 1], ease: "easeOut" as const };

function useActiveChapter(chapters: Chapter[]) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0]!.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapters]);
  return active;
}

function useProgress(containerId: string) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    let frame = 0;
    function update() {
      frame = 0;
      const rect = container!.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.5;
      const passed = -rect.top + window.innerHeight * 0.35;
      setProgress(Math.min(1, Math.max(0, total > 0 ? passed / total : 0)));
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerId]);
  return progress;
}

/**
 * Where am I in this case study? (Phase 3.)
 *
 * On wide screens: a chapter rail beside the reading column, with the
 * current chapter marked and a progress line. On smaller screens, where
 * a rail would squeeze the text, a slim bar sticks under the navigation
 * instead, showing the current chapter and progress, and opens the full
 * chapter list on tap. Either way the reader always knows where they
 * are and can jump anywhere.
 */
export function ChapterNav({ chapters, containerId, companion }: ChapterNavProps) {
  const active = useActiveChapter(chapters);
  const progress = useProgress(containerId);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const current = chapters.find((chapter) => chapter.id === active) ?? chapters[0];
  const motionOn = useAmbientMotion();
  const [flapping, setFlapping] = useState(false);
  const hop = motionOn
    ? {
        animate: { y: [0, -10, 0] },
        transition: HOP,
        onAnimationStart: () => setFlapping(true),
        onAnimationComplete: () => setFlapping(false),
      }
    : {};
  const railItems = useRef<Record<string, HTMLLIElement | null>>({});
  const [stopY, setStopY] = useState<number | null>(null);

  // Where the current chapter sits on the rail, for Tuki's stop.
  useLayoutEffect(() => {
    if (!companion) return;
    function measure() {
      const item = railItems.current[active];
      if (item && item.offsetParent) setStopY(item.offsetTop + item.offsetHeight / 2);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, companion]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (!barRef.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (chapters.length < 2 || !current) return null;

  const list = (onPick?: () => void, rail = false) => (
    <ol className="space-y-1">
      {chapters.map((chapter) => {
        const isActive = chapter.id === active;
        return (
          <li
            key={chapter.id}
            ref={
              rail
                ? (element) => {
                    railItems.current[chapter.id] = element;
                  }
                : undefined
            }
          >
            <a
              href={`#${chapter.id}`}
              onClick={onPick}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group flex gap-3 rounded-[var(--radius-md)] py-1.5 pr-2 text-sm leading-snug transition-colors duration-[var(--duration-fast)]",
                isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              )}
            >
              <span className="w-5 shrink-0 pt-px font-[family-name:var(--font-mono)] text-[0.6875rem] tabular-nums">
                {String(chapter.n).padStart(2, "0")}
              </span>
              <span className={cn(isActive && "font-medium")}>{chapter.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Wide screens: the rail. */}
      <nav aria-label="Chapters" className="hidden lg:block print:hidden">
        <div className="sticky top-24">
          <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            Chapters
          </p>
          <div className="relative mt-4 pl-4">
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-[var(--color-border)]" />
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 w-px origin-top bg-[var(--color-text)]"
              style={{ height: "100%", transform: `scaleY(${progress})` }}
            />
            {list(undefined, true)}
            {companion && stopY !== null && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 z-10"
                style={{ x: -14 }}
                initial={false}
                animate={{ y: stopY - 16 }}
                transition={motionOn ? { duration: 0.56, ease: [0.33, 1, 0.68, 1] } : { duration: 0 }}
              >
                <motion.div key={active} {...hop}>
                  <Tuki size={28} flapping={flapping} />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Smaller screens: the slim bar. */}
      <div ref={barRef} className="sticky top-[3.85rem] z-30 -mx-4 mb-8 sm:-mx-6 lg:hidden print:hidden">
        <div className="border-y border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="chapter-list"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "flex w-full items-center justify-between gap-3 px-4 pt-3 text-left sm:px-6",
              companion ? "pb-5" : "pb-3",
            )}
          >
            <span className="flex min-w-0 items-baseline gap-3">
              <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.6875rem] tabular-nums text-[var(--color-text-muted)]">
                {String(current.n).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
              </span>
              <span className="truncate text-sm font-medium">{current.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              Chapters
              <svg viewBox="0 0 16 16" aria-hidden="true" className={cn("h-3 w-3 transition-transform", open && "rotate-180")}>
                <path fill="currentColor" d="M3.3 5.8 8 10.4l4.7-4.6 1 1L8 12.4 2.3 6.8z" />
              </svg>
            </span>
          </button>
          <span aria-hidden="true" className="relative block">
            <span className="block h-0.5 origin-left bg-[var(--color-text)]" style={{ transform: `scaleX(${progress})` }} />
            {companion && (
              <span
                className="pointer-events-none absolute bottom-0.5"
                style={{ left: `calc(${progress} * (100% - 20px))` }}
              >
                <motion.span key={active} className="block" {...hop}>
                  <Tuki size={20} flapping={flapping} />
                </motion.span>
              </span>
            )}
          </span>
          {open && (
            <div id="chapter-list" className="border-t border-[var(--color-border)] px-4 py-3 sm:px-6">
              {list(() => setOpen(false))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

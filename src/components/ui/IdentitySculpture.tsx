"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Homepage hero, right column. Hero Right-Column Exploration branch: this
 * side of the hero used to be empty space. The text column (site.bio /
 * site.skillLines) never fills the full width of its container, so wide
 * viewports showed a large, static, unused gap next to the headline. This
 * replaces that gap with one quiet element instead of leaving it blank or
 * filling it with something illustrative.
 *
 * Deliberately not a logo, an icon set, or an infographic: the six words
 * orbiting the center are read directly from site.skillLines -- the exact
 * same six phrases already stated in the text column just to the left --
 * so this can never drift into a second, slightly different list. It's
 * that same list, rendered as a slow-moving typographic object rather
 * than repeated as a second competing statement. The center word,
 * "trust," is the one word the headline itself uses ("...people trust,
 * grounded in research") and isn't one of the six, so center and ring
 * read as one idea -- six practices, one throughline -- instead of two
 * unrelated pieces of type sharing a circle.
 *
 * Entirely decorative and aria-hidden: every word here already exists as
 * real, accessible text in the skill-line rows to its left, so nothing
 * here should ever be the only place a fact lives, and nothing here is
 * keyboard-focusable. A screen reader user gets the identical six words
 * from the accessible copy; this is a visual-only elaboration on top of
 * that, not a second source of information.
 */
export function IdentitySculpture({ className }: { className?: string }) {
  const words = site.skillLines.flatMap((line) => line.split(" • "));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Very subtle cursor parallax -- "the entire sculpture may shift a few
  // pixels... maximum restraint." Plain DOM style writes on a ref rather
  // than React state, so a mousemove doesn't force a re-render every
  // frame; this is the one place in this component that reaches for JS
  // instead of CSS, and only because a cursor-relative offset has no
  // pure-CSS equivalent. Skipped under prefers-reduced-motion and on
  // devices with no fine pointer (touch), where a cursor offset has no
  // meaning.
  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    const node = wrapperRef.current;
    if (!node) return;

    const maxShiftPx = 6;
    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      node.style.setProperty("--parallax-x", `${clamp(relX, -1, 1) * maxShiftPx}px`);
      node.style.setProperty("--parallax-y", `${clamp(relY, -1, 1) * maxShiftPx}px`);
    };
    const handleLeave = () => {
      node.style.setProperty("--parallax-x", "0px");
      node.style.setProperty("--parallax-y", "0px");
    };

    window.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      ref={wrapperRef}
      className={cn("identity-sculpture relative mx-auto shrink-0", className)}
      style={{
        width: "clamp(340px, 26vw, 460px)",
        height: "clamp(340px, 26vw, 460px)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: "translate(var(--parallax-x, 0px), var(--parallax-y, 0px))",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Two static hairline circles: the fixed instrument the words
            move within. Never animated -- the boundary stays still so
            the words' motion inside it reads as motion, not as the
            whole object drifting around the page. */}
        <div className="absolute inset-0 rounded-full border border-[var(--color-border-strong)]/35" />
        <div className="absolute top-1/2 left-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-strong)]/25" />

        {/* Center mark. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,0.95rem+0.5vw,1.5rem)] text-[var(--color-text)] italic">
            trust
          </p>
        </div>

        {/* The ring. Six words, evenly spaced (60deg apart) -- their own
            hexagonal symmetry is already balanced, so unlike a denser
            circular-text treatment, this deliberately doesn't repeat the
            list a second time around the same circle: fewer, calmer
            marks read as more considered, not as an unfinished pattern. */}
        {words.map((word, index) => {
          const angle = index * (360 / words.length) - 90;
          return (
            <div key={word} className="absolute top-1/2 left-1/2 h-0 w-0">
              <div
                className="orbit-driver h-0 w-0"
                style={{ "--start-angle": `${angle}deg` } as React.CSSProperties}
              >
                <span
                  className={cn(
                    "absolute top-0 left-0 block max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2",
                    "cursor-default text-center text-[10px] leading-snug font-medium tracking-[0.12em] text-[var(--color-text-muted)] uppercase opacity-75",
                    "transition-[opacity,letter-spacing,color,transform] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "hover:scale-[1.04] hover:tracking-[0.16em] hover:text-[var(--color-text)] hover:opacity-100",
                  )}
                >
                  {word}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

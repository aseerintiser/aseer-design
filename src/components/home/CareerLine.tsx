"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAmbientMotion } from "@/lib/motion-preference";
import { careerSteps } from "@/content/home";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

// Node centers match the five equal columns of the step list below.
const NODE_X = [10, 30, 50, 70, 90]; // percent across the line
const NODE_Y = [58, 47, 36, 24, 12]; // px from the top of the 72 px band
// A gently rising line through the five nodes, one similar curve per step.
const LINE_D = "M100 58 C200 58 200 47 300 47 S400 36 500 36 S600 24 700 24 S800 12 900 12";
const LAST = careerSteps.length - 1;

/**
 * The path so far: Aseer's dated career line, on its own after the work
 * (it used to drive the hero film, until the hero became a reel of
 * chosen work in November 2026).
 *
 * The first time it comes into view, the yellow marker travels the line
 * from the degree to now. Any step can be pressed to read about it, with
 * a link to where that part of the story lives. With motion off the
 * marker starts at Now and does not travel. On a phone the line becomes
 * a row of years.
 */
export function CareerLine() {
  const rootRef = useRef<HTMLDivElement>(null);
  const motion = useAmbientMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || played || touched) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setPlayed(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [played, touched]);

  // Travel once, a step at a time, unless the visitor takes over.
  useEffect(() => {
    if (!played || touched || !motion || active >= LAST) return;
    const timer = window.setTimeout(() => setActive((current) => Math.min(current + 1, LAST)), 850);
    return () => window.clearTimeout(timer);
  }, [played, touched, motion, active]);

  function choose(index: number) {
    setTouched(true);
    setActive(index);
  }

  // With motion off nothing travels: the line rests at Now until a step
  // is chosen.
  const current = touched || motion ? active : LAST;
  const step = careerSteps[current] ?? careerSteps[0];

  return (
    <div ref={rootRef}>
      {/* Desktop and tablet: the dated line. */}
      <div className="relative hidden md:block">
        <svg
          viewBox="0 0 1000 72"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 h-[72px] w-full"
          aria-hidden="true"
        >
          <path d={LINE_D} fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* Progress: the same line in yellow, clipped at the active step's
            x, so its end lands under the marker at any width. */}
        <svg
          viewBox="0 0 1000 72"
          preserveAspectRatio="none"
          className="career-progress pointer-events-none absolute inset-x-0 top-0 h-[72px] w-full"
          style={{ clipPath: `inset(-4px ${100 - (NODE_X[current] ?? 10)}% -4px 0)` }}
          aria-hidden="true"
        >
          <path d={LINE_D} fill="none" stroke="var(--color-signal)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          aria-hidden="true"
          className="career-marker pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-signal)] bg-[var(--color-bg)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-signal)_22%,transparent)]"
          style={{ left: `${NODE_X[current] ?? 10}%`, top: NODE_Y[current] ?? 58 }}
        />
        <ol className="relative grid grid-cols-5 pt-[76px]" aria-label="Career, in time order">
          {careerSteps.map((item, index) => {
            const isActive = index === current;
            return (
              <li key={item.id} className="relative px-2 text-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-[var(--duration-slow)]",
                    index <= current ? "bg-[var(--color-signal)]" : "bg-[var(--color-border-strong)]",
                  )}
                  style={{ top: (NODE_Y[index] ?? 58) - 76 }}
                />
                <button
                  type="button"
                  onClick={() => choose(index)}
                  aria-current={isActive ? "step" : undefined}
                  className="group mx-auto block max-w-[16rem] rounded-[var(--radius-md)] px-2 py-1 text-center"
                >
                  <span
                    className={cn(
                      "block font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] transition-colors duration-[var(--duration-base)]",
                      isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {item.years}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-sm leading-snug transition-colors duration-[var(--duration-base)]",
                      isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-[var(--color-text-muted)]">{item.place}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Phone: a row of years you can tap. */}
      <ol className="flex gap-1.5 overflow-x-auto pb-1 md:hidden" aria-label="Career, in time order">
        {careerSteps.map((item, index) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              onClick={() => choose(index)}
              aria-current={index === current ? "step" : undefined}
              aria-label={`${item.years}: ${item.title}, ${item.place}`}
              className={cn(
                "rounded-[var(--radius-full)] border px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs transition-colors duration-[var(--duration-base)]",
                index === current
                  ? "border-[var(--color-signal)] bg-[var(--color-signal)] text-[var(--color-signal-ink)]"
                  : "border-[var(--color-border-strong)] text-[var(--color-text-muted)]",
              )}
            >
              {item.years}
            </button>
          </li>
        ))}
      </ol>

      {/* The chosen step. Announced only once the visitor is choosing,
          not while the marker travels on its own. */}
      <div className="mt-10 max-w-2xl md:mx-auto md:text-center" aria-live={touched ? "polite" : "off"}>
        <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase md:hidden">
          {step.years} · {step.title}
        </p>
        <p className="mt-2 min-h-[3.75em] font-[family-name:var(--font-display)] text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.25] text-balance md:mt-0 md:min-h-[2.5em]">
          {step.detail}
        </p>
        <Link href={step.link.href} className="group mt-4 inline-flex items-center gap-2 text-sm font-medium">
          <span className="link-ink">{step.link.label}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

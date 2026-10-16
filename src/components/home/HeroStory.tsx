"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { useAmbientMotion } from "@/lib/motion-preference";
import { careerSteps, trailerClips, type CareerStepId } from "@/content/home";
import { chapterFor } from "@/content/chapters";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/**
 * The homepage hook (Phase 2): one trailer cut from the real project
 * loops, played along Aseer's dated career line.
 *
 * As the trailer plays, a yellow marker travels the line and lights the
 * step whose work is on screen, and the stage takes on that project's
 * chapter color. Any step can be pressed: steps with work jump the
 * trailer there; the first and last steps (the degree that started it,
 * and now) show a short card instead, since there is no footage of them.
 *
 * The trailer plays on its own, like a GIF, but only while the hero is
 * visible, and the site-wide motion switch in the footer (or the
 * system's reduced-motion setting) keeps it on its poster (WCAG 2.2.2).
 * On a phone the line becomes a row of years under the trailer.
 */

// Node centers match the five equal columns of the step list below.
const NODE_X = [10, 30, 50, 70, 90]; // percent across the line
const NODE_Y = [58, 47, 36, 24, 12]; // px from the top of the 72 px band
// A gently rising line through the five nodes, one similar curve per
// step, so the progress along it is close to a quarter per step.
const LINE_D = "M100 58 C200 58 200 47 300 47 S400 36 500 36 S600 24 700 24 S800 12 900 12";

function clipIndexAt(time: number) {
  let index = 0;
  trailerClips.forEach((clip, i) => {
    if (time + 0.15 >= clip.start) index = i;
  });
  return index;
}

export function HeroStory({ intro }: { intro: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const motion = useAmbientMotion();

  const [clipIndex, setClipIndex] = useState(0);
  const [card, setCard] = useState<CareerStepId | null>(null);
  const [inView, setInView] = useState(true);

  const clip = trailerClips[clipIndex] ?? trailerClips[0];
  const activeStep: CareerStepId = card ?? clip.step;
  const activeStepIndex = careerSteps.findIndex((step) => step.id === activeStep);
  const tint = card ? "#5b584f" : chapterFor(clip.chapter).tint;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.25,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = inView && card === null && motion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  }, [shouldPlay]);

  function jumpTo(stepId: CareerStepId) {
    const step = careerSteps.find((s) => s.id === stepId);
    if (!step) return;
    if (step.card) {
      setCard(stepId);
      return;
    }
    setCard(null);
    const target = trailerClips.findIndex((c) => c.step === stepId);
    const video = videoRef.current;
    if (target >= 0 && video) {
      video.currentTime = (trailerClips[target]?.start ?? 0) + 0.05;
      setClipIndex(target);
      if (motion) video.play().catch(() => {});
    }
  }

  const stageStyle = useMemo(() => ({ "--stage-tint": tint }) as CSSProperties, [tint]);
  const cardStep = card ? careerSteps.find((s) => s.id === card) : null;

  return (
    <div ref={rootRef}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">{intro}</div>

        <div className="lg:col-span-5">
          <figure className="m-0">
            <div className="stage stage-animated relative isolate aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)]" style={stageStyle}>
              <div className="absolute inset-0">
                <video
                  ref={videoRef}
                  src="/loops/trailer.mp4"
                  poster="/loops/trailer.webp"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="A short trailer of Aseer's work in time order: FitVibe, then Convay's design system, mobile app and AI meeting tools, then Lumi."
                  onTimeUpdate={(event) => {
                    const next = clipIndexAt(event.currentTarget.currentTime);
                    setClipIndex((current) => (current === next ? current : next));
                  }}
                  className="block h-full w-full object-cover"
                />

                {cardStep && (
                  <div className="absolute inset-0 flex flex-col justify-center bg-[#0e0e0c] px-[8%] text-[#f2f0ea]">
                    <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.14em] text-white/60 uppercase">
                      {cardStep.years} · {cardStep.place}
                    </p>
                    <p className="mt-4 max-w-[26ch] font-[family-name:var(--font-display)] text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.15]">
                      {cardStep.card}
                    </p>
                    {cardStep.id === "now" ? (
                      <Link
                        href="#contact"
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-signal)] px-4 py-2.5 text-sm font-medium text-[var(--color-signal-ink)]"
                      >
                        Get in touch
                        <ArrowIcon className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => jumpTo("kaz")}
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
                      >
                        Play the work from 2022
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <figcaption className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0" aria-live="polite">
                <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  {cardStep ? "On the line" : "Now showing"}
                </p>
                {cardStep ? (
                  <p className="mt-1 font-[family-name:var(--font-display)] text-xl">{cardStep.title}</p>
                ) : (
                  <Link href={clip.href} className="group mt-1 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl">
                    <span className="link-ink no-underline">{clip.title}</span>
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
                  </Link>
                )}
                <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                  {cardStep ? cardStep.place : clip.meta}
                </p>
              </div>
            </figcaption>

            {/* Phone: the line becomes a row of years you can tap. */}
            <ol className="mt-5 flex gap-1.5 overflow-x-auto pb-1 md:hidden" aria-label="Career, in time order">
              {careerSteps.map((step, index) => (
                <li key={step.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => jumpTo(step.id)}
                    aria-current={index === activeStepIndex ? "step" : undefined}
                    aria-label={`${step.years}: ${step.title}, ${step.place}`}
                    className={cn(
                      "rounded-[var(--radius-full)] border px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs transition-colors duration-[var(--duration-base)]",
                      index === activeStepIndex
                        ? "border-[var(--color-signal)] bg-[var(--color-signal)] text-[var(--color-signal-ink)]"
                        : "border-[var(--color-border-strong)] text-[var(--color-text-muted)]",
                    )}
                  >
                    {step.years}
                  </button>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>

      {/* Desktop and tablet: the dated career line. */}
      <div className="relative mt-10 hidden md:block">
        <svg
          viewBox="0 0 1000 72"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 h-[72px] w-full"
          aria-hidden="true"
        >
          <path d={LINE_D} fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* Progress: the same line in yellow, revealed up to the active
            step. The line only ever moves right, so clipping it at the
            step's x lands the end exactly under the marker at any width
            (a stroke-dash fraction drifts once the line is stretched). */}
        <svg
          viewBox="0 0 1000 72"
          preserveAspectRatio="none"
          className="career-progress pointer-events-none absolute inset-x-0 top-0 h-[72px] w-full"
          style={{ clipPath: `inset(-4px ${100 - (NODE_X[activeStepIndex] ?? 10)}% -4px 0)` }}
          aria-hidden="true"
        >
          <path
            d={LINE_D}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          aria-hidden="true"
          className="career-marker pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-signal)] bg-[var(--color-bg)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-signal)_22%,transparent)]"
          style={{ left: `${NODE_X[activeStepIndex] ?? 10}%`, top: NODE_Y[activeStepIndex] ?? 58 }}
        />
        <ol className="relative grid h-auto grid-cols-5 pt-[76px]" aria-label="Career, in time order">
          {careerSteps.map((step, index) => {
            const active = index === activeStepIndex;
            return (
              <li key={step.id} className="relative px-2 text-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-[var(--duration-slow)]",
                    index <= activeStepIndex ? "bg-[var(--color-signal)]" : "bg-[var(--color-border-strong)]",
                  )}
                  style={{ top: (NODE_Y[index] ?? 58) - 76 }}
                />
                <button
                  type="button"
                  onClick={() => jumpTo(step.id)}
                  aria-current={active ? "step" : undefined}
                  className="group mx-auto block max-w-[16rem] rounded-[var(--radius-md)] px-2 py-1 text-center"
                >
                  <span
                    className={cn(
                      "block font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] transition-colors duration-[var(--duration-base)]",
                      active ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {step.years}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-sm leading-snug transition-colors duration-[var(--duration-base)]",
                      active ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]",
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-[var(--color-text-muted)]">{step.place}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

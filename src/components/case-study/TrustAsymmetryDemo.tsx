"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { easing, story } from "@/lib/motion";

/**
 * Lumi's clearest finding, made interactive: trust is slow to form and
 * fast to break (Phase 4 redesign of the "Try it yourself" meter).
 *
 * Every event is something that actually happened in the study and is
 * described in the case study above it: the working TOAS link, the
 * accurate price range and its quote, the precise summary, and the
 * housing provider that doesn't exist. The heights are illustrative, not
 * measured, and the figure caption says so.
 *
 * The finding is in the motion as well as the shape. Each real signal
 * adds a segment that climbs over 1.2 s (story speed, rise); a broken
 * claim drops the line in 140 ms (story speed, break). It is the same
 * rhythm as the trust-line mark, because the mark came from this finding.
 */

type EventId = "link" | "price" | "summary" | "break";

interface TrustEvent {
  id: EventId;
  label: string;
  response: string;
  delta?: number;
}

const POSITIVE: TrustEvent[] = [
  {
    id: "link",
    label: "A working link to TOAS",
    response:
      "An official link that actually loaded. Small, but it's exactly this kind of moment that built trust in the study.",
    delta: 22,
  },
  {
    id: "price",
    label: "An accurate price range",
    response:
      "\"I was immediately motivated... attracted to the price.\" Trust keeps forming, one small proof at a time.",
    delta: 22,
  },
  {
    id: "summary",
    label: "A precise, scannable summary",
    response:
      "Vague reassurance didn't move people in this study. Specific, checkable facts did, and this is one of them.",
    delta: 18,
  },
];

const BREAK: TrustEvent = {
  id: "break",
  label: "A housing provider that doesn't exist",
  response:
    "This actually happened once, in the real study. Lumi named a housing provider that doesn't exist. The participant clicked the link. Nothing loaded. Trust didn't fade after that, it reset, instantly.",
};

const BASELINE = 14;
const FLOOR = 6;
const CEILING = 94;
const SLOTS = 7;

interface Point {
  key: number;
  level: number;
  event?: TrustEvent;
  n?: number;
}

const W = 640;
const H = 220;
const PAD_X = 14;
const PAD_TOP = 16;
const PAD_BOTTOM = 18;

const x = (index: number) => PAD_X + (index * (W - PAD_X * 2)) / (SLOTS - 1);
const y = (level: number) => PAD_TOP + ((100 - level) / 100) * (H - PAD_TOP - PAD_BOTTOM);

function segmentPath(from: Point, to: Point, fromIndex: number) {
  const x0 = x(fromIndex);
  const x1 = x(fromIndex + 1);
  const y0 = y(from.level);
  const y1 = y(to.level);
  const dx = x1 - x0;
  if (to.event?.id === "break") {
    // The break: almost vertical, then the line carries on low.
    return `M${x0} ${y0} L${x0 + dx * 0.1} ${y1} L${x1} ${y1}`;
  }
  // A rise: a patient start that settles, like the mark's climb.
  return `M${x0} ${y0} C${x0 + dx * 0.55} ${y0} ${x1 - dx * 0.3} ${y1} ${x1} ${y1}`;
}

export function TrustAsymmetryDemo() {
  const shouldReduceMotion = useReducedMotion();
  const counter = useRef(1);
  const eventCount = useRef(0);
  const [points, setPoints] = useState<Point[]>([{ key: 0, level: BASELINE }]);
  const [response, setResponse] = useState<string | null>(null);

  function add(event: TrustEvent) {
    const key = counter.current++;
    const n = ++eventCount.current;
    setPoints((current) => {
      const last = current[current.length - 1]!;
      const level = event.id === "break" ? FLOOR : Math.min(CEILING, last.level + (event.delta ?? 0));
      return [...current, { key, level, event, n }].slice(-SLOTS);
    });
    setResponse(event.response);
  }

  function reset() {
    eventCount.current = 0;
    setPoints([{ key: counter.current++, level: BASELINE }]);
    setResponse(null);
  }

  const current = points[points.length - 1]!;
  const lastKey = current.key;
  const events = points.filter((point) => point.event);

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
      <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        Try it yourself
      </p>
      <p className="mt-2 max-w-[var(--measure)] text-[var(--color-text)]">
        Every option below happened in the study. Add a few real signals, then see what one broken
        claim does.
      </p>

      <div className="mt-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full overflow-visible text-[var(--color-text)]"
          role="img"
          aria-label={`Trust line after ${events.length} ${events.length === 1 ? "event" : "events"}, currently ${current.level} out of 100 on an illustrative scale.`}
        >
          {/* Quiet guides: the floor and the ceiling of the scale. */}
          <line x1={PAD_X} x2={W - PAD_X} y1={y(100)} y2={y(100)} stroke="var(--color-border)" strokeDasharray="2 5" />
          <line x1={PAD_X} x2={W - PAD_X} y1={y(0)} y2={y(0)} stroke="var(--color-border-strong)" />

          {points.slice(1).map((point, index) => {
            const isNewest = point.key === lastKey;
            const isBreak = point.event?.id === "break";
            return (
              <motion.path
                key={point.key}
                d={segmentPath(points[index]!, point, index)}
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="miter"
                initial={isNewest && !shouldReduceMotion ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : isBreak ? story.break : story.rise,
                  ease: isBreak ? easing.exit : easing.rise,
                }}
              />
            );
          })}

          {points.map((point, index) =>
            point.event ? (
              <text
                key={`n-${point.key}`}
                x={x(index)}
                y={H}
                textAnchor="middle"
                className="fill-[var(--color-text-muted)] font-[family-name:var(--font-mono)] text-[11px]"
              >
                {point.n}
              </text>
            ) : null,
          )}

          <motion.circle
            r={6}
            fill="var(--color-signal)"
            stroke="currentColor"
            strokeWidth={2}
            initial={false}
            animate={{ cx: x(points.length - 1), cy: y(current.level) }}
            transition={{
              duration: shouldReduceMotion ? 0 : current.event?.id === "break" ? story.break : story.rise,
              ease: current.event?.id === "break" ? easing.exit : easing.rise,
            }}
          />
        </svg>
        <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
          Higher line, more trust · numbers mark each event
        </p>
      </div>

      {/* The same outcome, for anyone not looking at the line. */}
      <p aria-live="polite" className="mt-4 min-h-12 text-sm text-[var(--color-text)]">
        {response ?? "Pick a real moment from the study below."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {POSITIVE.map((event) => (
          <Button key={event.id} type="button" variant="secondary" size="sm" withArrow={false} onClick={() => add(event)}>
            {event.label}
          </Button>
        ))}
        <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={() => add(BREAK)}>
          {BREAK.label}
        </Button>
        {events.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="px-2 font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] text-[var(--color-text-muted)] uppercase underline-offset-4 hover:text-[var(--color-text)] hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {events.length > 0 && (
        <ol className="mt-5 grid gap-1 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-muted)] sm:grid-cols-2">
          {events.map((point) => (
            <li key={point.key} className="flex gap-2">
              <span className="w-4 shrink-0 font-[family-name:var(--font-mono)] tabular-nums">{point.n}</span>
              <span>{point.event!.label}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

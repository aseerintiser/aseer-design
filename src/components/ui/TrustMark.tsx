import { cn } from "@/lib/utils";

/**
 * The trust line: Aseer's mark (Phase 1 identity, approved October 15,
 * 2026). One stroke in three parts: a slow climb (trust in anything
 * people rely on is earned step by step), a sudden fall (one broken
 * promise undoes it), and the climb back (careful design earns it back).
 *
 * The shape is also the timing. When `draw` is on, the stroke draws in
 * that same rhythm: the climb eases in over about 0.9 s, the fall snaps
 * in 140 ms, and the recovery settles. CSS only, so it costs no
 * JavaScript, and it plays once per page load because the nav lives in
 * the root layout and does not remount on client navigation. With
 * reduced motion on, the global backstop in globals.css finishes the
 * animation instantly, so the mark simply appears complete.
 *
 * Color follows --color-mark: ink on paper, highlighter yellow on night.
 * With `trace`, hovering the nav wordmark runs a yellow highlighter along
 * the line behind the ink, the site's "yellow behind ink" mark in motion
 * (on night the ink turns to paper for it, so the yellow still shows).
 */

/** The single source for the mark's geometry, also used by the link
 * preview images (src/lib/og/image.tsx) and the favicons in public/. */
export const TRUST_LINE_PATH =
  "M3 16.5 C10 16.2 15.6 12 21 3.5 L24 16.5 C26.2 15.6 28 14.8 30 14.2";

interface TrustMarkProps {
  className?: string;
  /** Draw the stroke on mount. Off by default: most uses are static. */
  draw?: boolean;
  /** Stroke weight in viewBox units. 2.3 is the approved weight; small
   * renderings (under ~20px wide) read better slightly heavier. */
  weight?: number;
  /** Accessible name. Omit when the mark sits next to visible text that
   * already names it (the nav wordmark), so it stays decorative. */
  title?: string;
  /** Hover trace: inside a `group` link, a highlighter-yellow band
   * retraces the line behind the ink on hover or keyboard focus, in the
   * same rise, break and recover rhythm. */
  trace?: boolean;
}

export function TrustMark({ className, draw = false, weight = 2.3, title, trace = false }: TrustMarkProps) {
  return (
    <svg
      viewBox="0 0 32 20"
      className={cn("h-auto w-8 text-[var(--color-mark)]", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      overflow="visible"
    >
      {trace && (
        <path
          d={TRUST_LINE_PATH}
          pathLength={1}
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth={weight * 2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trust-mark-trace"
        />
      )}
      <path
        d={TRUST_LINE_PATH}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        className={draw ? "trust-line-draw" : undefined}
      />
    </svg>
  );
}

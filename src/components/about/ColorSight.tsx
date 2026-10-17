"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * "Through my eyes": the About page's colorblindness figure. One small
 * interface (meeting rooms marked free or busy only by color) in three
 * views: typical color vision, an approximation of Aseer's own, and the
 * fix, which is still shown in his colors so it proves the fix works for
 * him too.
 *
 * Aseer's own description (October 17, 2026): red-green, mild. Close
 * shades blur together; very different ones, like dark red and light
 * green, he can still tell apart. The "my vision" colors are the typical
 * colors run through Machado, Oliveira & Fernandes (2009), deuteranomaly
 * at severity 0.6, applied in linear RGB. Deutan is the most common
 * red-green type; his exact type isn't known, so the caption calls it an
 * approximation. Measured with CIEDE2000, the free/busy pair goes from
 * 56 apart to 16 apart, while dark red against light green stays about
 * 50 apart, which matches what he describes.
 */

type View = "typical" | "mine" | "fix";

const VIEWS: { id: View; label: string }[] = [
  { id: "typical", label: "Typical vision" },
  { id: "mine", label: "How I see it" },
  { id: "fix", label: "The fix" },
];

const TYPICAL = { free: "#4C9A55", busy: "#C8553D" };
const MINE = { free: "#868C58", busy: "#9E783A" };
// Dark red (#7A1F1F) and light green (#9FDB8A) through the same matrix.
const FAR = { darkRed: "#5B401C", lightGreen: "#CCCE8D" };

const ROOMS = [
  { name: "Room A", free: true },
  { name: "Room B", free: false },
  { name: "Room C", free: false },
  { name: "Room D", free: true },
] as const;

const STATUS_FOR_SCREEN_READERS = "Rooms A and D are free. Rooms B and C are busy.";

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-block h-2.5 w-2.5 rounded-[2px] align-baseline"
      style={{ backgroundColor: color }}
    />
  );
}

function StatusIcon({ free, color }: { free: boolean; color: string }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="7.25" fill={color} />
      {free ? (
        <path d="M4.6 8.3 7 10.6l4.4-4.9" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}

const caption: Record<View, React.ReactNode> = {
  typical: (
    <>
      Green means free, red means busy. With typical color vision, it reads at a glance.
      <span className="sr-only"> The status is shown only by color. {STATUS_FOR_SCREEN_READERS}</span>
    </>
  ),
  mine: (
    <>
      Roughly how it looks to me. Close shades of red and green blur together, though very different ones, like{" "}
      <span className="whitespace-nowrap">
        dark red
        <Swatch color={FAR.darkRed} />
      </span>{" "}
      and{" "}
      <span className="whitespace-nowrap">
        light green
        <Swatch color={FAR.lightGreen} />,
      </span>{" "}
      I can still tell apart. This is an approximation.
      <span className="sr-only"> {STATUS_FOR_SCREEN_READERS}</span>
    </>
  ),
  fix: (
    <>
      Still how I see it, but now a shape and a word carry the meaning. Color becomes a bonus, not the only signal.
      <span className="sr-only"> {STATUS_FOR_SCREEN_READERS}</span>
    </>
  ),
};

export function ColorSight() {
  const [view, setView] = useState<View>("typical");
  const name = useId();
  const colors = view === "typical" ? TYPICAL : MINE;

  return (
    <figure className="m-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
          Through my eyes
        </p>
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="sr-only">Choose how to view the meeting rooms</legend>
          <div className="inline-flex flex-wrap rounded-[var(--radius-full)] border border-[var(--color-border-strong)] p-1">
            {VIEWS.map((option) => {
              const selected = view === option.id;
              return (
                <label
                  key={option.id}
                  className={cn(
                    "cursor-pointer rounded-[var(--radius-full)] px-3 py-1.5 text-[0.8125rem] leading-none whitespace-nowrap motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)]",
                    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-focus-ring)]",
                    selected
                      ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  )}
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.id}
                    checked={selected}
                    onChange={() => setView(option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-8">
        {/* The interface itself is a picture of the problem; the caption
            carries the same information for screen readers. */}
        <div aria-hidden="true" className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
            <span>Meeting rooms</span>
            <span>Now</span>
          </div>
          <div className="mt-3 flex h-4 items-center gap-4 text-xs text-[var(--color-text-muted)]">
            {(["free", "busy"] as const).map((status) => (
              <span key={status} className="flex items-center gap-1.5">
                {view === "fix" ? (
                  <StatusIcon free={status === "free"} color={colors[status]} />
                ) : (
                  <span
                    className="h-2.5 w-2.5 rounded-full motion-safe:transition-colors motion-safe:duration-500"
                    style={{ backgroundColor: colors[status] }}
                  />
                )}
                {status === "free" ? "Free" : "Busy"}
              </span>
            ))}
          </div>
          <ul className="mt-3 border-t border-[var(--color-border)]">
            {ROOMS.map((room) => {
              const color = room.free ? colors.free : colors.busy;
              return (
                <li key={room.name} className="flex h-11 items-center justify-between border-b border-[var(--color-border)] last:border-b-0">
                  <span className="text-[0.9375rem]">{room.name}</span>
                  {view === "fix" ? (
                    <span className="flex items-center gap-2 text-sm">
                      <StatusIcon free={room.free} color={color} />
                      {room.free ? "Free" : "Busy"}
                    </span>
                  ) : (
                    <span
                      className="h-3.5 w-3.5 rounded-full motion-safe:transition-colors motion-safe:duration-500"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <figcaption aria-live="polite" className="text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">
          {caption[view]}
        </figcaption>
      </div>
    </figure>
  );
}

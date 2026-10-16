"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import type { ScreenImage } from "@/content/types";
import { cn } from "@/lib/utils";

interface ScreenPlayerProps {
  label: string;
  screens: (ScreenImage & { tab: string; line: string })[];
  tint?: string;
}

/**
 * A prototype player (the "medium" shot size): one phone, a tab for each
 * section of the app, and one line on what that screen is for. Tabs
 * follow the ARIA tabs pattern, so arrow keys move between them.
 */
export function ScreenPlayer({ label, screens, tint }: ScreenPlayerProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = screens[active] ?? screens[0];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = screens.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <figure
      className="stage m-0 overflow-hidden rounded-[var(--radius-lg)] text-[#f2f0ea]"
      style={{ "--stage-tint": tint ?? "var(--chapter-tint, #5b584f)" } as CSSProperties}
    >
      <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12 md:p-10">
        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className="relative mx-auto aspect-[9/19.5] w-[220px] overflow-hidden rounded-[32px] bg-black shadow-[0_0_0_7px_#151514,0_0_0_8px_rgb(255_255_255/0.08),0_40px_70px_-30px_rgb(0_0_0/0.9)] md:w-[240px]"
        >
          {screens.map((screen, index) => (
            <Image
              key={screen.src}
              src={screen.src}
              width={screen.width}
              height={screen.height}
              alt={index === active ? screen.alt : ""}
              aria-hidden={index === active ? undefined : true}
              sizes="240px"
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)]",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div>
          <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-white/65 uppercase">
            {label}
          </p>
          <p
            aria-live="polite"
            className="mt-4 min-h-[3.5em] max-w-[30ch] font-[family-name:var(--font-display)] text-[clamp(1.375rem,1.1rem+0.9vw,1.75rem)] leading-[1.25]"
          >
            {current?.line}
          </p>
          <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="mt-6 flex flex-wrap gap-2">
            {screens.map((screen, index) => (
              <button
                key={screen.tab}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`${id}-panel`}
                tabIndex={index === active ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "h-10 rounded-[var(--radius-full)] border px-4 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                  index === active
                    ? "border-[var(--color-signal)] bg-[var(--color-signal)] text-[var(--color-signal-ink)]"
                    : "border-white/25 text-white/85 hover:border-white/60 hover:text-white",
                )}
              >
                {screen.tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

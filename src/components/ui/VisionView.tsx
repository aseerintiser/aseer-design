"use client";

import { useId } from "react";
import { setVision, useVision, visions, type Vision } from "@/lib/vision-preference";
import { cn } from "@/lib/utils";

/*
 * Color-vision simulation matrices from Machado, Oliveira and Fernandes
 * (2009), "A Physiologically-based Model for Simulation of Color Vision
 * Deficiency", at full severity. They are defined in linear RGB, which is
 * what SVG filters work in by default (color-interpolation-filters).
 */
const MATRICES: Record<Exclude<Vision, "normal" | "grayscale">, number[][]> = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

function matrixValues(rows: number[][]) {
  return [...rows.map((row) => [...row, 0, 0].join(" ")), "0 0 0 1 0"].join(" ");
}

/** The SVG filters the color-vision view points at. Mounted once. */
export function VisionFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute h-0 w-0 overflow-hidden">
      <defs>
        {Object.entries(MATRICES).map(([id, rows]) => (
          <filter key={id} id={`vision-${id}`}>
            <feColorMatrix type="matrix" values={matrixValues(rows)} />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

/** The footer control: a native select, so it works with every input
 * method and screen reader without extra code. */
export function VisionSelect({ className }: { className?: string }) {
  const vision = useVision();
  const id = useId();
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border-strong)] py-1.5 pr-7 pl-3 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase transition-colors duration-[var(--duration-fast)] focus-within:border-[var(--color-text)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor" />
      </svg>
      <label htmlFor={id}>View</label>
      <select
        id={id}
        value={vision}
        onChange={(event) => setVision(event.target.value as Vision)}
        className="appearance-none bg-transparent pr-1 font-[family-name:var(--font-mono)] [field-sizing:content] tracking-[0.12em] text-[var(--color-text)] uppercase outline-none [&>option]:bg-[#151513] [&>option]:normal-case"
      >
        {visions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-2.5 h-2.5 w-2.5" aria-hidden="true">
        <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

/** While a simulated view is on, a small note says so and offers the
 * way back, so nobody is left wondering why the site lost its color. */
export function VisionNotice() {
  const vision = useVision();
  const current = visions.find((option) => option.id === vision);
  return (
    <div role="status" aria-live="polite" className="vision-notice">
      {vision !== "normal" && current && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-[var(--radius-full)] border border-[#2c2b27] bg-[#151513] py-1.5 pr-1.5 pl-4 text-sm text-[#f2f0ea] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]">
          <span>
            <span className="sr-only">The site is now shown in </span>
            <span aria-hidden="true" className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[#9c998f] uppercase">
              Viewing ·{" "}
            </span>
            {current.short}
          </span>
          <button
            type="button"
            onClick={() => setVision("normal")}
            className="rounded-[var(--radius-full)] bg-[#f2f0ea] px-3 py-1 text-[0.8125rem] font-medium text-[#151513] transition-opacity duration-[var(--duration-fast)] hover:opacity-85"
          >
            Back to full color
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Review-page helper: the two motion speeds side by side.
 *
 * The story meter uses the story timing (rise over 1.2 s, break in
 * 140 ms) and is only ever meant for moments that carry the research
 * finding. The interface swatch uses the everyday 200 ms response.
 * Both read their timing from the CSS tokens, so this demo shows the
 * real values, not copies of them.
 */
export function SpeedDemo() {
  const [level, setLevel] = useState(0.15);
  const [rising, setRising] = useState(true);
  const [toggled, setToggled] = useState(false);

  function earn() {
    setRising(true);
    setLevel((value) => Math.min(1, value + 0.3));
  }

  function breakIt() {
    setRising(false);
    setLevel(0.15);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
          Story speed · rise 1.2 s, break 140 ms
        </p>
        <div
          className="mt-5 h-3 w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-bg-subtle)]"
          role="meter"
          aria-label="Trust"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(level * 100)}
        >
          <div
            className="h-full origin-left rounded-[var(--radius-full)] bg-[var(--color-text)]"
            style={{
              transform: `scaleX(${level})`,
              transitionProperty: "transform",
              transitionDuration: rising ? "var(--duration-rise)" : "var(--duration-break)",
              transitionTimingFunction: rising ? "var(--ease-rise)" : "var(--ease-exit)",
            }}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button size="sm" withArrow={false} onClick={earn}>
            Earn trust
          </Button>
          <Button size="sm" variant="secondary" onClick={breakIt}>
            Break it
          </Button>
        </div>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
          Interface speed · 150 to 300 ms
        </p>
        <button
          type="button"
          aria-pressed={toggled}
          onClick={() => setToggled((value) => !value)}
          className="mt-5 flex h-9 w-16 items-center rounded-[var(--radius-full)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-1"
        >
          <span className="sr-only">Example toggle</span>
          <span
            aria-hidden="true"
            className="h-7 w-7 rounded-[var(--radius-full)] bg-[var(--color-text)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]"
            style={{ transform: toggled ? "translateX(1.75rem)" : "none" }}
          />
        </button>
        <p className="mt-5 text-sm text-[var(--color-text-muted)]">
          Everyday responses never wait. Slow motion is kept for the finding itself, so it
          stays meaningful.
        </p>
      </div>
    </div>
  );
}

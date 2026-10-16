"use client";

import { setMotionPreference, useAmbientMotion } from "@/lib/motion-preference";
import { cn } from "@/lib/utils";

/** Pauses or resumes every looping film on the site (see
 * lib/motion-preference.ts). */
export function MotionToggle({ className }: { className?: string }) {
  const playing = useAmbientMotion();

  return (
    <button
      type="button"
      onClick={() => setMotionPreference(playing ? "off" : "on")}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border-strong)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]",
        className,
      )}
    >
      {playing ? (
        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
          <path fill="currentColor" d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
          <path fill="currentColor" d="M4 2.5a1 1 0 0 1 1.53-.85l8 5.5a1 1 0 0 1 0 1.7l-8 5.5A1 1 0 0 1 4 13.5v-11Z" />
        </svg>
      )}
      {playing ? "Pause motion" : "Play motion"}
    </button>
  );
}

"use client";

import { useRef, useState } from "react";

interface ControlledMediaProps {
  src: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="ml-0.5 h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M4 2.5a1 1 0 0 1 1.53-.85l8 5.5a1 1 0 0 1 0 1.7l-8 5.5A1 1 0 0 1 4 13.5v-11Z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 2a6 6 0 1 1-5.66 8H4.5a4.5 4.5 0 1 0 1.06-4.69L7 6.75H2.25V2l1.84 1.84A5.98 5.98 0 0 1 8 2Z"
      />
    </svg>
  );
}

/**
 * Click-to-play media: a static poster until the reader deliberately
 * starts it, plays once through, no loop, muted (there's no audio to
 * begin with), with a replay affordance once it ends. Never autoplays,
 * on scroll or otherwise -- consistent with the site-wide rule that no
 * motion should delay access to real content, and with this asset's own
 * decision that a reader opts in rather than has it played at them.
 *
 * A native <video> can't reliably announce its content to every screen
 * reader from a bare aria-label, so the caption below is real, visible
 * text, not decoration -- the surrounding case-study paragraph already
 * describes the interaction in words, this reinforces it rather than
 * being the only place the information lives.
 */
export function ControlledMedia({ src, poster, width, height, alt, caption }: ControlledMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "ended">("idle");

  function play() {
    videoRef.current?.play();
    setState("playing");
  }

  function replay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setState("playing");
  }

  return (
    <figure className="mx-auto max-w-full">
      <div
        className="relative mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{ aspectRatio: `${width} / ${height}`, maxWidth: width }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="none"
          loop={false}
          autoPlay={false}
          onEnded={() => setState("ended")}
          className="h-full w-full object-cover"
        />
        {state !== "playing" && (
          <button
            type="button"
            onClick={state === "ended" ? replay : play}
            aria-label={state === "ended" ? "Replay" : "Play"}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-black/25"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg)]/95 text-[var(--color-text)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              {state === "ended" ? <ReplayIcon /> : <PlayIcon />}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
        {caption ?? alt}
      </figcaption>
    </figure>
  );
}

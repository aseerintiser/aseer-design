"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { posterFor } from "@/lib/media";

interface LoopVideoProps {
  src: string;
  /** Defaults to the same-named .webp next to the loop (public/loops/). */
  poster?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /**
   * "auto": plays while at least 40% visible and shows a pause button,
   * for loops inside case studies (WCAG 2.2.2: anything that moves for
   * more than five seconds needs a way to stop it).
   * "controlled": the parent decides through `playing`, for project
   * cards, which play on hover or focus (or when centred on a phone)
   * and stop as soon as attention moves on.
   */
  mode?: "auto" | "controlled";
  playing?: boolean;
  /** Where the pause button sits; "top-right" for loops whose bottom
   * edge is cropped (a stage window rising from the bottom). */
  controlsPosition?: "bottom-left" | "top-right";
}

/**
 * A muted, looping product clip that behaves like a considerate GIF:
 * nothing downloads until it is needed (poster first, preload="none"),
 * it only plays while someone can see it, and with reduced motion on it
 * stays on its poster frame unless the visitor presses play.
 */
export function LoopVideo({
  src,
  poster,
  alt,
  width,
  height,
  className,
  mode = "auto",
  playing = false,
  controlsPosition = "bottom-left",
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  // null = the visitor has not chosen; true/false = their explicit choice,
  // which always wins over the automatic behaviour.
  const [userWantsPlay, setUserWantsPlay] = useState<boolean | null>(null);
  // What the video is actually doing, which can differ from what was
  // asked (the browser may refuse to autoplay). The button reflects this.
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (mode !== "auto") return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.4,
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [mode]);

  const shouldPlay =
    mode === "controlled"
      ? playing && !shouldReduceMotion
      : inView && (userWantsPlay ?? !shouldReduceMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      // play() rejects when the browser blocks autoplay (Low Power Mode,
      // data saver). The poster stays up, which is the right fallback.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  return (
    <div className={cn("relative", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster ?? posterFor(src)}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="block h-full w-full object-cover object-top"
      />
      {mode === "auto" && (
        <button
          type="button"
          onClick={() => {
            if (isPlaying) {
              setUserWantsPlay(false);
            } else {
              setUserWantsPlay(true);
              // Called from the click itself, so it also works where the
              // browser blocked the automatic start.
              videoRef.current?.play().catch(() => {});
            }
          }}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
          className={cn(
            "absolute flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] bg-black/60 text-white backdrop-blur-sm transition-colors duration-[var(--duration-fast)] hover:bg-black/80",
            controlsPosition === "top-right" ? "top-3 right-3" : "bottom-3 left-3",
          )}
        >
          {isPlaying ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path fill="currentColor" d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 2.5a1 1 0 0 1 1.53-.85l8 5.5a1 1 0 0 1 0 1.7l-8 5.5A1 1 0 0 1 4 13.5v-11Z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

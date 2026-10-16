"use client";

import { useEffect, useRef, useState } from "react";
import { useAmbientMotion } from "@/lib/motion-preference";
import { posterFor } from "@/lib/media";
import { cn } from "@/lib/utils";

interface LoopVideoProps {
  src: string;
  /** Defaults to the same-named .webp next to the loop. */
  poster?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * A muted, looping project film that behaves like a GIF: it plays on its
 * own whenever it is on screen, with no buttons on it, so every project
 * can be taken in at a glance.
 *
 * It is still considerate. Nothing but the poster loads until the film
 * scrolls into view, it pauses off screen, and the site-wide motion
 * switch in the footer (or the system's reduced-motion setting) leaves
 * every film on its poster frame.
 */
export function LoopVideo({ src, poster, alt, width, height, className }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const motion = useAmbientMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.2,
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = inView && motion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // play() rejects when the browser blocks autoplay (Low Power Mode,
    // data saver). The poster stays up, which is the right fallback.
    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  }, [shouldPlay]);

  return (
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
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}

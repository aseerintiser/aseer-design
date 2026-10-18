"use client";

import { useEffect, useRef, useState } from "react";
import { useAmbientMotion } from "@/lib/motion-preference";

interface FilmTeaserProps {
  src: string;
  poster: string;
  /** What the teaser shows, for screen readers. */
  label: string;
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 7.5h3l4-3.5v12l-4-3.5h-3z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M13.5 7.2a4 4 0 0 1 0 5.6" />
          <path d="M15.6 5a7 7 0 0 1 0 10" />
        </>
      ) : (
        <path d="M13.5 7.5l5 5m0-5l-5 5" />
      )}
    </svg>
  );
}

/**
 * The Bohrscope teaser on About: Aseer's own 10-second cut, with his
 * sound. Like the project films it plays muted on its own while it is on
 * screen, and the footer motion switch or reduced motion leaves it on its
 * poster. Sound is only ever turned on by the visitor, and turning it on
 * restarts the teaser so it is heard from the beginning. It pauses off
 * screen, sound or not.
 */
export function FilmTeaser({ src, poster, label }: FilmTeaserProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambient = useAmbientMotion();
  const [inView, setInView] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // With sound on, the visitor chose to watch, so it plays even when
  // ambient motion is off.
  const shouldPlay = inView && (ambient || sound);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  }, [shouldPlay]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !sound;
    video.muted = !next;
    if (next) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    setSound(next);
  };

  return (
    <figure className="relative m-0 overflow-hidden rounded-[var(--radius-lg)] bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={1600}
        height={900}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="block aspect-video h-auto w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-3 bg-gradient-to-t from-black/75 to-transparent px-3 pt-10 pb-3 sm:px-4">
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-2 rounded-[var(--radius-full)] bg-black/40 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-colors duration-[var(--duration-fast)] hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
        >
          <SpeakerIcon on={sound} />
          {sound ? "Sound off" : "Sound on"}
        </button>
      </div>
    </figure>
  );
}

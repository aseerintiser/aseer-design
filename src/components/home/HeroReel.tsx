"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAmbientMotion } from "@/lib/motion-preference";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export interface ReelItem {
  slug: string;
  href: string;
  tab: string;
  title: string;
  meta: string;
  tint: string;
  src: string;
  poster: string;
  alt: string;
}

/** Seconds each film plays before the reel moves on. The card films run
 * 8 to 14 seconds; their strongest scenes come first. */
const DWELL = 7;

/**
 * The homepage hook: a reel of Aseer's best work, chosen in
 * content/home.ts (heroReel). Each project plays its own card film, the
 * same file its card uses, so the hero is current whenever a film is.
 *
 * The reel plays on its own, like a GIF, only while it is on screen; the
 * footer's motion switch or the reduced-motion setting leaves it on the
 * current project's poster, and the tabs still switch projects (WCAG
 * 2.2.2). The film is the link to the case study it shows.
 */
export function HeroReel({ intro, items }: { intro: ReactNode; items: ReelItem[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const motion = useAmbientMotion();

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(true);
  const [shown, setShown] = useState(true);

  const item = items[index] ?? items[0];
  const shouldPlay = inView && motion;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.25,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Play or hold whenever the project, visibility or motion setting changes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  }, [shouldPlay, index]);

  function go(next: number) {
    const target = ((next % items.length) + items.length) % items.length;
    setProgress(0);
    if (target === index) {
      const video = videoRef.current;
      if (video) video.currentTime = 0;
      return;
    }
    // A short fade over the chapter ground hides the swap.
    setShown(false);
    window.setTimeout(() => {
      setIndex(target);
      setShown(true);
    }, 180);
  }

  const stageStyle = useMemo(() => ({ "--stage-tint": item?.tint }) as CSSProperties, [item?.tint]);
  if (!item) return null;

  return (
    <div ref={rootRef} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">{intro}</div>

      <div className="lg:col-span-5">
        <figure className="m-0">
          <Link
            href={item.href}
            aria-label={`Open the ${item.title} case study`}
            className="group block overflow-hidden rounded-[var(--radius-lg)]"
          >
            <div className="stage stage-animated relative isolate aspect-[4/3] w-full overflow-hidden" style={stageStyle}>
              {/* The first frame as an optimized, screen-sized image (the
                  largest thing on the first screen), with the film on top
                  once it plays. */}
              <Image
                key={item.poster}
                src={item.poster}
                alt=""
                fill
                preload={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 38vw, 92vw"
                className={cn(
                  "object-cover transition-[opacity,scale] duration-[var(--duration-slow)] ease-[var(--ease-entrance)] group-hover:scale-[1.025]",
                  shown ? "opacity-100" : "opacity-0",
                )}
              />
              <video
                ref={videoRef}
                key={item.src}
                src={item.src}
                width={960}
                height={720}
                muted
                playsInline
                preload="metadata"
                aria-label={item.alt}
                onTimeUpdate={(event) => {
                  const time = event.currentTarget.currentTime;
                  if (time >= DWELL) go(index + 1);
                  else setProgress(time / DWELL);
                }}
                onEnded={() => go(index + 1)}
                className={cn(
                  "absolute inset-0 block h-full w-full object-cover transition-[opacity,scale] duration-[var(--duration-slow)] ease-[var(--ease-entrance)] group-hover:scale-[1.025]",
                  shown ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          </Link>

          {/* One tab per project; the active one fills as its film plays. */}
          <ol className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }} aria-label="Selected work">
            {items.map((entry, i) => {
              const active = i === index;
              return (
                <li key={entry.slug}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active ? "true" : undefined}
                    aria-label={`Show ${entry.title}`}
                    className="group/tab block w-full rounded-[var(--radius-sm)] pt-1 pb-1.5 text-left"
                  >
                    <span aria-hidden="true" className="relative block h-[2px] overflow-hidden rounded-full bg-[var(--color-border-strong)]">
                      <span
                        className="absolute inset-y-0 left-0 bg-[var(--color-signal)] transition-[width] duration-300 ease-linear"
                        style={{ width: active ? `${motion ? progress * 100 : 100}%` : "0%" }}
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-2 block text-xs leading-snug transition-colors duration-[var(--duration-base)]",
                        active ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover/tab:text-[var(--color-text)]",
                      )}
                    >
                      {entry.tab}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Not a live region: the reel moves on every few seconds, and
              announcing each project would talk over the page. */}
          <figcaption className="mt-4">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
              Now showing
            </p>
            <Link href={item.href} className="group mt-1 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl">
              <span className="link-ink no-underline">{item.title}</span>
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{item.meta}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Stage, type StageMedia } from "@/components/ui/Stage";
import type { Chapter } from "@/content/chapters";
import { cn } from "@/lib/utils";

interface HoverStageProps {
  href: string;
  label: string;
  chapter: Chapter;
  media: StageMedia;
  shape?: "standard" | "wide";
  sizes?: string;
  className?: string;
}

/**
 * A stage that is also the link to its case study. Same rule as the
 * project cards: the loop plays on hover or keyboard focus, or while it
 * sits in the middle of the screen on a touch device, and stops when
 * attention moves on.
 */
export function HoverStage({ href, label, chapter, media, shape, sizes, className }: HoverStageProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [centred, setCentred] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setCentred(Boolean(entry?.isIntersecting)), {
      rootMargin: "-35% 0px -35% 0px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "group block overflow-hidden rounded-[var(--radius-lg)] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-shadow duration-[var(--duration-slow)] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <Stage
        chapter={chapter}
        media={media}
        playing={hovering || focused || centred}
        shape={shape}
        sizes={sizes}
      />
    </Link>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { isVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

interface ImageRowProps {
  images: { src: string; width: number; height: number; alt: string }[];
  enlargeable?: boolean;
}

/** Phone screens never render narrower than this (plan: no screen under
 * 240 px), and very tall screenshots are cropped from the top, with the
 * full screen one click away. */
const PORTRAIT_WIDTH = 260;
const PORTRAIT_MAX_HEIGHT = 560;
const LANDSCAPE_HEIGHT = 340;

function tileSize(width: number, height: number) {
  const ratio = width / height;
  if (ratio < 0.75) {
    return { width: PORTRAIT_WIDTH, height: Math.min(Math.round(PORTRAIT_WIDTH / ratio), PORTRAIT_MAX_HEIGHT) };
  }
  return { width: Math.min(Math.round(LANDSCAPE_HEIGHT * ratio), 720), height: LANDSCAPE_HEIGHT };
}

/**
 * A flow strip (Phase 3): a row of screens you swipe or scroll through,
 * in place of the old wrapping grid. Screens stay large enough to judge
 * (phones at 260 px wide instead of 132 px), the page gets much shorter,
 * and every still opens full size in the lightbox, which steps through
 * the strip. On a mouse, arrow buttons scroll it a screen at a time.
 */
export function ImageRow({ images, enlargeable = true }: ImageRowProps) {
  const { open } = useLightbox();
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  // The lightbox only steps through stills; loops play in place.
  const stills = images.filter((image) => !isVideo(image.src));

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    function update() {
      setCanScroll({
        left: strip!.scrollLeft > 4,
        right: strip!.scrollLeft + strip!.clientWidth < strip!.scrollWidth - 4,
      });
    }
    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollBy(direction: 1 | -1) {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: "smooth" });
  }

  const overflowing = canScroll.left || canScroll.right;

  return (
    <div className="relative mt-8">
      <div
        ref={stripRef}
        className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-3 [scrollbar-width:thin] print:flex-wrap print:overflow-visible"
        style={{ justifyContent: "safe center" }}
        role="group"
        aria-label={`${images.length} screens. Scroll sideways to see them all.`}
        tabIndex={overflowing ? 0 : -1}
      >
        {images.map((image, index) => {
          const size = tileSize(image.width, image.height);
          const tileClass =
            "shrink-0 snap-start overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]";

          if (isVideo(image.src)) {
            const width = Math.round(size.height * (image.width / image.height));
            return (
              <div key={`${image.src}-${index}`} className={tileClass} style={{ width, height: size.height }}>
                <LoopVideo src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-full w-full" />
              </div>
            );
          }

          const picture = (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes={`${size.width}px`}
              quality={90}
              className={cn(
                "h-full w-full object-cover object-top",
                enlargeable && "transition-opacity duration-[var(--duration-base)] group-hover:opacity-90",
              )}
            />
          );

          return (
            <div key={`${image.src}-${index}`} className={tileClass} style={size}>
              {enlargeable ? (
                <button
                  type="button"
                  onClick={() => open(stills, stills.indexOf(image))}
                  aria-label={`View larger${image.alt ? `: ${image.alt}` : `, screen ${index + 1} of ${images.length}`}`}
                  className="group relative block h-full w-full cursor-zoom-in"
                >
                  {picture}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <ExpandIcon className="h-5 w-5 text-white" />
                  </span>
                </button>
              ) : (
                picture
              )}
            </div>
          );
        })}
      </div>

      {overflowing && (
        <div className="mt-2 hidden items-center justify-end gap-2 md:flex print:hidden">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScroll.left}
            aria-label="Scroll screens left"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-border-strong)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] disabled:opacity-35"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScroll.right}
            aria-label="Scroll screens right"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-border-strong)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] disabled:opacity-35"
          >
            <ArrowIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";
import { cn } from "@/lib/utils";

interface CaseStudyImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Defaults to true -- see the `enlargeable` note on the "image" block
   * in content/types.ts. */
  enlargeable?: boolean;
}

// Media Experience milestone: previously always `w-full`, so every
// image -- including narrow, tall phone-mockup screenshots -- stretched
// to fill the full ~800px reading column regardless of its own native
// resolution. That both reduced legibility (a phone screen rendered
// nearly life-size-of-a-tablet reads worse, not better) and upscaled
// past the source image's real pixel width, the actual cause of
// visible softness/pixelation, not a compression setting. The fix
// applies to every CaseStudyImage, not just visibly "mobile" ones:
// never render wider than the image's own native width, and cap
// portrait (taller-than-4:3) images -- the shape phone mockups and
// vertical flows share -- to a tighter width so they read at a
// legible, roughly on-screen size instead of ballooning to match
// whatever landscape screenshots sit elsewhere in the same case study.
const LANDSCAPE_MAX = 800;
const PORTRAIT_MAX = 420;

export function CaseStudyImage({
  src,
  width,
  height,
  alt,
  caption,
  enlargeable = true,
}: CaseStudyImageProps) {
  const { open } = useLightbox();
  const isPortrait = width / height < 0.75;
  const cappedWidth = Math.min(width, isPortrait ? PORTRAIT_MAX : LANDSCAPE_MAX);

  const image = (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={cn(
        "h-auto w-full",
        enlargeable &&
          "transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90",
      )}
      sizes={
        isPortrait
          ? `${cappedWidth}px`
          : `(min-width: 1024px) ${cappedWidth}px, 100vw`
      }
      unoptimized={src.endsWith(".gif")}
      quality={90}
    />
  );

  return (
    <figure className="mx-auto max-w-full">
      <div
        className="mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{ maxWidth: cappedWidth }}
      >
        {enlargeable ? (
          <button
            type="button"
            onClick={() => open([{ src, width, height, alt }], 0)}
            aria-label={`View larger: ${alt}`}
            className="group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]"
          >
            {image}
            {/* See ImageRow.tsx for why this exists alongside the
                existing opacity dim rather than replacing it. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <ExpandIcon className="h-5 w-5 text-white" />
            </span>
          </button>
        ) : (
          image
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

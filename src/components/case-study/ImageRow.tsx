"use client";

import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

interface ImageRowProps {
  images: { src: string; width: number; height: number; alt: string }[];
  /** Defaults to true -- see the `enlargeable` note on the "imageRow"
   * block in content/types.ts. Clicking any tile opens the whole row as
   * one browsable group (Left/Right, swipe on mobile), not just the
   * single tile clicked. */
  enlargeable?: boolean;
}

/**
 * Side-by-side screenshot gallery (Milestone 2 migration) -- the live
 * site frequently shows a run of related screens together (e.g. every
 * screen in a flow) rather than one at a time. Wraps responsively.
 *
 * Visual Polish milestone: previously each tile's max-width was derived
 * from the *source* image's own pixel width (`image.width * 0.45`).
 * That looked fine when every image in a row happened to share both
 * dimensions, but several migrated rows mix portrait phone screenshots
 * of the same width but different heights (750x1624 next to 750x2220),
 * or a landscape overview GIF alongside portrait detail shots -- since
 * width was capped but height followed from each image's own aspect
 * ratio, tiles in the same row ended up wildly different heights (a
 * 750-wide, 2220-tall shot rendered nearly 1000px tall next to
 * neighbors under half that), and a full row of phone screenshots could
 * run to several thousand vertical pixels for a single gallery beat.
 *
 * Fixed-height, auto-width tiles (a standard "justified gallery" row)
 * fix this the same way a real photo gallery would: every image in the
 * row shares one height, so a row's total height is bounded and
 * predictable regardless of how many images it holds or what aspect
 * ratio each one is, and mismatched source resolutions can no longer
 * throw two same-purpose screenshots out of proportion with each
 * other.
 *
 * Media Experience milestone: each tile now opens the shared Lightbox
 * as a browsable group -- clicking any image in the row lets a visitor
 * step through the whole row with Left/Right or a swipe, rather than
 * only ever seeing one enlarged image with no way to see its neighbors
 * at full size too.
 */
export function ImageRow({ images, enlargeable = true }: ImageRowProps) {
  const { open } = useLightbox();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image, index) => {
        const tile = (
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            className={cn(
              "h-full w-auto max-w-full object-cover",
              enlargeable &&
                "transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90",
            )}
            // A fixed-height tile's rendered width follows from each
            // image's own aspect ratio, not the viewport, so a vw-based
            // hint (the old 45vw, sized for the previous width-scaled
            // layout) no longer matches what's actually on screen -- most
            // tiles here are portrait phone shots rendering well under
            // 200px wide. These caps are the worst case at each height
            // tier (h-56/64/72) for the widest image likely in a row (a
            // ~4:3 landscape overview shot), so next/image never
            // undersizes the rare wide tile while not over-fetching for
            // the common narrow ones.
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 340px, 300px"
            unoptimized={image.src.endsWith(".gif")}
            quality={90}
          />
        );

        return (
          <div
            key={`${image.src}-${index}`}
            className="h-56 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] sm:h-64 lg:h-72"
          >
            {enlargeable ? (
              <button
                type="button"
                onClick={() => open(images, index)}
                aria-label={`View larger: ${image.alt}`}
                className="group block h-full cursor-zoom-in"
              >
                {tile}
              </button>
            ) : (
              tile
            )}
          </div>
        );
      })}
    </div>
  );
}

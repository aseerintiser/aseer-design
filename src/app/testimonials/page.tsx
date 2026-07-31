"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { useLightbox } from "@/components/ui/Lightbox";
import { testimonialsHeading, testimonialImages, testimonialImageUrl } from "@/content/testimonials";

/**
 * Milestone 2: new page, migrated from the live aseer.design
 * /testimonials page (didn't exist in this project before).
 *
 * Media Experience milestone: these are screenshots of real written
 * recommendations -- the whole point is the text inside them, which is
 * easy to misjudge as "not needing enlarging" but is exactly the kind
 * of content a visitor reasonably wants to read at full size rather
 * than squint at in a half-width grid tile. Wired into the same shared
 * Lightbox every case-study image uses (real width/height already
 * known per image -- see content/testimonials.ts -- so no dimensions
 * need to be guessed), as one browsable group so a visitor who opens
 * one can step through all five with Left/Right or a swipe.
 */
export default function TestimonialsPage() {
  const { open } = useLightbox();
  const images = testimonialImages.map((image) => ({
    src: testimonialImageUrl(image.id),
    width: image.width,
    height: image.height,
    alt: "Testimonial",
  }));

  return (
    <Section density="open">
      <Heading level={1}>{testimonialsHeading}</Heading>
      {/* Visual Polish milestone: 5 images in a 2-column grid leaves the
          last one pinned to the left with an empty gap beside it --
          `last:sm:col-span-2` spans it across the full row instead, and
          the max-width/mx-auto keep it the same size as its siblings
          rather than stretching, so it just centers in its own row.

          Visual QA milestone: `items-start` instead of the grid default
          (stretch) so each row's two tiles can have different heights --
          each screenshot now uses its own real width/height (see
          content/testimonials.ts) instead of being forced into a fixed
          aspect-ratio box, so a short recommendation and a long one
          sitting side by side no longer letterboxes the short one with
          dead space to match its taller neighbor. */}
      <div className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
        {testimonialImages.map((image, index) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] last:sm:col-span-2 last:sm:mx-auto last:sm:w-1/2"
          >
            <button
              type="button"
              onClick={() => open(images, index)}
              aria-label={`View larger: testimonial ${index + 1}`}
              className="group block w-full cursor-zoom-in"
            >
              <Image
                src={testimonialImageUrl(image.id)}
                width={image.width}
                height={image.height}
                alt={`Testimonial ${index + 1}`}
                className="h-auto w-full transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90"
                sizes="(min-width: 640px) 50vw, 100vw"
                quality={90}
              />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

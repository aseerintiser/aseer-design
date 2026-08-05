"use client";

import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";

interface PhaseImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

interface PhaseFilmstripProps {
  label: string;
  intro: string;
  images: PhaseImage[];
}

/**
 * One phase of "The Flow, Screen by Screen" (Convay AI for Physical
 * Meetings rebuild). Replaces the live page's thirteen-screen linear
 * stack, presented one at a time, full-width, roughly 8,000-9,000
 * vertical pixels total (01_Audit.md) -- the single biggest scroll-
 * fatigue problem in the whole portfolio. Grouping into four phases
 * (Setup, Record, Process, Export & Edit), each a compact filmstrip
 * instead of a full-bleed card, is the fix: the same thirteen screens,
 * none cut, in roughly a third of the scroll distance, and at a size
 * where a reader can see at a glance which screens are variations on
 * the same base screenshot instead of re-scanning each one as if it
 * were new (04_Visual_Specification.md).
 *
 * Reuses the exact gallery card pattern already used elsewhere in this
 * portfolio's case studies (h-56/64/72, --radius-lg, --color-border,
 * flex-wrap), the same hover/focus scrim as ImageRow/CaseStudyImage, and
 * the same lightbox. Passing only this phase's own images to `open()`
 * keeps next/previous navigation scoped to the phase the reader opened
 * rather than silently crossing into an unrelated group
 * (05_Interaction_and_Motion.md).
 */
export function PhaseFilmstrip({ label, intro, images }: PhaseFilmstripProps) {
  const { open } = useLightbox();

  return (
    <div className="mt-10 first:mt-6">
      <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h4)] text-[var(--color-text)]">
        {label}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{intro}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-4">
        {images.map((image, index) => (
          <div key={image.src + index} className="w-40 sm:w-48 lg:w-56">
            <button
              type="button"
              onClick={() => open(images, index)}
              aria-label={`View larger: ${image.alt}`}
              className="group relative block h-56 w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)] sm:h-64 lg:h-72"
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className="h-full w-full object-cover transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90"
                sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 160px"
                quality={90}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ExpandIcon className="h-5 w-5 text-white" />
              </span>
            </button>
            <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

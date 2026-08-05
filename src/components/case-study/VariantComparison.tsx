"use client";

import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";

interface Variant {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

interface VariantComparisonProps {
  label?: string;
  variants: Variant[];
}

/**
 * True side-by-side A/B comparison (Convay AI for Physical Meetings
 * rebuild, 04_Visual_Specification.md and 05_Interaction_and_Motion.md).
 * Replaces the live page's two Meeting Panel screenshots, previously
 * stacked roughly thirty screen-heights apart -- the one genuine
 * comparative finding in the whole case study, now actually presented as
 * a comparison instead of two separate write-ups.
 *
 * Deliberately does not reveal which variant won: per 03_Content_Final.md,
 * that result (82% preferred dark) is revealed with its number in
 * Challenges and Solutions, not pre-announced here. An optional small
 * "A / B" label signals this is a test without hinting at the outcome.
 *
 * No slider or toggle: unlike a true before/after where only one state
 * is "correct," both of these were real candidates, so showing both at
 * once is more honest than a toggle that hides one behind the other
 * (05_Interaction_and_Motion.md). Clicking either image opens the
 * lightbox scoped to just this pair, so Left/Right navigation stays
 * within the comparison rather than jumping into an unrelated gallery.
 */
export function VariantComparison({ label, variants }: VariantComparisonProps) {
  const { open } = useLightbox();

  return (
    <div className="mt-6">
      {label && (
        <p className="mb-3 text-center text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
          {label}
        </p>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {variants.map((variant, index) => (
          <figure key={variant.src} className="mx-auto w-full max-w-md">
            <button
              type="button"
              onClick={() => open(variants, index)}
              aria-label={`View larger: ${variant.alt}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]"
            >
              <Image
                src={variant.src}
                width={variant.width}
                height={variant.height}
                alt={variant.alt}
                className="h-auto w-full transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90"
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
                quality={90}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ExpandIcon className="h-5 w-5 text-white" />
              </span>
            </button>
            <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
              {variant.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

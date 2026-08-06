"use client";

import Image from "next/image";
import { useLightbox, type LightboxImage } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";
import { Heading } from "@/components/ui/Heading";

interface ConceptTileProps {
  title: string;
  description: string;
  image: LightboxImage & { width: number; height: number };
  /** The full set of four concept images, so the lightbox opens as one
   * browsable group (Left/Right, swipe) -- matches the pattern already
   * used for Certifications and case-study image rows, rather than each
   * tile only ever showing itself enlarged with no way to see its
   * neighbors at full size. */
  group: LightboxImage[];
  index: number;
}

/**
 * One concept tile in the "A Few Concept Explorations" grid. Previously
 * a plain, non-interactive `next/image` -- fixed to match every other
 * image on the site (Certifications, case studies), which all open the
 * shared Lightbox on click. Same hover/focus affordance as those: a
 * scrim plus a centered expand icon on hover and keyboard focus, not
 * just a subtle opacity dim that's easy to miss.
 */
export function ConceptTile({ title, description, image, group, index }: ConceptTileProps) {
  const { open } = useLightbox();

  return (
    <div>
      <button
        type="button"
        onClick={() => open(group, index)}
        aria-label={`View larger: ${image.alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]"
      >
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          className="h-auto w-full transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-90"
          sizes="(min-width: 640px) 50vw, 100vw"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ExpandIcon className="h-5 w-5 text-white" />
        </span>
      </button>
      <Heading level={3} className="mt-4">
        {title}
      </Heading>
      <p className="mt-1 text-[var(--color-text-muted)]">{description}</p>
    </div>
  );
}

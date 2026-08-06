"use client";

import Image from "next/image";
import { useLightbox } from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/ExpandIcon";
import { certificationImageUrl } from "@/content/certifications";
import { cn } from "@/lib/utils";

interface CertificateImage {
  id: string;
  alt: string;
}

interface CertificateTileProps {
  image: CertificateImage;
  /** The full group this tile belongs to, so the lightbox opens scoped
   * to just that group -- browsing Google's ten certificates never
   * jumps into Meta's, and vice versa. */
  group: CertificateImage[];
  index: number;
  /** "large" for a group with only one or two certificates, where a
   * small filmstrip-sized tile would look lonely against a lot of
   * empty space. Defaults to the standard grid size. */
  size?: "default" | "large";
}

/**
 * One certificate, everywhere it appears on the page (a provider's
 * collection or the archive). No known width/height for these images
 * (see content/certifications.ts), so a fixed aspect-ratio box with
 * `object-contain` is used rather than a guessed intrinsic size -- the
 * full certificate always shows, never cropped, letterboxed instead
 * when its real proportions don't match the box.
 *
 * Visual fix: an earlier version capped the default tile at 220px wide
 * and let the grid it sat in run up to four columns, which meant a
 * certificate, a document with real text on it, rendered too small to
 * actually read without opening the lightbox. Confirmed from a
 * rendered screenshot in chat. There's no width cap here anymore --
 * the tile fills whatever column its parent grid gives it, and the two
 * grids that use "default" size (CertificationCollection,
 * CertificationArchive) were both widened to two-to-three columns
 * instead of three-to-six, so that column is actually wide enough to
 * read from.
 *
 * The hover/focus affordance (scrim, expand icon, and a small lift on
 * hover) matches the pattern already established elsewhere on this
 * site (PhaseFilmstrip, ImageRow, CaseStudyImage): a real, deliberate
 * cue that this opens, not decoration.
 */
export function CertificateTile({ image, group, index, size = "default" }: CertificateTileProps) {
  const { open } = useLightbox();
  const isLarge = size === "large";

  return (
    <button
      type="button"
      onClick={() => open(group.map((item) => ({ src: certificationImageUrl(item.id), alt: item.alt })), index)}
      aria-label={`View larger: ${image.alt}`}
      className={cn(
        "group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--color-border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)]",
        isLarge && "max-w-md",
      )}
    >
      <Image
        src={certificationImageUrl(image.id)}
        alt={image.alt}
        fill
        className="object-contain p-3 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-85"
        sizes={isLarge ? "(min-width: 640px) 448px, 90vw" : "(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"}
        quality={90}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <ExpandIcon className="h-5 w-5 text-white drop-shadow" />
      </span>
    </button>
  );
}

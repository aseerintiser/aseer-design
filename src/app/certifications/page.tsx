"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { useLightbox } from "@/components/ui/Lightbox";
import { certificationSections, certificationImageUrl } from "@/content/certifications";

/**
 * Milestone 2: new page, migrated from the live aseer.design
 * /certifications page (didn't exist in this project before). Almost
 * entirely images -- see content/certifications.ts for why they're
 * rendered with `fill` + object-contain rather than fixed dimensions.
 *
 * Media Experience milestone: these tiles are small (144-192px) and
 * several certificates have real, meaningful detail (issuer, date,
 * course name) that's genuinely illegible at that size -- exactly the
 * kind of "small preview, real content worth inspecting" case worth
 * wiring into the shared Lightbox, same as case-study screenshots.
 * Each section opens as its own browsable group (Left/Right or swipe
 * moves between certificates in that section, not the whole page's
 * worth at once). No known width/height for these images (see
 * content/certifications.ts), so the Lightbox's fill-based fallback
 * mode renders them -- consistent with this page's own existing
 * "don't invent dimensions" reasoning, not a new guess.
 */
export default function CertificationsPage() {
  const { open } = useLightbox();

  return (
    <Section density="open">
      <Heading level={1}>Certifications that shape my UX journey</Heading>

      <div className="mt-12 space-y-16">
        {certificationSections.map((section) => {
          const images = section.images.map((imageId) => ({
            src: certificationImageUrl(imageId),
            alt: section.heading,
          }));

          return (
            <div key={section.heading}>
              <Heading level={3}>{section.heading}</Heading>
              {/* Visual Polish milestone: several groups here have as few
                  as 1-2 images (Meta Certificate, IDF Membership, IDF
                  Courses, Achievements). The first attempt at this fix
                  kept percentage-based tile widths matching the old
                  grid's column fractions (e.g. 25% at lg) -- but that
                  just reproduces the exact same problem under flex-wrap:
                  a single tile still consumes 25% of the row and leaves
                  the other 75% blank, because the container itself still
                  spans the full available width either way. A *fixed*
                  pixel width is what actually fixes it -- a lone tile now
                  only takes up its own fixed size, so the row is exactly
                  as wide as its content, with no implied empty track
                  beside it. Multi-image groups still wrap into a clean
                  multi-column flow at roughly the same density as
                  before, just governed by "how many fixed-width tiles
                  fit" rather than a rigid, always-N-per-row grid. */}
              <div className="mt-6 flex flex-wrap gap-4">
                {section.images.map((imageId, index) => (
                  <button
                    key={imageId}
                    type="button"
                    onClick={() => open(images, index)}
                    aria-label={`View larger: ${section.heading} — item ${index + 1}`}
                    className="group relative aspect-[4/3] w-36 cursor-zoom-in overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] sm:w-40 lg:w-48"
                  >
                    <Image
                      src={certificationImageUrl(imageId)}
                      alt={`${section.heading} — item ${index + 1}`}
                      fill
                      className="object-contain p-2 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:opacity-80"
                      sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 144px"
                      quality={90}
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

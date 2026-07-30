import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { certificationSections, certificationImageUrl } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Certifications",
};

/**
 * Milestone 2: new page, migrated from the live aseer.design
 * /certifications page (didn't exist in this project before). Almost
 * entirely images -- see content/certifications.ts for why they're
 * rendered with `fill` + object-contain rather than fixed dimensions.
 */
export default function CertificationsPage() {
  return (
    <Section density="open">
      <Heading level={1}>Certifications that shape my UX journey</Heading>

      <div className="mt-12 space-y-16">
        {certificationSections.map((section) => (
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
                <div
                  key={imageId}
                  className="relative aspect-[4/3] w-36 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] sm:w-40 lg:w-48"
                >
                  <Image
                    src={certificationImageUrl(imageId)}
                    alt={`${section.heading} — item ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 144px"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

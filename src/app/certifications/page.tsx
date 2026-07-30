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
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {section.images.map((imageId, index) => (
                <div
                  key={imageId}
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]"
                >
                  <Image
                    src={certificationImageUrl(imageId)}
                    alt={`${section.heading} — item ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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

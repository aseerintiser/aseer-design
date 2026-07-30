import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { testimonialsHeading, testimonialImages, testimonialImageUrl } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
};

/**
 * Milestone 2: new page, migrated from the live aseer.design
 * /testimonials page (didn't exist in this project before).
 */
export default function TestimonialsPage() {
  return (
    <Section density="open">
      <Heading level={1}>{testimonialsHeading}</Heading>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {testimonialImages.map((imageId, index) => (
          <div
            key={imageId}
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]"
          >
            <Image
              src={testimonialImageUrl(imageId)}
              alt={`Testimonial ${index + 1}`}
              fill
              className="object-contain p-3"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

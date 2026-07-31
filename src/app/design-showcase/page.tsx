import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import {
  designShowcaseHeading,
  designShowcaseIntro,
  designShowcaseItems,
  designShowcasePrototypeUrl,
} from "@/content/design-showcase";

export const metadata: Metadata = {
  title: "Design Showcase",
};

/**
 * Design Showcase stopgap page -- see Design-Showcase-Proposal.md for
 * the full reasoning. This intentionally isn't a "Craft" page or a set
 * of case studies: it's four honestly-labeled concept explorations
 * (real Figma exports, resized for the web) in a simple grid, following
 * the same plain heading + image-grid pattern already used on the
 * Testimonials and Certifications pages, plus a closing link out to the
 * full interactive prototype for anyone who wants to click through all
 * four in order.
 */
export default function DesignShowcasePage() {
  return (
    <Section density="open">
      <Heading level={1}>{designShowcaseHeading}</Heading>
      <p className="mt-4 max-w-[60ch] text-[var(--color-text-muted)]">
        {designShowcaseIntro}
      </p>

      <div className="mt-12 grid grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2">
        {designShowcaseItems.map((item) => (
          <div key={item.id}>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt}
                className="h-auto w-full"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <Heading level={3} className="mt-4">
              {item.title}
            </Heading>
            <p className="mt-1 text-[var(--color-text-muted)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-16">
        <a
          href={designShowcasePrototypeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-[var(--color-accent)] underline underline-offset-4"
        >
          Explore the full interactive prototype in Figma ↗
        </a>
      </p>
    </Section>
  );
}

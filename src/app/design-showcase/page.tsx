import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ControlledMedia } from "@/components/case-study/ControlledMedia";
import {
  designShowcasePageHeading,
  designShowcasePageIntro,
  designShowcaseHeading,
  designShowcaseIntro,
  designShowcaseItems,
  designShowcasePrototypeUrl,
  designShowcaseBuildsHeading,
  designShowcaseBuildsIntro,
  zentype,
} from "@/content/design-showcase";

export const metadata: Metadata = {
  title: "Design Showcase",
};

/**
 * Design Showcase -- see content/design-showcase.ts for the full
 * reasoning behind the two-group structure below. Section-level
 * light/dark tone (the same pacing device used on the homepage and case
 * studies) does the work of separating "these are concept UIs" from
 * "this one is real" -- a visitor never has to hold both groups' very
 * different disclaimers in mind at once, because they're never on the
 * same colored band.
 */
export default function DesignShowcasePage() {
  return (
    <>
      <Section density="open" measure="narrow">
        <Reveal>
          <Heading level={1}>{designShowcasePageHeading}</Heading>
          <Text size="lead" muted className="mt-4 max-w-[var(--measure)]">
            {designShowcasePageIntro}
          </Text>
        </Reveal>
      </Section>

      <Section density="default">
        <Heading level={2} size={3}>
          {designShowcaseHeading}
        </Heading>
        <p className="mt-4 max-w-[60ch] text-[var(--color-text-muted)]">{designShowcaseIntro}</p>

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
              <p className="mt-1 text-[var(--color-text-muted)]">{item.description}</p>
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

      <Section density="default" tone="dark">
        <Reveal>
          <Heading level={2} size={3}>
            {designShowcaseBuildsHeading}
          </Heading>
          <p className="mt-4 max-w-[60ch] text-[var(--color-text-muted)]">
            {designShowcaseBuildsIntro}
          </p>

          <div className="mt-12 max-w-2xl">
            <Heading level={3}>{zentype.title}</Heading>
            <p className="mt-3 max-w-[60ch] text-[var(--color-text-muted)]">
              {zentype.description}
            </p>

            <div className="mt-8">
              <ControlledMedia
                src={zentype.video.src}
                poster={zentype.video.poster}
                width={zentype.video.width}
                height={zentype.video.height}
                alt={zentype.video.alt}
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <Image
                src={zentype.screenshot.src}
                width={zentype.screenshot.width}
                height={zentype.screenshot.height}
                alt={zentype.screenshot.alt}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 42rem, 100vw"
              />
            </div>

            <div className="mt-8">
              <Button href={zentype.liveUrl} target="_blank" rel="noreferrer">
                Try the live demo
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

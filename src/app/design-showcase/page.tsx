import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ControlledMedia } from "@/components/case-study/ControlledMedia";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { ConceptTile } from "@/components/design-showcase/ConceptTile";
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
 *
 * Visual Consistency fix: all three sections now use the same, default
 * (wide) Container measure -- matching Work and Research, the pages
 * Aseer pointed to as the reference. An earlier version gave the
 * page-level intro section `measure="narrow"`, which centers a much
 * narrower column on the page (the same device Certifications
 * deliberately uses for its own reasons) -- next to this page's other
 * two sections, which were never narrowed, that read as an
 * unintentional inconsistency, not a considered one.
 *
 * All images (the four concepts, and ZenType's screenshot) now open the
 * shared sitewide Lightbox on click, matching every other image gallery
 * on the site -- previously these were the one remaining set of
 * non-enlargeable images left over from this page's original,
 * lower-effort build.
 */
export default function DesignShowcasePage() {
  const conceptImages = designShowcaseItems.map((item) => item.image);

  return (
    <>
      <Section density="open">
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
          {designShowcaseItems.map((item, index) => (
            <ConceptTile
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              group={conceptImages}
              index={index}
            />
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

            <div className="mt-6">
              <CaseStudyImage
                src={zentype.screenshot.src}
                width={zentype.screenshot.width}
                height={zentype.screenshot.height}
                alt={zentype.screenshot.alt}
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

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ControlledMedia } from "@/components/case-study/ControlledMedia";
import { CaseStudyImage } from "@/components/case-study/CaseStudyImage";
import { ConceptTile } from "@/components/design-showcase/ConceptTile";
import {
  designShowcaseHeading,
  designShowcaseIntro,
  designShowcaseItems,
  designShowcasePrototypeUrl,
  designShowcaseBuildsHeading,
  zentype,
} from "@/content/design-showcase";

export const metadata: Metadata = {
  title: "Design Showcase",
};

/**
 * Design Showcase -- see content/design-showcase.ts for the full
 * reasoning behind the two-group structure below. Section-level
 * light/dark tone (the same pacing device used on the homepage and case
 * studies) separates "these are concept UIs" from "this one is real."
 *
 * Space fix: an earlier version added a separate page-level H1 +
 * intro Section above both groups. Removed as unnecessary weight --
 * "A Few Concept Explorations" is back to being the page's own H1,
 * same as before ZenType existed, and the page now opens directly
 * instead of introducing itself twice.
 *
 * All images (the four concepts, and ZenType's screenshot) open the
 * shared sitewide Lightbox on click, matching every other image gallery
 * on the site.
 *
 * The "Builds" section uses the Section's own `measure="narrow"` (same
 * mechanism as the "case study in progress" panel in CaseStudyLayout
 * and the "Current status" panel on About) instead of a one-off
 * `mx-auto max-w-2xl` div -- same 42rem centered column, reached the
 * established way. Text inside still reads left-aligned, matching Work
 * and Research; only the column's own position is centered.
 *
 * "Builds" is an Eyebrow tightly coupled to the ZenType heading below
 * it (mt-2), not a standalone Heading with its own mt-8 gap. As a full
 * H2 the same visual size as ZenType's own H3, the two read as two
 * separate, equally-weighted headings with an awkward gap between them
 * -- more like a second page title floating alone in a mostly-empty
 * dark band than a label sitting on top of the one thing it's labeling.
 * Eyebrow -> Heading is the same pairing (and the same tight spacing)
 * used above every other title on the site: the homepage role line and
 * every case-study header. ZenType's heading also moves to level 2 to
 * keep the heading order correct now that nothing above it is an H2,
 * which as a side effect gives it the same serif weight as the
 * "in progress" panel's own H2 -- appropriate here, since "Builds" is
 * the one moment on this page meant to feel like a real, complete thing
 * rather than a quick exploration.
 *
 * Copy fix: dropped the "Builds" group's own intro sentence ("Not a
 * concept this time...") -- it restated a contrast the two adjacent
 * section headings ("A Few Concept Explorations" right above "Builds")
 * already make on their own, and its one new claim ("the process
 * behind it is half the story") was a promise the very next line
 * fulfills anyway. With one item in this group, ZenType's own heading
 * and description already carry everything a group intro would have
 * said. "A Few Concept Explorations" keeps its intro because that one
 * is load-bearing: it's the actual disclosure that those four pieces
 * aren't real products, not just scene-setting.
 */
export default function DesignShowcasePage() {
  const conceptImages = designShowcaseItems.map((item) => item.image);

  return (
    <>
      <Section density="open">
        <Heading level={1}>{designShowcaseHeading}</Heading>
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

      <Section density="open" tone="dark" measure="narrow">
        <Reveal>
          <Eyebrow>{designShowcaseBuildsHeading}</Eyebrow>
          <Heading level={2} className="mt-2">
            {zentype.title}
          </Heading>
          <p className="mt-3 text-[var(--color-text-muted)]">{zentype.description}</p>

          <div className="mt-8">
            <ControlledMedia
              src={zentype.video.src}
              poster={zentype.video.poster}
              width={zentype.video.width}
              height={zentype.video.height}
              alt={zentype.video.alt}
              muted={false}
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
        </Reveal>
      </Section>
    </>
  );
}

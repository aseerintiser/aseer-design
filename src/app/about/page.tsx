import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { PullQuote } from "@/components/ui/PullQuote";
import { site } from "@/content/site";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
};

/**
 * About Page Rebuild milestone: full structural and content rewrite
 * (see the header comment in content/about.ts for the reasoning). Kept
 * the same layout primitives and section-alternation pattern the rest
 * of the site already uses (Section/Grid/Heading/Text, dark-tone
 * alternation between sections) rather than introducing anything new,
 * since the goal was for this page to read as one more page in the
 * same site, not a redesign of its own.
 */
export default function AboutPage() {
  return (
    <>
      {/* Hero: heading + intro paragraph alongside a real portrait.
          site.portrait was deliberately kept off the homepage
          (Homepage Finalization milestone: "a photo the size of the
          headline competed with the work itself") -- this is the page
          that photo was held back for. Kept deliberately narrower than
          the text column (5 of 12 at lg, not an even split) so it reads
          as a supporting presence, not a second headline. */}
      <Section density="open">
        <Grid gap="md">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <Heading level={1} size="display">
              {about.heading}
            </Heading>
            <Text size="lead" className="mt-6 max-w-[var(--measure)]">
              {about.intro}
            </Text>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5">
            <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <Image
                src={about.portrait.src}
                width={about.portrait.width}
                height={about.portrait.height}
                alt={about.portrait.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 37vw, 100vw"
                priority
              />
            </div>
          </div>
        </Grid>
      </Section>

      {/* Visual QA milestone: these plain-text sections previously sat in
          the default (1280px) container while their text was separately
          capped to the reading measure with no centering -- on wide
          viewports that left a single short heading/paragraph hugging the
          left edge with hundreds of pixels of dead space to its right.
          Narrowing the Section itself to the reading measure centers the
          whole block instead, so the margins read as intentional. */}
      <Section density="dense" tone="dark" measure="narrow">
        <Heading level={3}>Current status</Heading>
        <Text className="mt-2">{site.currentStatus}</Text>
      </Section>

      {about.sections.map((section, index) => (
        <Section
          key={section.heading}
          density="default"
          tone={index % 2 === 0 ? undefined : "dark"}
          measure="narrow"
        >
          <Heading level={2}>{section.heading}</Heading>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <Text key={paragraphIndex}>{paragraph}</Text>
            ))}
          </div>
          {/* Resume Strategy milestone (Resume-Strategy-Research.md,
              Option D): one of the Professional CV's two prominent
              placements (the other being Footer.tsx), per the research
              finding that a resume link is more commonly found inline in
              About-page prose than as a top-level nav item. */}
          {"linkText" in section && section.linkText && (
            <Text muted size="small" className="mt-4">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--color-accent)] underline underline-offset-4"
              >
                {section.linkText}
              </a>
            </Text>
          )}
          {"wideImage" in section && section.wideImage && (
            <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <Image
                src={section.wideImage.src}
                width={section.wideImage.width}
                height={section.wideImage.height}
                alt={section.wideImage.alt}
                className="h-auto w-full"
                sizes="(min-width: 672px) 42rem, 100vw"
              />
            </div>
          )}
          {"quote" in section && section.quote && (
            <div className="mt-6">
              <PullQuote text={section.quote} />
            </div>
          )}
          {"externalLink" in section && section.externalLink && (
            <p className="mt-4">
              <a
                href={section.externalLink.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[var(--color-accent)] underline underline-offset-4"
              >
                {section.externalLink.text} 📷
              </a>
            </p>
          )}
          {/* Visual Polish milestone: three photos with different native
              aspect ratios (square, 16:9, 4:3), so a shared aspect-ratio
              container plus object-cover crops all three to a matched
              strip instead of an uneven row. The grid's md tier is 8
              columns, which 3 equal items can't divide evenly, so the
              row stays a single stacked column through md and only
              becomes 3-across at lg (12 / 3 = 4, divides cleanly). */}
          {"photoStrip" in section && section.photoStrip && (
            <Grid gap="md" className="mt-6">
              {section.photoStrip.map((image) => (
                <div
                  key={image.src}
                  className="col-span-4 aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] md:col-span-8 lg:col-span-4"
                >
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
              ))}
            </Grid>
          )}
          {"tags" in section && section.tags && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {section.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-[var(--radius-full)] border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      {/* Closing: deliberately quiet, no display-size heading of its own,
          since Footer.tsx already provides the page's real closing CTA
          moment ("Let's build something worth trusting") one scroll
          further down. This just bridges back to the evidence -- the
          same "the work should do the talking" reasoning already
          documented on the homepage hero, applied here. */}
      <Section density="open" measure="narrow">
        <Text size="lead">{about.closing}</Text>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/work">View Work</Button>
          <Button href="/research" variant="secondary">
            View Research
          </Button>
        </div>
      </Section>
    </>
  );
}

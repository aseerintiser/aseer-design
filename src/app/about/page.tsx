import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { PullQuote } from "@/components/ui/PullQuote";
import { site } from "@/content/site";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
};

/**
 * Milestone 2: content migrated verbatim from the live aseer.design
 * /about-me page (content/about.ts). Certifications, previously a
 * condensed placeholder section here, now lives on its own
 * /certifications page instead, matching the live site's actual nav
 * structure rather than this project's earlier placeholder guess at it.
 */
export default function AboutPage() {
  return (
    <>
      <Section density="open">
        <Heading level={1} size="display" className="max-w-3xl">
          {about.heading}
        </Heading>
        {/* Visual Polish milestone: two fixes. (1) These three photos have
            different native aspect ratios (square, 16:9, 4:3); the
            container previously had no height of its own, so `h-full`
            on the image was a no-op and each photo rendered at its own
            natural height, producing an uneven row instead of a matched
            strip. A shared aspect-ratio container plus object-cover now
            crops all three consistently. (2) The grid's md tier is 8
            columns, which 3 equal items can't divide evenly (col-span-4
            here previously gave 2-up-then-1 at tablet widths); the row
            now stays a single stacked column through md and only
            becomes 3-across at lg (12 columns / 3 = 4, divides
            cleanly), matching the same "stack until it divides evenly"
            pattern RevealGroup already uses for its 3 clusters. */}
        <Grid gap="md" className="mt-10">
          {about.topImages.map((image) => (
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
          density={index === about.sections.length - 1 ? "open" : "default"}
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
              Option D): this was rendered as plain, unlinked, italic
              "pending confirmation" text while the two conflicting
              live-site resume links were unresolved. Aseer has since
              confirmed the correct file (site.resumeUrl), so this is now
              a real link -- one of the Professional CV's two prominent
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
          {"image" in section && section.image && (
            <div className="mt-6 max-w-xs overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <Image
                src={section.image.src}
                width={section.image.width}
                height={section.image.height}
                alt={section.image.alt}
                className="h-auto w-full"
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
    </>
  );
}

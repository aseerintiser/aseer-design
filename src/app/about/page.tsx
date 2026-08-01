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
          {/* Two real research photos (affinity mapping, an HCI robot
              workshop): placed as direct evidence for the paragraph
              above, not decoration, so they sit here rather than in the
              "When I'm Not Designing" section further down the page.
              Two items divide evenly at every breakpoint (4/2, 8/2,
              12/2), so no stack-until-lg workaround is needed here. */}
          {"researchPhotos" in section && section.researchPhotos && (
            <Grid gap="md" className="mt-6">
              {section.researchPhotos.map((image) => (
                <div
                  key={image.src}
                  className="col-span-4 aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] md:col-span-4 lg:col-span-6"
                >
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ))}
            </Grid>
          )}
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
          {/* Portrait-style photo (e.g. Aseer holding a camera): kept
              small and inline, right after the paragraph it illustrates,
              same treatment this field has always had. */}
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
          {/* Wide proof image (the filmmaking collage): comes right
              after the quote, since it's the visual evidence for the
              claim just made. */}
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
          {/* Tags now sit before the button, with their own small label,
              instead of directly beneath it. A row of bordered pills
              stacked right under a bordered button used to read as one
              blurred group at a glance; the label gives the pills their
              own identity, and the button, now last, reads as the
              section's one real action instead of getting lost above
              a list. */}
          {"tags" in section && section.tags && (
            <div className="mt-6">
              <Text size="small" muted className="text-xs font-medium tracking-wide uppercase">
                Also into
              </Text>
              <ul className="mt-3 flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[var(--radius-full)] bg-[var(--color-bg-subtle)] px-3 py-1 text-sm text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Upgraded from a plain inline text link with a trailing
              emoji to the same Button treatment used everywhere else on
              the site external links get real visual weight (matches
              the homepage/hero CTA pattern) instead of reading like an
              afterthought under a hobby paragraph. Last element in the
              section now, its natural closing action. */}
          {"externalLink" in section && section.externalLink && (
            <div className="mt-6">
              <Button
                href={section.externalLink.href}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="sm"
              >
                {section.externalLink.text}
              </Button>
            </div>
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

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
        <Grid gap="md" className="mt-10">
          {about.topImages.map((image) => (
            <div
              key={image.src}
              className="col-span-4 md:col-span-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          ))}
        </Grid>
      </Section>

      <Section density="dense" tone="dark">
        <Heading level={3}>Current status</Heading>
        <Text className="mt-2 max-w-[var(--measure)]">{site.currentStatus}</Text>
      </Section>

      {about.sections.map((section, index) => (
        <Section
          key={section.heading}
          density={index === about.sections.length - 1 ? "open" : "default"}
          tone={index % 2 === 0 ? undefined : "dark"}
        >
          <Heading level={2}>{section.heading}</Heading>
          <div className="mt-4 max-w-[var(--measure)] space-y-4">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <Text key={paragraphIndex}>{paragraph}</Text>
            ))}
          </div>
          {"linkText" in section && section.linkText && (
            <Text muted size="small" className="mt-4 italic">
              {section.linkText} (link pending confirmation — see resume page)
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
            <div className="mt-6 max-w-[var(--measure)]">
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

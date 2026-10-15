import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { PullQuote } from "@/components/ui/PullQuote";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { site } from "@/content/site";
import { about } from "@/content/about";
import { careerSteps } from "@/content/home";
import { certificationCollections } from "@/content/certifications";

export const metadata: Metadata = {
  title: "About",
};

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";

/**
 * About, on the new identity.
 *
 * The copy is unchanged from content/about.ts. What changed is the
 * rhythm: the page used to alternate dark and light bands section by
 * section, which past two reads as stripes, not pacing. Now it is one
 * paper page with numbered sections and a label column, and a single
 * night section for the part of the story that is about film, where the
 * dark ground earns its place. A short credentials block replaces the
 * need to visit two other pages to see education and certificates.
 */
export default function AboutPage() {
  const reading = about.sections.filter((section) => !("image" in section && section.image));
  const offDuty = about.sections.find((section) => "image" in section && section.image);
  const education = careerSteps.filter((step) => step.id === "msc" || step.id === "bsc");

  return (
    <>
      {/* Hero: the heading, the intro and the portrait, plus where things
          stand now, so the most practical fact is on the first screen. */}
      <Section density="open">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={label}>About</p>
            <Heading level={1} size="display" className="mt-3">
              {about.heading}
            </Heading>
            <Text size="lead" className="mt-6 max-w-[var(--measure)]">
              {about.intro}
            </Text>
            <div className="mt-8 flex max-w-[var(--measure)] gap-4 border-t border-[var(--color-border)] pt-5">
              <span className={`${label} shrink-0 pt-0.5`}>Now</span>
              <p className="text-sm leading-relaxed">{site.currentStatus}</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)]">
              <Image
                src={about.portrait.src}
                width={about.portrait.width}
                height={about.portrait.height}
                alt={about.portrait.alt}
                className="stage-photo-grade h-full w-full object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* The story, numbered, on one calm page. */}
      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="space-y-20 md:space-y-24">
          {reading.map((section, index) => (
            <article key={section.heading} className="grid gap-6 lg:grid-cols-12">
              <header className="lg:col-span-4">
                <p className={label}>{String(index + 1).padStart(2, "0")}</p>
                <Heading level={2} className="mt-2">
                  {section.heading}
                </Heading>
              </header>
              <div className="lg:col-span-8">
                <div className="max-w-[var(--measure)] space-y-4">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <Text key={paragraphIndex} size={paragraphIndex === 0 ? "lead" : "body"}>
                      {paragraph}
                    </Text>
                  ))}
                </div>
                {"researchPhotos" in section && section.researchPhotos && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {section.researchPhotos.map((image) => (
                      <div key={image.src} className="aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                        <Image
                          src={image.src}
                          width={image.width}
                          height={image.height}
                          alt={image.alt}
                          className="stage-photo-grade h-full w-full object-cover"
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {"linkText" in section && section.linkText && (
                  <p className="mt-5 text-sm">
                    <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="link-ink font-medium">
                      {section.linkText}
                    </a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Off duty: the one night section, because it is about film. */}
      {offDuty && "image" in offDuty && offDuty.image && (
        <Section tone="dark" density="open">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className={label}>{String(reading.length + 1).padStart(2, "0")}</p>
              <Heading level={2} className="mt-2">
                {offDuty.heading}
              </Heading>
              <div className="mt-6 max-w-[var(--measure)] space-y-4">
                {offDuty.paragraphs.map((paragraph, index) => (
                  <Text key={index}>{paragraph}</Text>
                ))}
              </div>
              {"quote" in offDuty && offDuty.quote && (
                <div className="mt-8">
                  <PullQuote text={offDuty.quote} />
                </div>
              )}
              {"externalLink" in offDuty && offDuty.externalLink && (
                <div className="mt-8">
                  <Button href={offDuty.externalLink.href} target="_blank" rel="noreferrer" variant="secondary" size="sm">
                    {offDuty.externalLink.text}
                  </Button>
                </div>
              )}
            </header>
            <div className="grid items-start gap-4 sm:grid-cols-12 lg:col-span-8">
              <div className="overflow-hidden rounded-[var(--radius-lg)] sm:col-span-4">
                <Image
                  src={offDuty.image.src}
                  width={offDuty.image.width}
                  height={offDuty.image.height}
                  alt={offDuty.image.alt}
                  className="stage-photo-grade h-auto w-full"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                />
              </div>
              {"wideImage" in offDuty && offDuty.wideImage && (
                <div className="overflow-hidden rounded-[var(--radius-lg)] sm:col-span-8">
                  <Image
                    src={offDuty.wideImage.src}
                    width={offDuty.wideImage.width}
                    height={offDuty.wideImage.height}
                    alt={offDuty.wideImage.alt}
                    className="stage-photo-grade h-auto w-full"
                    sizes="(min-width: 1024px) 44vw, (min-width: 640px) 66vw, 100vw"
                  />
                </div>
              )}
              {"tags" in offDuty && offDuty.tags && (
                <ul className="flex flex-wrap gap-2 sm:col-span-12" aria-label="Interests">
                  {offDuty.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-[var(--radius-full)] border border-[var(--color-border-strong)] px-3 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.08em] text-[var(--color-text-muted)] uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Credentials in one glance, with the full records one click away. */}
      <Section density="default">
        <div className="grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-4">
            <p className={label}>{String(reading.length + 2).padStart(2, "0")}</p>
            <Heading level={2} className="mt-2">
              Credentials
            </Heading>
          </header>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            <div>
              <p className={label}>Education</p>
              <ul className="mt-4 space-y-4">
                {education.map((step) => (
                  <li key={step.id} className="border-t border-[var(--color-border)] pt-3">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] tabular-nums">{step.years}</p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-lg leading-snug">{step.title}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{step.place}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={label}>Certificates</p>
              <ul className="mt-4 space-y-4">
                {certificationCollections.map((collection) => (
                  <li key={collection.title} className="border-t border-[var(--color-border)] pt-3">
                    <p className="font-[family-name:var(--font-display)] text-lg leading-snug">{collection.title}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2 text-sm">
                <Link href="/certifications" className="group inline-flex items-center gap-2 font-medium">
                  <span className="link-ink">All certificates</span>
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
                </Link>
                <Link href="/testimonials" className="group inline-flex items-center gap-2 font-medium">
                  <span className="link-ink">What people I&apos;ve worked with say</span>
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Closing: quiet, since the footer carries the real call to act. */}
      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <Text size="lead" className="max-w-[var(--measure)]">
              {about.closing}
            </Text>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/work">See the work</Button>
              <Button href="/research" variant="secondary">
                Read the research
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Voices } from "@/components/home/Voices";
import { ColorSight } from "@/components/about/ColorSight";
import { FilmTeaser } from "@/components/about/FilmTeaser";
import { site } from "@/content/site";
import { about } from "@/content/about";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Md Aseer Intiser, product designer and HCI researcher, trained as a software engineer: how he works, what drives him, and what he's exploring now.",
};

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";

/** One numbered part of the page: label column on the left, content on the right. */
function Part({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <article id={slugify(title)} className="grid scroll-mt-24 gap-6 lg:grid-cols-12">
      <header className="lg:col-span-4">
        <p className={label}>{String(n).padStart(2, "0")}</p>
        <Heading level={2} className="mt-2">
          {title}
        </Heading>
      </header>
      <div className="lg:col-span-8">{children}</div>
    </article>
  );
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group font-medium text-[var(--color-text)]">
      <span className="link-ink">{children}</span>
      <ArrowIcon className="ml-1.5 inline-block h-3 w-3 align-[-0.05em] transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
    </Link>
  );
}

/**
 * About: the page that has to sell the person on its own (see
 * content/about.ts for the thinking). Paper for reading, one night
 * section for film. The order runs from the story to how he works, why,
 * where he's heading, who he is off the clock, and the recognition, and
 * the footer's contact block closes the page.
 */
export default function AboutPage() {
  const { story, howIWork, drives, exploring, offDuty, recognition } = about;

  return (
    <>
      {/* Hero: one identity in the label, the headline, engineering in
          the first sentence, and where things stand now. */}
      <Section density="open">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={label}>{about.eyebrow}</p>
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

      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="space-y-24 md:space-y-32">
          <Part n={1} title={story.heading}>
            <div className="max-w-[var(--measure)] space-y-4">
              {story.paragraphs.map((paragraph) => (
                <Text key={paragraph} size="lead">
                  {paragraph}
                </Text>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {story.photos.map((image) => (
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
            <p className="mt-5 text-sm">
              <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="link-ink font-medium">
                {story.linkText}
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </p>
          </Part>

          {/* How I work: capability as the label, the habit as the line,
              and where to see it. */}
          <Part n={2} title={howIWork.heading}>
            <ul className="border-t border-[var(--color-border-strong)]">
              {howIWork.rows.map((row) => (
                <li
                  key={row.label}
                  className="grid gap-x-8 gap-y-2 border-b border-[var(--color-border)] py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)] md:py-7"
                >
                  <p className={`${label} sm:pt-2`}>{row.label}</p>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-[1.375rem] leading-[1.25] tracking-[-0.01em] text-balance md:text-[1.625rem]">
                      {row.line}
                    </p>
                    <p className="mt-2 max-w-[var(--measure)] text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {row.proof}
                      {row.link && (
                        <>
                          {" "}
                          <ArrowLink href={row.link.href}>{row.link.label}</ArrowLink>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-14">
              <p className={label}>In their words</p>
              <div className="mt-5">
                <Voices items={howIWork.voices} columns={2} />
              </div>
            </div>
          </Part>

          <Part n={3} title={drives.heading}>
            <div className="max-w-[var(--measure)] space-y-4">
              {drives.paragraphs.map((paragraph, index) => (
                <Text key={paragraph} size={index === 0 ? "lead" : "body"}>
                  {paragraph}
                </Text>
              ))}
            </div>
            <div className="mt-10">
              <ColorSight />
            </div>
          </Part>

          <Part n={4} title={exploring.heading}>
            <p className="max-w-[var(--measure)] font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.01em] text-balance md:text-[2rem]">
              {exploring.question}
            </p>
            <Text muted className="mt-5 max-w-[var(--measure)]">
              {exploring.line}
            </Text>
            <p className="mt-5 text-sm">
              <ArrowLink href={exploring.link.href}>{exploring.link.label}</ArrowLink>
            </p>
          </Part>
        </div>
      </Section>

      {/* Off duty: the one night section, because it is about film. The
          content is Aseer's, unchanged; the quote leads and the stills get
          the width of a screen. */}
      <Section tone="dark" density="open">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <header id={slugify(offDuty.heading)} className="scroll-mt-24 lg:col-span-5">
            <p className={label}>05</p>
            <Heading level={2} className="mt-2">
              {offDuty.heading}
            </Heading>
            <div className="mt-6 max-w-[var(--measure)] space-y-4">
              {offDuty.paragraphs.map((paragraph) => (
                <Text key={paragraph} className="text-[var(--color-text-muted)]">
                  {paragraph}
                </Text>
              ))}
            </div>
          </header>
          <blockquote className="m-0 lg:col-span-7 lg:pl-6">
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.15] tracking-[-0.015em] text-balance italic">
              &ldquo;{offDuty.quote}&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-12">
          {/* The teaser sets the row's height; the camera photo crops to it. */}
          <div className="overflow-hidden rounded-[var(--radius-lg)] sm:relative sm:col-span-4">
            <Image
              src={offDuty.image.src}
              width={offDuty.image.width}
              height={offDuty.image.height}
              alt={offDuty.image.alt}
              className="stage-photo-grade h-full w-full object-cover sm:absolute sm:inset-0"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 100vw"
            />
          </div>
          <div className="sm:col-span-8">
            <FilmTeaser {...offDuty.teaser} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <Button href={offDuty.externalLink.href} target="_blank" rel="noreferrer" variant="secondary" size="sm">
            {offDuty.externalLink.text}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
          <ul className="flex flex-wrap gap-2" aria-label="Interests">
            {offDuty.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-[var(--radius-full)] border border-[var(--color-border-strong)] px-3 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.08em] text-[var(--color-text-muted)] uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Recognition: two headline figures, then three more. */}
      <Section density="default">
        <Part n={6} title={recognition.heading}>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {recognition.lead.map((item) => (
              <li key={item.title} className="border-t border-[var(--color-border-strong)] pt-5">
                <p className="font-[family-name:var(--font-display)] text-[3.5rem] leading-none tracking-[-0.03em] tabular-nums md:text-[4.5rem]">
                  {item.figure}
                  {item.unit && (
                    <span className="ml-2 align-baseline text-[1.25rem] tracking-normal text-[var(--color-text-muted)] md:text-[1.5rem]">
                      {item.unit}
                    </span>
                  )}
                </p>
                <p className="mt-3 text-[1.0625rem] font-medium">{item.title}</p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">{item.meta}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {recognition.more.map((item) => (
              <li key={item.title} className="border-t border-[var(--color-border)] pt-4">
                <p className="font-[family-name:var(--font-display)] text-[2.25rem] leading-none tracking-[-0.02em] tabular-nums">
                  {item.figure}
                  {item.unit && (
                    <span className="ml-1.5 text-[1rem] tracking-normal text-[var(--color-text-muted)]">{item.unit}</span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-snug">
                  {item.href ? <ArrowLink href={item.href}>{item.title}</ArrowLink> : item.title}
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">{item.meta}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {recognition.links.map((link) => (
              <ArrowLink key={link.href} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </p>
        </Part>
      </Section>
    </>
  );
}

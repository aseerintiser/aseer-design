import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MetaRow } from "@/components/ui/MetaRow";
import { CopyText } from "@/components/ui/CopyText";
import { researchProfile } from "@/content/research-profile";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { site } from "@/content/site";

/** Unlisted: shared directly in research outreach and applications, and
 * kept out of search results. Nothing on the site links here. */
export const metadata: Metadata = {
  title: { absolute: "Md Aseer Intiser · Research profile" },
  description:
    "Md Aseer Intiser, HCI researcher: trust and affect in human-AI interaction. Publications, the M.Sc. thesis, methods and education.",
  robots: { index: false, follow: false },
};

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";
/** Place and years under an entry's title, in sentence case so long names stay readable. */
const meta = "font-[family-name:var(--font-mono)] text-xs tracking-[0.02em] text-[var(--color-text-muted)]";

function Part({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <article className="grid gap-6 lg:grid-cols-12">
      <header className="lg:col-span-4">
        <p className={label}>{String(n).padStart(2, "0")}</p>
        <Heading level={2} className="mt-2">
          {title}
        </Heading>
      </header>
      <div className="min-w-0 lg:col-span-8">{children}</div>
    </article>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  const content = (
    <>
      <span className="link-ink">{children}</span>
      <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-medium">
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-medium">
      {content}
    </Link>
  );
}

/** A small titled entry: mono meta line, title, one muted line. */
function Entry({ meta, title, children }: { meta: string; title: string; children?: ReactNode }) {
  return (
    <li className="border-t border-[var(--color-border)] pt-4">
      <p className="font-[family-name:var(--font-display)] text-lg leading-snug">{title}</p>
      <p className={`${meta} mt-1.5`}>{meta}</p>
      {children && <div className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">{children}</div>}
    </li>
  );
}

/**
 * The research profile (see content/research-profile.ts): the academic
 * entrance to the site and the first page a professor sees. Name and
 * affiliation first, then interests, publications, the thesis in depth,
 * other research, methods, education, teaching and applied practice.
 * References stay in the academic CV, not on the page (Aseer, October
 * 20, 2026).
 */
export default function ResearchProfilePage() {
  const profile = researchProfile;
  const { thesis } = profile;

  return (
    <>
      <Section density="open">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className={label}>{profile.eyebrow}</p>
            <Heading level={1} size="display" className="mt-3">
              {profile.name}
            </Heading>
            <p className="mt-4 max-w-[var(--measure)] text-[1.0625rem] font-medium text-balance">{profile.affiliation}</p>
            <Text size="lead" className="mt-6 max-w-[var(--measure)] text-[var(--color-text-muted)]">
              {profile.summary}
            </Text>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer" className="link-ink font-medium">
                    {link.label}
                    {link.note && <span className="text-[var(--color-text-muted)]"> · {link.note}</span>}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="link-ink font-medium">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="order-first lg:order-none lg:col-span-4 lg:justify-self-end">
            <div className="aspect-[4/5] w-28 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)] sm:w-40 lg:w-64">
              <Image
                src={profile.portrait.src}
                width={profile.portrait.width}
                height={profile.portrait.height}
                alt={profile.portrait.alt}
                className="stage-photo-grade h-full w-full object-cover"
                sizes="(min-width: 1024px) 16rem, 10rem"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="space-y-20 md:space-y-28">
          <Part n={1} title="Research interests">
            <Text size="lead" className="max-w-[var(--measure)]">
              {profile.interests.lead}
            </Text>
            <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {profile.interests.items.map((item) => (
                <li key={item.title} className="border-t border-[var(--color-border-strong)] pt-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">{item.line}</p>
                </li>
              ))}
            </ul>
          </Part>

          <Part n={2} title="Publications">
            <ol className="max-w-[var(--measure)]">
              {profile.publications.map((publication) => (
                <li
                  key={publication.citation}
                  className="border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-0"
                >
                  <p className={label}>{publication.label ?? publication.status}</p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-lg leading-relaxed">
                    {renderInlineMarkdown(publication.citation)}
                  </p>
                  {publication.detail && (
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">{publication.detail}</p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <CopyText text={publication.citation.replace(/\*/g, "")} label="Copy citation" />
                    {publication.fullText && <TextLink href={publication.fullText.href}>{publication.fullText.label}</TextLink>}
                  </div>
                </li>
              ))}
            </ol>
          </Part>

          <Part n={3} title="Master's thesis">
            <div className="max-w-[var(--measure)]">
              <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-balance">{thesis.title}</p>
              <div className="mt-6">
                <MetaRow items={thesis.details} className="sm:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]" />
              </div>
              <p className={`${label} mt-10`}>Method</p>
              <Text className="mt-2">{thesis.method}</Text>
              <p className={`${label} mt-8`}>What it found</p>
              <div className="mt-2 space-y-3">
                {thesis.findings.map((finding) => (
                  <Text key={finding}>{finding}</Text>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className={label}>Seven design principles</p>
              <div className="mt-4 grid gap-x-8 gap-y-8 sm:grid-cols-3">
                {thesis.principles.map((group) => (
                  <div key={group.group} className="border-t border-[var(--color-border-strong)] pt-4">
                    <p className="text-sm font-medium">{group.group}</p>
                    <ul className="mt-3 space-y-3">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <p className="font-[family-name:var(--font-display)] text-[1.0625rem] italic">{item.label}</p>
                          <p className="mt-0.5 text-sm leading-snug text-[var(--color-text-muted)]">{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 max-w-[var(--measure)]">
              <p className={label}>Limits</p>
              <Text muted className="mt-2">
                {thesis.limits}
              </Text>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <TextLink href={thesis.fullText}>Read the full thesis on Trepo</TextLink>
                <TextLink href="/research/lumi">Read the Lumi case study</TextLink>
              </div>
            </div>
          </Part>

          <Part n={4} title="Other research">
            <ul className="max-w-[var(--measure)] space-y-8">
              {profile.otherResearch.map((study) => (
                <li key={study.href} className="border-t border-[var(--color-border)] pt-4">
                  <p className={label}>{study.label}</p>
                  <p className="mt-1.5 font-[family-name:var(--font-display)] text-xl">{study.title}</p>
                  <Text className="mt-2 text-[var(--color-text-muted)]">{study.line}</Text>
                  <div className="mt-3">
                    <TextLink href={study.href}>Read the study</TextLink>
                  </div>
                </li>
              ))}
            </ul>
          </Part>

          <Part n={5} title="Methods">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-3">
              {profile.methods.map((group) => (
                <div key={group.group}>
                  <p className={label}>{group.group}</p>
                  <ul className="mt-3">
                    {group.items.map((method) => (
                      <li key={method} className="border-t border-[var(--color-border)] py-2 text-[0.9375rem] leading-snug">
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Part>

          <Part n={6} title="Education">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {profile.education.map((degree) => (
                <li key={degree.degree} className="border-t border-[var(--color-border-strong)] pt-4">
                  <p className="font-[family-name:var(--font-display)] text-xl leading-snug">{degree.degree}</p>
                  <p className={`${meta} mt-1.5`}>
                    {degree.place} · {degree.years}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">
                    {degree.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className={`${label} mt-12`}>Selected programmes</p>
            <ul className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {profile.programmes.map((programme) => (
                <Entry key={programme.title} meta={programme.meta} title={programme.title}>
                  {programme.line}
                </Entry>
              ))}
            </ul>
          </Part>

          <Part n={7} title="Teaching and mentoring">
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {profile.teaching.map((role) => (
                <Entry key={role.title} meta={role.meta} title={role.title}>
                  {role.line}
                </Entry>
              ))}
            </ul>
          </Part>

          <Part n={8} title="Applied practice">
            <Text className="max-w-[var(--measure)]">{profile.practice}</Text>
            <div className="mt-6">
              <TextLink href="/work">See the applied work</TextLink>
            </div>
          </Part>
        </div>
      </Section>
    </>
  );
}

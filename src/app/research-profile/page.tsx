import type { Metadata } from "next";
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

/** Unlisted: shared directly in research and doctoral applications, and
 * kept out of search results. Nothing on the site links here. */
export const metadata: Metadata = {
  title: "Research profile",
  description: "Research on trust in conversational AI: the question, the M.Sc. thesis, other studies and methods.",
  robots: { index: false, follow: false },
};

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";

function Part({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <article className="grid gap-6 lg:grid-cols-12">
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

function TextLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const content = (
    <>
      <span className="link-ink">{children}</span>
      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
    </>
  );
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className="group inline-flex items-center gap-2 text-sm font-medium">
        {content}
      </a>
    );
  }
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

/**
 * The research profile (see content/research-profile.ts): the academic
 * entrance to the site. It leads with the research question and the
 * thesis, then the other studies and methods, and presents the industry
 * work as applied practice that supports the research.
 */
export default function ResearchProfilePage() {
  const profile = researchProfile;
  return (
    <>
      <Section density="open">
        <div className="max-w-3xl">
          <p className={label}>{profile.eyebrow}</p>
          <Heading level={1} className="mt-3">
            {profile.heading}
          </Heading>
          <Text size="lead" className="mt-5 max-w-[var(--measure)] text-[var(--color-text-muted)]">
            {profile.intro}
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
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="space-y-20 md:space-y-24">
          <Part n={1} title="The question">
            <Text size="lead" className="max-w-[var(--measure)]">
              {profile.question.text}
            </Text>
            <ul className="mt-6 max-w-[var(--measure)] space-y-2">
              {profile.question.interests.map((interest) => (
                <li key={interest} className="border-t border-[var(--color-border)] pt-2 text-[0.9375rem]">
                  {interest}
                </li>
              ))}
            </ul>
          </Part>

          <Part n={2} title="Master's thesis">
            <div className="max-w-[var(--measure)]">
              <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed">
                {renderInlineMarkdown(profile.thesis.citation)}
              </p>
              <div className="mt-4">
                <CopyText text={profile.thesis.citation.replace(/\*/g, "")} label="Copy citation" />
              </div>
              <div className="mt-8">
                <MetaRow items={profile.thesis.details} className="grid-cols-3 sm:grid-cols-3" />
              </div>
              <p className={`${label} mt-10`}>Method</p>
              <Text className="mt-2">{profile.thesis.method}</Text>
              <p className={`${label} mt-8`}>What it found</p>
              <Text className="mt-2">{profile.thesis.findings}</Text>
              <Text muted className="mt-4">
                {profile.thesis.publication}
              </Text>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <TextLink href="/research/lumi">Read the Lumi case study</TextLink>
                <TextLink href={`mailto:${site.email}?subject=${encodeURIComponent("Request: M.Sc. thesis")}`}>
                  Request the full thesis
                </TextLink>
              </div>
            </div>
          </Part>

          <Part n={3} title="Other studies">
            <ul className="max-w-[var(--measure)] space-y-8">
              {profile.studies.map((study) => (
                <li key={study.slug} className="border-t border-[var(--color-border)] pt-4">
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

          <Part n={4} title="Methods I've used">
            <ul className="grid max-w-3xl gap-x-10 gap-y-2 sm:grid-cols-2">
              {profile.methods.map((method) => (
                <li key={method} className="border-t border-[var(--color-border)] pt-2 text-[0.9375rem]">
                  {method}
                </li>
              ))}
            </ul>
          </Part>

          <Part n={5} title="From practice to research">
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

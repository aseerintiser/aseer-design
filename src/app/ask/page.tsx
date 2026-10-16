import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { AskPortfolio } from "@/components/ask/AskPortfolio";
import { askPage, askPrinciples, askSuggestions } from "@/content/ask";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Ask the portfolio",
  description:
    "Ask about Md Aseer Intiser's work, research or background. Every answer is a passage from the site, quoted as written, with a link to its source.",
};

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";

/**
 * Ask the portfolio (Phase 5). A question box that answers only with
 * Aseer's own words from this site, built on the seven principles from
 * his Lumi study. It is a search that runs in the browser, not an AI
 * model, so there is no paid service and nothing to make up.
 */
export default function AskPage() {
  return (
    <>
      <Section density="open">
        <div className="max-w-3xl">
          <p className={label}>{askPage.eyebrow}</p>
          <Heading level={1} className="mt-3">
            {askPage.heading}
          </Heading>
          <Text size="lead" className="mt-5 max-w-[var(--measure)] text-[var(--color-text-muted)]">
            {askPage.intro}
          </Text>
          <div className="mt-12">
            <AskPortfolio suggestions={askSuggestions} scope={askPage.scope} email={site.email} />
          </div>
        </div>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-4">
            <p className={label}>How it works</p>
            <Heading level={2} className="mt-2">
              Built on what Lumi taught me
            </Heading>
            <Text className="mt-4 max-w-sm text-[var(--color-text-muted)]">
              My thesis study ended in{" "}
              <Link href="/research/lumi#ch-what-it-means" className="link-ink text-[var(--color-text)]">
                seven principles
              </Link>{" "}
              for conversational AI people can trust. This page follows them. It isn&apos;t an AI model: it is a
              search over this site that runs in your browser.
            </Text>
          </header>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {askPrinciples.map(([name, line]) => (
              <div key={name} className="border-t border-[var(--color-border)] pt-3">
                <dt className={label}>{name}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed">{line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}

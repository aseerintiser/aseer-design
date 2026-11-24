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
    "Ask about Md Aseer Intiser's work, research or background. An AI assistant answers from this site only, with a source for every claim.",
};

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";

/**
 * Ask the portfolio. An AI assistant that answers only from passages on
 * this site, citing each one, built on the seven principles from Aseer's
 * Lumi study. It runs on a free model plan; when that is unavailable the
 * page falls back to quoting the closest passage, found in the browser.
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
              for conversational AI people can trust. This assistant follows them. It is an AI model, but it
              only reads passages from this site. If it is ever unavailable, the page quotes the closest passage
              instead.
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

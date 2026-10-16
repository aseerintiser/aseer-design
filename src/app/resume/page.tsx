import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MetaRow } from "@/components/ui/MetaRow";
import { site } from "@/content/site";
import { cvSummary, publicCv } from "@/content/cv";

export const metadata: Metadata = {
  title: "CV",
  description: "The CV of Md Aseer Intiser, Product Designer & HCI Researcher.",
};

/**
 * The CV page: one click to the CV, plus a light on-page summary. The
 * public site carries a single CV (see content/cv.ts for why).
 */
export default function ResumePage() {
  const cv = publicCv;

  return (
    <Section density="open">
      <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        CV
      </p>
      <Heading level={1} className="mt-3">
        The full record
      </Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        {site.title} · {site.currentStatus}
      </Text>

      <a
        href={cv.href}
        target="_blank"
        rel="noreferrer"
        className="group mt-10 flex max-w-xl flex-col justify-between gap-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] sm:p-8"
      >
        <span>
          <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            {cv.label} · PDF
          </span>
          <span className="mt-3 block font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-snug">
            {cv.title}
          </span>
          <span className="mt-2 block text-sm text-[var(--color-text-muted)]">{cv.body}</span>
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <span className="link-ink">Open the CV</span>
          <span className="sr-only"> (PDF, opens in a new tab)</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
        </span>
      </a>

      <div className="mt-12 max-w-4xl">
        <MetaRow items={[...cvSummary]} />
      </div>
    </Section>
  );
}

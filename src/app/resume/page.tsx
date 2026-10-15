import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MetaRow } from "@/components/ui/MetaRow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CV",
  description: "The design CV and the academic CV of Md Aseer Intiser, Product Designer & HCI Researcher.",
};

/**
 * Blueprint Part 3: frictionless one-click download, plus a light
 * on-page summary.
 *
 * Resume Strategy milestone (Resume-Strategy-Research.md, Option D):
 * the two-conflicting-links problem this page used to work around
 * (Master_Portfolio_Knowledge_Base.md Section 2.7) is resolved -- Aseer
 * confirmed site.resumeUrl directly, replacing the disabled placeholder
 * button below. This page is also no longer linked from the primary
 * nav (see the nav array in content/site.ts); it's reached via
 * Footer.tsx and the About page's "View my resume" line instead, per
 * the research finding that resume links are more commonly a
 * footer/inline convention than a top-level nav destination. A quiet
 * cross-link to the Academic CV is included below for anyone who
 * lands here specifically looking for that instead.
 */
export default function ResumePage() {
  const cvs = [
    {
      label: "Design CV",
      title: "Product design and UX roles",
      body: "Design experience at Convay and Kaz Software, with selected projects.",
      href: site.resumeUrl,
    },
    {
      label: "Academic CV",
      title: "Research roles and PhD applications",
      body: "Education, the M.Sc. thesis and research projects.",
      href: site.academicCvUrl,
    },
  ];

  return (
    <Section density="open">
      <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        CV
      </p>
      <Heading level={1} className="mt-3">
        Two versions, one record
      </Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        {site.title} · {site.currentStatus}
      </Text>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {cvs.map((cv) => (
          <li key={cv.label}>
            <a
              href={cv.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between gap-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] sm:p-8"
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
                <span className="link-ink">Open the {cv.label.toLowerCase()}</span>
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12 max-w-4xl">
        <MetaRow
          items={[
            { label: "Based in", value: "Tampere, Finland" },
            { label: "Education", value: "M.Sc. Human-Technology Interaction" },
            { label: "Status", value: "Open to relocation" },
            { label: "Contact", value: site.email },
          ]}
        />
      </div>
    </Section>
  );
}

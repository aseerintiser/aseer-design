import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TrustMark } from "@/components/ui/TrustMark";
import { designNotes } from "@/content/design-notes";

export const metadata: Metadata = {
  title: "Design notes",
  description: "How aseer.design was designed and checked: the idea, the decisions, and what has been measured so far.",
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

/**
 * Design notes (Phase 5): a short page, linked from the footer, on how
 * the site was designed and checked. Most visitors never open it; the
 * design leads and reviewers who do get proof instead of a feeling. The
 * copy lives in content/design-notes.ts, results only with their dates.
 */
export default function DesignNotesPage() {
  const notes = designNotes;
  return (
    <>
      <Section density="open">
        <div className="max-w-3xl">
          <p className={label}>{notes.eyebrow}</p>
          <Heading level={1} className="mt-3">
            {notes.heading}
          </Heading>
          <Text size="lead" className="mt-5 max-w-[var(--measure)] text-[var(--color-text-muted)]">
            {notes.intro}
          </Text>
          <p className={`${label} mt-6`}>Last updated {notes.updated}</p>
        </div>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <div className="space-y-20 md:space-y-24">
          <Part n={1} title="The idea">
            <div className="max-w-[var(--measure)] space-y-4">
              <TrustMark className="w-16" weight={2} />
              {notes.idea.map((paragraph, index) => (
                <Text key={index} size={index === 0 ? "lead" : "body"}>
                  {paragraph}
                </Text>
              ))}
            </div>
          </Part>

          <Part n={2} title="Decisions">
            <dl className="grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-2">
              {notes.decisions.map((decision) => (
                <div key={decision.name} className="border-t border-[var(--color-border)] pt-3">
                  <dt className="font-[family-name:var(--font-display)] text-lg">{decision.name}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--color-text-muted)]">
                    {decision.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Part>

          <Part n={3} title="Built in, not added on">
            <div className="max-w-[var(--measure)] space-y-4">
              {notes.access.map((paragraph, index) => (
                <Text key={index}>{paragraph}</Text>
              ))}
            </div>
          </Part>

          <Part n={4} title="What was measured">
            <table className="w-full max-w-3xl border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">Measured results, with how and when each was taken</caption>
              <thead>
                <tr className={label}>
                  <th scope="col" className="pb-3 font-normal">
                    Check
                  </th>
                  <th scope="col" className="pb-3 font-normal">
                    Result
                  </th>
                  <th scope="col" className="hidden pb-3 font-normal sm:table-cell">
                    How and when
                  </th>
                </tr>
              </thead>
              <tbody>
                {notes.measured.map((row) => (
                  <tr key={row.what} className="border-t border-[var(--color-border)] align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">
                      {row.what}
                      <span className="mt-1 block font-normal text-[var(--color-text-muted)] sm:hidden">{row.how}</span>
                    </th>
                    <td className="py-3 pr-4 font-[family-name:var(--font-mono)] whitespace-nowrap tabular-nums">
                      {row.result}
                    </td>
                    <td className="hidden py-3 text-[var(--color-text-muted)] sm:table-cell">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Part>

          <Part n={5} title="Not tested yet">
            <Text className="max-w-[var(--measure)]">{notes.notYet}</Text>
          </Part>

          <Part n={6} title="Built with">
            <Text className="max-w-[var(--measure)]">{notes.builtWith}</Text>
            <p className="mt-6 text-sm">
              <Link href="/ask" className="link-ink font-medium">
                Ask the portfolio a question
              </Link>
            </p>
          </Part>
        </div>
      </Section>
    </>
  );
}

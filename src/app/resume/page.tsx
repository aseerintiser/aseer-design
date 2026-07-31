import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { MetaRow } from "@/components/ui/MetaRow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
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
  return (
    // Visual QA milestone: this page has no rich grid or cards to fill
    // the rest of the width the way Work/Research do below their own
    // intro line, so a heading + one sentence + button + meta row inside
    // the default 1280px container left a whole page reading as mostly
    // blank on wide viewports. Narrowing the Section to the reading
    // measure centers the entire page's content instead.
    <Section density="open" measure="narrow">
      <Heading level={1}>Resume</Heading>
      <Text muted className="mt-4">
        {site.title} · {site.currentStatus}
      </Text>

      <div className="mt-8">
        <Button href={site.resumeUrl} target="_blank" rel="noreferrer">
          Download Resume (PDF)
        </Button>
      </div>

      <div className="mt-12">
        <MetaRow
          items={[
            { label: "Based in", value: "Tampere, Finland" },
            { label: "Education", value: "M.Sc. Human-Technology Interaction" },
            { label: "Status", value: "Open to relocation" },
            { label: "Contact", value: site.email },
          ]}
        />
      </div>

      <Text muted size="small" className="mt-8">
        Looking for a fuller academic record instead?{" "}
        <a
          href={site.academicCvUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[var(--color-accent)] underline underline-offset-4"
        >
          View my academic CV
        </a>
        .
      </Text>
    </Section>
  );
}

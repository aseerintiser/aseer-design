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
 * on-page summary. The download itself is intentionally left
 * unresolved rather than pointing at either of the two conflicting
 * live resume links (Master_Portfolio_Knowledge_Base.md Section 2.7,
 * "two different Google Drive file IDs... worth confirming which is
 * current"); wiring a single, correct file is a Milestone 0 content
 * decision, not a foundation-layer one.
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
        {/* A real disabled <button>, not a Link with aria-disabled: an
            anchor's default navigation still fires on click or Enter
            regardless of aria-disabled, so the previous version silently
            sent visitors to "#" instead of actually doing nothing. The
            single resume link is still unresolved between two conflicting
            live URLs (see Master_Portfolio_Knowledge_Base.md 2.7); this
            stays genuinely inert until that's settled. */}
        <Button type="button" disabled title="Resume link pending confirmation">
          Download PDF (link pending)
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
    </Section>
  );
}

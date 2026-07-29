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
    <Section density="open">
      <Heading level={1}>Resume</Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        {site.title} · {site.currentStatus}
      </Text>

      <div className="mt-8">
        <Button href="#" aria-disabled="true">
          Download PDF (link pending)
        </Button>
      </div>

      <div className="mt-12 max-w-[var(--measure)]">
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

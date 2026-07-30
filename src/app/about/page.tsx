import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
};

/**
 * Structure only for this milestone, following
 * Portfolio_Content_Architecture_Blueprint.md Part 3 (Who I am, Current
 * status, What drives me, Certifications condensed, Testimonials
 * condensed, Outside of design). Body copy is a placeholder per this
 * milestone's explicit "do not polish portfolio copy" instruction; the
 * current-status line reuses the one fact already confirmed in
 * Md_Aseer_Intiser_Career_Archive.md rather than inventing wording.
 */
export default function AboutPage() {
  return (
    <>
      <Section density="open">
        <Heading level={1}>About</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          This section is being written and isn&apos;t live yet.
        </Text>
      </Section>

      <Section density="dense" tone="dark">
        <Heading level={3}>Current status</Heading>
        <Text className="mt-2 max-w-[var(--measure)]">{site.currentStatus}</Text>
      </Section>

      {/* This section's copy needs a deliberate tone decision before
          it's rewritten (the accessibility-motivation framing currently
          on the live About page shouldn't be a silent carryover; see
          Master_Portfolio_Knowledge_Base.md Section 2.3) -- that's a
          content decision for a later milestone, not something to
          resolve here. The visible placeholder below intentionally
          doesn't cite internal planning documents: whatever isn't
          finished yet, a real visitor should never see an internal
          filename or section reference in body copy. */}
      <Section density="default">
        <Heading level={2}>What drives me</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          This section is being rewritten and isn&apos;t live yet.
        </Text>
      </Section>

      {/* Selection of which 3-5 certifications to feature is a content
          decision pending later (Portfolio_Content_Architecture_Blueprint.md
          Part 7); same rule as above applies to the visible copy. */}
      <Section density="default">
        <Heading level={2}>Certifications</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          Certifications are being condensed to a short, relevant list and
          aren&apos;t live yet.
        </Text>
      </Section>

      <Section density="default">
        <Heading level={2}>Outside of design</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          Filmmaking and photography material is being selected and isn&apos;t
          live yet.
        </Text>
      </Section>
    </>
  );
}

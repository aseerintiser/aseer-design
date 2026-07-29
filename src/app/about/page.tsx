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
          Placeholder — who-I-am copy pending a later milestone.
        </Text>
      </Section>

      <Section density="dense" tone="dark">
        <Heading level={3}>Current status</Heading>
        <Text className="mt-2 max-w-[var(--measure)]">{site.currentStatus}</Text>
      </Section>

      <Section density="default">
        <Heading level={2}>What drives me</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          Placeholder — the accessibility motivation currently on the live
          About page needs a deliberate tone decision before it&apos;s
          rewritten here (see Master_Portfolio_Knowledge_Base.md, Section
          2.3), not a silent carryover.
        </Text>
      </Section>

      <Section density="default">
        <Heading level={2}>Certifications</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          Placeholder — condensed to 3-5 items pending your selection (see
          Portfolio_Content_Architecture_Blueprint.md Part 7).
        </Text>
      </Section>

      <Section density="default">
        <Heading level={2}>Outside of design</Heading>
        <Text muted className="mt-4 max-w-[var(--measure)]">
          Placeholder — filmmaking and photography material pending a
          later milestone.
        </Text>
      </Section>
    </>
  );
}

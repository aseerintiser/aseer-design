import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { CertificationCollection } from "@/components/certifications/CertificationCollection";
import { CertificationArchive } from "@/components/certifications/CertificationArchive";
import {
  certificationsIntro,
  certificationCollections,
  certificationsArchiveHeading,
  certificationsArchiveIntro,
  certificationsArchive,
} from "@/content/certifications";

/**
 * Certifications Rebuild milestone: a full rethink of this page, not a
 * layout polish. The old version was a flat stack of headings and
 * small thumbnail grids with no real writing and no hierarchy beyond
 * document order -- functional, but reading as "a list of certificates"
 * rather than a curated record of continuous learning.
 *
 * The direction chosen after weighing a few concepts (a literal
 * bookshelf, a generic premium card grid, an expandable accordion
 * archive, and this one): reuse this portfolio's own case-study
 * chapter structure -- a ghost numeral, a numbered heading, alternating
 * light/dark tone, a narrow reading measure, real writing above the
 * evidence -- for the three named-provider credentials (Google, Meta,
 * Interaction Design Foundation), and move everything else into a
 * quieter, denser archive that doesn't compete with them for
 * attention. A literal bookshelf was ruled out for being exactly the
 * skeuomorphic gimmick the brief asked to avoid; a uniform premium
 * grid was ruled out for treating a seven-course professional
 * certificate and a single webinar attendance record as visually
 * equal, which is the "collected badges" impression this rebuild is
 * meant to fix; an accordion that hides certificates behind a click was
 * ruled out because the screenshots are here for credibility, and
 * credibility works best in view, not one tap away. Reusing the
 * case-study chapter pattern won on every count: it creates real
 * hierarchy (Google's collection is visibly larger and comes first;
 * Meta and IxDF follow at equal typographic weight but with less
 * material; the archive is smaller type, tighter spacing, no
 * numbering), it's provably consistent with the rest of the site since
 * it's literally the same components, and it required building nothing
 * that doesn't already have a clear second use elsewhere in this
 * portfolio.
 *
 * Every certificate from the old page is still here, in the same
 * order, none removed, none re-sequenced.
 */
export default function CertificationsPage() {
  return (
    <>
      <Section density="open" measure="narrow">
        <Reveal>
          <Heading level={1}>{certificationsIntro.heading}</Heading>
          <Text size="lead" muted className="mt-4 max-w-[var(--measure)]">
            {certificationsIntro.body}
          </Text>
        </Reveal>
      </Section>

      {certificationCollections.map((collection, index) => (
        <CertificationCollection
          key={collection.number}
          {...collection}
          tone={index % 2 === 0 ? "dark" : undefined}
        />
      ))}

      <Section density="dense" measure="narrow">
        <CertificationArchive
          heading={certificationsArchiveHeading}
          intro={certificationsArchiveIntro}
          categories={certificationsArchive}
        />
      </Section>
    </>
  );
}

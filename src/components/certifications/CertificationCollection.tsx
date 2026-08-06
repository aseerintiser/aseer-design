import type { CertificationCollection as CertificationCollectionData } from "@/content/certifications";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { GhostNumeral } from "@/components/ui/GhostNumeral";
import { Reveal } from "@/components/ui/Reveal";
import { CertificateTile } from "./CertificateTile";

/**
 * One of the three named-provider collections (Google, Meta,
 * Interaction Design Foundation). Deliberately built out of the same
 * pieces a case study chapter uses -- a ghost numeral, a numbered
 * heading, alternating light/dark tone, a narrow reading measure --
 * rather than a new "certificate card" visual language. That's the
 * whole idea behind this rebuild: the strongest way to make three
 * credentials feel curated, not collected, was to let them borrow the
 * same editorial structure this portfolio already uses for real
 * project write-ups, instead of inventing a shelf, a folder, or any
 * other literal metaphor for "a collection."
 *
 * Visual hierarchy between Google, Meta, and IxDF comes entirely from
 * this structure and from how much real estate each collection's own
 * content naturally needs (ten certificates read as a fuller, more
 * substantial collection than one), never from logo size -- there are
 * no logos on this page at all.
 *
 * A group with only one or two certificates (Meta; each of IxDF's two
 * groups) renders its tiles at `size="large"` instead of the dense
 * grid Google's ten certificates use, so a single certificate reads as
 * a deliberate, spotlighted moment instead of a small, lonely square
 * in an otherwise-empty row.
 */
export function CertificationCollection({
  number,
  title,
  note,
  groups,
  tone,
}: CertificationCollectionData & { tone?: "dark" }) {
  return (
    <Section tone={tone} measure="narrow">
      <Reveal>
        <GhostNumeral n={number} />
        <Heading level={2}>{title}</Heading>
        <Text muted className="mt-3 max-w-[var(--measure)]">
          {note}
        </Text>
      </Reveal>

      <div className="mt-8 space-y-8">
        {groups.map((group, groupIndex) => {
          const isLarge = group.images.length <= 2;
          return (
            <Reveal key={group.label ?? groupIndex} delay={0.05 * (groupIndex + 1)}>
              {group.label && (
                <Heading
                  level={3}
                  size={4}
                  display={false}
                  className="mb-3 text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase"
                >
                  {group.label}
                </Heading>
              )}
              <div
                className={
                  isLarge
                    ? "flex flex-wrap gap-4"
                    : "grid grid-cols-1 gap-5 sm:grid-cols-2"
                }
              >
                {group.images.map((image, index) => (
                  <CertificateTile
                    key={image.id + index}
                    image={image}
                    group={group.images}
                    index={index}
                    size={isLarge ? "large" : "default"}
                  />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

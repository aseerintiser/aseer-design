import type { ArchiveCategory } from "@/content/certifications";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { CertificateTile } from "./CertificateTile";

/**
 * The quieter closing section (webinars, other certificates, work
 * experience records, achievements) -- deliberately not given the same
 * numbered, full-section treatment as Google, Meta, and Interaction
 * Design Foundation above. That contrast in weight is the actual
 * hierarchy mechanism the brief asked for: Google, Meta, and IxDF read
 * as the main collection because they get an entire section each; this
 * reads as an appendix because four categories share one, at a smaller
 * type size and tighter spacing, with no numbering to imply it's a
 * fourth, fifth, sixth, and seventh chapter of equal standing.
 *
 * Every certificate here still opens the same lightbox, at the same
 * quality, with the same keyboard and touch support -- being in the
 * archive changes how much visual weight a category gets, not how
 * seriously its evidence is treated.
 */
export function CertificationArchive({
  heading,
  intro,
  categories,
}: {
  heading: string;
  intro: string;
  categories: ArchiveCategory[];
}) {
  return (
    <div className="mt-4">
      <Heading level={2} size={3} display={false}>
        {heading}
      </Heading>
      <Text muted size="small" className="mt-2 max-w-[var(--measure)]">
        {intro}
      </Text>

      <div className="mt-10 space-y-10">
        {categories.map((category) => (
          <Reveal key={category.label}>
            <Heading level={3} size={4} display={false}>
              {category.label}
            </Heading>
            <Text muted size="small" className="mt-1">
              {category.note}
            </Text>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {category.images.map((image, index) => (
                <CertificateTile
                  key={image.id + index}
                  image={image}
                  group={category.images}
                  index={index}
                />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { RevealItem } from "@/components/ui/RevealItem";

interface RevealGroupProps {
  groups: {
    heading?: string;
    items: { label: string; detail: string }[];
  }[];
}

/**
 * Groups of `RevealItem`s laid out in labeled clusters -- e.g. seven
 * design principles organized into three named dimensions. Composed
 * entirely from existing, generic components (`Grid`, `Heading`) plus
 * the one new primitive (`RevealItem`); there's no bespoke "cluster"
 * component underneath this, just an ordinary grid, so a future case
 * study with grouped findings, trade-offs, or considerations can reach
 * for `RevealItem` directly in whatever layout it needs rather than
 * being stuck with this specific grouping shape.
 *
 * Each cluster is one flex column containing its own heading and items
 * together, so collapsing from 3-up (desktop) to 1-up (mobile) via the
 * grid's own responsive col-spans can never separate a heading from its
 * items -- they were never two separate grid cells to begin with.
 *
 * level=3/size=4 on the cluster heading matches the same
 * level-vs-visual-size split already used for in-section sub-headings
 * elsewhere (CaseStudyBody's own heading block): these sit inside a
 * level-2 section heading, so semantically they must be h3, not h4, to
 * avoid skipping a level in the document outline.
 */
export function RevealGroup({ groups }: RevealGroupProps) {
  return (
    <Grid gap="md" className="mt-6">
      {groups.map((group, index) => (
        <div key={index} className="col-span-4 flex flex-col md:col-span-8 lg:col-span-4">
          {group.heading && (
            <Heading level={3} size={4} className="mb-1">
              {group.heading}
            </Heading>
          )}
          <div>
            {group.items.map((item) => (
              <RevealItem key={item.label} label={item.label} detail={item.detail} />
            ))}
          </div>
        </div>
      ))}
    </Grid>
  );
}

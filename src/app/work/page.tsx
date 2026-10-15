import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { WorkIndex, type WorkItem } from "@/components/work/WorkIndex";
import { caseStudies } from "@/content/projects";
import { designShowcaseItems, zentype } from "@/content/design-showcase";
import { yearsFrom } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Product and UX design work, mostly at Convay, an enterprise, government-adjacent platform. Other work spans fitness, travel, and cultural experiences.",
};

/** What kind of work each project is, and the one line of context that
 * matters when scanning the list. Facts from each case study's meta. */
const workContext: Record<string, { kind: WorkItem["kind"]; context: string }> = {
  "convay-mobile-app-revamp": { kind: "product", context: "Convay at Synesis IT" },
  "convay-ai-for-physical-meetings": { kind: "product", context: "Convay at Synesis IT" },
  "convay-design-system": { kind: "product", context: "Convay at Synesis IT" },
  "convay-notifications": { kind: "product", context: "Convay at Synesis IT" },
  fitvibe: { kind: "product", context: "Client app at Kaz Software" },
  "travelmate-ai": { kind: "concept", context: "Self-directed concept" },
  "cultural-festival-platform": { kind: "concept", context: "ECIU Créathon, team of six" },
};

export default function WorkIndexPage() {
  const items: WorkItem[] = caseStudies
    .filter((project) => project.track === "work")
    .map((project) => ({
      project,
      kind: workContext[project.slug]?.kind ?? "product",
      context: workContext[project.slug]?.context ?? "",
      years: yearsFrom(project.meta.duration),
      role: project.meta.role.replace(/\s*\(.*\)$/, ""),
    }));

  const archive = [...designShowcaseItems.map((item) => item.title), zentype.title];

  return (
    <Section density="open">
      <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        Index · {items.length} projects
      </p>
      <Heading level={1} className="mt-3">
        Work
      </Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        Product and UX design work, mostly at Convay, an enterprise, government-adjacent platform.
        Other work spans fitness, travel, and cultural experiences.
      </Text>

      <WorkIndex items={items} />

      {/* Concept explorations are kept for range, not presented as
          headline evidence: one quiet archive row instead of cards. */}
      <Link
        href="/design-showcase"
        className="group mt-20 flex flex-col gap-2 border-y border-[var(--color-border)] py-6 md:flex-row md:items-center md:justify-between"
      >
        <span>
          <span className="block font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            Archive · interface explorations
          </span>
          <span className="mt-1 block text-[var(--color-text)]">{archive.join(" · ")}</span>
        </span>
        <span className="flex items-center gap-2 text-sm font-medium">
          <span className="link-ink">Design showcase</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Section>
  );
}

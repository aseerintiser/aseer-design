import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { getProjectsByTrack } from "@/content/projects";
import { sortedPublications, researchProfiles } from "@/content/publications";
import { site } from "@/content/site";
import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { CopyText } from "@/components/ui/CopyText";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Research",
  description:
    "HCI research spanning AI and trust, human-robot interaction, and player experience in games.",
};

export default function ResearchIndexPage() {
  const projects = getProjectsByTrack("research");
  const flagship = projects.filter((project) => project.isFlagship);
  const rest = projects.filter((project) => !project.isFlagship);

  return (
    <Section density="open">
      {/* Previously named only Lumi's own topic (trust, AI, public
          services), which read as if it were the whole Research track
          rather than one of three entries -- RoboCarnival (multimodal
          human-robot interaction) and the game-difficulty study (player
          experience research) were left out entirely. Rewritten to
          name all three, honestly, without forcing them into one fake
          unified topic. */}
      <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        Index · {projects.length} studies
      </p>
      <Heading level={1} className="mt-3">
        Research
      </Heading>
      <Text muted className="mt-4 max-w-[var(--measure)]">
        HCI research spanning AI and trust, human-robot interaction, and
        player experience in games.
      </Text>
      {/* Resume Strategy milestone (Resume-Strategy-Research.md, Option
          D) originally placed a quiet "view my academic CV" line here,
          next to the content that makes it relevant. Removed: the
          /resume page already carries the same link ("Looking for a
          fuller academic record instead? View my academic CV."), so
          this was the same fact stated twice on the site for no added
          reason -- one honest placement is enough. */}
      {/* Same reasoning as the Work index: the single flagship (Lumi)
          gets a full-width feature row instead of competing at equal
          size with the other two research entries.

          Visual Polish milestone: `rest` currently has exactly 2
          entries (RoboCarnival, Tailoring Game Difficulty to Player
          Types). The Work index's equivalent col-span-4 works there
          because 12/4 divides evenly into 3 full rows for 6 items;
          with only 2 items here, that same col-span-4 left one item on
          its own row with two empty column-tracks beside it at lg.
          col-span-6 gives these two entries an even, two-up row that
          fills the full 12 columns instead. */}
      <Grid className="mt-12" gap="lg">
        {flagship.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-8 lg:col-span-12">
            <ProjectCard project={project} wide />
          </div>
        ))}
        {rest.map((project) => (
          <div key={project.slug} className="col-span-4 md:col-span-4 lg:col-span-6">
            <ProjectCard project={project} />
          </div>
        ))}
      </Grid>

      {/* Phase 4: publications, ready for Published, Accepted and Under
          review as papers come; for now the thesis. */}
      <section aria-labelledby="publications" className="mt-24 border-t border-[var(--color-border)] pt-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="publications" className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.12]">
              Publications
            </h2>
            <p className="mt-3 max-w-sm text-sm text-[var(--color-text-muted)]">
              Parts of the Lumi study are being prepared for academic publication. New papers will
              appear here.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {researchProfiles.map((profile) => (
                <li key={profile.href}>
                  <a href={profile.href} target="_blank" rel="noreferrer" className="link-ink font-medium">
                    {profile.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.academicCvUrl} target="_blank" rel="noreferrer" className="link-ink font-medium">
                  Academic CV
                </a>
              </li>
            </ul>
          </div>
          <ol className="lg:col-span-8">
            {sortedPublications().map((publication) => (
              <li key={publication.citation} className="border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-0">
                <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  {publication.status}
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-relaxed">
                  {renderInlineMarkdown(publication.citation)}
                </p>
                {publication.detail && (
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{publication.detail}</p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <CopyText text={publication.citation.replace(/\*/g, "")} label="Copy citation" />
                  {publication.href && (
                    <Link href={publication.href} className="group inline-flex items-center gap-2 text-sm font-medium">
                      <span className="link-ink">{publication.hrefLabel ?? "Read more"}</span>
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Section>
  );
}

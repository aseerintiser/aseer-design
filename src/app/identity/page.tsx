import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MetaRow } from "@/components/ui/MetaRow";
import { TrustMark } from "@/components/ui/TrustMark";
import { MarkReplay } from "@/components/identity/MarkReplay";
import { SpeedDemo } from "@/components/identity/SpeedDemo";
import { site } from "@/content/site";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projectSummaries } from "@/content/projects";

/**
 * Phase 1 review page: the identity system in one place, so it can be
 * judged as a whole before the homepage and case studies are rebuilt on
 * it. Not linked from anywhere, kept out of the sitemap, and marked
 * noindex, so visitors and search engines never land here.
 */
export const metadata: Metadata = {
  title: "Identity review",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "Paper", hex: "#F3F2EE", note: "Reading pages", ink: true },
  { name: "Ink", hex: "#16140F", note: "Text 16.4:1 on paper", ink: false },
  { name: "Muted", hex: "#58544A", note: "Secondary text 6.7:1", ink: false },
  { name: "Night", hex: "#0E0E0C", note: "The screening room", ink: false },
  { name: "Signal", hex: "#FFD84A", note: "Always behind ink, 13.5:1", ink: true },
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
      {children}
    </p>
  );
}

export default function IdentityPage() {
  return (
    <>
      <Section density="open">
        <Eyebrow>Phase 1 review · not linked from the site</Eyebrow>
        <Heading level={1} className="mt-3 max-w-4xl">
          The identity, in one place
        </Heading>
        <Text size="lead" muted className="mt-6 max-w-[var(--measure)]">
          Type, color, the mark, the two motion speeds and the project stages that every page
          will be rebuilt on.
        </Text>
      </Section>

      <Section tone="dark" density="open">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MarkReplay />
          <div className="max-w-[var(--measure)]">
            <Label>The mark · the trust line</Label>
            <Heading level={2} className="mt-3">
              A slow climb, a sudden fall, the climb back.
            </Heading>
            <Text muted className="mt-5">
              Trust in anything people rely on is earned step by step and lost in a moment.
              Careful design earns it back. The line draws in that same rhythm, once, when a page
              loads.
            </Text>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] px-8 py-7">
            <TrustMark className="w-10" />
            <span className="font-[family-name:var(--font-display)] text-[2rem] leading-none tracking-[-0.01em]">
              Aseer
            </span>
          </div>
          <div
            className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-[#f3f2ee] px-8 py-7 text-[#16140f] [--color-mark:#16140f]"
          >
            <TrustMark className="w-10" />
            <span className="font-[family-name:var(--font-display)] text-[2rem] leading-none tracking-[-0.01em]">
              Aseer
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end gap-6">
          {[16, 32, 64].map((size) => (
            <figure key={size} className="flex flex-col items-center gap-2">
              <span className="flex h-24 w-24 items-center justify-center rounded-[var(--radius-md)] bg-[#e4e1d8]">
                {/* eslint-disable-next-line @next/next/no-img-element -- shows the raw favicon file at true pixel size */}
                <img src="/icon.svg" width={size} height={size} alt="" />
              </span>
              <figcaption className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                {size}px
              </figcaption>
            </figure>
          ))}
          <figure className="flex flex-col items-center gap-2">
            <span className="flex h-24 w-24 items-center justify-center rounded-[var(--radius-md)] bg-[#e4e1d8]">
              {/* eslint-disable-next-line @next/next/no-img-element -- shows the raw icon file at true pixel size */}
              <img src="/apple-icon.png" width={64} height={64} alt="" className="rounded-[14px]" />
            </span>
            <figcaption className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
              Home screen
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section density="open">
        <Label>Type</Label>
        <p className="mt-6 max-w-5xl font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[1.02] font-[420] tracking-[-0.025em]">
          Designing digital products people <mark className="italic">trust</mark>, grounded in
          research.
        </p>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div>
            <Label>Newsreader · display</Label>
            <p className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.12] font-[450] tracking-[-0.012em]">
              Headlines, quotes and <em>emphasis in italics</em>.
            </p>
          </div>
          <div>
            <Label>Schibsted Grotesk · text and interface</Label>
            <p className="mt-4 text-base leading-relaxed">
              {/* Real bio copy from content/site.ts, so the specimen shows
                  actual reading conditions rather than filler text. */}
              With a background in Software Engineering and a Master&apos;s in Human-Technology
              Interaction, I&apos;ve designed for Convay, a video conferencing platform trusted by
              governments and global teams in 45+ countries.
            </p>
          </div>
          <div>
            <Label>IBM Plex Mono · evidence</Label>
            <div className="mt-4">
              <MetaRow
                className="sm:grid-cols-2"
                items={[
                  { label: "Role", value: site.title },
                  { label: "Based in", value: "Tampere, Finland" },
                  { label: "M.Sc.", value: "July 2026" },
                  { label: "Grade", value: "Distinction" },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <Label>Color</Label>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((swatch) => (
            <li
              key={swatch.name}
              className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div
                className="flex h-24 items-end p-3 font-[family-name:var(--font-display)] text-2xl"
                style={{ backgroundColor: swatch.hex, color: swatch.ink ? "#16140f" : "#f2f0ea" }}
              >
                Aa
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{swatch.name}</p>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                  {swatch.hex}
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">{swatch.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <Label>Stages · every project, one family</Label>
        <Text muted className="mt-3 max-w-[var(--measure)]">
          Hover a card (or tab to it) to play its loop. On a phone, a card plays while it sits in
          the middle of the screen.
        </Text>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectSummaries.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <Label>Motion · two speeds</Label>
        <div className="mt-6">
          <SpeedDemo />
        </div>
      </Section>

      <Section density="default" className="border-t border-[var(--color-border)]">
        <Label>Interaction on paper</Label>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button href="/work">See the work</Button>
          <Button href="/research" variant="secondary">
            Read the research
          </Button>
        </div>
        <Text className="mt-6 max-w-[var(--measure)]">
          Inline links like <Link href="/about" className="link-ink">how I got here</Link> rest as ink
          with a quiet underline, and pick up the highlighter on hover or focus. Select any text on
          this page to see the same mark.
        </Text>
      </Section>

      <Section tone="dark" density="default">
        <Label>Interaction on night</Label>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button href="/work">See the work</Button>
          <Button href="/research" variant="secondary">
            Read the research
          </Button>
        </div>
        <Text className="mt-6 max-w-[var(--measure)]">
          On night the signal becomes the action color: dark ink on yellow, 13.5:1. Links like{" "}
          <Link href="/about" className="link-ink">how I got here</Link> behave the same way as on paper.
        </Text>
      </Section>
    </>
  );
}

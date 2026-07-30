import type { EvidenceStatus } from "@/components/ui/EvidenceStatusTag";

export type Track = "work" | "research";

/**
 * A single sourced metric, always paired with an evidence status. Content
 * modules should prefer this shape over a bare string whenever a number
 * is involved, so the EvidenceStatusTag can never be silently dropped.
 */
export interface SourcedMetric {
  label: string;
  value: string;
  status: EvidenceStatus;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  track: Track;
  /** One honest line, not a pitch. Placeholder until real per-project
   * copy is written (Milestones 4-7 per the content architecture
   * blueprint's writing order). */
  oneLineScope: string;
  /** Rough project scale, used for the Work/Research index scope
   * indicator (Blueprint: "feature-level vs. platform-level"). */
  scale: "feature" | "product" | "platform" | "research";
  isFlagship?: boolean;
  /** True for projects still pending a keep/cut/reframe decision
   * (e.g. TravelMate AI, per Master_Portfolio_Knowledge_Base.md
   * Section 3). Rendered with a distinct, honest placeholder state
   * rather than being silently included as finished content. */
  status?: "draft" | "contingent";
  /** Milestone 3: a real screenshot/GIF from the case study itself, used
   * by ProjectCard instead of the generated ProjectVisual placeholder.
   * Only set for migrated case studies that open with a clean,
   * card-shaped (roughly 4:3) hero shot -- a portrait-orientation app
   * screenshot forced into a 4:3 card would crop badly, so those
   * projects intentionally keep the honest generated placeholder rather
   * than a bad crop of a real asset. See content/projects.ts for the
   * per-project reasoning. */
  thumbnail?: { src: string; width: number; height: number; alt: string };
}

export interface CaseStudyMeta {
  role: string;
  team: string;
  duration: string;
  tools: string;
}

/**
 * Rich body content for migrated case studies (Milestone 2). Live
 * aseer.design case studies don't follow a uniform section structure --
 * each project has its own organic heading sequence ("Convay at a
 * Glance", "The Problem", "Design Process & Reasoning", etc.) mixed with
 * paragraphs, bullet lists, pull quotes, and image galleries. This is a
 * block-based schema so that structure can be preserved exactly as
 * migrated, rather than force-fitting live content into the abstract
 * seven-section framework meant for *future* case-study writing
 * (Portfolio_Strategy_Roadmap.md Section 12).
 *
 * `text` fields may contain literal **bold** and *italic* markers,
 * migrated verbatim from the source site's markdown-like formatting --
 * rendered via `renderInlineMarkdown` (src/lib/inline-markdown.tsx),
 * not stripped, since that emphasis is part of the original voice.
 */
export type CaseStudyBlock =
  | { type: "heading"; level: 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
      caption?: string;
    }
  | {
      type: "imageRow";
      images: { src: string; width: number; height: number; alt: string }[];
    }
  | { type: "link"; text: string; href: string }
  | {
      /** Lumi Milestone B: grouped, tap-to-reveal content -- e.g. design
       * principles or themes organized into named clusters, each stating
       * a label by default and one line of rationale on demand. Renders
       * via RevealGroup/RevealItem. Only use this when every item has
       * real, already-written detail text -- never invent a rationale
       * just to populate the shape (see Lumi's own findings-diagram
       * section, which deliberately does NOT use this block because
       * that content doesn't exist yet). */
      type: "revealGroup";
      groups: {
        heading?: string;
        items: { label: string; detail: string }[];
      }[];
    }
  | {
      /** A single passage that deserves its own visual weight (a subtle
       * background/contrast shift) rather than blending into the
       * section's inherited tone -- for a case study's one pivotal
       * moment, not a decorative highlight used repeatedly. */
      type: "callout";
      text: string;
    }
  | {
      /** A minimal visual break between two beats inside the same
       * section, for when a new heading would be too heavy-handed but a
       * plain paragraph break isn't enough. */
      type: "divider";
    }
  | {
      /** An ordered sequence of short labeled steps -- a research
       * methodology's pilot-to-main-study arc, or a product's process
       * phases. Horizontal on desktop, vertical on mobile. */
      type: "timeline";
      steps: { label: string; detail?: string }[];
    }
  | {
      /** A small icon-plus-label link card for a closing invitation
       * ("read the full thesis," "request a demo") -- more deliberate
       * than the plain underlined `link` block above, without being a
       * full button. */
      type: "linkCard";
      text: string;
      href: string;
    };

/**
 * Full case-study content, following the seven-section framework from
 * Portfolio_Content_Architecture_Blueprint.md Part 5. Body fields are
 * intentionally left as short placeholders for this milestone; the
 * instruction for Milestone 1 is foundation and structure, not finished
 * portfolio copy.
 */
export interface CaseStudy extends ProjectSummary {
  meta: CaseStudyMeta;
  // These six are optional because migrated ("complete") case studies
  // use `body` instead -- see below. Still required in practice for
  // "placeholder" case studies (the not-yet-written research track).
  context?: string;
  roleAndCollaboration?: string;
  decisions?: { title: string; body: string }[];
  evidence?: { body: string; metrics?: SourcedMetric[] };
  outcome?: { body: string; metrics?: SourcedMetric[] };
  reflection?: string;
  /** "placeholder" means the six narrative fields above are all still
   * the same generic filler sentence, not real case-study writing.
   * "complete" means real content has been migrated -- CaseStudyLayout
   * renders `body` (see below) instead of the six flat fields, which are
   * ignored once `body` is present. CaseStudyLayout uses this to render
   * one honest, well-designed "in progress" state instead of pretending
   * there are six distinct finished sections that all happen to say the
   * same thing -- repeating identical filler six times per case study
   * (and identically across every case study) reads as an abandoned
   * template, which is a worse impression than one clear, deliberate
   * "not written yet" panel. */
  contentStatus?: "placeholder" | "complete";
  /** Real, migrated case-study content (Milestone 2). See CaseStudyBlock
   * above for why this is block-based rather than the flat fields. Only
   * present when contentStatus is "complete". */
  body?: CaseStudyBlock[];
  /** Verbatim from the live site's CATEGORY / ROLE lines, which are
   * richer (multiple values) than the single-string `meta.role` field
   * designed for the not-yet-written research case studies. Shown
   * instead of meta.role/team when present. */
  liveMeta?: {
    category: string[];
    role: string[];
    tools: string[];
  };
}

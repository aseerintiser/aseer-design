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
  | {
      type: "paragraph";
      text: string;
      /** Convay Mobile App Revamp rebuild: "caption" renders small,
       * muted, and centered, for the one-line caption under the hero
       * visual (04_Visual_Specification.md). Omit for every ordinary
       * paragraph, which keeps today's exact rendering. */
      variant?: "caption";
    }
  | { type: "list"; items: string[] }
  | {
      type: "quote";
      text: string;
      attribution?: string;
      /** Convay Mobile App Revamp rebuild: "large" gives a case study's
       * one true closing line more visual weight than every other quote
       * on the page, per 04_Visual_Specification.md ("the only place in
       * the whole spec where a visual element should look deliberately
       * different from its siblings"). Omit for every ordinary quote. */
      size?: "default" | "large";
    }
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
      caption?: string;
      /** Media Experience milestone: every image/imageRow block is
       * click-to-enlarge by default (CaseStudyImage/ImageRow both open
       * the shared Lightbox), since case-study images are screenshots,
       * prototypes, and diagrams people genuinely want to inspect
       * closer. Set to `false` for the rare purely decorative image
       * where enlarging adds nothing. */
      enlargeable?: boolean;
    }
  | {
      type: "imageRow";
      images: { src: string; width: number; height: number; alt: string }[];
      enlargeable?: boolean;
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
      /** Convay Mobile App Revamp rebuild: a compact, honest before/after
       * comparison built entirely from labeled text steps, no images.
       * Exists specifically so a claim like "five taps became three" is
       * shown, not just stated. `oldSteps`/`newSteps` are plain labels,
       * not screenshots -- see 06_Assets_Checklist.md's explicit rule
       * against ever recreating a screenshot of a since-replaced flow to
       * make a comparison look more dramatic than the real evidence
       * supports. Generic enough for any future case study with a real,
       * countable before/after change to reuse, not Convay-specific by
       * construction. */
      type: "beforeAfterFlow";
      oldLabel: string;
      oldSteps: string[];
      newLabel: string;
      newSteps: string[];
    }
  | {
      /** Convay Mobile App Revamp rebuild: a small synthesized list of
       * research pain points, each with a one-line note grounding it in
       * what the surrounding case-study text already says. Exists to
       * give a text-heavy research section one piece of visual evidence
       * without inventing a chart or diagram the underlying research
       * doesn't support -- see 06_Assets_Checklist.md's "research
       * synthesis artifact" spec. Generic and content-agnostic, like
       * revealGroup/timeline above. */
      type: "painPointList";
      items: { label: string; note: string }[];
    }
  | {
      /** Convay AI for Physical Meetings rebuild: a plain, labeled
       * two-column diagram (e.g. "online meetings" vs. "physical
       * meetings"), built from tokens rather than a photographic or
       * illustrative asset -- gives a text-only section a visual anchor
       * without fabricating a product screenshot that doesn't exist
       * (06_Assets_Checklist.md). Generic and content-agnostic, like
       * beforeAfterFlow/painPointList above. */
      type: "twoColumnCompare";
      leftLabel: string;
      leftText: string;
      rightLabel: string;
      rightText: string;
      caption?: string;
    }
  | {
      /** Convay AI for Physical Meetings rebuild: a real ordered-list
       * step sequence, replacing an inline "step 1 -> step 2 -> ..."
       * italic text with an actual visual diagram
       * (04_Visual_Specification.md). Renders via the existing Timeline
       * component (node-and-connecting-line, not a bespoke chip-and-
       * arrow layout -- an earlier version built its own and it broke
       * visually on wrap). `steps` is a plain string array here since
       * Timeline's own `detail` field isn't needed for a short label-only
       * sequence. Generic and content-agnostic; any case study
       * describing a linear flow in prose only is a candidate. */
      type: "flowSteps";
      steps: string[];
    }
  | {
      /** Convay AI for Physical Meetings rebuild: a true side-by-side
       * A/B comparison, replacing two screenshots that were previously
       * stacked far apart on the page. Deliberately does not reveal
       * which variant "won" -- that result belongs in whatever section
       * already states it with a real number, per
       * 03_Content_Final.md/05_Interaction_and_Motion.md. `variants`
       * should have exactly two entries in practice, but isn't
       * type-limited to two, in case a future case study compares three
       * real candidates. Renders via VariantComparison; clicking either
       * image opens the lightbox scoped to just this pair. */
      type: "variantComparison";
      label?: string;
      variants: { src: string; width: number; height: number; alt: string; caption: string }[];
    }
  | {
      /** Convay AI for Physical Meetings rebuild: one labeled phase of a
       * longer screen-by-screen walkthrough (e.g. "Setup," "Record"),
       * rendered as a compact filmstrip with a phase label, a one-
       * sentence intro, and per-image captions -- replaces a single
       * continuous stack of full-bleed screenshots with a grouped,
       * scannable sequence (02_Information_Architecture.md,
       * 04_Visual_Specification.md). Renders via PhaseFilmstrip;
       * clicking any thumbnail opens the lightbox scoped to just this
       * phase's images, so navigation doesn't cross into an unrelated
       * group (05_Interaction_and_Motion.md). */
      type: "phaseGroup";
      label: string;
      intro: string;
      images: { src: string; width: number; height: number; alt: string; caption: string }[];
    }
  | {
      /** Convay AI for Physical Meetings rebuild: the hero establishing
       * animation with a `prefers-reduced-motion` fallback. A looping
       * GIF can't itself respond to that media query, so this swaps the
       * whole image via `<picture><source media="(prefers-reduced-
       * motion: reduce)">` (05_Interaction_and_Motion.md: "a hard
       * requirement, not a nice-to-have"). Renders via ReducedMotionHero.
       * `gifAlt`/`fallbackAlt` are separate since the fallback is a
       * single still frame, not a looping mosaic, and deserves its own
       * accurate description. */
      type: "reducedMotionHero";
      gifSrc: string;
      fallbackSrc: string;
      width: number;
      height: number;
      gifAlt: string;
      fallbackAlt: string;
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
    }
  | {
      /** Click-to-play video: a static poster until the reader starts
       * it, plays once, no loop, muted. For a recorded interaction
       * (e.g. an off-script question triggering an AI fallback) where a
       * native, always-looping, unmutable .gif can't express "plays
       * once, no loop." Renders via ControlledMedia. */
      type: "video";
      src: string;
      poster: string;
      width: number;
      height: number;
      alt: string;
      caption?: string;
    }
  | {
      /** A small, bespoke interactive component embedded in the body,
       * for the rare passage where letting the reader try the finding
       * themselves says it more clearly than more prose. Unlike the
       * generic, data-driven block types above (revealGroup, timeline,
       * etc.), this is deliberately keyed to a specific named component
       * registered in CaseStudyBody.tsx, since a real interactive demo
       * is necessarily bespoke to the finding it demonstrates, not a
       * reusable shape other case studies would plug arbitrary data
       * into. Use sparingly, one real, well-earned moment, not a
       * pattern to reach for often. */
      type: "interactive";
      key: "lumi-trust-asymmetry";
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
    /** Convay Mobile App Revamp rebuild: an optional 5th meta-row field
     * stating a project's real ship status plainly, in the meta row,
     * rather than disclosing it mid-paragraph deep in an outcome
     * section (01_Audit.md's top-priority finding for this rebuild).
     * Plain text, no badge/pill treatment, so it doesn't read as either
     * an alarm or an achievement -- matching Role/Category/Duration/
     * Tools' own plainness (05_Interaction_and_Motion.md). Optional and
     * additive: every other case study's meta row is byte-for-byte
     * unchanged without it. */
    status?: string;
  };
  /** Convay Mobile App Revamp rebuild: tightens the gap between the
   * header and the first body section for this one case study, where
   * the header and the hero visual are meant to read as one continuous
   * hero moment rather than two independently-padded sections stacked
   * back to back (01_Audit.md: "roughly 1,000px of empty vertical space
   * between the meta row and the first hero visual"). Defaults to
   * false/undefined everywhere else, so no other case study's spacing
   * changes because of this field's existence. */
  compactHero?: boolean;
  /** Convay Mobile App Revamp rebuild: an optional "next case study"
   * link rendered after the body, before the shared sitewide Footer, so
   * a reader who reaches the end of one case study has somewhere to go
   * next instead of the page dead-ending (01_Audit.md finding). Kept as
   * a per-case-study field rather than a Footer change specifically so
   * it doesn't touch the shared Footer component or any other page. */
  nextCaseStudy?: { title: string; href: string };
  /** Convay AI for Physical Meetings rebuild: decorative publication
   * marks for the shared "Convay at a Glance" References & Mentions
   * links (06_Assets_Checklist.md). `convayAtAGlance` in content/
   * projects.ts is one shared block reused byte-identical across four
   * Convay case studies specifically so its text can't drift between
   * them -- adding marks by editing that shared block directly would
   * put them on all four pages instead of just this one. Keeping marks
   * as a per-case-study, keyed-by-link-text lookup instead means the
   * shared block itself stays completely untouched, and every other
   * case study's References row renders byte-for-byte as before. Marks
   * are decorative (rendered with `alt`/`aria-hidden`, per the
   * checklist): the adjacent link text already names the publication. */
  referenceMarks?: Record<string, string>;
}

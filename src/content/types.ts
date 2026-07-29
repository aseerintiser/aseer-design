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
}

export interface CaseStudyMeta {
  role: string;
  team: string;
  duration: string;
  tools: string;
}

/**
 * Full case-study content, following the seven-section framework from
 * Portfolio_Content_Architecture_Blueprint.md Part 5. Body fields are
 * intentionally left as short placeholders for this milestone; the
 * instruction for Milestone 1 is foundation and structure, not finished
 * portfolio copy.
 */
export interface CaseStudy extends ProjectSummary {
  meta: CaseStudyMeta;
  context: string;
  roleAndCollaboration: string;
  decisions: { title: string; body: string }[];
  evidence: { body: string; metrics?: SourcedMetric[] };
  outcome: { body: string; metrics?: SourcedMetric[] };
  reflection: string;
}

import { renderInlineMarkdown } from "@/lib/inline-markdown";

interface CalloutProps {
  text: string;
}

/**
 * A single passage rendered in its own panel -- a subtle background
 * shift and left accent, rather than a plain paragraph -- for the one
 * moment in a case study that deserves more visual weight than anything
 * around it. Generic and content-agnostic: any future case study's own
 * pivotal moment can reach for this, not just Lumi's.
 *
 * Deliberately restrained (a tint and a border, not a color change or an
 * icon) so it reads as "the writer paused here on purpose," not as a
 * warning or alert style borrowed from product UI.
 */
export function Callout({ text }: CalloutProps) {
  return (
    <div className="mt-6 rounded-[var(--radius-lg)] border-l-2 border-[var(--color-accent)] bg-[var(--color-bg-subtle)] px-6 py-5">
      <p className="text-[var(--color-text)]">{renderInlineMarkdown(text)}</p>
    </div>
  );
}

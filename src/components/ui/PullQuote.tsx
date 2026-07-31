import { renderInlineMarkdown } from "@/lib/inline-markdown";

interface PullQuoteProps {
  text: string;
  attribution?: string;
}

/**
 * Stylized pull quote for migrated case-study content (Milestone 2) --
 * live case studies use these constantly for PM/tester/developer
 * quotes and closing reflections. A left accent bar plus display-font
 * italic treatment gives it real visual weight instead of rendering as
 * an anonymous indented paragraph.
 */
export function PullQuote({ text, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-l-2 border-[var(--color-accent)] py-1 pl-6">
      <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lead)] leading-snug text-[var(--color-text)] italic">
        {renderInlineMarkdown(text)}
      </p>
      {attribution && (
        // Typography cleanup milestone: dropped the leading em dash --
        // the smaller, muted, non-italic footer treatment already
        // distinguishes this from the quote itself, so the attribution
        // doesn't need a dash to read as one.
        <footer className="mt-3 text-sm text-[var(--color-text-muted)] not-italic">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}

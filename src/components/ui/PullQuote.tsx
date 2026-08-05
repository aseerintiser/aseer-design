import { renderInlineMarkdown } from "@/lib/inline-markdown";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  text: string;
  attribution?: string;
  /** Convay Mobile App Revamp rebuild: the standard treatment gives
   * every pull quote on a page equal visual weight, which is correct
   * almost everywhere, but 04_Visual_Specification.md calls out one
   * specific exception -- a case study's single closing line, when it's
   * doing more narrative work than any other quote around it, should
   * look deliberately different, not just be one more instance of the
   * same pattern. "large" centers the quote, drops the left rule (extra
   * white space reads as weight here instead), and steps the size up
   * one modest notch above the default lead size -- large enough to
   * read as deliberate, not so large that a short sentence orphans a
   * single word onto its own line inside the narrow reading column;
   * `text-balance` keeps whatever wrapping does happen even rather than
   * front-loaded. Defaults to "default" so every existing call site is
   * completely unaffected. */
  size?: "default" | "large";
}

/**
 * Stylized pull quote for migrated case-study content (Milestone 2) --
 * live case studies use these constantly for PM/tester/developer
 * quotes and closing reflections. A left accent bar plus display-font
 * italic treatment gives it real visual weight instead of rendering as
 * an anonymous indented paragraph.
 */
export function PullQuote({ text, attribution, size = "default" }: PullQuoteProps) {
  const isLarge = size === "large";
  return (
    <blockquote
      className={cn(
        "py-1",
        isLarge
          ? "mx-auto max-w-2xl border-l-0 py-4 text-center"
          : "border-l-2 border-[var(--color-accent)] pl-6",
      )}
    >
      <p
        className={cn(
          "font-[family-name:var(--font-display)] leading-snug text-[var(--color-text)] italic",
          isLarge
            ? "text-balance text-[length:clamp(1.25rem,1.05rem+0.7vw,1.625rem)]"
            : "text-[length:var(--text-lead)]",
        )}
      >
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

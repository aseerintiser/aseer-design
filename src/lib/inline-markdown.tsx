import { Fragment } from "react";

/**
 * Renders the literal **bold** / *italic* markers found in migrated
 * case-study text (Milestone 2) as real <strong>/<em> elements, instead
 * of either stripping them (losing the source's own emphasis) or
 * printing the raw asterisks (looking broken). This is a formatting
 * concern, not a content rewrite -- the migration brief explicitly
 * allows formatting changes needed for the new component system.
 *
 * Deliberately minimal: only handles **bold**, *italic*, and the literal
 * newlines already present in the migrated strings. Not a general
 * markdown parser -- migrated content doesn't need one.
 */
export function renderInlineMarkdown(text: string) {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    // Bold first (**...**), then italic (*...*) within the remaining
    // plain segments, so "**a *b* c**" and "*a* **b**" both resolve
    // sensibly without one pattern eating the other's delimiters.
    const boldSplit = line.split(/(\*\*[^*]+\*\*)/g);

    boldSplit.forEach((segment, segmentIndex) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        tokens.push(
          <strong key={`${lineIndex}-${segmentIndex}`}>
            {segment.slice(2, -2)}
          </strong>,
        );
        return;
      }

      const italicSplit = segment.split(/(\*[^*]+\*)/g);
      italicSplit.forEach((italicSegment, italicIndex) => {
        if (italicSegment.startsWith("*") && italicSegment.endsWith("*") && italicSegment.length > 1) {
          tokens.push(
            <em key={`${lineIndex}-${segmentIndex}-${italicIndex}`}>
              {italicSegment.slice(1, -1)}
            </em>,
          );
        } else if (italicSegment) {
          tokens.push(
            <Fragment key={`${lineIndex}-${segmentIndex}-${italicIndex}`}>
              {italicSegment}
            </Fragment>,
          );
        }
      });
    });

    return (
      <Fragment key={lineIndex}>
        {lineIndex > 0 && <br />}
        {tokens}
      </Fragment>
    );
  });
}

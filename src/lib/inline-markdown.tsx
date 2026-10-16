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
/** Evidence-layer claims: `[[claim text|id]]`. */
const CLAIM = /(\[\[[^\]|]+\|[a-z0-9-]+\]\])/g;

/** The ids of the claims marked in a piece of text, in order. */
export function claimIds(text: string) {
  return [...text.matchAll(/\[\[[^\]|]+\|([a-z0-9-]+)\]\]/g)].map((match) => match[1]!);
}

/**
 * Like renderInlineMarkdown, plus evidence-layer claims. `renderClaim`
 * receives the claim's id and its already-formatted content. Without a
 * renderer the markers are dropped and the claim reads as plain text.
 */
export function renderInlineWithClaims(
  text: string,
  renderClaim?: (id: string, content: React.ReactNode, key: string) => React.ReactNode,
) {
  if (!text.includes("[[")) return renderInlineMarkdown(text);
  return text.split(CLAIM).map((part, index) => {
    const match = part.match(/^\[\[([^\]|]+)\|([a-z0-9-]+)\]\]$/);
    if (!match) return <Fragment key={index}>{renderInlineMarkdown(part)}</Fragment>;
    const content = renderInlineMarkdown(match[1]!);
    return renderClaim ? (
      <Fragment key={index}>{renderClaim(match[2]!, content, String(index))}</Fragment>
    ) : (
      <Fragment key={index}>{content}</Fragment>
    );
  });
}

export function renderInlineMarkdown(source: string) {
  // Claim markers outside an evidence-aware renderer read as plain text.
  const text = source.includes("[[") ? source.replace(/\[\[([^\]|]+)\|[a-z0-9-]+\]\]/g, "$1") : source;
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

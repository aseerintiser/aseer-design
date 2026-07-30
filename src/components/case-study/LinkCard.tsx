import { ArrowIcon } from "@/components/ui/ArrowIcon";

interface LinkCardProps {
  text: string;
  href: string;
}

/**
 * A small icon-plus-label link card, for a closing invitation ("read
 * the full thesis," "request a demo") that deserves more visual weight
 * than the plain underlined `link` block used for inline references.
 * Generic: reusable anywhere a case study wants its closing link (or
 * any single standout link) to read as a real card, not a footnote.
 */
export function LinkCard({ text, href }: LinkCardProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group mt-6 flex max-w-md items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-text)]"
    >
      <span className="font-medium text-[var(--color-text)]">{text}</span>
      <ArrowIcon className="h-4 w-4 shrink-0 text-[var(--color-accent)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
    </a>
  );
}

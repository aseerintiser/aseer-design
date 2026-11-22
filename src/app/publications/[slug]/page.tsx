import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CopyText } from "@/components/ui/CopyText";
import { getPublicationPage, publicationPages } from "@/content/publications";
import { site } from "@/content/site";

const siteUrl = "https://aseer.design";

/**
 * One page per paper that may be hosted here, built for Google Scholar's
 * inclusion guidelines: the abstract visible on the page, the full text
 * as a PDF on the same site, and the citation_* meta tags Scholar reads
 * (title, each author, date, venue, PDF). Indexable and in the sitemap,
 * unlike the research profile, so Scholar's crawler can find it.
 */
export function generateStaticParams() {
  return publicationPages().map(({ page }) => ({ slug: page.slug }));
}

/** Scholar prefers "Last, First"; the last word is the family name. */
function scholarName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return name;
  // Compound family names Scholar should keep together.
  if (name === "Amir Pakpour Haji Agha") return "Pakpour Haji Agha, Amir";
  return `${parts[parts.length - 1]}, ${parts.slice(0, -1).join(" ")}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPublicationPage(slug);
  if (!entry) return {};
  const { page } = entry;
  const url = `/publications/${page.slug}`;
  const description = page.abstract.slice(0, 200).replace(/\s+\S*$/, "") + "…";

  const citation: Record<string, string | string[]> = {
    citation_title: page.title,
    citation_author: page.authors.map(scholarName),
    citation_publication_date: page.date,
    citation_conference_title: page.venue,
    citation_publisher: page.publisher,
    citation_pdf_url: `${siteUrl}${page.pdf}`,
    citation_abstract_html_url: `${siteUrl}${url}`,
    citation_language: "en",
    citation_keywords: page.keywords.join("; "),
  };
  if (page.doi) citation.citation_doi = page.doi;

  return {
    title: page.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: page.title,
      description,
      url,
    },
    other: citation,
  };
}

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase";

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getPublicationPage(slug);
  if (!entry) notFound();
  const { publication, page } = entry;
  const year = page.date.slice(0, 4);

  return (
    <Section density="open">
      <article className="max-w-[var(--measure)]">
        <p className={label}>{publication.label ?? publication.status}</p>
        <Heading level={1} className="mt-3 text-balance">
          {page.title}
        </Heading>
        <p className="mt-5 text-[1.0625rem] font-medium">{page.authors.join(", ")}</p>
        <p className="mt-1.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
          {page.venue} · {page.publisher} · {year}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={page.pdf} className="group inline-flex items-center gap-2 text-sm font-medium">
            <span className="link-ink">Read the paper (PDF)</span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
          </a>
          {page.doi && (
            <a
              href={`https://doi.org/${page.doi}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              <span className="link-ink">DOI: {page.doi}</span>
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <CopyText text={publication.citation.replace(/\*/g, "")} label="Copy citation" />
        </div>

        <h2 className={`${label} mt-12`}>Abstract</h2>
        <Text className="mt-3">{page.abstract}</Text>

        <h2 className={`${label} mt-10`}>Keywords</h2>
        <Text muted className="mt-3">
          {page.keywords.join(", ")}
        </Text>

        {page.licence && (
          <p className="mt-10 text-sm text-[var(--color-text-muted)]">
            Published under a {page.licence} licence. Copyright held by the authors.
          </p>
        )}

        <div className="mt-12 border-t border-[var(--color-border)] pt-6">
          <Link href="/research" className="group inline-flex items-center gap-2 text-sm font-medium">
            <span className="link-ink">All research and publications</span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
          </Link>
        </div>
      </article>
    </Section>
  );
}

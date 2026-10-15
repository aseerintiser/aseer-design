/**
 * Publications and theses (Phase 4). Ready for papers as they come: add
 * an entry with status "Published", "Accepted" or "Under review" and it
 * appears on the Research page in that order, without a redesign.
 *
 * The thesis entry matches the title page and abstract of the submitted
 * thesis (Tampere University, June 2026). Profile links are the ones in
 * Aseer's career archive.
 */

export type PublicationStatus = "Published" | "Accepted" | "Under review" | "Thesis";

export interface Publication {
  status: PublicationStatus;
  /** Formatted reference; *asterisks* mark the italic title. */
  citation: string;
  detail?: string;
  href?: string;
  hrefLabel?: string;
}

export const publications: Publication[] = [
  {
    status: "Thesis",
    citation:
      "Intiser, M. A. (2026). *Affective dimensions of trust in conversational AI: A qualitative study of international students navigating public services in Finland* [Master's thesis, Tampere University].",
    detail: "M.Sc. in Human-Technology Interaction · graded 5/5 · full text on request",
    href: "/research/lumi",
    hrefLabel: "Read the Lumi case study",
  },
];

export const researchProfiles = [
  { label: "ORCID", href: "https://orcid.org/0009-0000-2642-8759" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=S6Ac7xUAAAAJ" },
];

const statusOrder: PublicationStatus[] = ["Published", "Accepted", "Under review", "Thesis"];

export function sortedPublications() {
  return [...publications].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );
}

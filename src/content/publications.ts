/**
 * Publications and theses (Phase 4). Ready for papers as they come: add
 * an entry with status "Published", "Accepted" or "Under review" and it
 * appears on the Research page in that order, without a redesign.
 *
 * The M.Sc. thesis entry matches the title page and abstract of the
 * submitted thesis (Tampere University, June 2026); the papers and the
 * B.Sc. thesis come from Aseer's CVs. Profile links are the ones in
 * Aseer's career archive.
 */

export type PublicationStatus = "Published" | "Accepted" | "Under review" | "Thesis";

export interface Publication {
  status: PublicationStatus;
  /** What the list shows above the citation; falls back to `status`. */
  label?: string;
  /** Formatted reference; *asterisks* mark the italic title. */
  citation: string;
  detail?: string;
  /** A page on this site about the work. */
  href?: string;
  hrefLabel?: string;
  /** Where the full text can be read. */
  fullText?: { label: string; href: string };
}

export const publications: Publication[] = [
  // Both papers are listed as under review at Aseer's request (October
  // 19, 2026). The Mindtrek paper has in fact been accepted, and Aseer
  // will switch it to "Published", with its DOI, once it is out.
  {
    status: "Under review",
    label: "Under review · Academic Mindtrek 2026",
    citation:
      "Intiser, M. A., Olsson, T., & Pakpour Haji Agha, A. (2026). *Recall-grounded scenarios: An approach for studying longitudinal user experiences in short sessions*. Manuscript under review, Academic Mindtrek 2026.",
    detail:
      "The method behind the M.Sc. thesis: participants recall an earlier period of their lives and use a prototype as that earlier self, so one short session can reach an experience that unfolded over months.",
  },
  {
    status: "Under review",
    label: "Under review · NSysS 2026",
    citation:
      "Intiser, M. A., & Poddar, S. (2026). *A human-centered security study of warnings for indirect prompt injection in AI assistants*. Manuscript under review, NSysS 2026.",
  },
  {
    status: "Thesis",
    label: "M.Sc. thesis · Tampere University",
    citation:
      "Intiser, M. A. (2026). *Affective dimensions of trust in conversational AI: A qualitative study of international students navigating public services in Finland* [Master's thesis, Tampere University].",
    detail: "M.Sc. in Human-Technology Interaction · graded 5/5",
    href: "/research/lumi",
    hrefLabel: "Read the Lumi case study",
    fullText: { label: "Full text on Trepo", href: "https://urn.fi/URN:NBN:fi:tuni-202606087129" },
  },
  // Authors and date as the IUT repository record lists them (issued May
  // 30, 2023). Figures from Aseer's academic CV.
  {
    status: "Thesis",
    label: "B.Sc. thesis · Islamic University of Technology",
    citation:
      "Intiser, M. A., Islam, M. M., & Salehin, M. R. (2023). *A diverse and explainable multi-hop QA dataset for Bengali language* [Bachelor's thesis, Islamic University of Technology].",
    detail:
      "1,351 passages and 1,874 question-answer pairs: the first multi-hop QA dataset in Bengali, benchmarked at 42% exact match and 49% F1.",
    fullText: {
      label: "Full text in the IUT repository",
      href: "http://repository.iutoic-dhaka.edu/items/732e72c6-3642-4da4-be72-591d61b59e18",
    },
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

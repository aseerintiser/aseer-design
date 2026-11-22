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

export type PublicationStatus = "Published" | "Accepted" | "Under review" | "In preparation" | "Thesis";

/**
 * A publication that has its own page on this site (/publications/<slug>),
 * with the citation_* meta tags Google Scholar reads, so Scholar can index
 * the paper from here and link to the hosted PDF. Only for work whose
 * licence allows hosting it here (the Mindtrek paper is CC BY 4.0).
 */
export interface PublicationPage {
  slug: string;
  title: string;
  /** In citation order, "First Last". */
  authors: string[];
  venue: string;
  publisher: string;
  /** Scholar's format, YYYY/MM/DD. */
  date: string;
  abstract: string;
  keywords: string[];
  /** Path under public/. */
  pdf: string;
  doi?: string;
  licence?: string;
}

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
  /** Its own Scholar-ready page on this site, if it has one. */
  page?: PublicationPage;
}

export const publications: Publication[] = [
  // Peer reviewed and accepted (Academic Mindtrek 2026, ACM ICPS, CC BY 4.0).
  // Matches the academic CV of November 22, 2026: "To appear" with the DOI
  // until the ACM Digital Library entry goes live.
  {
    status: "Accepted",
    label: "Peer reviewed · Academic Mindtrek 2026 · ACM",
    citation:
      "Intiser, M. A., Olsson, T., & Pakpour Haji Agha, A. (2026). *Recall-grounded scenarios: An approach for studying longitudinal user experiences in short sessions*. In Proceedings of the 29th International Academic Mindtrek. ACM. To appear. https://doi.org/10.1145/3843148.3859356",
    detail:
      "The method behind the M.Sc. thesis: participants recall an earlier period of their lives and use a prototype as that earlier self, so one short session can reach an experience that unfolded over months.",
    href: "/publications/recall-grounded-scenarios",
    hrefLabel: "Abstract and details",
    fullText: { label: "Read the paper (PDF)", href: "/papers/intiser-2026-recall-grounded-scenarios.pdf" },
    page: {
      slug: "recall-grounded-scenarios",
      title: "Recall-Grounded Scenarios: An Approach for Studying Longitudinal User Experiences in Short Sessions",
      authors: ["Md Aseer Intiser", "Thomas Olsson", "Amir Pakpour Haji Agha"],
      venue: "29th International Academic Mindtrek (Mindtrek 2026)",
      publisher: "ACM",
      date: "2026/10/27",
      // Verbatim from the camera-ready paper.
      abstract:
        "Many experiences that matter for good design unfold over weeks or months, yet a typical HCI research session lasts tens of minutes. Studying such an experience within a single short session is therefore a methodological problem in its own right. It is not just a problem tied to one system or population. We report a recall-grounded scenario design developed to address this challenge, using international newcomers\u2019 months-long transition into Finnish public services as a case study. Participants were invited to re-enter their first months in Finland through a structured recall prompt. They then engaged four scenario-based interactions with a conversational assistant prototype, responding from that earlier self\u2019s perspective. The framing was renewed before each scenario. The design was refined across two pilot sessions that surfaced three problems, conversational dead-ends, overly open scenarios, and session fatigue, each addressed by a specific protocol change. Across fifteen main-study sessions of approximately 35 minutes each, fourteen of fifteen participants spontaneously compared the assistant to their own remembered lack of support on arrival. Their accounts also carried detail tied to specific remembered circumstances. We also report a disconfirming case, the evidence\u2019s limits, and the design\u2019s relevance to other single-session studies of transitions that matter for accessibility and inclusion.",
      keywords: [
        "qualitative methods",
        "scenario-based research",
        "retrospective recall",
        "newcomer experience",
        "single-session studies",
        "accessibility and inclusion",
        "human-computer interaction",
      ],
      pdf: "/papers/intiser-2026-recall-grounded-scenarios.pdf",
      doi: "10.1145/3843148.3859356",
      licence: "Creative Commons Attribution 4.0 International",
    },
  },
  // Manuscripts, as on the academic CV (November 22, 2026), with the
  // preprints Aseer shares from Google Drive.
  {
    status: "In preparation",
    label: "Manuscript · in preparation for INTERACT 2027",
    citation:
      "Intiser, M. A., Olsson, T., & Pakpour Haji Agha, A. (2026). *Trusted enough to check: How international students sustain trust in a conversational assistant for public-service navigation*. Manuscript in preparation.",
    detail: "Based on the M.Sc. thesis.",
    fullText: {
      label: "Preprint (PDF)",
      href: "https://drive.google.com/file/d/14M9GOu5IqarTKTKWZe9hfTUSV430V1D5/view?usp=sharing",
    },
  },
  {
    status: "In preparation",
    label: "Manuscript · in preparation for SOUPS 2027",
    citation:
      "Intiser, M. A., & Podder, S. (2026). *A human-centered security study of warnings for indirect prompt injection in AI assistants*. Manuscript in preparation.",
    fullText: {
      label: "Preprint (PDF)",
      href: "https://drive.google.com/file/d/1K4EPOmjGld3HU8yI2xqcvAQfIBr-aGS8/view?usp=sharing",
    },
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

const statusOrder: PublicationStatus[] = ["Published", "Accepted", "Under review", "In preparation", "Thesis"];

export function sortedPublications() {
  return [...publications].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );
}

/** Publications with their own Scholar-ready page. */
export function publicationPages() {
  return publications.flatMap((publication) => (publication.page ? [{ publication, page: publication.page }] : []));
}

export function getPublicationPage(slug: string) {
  return publicationPages().find((entry) => entry.page.slug === slug);
}

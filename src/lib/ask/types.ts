/** What a passage is about, so a question about a role, a result or
 * how to get in touch can find it even when the words differ. */
export type PassageKind =
  | "about"
  | "role"
  | "result"
  | "problem"
  | "decision"
  | "reflection"
  | "method"
  | "details"
  | "status"
  | "contact"
  | "education";

/** One passage of the site, as it reads on the page. */
export interface Passage {
  id: string;
  text: string;
  /** The page it is on, e.g. "Convay Mobile App Revamp". */
  page: string;
  /** Where on the page, e.g. "Outcome and Impact". */
  section: string;
  /** A link to that spot. */
  href: string;
  /** Extra words the passage answers to: its project and company. */
  project?: string;
  kinds?: PassageKind[];
  /** A small preference for summary lines over body text, all else equal. */
  prior?: number;
}

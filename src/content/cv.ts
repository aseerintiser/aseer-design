import { site } from "./site";

/**
 * The CV on the public site, and the short summary on the CV page, shared
 * with Ask the portfolio so both always say the same thing.
 *
 * The public site carries one CV. The academic CV is linked only from the
 * unlisted research profile (app/research-profile), which is the link
 * used in research and doctoral applications, so neither audience meets
 * a second CV aimed at someone else.
 */
export const publicCv = {
  label: "CV",
  title: "Experience, research and selected projects",
  body: "Design work at Convay and Kaz Software, my M.Sc. research at Tampere University, and selected projects.",
  href: site.resumeUrl,
} as const;

export const cvSummary = [
  { label: "Based in", value: "Tampere, Finland" },
  { label: "Education", value: "M.Sc. Human-Technology Interaction" },
  { label: "Status", value: "Open to relocation" },
  { label: "Contact", value: site.email },
] as const;

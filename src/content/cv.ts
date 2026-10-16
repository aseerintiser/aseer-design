import { site } from "./site";

/** The two CVs and the short summary on the CV page, shared with Ask the
 * portfolio so both always say the same thing. */
export const cvVersions = [
  {
    label: "Design CV",
    title: "Product design and UX roles",
    body: "Design experience at Convay and Kaz Software, with selected projects.",
    href: site.resumeUrl,
  },
  {
    label: "Academic CV",
    title: "Research roles and PhD applications",
    body: "Education, the M.Sc. thesis and research projects.",
    href: site.academicCvUrl,
  },
] as const;

export const cvSummary = [
  { label: "Based in", value: "Tampere, Finland" },
  { label: "Education", value: "M.Sc. Human-Technology Interaction" },
  { label: "Status", value: "Open to relocation" },
  { label: "Contact", value: site.email },
] as const;

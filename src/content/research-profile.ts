import { site } from "./site";
import { moreResearch } from "./home";
import { publications, researchProfiles } from "./publications";

/**
 * The research profile: an unlisted page (not in the navigation, footer,
 * sitemap, command bar or Ask the portfolio, and hidden from search
 * engines) that is the link used in doctoral and research applications.
 * It opens on the research question, then the thesis, other studies and
 * methods, and frames the industry work as applied practice.
 *
 * Every fact here is already on the site (the Lumi case, the homepage,
 * About) or in Aseer's CV. Nothing is new information.
 */

const thesis = publications.find((publication) => publication.status === "Thesis")!;

export const researchProfile = {
  eyebrow: "Research profile",
  heading: "I study how people come to trust AI systems, and how design can help them calibrate that trust.",
  intro:
    "I'm Aseer, an HCI researcher with an M.Sc. in Human-Technology Interaction from Tampere University, completed with Distinction (GPA 4.67/5.0). My thesis studied how international students came to trust a conversational AI guide to Finnish public services, and what made that trust break.",
  looking: "I'm looking for a doctoral or research position to continue this work.",

  links: [
    { label: "Academic CV", href: site.academicCvUrl, note: "PDF" },
    ...researchProfiles.map((profile) => ({ label: profile.label, href: profile.href, note: undefined })),
  ],

  question: {
    text: "The question I keep coming back to is how much people should trust an AI system, and how design can help them calibrate that trust instead of defaulting to blind trust or blanket suspicion.",
    interests: [
      "Trust and its calibration in conversational AI",
      "Human-AI interaction in public services",
      "Accessible and inclusive design",
    ],
  },

  thesis: {
    citation: thesis.citation,
    details: [
      { label: "Supervision", value: "Prof. Thomas Olsson and Amir Pakpour Haji Agha" },
      { label: "Grade", value: "5/5" },
      { label: "Years", value: "2025–2026" },
    ],
    method:
      "A qualitative study with 15 international students at Tampere University, in single sessions of about 35 minutes across four real scenarios: student housing, banking, healthcare and university services. Before and after each session, participants described what they felt, not just what they thought. Two pilot sessions shaped the prototype first. I analyzed the sessions with reflexive thematic analysis, using Trust-as-Affect as a lens.",
    findings:
      "Trust formed slowly, in small moments, and could break all at once: a single confident wrong answer was enough to reset it. The study produced seven themes and seven design principles for trustworthy conversational AI.",
    publication: "Parts of the study are being prepared for academic publication.",
  },

  studies: moreResearch,

  methods: [
    "Qualitative interviews and scenario-based user studies",
    "Reflexive thematic analysis (Atlas.ti)",
    "Surveys and descriptive statistics",
    "Usability testing, including the System Usability Scale",
    "Workshops and public demonstrations",
    "Prototyping in Figma",
  ],

  practice:
    "Before the master's, I spent eleven months as a UX designer at Synesis IT on Convay, a video conferencing platform trusted by governments, taking features from research and prototypes to engineering handoff and testing them along the way. Before that, I studied software engineering. Together, they mean I can build the systems I study, as I did with Lumi, and evaluate them in realistic conditions.",
};

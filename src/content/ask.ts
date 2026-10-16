/**
 * Ask the portfolio (Phase 5): the page copy and the questions offered
 * as starting points. Each suggested question was checked against the
 * index to make sure it lands on a fitting passage.
 */

export const askPage = {
  eyebrow: "Ask the portfolio",
  heading: "Ask, and get my own words back.",
  intro:
    "Ask about my work, research or background. Every answer is a passage from this site, quoted as written, with a link to where it comes from. If nothing here covers your question, it says so instead of guessing.",
  scope: "Searches this site only · Your question stays in this browser",
};

export const askSuggestions = [
  "What did you do at Convay?",
  "What are the seven design principles?",
  "How do you approach research?",
  "Which tools do you use?",
  "Are you open to new roles?",
  "How can I contact you?",
];

/** How the page follows the seven principles from Lumi's study. Each line
 * describes what the page actually does. */
export const askPrinciples = [
  ["Source-anchored", "Every answer is a passage from this site, with the page it comes from."],
  ["Scope-stated", "It only knows what is written here, and says so up front."],
  ["Hallucination-conservative", "It never writes new text. When nothing fits, it says it doesn't know."],
  ["Verification-supporting", "Each answer links to its exact section, so you can read it in context."],
  ["Vulnerability-aware", "Your question stays in your browser. It isn't sent anywhere or stored."],
  ["Action-closing", "Each answer ends with a next step: the full page, or a way to ask me directly."],
  ["Structurally minimal", "One answer first, and at most two more."],
] as const;

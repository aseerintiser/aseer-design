/**
 * Ask the portfolio: the page copy and the questions offered as
 * starting points. Each suggested question was checked against the
 * index to make sure it lands on a fitting passage.
 */

export const askPage = {
  eyebrow: "Ask the portfolio",
  heading: "Ask, and get an answer you can check.",
  intro:
    "Ask about my work, research or background. An AI assistant answers in a few sentences, using only what is written on this site, and links every claim to the passage it comes from. If the site doesn't cover your question, it says so instead of guessing.",
  scope: "Answers from this site only · Written by AI, with sources",
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
  ["Source-anchored", "Every claim in an answer carries a numbered link to the passage it comes from."],
  ["Scope-stated", "It only knows what is written on this site, and says so up front."],
  [
    "Hallucination-conservative",
    "The AI sees only the passages that match your question. When they don't answer it, it says it doesn't know.",
  ],
  ["Verification-supporting", "Each source opens the exact section, so you can read it in context."],
  [
    "Vulnerability-aware",
    "Your question is sent to an AI service (Groq) only to write the answer. This site doesn't log or store it.",
  ],
  ["Action-closing", "Each answer ends with a next step: its sources, or a way to ask me directly."],
  ["Structurally minimal", "A few sentences, not an essay. No avatar or persona: it is clearly labeled as AI."],
] as const;

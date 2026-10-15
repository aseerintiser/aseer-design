import type { Evidence } from "./home";

/**
 * "In short" summaries for the featured case studies (Phase 3): the
 * problem, Aseer's role, the key decision and the result, so a recruiter
 * can stop after one screen and still have the story.
 *
 * Every line condenses a passage already in that case study (named in
 * the comment), never new information.
 */
export interface InShort {
  problem: string;
  role: string;
  decision: string;
  result: string;
  evidence: Evidence;
}

export const inShort: Record<string, InShort> = {
  // The Problem; Research & Reasoning; Design Decisions 1; Outcome.
  "convay-mobile-app-revamp": {
    problem:
      "The mobile app lagged behind the web: clunky navigation, an unclear way into meetings, and no transcription or summaries.",
    role: "UX Designer at Synesis IT, working with the product team and engineers.",
    decision: "Let people join with a meeting ID or a link, with no sign-up first.",
    result: "Meeting entry dropped from five taps to three, and mobile reached feature parity with web.",
    evidence: { status: "own", text: "Five of six reviewers called it more intuitive at handoff" },
  },
  // The Problem; Challenges and Solutions; Outcome and Impact.
  "convay-ai-for-physical-meetings": {
    problem:
      "In-person meetings, from government briefings to internal syncs, often went undocumented, and transcription tools served online calls.",
    role: "UX Designer at Synesis IT, with product managers and engineering.",
    decision:
      "Moved the meeting panel to dark to match the rest of Convay, after testing both versions side by side.",
    result: "A record, transcribe and summarise flow for physical rooms, with Bengali transcription support.",
    evidence: { status: "own", text: "82% of internal testers preferred the dark panel" },
  },
  // The Problem; Approach; Outcome & Impact.
  "convay-design-system": {
    problem:
      "Every Convay feature had been designed on its own, so buttons, spacing and type didn't match, and each new feature started from scratch.",
    role: "UX Designer at Synesis IT, working with the product team and developers.",
    decision:
      "Build bottom-up: variables first, then styles, then components, named the way developers would implement them.",
    result: "One Figma source of truth, with light and dark themes covered by the same components.",
    evidence: { status: "own", text: "Handoff moved from redlined screens to named variables" },
  },
  // Problem Statement; My Responsibilities; Test Phase; SUS.
  fitvibe: {
    problem: "Many people struggle to keep a fitness routine and lack personal guidance.",
    role: "UI design intern at Kaz Software, with a senior designer, on a client app under NDA.",
    decision: "Test the design with 12 participants and report plainly what needed to improve.",
    result: "The test pointed to clearer labels and a more intuitive shop, with a SUS score of 63.3.",
    evidence: { status: "own", text: "SUS 63.3, just below the average of 68" },
  },
  // The problem; Building Lumi; What we found; What it means; Go deeper.
  lumi: {
    problem:
      "Newcomers to Finland have to piece public services together themselves: asking friends, searching, or guessing.",
    role: "Sole researcher and designer, for my M.Sc. thesis at Tampere University.",
    decision:
      "Add a constrained AI layer under the guided design, so off-script questions would not break the study.",
    result:
      "Trust formed slowly and could vanish in one moment. The study produced seven design principles for trustworthy conversational AI.",
    evidence: { status: "verified", text: "Thesis graded 5/5" },
  },
};

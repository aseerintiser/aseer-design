/**
 * What the Ask assistant sends and receives. Shared by the API route
 * (app/api/ask) and the page (components/ask/AskPortfolio), so both
 * agree on the shape of a streamed answer.
 */

/** A passage the assistant was given to read, numbered as it cites it. */
export interface AssistantSource {
  n: number;
  page: string;
  section: string;
  href: string;
}

export interface AssistantRequest {
  question: string;
  /** The question asked just before, so a follow-up like "what was his
   * role there?" can be understood. Only the question is sent, never an
   * earlier answer. */
  previousQuestion?: string;
}

/** One line of the streamed answer (newline-delimited JSON). */
export type AssistantEvent =
  | { type: "sources"; sources: AssistantSource[] }
  | { type: "text"; text: string }
  | { type: "unknown" }
  /** The question points at something it doesn't name ("there", "that
   * project") and there is no earlier question to make it clear. */
  | { type: "unclear" }
  | { type: "done" }
  | { type: "error" };

/** Why the assistant could not answer, so the page can fall back to the
 * quote-based answers. Sent as JSON with a non-200 status. */
export interface AssistantFallback {
  fallback: true;
  reason: "unavailable" | "busy" | "invalid";
}

export const QUESTION_MAX = 300;

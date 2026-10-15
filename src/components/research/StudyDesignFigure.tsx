import { Fragment } from "react";

/**
 * Figure: Lumi study design (Phase 4).
 *
 * Every line comes from the case study's own "The study" and "Building
 * Lumi" chapters, or the thesis abstract (the pre- and post-session
 * interviews). The seven themes are named as reserved, not shown, as the
 * case study itself says the full analysis is held for publication.
 */
const stages = [
  {
    step: "01 · Pilots",
    title: "Two pilot sessions",
    lines: [
      "The prototype broke whenever someone typed a question outside its guided structure.",
      "So a constrained AI layer went in underneath, before the main study.",
    ],
  },
  {
    step: "02 · Participants",
    title: "15 international students",
    lines: [
      "Tampere University students who had navigated Finland's public services as newcomers.",
      "One session each, about 35 minutes. Consented, recorded and anonymized.",
    ],
  },
  {
    step: "03 · Each session",
    title: "Four real scenarios",
    lines: [
      "A short interview before and after, about what people felt, not only what they thought.",
      "Student housing · Banking · Healthcare · University services",
    ],
  },
  {
    step: "04 · Analysis",
    title: "Reflexive thematic analysis",
    lines: [
      "Trust-as-Affect used as a lens, not a theory to prove.",
      "Seven themes (held for publication) and seven design principles.",
    ],
  },
];

export function StudyDesignFigure() {
  return (
    <ol className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-2">
      {stages.map((stage, index) => (
        <Fragment key={stage.step}>
          <li className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
              {stage.step}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl leading-snug">{stage.title}</p>
            {stage.lines.map((line) => (
              <p key={line} className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {line}
              </p>
            ))}
          </li>
          {index < stages.length - 1 && (
            <li aria-hidden="true" className="flex items-center justify-center text-[var(--color-text-muted)]">
              <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-90 lg:rotate-0">
                <path fill="currentColor" d="M9.3 3.3 8.3 4.3 11.3 7.3H2v1.4h9.3l-3 3 1 1L14 8z" />
              </svg>
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}

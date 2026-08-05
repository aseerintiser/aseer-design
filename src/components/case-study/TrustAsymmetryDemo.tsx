"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { easing } from "@/lib/motion";

/**
 * Interactive recreation of Lumi's own clearest finding ("that asymmetry,
 * slow to form, fast to break") -- built for the Lumi case study body,
 * not the homepage hero (see Hero-Craftsmanship-Review.md and the
 * conversation that followed: this exact idea was proposed for the hero,
 * rejected there as too narrow and too project-specific for a page meant
 * to represent the whole portfolio, and kept for the one place it
 * actually belongs).
 *
 * Every label and response line below is a direct paraphrase of
 * something already written in lumiBody just above this block (the
 * working TOAS link, the accurate price range and its real quote, "vague
 * reassurance didn't move people... specific facts did," and the
 * hallucinated housing provider whose broken link reset one
 * participant's trust instantly). Nothing here is invented; this is the
 * same finding, made interactive rather than only narrated.
 *
 * The asymmetry is expressed through motion, not just copy: a positive
 * click eases the meter up over 0.7s (`easing.entrance`, the same curve
 * every slow reveal on this site already uses); the negative click
 * snaps it down in 0.2s (`easing.exit`, defined in lib/motion.ts since
 * the start of this project but not actually used anywhere until now).
 * Trust rising slowly and breaking quickly isn't just what the caption
 * says, it's what the two transitions actually feel like next to each
 * other.
 */

type PositiveActionId = "link" | "price" | "summary";

interface PositiveAction {
  id: PositiveActionId;
  label: string;
  response: string;
  delta: number;
}

const POSITIVE_ACTIONS: PositiveAction[] = [
  {
    id: "link",
    label: "A working link to TOAS",
    response:
      "An official link that actually loaded. Small, but it's exactly this kind of moment that built trust in the study.",
    delta: 25,
  },
  {
    id: "price",
    label: "An accurate price range",
    response:
      "\"I was immediately motivated... attracted to the price.\" Trust keeps forming, one small proof at a time.",
    delta: 25,
  },
  {
    id: "summary",
    label: "A precise, scannable summary",
    response:
      "Vague reassurance didn't move people in this study. Specific, checkable facts did, and this is one of them.",
    delta: 22,
  },
];

const NEGATIVE_RESPONSE =
  "This actually happened once, in the real study. Lumi named a housing provider that doesn't exist. The participant clicked the link. Nothing loaded. Trust didn't fade after that, it reset, instantly.";

const BASELINE = 15;
const MIN = 8;
const MAX = 92;

export function TrustAsymmetryDemo() {
  const shouldReduceMotion = useReducedMotion();
  const [trust, setTrust] = useState(BASELINE);
  const [response, setResponse] = useState<string | null>(null);
  const [broke, setBroke] = useState(false);

  function handlePositive(action: PositiveAction) {
    setTrust((current) => Math.min(MAX, current + action.delta));
    setResponse(action.response);
    setBroke(false);
  }

  function handleNegative() {
    setTrust(MIN);
    setResponse(NEGATIVE_RESPONSE);
    setBroke(true);
  }

  return (
    <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 sm:p-8">
      <p className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
        Try it yourself
      </p>
      <p className="mt-2 max-w-[var(--measure)] text-[var(--color-text)]">
        Every option below is something that actually happened during the study.
        Trust rises slowly with each real signal. See what one broken claim does
        to it.
      </p>

      <div className="mt-6">
        <div
          role="img"
          aria-label={`Participant trust, currently ${trust} out of 100`}
          className="h-2 w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-border)]"
        >
          <motion.div
            className="h-full rounded-[var(--radius-full)] bg-[var(--color-accent)]"
            animate={{ width: `${trust}%` }}
            transition={{
              duration: shouldReduceMotion ? 0 : broke ? 0.2 : 0.7,
              ease: broke ? easing.exit : easing.entrance,
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>Little trust</span>
          <span>Full trust</span>
        </div>
      </div>

      {/* Live region: a screen-reader user gets the same outcome a
          sighted user reads off the meter, since the bar's width isn't
          otherwise exposed as text anywhere else in this component. */}
      <p aria-live="polite" className="mt-5 min-h-10 text-sm text-[var(--color-text)]">
        {response ??
          "Pick one below. This is built from the study's real findings, not a simulation of a generic one."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {POSITIVE_ACTIONS.map((action) => (
          <Button
            key={action.id}
            type="button"
            variant="secondary"
            size="sm"
            withArrow={false}
            onClick={() => handlePositive(action)}
          >
            {action.label}
          </Button>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          withArrow={false}
          onClick={handleNegative}
          className="text-[var(--color-text-muted)]"
        >
          A housing provider that doesn't exist
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ask, buildIndex, highlight, type AskIndex, type AskResult, type Match } from "@/lib/ask/engine";
import type { Passage } from "@/lib/ask/types";
import { EvidenceStroke } from "@/components/ui/EvidenceChip";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ASK_EVENT, ASK_HANDOFF_KEY } from "@/lib/ask/handoff";
import { cn } from "@/lib/utils";

let indexPromise: Promise<AskIndex> | null = null;

function loadIndex() {
  indexPromise ??= fetch("/ask/index.json")
    .then((response) => {
      if (!response.ok) throw new Error(`index ${response.status}`);
      return response.json() as Promise<Passage[]>;
    })
    .then(buildIndex)
    .catch((error: unknown) => {
      indexPromise = null;
      throw error;
    });
  return indexPromise;
}

const label = "font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase";

function Quote({ match, size }: { match: Match; size: "large" | "small" }) {
  const { passage } = match;
  return (
    <figure className="m-0">
      <figcaption className={cn(label, "flex flex-wrap items-center gap-x-2 gap-y-1")}>
        <EvidenceStroke />
        <span className="text-[var(--color-text)]">{passage.page}</span>
        <span aria-hidden="true">·</span>
        <span>{passage.section}</span>
      </figcaption>
      <blockquote
        className={cn(
          "m-0 mt-3 text-[var(--color-text)]",
          size === "large" ? "text-[1.1875rem] leading-relaxed md:text-[1.3125rem]" : "text-[0.9375rem] leading-relaxed",
        )}
      >
        {highlight(passage.text, match.matched).map((run, index) =>
          run.hit ? (
            <mark key={index} className="ask-hit">
              {run.text}
            </mark>
          ) : (
            <Fragment key={index}>{run.text}</Fragment>
          ),
        )}
      </blockquote>
      <Link href={passage.href} className="group mt-3 inline-flex items-center gap-2 text-sm font-medium">
        <span className="link-ink">Read it in context</span>
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
      </Link>
    </figure>
  );
}

function mailto(email: string, question: string) {
  return `mailto:${email}?subject=${encodeURIComponent("A question from your portfolio")}&body=${encodeURIComponent(question)}`;
}

function Exchange({
  result,
  latest,
  email,
  suggestions,
  onAsk,
}: {
  result: AskResult;
  latest: boolean;
  email: string;
  suggestions: string[];
  onAsk: (question: string) => void;
}) {
  return (
    <article
      className={cn(
        "border-t border-[var(--color-border-strong)] pt-6",
        !latest && "opacity-80",
      )}
    >
      <p className={label}>You asked</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-snug">{result.question}</p>

      <div className="mt-6">
        {result.status === "answer" && (
          <>
            <Quote match={result.primary} size="large" />
            {result.more.length > 0 && (
              <div className="mt-8">
                <p className={label}>Also on the site</p>
                <ul className="mt-4 space-y-6 border-l border-[var(--color-border)] pl-5">
                  {result.more.map((match) => (
                    <li key={match.passage.id}>
                      <Quote match={match} size="small" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {result.status === "unknown" && (
          <div>
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)]">I don&apos;t know.</p>
            <p className="mt-2 max-w-[var(--measure)] text-[var(--color-text-muted)]">
              Nothing on this site answers that, so there is nothing to quote, and I won&apos;t guess.
            </p>
          </div>
        )}

        {result.status === "empty" && (
          <div>
            <p className="max-w-[var(--measure)] text-[var(--color-text-muted)]">
              Try a question with a few more words, like one of these.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((question) => (
                <SuggestionButton key={question} question={question} onAsk={onAsk} />
              ))}
            </div>
          </div>
        )}

        {result.status !== "empty" && result.pointer && (
          <p className="mt-6 max-w-[var(--measure)] text-sm text-[var(--color-text-muted)]">
            {result.pointer.text}{" "}
            <Link href={result.pointer.href} className="link-ink font-medium text-[var(--color-text)]">
              {result.pointer.label}
            </Link>
          </p>
        )}

        {result.status !== "empty" && (
          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={mailto(email, result.question)} className="link-ink font-medium">
              {result.status === "answer" ? "Ask Aseer about this directly" : "Ask Aseer directly"}
            </a>
          </p>
        )}
      </div>
    </article>
  );
}

function SuggestionButton({ question, onAsk }: { question: string; onAsk: (question: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onAsk(question)}
      className="rounded-[var(--radius-full)] border border-[var(--color-border-strong)] px-3.5 py-1.5 text-left text-sm transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] hover:bg-[var(--color-surface)]"
    >
      {question}
    </button>
  );
}

/**
 * Ask the portfolio: a question box that answers with passages from the
 * site (see lib/ask/engine.ts). Answers stack newest first, and the
 * latest is announced to screen readers.
 */
export function AskPortfolio({ suggestions, scope, email }: { suggestions: string[]; scope: string; email: string }) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<{ id: number; result: AskResult }[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [announcement, setAnnouncement] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const counter = useRef(0);

  const submit = useCallback(async (question: string) => {
    const text = question.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    setState("loading");
    try {
      const result = ask(await loadIndex(), text);
      counter.current += 1;
      const id = counter.current;
      setHistory((current) => [{ id, result }, ...current].slice(0, 6));
      setQuery("");
      setState("idle");
      setAnnouncement(
        result.status === "answer"
          ? `Answer from ${result.primary.passage.page}, ${result.primary.passage.section}.`
          : result.status === "unknown"
            ? "No answer on this site."
            : "Try a question with a few more words.",
      );
    } catch {
      setState("error");
      setAnnouncement("The answers couldn't load.");
    }
  }, []);

  useEffect(() => {
    // Load the index early, and take over a question typed into ⌘K.
    loadIndex().catch(() => undefined);
    let handoff: string | null = null;
    try {
      handoff = window.sessionStorage.getItem(ASK_HANDOFF_KEY);
      window.sessionStorage.removeItem(ASK_HANDOFF_KEY);
    } catch {
      // Storage unavailable: nothing was handed over.
    }
    if (handoff) {
      const question = handoff;
      queueMicrotask(() => void submit(question));
    }
    const onQuestion = (event: Event) => void submit(String((event as CustomEvent<string>).detail ?? ""));
    window.addEventListener(ASK_EVENT, onQuestion);
    return () => window.removeEventListener(ASK_EVENT, onQuestion);
  }, [submit]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(query);
  }

  return (
    <div>
      <form role="search" aria-label="Ask the portfolio" onSubmit={onSubmit}>
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <div className="flex items-end gap-3 border-b-2 border-[var(--color-text)] pb-2 focus-within:border-[var(--color-text)]">
          <input
            id="ask-input"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask a question"
            autoComplete="off"
            enterKeyHint="search"
            className="min-w-0 flex-1 bg-transparent py-2 font-[family-name:var(--font-display)] text-[1.5rem] leading-tight outline-none placeholder:text-[var(--color-text-muted)]/70 md:text-[2rem]"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="mb-1 inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-full)] bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-opacity duration-[var(--duration-fast)] hover:opacity-85 disabled:opacity-60"
          >
            {state === "loading" ? "Looking" : "Ask"}
            <ArrowIcon className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className={cn(label, "mt-3")}>{scope}</p>
      </form>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className={cn(label, "mr-1")}>Try</span>
        {suggestions.map((question) => (
          <SuggestionButton key={question} question={question} onAsk={(text) => void submit(text)} />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {state === "error" && (
        <p role="alert" className="mt-10 text-[var(--color-text-muted)]">
          The answers couldn&apos;t load. Check your connection and try again.
        </p>
      )}

      {history.length > 0 && (
        <div className="mt-12 space-y-12">
          {history.map((entry, index) => (
            <Exchange
              key={entry.id}
              result={entry.result}
              latest={index === 0}
              email={email}
              suggestions={suggestions}
              onAsk={(text) => void submit(text)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

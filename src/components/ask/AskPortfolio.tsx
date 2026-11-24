"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ask, buildIndex, highlight, type AskIndex, type AskResult, type Match } from "@/lib/ask/engine";
import type { Passage } from "@/lib/ask/types";
import {
  QUESTION_MAX,
  type AssistantEvent,
  type AssistantFallback,
  type AssistantSource,
} from "@/lib/ask/assistant-types";
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

/* ------------------------------------------------------------------ */
/* Quote answers: the original engine, now the fallback.              */
/* ------------------------------------------------------------------ */

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

function QuoteAnswer({
  result,
  note,
  suggestions,
  onAsk,
}: {
  result: AskResult;
  note?: string;
  suggestions: string[];
  onAsk: (question: string) => void;
}) {
  return (
    <>
      {note && <p className="mb-6 max-w-[var(--measure)] text-sm text-[var(--color-text-muted)]">{note}</p>}

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

      {result.status === "unknown" && <DontKnow />}

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
    </>
  );
}

function DontKnow() {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)]">I don&apos;t know.</p>
      <p className="mt-2 max-w-[var(--measure)] text-[var(--color-text-muted)]">
        Nothing on this site answers that, so I won&apos;t guess. Aseer can answer it directly.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assistant answers: short, written from the site, every claim cited. */
/* ------------------------------------------------------------------ */

type Phase = "reading" | "writing" | "done" | "unknown" | "unclear" | "cut";

type Entry =
  | { id: number; kind: "assistant"; question: string; phase: Phase; sources: AssistantSource[]; text: string }
  | { id: number; kind: "quote"; question: string; result: AskResult; note?: string };

/** Offered when a question points at a project it doesn't name. Each
 * was checked against the assistant to make sure it answers well. */
const CLARIFY = ["What did Aseer do at Convay?", "What was the Lumi study about?", "What is TravelMate?"];

const FALLBACK_NOTES: Record<Exclude<AssistantFallback["reason"], "invalid">, string> = {
  busy: "The AI assistant is busy right now, so here is the closest passage from the site instead.",
  unavailable: "The AI assistant isn't available right now, so here is the closest passage from the site instead.",
};

const PHASE_LABEL: Record<Phase, string> = {
  reading: "Reading the site",
  writing: "Writing an answer",
  done: "AI answer · from this site",
  unknown: "No answer on this site",
  unclear: "Not sure what you mean",
  cut: "AI answer · cut short",
};

/** The assistant's mark (styles in globals.css). */
function AssistantMark({ state }: { state: "reading" | "writing" | "done" | "unknown" }) {
  return (
    <span className="ask-mark" data-state={state} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

const CITE = /[\[【](\d{1,2}(?:\s*,\s*\d{1,2})*)[\]】]/g;

/** Splits an answer into text and citation chips. Numbers that don't
 * match a source are dropped, and a half-written "[1" at the end of a
 * streaming answer is held back until it is complete. */
function renderAnswer(text: string, sources: AssistantSource[]) {
  const visible = text.replace(/[\[【][\d,\s]*$/, "");
  const nodes: ReactNode[] = [];
  // Sources are numbered in the order the answer cites them (1, 2, 3),
  // not by their place in the list the model read.
  const cited: AssistantSource[] = [];
  let last = 0;
  // Models sometimes stack many citations on one sentence; two is enough
  // to check it, so a run of chips stops at two.
  let run = 0;
  for (const match of visible.matchAll(CITE)) {
    const between = visible.slice(last, match.index);
    if (between.trim()) run = 0;
    nodes.push(between.replace(/\s+$/, ""));
    for (const raw of match[1]!.split(",")) {
      const source = sources.find((item) => item.n === Number(raw.trim()));
      if (!source || run >= 2) continue;
      run += 1;
      if (!cited.includes(source)) cited.push(source);
      const shown = cited.indexOf(source) + 1;
      nodes.push(
        <a
          key={`${match.index}-${source.n}`}
          href={source.href}
          aria-label={`Source ${shown}: ${source.page}, ${source.section}`}
          title={`${source.page} · ${source.section}`}
          className="ml-1 inline-flex h-[1.15rem] min-w-[1.15rem] -translate-y-[0.35em] items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-1 align-baseline font-[family-name:var(--font-mono)] text-[0.625rem] leading-none text-[var(--color-text)] no-underline transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-text)] hover:bg-[rgb(255_216_74_/_0.45)]"
        >
          {shown}
        </a>,
      );
    }
    last = (match.index ?? 0) + match[0].length;
  }
  nodes.push(visible.slice(last));
  return { nodes, cited };
}

function plainAnswer(text: string) {
  return text.replace(CITE, "").replace(/\s+([.,;:])/g, "$1").trim();
}

function AssistantAnswer({
  entry,
  onAsk,
}: {
  entry: Extract<Entry, { kind: "assistant" }>;
  onAsk: (question: string) => void;
}) {
  const { phase, sources, text } = entry;
  const { nodes, cited } = renderAnswer(text, sources);
  const listed = cited.length ? cited : sources.slice(0, 3);
  const finished = phase === "done" || phase === "cut";
  const mark = phase === "cut" ? "done" : phase === "unclear" ? "unknown" : phase;

  return (
    <>
      <p className={cn(label, "flex items-center gap-2.5")}>
        <AssistantMark state={mark} />
        <span>{PHASE_LABEL[phase]}</span>
      </p>

      {phase === "reading" && sources.length > 0 && (
        <ul className="mt-4 space-y-1.5" aria-hidden="true">
          {sources.map((source, i) => (
            <li
              key={source.n}
              className="ask-source-in flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <EvidenceStroke />
              <span>
                {source.page} · {source.section}
              </span>
            </li>
          ))}
        </ul>
      )}

      {text && (
        // One size for every answer, short or long, so the text doesn't
        // jump while it streams in. A step below the quoted answers, since
        // a written answer can run to a full list.
        <p className="mt-4 max-w-[var(--measure)] text-[1.0625rem] leading-relaxed text-[var(--color-text)] md:text-[1.1875rem]">
          {nodes}
        </p>
      )}

      {phase === "unknown" && (
        <div className="mt-4">
          <DontKnow />
        </div>
      )}

      {phase === "unclear" && (
        <div className="mt-4">
          <p className="max-w-[var(--measure)] text-[1.0625rem] leading-relaxed md:text-[1.1875rem]">
            I&apos;m not sure which project you mean. Try asking about one by name.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CLARIFY.map((question) => (
              <SuggestionButton key={question} question={question} onAsk={onAsk} />
            ))}
          </div>
        </div>
      )}

      {phase === "cut" && (
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">The answer stopped early. The sources below are still worth a look.</p>
      )}

      {finished && text && listed.length > 0 && (
        <div className="mt-8">
          <p className={label}>{cited.length ? "Sources" : "Pages it read"}</p>
          <ol className="mt-4 space-y-3 border-l border-[var(--color-border)] pl-5">
            {listed.map((source, i) => (
              <li key={source.n} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                {listed.length > 1 && (
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-text-muted)]">
                    {i + 1}
                  </span>
                )}
                <span className="text-[var(--color-text)]">
                  {source.page} <span className="text-[var(--color-text-muted)]">· {source.section}</span>
                </span>
                <Link href={source.href} className="group inline-flex items-center gap-1.5 font-medium">
                  <span className="link-ink">Read it in context</span>
                  <ArrowIcon className="h-3 w-3 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-[var(--measure)] text-xs leading-relaxed text-[var(--color-text-muted)]">
            Written by an AI model from these passages only. Open a source to check anything that matters.
          </p>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */

function mailto(email: string, question: string) {
  return `mailto:${email}?subject=${encodeURIComponent("A question from your portfolio")}&body=${encodeURIComponent(question)}`;
}

function Exchange({
  entry,
  latest,
  email,
  suggestions,
  onAsk,
}: {
  entry: Entry;
  latest: boolean;
  email: string;
  suggestions: string[];
  onAsk: (question: string) => void;
}) {
  const answered =
    entry.kind === "assistant"
      ? entry.phase === "done" || entry.phase === "cut"
      : entry.result.status === "answer";
  const showContact =
    entry.kind === "assistant"
      ? entry.phase !== "reading" && entry.phase !== "writing" && entry.phase !== "unclear"
      : entry.result.status !== "empty";

  return (
    <article className={cn("border-t border-[var(--color-border-strong)] pt-6", !latest && "opacity-80")}>
      <p className={label}>You asked</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-snug">{entry.question}</p>

      <div className="mt-6">
        {entry.kind === "assistant" ? (
          <AssistantAnswer entry={entry} onAsk={onAsk} />
        ) : (
          <QuoteAnswer result={entry.result} note={entry.note} suggestions={suggestions} onAsk={onAsk} />
        )}

        {showContact && (
          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={mailto(email, entry.question)} className="link-ink font-medium">
              {answered ? "Ask Aseer about this directly" : "Ask Aseer directly"}
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

/** Reads the assistant's newline-delimited JSON stream. */
async function* readEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<AssistantEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        yield JSON.parse(line) as AssistantEvent;
      } catch {
        // Skip a malformed line.
      }
    }
  }
  if (buffer.trim()) {
    try {
      yield JSON.parse(buffer) as AssistantEvent;
    } catch {
      // Ignore a partial last line.
    }
  }
}

function quoteAnnouncement(result: AskResult) {
  return result.status === "answer"
    ? `Answer from ${result.primary.passage.page}, ${result.primary.passage.section}.`
    : result.status === "unknown"
      ? "No answer on this site."
      : "Try a question with a few more words.";
}

/**
 * Ask the portfolio. A question goes to the AI assistant (app/api/ask),
 * which writes a short answer from passages on this site and cites each
 * one. If the assistant can't answer (no key, quota used up, network),
 * the question goes to the quote-based engine in the browser instead, so
 * the page always answers. Answers stack newest first; screen readers
 * hear each answer once it is complete.
 */
export function AskPortfolio({ suggestions, scope, email }: { suggestions: string[]; scope: string; email: string }) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [announcement, setAnnouncement] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const counter = useRef(0);
  const busy = useRef(false);
  const lastQuestion = useRef<string | undefined>(undefined);

  const submit = useCallback(async (question: string) => {
    const text = question.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    if (busy.current) return;
    busy.current = true;
    setState("loading");
    setQuery("");

    counter.current += 1;
    const id = counter.current;
    const previousQuestion = lastQuestion.current;
    lastQuestion.current = text;

    const patch = (change: (entry: Extract<Entry, { kind: "assistant" }>) => Partial<Extract<Entry, { kind: "assistant" }>>) =>
      setHistory((current) =>
        current.map((entry) => (entry.id === id && entry.kind === "assistant" ? { ...entry, ...change(entry) } : entry)),
      );
    setHistory((current) =>
      [{ id, kind: "assistant" as const, question: text, phase: "reading" as Phase, sources: [], text: "" }, ...current].slice(0, 6),
    );
    setAnnouncement("Reading the site.");

    let failed = false;
    const answerWithQuotes = async (note?: string) => {
      try {
        const result = ask(await loadIndex(), text);
        setHistory((current) =>
          current.map((entry) => (entry.id === id ? { id, kind: "quote" as const, question: text, result, note } : entry)),
        );
        setAnnouncement(quoteAnnouncement(result));
      } catch {
        failed = true;
        setHistory((current) => current.filter((entry) => entry.id !== id));
        setAnnouncement("The answers couldn't load.");
      }
    };

    let sawText = false;
    let finished = false;
    let full = "";
    try {
      if (text.length > QUESTION_MAX) {
        await answerWithQuotes();
        return;
      }
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, previousQuestion }),
      });
      if (!response.ok || !response.body || !(response.headers.get("content-type") ?? "").includes("ndjson")) {
        let reason: AssistantFallback["reason"] = "unavailable";
        try {
          reason = ((await response.json()) as AssistantFallback).reason ?? reason;
        } catch {
          // Not JSON: treat it as unavailable.
        }
        await answerWithQuotes(reason === "invalid" ? undefined : FALLBACK_NOTES[reason]);
        return;
      }

      for await (const event of readEvents(response.body)) {
        if (event.type === "sources") {
          patch(() => ({ sources: event.sources }));
        } else if (event.type === "text") {
          sawText = true;
          full += event.text;
          patch((entry) => ({ phase: "writing", text: entry.text + event.text }));
        } else if (event.type === "unknown" && !finished) {
          finished = true;
          patch(() => ({ phase: "unknown" }));
          setAnnouncement("This site doesn't answer that question.");
        } else if (event.type === "unclear" && !finished) {
          finished = true;
          patch(() => ({ phase: "unclear" }));
          setAnnouncement("Not sure which project you mean. Try asking about one by name.");
        } else if (event.type === "done" && !finished) {
          finished = true;
          patch(() => ({ phase: "done" }));
          setAnnouncement(`AI answer: ${plainAnswer(full)}`);
        } else if (event.type === "error") {
          break;
        }
      }
      if (!finished) {
        if (sawText) patch(() => ({ phase: "cut" }));
        else await answerWithQuotes(FALLBACK_NOTES.unavailable);
      }
    } catch {
      if (sawText) patch(() => ({ phase: "cut" }));
      else await answerWithQuotes(FALLBACK_NOTES.unavailable);
    } finally {
      busy.current = false;
      setState(failed ? "error" : "idle");
    }
  }, []);

  useEffect(() => {
    // Load the quote index early (the fallback), and take over a question
    // typed into ⌘K.
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
            enterKeyHint="send"
            maxLength={QUESTION_MAX}
            className="min-w-0 flex-1 bg-transparent py-2 font-[family-name:var(--font-display)] text-[1.5rem] leading-tight outline-none placeholder:text-[var(--color-text-muted)]/70 md:text-[2rem]"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="mb-1 inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-full)] bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-opacity duration-[var(--duration-fast)] hover:opacity-85 disabled:opacity-60"
          >
            {state === "loading" ? "Reading" : "Ask"}
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
              entry={entry}
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

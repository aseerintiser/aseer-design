import {
  NOT_FOUND,
  assistantConfigured,
  buildMessages,
  completionText,
  pickPassages,
  requestCompletion,
  tidy,
  toSources,
} from "@/lib/ask/assistant";
import {
  QUESTION_MAX,
  type AssistantEvent,
  type AssistantFallback,
  type AssistantRequest,
  type AssistantSource,
} from "@/lib/ask/assistant-types";

/**
 * POST /api/ask: the Ask assistant. Answers a question with a short text
 * written only from passages on this site, streamed as newline-delimited
 * JSON (see AssistantEvent). When it can't answer (no API key, the free
 * quota is used up, too many questions) it replies with an
 * AssistantFallback and the page shows the quote-based answers instead.
 *
 * Questions are not logged or stored here. They are sent to Groq to be
 * answered.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Per-visitor limits. Kept in memory, so they are per server instance:
// a light guard against one visitor using up the free daily quota, not a
// hard wall. Groq's own limits sit behind them.
const PER_MINUTE = 5;
const PER_DAY = 40;
const visits = new Map<string, number[]>();

function allow(ip: string) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const recent = (visits.get(ip) ?? []).filter((time) => now - time < day);
  const lastMinute = recent.filter((time) => now - time < 60_000).length;
  if (lastMinute >= PER_MINUTE || recent.length >= PER_DAY) {
    visits.set(ip, recent);
    return false;
  }
  recent.push(now);
  visits.set(ip, recent);
  if (visits.size > 5000) visits.clear();
  return true;
}

// Answers to questions asked without a follow-up context are reused for
// an hour, so the suggested questions don't spend the free quota again.
const CACHE_MS = 60 * 60 * 1000;
const cache = new Map<string, { at: number; sources: AssistantSource[]; text: string }>();

function cacheKey(question: string) {
  return question.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function fallback(reason: AssistantFallback["reason"], status: number) {
  return Response.json({ fallback: true, reason } satisfies AssistantFallback, { status });
}

function line(event: AssistantEvent) {
  return `${JSON.stringify(event)}\n`;
}

const STREAM_HEADERS = {
  "Content-Type": "application/x-ndjson; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!assistantConfigured()) return fallback("unavailable", 503);
  if (!sameOrigin(request)) return fallback("invalid", 403);

  let body: AssistantRequest;
  try {
    body = (await request.json()) as AssistantRequest;
  } catch {
    return fallback("invalid", 400);
  }
  const question = typeof body.question === "string" ? body.question.trim() : "";
  const previousQuestion =
    typeof body.previousQuestion === "string" ? body.previousQuestion.trim().slice(0, QUESTION_MAX) || undefined : undefined;
  if (question.length < 2 || question.length > QUESTION_MAX) return fallback("invalid", 400);

  const key = cacheKey(question);
  const cached = !previousQuestion ? cache.get(key) : undefined;
  if (cached && Date.now() - cached.at < CACHE_MS) {
    const events =
      cached.text === NOT_FOUND
        ? [line({ type: "sources", sources: cached.sources }), line({ type: "unknown" }), line({ type: "done" })]
        : [line({ type: "sources", sources: cached.sources }), line({ type: "text", text: cached.text }), line({ type: "done" })];
    return new Response(events.join(""), { headers: STREAM_HEADERS });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) return fallback("busy", 429);

  const passages = pickPassages(question, previousQuestion);
  if (!passages.length) {
    return new Response([line({ type: "sources", sources: [] }), line({ type: "unknown" }), line({ type: "done" })].join(""), {
      headers: STREAM_HEADERS,
    });
  }
  const sources = toSources(passages);

  let upstream: Response;
  try {
    upstream = await requestCompletion(buildMessages(question, passages, previousQuestion), AbortSignal.timeout(30_000));
  } catch {
    return fallback("unavailable", 503);
  }
  if (!upstream.ok || !upstream.body) {
    return fallback(upstream.status === 429 ? "busy" : "unavailable", upstream.status === 429 ? 429 : 503);
  }
  const upstreamBody = upstream.body;

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AssistantEvent) => controller.enqueue(encoder.encode(line(event)));
      send({ type: "sources", sources });
      // Hold back the first few characters, so a NOT_FOUND reply is never
      // shown as text.
      let held = "";
      let decided = false;
      let unknown = false;
      let full = "";
      try {
        for await (const delta of completionText(upstreamBody)) {
          if (decided) {
            const text = tidy(delta);
            full += text;
            send({ type: "text", text });
            continue;
          }
          held += delta;
          const start = held.trimStart();
          if (start.length < NOT_FOUND.length && NOT_FOUND.startsWith(start)) continue;
          decided = true;
          if (start.startsWith(NOT_FOUND)) {
            unknown = true;
            break;
          }
          const text = tidy(start);
          full += text;
          send({ type: "text", text });
        }
        if (!decided) {
          const start = held.trim();
          unknown = !start || start.startsWith(NOT_FOUND) || NOT_FOUND.startsWith(start);
          if (!unknown) {
            const text = tidy(start);
            full += text;
            send({ type: "text", text });
          }
        }
        if (unknown) send({ type: "unknown" });
        send({ type: "done" });
        if (!previousQuestion) cache.set(key, { at: Date.now(), sources, text: unknown ? NOT_FOUND : full.trim() });
        if (cache.size > 300) cache.clear();
      } catch {
        send({ type: "error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: STREAM_HEADERS });
}

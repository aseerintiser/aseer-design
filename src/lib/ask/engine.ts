import type { Passage, PassageKind } from "./types";

/**
 * Ask the portfolio's answer engine. It runs in the visitor's browser
 * over the static index (lib/ask/build-index.ts) and never writes text
 * of its own: an answer is a passage from the site, quoted as it is,
 * with the page it comes from. When no passage covers the question well
 * enough, it says it doesn't know instead of guessing.
 *
 * Ranking is BM25 over the passage text, with smaller weights for its
 * section, page and project, a few plain synonyms, and boosts when the
 * question asks for a kind of passage (a role, a result, a way to get in
 * touch), asks "how many", or is about Aseer in general rather than one
 * project. The "I don't know" rule is coverage: the best passage has to
 * contain most of what the question is about, weighted by how rare each
 * word is, so one shared common word is never enough. Capitalized names
 * in a question ("React", "Figma") must appear exactly, so a name is
 * never matched by a word that only looks like it.
 */

const STOP = new Set(
  `a about above after again all also am an and any are as at be been before being both but by can could
  did do does doing done for from had has have having he her here hers him his how i if in into is it its
  just me might more most my no nor not of on once only or other our out over own same she should so some
  such than that the their them then there these they this those through to too under until up very was
  we were what when where which while who whom why will with would you your yours yourself aseer aseers
  tell know show give please kind sort thing things much many lot lots really get got let us like want
  dont doesnt didnt isnt arent wasnt site portfolio page ever use used using uses worked project projects went go goes going`.split(/\s+/),
);

/** Plain synonyms: a question word, and site words that answer it. */
const SYNONYMS: Record<string, string[]> = {
  tool: ["figma", "tools"],
  tools: ["figma", "tool"],
  software: ["figma", "tools"],
  contact: ["email"],
  reach: ["email", "contact"],
  hire: ["open", "roles", "email"],
  hiring: ["open", "roles"],
  located: ["tampere", "finland", "based"],
  location: ["tampere", "finland", "based"],
  live: ["tampere", "finland", "based"],
  living: ["tampere", "finland", "based"],
  country: ["finland", "tampere"],
  city: ["tampere"],
  degree: ["msc", "bsc", "master", "bachelor"],
  degrees: ["msc", "bsc", "master", "bachelor"],
  education: ["msc", "bsc", "master", "bachelor", "university"],
  studied: ["msc", "bsc", "university"],
  masters: ["msc", "master"],
  master: ["msc"],
  bachelor: ["bsc"],
  bachelors: ["bsc", "bachelor"],
  thesis: ["lumi", "msc"],
  award: ["recognition", "scholarship", "distinction", "best"],
  awards: ["recognition", "scholarship", "distinction", "best"],
  achievements: ["recognition", "scholarship", "distinction"],
  scholarships: ["scholarship"],
  funded: ["scholarship", "erasmus"],
  gpa: ["distinction", "grade"],
  won: ["voted", "best", "scholarship", "distinction"],
  win: ["voted", "best", "scholarship", "distinction"],
  dissertation: ["thesis", "lumi"],
  approach: ["process", "method", "order"],
  process: ["approach", "method"],
  methods: ["method", "approach", "process"],
  workflow: ["process", "approach"],
  available: ["open", "relocating", "relocation"],
  availability: ["open", "relocating", "relocation"],
  relocate: ["relocating", "relocation"],
  move: ["relocating", "relocation"],
  hobbies: ["interests", "filmmaking", "photography"],
  hobby: ["interests", "filmmaking", "photography"],
  free: ["filmmaking", "photography", "interests"],
  colorblind: ["colorblind", "accessibility"],
  accessible: ["accessibility"],
  artificial: ["ai"],
  intelligence: ["ai"],
  chatbot: ["conversational", "ai", "lumi"],
  participants: ["people", "students"],
  users: ["participants", "people"],
  internship: ["intern", "kaz"],
  intern: ["internship", "kaz"],
  job: ["roles", "designer"],
  jobs: ["roles"],
  company: ["convay", "synesis", "kaz"],
  companies: ["convay", "synesis", "kaz"],
  experience: ["designer", "convay", "kaz"],
  find: ["found", "finding", "showed"],
  reduce: ["dropped", "fewer", "simplified", "cut"],
  code: ["software", "engineering"],
  coding: ["software", "engineering"],
  programming: ["software", "engineering"],
  developer: ["software", "engineering"],
  long: ["duration", "months"],
  wrong: ["problem", "issues", "limitation", "short"],
  hard: ["challenge", "challenges"],
  difficult: ["challenge", "challenges"],
  mistakes: ["limitation", "lesson"],
  reduced: ["dropped", "fewer", "simplified", "cut"],
};

const KIND_PATTERNS: [PassageKind, RegExp][] = [
  ["role", /\b(role|responsib\w*|what did (you|he) do|your part|contribut\w*|job title|position)\b/],
  ["result", /\b(results?|outcomes?|impact|achiev\w*|accomplish\w*|found|find\w*|metrics?|measur\w*|success\w*|improv\w*)\b/],
  ["problem", /\b(problems?|challenges?|pain ?points?|issues?|why did|struggl\w*|wrong|fail\w*|mistakes?|limitations?|hard|difficult\w*)\b/],
  ["decision", /\b(decisions?|decid\w*|chose|choices?|trade-?offs?)\b/],
  ["method", /\b(methods?|methodology|approach\w*|process\w*|how (do|did) you (work|design|research|test|study)|steps)\b/],
  ["reflection", /\b(reflect\w*|lessons?|learn\w*|differently|takeaways?)\b/],
  ["details", /\b(tools?|software|figma|stack|duration|how long|team|category|cv|resume|orcid|scholar|profiles?)\b/],
  ["status", /\b(open to|available|availability|hir(e|ing)|looking for|relocat\w*|jobs?|opportunit\w*|based|located|location|live|living|now|currently|graduat\w*)\b/],
  ["contact", /\b(contact|email|reach|get in touch|message|talk to)\b/],
  ["education", /\b(educat\w*|degrees?|universit\w*|masters?|msc|bachelors?|bsc|graduat\w*|school|thesis|certific\w*|grade)\b/],
  ["about", /\b(who are you|about (you|yourself|aseer|him)|introduce|yourself|background|why design|drives? you|motivat\w*|interests?|hobb\w*|free time|outside (of )?work|colorblind|code|coding|programm\w*|developer|engineer\w*|what is|what's|tell me about)\b/],
];

/** Words that name a project. A question without one is about Aseer in
 * general, so his own summary pages come first. */
const PROJECT_WORDS =
  /\b(convay|synesis|lumi|fitvibe|kaz|travelmate|arenberg|arenewberg|festival|creathon|robocarnival|robots?|game|games|notifications?|mobile|design system|thesis|meetings?|ai)\b/g;

const PERSONAL_PAGES = new Set(["Home", "About", "CV", "Contact"]);

/** Questions the site deliberately doesn't quote: other people's words. */
const POINTERS: { pattern: RegExp; text: string; href: string; label: string }[] = [
  {
    pattern: /\b(recommend\w*|testimonials?|references?|(others|people|colleagues|managers|clients) say)\b/,
    text: "Ask the portfolio only quotes Aseer's own words. Recommendations from people he worked with are on the Testimonials page.",
    href: "/testimonials",
    label: "Read the testimonials",
  },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\bm\.\s?sc\.?/g, "msc")
    .replace(/\bb\.\s?sc\.?/g, "bsc")
    .replace(/\bph\.?\s?d\.?/g, "phd")
    .replace(/colou?r[\s-]?blind(ness)?/g, "colorblind")
    .replace(/colour/g, "color")
    .replace(/e-mail/g, "email")
    .replace(/créathon/g, "creathon")
    .replace(/'s\b/g, "");
}

function words(text: string) {
  return normalize(text)
    .split(/[^a-z0-9%]+/)
    .filter((word) => word.length > 1 || /\d/.test(word));
}

/** A light stemmer: enough to match designer/design, meetings/meeting,
 * tested/testing/test, studies/study. Applied to both sides alike. */
export function stem(word: string) {
  if (/^\d/.test(word)) return word;
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith("ed")) return word.slice(0, -2);
  if (word.length > 6 && word.endsWith("er")) return word.slice(0, -2);
  if (word.length > 5 && word.endsWith("ly")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) word = word.slice(0, -1);
  // grade/graded, score/scored, service/services all meet at one stem.
  if (word.length > 4 && word.endsWith("e")) word = word.slice(0, -1);
  return word;
}

function terms(text: string) {
  return words(text)
    .filter((word) => !STOP.has(word))
    .map(stem);
}

interface Doc {
  weights: Map<string, number>;
  /** Words written with a capital (names), lowercased, for exact names. */
  exact: Set<string>;
  length: number;
  hasNumber: boolean;
}

export interface AskIndex {
  passages: Passage[];
  docs: Doc[];
  df: Map<string, number>;
  avgLength: number;
}

const FIELD_WEIGHTS = { text: 1, section: 0.6, page: 0.4, project: 0.5 } as const;

export function buildIndex(passages: Passage[]): AskIndex {
  const df = new Map<string, number>();
  const docs = passages.map((passage) => {
    const weights = new Map<string, number>();
    const textTerms = terms(passage.text);
    const fields: [string, number][] = [
      [passage.text, FIELD_WEIGHTS.text],
      [passage.section, FIELD_WEIGHTS.section],
      [passage.page, FIELD_WEIGHTS.page],
      [passage.project ?? "", FIELD_WEIGHTS.project],
    ];
    const exact = new Set<string>();
    for (const [field, weight] of fields) {
      for (const name of field.match(/\b[A-Z][\p{L}\p{N}]+/gu) ?? []) exact.add(normalize(name).replace(/[^a-z0-9]/g, ""));
      for (const term of field === passage.text ? textTerms : terms(field)) {
        weights.set(term, (weights.get(term) ?? 0) + weight);
      }
    }
    for (const term of weights.keys()) df.set(term, (df.get(term) ?? 0) + 1);
    return { weights, exact, length: textTerms.length, hasNumber: /\d/.test(passage.text) };
  });
  const avgLength = docs.reduce((sum, doc) => sum + doc.length, 0) / Math.max(1, docs.length);
  return { passages, docs, df, avgLength };
}

function idf(index: AskIndex, term: string) {
  const n = index.passages.length;
  const df = index.df.get(term) ?? 0;
  return Math.log(1 + (n - df + 0.5) / (df + 0.5));
}

function bm25(index: AskIndex, doc: Doc, term: string) {
  const tf = doc.weights.get(term);
  if (!tf) return 0;
  const k1 = 1.2;
  const b = 0.75;
  return (idf(index, term) * (tf * (k1 + 1))) / (tf + k1 * (1 - b + (b * doc.length) / index.avgLength));
}

/** One thing the question is about: a word, its synonyms, and the kinds
 * of passage that answer it even without the word ("role" → a role). */
interface Group {
  terms: string[];
  /** A capitalized name that must appear exactly. */
  exact?: string;
  kinds: Set<PassageKind>;
}

function hasTerm(doc: Doc, group: Group, term: string) {
  return group.exact ? doc.exact.has(group.exact) : doc.weights.has(term);
}

export interface Match {
  passage: Passage;
  /** Stems in the passage that matched the question, for highlighting. */
  matched: string[];
}

export type Pointer = (typeof POINTERS)[number];

export type AskResult =
  | { status: "answer"; question: string; primary: Match; more: Match[]; pointer?: Pointer }
  | { status: "unknown"; question: string; pointer?: Pointer }
  | { status: "empty"; question: string };

/** How much of the question a passage covers (0 to 1), and which stems
 * it matched. */
function coverage(index: AskIndex, doc: Doc, passage: Passage, groups: Group[]) {
  let total = 0;
  let covered = 0;
  const matched: string[] = [];
  const maxIdf = Math.log(1 + (index.passages.length + 0.5) / 0.5);
  for (const group of groups) {
    const weight = Math.max(...group.terms.map((term) => (index.df.has(term) ? idf(index, term) : maxIdf)));
    total += weight;
    const hits = group.terms.filter((term) => hasTerm(doc, group, term));
    if (hits.length || passage.kinds?.some((kind) => group.kinds.has(kind))) covered += weight;
    matched.push(...hits);
  }
  return { ratio: total ? covered / total : 0, matched };
}

export function ask(index: AskIndex, question: string): AskResult {
  const trimmed = question.trim();
  if (!trimmed) return { status: "empty", question: trimmed };
  const normalized = normalize(trimmed);
  const pointer = POINTERS.find((item) => item.pattern.test(normalized));

  const kinds = new Set(KIND_PATTERNS.filter(([, pattern]) => pattern.test(normalized)).map(([kind]) => kind));
  // Projects the question names; their passages come first.
  const named = [...new Set([...normalized.matchAll(PROJECT_WORDS)].map((match) => match[1]!.replace(/s$/, "")))];
  const personal = named.length === 0;
  const counting = /\b(how many|how much|number of|percent\w*|score|rate)\b/.test(normalized);

  // Capitalized words after the first one are names, matched exactly.
  const names = new Set(
    trimmed
      .split(/\s+/)
      .slice(1)
      .filter((word) => /^[A-Z][a-zA-Z]+/.test(word))
      .map((word) => normalize(word).replace(/[^a-z0-9]/g, "")),
  );

  const seen = new Set<string>();
  const groups: Group[] = [];
  for (const word of words(trimmed)) {
    if (STOP.has(word)) continue;
    const head = stem(word);
    if (seen.has(head)) continue;
    seen.add(head);
    const exact = names.has(word) ? word : undefined;
    groups.push({
      terms: [head, ...(exact ? [] : (SYNONYMS[word] ?? []).map(stem).filter((term) => term !== head))],
      exact,
      kinds: new Set(KIND_PATTERNS.filter(([, pattern]) => pattern.test(word)).map(([kind]) => kind)),
    });
  }

  if (!groups.length && !kinds.size) {
    return pointer ? { status: "unknown", question: trimmed, pointer } : { status: "empty", question: trimmed };
  }

  const scored = index.docs.map((doc, i) => {
    const passage = index.passages[i]!;
    let score = 0;
    for (const group of groups) {
      let best = 0;
      group.terms.forEach((term, position) => {
        if (group.exact && !doc.exact.has(group.exact)) return;
        best = Math.max(best, bm25(index, doc, term) * (position === 0 ? 1 : 0.8));
      });
      score += best;
    }
    const kindMatch = Boolean(passage.kinds?.some((kind) => kinds.has(kind)));
    // A question with no searchable words ("Who are you?") still has a
    // kind: rank that kind's passages by their prior alone.
    if (!groups.length) score = kindMatch ? 1 : 0;
    else if (kindMatch) score = (score || 0.5) * 1.8;
    if (personal && PERSONAL_PAGES.has(passage.page)) score *= 1.35;
    if (named.length) {
      const about = normalize(`${passage.page} ${passage.project ?? ""}`);
      if (named.some((name) => new RegExp(`\\b${name}`).test(about))) score *= 1.6;
    }
    if (counting && doc.hasNumber) score *= 1.6;
    score *= passage.prior ?? 1;
    const cover = groups.length ? coverage(index, doc, passage, groups) : { ratio: kindMatch ? 1 : 0, matched: [] };
    return { passage, score, cover };
  });

  const ranked = scored
    .filter((entry) => entry.score > 0 && entry.cover.ratio >= 0.6)
    .sort((a, b) => b.score - a.score);
  const top = ranked[0];
  if (!top) return { status: "unknown", question: trimmed, pointer };

  const more: Match[] = [];
  const texts = new Set([top.passage.text]);
  for (const entry of ranked.slice(1)) {
    if (more.length === 2 || entry.score < top.score * 0.6) break;
    if (texts.has(entry.passage.text)) continue;
    texts.add(entry.passage.text);
    more.push({ passage: entry.passage, matched: entry.cover.matched });
  }

  return {
    status: "answer",
    question: trimmed,
    primary: { passage: top.passage, matched: top.cover.matched },
    more,
    pointer,
  };
}

/** Splits a passage into plain and matched runs, for highlighting the
 * words that answered the question. */
export function highlight(text: string, matched: string[]) {
  if (!matched.length) return [{ text, hit: false }];
  const stems = new Set(matched);
  return text.split(/(\s+|[^\p{L}\p{N}%]+)/u).reduce<{ text: string; hit: boolean }[]>((runs, part) => {
    const word = normalize(part);
    const hit = /[a-z0-9]/.test(word) && !STOP.has(word) && stems.has(stem(word));
    const last = runs[runs.length - 1];
    if (last && last.hit === hit) last.text += part;
    else runs.push({ text: part, hit });
    return runs;
  }, []);
}

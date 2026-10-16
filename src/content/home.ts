/**
 * Homepage content (Phase 2): the page in four acts.
 *
 * Every line here is either taken from the case studies and About page
 * already on the site, or a plain restatement of a fact recorded there.
 * Nothing is new information. Where a line summarises, the comment above
 * it names its source, so it can be checked in one step.
 *
 * Bridges between projects are deliberately factual (dates and roles),
 * not invented motivations. They are drafts for Aseer to replace with
 * his own words if he wants a warmer handover.
 */

export type EvidenceStatus = "verified" | "own" | "directional";

export interface Evidence {
  status: EvidenceStatus;
  text: string;
  /** Where the claim comes from, shown on the chip's source card. */
  source?: string;
}

// ---------------------------------------------------------------------
// Act 1 · the hook: the trailer along the career line
// ---------------------------------------------------------------------

/** The five clips inside public/loops/trailer.mp4, in playing order, with
 * the second each one starts at (the middle of each 0.45 s crossfade).
 * Each clip is the opening scene of that project's card film (see
 * content/trailers.ts), so every frame is a real project screen. */
export const trailerClips = [
  {
    id: "fitvibe",
    start: 0,
    title: "FitVibe",
    meta: "UI design intern, Kaz Software · 2022",
    href: "/work/fitvibe",
    chapter: "fitvibe",
    step: "kaz",
  },
  {
    id: "design-system",
    start: 2.475,
    title: "Convay Design System",
    meta: "UX Designer, Synesis IT · 2023–24",
    href: "/work/convay-design-system",
    chapter: "convay-design-system",
    step: "convay",
  },
  {
    id: "mobile",
    start: 5.175,
    title: "Convay Mobile App Revamp",
    meta: "UX Designer, Synesis IT · 2023–24",
    href: "/work/convay-mobile-app-revamp",
    chapter: "convay-mobile-app-revamp",
    step: "convay",
  },
  {
    id: "ai",
    start: 7.875,
    title: "Convay AI for Physical Meetings",
    meta: "UX Designer, Synesis IT · 2023–24",
    href: "/work/convay-ai-for-physical-meetings",
    chapter: "convay-ai-for-physical-meetings",
    step: "convay",
  },
  {
    id: "lumi",
    start: 10.575,
    title: "Lumi",
    meta: "M.Sc. thesis, Tampere University · 2025–26",
    href: "/research/lumi",
    chapter: "lumi",
    step: "msc",
  },
] as const;

export const trailerDuration = 13.5;

/** The career line, strictly in time order. Dates from the CV and the
 * career archive: B.Sc. Jan 2019 to May 2023; Kaz internship May to Aug
 * 2022; Synesis IT Sep 2023 to Jul 2024; M.Sc. Aug 2024 to Jul 2026. */
export const careerSteps = [
  {
    id: "bsc",
    years: "2019–23",
    title: "B.Sc. Software Engineering",
    place: "Islamic University of Technology",
    // About page: "Software engineering taught me how systems break."
    card: "Software engineering taught me how systems break. Design is where I learned why people do.",
  },
  {
    id: "kaz",
    years: "2022",
    title: "Design intern",
    place: "Kaz Software",
    card: null,
  },
  {
    id: "convay",
    years: "2023–24",
    title: "UX Designer",
    place: "Convay at Synesis IT",
    card: null,
  },
  {
    id: "msc",
    years: "2024–26",
    title: "M.Sc. Human-Technology Interaction",
    place: "Tampere University, with Distinction",
    card: null,
  },
  {
    id: "now",
    years: "Now",
    title: "Open to roles",
    place: "Product design and HCI research",
    card: "Open to roles across design, research and AI, wherever the work means understanding people and building for them.",
  },
] as const;

export type CareerStepId = (typeof careerSteps)[number]["id"];

// ---------------------------------------------------------------------
// Act 2 · the work: the featured five
// ---------------------------------------------------------------------

export const lumiFeature = {
  slug: "lumi",
  href: "/research/lumi",
  index: "01 · Master's thesis · 2025–26",
  title: "Lumi",
  // Lumi case study intro and study section: designed Lumi, then studied
  // 15 international students using it.
  outcome:
    "I designed a conversational AI guide to Finnish public services, then studied how 15 newcomers came to trust it, or stopped.",
  role: "Sole researcher and designer · supervised by Prof. Thomas Olsson",
  evidence: { status: "verified", text: "Thesis graded 5/5", source: "Tampere University's grade for the M.Sc. thesis this study belongs to (Human-Technology Interaction, June 2026)." } as Evidence,
  cta: "Read the study",
};

/** Bridge from Lumi back to Convay: a date fact from the CV. */
export const bridgeToConvay = "Before Lumi, I spent eleven months designing Convay.";

export const convayChapter = {
  label: "Convay · Synesis IT · Sep 2023 – Jul 2024",
  // Career archive (verified): used in more than 45 countries (Synesis
  // CSO, January 2026); the government communications system for the
  // Bangladesh Computer Council was delivered in 2024.
  context:
    "A video conferencing platform now used in more than 45 countries, including Bangladesh's government communications system. I designed for it for eleven months, as a UX designer on the product team.",
  projects: [
    {
      slug: "convay-ai-for-physical-meetings",
      href: "/work/convay-ai-for-physical-meetings",
      title: "AI for Physical Meetings",
      // Case study intro and Outcome and Impact. The 93% figure was
      // confirmed by Aseer (October 16, 2026) after a check against the
      // career archive.
      outcome: "Record the room, then get a transcript and a summary people can share.",
      evidence: {
        status: "own",
        text: "93% transcription accuracy in quiet rooms · internal testing",
        source: "Convay's internal testing in quiet rooms, as reported in the case study. Not a large-scale field study.",
      } as Evidence,
    },
    {
      slug: "convay-mobile-app-revamp",
      href: "/work/convay-mobile-app-revamp",
      title: "Mobile App Revamp",
      // Case study results list.
      outcome: "Meeting entry dropped from five taps to three, and mobile caught up with web.",
      evidence: {
        status: "own",
        text: "Five of six reviewers called it more intuitive",
        source: "Internal design reviews at handoff, with the product and engineering team. Informal, not an external usability study.",
      } as Evidence,
    },
    {
      slug: "convay-design-system",
      href: "/work/convay-design-system",
      title: "Design System",
      // Case study reflection: "Building Convay's design system from
      // scratch." Worded for the time Aseer was there, not after.
      outcome: "Convay's design system, built from scratch in Figma and handed to engineering as named variables.",
      evidence: {
        status: "own",
        text: "Light and dark themes from one set of components",
        source: "From building and using the system day to day as features shipped. Not a formal usage audit.",
      } as Evidence,
    },
  ],
};

/** Bridge from Convay back to FitVibe: a date fact. */
export const bridgeToFitvibe = "A year earlier, it started with an internship.";

export const fitvibeFeature = {
  slug: "fitvibe",
  href: "/work/fitvibe",
  index: "Where it started · Kaz Software · 2022",
  title: "FitVibe",
  // FitVibe intro and corrected SUS section.
  outcome:
    "My first client app and my first usability study: 12 participants, and a SUS score of 63.3 that showed what to fix.",
  role: "UI design intern, with a senior designer · client name under NDA",
  evidence: { status: "own", text: "SUS 63.3, recalculated from the recorded totals", source: "The usability study with 12 participants. The case study recalculates the score step by step from the recorded item totals." } as Evidence,
};

// ---------------------------------------------------------------------
// Act 3 · the depth: more research, then voices
// ---------------------------------------------------------------------

export const moreResearch = [
  {
    slug: "robocarnival",
    href: "/research/robocarnival",
    label: "Human-robot interaction · 2025",
    title: "Multimodal Robot Interaction",
    // Same wording as the project's own summary.
    line: "A multimodal interaction concept across three robot platforms, voted Best Team by visiting high schoolers at RoboCarnival 2025.",
  },
  {
    slug: "game-difficulty-player-types",
    href: "/research/game-difficulty-player-types",
    label: "Player experience · 2023",
    title: "Tailoring Game Difficulty to Player Types",
    line: "Survey-based research on how game difficulty shapes player engagement.",
  },
];

/** Three short quotes, each an exact sentence from the LinkedIn
 * recommendation transcribed in content/testimonials.ts. `id` matches the
 * screenshot, which opens as the original. */
export const voices = [
  {
    id: "l8YiCOwU55xIAxMblVsts6fA5A",
    quote:
      "Niloy has consistently demonstrated exceptional skills in UX design and has been instrumental in advancing our design system in Figma.",
    name: "Anupam Samodder",
    role: "UX Design Lead · managed Aseer at Synesis IT",
  },
  {
    id: "SYFmJXJGL3nIyvv33Rvx7Yk0DA",
    quote: "Aseer has a remarkable ability to transform complex concepts into intuitive interfaces.",
    name: "Tanvir Hossain",
    role: "CTO, Clickability · client",
  },
  {
    id: "Rj4R8TvxUhp5Ak0rUrzdlPJbXc8",
    quote:
      "He has a keen eye for detail and a strong sense of aesthetics, as well as a deep understanding of user needs and preferences.",
    name: "Shihab Shajib",
    role: "Lead UX designer · managed Aseer at Kaz Software",
  },
];

// ---------------------------------------------------------------------
// Act 4 · the person
// ---------------------------------------------------------------------

export const person = {
  heading: "I came to design from software engineering, not the other way around.",
  // About page intro and "How I Got Here", condensed to three lines.
  lines: [
    "Software engineering taught me how systems break. Most of the time, the system wasn't the problem. The people using it were being misunderstood.",
    "That's why research comes before interface decisions in my work, and why I went back for a master's in Human-Technology Interaction.",
    "Lumi turned it into the question I want to keep pulling on: how much should people trust an AI system, and how can design help them calibrate it?",
  ],
  lookingFor:
    "I finished my M.Sc. at Tampere University in July 2026 with Distinction, and I'm open to roles in product design and HCI research, including relocating for the right one.",
};

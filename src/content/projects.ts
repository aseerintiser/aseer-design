import type { CaseStudy, ProjectSummary } from "./types";

/**
 * Placeholder project data for the foundation milestone.
 * -----------------------------------------------------------------------
 * Ranking, track assignment, and flagship status follow
 * Portfolio_Content_Architecture_Blueprint.md Part 4 ("Project Strategy").
 * Meta fields (role, duration, tools) use only facts already present in
 * Md_Aseer_Intiser_Career_Archive.md; anything the Archive itself still
 * lists as an open question (exact team size, per-project duration
 * breakdown, sourcing for specific percentages) is left as a clearly
 * labeled placeholder rather than invented. Narrative fields
 * (context/decisions/evidence/outcome/reflection) are short structural
 * placeholders only, per this milestone's explicit instruction not to
 * spend time on portfolio copy. TravelMate AI is marked "contingent"
 * because its keep/cut/reframe decision is still open
 * (Master_Portfolio_Knowledge_Base.md Section 3) and was not resolved
 * before this milestone started.
 */

const placeholderNarrative = {
  context: "Placeholder — case study context pending a later milestone.",
  roleAndCollaboration:
    "Placeholder — role and collaboration detail pending a later milestone.",
  decisions: [
    {
      title: "Placeholder decision",
      body: "Placeholder — decisions and trade-offs pending a later milestone.",
    },
  ],
  evidence: {
    body: "Placeholder — evidence and testing detail pending a later milestone.",
  },
  outcome: {
    body: "Placeholder — outcome detail pending a later milestone.",
  },
  reflection: "Placeholder — reflection pending a later milestone.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "convay-mobile-app-revamp",
    title: "Convay Mobile App Revamp",
    track: "work",
    scale: "product",
    isFlagship: true,
    oneLineScope:
      "Mobile revamp of Convay's core meeting flows, reducing a multi-step scheduling flow and reworking guest access.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    ...placeholderNarrative,
  },
  {
    slug: "convay-ai-for-physical-meetings",
    title: "Convay AI for Physical Meetings",
    track: "work",
    scale: "product",
    isFlagship: true,
    oneLineScope:
      "AI meeting transcription and in-room features, including a dark/light mode decision validated with internal testers.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    ...placeholderNarrative,
  },
  {
    slug: "convay-design-system",
    title: "Convay Design System",
    track: "work",
    scale: "platform",
    oneLineScope:
      "Foundational design system work (variables, styles, components) underlying 50+ features of the redesigned product.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    ...placeholderNarrative,
  },
  {
    slug: "convay-notifications",
    title: "Convay Notifications",
    track: "work",
    scale: "feature",
    oneLineScope:
      "A single, well-scoped notifications decision: reworking the \"mark as read\" icon based on internal test feedback.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    ...placeholderNarrative,
  },
  {
    slug: "lumi",
    title: "Lumi: Conversational AI for Public Services",
    track: "research",
    scale: "research",
    isFlagship: true,
    oneLineScope:
      "Master's thesis on trust in conversational AI, 15 international-student participants, graded 5/5.",
    meta: {
      role: "Researcher & designer (solo, supervised)",
      team: "Supervised by Prof. Thomas Olsson and Amir Pakpour Haji Agha",
      duration: "2025 – 2026",
      tools: "Figma (prototype), Atlas.ti",
    },
    ...placeholderNarrative,
  },
  {
    slug: "fitvibe",
    title: "FitVibe",
    track: "work",
    scale: "product",
    oneLineScope:
      "Fitness app UI (workout planning, diet tracking, progress analytics) delivered under senior-designer guidance.",
    meta: {
      role: "UI Design Intern (under senior designer guidance)",
      team: "Senior designer + client team",
      duration: "May 2022 – Aug 2022",
      tools: "Figma",
    },
    ...placeholderNarrative,
  },
  {
    slug: "cultural-festival-platform",
    title: "Cultural Festival Platform, Arenberg UNESCO Site",
    track: "work",
    scale: "product",
    oneLineScope:
      "A mobile app concept for a cultural festival at a UNESCO heritage site, built during a six-person ECIU Créathon team.",
    meta: {
      role: "Creative Manager",
      team: "Six-person multidisciplinary team, 13-university consortium",
      duration: "June 2026",
      tools: "Figma",
    },
    ...placeholderNarrative,
  },
  {
    slug: "robocarnival",
    title: "Multimodal Robot Interaction (RoboCarnival)",
    track: "research",
    scale: "research",
    oneLineScope:
      "A multimodal interaction concept across three robot platforms, Best Team Award at RoboCarnival 2025.",
    meta: {
      role: "Team member",
      team: "Social Robots course team",
      duration: "2025",
      tools: "QT, Misty, robot cat (course-provided platforms)",
    },
    ...placeholderNarrative,
  },
  {
    slug: "boycott4palestine",
    title: "Boycott4Palestine",
    track: "work",
    scale: "product",
    oneLineScope:
      "An informational web platform, built solo with AI-assisted, prompt-driven development end to end.",
    meta: {
      role: "Sole builder",
      team: "Solo",
      duration: "2025",
      tools: "Lovable (AI-assisted, prompt-driven development)",
    },
    ...placeholderNarrative,
  },
  {
    slug: "bachelors-thesis",
    title: "A Diverse and Explainable Multi-hop QA Dataset for Bengali",
    track: "research",
    scale: "research",
    oneLineScope:
      "Undergraduate NLP thesis: the first multi-hop QA dataset in Bengali, benchmarked against established datasets.",
    meta: {
      role: "Researcher",
      team: "Supervised by Prof. Abu Raihan Mostofa Kamal and Mohammad Anas Jawad",
      duration: "2019 – 2023",
      tools: "Dataset construction, automated evaluation",
    },
    ...placeholderNarrative,
  },
  {
    slug: "travelmate-ai",
    title: "TravelMate AI",
    track: "work",
    scale: "product",
    status: "contingent",
    oneLineScope:
      "Self-directed exploration; keep/cut/reframe decision still open (see Master_Portfolio_Knowledge_Base.md).",
    meta: {
      role: "To be confirmed",
      team: "To be confirmed",
      duration: "To be confirmed",
      tools: "To be confirmed",
    },
    ...placeholderNarrative,
  },
];

export const projectSummaries: ProjectSummary[] = caseStudies.map(
  ({ slug, title, track, oneLineScope, scale, isFlagship, status }) => ({
    slug,
    title,
    track,
    oneLineScope,
    scale,
    isFlagship,
    status,
  }),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((project) => project.slug === slug);
}

export function getProjectsByTrack(track: "work" | "research"): ProjectSummary[] {
  return projectSummaries.filter((project) => project.track === track);
}

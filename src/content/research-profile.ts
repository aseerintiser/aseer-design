import { site } from "./site";
import { about } from "./about";
import { publications, researchProfiles } from "./publications";

/**
 * The research profile: an unlisted page (not in the navigation, footer,
 * sitemap, command bar or Ask the portfolio, and hidden from search
 * engines). It is the first page a professor sees from Aseer's cold
 * emails, so it reads like an academic profile: name and affiliation
 * first, then interests, publications, the thesis in depth, other
 * research, methods, education, and the industry work as applied
 * practice.
 *
 * Stress test and rework, October 19, 2026 (with Aseer): no single target
 * ("doctoral or research position" removed, he is open to broader
 * options), interests widened to match his three CV versions, the
 * headline describes what the thesis actually studied (affect and trust)
 * with calibration kept as the forward-looking aim, and every
 * publication, figure and honor comes from his CVs, the thesis or the
 * repository records. Nothing here mentions a PhD (see content/cv.ts,
 * "two doors").
 */

export const researchProfile = {
  eyebrow: "Research profile",
  name: "Md Aseer Intiser",
  affiliation: "HCI researcher · M.Sc. in Human-Technology Interaction, Tampere University, with Distinction",
  summary:
    "I study how people come to trust AI and other emerging technologies, and how design can make that trust well placed. My M.Sc. thesis examined how feelings shaped international students' trust in a conversational AI for Finnish public services, and what made that trust break.",
  portrait: about.portrait,

  links: [
    { label: "Academic CV", href: site.academicCvUrl, note: "PDF" },
    ...researchProfiles.map((profile) => ({ label: profile.label, href: profile.href, note: undefined })),
  ],

  interests: {
    lead: "Trust is the thread through my work: how people decide how far to rely on a technology, and how design can help them get that judgment right.",
    items: [
      {
        title: "Trust and affect in human-AI interaction",
        line: "How trust in conversational AI forms, holds and breaks, and the part feelings play in it.",
      },
      {
        title: "Emerging interactive technologies",
        line: "How people adopt and use conversational AI, embodied interfaces and social robots, studied with qualitative and mixed methods.",
      },
      {
        title: "Human-centered security and ethics of AI",
        line: "The social and ethical side of AI systems, including how people understand and respond to security risks in AI assistants.",
      },
      {
        title: "Accessibility and inclusive design",
        line: "Technology for people who are new to a system, a language or a culture, and for people with different abilities, including visual accessibility.",
      },
    ],
  },

  publications,

  thesis: {
    title: "Affective dimensions of trust in conversational AI",
    details: [
      { label: "Supervision", value: "Prof. Thomas Olsson and Amir Pakpour Haji Agha" },
      { label: "Participants", value: "15" },
      { label: "Grade", value: "5/5" },
      { label: "Years", value: "2025–2026" },
    ],
    // From the thesis (Chapter 3, Appendix D) and the Lumi case study.
    method:
      "A qualitative study with 15 international students at Tampere University, in sessions of about 35 minutes. Each participant first recalled their first months in Finland, then used Lumi, a conversational AI prototype I designed and built, from the perspective of that earlier self, across four scenarios: student housing, banking, healthcare and university services. Interviews before and after the scenarios explored what participants felt, not only what they thought. Two pilot sessions shaped the design first. I analyzed the data with reflexive thematic analysis, using Trust-as-Affect as a sensitizing concept.",
    findings: [
      "Trust formed slowly, in small moments, and could break all at once: a single confident wrong answer was enough to reset it.",
      "Participants related to Lumi less as a product and more as the voice of the institutions behind it, so trust in the assistant was partly trust in those institutions.",
    ],
    // Section 3.11 and the discussion of the thesis.
    limits:
      "One university, retrospective accounts, and a single hallucination event behind the breakdown finding. The themes are one mapping of the space, to be tested across other institutions and over time.",
    // The seven principles from the Lumi case study, details shortened.
    principles: [
      {
        group: "What made trust possible",
        items: [
          { label: "Source-anchored", detail: "Every claim traceable to a real, named authority." },
          { label: "Structurally minimal", detail: "Calm and scannable, never overwhelming." },
        ],
      },
      {
        group: "What kept trust honest",
        items: [
          { label: "Scope-stated", detail: "Honest about what it does and doesn't cover." },
          { label: "Verification-supporting", detail: "Designed for people who will double-check it." },
        ],
      },
      {
        group: "Where trust needs protecting",
        items: [
          { label: "Hallucination-conservative", detail: "Built to fail safely, not confidently." },
          { label: "Vulnerability-aware", detail: "Sensitive to who's asking and why." },
          { label: "Action-closing", detail: "Helps people act, not only understand." },
        ],
      },
    ],
    fullText: "https://urn.fi/URN:NBN:fi:tuni-202606087129",
  },

  // Worded from the academic CV and the case studies.
  otherResearch: [
    {
      label: "Social Robots course, Tampere University · 2025",
      title: "Multimodal interaction with social robots",
      line: "Evaluated speech and gesture interaction on three existing robot platforms (QT, Misty and a robot cat), and exhibited the work at RoboCarnival 2025, where visiting high school students voted it Best Team.",
      href: "/research/robocarnival",
    },
    {
      label: "Independent study, Bootcamp (Medium) · 2023",
      title: "Tailoring game difficulty to player types",
      line: "A 28-person survey on what drives engagement in games, analyzed with descriptive statistics. Small, and my first study from question to write-up.",
      href: "/research/game-difficulty-player-types",
    },
  ],

  methods: [
    {
      group: "Qualitative",
      items: [
        "Semi-structured interviews",
        "Scenario-based user studies",
        "Recall-grounded scenarios",
        "Reflexive thematic analysis (Atlas.ti)",
        "Affinity mapping",
      ],
    },
    {
      group: "Evaluation and quantitative",
      items: [
        "Usability testing, including the System Usability Scale",
        "Heuristic evaluation and task analysis",
        "Surveys and descriptive statistics",
        "Eye-tracking (Tobii)",
        "Card sorting",
      ],
    },
    {
      group: "Building",
      items: [
        "Interactive prototypes with LLM integration",
        "Figma, React and Node.js",
        "Dataset construction and benchmarking (NLP)",
        "Python, R and SPSS for analysis",
      ],
    },
  ],

  education: [
    {
      degree: "M.Sc. in Human-Technology Interaction",
      place: "Tampere University, Finland",
      years: "2024–2026",
      notes: [
        "With Distinction, GPA 4.67/5.0. Thesis graded 5/5.",
        "100% merit scholarship (full tuition waiver).",
        "90 ECTS in one academic year, 50% above the standard load.",
      ],
    },
    {
      degree: "B.Sc. (Engg.) in Software Engineering",
      place: "Islamic University of Technology, Bangladesh",
      years: "2019–2023",
      notes: ["CGPA 3.61/4.00, First Class.", "Thesis on a multi-hop QA dataset for Bengali."],
    },
  ],

  // From the academic CV.
  programmes: [
    {
      title: "Erasmus+ Blended Intensive Programme on research ethics and academic integrity",
      meta: "ECIU University, INSA Lyon · 2026",
      line: "One of 10 participants. Fully funded.",
    },
    {
      title: "Erasmus+ ECIU Créathon",
      meta: "ECIU University, INSA Hauts-de-France · 2026",
      line: "One of 30 selected participants. Led a six-person team as Creative Manager and built a working app prototype. Fully funded.",
    },
  ],

  teaching: [
    {
      title: "Peer UX mentor",
      meta: "Islamic University of Technology · 2022–2023",
      line: "Set up mentoring for 23 junior students, with workshops on usability and wireframing. 10+ went on to internships or projects.",
    },
    {
      title: "Peer support",
      meta: "Tampere University · 2024–2025",
      line: "Helped classmates with Figma prototyping and qualitative coding in Atlas.ti.",
    },
  ],

  practice:
    "Before the master's, I worked for eleven months as a junior UX designer at Synesis IT on Convay, an enterprise video conferencing platform used by government and enterprise clients. I ran usability tests and heuristic evaluations, designed AI features such as multilingual meeting transcription, and laid the foundation for its design system. As an intern at Kaz Software, I designed the interface of a hygiene-monitoring prototype for UNICEF-supported sanitation work in Rohingya refugee camps, built for low-connectivity conditions. With a software engineering degree behind both, I can build the systems I study, as I did with Lumi, and test them in realistic conditions.",
};

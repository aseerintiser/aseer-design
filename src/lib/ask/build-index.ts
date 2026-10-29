import type { CaseStudy, CaseStudyBlock } from "@/content/types";
import { caseStudies } from "@/content/projects";
import { inShort } from "@/content/inShort";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { careerSteps, convayChapter, lumiFeature, moreResearch, person, travelmateFeature } from "@/content/home";
import { certificationCollections } from "@/content/certifications";
import { publications, researchProfiles } from "@/content/publications";
import { cvSummary, publicCv } from "@/content/cv";
import { slugify } from "@/lib/utils";
import type { Passage, PassageKind } from "./types";

/**
 * Builds Ask the portfolio's index at build time: every passage of text
 * Aseer wrote on the site, as it reads on the page, with the page and
 * section it sits in and a link to that spot. Quotes from other people
 * (study participants, testimonials) are left out, so an answer is
 * always his own words. Nothing here is written for the index; it only
 * gathers what the pages already say.
 */

/** Formatting markers only; the words stay exactly as written. */
export function plainText(source: string) {
  return source
    .replace(/\[\[([^\]|]+)\|[a-z0-9-]+\]\]/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\n+→\s*/g, " → ")
    .replace(/\s*\n+\s*/g, " ")
    .trim();
}

/** What a chapter is about, from its heading, so a question about a
 * role or a result can find the right chapter even with other words. */
function kindFromHeading(heading: string): PassageKind | undefined {
  const text = heading.toLowerCase();
  if (/role|responsib|what i built|my part/.test(text)) return "role";
  if (/outcome|impact|result|what we found|findings|what it means/.test(text)) return "result";
  if (/problem|challenge|pain/.test(text)) return "problem";
  if (/decision/.test(text)) return "decision";
  if (/reflection|takeaway|learn|differently/.test(text)) return "reflection";
  if (/process|method|approach|research|the study|test|evaluation|ideation/.test(text)) return "method";
  return undefined;
}

/** Words a case answers to beyond its title: the company and the kind of
 * work, all taken from the page itself. */
const projectWords: Record<string, string> = {
  "convay-mobile-app-revamp": "Convay Synesis IT mobile app",
  "convay-ai-for-physical-meetings": "Convay Synesis IT AI transcription summaries physical meetings",
  "convay-design-system": "Convay Synesis IT design system Figma",
  "convay-notifications": "Convay Synesis IT notifications",
  fitvibe: "FitVibe Kaz Software internship fitness",
  lumi: "Lumi thesis Tampere University conversational AI trust",
  "travelmate-ai": "TravelMate travel companion concept",
  "cultural-festival-platform": "Arenberg aRENEWberg cultural festival ECIU Créathon",
  robocarnival: "RoboCarnival robots human-robot interaction",
  "game-difficulty-player-types": "game difficulty player types survey",
};

function caseHref(study: CaseStudy) {
  return `/${study.track === "work" ? "work" : "research"}/${study.slug}`;
}

export function buildAskIndex(): Passage[] {
  const passages: Passage[] = [];
  let counter = 0;
  const add = ({ kind, ...passage }: Omit<Passage, "id" | "kinds"> & { kind?: PassageKind }) => {
    const text = plainText(passage.text);
    if (text.length < 12) return;
    const kinds = kind ? [kind] : [];
    // Aseer's own lines about how he works answer "how do you approach…".
    if (["Home", "About"].includes(passage.page) && /\b(start by|comes before|order of operations|before i try)\b/i.test(text)) {
      kinds.push("method");
    }
    passages.push({ ...passage, text, kinds, id: `p${(counter += 1)}` });
  };

  // Case studies and research pages.
  for (const study of caseStudies) {
    const href = caseHref(study);
    const project = `${study.title} ${projectWords[study.slug] ?? ""}`;
    const page = study.title;

    add({ text: study.oneLineScope, page, section: "Overview", href, project, kind: "about" });

    // The details row under the case title, one line per detail, as the
    // page shows them.
    const details: [string, string, PassageKind][] = study.liveMeta
      ? [
          ["Role", study.liveMeta.role.join(", "), "role"],
          ["Category", study.liveMeta.category.join(", "), "details"],
          ["Duration", study.meta.duration, "details"],
          ["Tools", study.liveMeta.tools.join(", "), "details"],
        ]
      : [
          ["Role", study.meta.role, "role"],
          ["Team", study.meta.team, "details"],
          ["Duration", study.meta.duration, "details"],
          ["Tools", study.meta.tools, "details"],
        ];
    for (const [label, value, kind] of details) {
      add({ text: `${label}: ${value}`, page, section: "Project details", href, project, kind });
    }

    const summary = inShort[study.slug];
    if (summary) {
      const items: [string, string, PassageKind][] = [
        ["The problem", summary.problem, "problem"],
        ["My role", summary.role, "role"],
        ["Key decision", summary.decision, "decision"],
        ["Result", summary.result, "result"],
      ];
      for (const [label, text, kind] of items) {
        add({ text, page, section: `In short · ${label}`, href, project, kind, prior: 1.3 });
      }
    }

    let chapter = "";
    let chapterHref = href;
    let chapterKind: PassageKind | undefined;
    let subsection = "";

    const visit = (block: CaseStudyBlock) => {
      // A questionnaire's items are its authors' words, not Aseer's
      // (FitVibe lists the ten standard SUS statements).
      if (block.type !== "heading" && /questionnaire/i.test(subsection)) return;
      const section = [chapter, subsection].filter(Boolean).join(" · ") || "Introduction";
      const base = { page, section, href: chapterHref, project, kind: chapterKind };
      switch (block.type) {
        case "heading":
          if (block.level === 3) {
            chapter = block.text;
            chapterHref = `${href}#ch-${slugify(block.text)}`;
            chapterKind = kindFromHeading(block.text);
            subsection = "";
          } else {
            subsection = block.text;
            chapterKind = kindFromHeading(block.text) ?? kindFromHeading(chapter);
          }
          break;
        case "paragraph":
        case "callout":
          add({ ...base, text: block.text });
          break;
        case "list":
          block.items.forEach((item) => add({ ...base, text: item }));
          break;
        case "quote":
          // Only Aseer's own lines: quotes with an attribution are other
          // people's words (participants, users, teammates).
          if (!block.attribution) add({ ...base, text: block.text });
          break;
        case "aside":
          block.items.forEach((item) => add({ ...base, section: `${section} · ${block.label}`, text: item }));
          break;
        case "revealGroup":
          block.groups.forEach((group) =>
            group.items.forEach((item) =>
              add({ ...base, section: [section, group.heading].filter(Boolean).join(" · "), text: `${item.label}: ${item.detail}` }),
            ),
          );
          break;
        case "painPointList":
          block.items.forEach((item) => add({ ...base, text: `${item.label}: ${item.note}` }));
          break;
        case "twoColumnCompare":
          add({ ...base, text: `${block.leftLabel}: ${block.leftText}` });
          add({ ...base, text: `${block.rightLabel}: ${block.rightText}` });
          break;
        case "timeline":
          block.steps.forEach((step) => step.detail && add({ ...base, text: `${step.label}: ${step.detail}` }));
          break;
        case "metricGrid":
          add({ ...base, text: block.items.map((item) => `${item.value} ${item.label}`).join(" · ") });
          break;
        case "beforeAfterFlow":
          add({
            ...base,
            text: `${block.oldLabel}: ${block.oldSteps.join(", ")}. ${block.newLabel}: ${block.newSteps.join(", ")}.`,
          });
          break;
        case "phaseGroup":
          add({ ...base, text: `${block.label}: ${block.intro}` });
          break;
        case "flowSteps":
          add({ ...base, text: block.steps.join(" → ") });
          break;
        case "screenPlayer":
          block.screens.forEach((screen) => add({ ...base, text: `${screen.tab}: ${screen.line}` }));
          break;
        case "costChart":
          add({ ...base, text: block.caption });
          break;
        case "image":
          if (block.caption) add({ ...base, text: block.caption });
          break;
        case "citation":
          // A reference answers "how do I cite it", rarely anything else.
          add({ ...base, section: `${section} · ${block.label}`, text: block.text, prior: 0.6 });
          break;
        case "figure":
          add({ ...base, text: [block.title, block.caption].filter(Boolean).join(". ") });
          block.blocks?.forEach(visit);
          break;
        case "details":
          block.blocks.forEach(visit);
          break;
        default:
          break;
      }
    };
    study.body?.forEach(visit);
  }

  // About.
  add({ text: `${about.heading} ${about.intro}`, page: "About", section: "Introduction", href: "/about", kind: "about", prior: 1.1 });
  add({ text: site.currentStatus, page: "About", section: "Now", href: "/about", kind: "status", prior: 1.1 });
  const { story, howIWork, drives, exploring, offDuty, recognition } = about;
  const aboutHref = (heading: string) => `/about#${slugify(heading)}`;
  for (const paragraph of story.paragraphs) {
    add({ text: paragraph, page: "About", section: story.heading, href: aboutHref(story.heading), kind: "about" });
  }
  for (const row of howIWork.rows) {
    add({
      text: `${row.label}: ${row.line} ${row.proof}`,
      page: "About",
      section: howIWork.heading,
      href: aboutHref(howIWork.heading),
      kind: "method",
    });
  }
  for (const paragraph of drives.paragraphs) {
    add({ text: paragraph, page: "About", section: drives.heading, href: aboutHref(drives.heading), kind: "about" });
  }
  add({
    text: `${exploring.question} ${exploring.line}`,
    page: "About",
    section: exploring.heading,
    href: aboutHref(exploring.heading),
    kind: "about",
  });
  for (const paragraph of offDuty.paragraphs) {
    add({ text: paragraph, page: "About", section: offDuty.heading, href: aboutHref(offDuty.heading), kind: "about" });
  }
  add({ text: offDuty.quote, page: "About", section: offDuty.heading, href: aboutHref(offDuty.heading), kind: "about" });
  add({
    text: `Interests: ${offDuty.tags.join(", ")}`,
    page: "About",
    section: offDuty.heading,
    href: aboutHref(offDuty.heading),
    kind: "about",
  });
  for (const item of [...recognition.lead, ...recognition.more]) {
    const figure = item.figure === "4.67" ? `GPA ${item.figure} ${item.unit}` : [item.figure, item.unit].filter(Boolean).join(" ");
    add({
      text: `${figure}: ${item.title} (${item.meta})`,
      page: "About",
      section: recognition.heading,
      href: aboutHref(recognition.heading),
      kind: "education",
    });
  }
  add({
    text: `Certificates: ${certificationCollections.map((collection) => collection.title).join(", ")}`,
    page: "About",
    section: recognition.heading,
    href: "/certifications",
    kind: "education",
  });

  // Home.
  add({ text: site.tagline, page: "Home", section: "Introduction", href: "/", kind: "about", prior: 1.1 });
  site.bio.forEach((line) => add({ text: line, page: "Home", section: "Introduction", href: "/", kind: "about", prior: 1.1 }));
  for (const step of careerSteps) {
    const kind: PassageKind = step.id === "bsc" || step.id === "msc" ? "education" : step.id === "now" ? "status" : "role";
    add({
      text: `${step.years} · ${step.title} · ${step.place}${step.card ? `. ${step.card}` : ""}`,
      page: "Home",
      section: "Career line",
      href: "/",
      kind,
      prior: 1.1,
    });
  }
  add({ text: lumiFeature.outcome, page: "Home", section: "Lumi", href: lumiFeature.href, project: "Lumi thesis", kind: "result" });
  add({ text: lumiFeature.role, page: "Home", section: "Lumi", href: lumiFeature.href, project: "Lumi thesis", kind: "role" });
  add({ text: convayChapter.context, page: "Home", section: "Convay", href: "/", project: "Convay Synesis IT", kind: "role", prior: 1.1 });
  for (const project of convayChapter.projects) {
    add({ text: project.outcome, page: "Home", section: `Convay · ${project.title}`, href: project.href, project: `Convay ${project.title}`, kind: "result" });
  }
  add({ text: travelmateFeature.outcome, page: "Home", section: "TravelMate", href: travelmateFeature.href, project: "TravelMate travel companion concept", kind: "result" });
  add({ text: travelmateFeature.role, page: "Home", section: "TravelMate", href: travelmateFeature.href, project: "TravelMate travel companion concept", kind: "role" });
  for (const item of moreResearch) {
    add({ text: `${item.title}: ${item.line}`, page: "Home", section: "More research", href: item.href, project: item.title, kind: "result" });
  }
  person.lines.forEach((line) => add({ text: line, page: "Home", section: "About me", href: "/", kind: "about", prior: 1.1 }));
  add({ text: person.lookingFor, page: "Home", section: "About me", href: "/", kind: "status", prior: 1.2 });

  // Contact, on every page.
  add({ text: `${site.footer.openTo} ${site.footer.openToLine2}`, page: "Contact", section: "Footer", href: "#contact", kind: "status", prior: 1.1 });
  add({ text: `Email: ${site.email}`, page: "Contact", section: "Footer", href: "#contact", kind: "contact", prior: 1.2 });

  // CV.
  add({
    text: `${publicCv.label}: ${publicCv.title}. ${publicCv.body}`,
    page: "CV",
    section: "The full record",
    href: "/resume",
    kind: "details",
  });
  add({
    text: cvSummary.map((item) => `${item.label}: ${item.value}`).join(" · "),
    page: "CV",
    section: "Summary",
    href: "/resume",
    kind: "status",
    prior: 1.1,
  });

  // Research.
  for (const publication of publications) {
    add({
      text: `${publication.citation} ${publication.detail ?? ""}`,
      page: "Research",
      section: "Publications",
      href: "/research",
      project: publication.status === "Thesis" ? "thesis publication" : "publication",
      kind: "education",
    });
  }
  add({
    text: `Research profiles: ${researchProfiles.map((profile) => profile.label).join(", ")}`,
    page: "Research",
    section: "Publications",
    href: "/research",
    kind: "details",
  });

  return passages;
}

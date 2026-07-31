/**
 * Design Showcase stopgap page (see Design-Showcase-Proposal.md for the
 * full reasoning behind this section and the plan for a proper "Craft"
 * page later). This is the low-effort version: four concept UI pieces
 * from before this rebuild, each captioned honestly as an exploration --
 * not a shipped product or a full case study -- with a link out to the
 * complete interactive Figma prototype for anyone who wants to click
 * through all four in order.
 *
 * Images are real exports from the Figma prototype (provided directly by
 * Aseer), cropped/resized for the web but otherwise unedited.
 */

export const designShowcaseHeading = "A Few Concept Explorations";

export const designShowcaseIntro =
  "Before this rebuild, I designed a handful of interface concepts to explore specific ideas, not to ship as real products. They're not case studies, just quick explorations of a problem. The full interactive prototype covers all four, linked at the bottom.";

export const designShowcaseItems = [
  {
    id: "learnsync",
    title: "LearnSync",
    description:
      "A learning-platform concept exploring how progress and mastery could be visualized for students, from module scores to retention trends over time.",
    image: {
      src: "/design-showcase/learnsync.jpg",
      width: 1600,
      height: 1138,
      alt: "LearnSync concept: a learning dashboard showing module performance and retention growth charts.",
    },
  },
  {
    id: "fundmatch",
    title: "FundMatch",
    description:
      "A landing-page concept for a startup-investor matching platform, built around a bold dark theme and a single clear action: joining the waitlist.",
    image: {
      src: "/design-showcase/fundmatch.jpg",
      width: 1600,
      height: 967,
      alt: "FundMatch concept: a dark-themed landing page headline reading 'Fuel Startups with right investors' above an email waitlist form.",
    },
  },
  {
    id: "calmly",
    title: "Calmly",
    description:
      "A conversational wellness app concept, exploring how an AI companion could respond to stress with a calm tone and a few simple guided practices.",
    image: {
      src: "/design-showcase/calmly.jpg",
      width: 1600,
      height: 1088,
      alt: "Calmly concept: three mobile screens showing a listening state, a supportive chat reply, and a 'Your Safe Space' practices screen.",
    },
  },
  {
    id: "unijobs",
    title: "UniJobs",
    description:
      "A job board concept for students, exploring how a friendly interface could make part-time work feel approachable while still studying.",
    image: {
      src: "/design-showcase/unijobs.jpg",
      width: 1600,
      height: 1056,
      alt: "UniJobs concept: a homepage headline reading 'Find Your Next Opportunity While You Study' with Start Searching and Post a Job buttons.",
    },
  },
] as const;

export const designShowcasePrototypeUrl =
  "https://www.figma.com/proto/sbZqfwEyL25YeBvaWugK9B/Design-Showcase---Sample-Work";

/**
 * Design Showcase page (see Design-Showcase-Proposal.md for the original
 * stopgap reasoning). Two honestly-different groups now live here, kept
 * deliberately separate rather than merged into one grid or one shared
 * intro paragraph, because the thing that made the original four-concept
 * intro accurate ("not to ship as real products, not case studies") is
 * no longer true of everything on this page:
 *
 * 1. The four original concept UI pieces, unchanged -- Figma-only,
 *    never shipped, captioned honestly as explorations.
 * 2. "Builds" -- real, working things, starting with ZenType, a small
 *    typing-practice product Aseer actually built (not just designed)
 *    in roughly two hours using AI-assisted prompting. Deliberately not
 *    folded into the concept grid above: doing so would either flatten
 *    ZenType down to a static image (losing the actual story, which is
 *    the workflow) or quietly make the concept section's own intro
 *    paragraph inaccurate the moment a real product sat inside it.
 *
 * "Builds" was chosen over "Experiments" specifically to avoid reading
 * as a research claim next to the site's actual Research nav item and
 * track -- this page has no methodology, no participants, no findings,
 * and shouldn't sound like it does.
 *
 * Images are real exports/screenshots (provided directly by Aseer),
 * resized for the web but otherwise unedited. Fabricated assets are not
 * used anywhere on this page.
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

export const designShowcaseBuildsHeading = "Builds";

export const designShowcaseBuildsIntro =
  "Not a concept this time. A real, working product, and the process behind it is half the story.";

// Grounded directly in Aseer's own LinkedIn post introducing ZenType --
// description, feature list, workflow, and the two-hour timeframe are
// all restated from that post, not invented or estimated here.
export const zentype = {
  title: "ZenType",
  description:
    "A calm, minimal typing practice tool with a keyboard that lights up as you type, built almost entirely through AI-assisted prompting in about two hours.",
  liveUrl: "https://dull-blog-69295856.figma.site",
  video: {
    src: "/design-showcase/zentype-demo.mp4",
    poster: "/design-showcase/zentype-2.jpg",
    width: 1366,
    height: 720,
    alt: "ZenType in use, showing the glowing on-screen keyboard and live accuracy feedback as the words are typed.",
  },
  screenshot: {
    src: "/design-showcase/zentype-1.jpg",
    width: 1833,
    height: 977,
    alt: "A ZenType typing test in progress: words per minute and accuracy tracked live above the passage, the matching key lit up on the on-screen keyboard below.",
  },
} as const;

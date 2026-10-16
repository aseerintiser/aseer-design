/**
 * Design notes (Phase 5): how this site was designed and checked, for
 * the design leads and reviewers who want proof rather than a feeling.
 * Real results only, each with how and when it was measured. Anything
 * planned but not yet run is listed as such, with no result.
 */

export const designNotes = {
  eyebrow: "Design notes",
  heading: "How this site was designed, and how it was checked.",
  intro:
    "A short record for the curious: the idea behind the site, the decisions that shaped it, and what has been measured so far. Only real results, with the date they were taken.",
  updated: "October 2026",

  idea: [
    "My Lumi study found that trust in an AI system builds slowly and can break in one moment. That shape became the mark next to my name: a slow climb, a sudden fall, and the climb back.",
    "The rest follows from it. A portfolio asks you to trust what it says, so the claims in my case studies are marked and numbered, and each one says where it comes from.",
  ],

  decisions: [
    {
      name: "Type",
      text: "Newsreader for headings, Schibsted Grotesk for reading, and IBM Plex Mono for labels and evidence. All three are free and served from this site.",
    },
    {
      name: "Color",
      text: "Paper for reading, night for the work, and a highlighter yellow that marks evidence. The yellow always sits behind dark text and never carries meaning on its own.",
    },
    {
      name: "Motion",
      text: "In story moments, things rise slowly and break fast, the way trust moved in the study. Everyday responses stay quick. One switch in the footer pauses every film.",
    },
    {
      name: "Real screens only",
      text: "Every film and close-up is cut from real project screens. No screen state was made up for a better shot.",
    },
    {
      name: "Evidence",
      text: "Numbered claims in the featured case studies each come with a note saying where they come from.",
    },
    {
      name: "Ask the portfolio",
      text: "Questions are answered only with passages from this site, quoted as written, or with “I don't know”.",
    },
  ],

  access: [
    "Keyboard, screen readers, reduced motion and printing are part of every page, not a last pass. Case studies print as clean documents, with the sources for their numbered claims at the end.",
    "I'm colorblind, so the View control in the footer is partly for me. It shows the whole site in grayscale, or as people with common color-vision deficiencies might see it, so anyone can check that no meaning depends on color alone.",
  ],

  measured: [
    {
      what: "Accessibility",
      result: "100",
      how: "Lighthouse, on the homepage, Work, Convay AI, Convay Mobile, Lumi and aRENEWberg. October 2026.",
    },
    {
      what: "Layout shift",
      result: "0.48 → 0",
      how: "Cumulative layout shift before and after the rebuild's layout pass. October 2026.",
    },
    {
      what: "Films",
      result: "GIFs → MP4",
      how: "Five 35 to 47 MB GIFs replaced by short MP4 loops. Every card film and the homepage trailer now weigh 9 MB together.",
    },
    {
      what: "Work page",
      result: "200 → 84 KB",
      how: "HTML size of the Work index after it stopped sending every case study's full text to the browser. October 2026.",
    },
    {
      what: "Screen widths",
      result: "360–1440 px",
      how: "Every page checked across this range with no sideways scrolling. October 2026.",
    },
  ],

  notYet:
    "The plan includes tests with people: a five-second test, a first-click test and a find-it test. They haven't been run yet, so there are no results to show. They will appear here when they exist.",

  builtWith:
    "Next.js, React and Tailwind CSS, hosted on Vercel. Fonts, images and films are served from the site itself, and it sets no cookies.",
};

/**
 * Site-wide content.
 *
 * Milestone 2 (migration): nav, hero copy, bio paragraphs, and social
 * links below are migrated verbatim from the live aseer.design (Framer)
 * site, per that milestone's "treat the live site as primary source,
 * don't rewrite" rule. Research/About-page-detail/Resume-page facts
 * that predate the live site content (from the Career Archive /
 * Knowledge Base) are kept where the live site doesn't cover them --
 * noted inline below.
 */

import { framerAsset } from "./media";

// Phase 2 (visual upgrade): four destinations instead of seven equal
// links. Testimonials are quoted on the homepage; Certifications,
// Articles (as "Writing") and Design Showcase move to the footer, so the
// navigation leads with the work. The CV menu and the Contact button are
// rendered by NavBar itself.
export const nav = [
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
] as const;

/** Secondary pages, linked from the footer on every page. */
export const footerPages = [
  { label: "Ask the portfolio", href: "/ask" },
  { label: "Design showcase", href: "/design-showcase" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Certifications", href: "/certifications" },
  { label: "Writing", href: "/articles" },
  { label: "Design notes", href: "/design-notes" },
] as const;

export const site = {
  name: "Md Aseer Intiser",
  shortName: "Aseer",
  // Homepage Writing Finalization milestone: "UX & Product Designer" ->
  // "Product Designer & HCI Researcher". This string drives every page's
  // <title>/OG metadata (layout.tsx), the homepage hero eyebrow, the
  // Resume page eyebrow, and (see footer.copyright below) is echoed in
  // the footer -- it's the one identity string that appears on every
  // single page. Homepage-Copy-Review.md Section 2.1/4 flagged this as
  // the one open question in that review: the old title was industry-
  // only, which sat oddly against the site's explicit goal of reading as
  // equally credible to design and research audiences. Approved as-is by
  // Aseer.
  title: "Product Designer & HCI Researcher",
  // Homepage Finalization milestone: rewritten to state a single,
  // confident claim instead of two overlapping ones ("trustworthy... backed
  // by research" repeated the same idea twice). The hero eyebrow now
  // states name + title directly (composed from `name`/`title` above, see
  // page.tsx), so this line no longer needs to carry identity on its own --
  // it can just say what the work is about.
  tagline: "Designing digital products people trust, grounded in research.",
  // Homepage Finalization milestone: trimmed from three paragraphs to two.
  // The original third paragraph ("intuitive, inclusive, and scalable
  // solutions") was a generic three-adjective list that repeated ideas
  // already implied elsewhere; its one genuinely distinctive fact --
  // trust and human-AI interaction -- is folded into paragraph one instead
  // of sitting in its own weaker paragraph. Paragraph two's facts
  // (Software Engineering background, HTI Master's, Convay, 45+ countries,
  // governments/global teams) are unchanged, just tightened.
  //
  // Homepage Writing Finalization milestone (Homepage-Copy-Review.md
  // Sections 2.3/2.4): two fixes. (1) Paragraph one opened with "I design
  // digital products," almost word for word repeating the headline just
  // above it -- reworded to "I start by understanding..." so the two
  // don't say the same thing twice in the first two sentences on the
  // page. (2) Paragraph two's Convay description didn't match the
  // Convay case study's own language ("SaaS platform" vs. the case
  // study's "video conferencing platform... trusted by governments") --
  // reworded to match. Country count confirmed by Aseer as 45+; the
  // Convay case study body in content/projects.ts said "46+" in three
  // places, flagged here as a known inconsistency and later corrected
  // to 45+ to match.
  bio: [
    "**I start by understanding how people think and behave**, then shape that into the interface itself. Lately, that's pulled me toward trust and human-AI interaction.",
    "With a background in **Software Engineering** and a **Master's in Human-Technology Interaction**, I've designed for **Convay**, a video conferencing platform trusted by governments and global teams in **45+ countries**.",
  ],
  // Homepage Finalization milestone: "Human Psychology" (a field of study,
  // not really a practiced skill) swapped for "Behavioral Research" --
  // concrete, and consistent with the trust/human-AI framing now stated
  // up front in the bio, rather than restating a discipline name.
  skillLines: [
    "UX Research • User Evaluation • Design Systems",
    "Human-AI Interaction • Accessibility • Behavioral Research",
  ],
  // Homepage Finalization milestone: no longer rendered on the homepage.
  // The hero previously gave a large square portrait + this photo roughly
  // equal visual weight to the headline, which for a product design
  // portfolio put a personal photo in competition with the work itself.
  // The About page (content/about.ts, about.topImages) already carries
  // three real photos of Aseer, so removing this from the homepage isn't
  // removing his photo from the site -- just from the one page where the
  // work should be doing the talking. Left here, unused, in case a future
  // page wants it rather than deleting a real asset reference outright.
  portrait: {
    src: framerAsset("2bZSUdqkPs4VGBtGfwyuSAZLP4.png"),
    width: 1563,
    height: 1563,
    alt: "A portrait of a young man smiling",
  },
  // Kept from the pre-migration placeholder: a real, verified fact not
  // stated on the live homepage itself, still accurate and useful in the
  // hero's supporting line. Homepage Writing Finalization milestone:
  // reworded to match the corrected, consistent Convay description used
  // in bio[1] and the Design track-split line in page.tsx (see
  // Homepage-Copy-Review.md Section 2.4) -- this field only ever
  // surfaces as the meta description (layout.tsx), not on the page
  // itself, but it was still a fourth, differently-worded version of
  // the same fact and needed to match the other three.
  heroProofPoint:
    "Convay, a video conferencing platform trusted by governments and global teams in 45+ countries.",
  // Resume Strategy milestone (Resume-Strategy-Research.md, Option D):
  // two separate documents for two separate audiences, confirmed
  // directly by Aseer (replacing the two *conflicting* live-site links
  // for the same document that this project could never resolve on its
  // own -- see the removed TODO(resume-link) note that used to sit on
  // the nav array above). resumeUrl is the one surfaced prominently
  // (Footer.tsx, the About page's "View my resume" line, and the
  // /resume page's download button) since Aseer's stated primary
  // audience is industry. academicCvUrl is surfaced once, quietly, on
  // the Research index page -- near the content that makes it relevant,
  // not given equal top-level billing -- per the research finding that
  // no real personal site showing both documents with equal prominence
  // could be found, and that doing so risked reading as an unresolved
  // identity split right at the moment a visitor is evaluating
  // credentials.
  resumeUrl:
    "https://drive.google.com/file/d/1-GzNklvbYyCw_aB3ZEpRCYf41Y3pscNY/view?usp=drive_link",
  academicCvUrl:
    "https://drive.google.com/file/d/1kHYn362GEDFPUh867hJDqNq4YREWCIsQ/view?usp=sharing",
  // Homepage Finalization milestone: rewritten from two terse,
  // resume-fragment-style sentences ("M.Sc. ... completing 2026. Open to
  // relocation.") into one sentence a person would actually say, same
  // facts (degree, university, year, relocation).
  currentStatus:
    "I finished my M.Sc. in Human-Technology Interaction at Tampere University in 2026, graduating with Distinction, and I'm open to relocating for the right opportunity.",
  email: "md.aseerintiser@gmail.com",
  // Homepage Finalization milestone: footer CTA rewritten. "Let's design
  // together" and "UX / Product design opportunities" only spoke to design,
  // which quietly excluded the research/HCI half of this portfolio (Lumi,
  // RoboCarnival, the game-difficulty study). The new heading keeps the
  // site's trust throughline going into its last words instead of
  // introducing a new idea at the very end. openTo/openToLine2 describe
  // the work thematically (design, research, AI; understanding people and
  // building for them) rather than enumerating six role titles as a list.
  footer: {
    heading: ["Let's", "build", "something", "worth", "trusting"],
    openTo: "Open to roles across design, research, and AI,",
    openToLine2: "wherever the work means understanding people and building for them.",
    body: "If your team is designing or researching something people need to trust, I'd love to talk.",
    // Homepage Writing Finalization milestone: kept in sync with the
    // `title` field above manually -- this is a separate string literal,
    // not composed from `site.title`, so it doesn't update automatically
    // when that field changes. Flagging that explicitly here since it's
    // exactly the kind of thing that quietly drifts out of sync later.
    copyright: "© Md Aseer Intiser · Product Designer & HCI Researcher",
  },
  // Live footer social order: LinkedIn, Medium, GitHub.
  socials: [
    { label: "Linkedin", href: "https://www.linkedin.com/in/md-aseer-intiser/" },
    { label: "Medium", href: "https://aseerintiser.medium.com" },
    { label: "GitHub", href: "https://github.com/aseerintiser" },
  ],
} as const;

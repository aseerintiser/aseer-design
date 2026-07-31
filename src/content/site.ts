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

// Two deliberate departures from the live nav's exact items, both
// "structural improvement while preserving content" calls the migration
// brief allows:
//
// 1. Live "Work" scrolls to a same-page anchor; here it's a dedicated
//    /work route instead. Portfolio_Strategy_Roadmap.md Section 5
//    already independently recommended exactly this: "a lightweight
//    case-study index page... so a recruiter who lands mid-site via a
//    shared link can still see the full set without going back through
//    Home." Keeping the Milestone 1 /work page is an improvement, not a
//    content change -- same projects, same order, just its own URL.
// 2. Live "Let's Connect" scrolls to a same-page footer anchor. This
//    site already has a persistent footer CTA on every page (Footer.tsx,
//    built in Milestone 1) rather than requiring a nav click-through --
//    which is what Section 4 of the same roadmap recommends ("a contact
//    action shouldn't require a dedicated click-through"). So there's no
//    separate "Let's Connect" nav item needed; the footer is already
//    always one scroll away, on every page.
//
// "Research" has no live-site equivalent at all (it was this project's
// own addition, sourced from the Career Archive, for a future track the
// live site doesn't currently have) -- kept as-is, out of scope for a
// content migration milestone, placed after About Me.
export const nav = [
  { label: "Work", href: "/work" },
  { label: "Articles", href: "/articles" },
  { label: "Certifications", href: "/certifications" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About Me", href: "/about" },
  { label: "Research", href: "/research" },
  // TODO(resume-link): the live site's nav "Resume" link and the
  // About page's "View my resume" link point to two *different* Google
  // Drive file IDs (1zwDpl7iUsqWKVv07J2ZsyUVxeSb2hCK8 vs
  // 1kPFkVVXdec47KeCuIc3eO-RXJlzp-qvz), confirming the conflict already
  // flagged in Master_Portfolio_Knowledge_Base.md Section 2.7. Rather
  // than guess which is current, this keeps pointing at the internal
  // /resume page (its own disabled-pending-confirmation state), instead
  // of silently picking one external link.
  { label: "Resume", href: "/resume" },
] as const;

export const site = {
  name: "Md Aseer Intiser",
  shortName: "Aseer",
  title: "UX & Product Designer",
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
  bio: [
    "**I design digital products by first understanding how people think and behave**, then shaping that into the interface itself. Lately, that's pulled me toward trust and human-AI interaction.",
    "With a background in **Software Engineering** and a **Master's in Human-Technology Interaction**, I've designed for **Convay**, a SaaS platform used by governments and global teams in **45+ countries**.",
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
    src: "https://framerusercontent.com/images/2bZSUdqkPs4VGBtGfwyuSAZLP4.png",
    width: 1563,
    height: 1563,
    alt: "A portrait of a young man smiling",
  },
  // Kept from the pre-migration placeholder: a real, verified fact not
  // stated on the live homepage itself, still accurate and useful in the
  // hero's supporting line.
  heroProofPoint:
    "Convay, an enterprise video platform used in 45+ countries, including government deployments.",
  // Homepage Finalization milestone: rewritten from two terse,
  // resume-fragment-style sentences ("M.Sc. ... completing 2026. Open to
  // relocation.") into one sentence a person would actually say, same
  // facts (degree, university, year, relocation).
  currentStatus:
    "I'm finishing my M.Sc. in Human-Technology Interaction at Tampere University in 2026, and I'm open to relocating for the right opportunity.",
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
    copyright: "© Md Aseer Intiser · UX & Product Designer",
  },
  // Live footer social order: LinkedIn, Medium, GitHub.
  socials: [
    { label: "Linkedin", href: "https://www.linkedin.com/in/md-aseer-intiser/" },
    { label: "Medium", href: "https://aseerintiser.medium.com" },
    { label: "GitHub", href: "https://github.com/aseerintiser" },
  ],
} as const;

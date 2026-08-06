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
// content migration milestone.
//
// Nav Order milestone: reordered from the migrated live-site order into
// three tiers, reasoned from what a recruiter actually needs at each
// point in the visit rather than the order items happened to be added
// in:
//
// 1. Proof (Work, Research, Design Showcase) -- the actual evidence,
//    first. Research sits right beside Work rather than second-to-last:
//    the homepage bio and hero both position Aseer as a Product
//    Designer *and* HCI researcher in the same breath, so a nav that
//    buried Research near the end quietly contradicted that dual
//    positioning. Design Showcase stays third, still early, per Aseer's
//    own direction that recruiters should see it quickly -- just grouped
//    with the other "here's what I can do" items instead of interrupting
//    Work and Research.
// 2. Identity (About Me) -- who's behind the work, for a visitor who's
//    now interested enough to want that context.
// 3. Supporting credibility (Testimonials, Certifications, Articles) --
//    social proof, credentials, and writing, useful but not what closes
//    the case on their own. Articles goes last: least time-sensitive,
//    and the one item here that isn't really about Aseer's own project
//    work.
//
// Resume Strategy milestone (Resume-Strategy-Research.md, Option D,
// approved by Aseer): "Resume" removed from this primary nav entirely.
// Research into real personal sites (not just advice articles) found
// resume/CV links placed in a footer and/or inline in prose far more
// often than as a top-level nav item competing with the actual case
// studies -- a nav item literally labeled "Resume" implies it's
// equally important evidence, which undersells the work itself. The
// Professional CV now lives in Footer.tsx and the About page instead
// (see site.resumeUrl below); the /resume page itself still exists and
// is still in the sitemap, just no longer nav-linked.
export const nav = [
  { label: "Work", href: "/work", external: false },
  { label: "Research", href: "/research", external: false },
  // Design Showcase stopgap milestone: a handful of concept UI pieces
  // (a learning-platform site, a fintech waitlist page, a wellness app,
  // a student job board) from before this rebuild, kept out of Work/
  // Research since they're practice pieces, not case studies -- see
  // Design-Showcase-Proposal.md for the full reasoning and the plan for
  // a proper "Craft" page later. Originally this pointed straight at the
  // source Figma prototype as a placeholder; now that real image exports
  // of all four pieces exist, it's a real in-site page (see
  // content/design-showcase.ts and app/design-showcase/page.tsx), which
  // itself links out to the full interactive prototype at the bottom.
  { label: "Design Showcase", href: "/design-showcase", external: false },
  { label: "About Me", href: "/about", external: false },
  { label: "Testimonials", href: "/testimonials", external: false },
  { label: "Certifications", href: "/certifications", external: false },
  { label: "Articles", href: "/articles", external: false },
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
  // reworded to match. Country count confirmed by Aseer as 45+ (the case
  // study body in content/projects.ts says "46+" in a couple of places;
  // that's a separate, not-yet-fixed inconsistency to correct in a
  // future projects.ts content pass, out of scope for this
  // homepage-only milestone).
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
    src: "https://framerusercontent.com/images/2bZSUdqkPs4VGBtGfwyuSAZLP4.png",
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
    "https://drive.google.com/file/d/1SxD46r-ErMQowoDBCHaNQ8XOPfsWZSYd/view?usp=drive_link",
  academicCvUrl:
    "https://drive.google.com/file/d/15Z0_jcPJy7dOHw2uERxdm3mpMJ8TRQ1D/view?usp=drive_link",
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

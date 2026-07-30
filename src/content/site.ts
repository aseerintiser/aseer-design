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
  // Live homepage badge line, directly above the H1.
  badge: "✦ ASEER ✦ RESEARCH & DESIGN",
  // Live homepage H1, verbatim.
  tagline: "Designing trustworthy digital experiences, backed by research.",
  // Live homepage bio, three paragraphs, verbatim (first is bold in the
  // source).
  bio: [
    "**I create human-centered digital experiences** by combining UX research, interaction design, and human psychology.",
    "With a background in **Software Engineering** and a **Master's in Human-Technology Interaction**, I've designed for **Convay**, a SaaS platform adopted in **45+ countries** and used by governments and global teams for large-scale collaboration.",
    "I focus on building intuitive, inclusive, and scalable solutions, with a growing interest in **trust and human-AI interaction**.",
  ],
  // Live homepage skill-tag lines, verbatim.
  skillLines: [
    "UX Research • User Evaluation • Design Systems",
    "Human-AI Interaction • Accessibility • Human Psychology",
  ],
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
  currentStatus: "M.Sc. Human-Technology Interaction, Tampere University, completing 2026. Open to relocation.",
  email: "md.aseerintiser@gmail.com",
  // Live footer copy, verbatim.
  footer: {
    heading: ["Let's", "design", "together"],
    openTo: "Open to exciting",
    openToLine2: "UX / Product design opportunities.",
    body: "Let's chat about how I can help your team design intuitive, accessible, and scalable products.",
    copyright: "© Md Aseer Intiser · UX & Product Designer",
  },
  // Live footer social order: LinkedIn, Medium, GitHub.
  socials: [
    { label: "Linkedin", href: "https://www.linkedin.com/in/md-aseer-intiser/" },
    { label: "Medium", href: "https://aseerintiser.medium.com" },
    { label: "GitHub", href: "https://github.com/aseerintiser" },
  ],
} as const;

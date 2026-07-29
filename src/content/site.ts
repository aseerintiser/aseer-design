/**
 * Site-wide content: navigation, identity, and the small set of home-page
 * facts that are already verified in Md_Aseer_Intiser_Career_Archive.md
 * and Master_Portfolio_Knowledge_Base.md, so they're safe to reuse here
 * rather than inventing placeholder claims for the hero.
 */

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
] as const;

export const site = {
  name: "Md Aseer Intiser",
  shortName: "Aseer",
  title: "UX & Product Designer",
  // Verification Ledger: VERIFIED (Synesis Chief Solutions Officer,
  // Jan 2026). Present-tense claim about the product, not a past-tense
  // personal claim, per the Archive's own usage note.
  heroProofPoint:
    "Convay, an enterprise video platform used in 45+ countries, including government deployments.",
  // Blueprint Part 1, Home section: secondary goal is to close the
  // logistics question before it becomes a reason to hesitate.
  currentStatus: "M.Sc. Human-Technology Interaction, Tampere University, completing 2026. Open to relocation.",
  email: "md.aseerintiser@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/md-aseer-intiser/" },
    { label: "GitHub", href: "https://github.com/aseerintiser" },
    { label: "Medium", href: "https://aseerintiser.medium.com" },
  ],
} as const;

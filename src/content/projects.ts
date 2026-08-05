import type { CaseStudy, CaseStudyBlock, ProjectSummary } from "./types";
import { site } from "./site";

/**
 * Project data.
 * -----------------------------------------------------------------------
 * Milestone 2 (migration): the six live "work" case studies below
 * (Convay Mobile App Revamp, Convay AI for Physical Meetings, Convay
 * Design System, Convay Notifications, FitVibe, TravelMate AI) are
 * migrated verbatim from aseer.design's Framer-hosted pages, per that
 * milestone's "treat the live site as primary source, do not rewrite"
 * rule. Text is unedited except where the source's own markdown-like
 * bold/italic markers (double and single asterisks) are preserved and
 * rendered via renderInlineMarkdown, and where the live page's static-render output
 * repeated a handful of paragraphs/headings 2-3 times (a Framer
 * responsive-breakpoint duplication artifact, not real duplicate
 * copy) -- those are collapsed to one instance each, which is a
 * formatting fix, not a content change.
 *
 * Images/GIFs are referenced directly from framerusercontent.com rather
 * than downloaded and self-hosted -- see next.config.ts remotePatterns
 * and the Milestone 2 report for why (this build environment can't
 * fetch binaries from that domain).
 *
 * Lumi, RoboCarnival, Cultural Festival Platform, and Tailoring Game
 * Difficulty to Player Types don't exist on the live site at all --
 * they were this project's own later additions (research track plus
 * one work-track case study), each migrated from its own approved
 * case-study document once written. Two earlier placeholder entries
 * this comment used to describe here (Boycott4Palestine, a Bengali NLP
 * bachelor's thesis) were removed outright in a later "portfolio
 * implementation" milestone rather than kept as placeholders -- both
 * were cut from the portfolio's scope entirely, not just left
 * unwritten.
 *
 * TravelMate AI is migrated with real content (it IS live and published).
 * Its earlier `status: "contingent"` flag has since been removed: the
 * keep/cut/reframe question is resolved (kept), so it no longer renders
 * the "Decision pending" badge -- see the note on that entry.
 */

/** Shared "Convay at a Glance" block, byte-identical across all four
 * Convay case studies on the live site -- kept as one constant here so
 * the four call sites can't quietly drift from each other, rather than
 * pasted four times.
 *
 * TODO(verification-ledger): the figures below (93% transcription
 * accuracy, 10,000-participant capacity, the SIDSSA 2025 framing, and
 * the €5M government-projects figure) are already live on aseer.design
 * today and are migrated verbatim per this milestone's "don't rewrite,
 * flag instead" rule. But per the internal verification ledger these
 * sit at "Tier 3" sourcing (self-reported / not independently
 * confirmed) and, per that ledger, shouldn't be reused without a
 * caveat or softened framing. This is a real conflict between what's
 * already public and what the ledger recommends -- left unresolved
 * here intentionally; a future content milestone should either source
 * these properly, add an explicit caveat, or soften the claims. */
const convayAtAGlance: CaseStudyBlock[] = [
  { type: "heading", level: 3, text: "Convay at a Glance" },
  {
    type: "paragraph",
    text: "Convay is a government- and enterprise-grade SaaS video conferencing platform built for modern collaboration. Unlike traditional tools, it supports the full meeting lifecycle, from scheduling and hosting to **AI-powered transcription, multilingual support, file storage, and post-meeting follow-ups**.",
  },
  {
    type: "paragraph",
    text: "Designed with scalability in mind, Convay now supports **meetings of up to 10,000 participants** and is trusted by governments and international organizations in **46+ countries**, with **10,000+ public installs** on mobile platforms. At **SIDSSA 2025**, Convay was selected **over Zoom and Google Meet** as the official conferencing platform, hosting **ICT ministers from 30+ African nations**.",
  },
  {
    type: "list",
    items: [
      "High-quality video and audio conferencing",
      "AI-based transcription and summaries (93% accuracy, multilingual: Bangla, English, French, Portuguese, Spanish)",
      "Cloud storage for meeting files and chat logs",
      "Real-time whiteboard, chat, and screen sharing",
      "Enterprise-grade security with on-premise and cloud options",
      "Cross-platform availability (Web, iOS, Android)",
    ],
  },
  {
    type: "paragraph",
    text: "Convay brings everything into one platform to simplify meetings, improve productivity, and support high-stakes collaboration at scale. Its scalability and reliability have powered **€5M government projects** and enterprise deployments worldwide.",
  },
  { type: "link", text: "convay.com", href: "https://www.convay.com" },
  { type: "paragraph", text: "**References & Mentions:**" },
  {
    type: "link",
    text: "The Daily Star",
    href: "https://www.thedailystar.net/tech-startup/news/dhaka-the-world-convays-multilingual-options-shines-global-stage-3906601",
  },
  {
    type: "link",
    text: "The Financial Express",
    href: "https://today.thefinancialexpress.com.bd/trade-market/convay-chosen-over-zoom-google-meet-for-g20-sidssa-2025-1748537594",
  },
  {
    type: "link",
    text: "The Daily Observer",
    href: "https://www.observerbd.com/news/281280",
  },
  {
    type: "link",
    text: "SIDSSA 2025 Official Post",
    href: "https://www.linkedin.com/posts/infrastructuresa_sidssa25-infrastructuresa-infrastructuredevelopment-activity-7330574469981270019-ujhF",
  },
];

const img = (id: string, width: number, height: number, alt = "") => ({
  src: `https://framerusercontent.com/images/${id}`,
  width,
  height,
  alt,
});

// ---------------------------------------------------------------------
// 1. Convay Mobile App Revamp
// ---------------------------------------------------------------------
// Convay Mobile App Revamp rebuild (see the "Convay Mobile App Revamp"
// package: 01_Audit.md through 08_Final_Review.md). Full content
// replacement and reorder, not a copy edit -- 02_Information_
// Architecture.md's six-section structure, 03_Content_Final.md's exact
// copy, real per-image alt text throughout (06_Assets_Checklist.md),
// and two new evidence pieces (a before/after entry-flow comparison and
// a research pain-point synthesis) built from existing tokens, not new
// illustrations. Nothing here invents a fact, metric, or quote beyond
// what the live page already stated; the package's own audit and this
// rewrite both treat that as a hard line. Two honest notes on the alt
// text specifically: (1) the checklist confirms exact on-screen content
// for the first five Transcription & Summarization screens and asks
// that the remaining seven "follow the same pattern" -- those seven are
// described at the same general, honest level of detail the section's
// own body copy already supports (editing, exporting, saving), not
// invented specifics I can't verify. (2) three source files are reused
// between the hero preview and a later Design Decisions gallery; each
// instance gets its own alt text appropriate to its context (a general
// preview description in the hero, the specific feature it demonstrates
// in the gallery), per the checklist's own instruction.
const convayMobileAppRevampBody: CaseStudyBlock[] = [
  // Hero visual: the fanned three-phone composition (a GIF; the
  // playback scrubber is genuinely in motion, not a static crop) as its
  // own full-width beat, followed by a supporting row of six
  // straight-on preview screens below it. Originally one seven-tile
  // ImageRow, but ImageRow forces every tile in a row to share one
  // fixed height -- next to six tall portrait screenshots, the GIF's
  // landscape 4:3 frame got squeezed down to match their height and
  // rendered as a thin, cramped strip rather than the lead visual it's
  // meant to be. Splitting it out as its own full-width `image` block
  // lets it read at the size the composition was actually made for,
  // with the static preview screens doing supporting work underneath.
  // Kept as one hero moment with a one-line caption rather than an
  // unexplained image. compactHero on the caseStudies entry below
  // closes the gap between this and the header above it.
  {
    type: "image",
    src: img("TIUlfB8AWBViTdf78QjQ3hKq2o.gif", 1600, 1200).src,
    width: 1600,
    height: 1200,
    alt: "Three angled screens from the redesigned Convay mobile app, showing the meeting dashboard and calendar view.",
  },
  {
    type: "imageRow",
    images: [
      img(
        "BkobjFZLUDbvcCYWoKrln3tuPI.png",
        750,
        1624,
        "Convay mobile app home screen preview, showing quick actions and today's meeting list.",
      ),
      img(
        "6d5XSeXWX2BjpEwNvU2tHBAHs.png",
        750,
        2220,
        "Convay mobile app meeting list preview, showing all scheduled meetings.",
      ),
      img(
        "sqYPt61SyV3toXmoOXJPwh12wco.png",
        750,
        1624,
        "Convay mobile app meeting details preview, showing meeting ID and join options.",
      ),
      img(
        "VPSC5O7xehMPIy9U8xuTuD34yE.png",
        750,
        1624,
        "Convay mobile app calendar preview, showing a selected day's scheduled meetings.",
      ),
      img(
        "z14lwNcGd9LW5GbE3P3j6HnvY.png",
        750,
        1624,
        "Convay mobile app summary preview, showing a generated meeting summary.",
      ),
      img(
        "1SvqYcMGSkhXAPyYPkPGMkOZrHY.png",
        750,
        1624,
        "Convay mobile app summary preview, showing a second generated meeting summary.",
      ),
    ],
  },
  {
    type: "paragraph",
    variant: "caption",
    text: "The redesigned Convay mobile app: onboarding, dashboard, and meeting tools rebuilt for phone-sized screens.",
  },

  // 01. Convay at a Glance -- unchanged position and content
  // (02_Information_Architecture.md), so this keeps reusing the shared
  // block rather than forking it.
  ...convayAtAGlance,

  // 02. The Problem -- unchanged position, copy tightened per
  // 03_Content_Final.md (also removes the one question-fragment opener
  // 01_Audit.md flagged, which lived in the old hero hook, not here;
  // see the caseStudies entry below for that fix).
  { type: "heading", level: 3, text: "The Problem" },
  {
    type: "paragraph",
    text: "The existing Convay mobile app fell short of a smooth experience. Users struggled with clunky navigation, unclear meeting-entry flows, and no access to features like transcription and summaries that were already available on the web. The interface was inconsistent, and onboarding was rigid: even a quick meeting required creating an account first. These gaps became real barriers in fast-paced environments, where flexibility mattered most, government briefings, field visits, meetings joined from a phone between other things.",
  },

  // 03. Research & Reasoning (new, merged) -- replaces the old standalone
  // "My Role & Responsibilities" section (now two sentences here instead
  // of its own dark section of bullets) and moves ahead of the design
  // decisions it explains, per 02_Information_Architecture.md's central
  // fix: reasoning has to come before the decisions it justifies.
  { type: "heading", level: 3, text: "Research & Reasoning" },
  {
    type: "paragraph",
    text: "I worked on this redesign as UX Designer, auditing the existing app, redesigning the onboarding and meeting flows, and building mobile-optimized UIs for transcription, summaries, and recordings that matched Convay's web design system. Throughout, I worked directly with the product team and engineers to keep every decision technically realistic on both Android and iOS.",
  },
  { type: "heading", level: 4, text: "Research and Exploration" },
  {
    type: "paragraph",
    text: "We started by identifying the pain points carried over from earlier mobile versions: clunky navigation, required logins, and limited access to meeting summaries and recordings. The user base ranged from government officials to institutional teams, many on Android. I reviewed existing mobile analytics and worked with product managers and support teams to map where users were getting stuck.",
  },
  // New asset: research-synthesis artifact (06_Assets_Checklist.md,
  // "New asset 2"). Synthesizes the three pain points the paragraph
  // above already names, so the section has one piece of visual
  // evidence instead of five straight paragraphs of dark-background
  // text.
  {
    type: "painPointList",
    items: [
      {
        label: "Clunky navigation",
        note: "Unclear meeting-entry flows made a simple join feel effortful.",
      },
      {
        label: "Required logins",
        note: "Even a quick meeting required creating an account first.",
      },
      {
        label: "Limited access to summaries and recordings",
        note: "Features already live on web were missing from mobile entirely.",
      },
    ],
  },
  {
    type: "quote",
    text: "It shouldn't take more than two taps to join a meeting.",
    attribution: "PM insight during early planning",
  },
  { type: "heading", level: 4, text: "Ideation & UX Strategy" },
  {
    type: "paragraph",
    text: "I redesigned onboarding around three entry points, deep links, Meeting IDs, and an optional password, none of which required signing up first. For the dashboard, I prioritized the actions people reached for most, Join and Start, while keeping search and calendar navigation simple.",
  },
  {
    type: "paragraph",
    text: "For post-meeting workflows, I added screens for editing transcripts and summaries with export options like PDF and DOCX. The goal throughout was feature parity with desktop, without slowing mobile users down.",
  },
  { type: "heading", level: 4, text: "Iteration and Testing" },
  {
    type: "paragraph",
    text: "To check that the flows actually made sense, I shared prototypes with the team and collected informal feedback. The \"Join without login\" flow was the clearest win, people called out how much friction it removed. We also refined touch targets, spacing, and visual hierarchy for smaller screens, aiming for something that held up in fast-paced, on-the-go use.",
  },
  {
    type: "quote",
    text: "This feels way lighter. I'd actually use this version on mobile.",
    attribution: "Developer during internal testing",
  },

  // 04. Design Decisions (renamed + merged) -- was "Design Highlights &
  // Key Improvements" plus the standalone "Challenges and Solutions"
  // section. Each challenge now sits directly beside the feature it
  // explains instead of restating it a second time further down the
  // page; the two cross-cutting challenges close the section as
  // "Constraints and Handoff" instead of getting their own section.
  { type: "heading", level: 3, text: "Design Decisions" },
  {
    type: "paragraph",
    text: "The redesign focused on making the app intuitive and consistent with Convay's broader platform. Aligning with the web version was the baseline, the mobile-specific decisions below are where the real work happened.",
  },

  { type: "heading", level: 4, text: "1. Simplified Onboarding Flow" },
  {
    type: "paragraph",
    text: "The old app required signing up before joining any meeting. The redesigned entry flow lets people join with just a Meeting ID or a deep link, no login required. Optional password entry, a pre-join camera and mic check, and clear error handling round out first-time access.",
  },
  {
    type: "imageRow",
    images: [
      img(
        "8TeXwnGcZZxx87Ev3pKBC6NVWA.png",
        750,
        1624,
        "Convay mobile app Get Connected intro screen, the first onboarding screen a new user sees.",
      ),
      img(
        "Ag3dTtrmXwtJfmRyLvvNB2sstKU.png",
        750,
        1624,
        "Convay mobile app Get Connected screen, showing the call to sign in or join a meeting.",
      ),
      img(
        "oMcKqOSsfqknwbursjoOy7vRM.png",
        750,
        1624,
        "Convay mobile app Sign In screen, showing email and password fields.",
      ),
      img(
        "PcUjaqL2oPNTAPLgj3L6j0LSgk.png",
        750,
        1624,
        "Convay mobile app Create Account screen, showing the sign-up form.",
      ),
      img(
        "7jxryX696rOXbbVRObvISh52Zg.png",
        750,
        1624,
        "Convay mobile app Join a Meeting screen, showing Meeting ID entry and audio/video toggle before joining.",
      ),
      img(
        "IgQYu8G0zLh41LfPARangdfg.png",
        750,
        1742,
        "Convay mobile app Join a Meeting screen with an optional password field.",
      ),
      img(
        "ZFbKyStXxAhhfTEkjHA3pqDdco.png",
        750,
        1624,
        "Convay mobile app Verify Email screen, showing a code entry field.",
      ),
      img(
        "OdNcILdTsOoo8Gg2Itir0dk1V7o.png",
        750,
        1624,
        "Convay mobile app Update Profile screen, shown after first sign-in.",
      ),
    ],
  },
  {
    type: "callout",
    text: "The hardest part wasn't the happy path, it was guest access. Many users needed to join quickly without creating an account, and the old flow forced sign-up regardless. We solved it with a dedicated \"Join as Guest\" option built around the Meeting ID or deep link, which cut entry time meaningfully for high-pressure cases like official briefings.",
  },
  {
    type: "quote",
    text: "Sometimes I just need to join a meeting instantly, signing up feels like an extra hassle.",
    attribution: "Internal testing feedback",
  },

  { type: "heading", level: 4, text: "2. Mobile-Optimized Dashboard" },
  {
    type: "paragraph",
    text: "The dashboard gives quick access to scheduled meetings through search, a calendar view, and one-tap actions like Join or Start Meeting. It mirrors the web layout while accounting for mobile touch ergonomics: larger tap targets, thumb-reachable primary actions, and a simpler information hierarchy than the desktop version needs.",
  },
  {
    type: "imageRow",
    images: [
      img(
        "BkobjFZLUDbvcCYWoKrln3tuPI.png",
        750,
        1624,
        "Convay mobile app home screen, showing quick actions (Start Meeting, Schedule, Join Meeting) and today's meeting list.",
      ),
      img(
        "JCocsdjK8gSkgLls5yv35pYJL0.png",
        750,
        1624,
        "Convay mobile app calendar view, showing scheduled meetings by month.",
      ),
      img(
        "VPSC5O7xehMPIy9U8xuTuD34yE.png",
        750,
        1624,
        "Convay mobile app calendar view with a specific day selected.",
      ),
      img(
        "7KwOWX6IzhfsUuQyA7MiXvhs.png",
        750,
        1678,
        "Convay mobile app Meeting Invitation detail screen, showing meeting time and participants.",
      ),
      img(
        "6d5XSeXWX2BjpEwNvU2tHBAHs.png",
        750,
        2220,
        "Convay mobile app My Meetings list, showing all scheduled meetings.",
      ),
    ],
  },

  { type: "heading", level: 4, text: "3. Transcription & Summarization Access" },
  {
    type: "paragraph",
    text: "Dedicated pages let users view and edit transcripts, generate summaries, and download notes as PDF, DOCX, or TXT. Support for Bangla and English reflects the primary user base in Bangladesh, carrying over the same multilingual transcription (93% accuracy across five languages) available on web.",
  },
  {
    type: "imageRow",
    images: [
      img(
        "sqYPt61SyV3toXmoOXJPwh12wco.png",
        750,
        1624,
        "Convay mobile app Meeting Details screen, showing meeting link, ID, password, participants, files, and recording and transcription availability.",
      ),
      img(
        "vMYgPucySmXNJMdy0C7PwRLw02U.png",
        750,
        1624,
        "Convay mobile app live transcript screen, showing speaker-labeled messages as the meeting is transcribed.",
      ),
      img(
        "OUEfdLxb2IR25LivtGIh4j4Vx0.png",
        750,
        1624,
        "Convay mobile app transcript screen mid-load, showing a progress spinner overlay.",
      ),
      img(
        "Itj4dk903fNmQp2RVN07xLIQwg.png",
        750,
        1624,
        "Convay mobile app summary screen with the Choose Language picker open, showing multiple language options.",
      ),
      img(
        "uIJedHGKyUAgQgQ718vlIOOF8A.png",
        750,
        1624,
        "Convay mobile app summary screen with a copy, share, export, and delete contextual menu open.",
      ),
      img(
        "z14lwNcGd9LW5GbE3P3j6HnvY.png",
        750,
        1624,
        "Convay mobile app summary screen, showing a generated meeting summary.",
      ),
      img(
        "WieFKhpVaTwrFnKJhMkdNmPveU.png",
        750,
        1624,
        "Convay mobile app transcript screen, showing an editable segment of the conversation.",
      ),
      img(
        "NiyoTTYIANAtfKu4p1fzzlPUlA.png",
        750,
        1624,
        "Convay mobile app transcript screen, showing further conversation detail.",
      ),
      img(
        "1SvqYcMGSkhXAPyYPkPGMkOZrHY.png",
        750,
        1624,
        "Convay mobile app summary screen, showing a second generated meeting summary.",
      ),
      img(
        "mvtYICQECg3fCWxMNZkrdlZS4.png",
        750,
        1624,
        "Convay mobile app export screen, showing format options for downloading notes.",
      ),
      img(
        "nB1wNttRToNDEsn4Pe4FJyjc0I.png",
        750,
        1624,
        "Convay mobile app summary screen, showing further summary detail.",
      ),
      img(
        "RfAIFaFawsJLQq1FIPQYBgGtA.png",
        750,
        1624,
        "Convay mobile app transcript screen, showing the completed transcript.",
      ),
    ],
  },
  {
    type: "callout",
    text: "Feature parity was the real challenge here. Mobile users had no access to transcription, summaries, or recordings at all, features that were standard on web. We designed mobile-specific interfaces for viewing, editing, and downloading transcripts and summaries, with the same multilingual support, so mobile stopped being the lesser version of Convay.",
  },
  {
    type: "quote",
    text: "I didn't expect to edit meeting notes this easily on mobile. This feels smooth.",
    attribution: "Developer preview session",
  },

  { type: "heading", level: 4, text: "4. Recordings Page" },
  {
    type: "paragraph",
    text: "Users can view, download, and manage recordings directly from the app. Processing loaders, file metadata, contextual menus, and a search bar bring the recordings experience to parity with web.",
  },
  {
    type: "imageRow",
    images: [
      img(
        "tT0Q4Unl05q5M1Yw3WyKrZyLThg.png",
        750,
        1624,
        "Convay mobile app recordings list, showing three files with duration and file size.",
      ),
      img(
        "ejJ5yjgYGAoBRDIbTOoYLvo5I.png",
        750,
        1624,
        "Convay mobile app recordings list with one file in a Processing state.",
      ),
      img(
        "xaazyhUVhrEGDQlYlLMQdF65tUI.png",
        750,
        1624,
        "Convay mobile app recordings screen with the search bar active.",
      ),
      img(
        "0La9SJB149VU3e8KJkeHgyKQ8a8.png",
        750,
        1624,
        "Convay mobile app meeting minutes screen with a language selector for exporting notes.",
      ),
    ],
  },
  {
    type: "callout",
    text: "Because the mobile and web apps had grown apart, switching between them used to be confusing, different layouts, different components, different mental models for the same task. Aligning the recordings page, and the rest of the redesign, with the web design system's layouts and components fixed that, so moving between platforms now feels like the same product.",
  },

  { type: "heading", level: 4, text: "Constraints and Handoff" },
  {
    type: "paragraph",
    text: "Two constraints shaped the whole project rather than any single screen. Smaller screens meant rethinking hierarchy, spacing, and touch targets without losing clarity, we leaned on platform heuristics like thumb ergonomics and tap-area sizing to keep core actions like Join and Start one tap away. And limited engineering bandwidth meant not every desktop feature could ship one-to-one on mobile, so I worked with developers and PMs to scope realistic MVPs and handed off Figma files with mobile components, spacing rules, and interaction specs attached.",
  },

  // 05. Outcome and Impact -- status framing moved to the top, stated
  // once, plainly (01_Audit.md's second-priority finding), then the new
  // before/after comparison makes the "five taps to three" claim visible
  // instead of only stated.
  { type: "heading", level: 3, text: "Outcome and Impact" },
  {
    type: "callout",
    text: "What follows comes from internal design reviews and prototype walkthroughs with the product and engineering team, informal validation with teammates and reviewers rather than an external usability study or live production data.",
  },
  // New asset: before/after entry-flow comparison
  // (06_Assets_Checklist.md, "New asset 1"). Both sides are plain
  // labeled steps, no screenshots: no authentic screenshot of the old,
  // pre-revamp app exists anywhere in this project's files, and the
  // package this was built from draws a hard line against ever
  // recreating one. The exact step labels below (five old, three new)
  // are the package's own given breakdown, not invented here.
  {
    type: "beforeAfterFlow",
    oldLabel: "Old flow: 5 steps",
    oldSteps: ["Open app", "Sign up", "Verify email", "Create profile", "Join meeting"],
    newLabel: "New flow: 3 steps",
    newSteps: [
      "Join with Meeting ID or deep link",
      "Optional password",
      "Camera and mic check, then join",
    ],
  },
  {
    type: "list",
    items: [
      "**Meeting entry dropped from five taps to three**, the clearest, most measurable change in the redesign.",
      "**Mobile reached feature parity with web**: transcription, summaries, and recordings all shipped to the design.",
      "Every task attempted during internal prototype walkthroughs was completed successfully.",
      "**Five of six reviewers** described the redesign as \"more intuitive\" during design handoff.",
      "Mobile picked up **multilingual access**, including Bangla summaries, that the old app never had.",
      "The redesign meaningfully improves mobile readiness for on-the-go meetings in government and NGO settings.",
      "Visual and interaction consistency between web and mobile is stronger than at any earlier point in Convay's mobile history.",
    ],
  },
  {
    type: "paragraph",
    text: "These results give Convay a credible case for prioritizing mobile as it keeps scaling across 46+ countries.",
  },

  // 06. Takeaways -- unchanged position and content. The closing quote
  // gets extra visual weight (size: "large") per 04_Visual_
  // Specification.md: the single most memorable line on the page, and
  // the only place in this rebuild where a visual element should look
  // deliberately different from its siblings.
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Working on Convay Mobile pushed me to design more intentionally for constraints, not just screen size, but the ways people actually use phones during meetings. I learned the value of designing for real people in real contexts: a government official joining a meeting on the go, a participant quickly checking a summary in Bangla. I had to rethink flows from scratch, make room for quick access, and design for hosts and guests who might be joining from anywhere.",
  },
  {
    type: "paragraph",
    text: "It also deepened my collaboration skills. Aligning with the web experience, keeping components reusable, and staying inside what engineering could realistically build taught me how to balance usability, speed, and consistency, even while the product kept evolving.",
  },
  {
    type: "quote",
    text: "I used to think mobile design was about resizing.\nNow I see it's about rethinking.",
    size: "large",
  },
];

// ---------------------------------------------------------------------
// 2. Convay AI for Physical Meetings
// ---------------------------------------------------------------------
const convayAiBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [
      img("7mhLYobFRspDQYe7igyV2dg5zqQ.gif", 1600, 1200),
      img("1Xrqe0NuG8d4DN8vwSWL99pzRPk.png", 2048, 1280),
      img("8MC8dnNQxy5ID9JHklgxyokoRE0.png", 2048, 1280),
      img("vjGrDy2Z0TywkCKJsDAFJaV9io.png", 2048, 1280),
      img("YJ889zIFFjZ35VfVtpImTq0dxVs.png", 2048, 1280),
      img("wvjdbZNqmnqe9WrrgfaDvgLenAk.png", 2048, 1280),
      img("veV5cHUbDznR85kSt8TtYr2dSg.png", 2048, 1280),
    ],
  },
  ...convayAtAGlance,
  { type: "heading", level: 3, text: "Feature Overview" },
  {
    type: "paragraph",
    text: "Convay AI for Physical Meetings brings offline conversations into the digital workspace. Instead of relying on handwritten notes or memory, users can now **record in-person meetings**, **generate full transcripts**, **summarize them with AI**, and **export** everything, seamlessly. The feature was designed to be fast, accurate, and secure, especially for **confidential internal syncs and government use cases**. Whether it's a small strategy meeting or a closed-door briefing, teams leave with clear, shareable documentation, just like they would in a virtual meeting.",
  },
  {
    type: "paragraph",
    text: "This feature also supports **multilingual transcription**, including English and Bengali, making Convay **one of the first platforms to support real-time, localized summaries** for physical meetings.",
  },
  { type: "heading", level: 3, text: "Problem Statement" },
  {
    type: "paragraph",
    text: "In high-stakes in-person meetings, like government briefings or internal syncs, **crucial details often go undocumented**. Teams either take rough notes or rely on memory, risking missed tasks, misunderstood decisions, and accountability gaps. Traditional transcription tools cater mostly to online settings, leaving physical conversations in a productivity blind spot.",
  },
  {
    type: "paragraph",
    text: "Convay needed a way to bring **offline meeting intelligence into its digital ecosystem**, without making users change their natural workflow. The goal was clear: create a feature that could **automatically capture, structure, and summarize real-world discussions** with the same quality and ease as online calls. It had to be simple enough for a 10-minute sync, yet secure and reliable for official proceedings.",
  },
  { type: "heading", level: 3, text: "My Role and Responsibilities" },
  {
    type: "paragraph",
    text: "I was part of the core design team during the early concept and prototyping phase of this feature. My focus was to **translate a vague product idea into a clear, usable experience**.",
  },
  {
    type: "paragraph",
    text: "I designed the full user flow, starting from how someone would set up an in-person meeting, to how they'd record, review, and extract insights after the session. I created UI mockups, built multiple design variants for testing, and worked closely with developers to ensure technical feasibility. My decisions were guided by **real-world use cases**, like small internal syncs and government meetings where formal documentation was essential.",
  },
  {
    type: "paragraph",
    text: "I also ran **internal usability testing** to compare interface versions, gathered feedback, and iterated based on what worked best for the users. Every design choice aimed to reduce friction and make the tool feel as seamless as pressing \"Record\" and getting a polished summary back.",
  },
  { type: "heading", level: 3, text: "Design Process" },
  {
    type: "paragraph",
    text: "**Research**: We began by identifying a key gap in physical meetings: no easy way to document discussions in real-time. Through internal interviews and team feedback, we confirmed that manual notes often led to missed details, especially in fast-paced syncs or confidential meetings. This insight guided the idea: make in-person meetings as easy to document and summarize as online ones.",
  },
  {
    type: "paragraph",
    text: "**Ideation and Design**: We mapped a simple, linear flow:\n*set meeting context → record audio → generate transcript → summarize → export*.\nEach screen was designed to be clean, minimal, and mobile-friendly to support quick use in real-world meeting environments.",
  },
  {
    type: "image",
    ...img("8MC8dnNQxy5ID9JHklgxyokoRE0.png", 2048, 1280),
    caption: "Meeting Dashboard Page: Users can access all meetings, start new ones, upload previous recording file or view recent recordings.",
  },
  {
    type: "image",
    ...img("zDYKNitEmcDcwHCOfBGC229sK4.png", 2048, 1280),
    caption: "Meeting Information Page: Users can enter the title and description and click \"Start\" or \"Cancel.\"",
  },
  {
    type: "image",
    ...img("1Xrqe0NuG8d4DN8vwSWL99pzRPk.png", 2048, 1280),
    caption: "Main Meeting Panel Page: Featuring a large microphone icon and live transcript display.",
  },
  {
    type: "image",
    ...img("410MKXb1alte85QbVYXpI4V1eps.png", 2048, 1280),
    caption: "End Session Confirmation Modal: Prompting users to confirm ending the session.",
  },
  {
    type: "image",
    ...img("vjGrDy2Z0TywkCKJsDAFJaV9io.png", 2048, 1280),
    caption: "Loading UI for Transcription: A visual indication of the transcription process.",
  },
  {
    type: "image",
    ...img("veV5cHUbDznR85kSt8TtYr2dSg.png", 2048, 1280),
    caption: "Meeting Transcription Page: Where users can view and edit the transcription.",
  },
  {
    type: "image",
    ...img("EGFYtLezuDCMWYP1Gf4bbhznNqU.png", 2048, 1280),
    caption: "AI Summarization Loading Screen: A loading skeleton while the AI summarizes the meeting.",
  },
  {
    type: "image",
    ...img("wvjdbZNqmnqe9WrrgfaDvgLenAk.png", 2048, 1280),
    caption: "Meeting Summary Page: Displays the summarized content.",
  },
  {
    type: "image",
    ...img("0SJ3tiFMjwepbtayFx4vdt4Kc.png", 2048, 1276),
    caption: "Export Options: For downloading the meeting summary and transcript.",
  },
  {
    type: "image",
    ...img("kcyNkZP0HCDiDoOg76iSiQ0.png", 2048, 1280),
    caption: "Transcript Editing Options: A 3-dot modal for editing the transcript and renaming speakers.",
  },
  {
    type: "image",
    ...img("YJ889zIFFjZ35VfVtpImTq0dxVs.png", 2048, 1280),
    caption: "Edit Transcript Page: Users can make changes to the transcript.",
  },
  {
    type: "image",
    ...img("RN6g2dJGuLKonbGP7IYfdPI3ulA.png", 2048, 1280),
    caption: "Rename Speaker Page: Allows for renaming speakers.",
  },
  {
    type: "imageRow",
    images: [
      img("QPbvQ4Uv6u7wvuiLmDxrjc9Cyyg.png", 2048, 1280),
      img("2nXhRwbs20IRostKL2PZ6VfuxVg.png", 2048, 1280),
      img("uIyaqFwBePdCbz9bJa5Guu6VM.png", 2048, 1280),
    ],
  },
  {
    type: "paragraph",
    text: "*Edit Meeting Title Page: Users can modify the meeting title.*",
  },
  {
    type: "paragraph",
    text: "**Iteration and Testing**: During testing, we developed two versions of the Meeting Panel page to evaluate user preferences:",
  },
  {
    type: "image",
    ...img("1Xrqe0NuG8d4DN8vwSWL99pzRPk.png", 2048, 1280),
    caption: "This version aligns with Convay's main theme, providing a cohesive look.",
  },
  {
    type: "image",
    ...img("uouzaoVXpICMh8XHJiS4I9DMEsg.png", 2048, 1280),
    caption: "A lighter interface for improved visibility, but it did not match the overall aesthetic of the Convay platform.",
  },
  {
    type: "paragraph",
    text: "Users strongly preferred the dark version, consistent with Convay's core product UI and easier on the eyes during extended use. We also tested the transcript editing and summary flow, ensuring that each step felt intuitive and could work without onboarding.",
  },
  { type: "paragraph", text: "Feedback led to:" },
  {
    type: "list",
    items: [
      "Removing the \"Mute\" text label (just icon)",
      "Refining the AI summary button placement",
      "Smoothing transitions between transcript → summary → export",
    ],
  },
  { type: "heading", level: 3, text: "Challenges and Solutions" },
  {
    type: "paragraph",
    text: "**Challenge: Noisy physical environments reduced transcription quality**\nIn real-world settings like government offices and team syncs, background noise made it difficult to capture accurate transcripts.",
  },
  {
    type: "paragraph",
    text: "**Solution**: We explored early-stage **noise filtering** and **speaker identification** techniques during research. While still in development, internal tests showed a **notable boost in accuracy**, especially in quieter rooms.",
  },
  { type: "quote", text: "Even in busy rooms, the transcript quality held up well.", attribution: "Internal Tester" },
  {
    type: "paragraph",
    text: "**Challenge: Inconsistent UI between Meeting Panel and core platform**\nThe Meeting Panel was originally designed in **light mode**, while Convay's main UI used **dark mode**, causing visual dissonance and distraction.",
  },
  {
    type: "paragraph",
    text: "**Solution**: We tested both variants and switched to **dark mode** for consistency and better focus.\n→ **82%** of internal testers preferred the updated dark version.",
  },
  {
    type: "paragraph",
    text: "**Challenge: Speaker renaming was time-consuming**\nUsers needed to manually update speaker names throughout the transcript, especially frustrating in longer meetings.",
  },
  {
    type: "paragraph",
    text: "**Solution**: We designed a **bulk rename flow**, allowing users to rename once and apply it throughout.\n→ This reduced speaker editing time by an estimated **30–40%**.",
  },
  {
    type: "paragraph",
    text: "**Challenge: Users were unsure about using AI summarization**\nSome users hesitated to click \"Summarize with AI,\" unsure of its purpose or outcome.",
  },
  {
    type: "paragraph",
    text: "**Solution**: We gave the button a **clear label**, **prominent placement**, and **optional use**, ensuring it felt helpful, not overwhelming.",
  },
  { type: "quote", text: "I didn't expect it to be that simple. The summary saved me a ton of time.", attribution: "User feedback" },
  { type: "heading", level: 3, text: "Outcome and Impact" },
  {
    type: "paragraph",
    text: "Though still in its early stage, **Convay AI for Physical Meetings** delivered strong results in **internal testing** and team evaluations.",
  },
  {
    type: "list",
    items: [
      "**~85% transcription accuracy** was achieved in quiet environments, even with varied speaker tones.",
      "Teams reported **30–40% reduction in time** spent creating meeting notes.",
      "The **AI summarization feature** helped users quickly recall key takeaways, especially in **confidential internal syncs** where formal minutes were previously missing.",
      "Support for **Bengali transcription** gave Convay a unique edge over global competitors, especially for local government adoption.",
      "The streamlined export process (PDF) made it easy to **share documentation post-meeting**, helping teams align faster.",
    ],
  },
  {
    type: "paragraph",
    text: "This feature also added a strategic angle: it positioned Convay not just as an online collaboration tool, but as a **Zoom + Otter.ai hybrid**, extending value even in offline and hybrid use cases. As Convay scales to **10,000+ participant support** and continues to serve **government ministries and international symposiums**, this feature shows how UX can drive product evolution and market differentiation.",
  },
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Designing Convay AI for Physical Meetings helped me think beyond screens and solve for real-world complexity, like making offline meetings as actionable as online ones. I learned to simplify **AI workflows**, design **multilingual support** with accessibility in mind, and ensure **consistency** across light and dark modes.",
  },
  {
    type: "paragraph",
    text: "This project also sharpened my **collaboration skills with developers**, especially while testing transcript editing logic and speaker detection flows. Most importantly, it reminded me that great UX isn't just about clarity, it's about **trust**. Especially when the users are government teams, confidential briefings, or high-stakes internal syncs.",
  },
  {
    type: "paragraph",
    text: "I now approach every feature with the mindset of:",
  },
  {
    type: "quote",
    text: "How can this reduce friction and make someone's job easier, even when they're not behind a screen?",
  },
];

// ---------------------------------------------------------------------
// 3. Convay Design System
// ---------------------------------------------------------------------
const convayDesignSystemBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [
      img("wM8AKcML8xyCnuWF75Zo6IkA18.png", 647, 245),
      img("SR7Ty4Rtj9VnaJoe9zZ7wA2yFJI.png", 709, 561),
      img("PCl7JbO66ST97AOthwGOw9zmTs.png", 177, 302),
      img("l9VJURbZM2vInRtmkGKwhfNrP0.png", 222, 904),
      img("RFIwMbzOBq1i3CiHl7feTRCmbc.png", 839, 1063),
      img("Pz3gr4au6hAzTaXAeWRxckpYxW4.png", 839, 1067),
    ],
  },
  ...convayAtAGlance,
  { type: "heading", level: 3, text: "Overview" },
  {
    type: "paragraph",
    text: "When I joined Convay, the platform already had a range of features live, but each had been designed in isolation, without shared styles or reusable components. This lack of consistency created visual misalignment, slowed down development, and made scalability difficult.",
  },
  {
    type: "paragraph",
    text: "I was tasked with bringing order to this growing system. I began by auditing the existing UI and identifying inconsistencies across layouts, colors, typography, and spacing. From there, I built a flexible design system in Figma, introducing a unified visual language that could scale across teams, features, and devices.",
  },
  {
    type: "paragraph",
    text: "This system became the single source of truth for Convay's product design, enabling the team to maintain consistency across light and dark themes, support rapid iteration, and future-proof upcoming features.",
  },
  { type: "heading", level: 3, text: "Defining Global Variables" },
  {
    type: "paragraph",
    text: "To build a scalable design system, I started by defining global variables for Convay. These variables include foundational elements like colors, spacing, stroke widths, and corner radii, which create a consistent look and feel across the platform. By centralizing these core design properties, we can quickly make updates or adjustments across the entire platform without manually editing individual components.",
  },
  {
    type: "paragraph",
    text: "**Color Variables**: I defined a palette of brand colors and content colors, with different shades for light and dark modes. Each color has specific uses, such as distinguishing primary actions from secondary ones, ensuring clarity and consistency throughout the interface.",
  },
  {
    type: "imageRow",
    images: [
      img("Pz3gr4au6hAzTaXAeWRxckpYxW4.png", 839, 1067),
      img("RFIwMbzOBq1i3CiHl7feTRCmbc.png", 839, 1063),
    ],
  },
  {
    type: "paragraph",
    text: "**Spacing**: To maintain uniformity in layout and padding, I established a range of spacing variables (e.g., XXS, XS, M, L, XL). This spacing structure supports flexibility across different screen sizes while keeping the design cohesive.",
  },
  { type: "image", ...img("SR7Ty4Rtj9VnaJoe9zZ7wA2yFJI.png", 709, 561), alt: "Spacing variables" },
  {
    type: "paragraph",
    text: "**Stroke Width**: Stroke widths were standardized with variables like \"Thin,\" \"Thick,\" and \"Thickest\" for borders and outlines, ensuring that lines maintain a consistent weight throughout the platform.",
  },
  { type: "image", ...img("wM8AKcML8xyCnuWF75Zo6IkA18.png", 647, 245), alt: "Stroke width variables" },
  {
    type: "paragraph",
    text: "**Corner Radius**: For rounded elements, I defined corner radius variables ranging from \"None\" (sharp corners) to \"XX-Large\" and \"Circular,\" adding visual balance and hierarchy depending on the element's function.",
  },
  { type: "image", ...img("eklLqLjKkIanx3IlAAvezPLZlk.png", 646, 377), alt: "Corner radius variables" },
  {
    type: "paragraph",
    text: "These global variables form the backbone of Convay's design system, allowing the team to apply consistent styling across multiple features quickly and effortlessly.",
  },
  { type: "heading", level: 3, text: "Establishing Styles for Text, Effects, and Grid Layouts" },
  {
    type: "paragraph",
    text: "After defining the global variables, I moved on to setting up Figma styles for text, effects, and grid layouts. These styles are essential for ensuring a unified appearance across the platform and enhancing readability, visual hierarchy, and accessibility.",
  },
  {
    type: "paragraph",
    text: "**Text Styles**: I created a comprehensive set of text styles to cover various use cases, including titles, subtitles, body text, and captions. Each style was carefully defined with font size, weight, and line height for both web and mobile. This typographic system ensures consistency in text presentation across different screens and enhances the readability of content.",
  },
  { type: "image", ...img("l9VJURbZM2vInRtmkGKwhfNrP0.png", 222, 904), alt: "Text styles" },
  {
    type: "paragraph",
    text: "**Effect Styles**: To add depth and focus to elements, I developed elevation (shadow) styles in both light and dark modes. The shadows range from subtle (Shadow 02) to more pronounced (Shadow 64), allowing us to highlight elements based on their importance. For example, higher shadow values are applied to modals and pop-up elements to help them stand out against the background.",
  },
  { type: "image", ...img("ldkkedVjXV5kjrW3geEq2xRrM.png", 195, 492), alt: "Effect / shadow styles" },
  {
    type: "paragraph",
    text: "**Grid Styles**: For a structured layout, I established grid styles for different devices and layouts, including desktop, tablet, and mobile views. These grids, such as the 12-column layout for dashboards and adaptive columns for various sections, support a flexible and responsive design. By using a standardized grid, we ensure that components are evenly aligned and that the platform scales smoothly across different screen sizes.",
  },
  { type: "image", ...img("PCl7JbO66ST97AOthwGOw9zmTs.png", 177, 302), alt: "Grid styles" },
  {
    type: "paragraph",
    text: "These style definitions add structure to Convay's design, ensuring that text, effects, and layout grids remain consistent and visually appealing across various components.",
  },
  { type: "heading", level: 3, text: "Applying the Design System to Components and UI Elements" },
  {
    type: "paragraph",
    text: "With the foundational variables and styles established, I applied these elements to create a cohesive, scalable design system for Convay's UI components. This step involved building out reusable components using the defined colors, text styles, spacing, stroke widths, and effects, ensuring each part of the UI adheres to the new design standards.",
  },
  {
    type: "list",
    items: [
      "**Buttons**: I used the global color variables and spacing options to design different button states, such as primary, secondary, active, hover, and pressed. Each button is visually consistent with the brand colors and provides clear feedback to users during interactions, enhancing usability.",
      "**Icons and Badges**: The icons and badges across Convay were updated to align with the new color scheme, using accent colors for alerts and notifications. Each icon's stroke width and corner radius were adjusted based on the defined variables, ensuring they are visually harmonious across all screens.",
      "**Forms and Input Fields**: The design system also covers form components, including text fields, dropdowns, checkboxes, and radio buttons. Using standardized text styles, colors, and spacing ensures that all forms look consistent and feel intuitive, reducing cognitive load on users.",
      "**Modals and Dialogs**: Modals were designed with proper elevation styles to give them prominence on the screen. The standardized corner radius and shadow effects make dialogs visually distinct, helping users recognize important messages or actions.",
    ],
  },
  {
    type: "paragraph",
    text: "By applying these styles across various components, we achieved a unified look and feel for Convay. This structured approach improves user experience, making interactions more predictable and intuitive, while also making it easier for developers to implement consistent designs.",
  },
  { type: "heading", level: 3, text: "Enhancing Scalability and Future-Proofing Convay" },
  {
    type: "paragraph",
    text: "Creating a design system for Convay not only unified the visual and interactive aspects of the platform but also improved scalability and future-proofing. Before my work, Convay's design elements were not standardized, making it challenging to maintain visual consistency across new and existing features. Now, with a well-documented design system, Convay's design and development teams can easily introduce new components and features that align with the established look and feel.",
  },
  {
    type: "list",
    items: [
      "**Easier Development Process**: With predefined styles and components in Figma, developers now have a clear guide for implementing UI elements. This reduces the need for design adjustments in each iteration, speeding up the development cycle and reducing the risk of inconsistencies.",
      "**Scalability Across Platforms**: The design system supports Convay's expansion plans, allowing it to scale seamlessly across web, tablet, and mobile platforms. With predefined grid and layout styles for various screen sizes, the design system ensures that the platform remains visually consistent and responsive, regardless of the device.",
      "**Efficient Updates and Maintenance**: Whenever Convay's branding or style needs to be updated, changes can be made within the design system. This approach eliminates the need to adjust individual components manually, as updating a global style or variable automatically applies the change across all relevant components. This flexibility allows Convay to adapt to new branding or design trends without extensive rework.",
      "**Future Enhancements**: With a solid design foundation, Convay is well-positioned to add new features and user interactions. The design system provides a structured framework that allows for modular additions, enabling the design team to focus on user-centered enhancements without disrupting the core look and feel.",
    ],
  },
  {
    type: "paragraph",
    text: "Overall, the design system I built has streamlined Convay's design and development workflow, creating a sustainable framework that supports the platform's current needs and future growth. It serves as a long-term asset, ensuring that Convay's design remains consistent, user-friendly, and adaptable to new challenges and opportunities.",
  },
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Building Convay's design system from scratch was one of the most formative parts of my UX journey. It taught me that consistency doesn't mean limitation, it creates clarity, speeds up decisions, and gives users a more trustworthy experience.",
  },
  {
    type: "paragraph",
    text: "I learned how important it is to think beyond just individual screens and start designing systems that scale. I also saw firsthand how even small, well-documented choices, like setting a corner radius or shadow style, can reduce confusion for developers and improve long-term product quality.",
  },
  {
    type: "paragraph",
    text: "Most importantly, this project reminded me that great UX isn't just about clean visuals or polished components, it's about creating a foundation that helps people work faster, build smarter, and grow with confidence.",
  },
  {
    type: "quote",
    text: "Good design systems don't just guide designs,\nthey unlock better collaboration.",
  },
];

// ---------------------------------------------------------------------
// 4. FitVibe
// ---------------------------------------------------------------------
// Note on section granularity: the live page uses a literal heading for
// every sub-screen shown (Dashboard, Workout Tracker, Meal Planner, one
// each for "Persona: X", etc.) -- roughly 25 headings in total. Grouped
// here under their parent design-thinking phase (Define/Ideate/Prototype/
// Test) as level-4 sub-headings rather than each opening its own
// alternating-tone Section, which is a formatting call for readability,
// not a structure change -- every heading, caption, and image below is
// still present, in the same order.
const fitvibeBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [
      img("szd3CmjkaLoDxcVmwh26M4KGcA.gif", 1600, 1200),
      img("dflAECgSKcfG0tKG8f3RwEzRTs.png", 375, 1175),
      img("MQRWfkzhmnpVKADq7BwBifnpCE.png", 375, 1527),
      img("PS5uD7vNAXNBESTYvyYhIKZ6YmE.png", 375, 812),
      img("lOCISXqHMAFQHkRuFPZCmxvklNY.png", 375, 812),
      img("khwjifgO5RurtaH06SL5uq5w84.png", 375, 812),
      img("GtLzYamXYOjnfEzlY2q5cwLA.png", 375, 812),
      img("3qUqkzshVNUli9sMNZ5GDFffAek.png", 375, 1313),
      img("EVSvOCby6S0fw84KWOmc0tgyynM.png", 375, 965),
      img("AeY3zRaQPGt02eTKt2D7Dgfhn2w.png", 375, 812),
      img("UAqEO4N9LLclb17uGMtBr80HR0.png", 375, 812),
    ],
  },
  { type: "heading", level: 3, text: "Project Overview" },
  {
    type: "list",
    items: [
      "Comprehensive fitness app for fitness enthusiasts and individuals seeking a healthy lifestyle",
      "**Features:** workout and diet planners, progress tracking, social interaction, challenges with gamification, e-commerce shop",
      "**Target users:** passionate fitness enthusiasts; individuals seeking personalized guidance and community support",
    ],
  },
  { type: "heading", level: 3, text: "Problem Statement" },
  {
    type: "paragraph",
    text: "Many individuals struggle to maintain a consistent fitness routine and lack personalized guidance and support in their fitness journey.",
  },
  { type: "heading", level: 3, text: "Goal" },
  {
    type: "paragraph",
    text: "The goal of the project is to design FitVibe, a comprehensive fitness app that addresses the pain points of users by providing personalized workout and diet plans, progress tracking, social interaction, challenges, and access to fitness-related products. The aim is to empower users to achieve their fitness goals, stay motivated, and build a supportive fitness community.",
  },
  { type: "heading", level: 3, text: "My Responsibilities" },
  {
    type: "list",
    items: [
      "User research",
      "Information architecture",
      "Wireframing",
      "UI designing",
      "Prototyping",
      "Usability testing",
      "Survey",
      "Data analysis",
    ],
  },
  { type: "heading", level: 3, text: "Challenges" },
  {
    type: "list",
    items: [
      "One of the challenges we faced was the absence of an existing platform or app that integrated workout and diet planners, progress tracking, social media, gamified challenges, and an e-commerce shop all in one. This required us to design and develop FitVibe from scratch, incorporating all these features into a cohesive and user-friendly app without the guidance of existing solutions.",
      "Gathering and incorporating user feedback in a timely manner was a challenge.",
    ],
  },
  { type: "heading", level: 3, text: "Design Process" },
  {
    type: "paragraph",
    text: "Used the **Design Thinking** approach for solving this problem. To practice design thinking we followed the below process.",
  },
  { type: "image", ...img("jrXU1KfNrwB6nPQe4ZMCdpTg.png", 800, 200), alt: "Design thinking process" },
  { type: "heading", level: 4, text: "Empathize Phase" },
  {
    type: "paragraph",
    text: "In this phase, a survey was conducted to gain insights on user, their requirements and pain points.",
  },
  { type: "heading", level: 4, text: "User Research: Ideation Phase Survey" },
  {
    type: "paragraph",
    text: "During the ideation phase of FitVibe, **a survey was conducted with 30 participants** to gather **feedback on their fitness habits and preferences**. The survey helped inform the **decision-making process regarding which features to include** in the app.",
  },
  {
    type: "paragraph",
    text: "In the user research phase, we conducted **qualitative and quantitative research** to understand our target users better. Through **interviews and surveys**, we gathered insights on user behaviors, preferences, and pain points. The research helped us **validate assumptions** and refine our understanding of user needs. These findings guided our **design decisions** and ensured a **user-centered approach** to the project.",
  },
  { type: "heading", level: 4, text: "User Research: Pain Points" },
  {
    type: "list",
    items: [
      "**Limited Access to Advanced Equipment**: Users express frustration over the lack of access to advanced gym equipment, highlighting the need for alternative exercises or modifications that can be performed with basic equipment.",
      "**Lack of Knowledge and Guidance**: Participants struggle with limited knowledge about exercise and nutrition, necessitating the inclusion of educational resources, tutorials, and expert guidance within the app to support their fitness journey.",
      "**Time Constraints and Busy Schedules**: Users with busy schedules find it challenging to prioritize exercise and often struggle to find time for workouts. Designing time-efficient routines and integrating reminders or scheduling features can address this pain point.",
      "**Lack of Motivation and Accountability**: Users express difficulty in staying motivated and accountable to their fitness goals. Incorporating motivational features, such as progress tracking, rewards, and social support, can help address this challenge and enhance user engagement.",
    ],
  },
  { type: "heading", level: 4, text: "Define Phase" },
  {
    type: "paragraph",
    text: "In this phase, we created personas and user journey map to understand more about the user's problems.",
  },
  { type: "heading", level: 4, text: "Persona: John Laurinaitis" },
  {
    type: "paragraph",
    text: "**Problem statement:** John is a beginner who needs guidance and support in starting his fitness journey because he lacks knowledge on exercise and nutrition.",
  },
  { type: "image", ...img("il5g3VFspy9jCrY1QE0QPdv58.png", 3176, 2160), alt: "Persona: John Laurinaitis" },
  { type: "heading", level: 4, text: "Persona: Sarah Patel" },
  {
    type: "paragraph",
    text: "**Problem statement:** Sarah is a busy gym-goer who needs a way to stay motivated and accountable to her fitness goals because she struggles with time constraints and maintaining a consistent workout routine.",
  },
  { type: "image", ...img("fAwcD2L8AIliDIkj0baER3scqk.png", 3176, 2160), alt: "Persona: Sarah Patel" },
  { type: "heading", level: 4, text: "Persona: David Cole" },
  {
    type: "paragraph",
    text: "**Problem statement:** David is an athlete aiming to improve his athletic performance who needs an app that can track his performance and provide advanced workouts because he has limited access to advanced gym equipment and wants to optimize his training.",
  },
  { type: "image", ...img("JvkMMUqYRZT97A33C2BlvErt6U.png", 3176, 2160), alt: "Persona: David Cole" },
  { type: "heading", level: 4, text: "Whiteboarding" },
  {
    type: "paragraph",
    text: "The whiteboarding session was conducted to visualize and map out the user's journey through the FitVibe fitness app.",
  },
  { type: "image", ...img("iKFIaXcTuKMCfHwmM62qQtXpIM.png", 1107, 830), alt: "Whiteboarding session" },
  { type: "heading", level: 4, text: "User Journey Map" },
  {
    type: "paragraph",
    text: "For the user journey map, we documented the actions, tasks, emotions, and improvement opportunities of the user experience in FitVibe.",
  },
  { type: "image", ...img("HXeQPMDnr7xz2xC3BfuvhBljkQ.png", 2178, 1442), alt: "User journey map" },
  { type: "heading", level: 4, text: "Ideate Phase" },
  {
    type: "paragraph",
    text: "For the information architecture, the goal was to structure and organize the content and navigation of the FitVibe fitness app in a logical and intuitive way. The thought process involved analyzing user needs, defining categories and hierarchies, and creating a clear and user-friendly information structure.",
  },
  { type: "image", ...img("G1TdEMzQHE20oExuhFxJHb5rYU.png", 512, 384), alt: "Information architecture" },
  { type: "heading", level: 4, text: "Sitemap" },
  {
    type: "paragraph",
    text: "The sitemap serves as a visual representation of the structure and organization of the FitVibe fitness app. It outlines the main pages and their hierarchical relationships, providing a clear overview of the app's content and navigation.",
  },
  { type: "image", ...img("OhEuvAYYlGbq8EbskNazZDfv1I.png", 1600, 503), alt: "Sitemap" },
  { type: "heading", level: 4, text: "Prototype Phase" },
  {
    type: "paragraph",
    text: "Followed the below steps in the design phase:",
  },
  {
    type: "list",
    items: [
      "Paper Sketches",
      "Low-fidelity wireframes with variations",
      "High-fidelity wireframes",
      "Final Design",
    ],
  },
  { type: "heading", level: 4, text: "Paper Wireframes" },
  {
    type: "paragraph",
    text: "The paper wireframes for FitVibe served as a preliminary exploration of the app's layout and functionality.",
  },
  { type: "image", ...img("RVgUfVEgYIG55D6ApC94MUaHlY.png", 437, 657), alt: "Paper wireframes" },
  { type: "heading", level: 4, text: "Digital Wireframes" },
  {
    type: "paragraph",
    text: "The paper wireframes for FitVibe served as a preliminary exploration of the app's layout and functionality.",
  },
  { type: "image", ...img("KdXsXf4qmA9GtNZkMeJRAekxHs4.png", 1708, 652), alt: "Digital wireframes" },
  { type: "heading", level: 4, text: "High-Fidelity Wireframes" },
  {
    type: "paragraph",
    text: "The paper wireframes for FitVibe served as a preliminary exploration of the app's layout and functionality.",
  },
  { type: "heading", level: 4, text: "Dashboard" },
  {
    type: "imageRow",
    images: [
      img("MQRWfkzhmnpVKADq7BwBifnpCE.png", 375, 1527),
      img("46BBpoTB9MUU1rGFaj8NfC3REo.png", 375, 812),
      img("fvbG1GbpVz9Tp8F6kBLZwrh8.png", 375, 812),
      img("OBMcBwkyUyaW46BrRbowALznyg.png", 375, 812),
      img("JmHlhHGsJVi3kcCGW9qrLnis.png", 375, 812),
    ],
  },
  { type: "heading", level: 4, text: "Workout Tracker" },
  {
    type: "imageRow",
    images: [
      img("dflAECgSKcfG0tKG8f3RwEzRTs.png", 375, 1175),
      img("lOCISXqHMAFQHkRuFPZCmxvklNY.png", 375, 812),
      img("RvcBNrcTposl8eETvmNdwEYuGp0.png", 375, 812),
      img("xeBvVlpK7z9ZaROMsxW8zdAWr3E.png", 375, 812),
      img("8Nak0Z7oslXRdH1ptvMvZs8Q.png", 375, 1640),
      img("QMfmo4NKddr7rezAwFdva2PmMdk.png", 375, 1262),
    ],
  },
  { type: "heading", level: 4, text: "Meal Planner" },
  {
    type: "imageRow",
    images: [
      img("EVSvOCby6S0fw84KWOmc0tgyynM.png", 375, 965),
      img("bmXBlUmPQ1MSxh4uonSELNF0.png", 375, 879),
      img("3qUqkzshVNUli9sMNZ5GDFffAek.png", 375, 1313),
      img("Y9678hjerdDolvm7yhCcxCh70.png", 375, 1313),
    ],
  },
  { type: "heading", level: 4, text: "Sleep Tracker" },
  {
    type: "imageRow",
    images: [
      img("a9vZl3hP0Mm3o0DyTvqpGleg.png", 375, 849),
      img("UAqEO4N9LLclb17uGMtBr80HR0.png", 375, 812),
    ],
  },
  { type: "heading", level: 4, text: "Progress Tracker" },
  {
    type: "imageRow",
    images: [
      img("5VNrc3tLn8mWdnFzdyy0gzpII.png", 375, 896),
      img("SiM0t4Mk4Hg5rcPkzSn4pvGP2vw.png", 375, 812),
      img("PS5uD7vNAXNBESTYvyYhIKZ6YmE.png", 375, 812),
      img("GKBtEjRJiwVN0bboHtPPsYgg.png", 375, 812),
      img("UcPkaZHWLN8MHd4yM8cVjODpEco.png", 375, 1239),
    ],
  },
  { type: "heading", level: 4, text: "Marketplace" },
  { type: "image", ...img("khwjifgO5RurtaH06SL5uq5w84.png", 375, 812), alt: "Marketplace screen" },
  { type: "heading", level: 4, text: "Social" },
  {
    type: "imageRow",
    images: [
      img("AeY3zRaQPGt02eTKt2D7Dgfhn2w.png", 375, 812),
      img("WKgxKLoQLFJQ2FBSUY1iZmWzI.png", 375, 812),
      img("GtLzYamXYOjnfEzlY2q5cwLA.png", 375, 812),
    ],
  },
  { type: "heading", level: 3, text: "Test Phase" },
  {
    type: "paragraph",
    text: "In this phase, we conducted usability studies with over 12 participants of varying fitness levels and ages to evaluate the FitVibe app's user experience.",
  },
  { type: "heading", level: 4, text: "Usability Study: Privacy Assurance" },
  {
    type: "paragraph",
    text: "A **consent form** was utilized to obtain participants' consent for the usability study. This approach ensured ethical compliance and protected participants' privacy throughout the research process.",
  },
  { type: "image", ...img("jyL3OrQLt15IfWYo6FktW6I5z0Y.png", 759, 983), alt: "Usability study consent form" },
  { type: "heading", level: 4, text: "Usability Study: Findings" },
  {
    type: "list",
    items: [
      "Positive feedback on the user-friendliness and navigation of the FitVibe app.",
      "Participants appreciated personalized workout and diet planners, progress tracking, and social media features.",
      "Areas for improvement identified, such as clearer labels and instructions for certain features and a more intuitive e-commerce shop interface.",
      "Some participants reported difficulties with entering and tracking progress, particularly in the nutrition tracking feature.",
      "Usability score (SUS) of **75.21** out of 100, indicating **above-average usability**.",
      "Overall, valuable feedback obtained to enhance user experience and make improvements to the app's design.",
    ],
  },
  { type: "heading", level: 3, text: "Research Insights: System Usability Scale (SUS)" },
  {
    type: "paragraph",
    text: "The SUS is a widely used and validated questionnaire that measures the perceived usability of a system. The questionnaire consists of 10 questions, each rated on a 5-point Likert scale (1 = strongly disagree, 5 = strongly agree). The scores from each question are then summed and multiplied by 2.5 to get a score out of 100.",
  },
  { type: "heading", level: 4, text: "SUS Questionnaire" },
  {
    type: "list",
    items: [
      "I think that I would like to use this system frequently.",
      "I found the system unnecessarily complex.",
      "I thought the system was easy to use.",
      "I think that I would need the support of a technical person to be able to use this system.",
      "I found the various functions in this system were well integrated.",
      "I thought there was too much inconsistency in this system.",
      "I would imagine that most people would learn to use this system very quickly.",
      "I found the system very cumbersome to use.",
      "I felt very confident using the system.",
      "I needed to learn a lot of things before I could get going with this system.",
    ],
  },
  { type: "heading", level: 4, text: "SUS Analysis" },
  {
    type: "paragraph",
    text: "For Question 1: 5 respondents gave 3 in likert-scale, 6 respondents gave 4 in likert-scale, 1 respondent gave 5 in likert-scale.",
  },
  {
    type: "paragraph",
    text: "*Step 1: Add up the score contribution from each question:*\nFor Question 1: (3 x 5) + (4 x 6) + (5 x 1) = 37. Similarly done the calculation for each question.",
  },
  {
    type: "paragraph",
    text: "*Step 2: Multiply the total by 2.5:*\nSUS score = (37+29+43+21+38+24+34+29+36+21) x 2.5 = 902.5",
  },
  {
    type: "paragraph",
    text: "*Step 3: Divide the SUS score by the number of respondents:*\n902.5 / 12 = **75.21**",
  },
  { type: "heading", level: 4, text: "SUS Result" },
  {
    type: "paragraph",
    text: "The overall SUS score is **75.21** out of 100. This indicates that the usability of our product is **above average**, but there is still room for improvement. We can use this score to compare the usability of our product with other products or to track changes in usability over time.",
  },
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Throughout the FitVibe project, I discovered the value of conducting user research and using an iterative design process. By considering the needs and preferences of users, I gained a better understanding of how to create designs that enhance user satisfaction and engagement. These experiences taught me how to create meaningful and user-centric digital experiences.",
  },
];

// ---------------------------------------------------------------------
// 5. TravelMate AI
// ---------------------------------------------------------------------
const travelMateBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [
      img("gltG0cxn5SXfakeqUdUin2pbW8E.gif", 1600, 1200),
      img("DZJYuPCcyd7AzT9GRHMe0nWQv8.png", 804, 1748),
      img("8XZQgRm6eKPbeOmSl6md6bxac.png", 804, 1748),
      img("PmPjZhHVKdGGrYgByALqkJ7ht6Q.png", 804, 1748),
      img("j5uJwrQlFKN05Uhl8UuR8amZaM.png", 804, 1748),
      img("QhudtyTffIupolQVFV8goLYXmk.png", 804, 1748),
      img("f5G1ucfeb9Quzcs3e9jFVBiGeY.png", 804, 1748),
      img("4ypYjbGyt1AejHjGJoEO781eWE.png", 804, 1800),
      img("Ru1ELrSz4yJIxgXfL6L6s98uEc.png", 804, 1800),
    ],
  },
  { type: "heading", level: 3, text: "Problem & Solution Overview" },
  {
    type: "paragraph",
    text: "When traveling in a new city, most people juggle multiple apps: one for maps, another for translations, another for weather, and still another for recommendations. Switching between them is stressful, especially when you're standing in a crowded metro station or dealing with a language you don't understand.",
  },
  {
    type: "paragraph",
    text: "TravelMate brings all of this into one **conversational assistant**. Whether typing or speaking, users can ask simple questions like *\"How do I get to the Louvre?\"* or *\"Find me the best local restaurants.\"* Behind the scenes, TravelMate connects these requests with tools like **real-time navigation**, a **transport hub**, a **personalized itinerary**, a **travel journal**, and **local weather updates**.",
  },
  {
    type: "paragraph",
    text: "The aim was to design an assistant that feels **natural, context-aware, and always ready**, so tourists don't need five apps when one intelligent companion can do it all.",
  },
  { type: "heading", level: 3, text: "Key Features & UI Showcase" },
  {
    type: "paragraph",
    text: "**Splash & Onboarding**\nThe first screen welcomes users with TravelMate branding and a **\"Get Started\"** call-to-action. It sets a clean, inviting tone while keeping friction low.",
  },
  { type: "image", ...img("DZJYuPCcyd7AzT9GRHMe0nWQv8.png", 804, 1748), alt: "Splash and onboarding screen" },
  {
    type: "paragraph",
    text: "**Conversational Chat & Voice**\nUsers can ask questions through text or voice, receiving real-time responses with maps and suggestions. This multimodal flow reduces friction for travelers who may not always be able to type, especially when navigating on the go.",
  },
  {
    type: "imageRow",
    images: [
      img("8XZQgRm6eKPbeOmSl6md6bxac.png", 804, 1748),
      img("QhudtyTffIupolQVFV8goLYXmk.png", 804, 1748),
      img("oQBTps7BwjTNtyBIf0SEPI1vTFA.png", 804, 1748),
      img("9aTNoTA1X3EMFN9Uuhx1WKGDJY.png", 804, 1748),
      img("tarT09Fi4L4yDA5pM3yXyU1sic.png", 804, 1748),
      img("f5G1ucfeb9Quzcs3e9jFVBiGeY.png", 804, 1748),
    ],
  },
  {
    type: "paragraph",
    text: "**Itinerary Planner**\nA simple calendar view lets users add activities or view suggestions. This keeps trip planning in one place instead of scattered across apps, reducing planning time and improving confidence in their schedule.",
  },
  { type: "image", ...img("nOM36AUEzLOD673zi9osVUO6xw.png", 804, 2160), alt: "Itinerary planner" },
  {
    type: "paragraph",
    text: "**Transport Hub**\nShows options for walking, metro, and taxis with cost and time estimates. This direct comparison helps travelers make faster, more informed choices, a key need in unfamiliar cities.",
  },
  { type: "image", ...img("j5uJwrQlFKN05Uhl8UuR8amZaM.png", 804, 1748), alt: "Transport hub" },
  {
    type: "paragraph",
    text: "**Travel Journal**\nAllows users to document their trip with photos and notes. Beyond memory-keeping, it strengthens emotional connection to the app, increasing return usage.",
  },
  { type: "image", ...img("4ypYjbGyt1AejHjGJoEO781eWE.png", 804, 1800), alt: "Travel journal" },
  {
    type: "paragraph",
    text: "**Weather & Emergency Info**\nDisplays forecasts and location-based emergency resources. Providing this context directly in the app reduces dependency on multiple tools and builds user trust in TravelMate as a reliable companion.",
  },
  { type: "image", ...img("gmEHNYW9VL5FJQEYRWcuVl32jZo.png", 804, 2804), alt: "Weather and emergency info" },
  { type: "heading", level: 3, text: "Challenges and Solutions" },
  {
    type: "paragraph",
    text: "**Challenge 1: Balancing Conversational Flow with Structure**\nTourists needed the flexibility of free chat but also quick access to structured actions like \"Book Taxi\" or \"Nearest Hospital.\"",
  },
  {
    type: "paragraph",
    text: "**Solution:** Combined conversational AI with **shortcut buttons** on the home screen, reducing reliance on typing while keeping the experience fluid.",
  },
  {
    type: "paragraph",
    text: "**Challenge 2: Designing for Tourists in Stressful Situations**\nIn emergencies, users can't afford to dig through menus.",
  },
  {
    type: "paragraph",
    text: "**Solution:** Made **emergency help one-tap accessible** from the main navigation, ensuring quick response when time is critical.",
  },
  {
    type: "paragraph",
    text: "**Challenge 3: Information Overload**\nTravel apps often overwhelm users with too many features.",
  },
  {
    type: "paragraph",
    text: "**Solution:** Grouped content into **five clear tabs** (Home, Itinerary, Transport Hub, Journal, Weather) to simplify navigation and reduce cognitive load.",
  },
  {
    type: "paragraph",
    text: "**Challenge 4: Supporting Multimodal Inputs**\nNot all users type easily while traveling (walking, carrying luggage, or in noisy streets).",
  },
  {
    type: "paragraph",
    text: "**Solution:** Added **voice input** alongside text, tested for seamless switching between modes.",
  },
  { type: "heading", level: 3, text: "Outcome and Impact" },
  {
    type: "list",
    items: [
      "**Prototype validated usability** – In peer testing, most users found the flows intuitive, with **80% completing key tasks (navigation, translation, itinerary)** without guidance.",
      "**Bridged multiple tools** – Instead of juggling maps, translators, and local guides, TravelMate unified them into a single conversational interface.",
      "**Portfolio-ready prototype** – Delivered as an interactive **Figma prototype**, demonstrating end-to-end UX design skills in AI-driven, multi-modal contexts.",
    ],
  },
  {
    type: "link",
    text: "View the Interactive Prototype",
    href: "https://www.figma.com/proto/ifl10l5GGaaoTxNqquuggh/TravelMate?page-id=0%3A1&node-id=2-2075&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A2075&t=6mDBdkuIFxU7cqEH-1",
  },
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Designing TravelMate pushed me to think beyond just screens and flows. I had to design for **real-world travel contexts** (moments of joy, stress, and urgency) and make sure the app adapted smoothly to each.",
  },
  {
    type: "paragraph",
    text: "This project strengthened my skills in **AI-driven UX, multi-modal design, and system thinking**, while reminding me that clarity and simplicity often matter most when users are under pressure.",
  },
  {
    type: "quote",
    text: "Good travel design isn't just about discovery,\nit's about giving people calm and confidence\nwhen they need it most.",
  },
];

// ---------------------------------------------------------------------
// 6. Convay Notifications
// ---------------------------------------------------------------------
const convayNotificationsBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [
      img("VlxHzd93ClWznE7PstrL1EmwKY.gif", 1600, 1200),
      img("EDYS5PEjuQKLCjvzA8zuZC9H3F8.png", 2048, 1280),
      img("5oVV6lx4Zwx4EMP4m3IY9FC2Vo.png", 720, 2384),
      img("V1cOAEB1e56ZJZLhxfQTzKimHA.png", 2048, 1280),
    ],
  },
  ...convayAtAGlance,
  { type: "heading", level: 3, text: "Feature Overview" },
  {
    type: "paragraph",
    text: "The goal was to make Convay smarter at keeping users informed, without overwhelming them. The Notifications system groups all updates into three intuitive categories: **Meetings**, **Chat**, and **Files**. Each update comes with a distinct icon and context-specific details, making it easy to scan, prioritize, and take action.",
  },
  {
    type: "paragraph",
    text: "Whether it's a last-minute meeting change, a new message, or a shared file, users can now access everything from one place, on both **web and mobile**, with options to filter, mark as read, and stay organized.",
  },
  { type: "heading", level: 3, text: "Problem" },
  {
    type: "paragraph",
    text: "Before this redesign, Convay lacked a **centralized notification system**. Updates about meetings, chats, and file activities were scattered, or worse, missed entirely.",
  },
  {
    type: "paragraph",
    text: "Users had no easy way to **track real-time changes**, leading to confusion, delays, and poor coordination across teams. The absence of **categorization** or visual clarity made it hard to tell what mattered and what didn't. For a platform handling high-stakes meetings and collaborative work, this gap was more than an inconvenience, it was a risk.",
  },
  { type: "heading", level: 3, text: "My Role and Responsibilities" },
  {
    type: "paragraph",
    text: "I led the UX design of the Notifications system, from concept to handoff. I worked closely with product managers and developers to design a structure that made critical updates easy to notice and act on. My responsibilities included:",
  },
  {
    type: "list",
    items: [
      "Designing all UI states across **desktop and mobile**",
      "Defining the **notification categories** and information hierarchy",
      "Iterating on visuals and interactions based on internal feedback",
      "Delivering components and specs in **Figma** for smooth handoff",
    ],
  },
  {
    type: "paragraph",
    text: "The goal was to create a system that would work seamlessly across platforms and reduce the cognitive load for busy users.",
  },
  { type: "heading", level: 3, text: "User Interface Designs" },
  {
    type: "paragraph",
    text: "**No Notifications Yet**: This screen provides a clean and minimal design, letting users know that there are no new updates. A subtle illustration and message create a welcoming, non-intrusive experience when there are no notifications.",
  },
  { type: "image", ...img("EDYS5PEjuQKLCjvzA8zuZC9H3F8.png", 2048, 1280), caption: "No Notifications Yet" },
  {
    type: "paragraph",
    text: "**All Notifications**: This view displays all notifications in a single feed, combining updates from meetings, chats, and files. Users can mark all notifications as read or view updates chronologically.",
  },
  { type: "image", ...img("aetbQpG4pv4WsWj16JM6Xz3KAw.png", 2048, 2027), caption: "All Notifications" },
  {
    type: "paragraph",
    text: "**Meeting Notifications**: This category filters notifications related to meetings, such as reminders, invitations, and updates on recorded meetings. This allows users to stay organized with their meeting schedules.",
  },
  { type: "image", ...img("V1cOAEB1e56ZJZLhxfQTzKimHA.png", 2048, 1280), caption: "Meeting Notifications" },
  {
    type: "paragraph",
    text: "**Chat Notifications**: This view focuses on chat-related updates, including direct messages, group mentions, and replies in ongoing conversations, helping users keep track of important interactions.",
  },
  { type: "image", ...img("0ZyoKA94IJ2DGwhCfUjSk1HEvMY.png", 2048, 1280), caption: "Chat Notifications" },
  {
    type: "paragraph",
    text: "**File Notifications**: This section organizes notifications related to file uploads, edits, or shared files, ensuring users are informed of changes in shared documents and resources.",
  },
  { type: "image", ...img("P5zbovYKufyweoW0M6YGA83uh0o.png", 2048, 1280), caption: "File Notifications" },
  { type: "heading", level: 3, text: "Design Evolution" },
  { type: "image", ...img("Qi6ZHRgC3ESWgzWAeyp0gDnClaQ.png", 2048, 2027), caption: "Previous Version" },
  { type: "image", ...img("aetbQpG4pv4WsWj16JM6Xz3KAw.png", 2048, 2027), caption: "Final Version" },
  { type: "paragraph", text: "**Mark as Read Button**" },
  {
    type: "list",
    items: [
      "**Previous Design**: The \"Mark as Read\" feature was represented by a simple circle icon, which users found unclear and confusing. The icon didn't intuitively convey its function, causing hesitation when marking notifications as read.",
      "**Current Design**: We replaced the circle with a checkmark icon, which is universally recognized as a \"done\" symbol. This change made the feature immediately understandable, aligning with user expectations and making it easier to manage notifications.",
      "**Design Rationale**: The checkmark is a widely recognized symbol, and using it enhances usability by clearly communicating that the notification can be marked as read. This design choice reduces cognitive load, allowing users to take action with confidence.",
    ],
  },
  { type: "paragraph", text: "**Distinct Icons for Notification Types**" },
  {
    type: "list",
    items: [
      "**Previous Design**: Notifications for Meetings, Chat, and Cloud were visually similar, making it difficult for users to quickly identify the type of each notification. This lack of differentiation led to scanning delays and increased cognitive load.",
      "**Current Design**: In the final design, we introduced unique icons for each notification type (Meeting, Chat, Cloud), making it easier for users to recognize the category of each notification at a glance.",
      "**Design Rationale**: Adding distinct icons for each notification type improves visual hierarchy and helps users filter information more efficiently. By providing clear visual cues, this design choice streamlines navigation and enhances the user experience by reducing time spent identifying notifications.",
    ],
  },
  { type: "heading", level: 3, text: "Mobile Version" },
  {
    type: "imageRow",
    images: [
      img("44vlTnKZkUDeiPPdGM9vWGE9IcU.png", 720, 1280),
      img("5oVV6lx4Zwx4EMP4m3IY9FC2Vo.png", 720, 2384),
      img("ltaLk6qSPnedVycl18iY04uNQ2w.png", 720, 1438),
      img("uhylPmBXURACtly9T7wFbpAJA7U.png", 720, 1438),
      img("WMm1F28kMcsyHx0al8yeZxNBPE.png", 720, 1438),
      img("PuIAK8FUturHFE06XssORQhz0wk.png", 720, 1438),
      img("CNsHte7FbblcPEsiY8y3HFljo.png", 720, 1438),
    ],
  },
  { type: "heading", level: 3, text: "Challenges and Solutions" },
  {
    type: "paragraph",
    text: "Designing Convay's notification system wasn't just about listing updates, it was about creating clarity in the noise. Throughout the process, we faced several key usability and interface issues that required careful iteration.",
  },
  {
    type: "paragraph",
    text: "**Unclear Action Indicator**\n**Initial Issue:** The first \"Mark as Read\" icon was a plain circle, which confused users. It lacked affordance and didn't communicate its purpose.",
  },
  {
    type: "paragraph",
    text: "**What We Did:** Replaced it with a universally understood checkmark, which instantly signaled task completion. This small change improved interaction clarity and reduced hesitation.",
  },
  {
    type: "paragraph",
    text: "**Poor Visual Differentiation Between Notification Types**\n**Initial Issue:** All notifications looked similar, making it hard to scan quickly or understand what type of update had arrived.",
  },
  {
    type: "paragraph",
    text: "**What We Did:** We introduced distinct icons for Meetings, Chats, and Files. This visual cue helped users filter information at a glance and made the interface feel more structured.",
  },
  {
    type: "quote",
    text: "Now I don't have to guess which notification is about what.\nIt's much clearer with the icons.",
    attribution: "Test Feedback",
  },
  {
    type: "paragraph",
    text: "**Cluttered, Overloaded Feed**\n**Initial Issue:** A single undivided feed overwhelmed users with too many mixed updates. They had to scroll and mentally categorize items themselves.",
  },
  {
    type: "paragraph",
    text: "**What We Did:** We added tab-based filtering. Users could now toggle between All, Meetings, Chat, or File notifications. This simple switch cut down friction and helped them zero in on what mattered.",
  },
  {
    type: "paragraph",
    text: "**Low Feedback in Empty States**\n**Initial Issue:** When there were no notifications, the UI felt broken or incomplete.",
  },
  {
    type: "paragraph",
    text: "**What We Did:** We designed a soft illustration and friendly copy for the empty state, making it feel intentional, not like a system glitch. This improved the emotional tone of the app and encouraged exploration.",
  },
  { type: "heading", level: 3, text: "Outcome and Impact" },
  {
    type: "list",
    items: [
      "**Faster Info Retrieval**: Distinct icons and categorized tabs helped users identify and access relevant updates up to **30% faster** during internal testing.",
      "**Improved User Confidence**: Replacing vague icons with familiar symbols (like the checkmark) made interactions more intuitive, reducing user hesitation.",
      "**Cleaner Experience**: Categorized filters and thoughtful empty states led to a **cleaner, less overwhelming interface**, especially for new or infrequent users.",
      "**Foundation for Scalability**: The modular notification structure was designed to accommodate future additions (e.g. system alerts or task reminders) without breaking the UX.",
    ],
  },
  {
    type: "quote",
    text: "Notifications used to feel messy. Now I actually check them, I know exactly where to look.",
    attribution: "Internal Tester",
  },
  {
    type: "paragraph",
    text: "While no live user metrics were available during my design phase, qualitative feedback during testing highlighted increased clarity, faster scanning, and reduced frustration, key outcomes in a high-collaboration product like Convay.",
  },
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Designing the Convay Notification System reminded me that **small decisions often have the biggest impact**. A single icon change, or adding visual categories, can completely shift how people feel while using a product.",
  },
  {
    type: "paragraph",
    text: "This project pushed me to think beyond screens, to consider how users mentally process information, what slows them down, and how I can remove that friction. It also strengthened my ability to **balance clarity with scalability**, creating patterns that work now and adapt easily later.",
  },
  {
    type: "quote",
    text: "Good UX isn't just about building features, it's about\nclearing the noise so what matters can come through.",
  },
  {
    type: "paragraph",
    text: "This project helped me grow as a product thinker, not just solving problems, but shaping how people navigate fast, collaborative workspaces with less friction.",
  },
];

// ---------------------------------------------------------------------
// Research track: Lumi (Milestones A-D of the approved Lumi
// implementation plan; content from Lumi_Case_Study_FINAL.md)
// ---------------------------------------------------------------------
// Milestone A: full body content using only block types that already
// existed (heading/paragraph/list/quote). Milestone B added the
// `revealGroup` block + RevealItem component (tap-to-reveal). Milestone
// C added `callout`/`divider`/`timeline`/`linkCard`. All four are
// generic, schema-registered block types, not Lumi-specific -- any
// future case study can use them as data without new component work.
//
// Milestone D (revised): real assets sourced from Appendix F of Aseer's
// thesis ("Representative Lumi Interaction Screens"), not from live
// browser captures. The first pass of this milestone used screenshots I
// captured myself from the live prototype (tweak-big-44404856.figma.site)
// via browser automation; Aseer judged that pass's image and video
// quality as too low, and pointed to the thesis appendix as a better
// source. Every asset below is a crop of an actual Appendix F figure
// (Aseer supplied the thesis .docx directly; the figures were extracted
// from word/media/ inside it) -- nothing here is invented, and the crop
// step only trims the surrounding browser-window padding, it doesn't
// alter the captured screen itself:
//   - hero.jpg / thumbnail.jpg: Figure F1 ("Lumi's landing interface as
//     presented to participants"), cropped two ways (full card for the
//     case study body, a tighter top portion for ProjectCard's 4:3
//     media block).
//   - tampere-housing.jpg: Figure F2 ("Example housing-domain
//     navigation"), showing TOAS and POAS with the actual
//     €250-550/month rent range and working outbound links.
//   - fallback-poster.jpg: Figure F5 ("Example open-ended conversational
//     support in which the participant moves outside the predefined
//     click-through path"). This replaces the earlier fallback-demo.mp4
//     -- that video was a real interaction (I typed an off-script pet
//     -import question into the live prototype myself), but Appendix F5
//     is stronger source material for a research case study: it's an
//     actual study participant's off-script exchange, not my own
//     re-enactment, and the thesis only preserves it as a single still
//     frame rather than a recording, so this is now presented as a
//     static image rather than a click-to-play video. The alt/caption
//     below describe this exchange (a participant saying they felt
//     overwhelmed and didn't know what to prioritize, and Lumi's
//     free-tier fallback layer responding with a structured "Key
//     points" card), not the pet-import question from the earlier
//     capture.
//
// One thing remains deliberately deferred, flagged rather than faked:
// the seven-themes findings diagram in "What we found" does NOT use
// `revealGroup`, unlike the seven principles in "What it means" which
// do: the copy itself says the full analysis behind those seven themes
// "is reserved for future academic publication," so there's no real
// per-theme text yet to reveal. Needs a decision from Aseer (what, if
// anything, each theme can say publicly) before that piece can be
// built.
const lumiBody: CaseStudyBlock[] = [
  {
    type: "image",
    src: "/lumi/hero.jpg",
    width: 723,
    height: 1034,
    alt: "The Lumi landing screen: a chat assistant introducing itself and offering six topics -- student housing, healthcare, working while studying, residence permits, university services, and banking.",
  },
  { type: "heading", level: 3, text: "The problem" },
  {
    type: "paragraph",
    text: "Moving to a new country means learning a system nobody explains to you. Where to register. Which office handles what. Which number on a form actually matters.",
  },
  {
    type: "paragraph",
    text: "Finland's public services are, on paper, well organized. In practice, newcomers still have to piece the sequence together themselves: asking a friend, searching in English on a Finnish institution's website, or guessing.",
  },
  {
    type: "paragraph",
    text: "One participant in my study put it simply. Talking about their first months in the country, they said it \"often feels like you're just left here... you are kind of lost.\"",
  },
  {
    type: "quote",
    text: "Often feels like you're just left here... you are kind of lost.",
    attribution: "A study participant, on arriving without guidance",
  },
  {
    type: "paragraph",
    text: "14 of the 15 people I studied described some version of the same thing: they wished something like Lumi had existed when they arrived.",
  },

  { type: "heading", level: 3, text: "The study" },
  {
    type: "paragraph",
    text: "I designed Lumi to test a specific question: when an AI assistant helps someone through an unfamiliar, high-stakes system, what actually makes them trust it, or stop trusting it?",
  },
  {
    type: "paragraph",
    text: "To find out, I recruited 15 international students at Tampere University who had personally navigated these systems as newcomers, and ran single-session studies with each of them. Every session lasted about 35 minutes and moved through four real scenarios: student housing, banking, healthcare, and university services. Before and after each session, I asked participants to describe what they felt, not just what they thought.",
  },
  {
    type: "paragraph",
    text: "All sessions were consented and recorded, and every participant's data was anonymized before analysis. I analyzed the sessions using reflexive thematic analysis, a well-established qualitative method, and used an existing academic framework called Trust-as-Affect as a lens, not a theory I was trying to prove. Throughout, I looked for contradictions in the data as carefully as I looked for agreement, one wrong answer mattered as much as a pattern across many.",
  },
  {
    type: "paragraph",
    text: "Two pilot sessions came first. They showed me exactly where the prototype broke, and that shaped everything I built next.",
  },
  // Milestone C: labels/detail drawn only from facts already stated in
  // the paragraphs above (2 pilot sessions; 15 participants, ~35 minutes
  // each) -- not new information, just the same facts in the final
  // copy's own requested "compact pilot-to-final iteration timeline"
  // shape.
  {
    type: "timeline",
    steps: [
      { label: "Pilot session 1" },
      { label: "Pilot session 2" },
      { label: "Main study", detail: "15 participants, single sessions, ~35 minutes each" },
    ],
  },

  { type: "heading", level: 3, text: "Building Lumi" },
  {
    type: "paragraph",
    text: "The first version of Lumi worked well when people clicked through its guided structure. It failed the moment someone typed a question outside that structure, and in the pilot sessions, that happened often enough to break the interaction entirely. If I'd run the main study on that version, I would have lost the exact moments I was there to study: real, unscripted moments of doubt and confidence, every time someone went off-script.",
  },
  {
    type: "paragraph",
    text: "So I added a constrained AI layer underneath the structured design, one that could handle open-ended questions while keeping Lumi's tone and shape consistent. This carried its own risk: a second system, however well constrained, could easily have felt like two different assistants stitched together, or introduced new failures of its own. I tested it carefully before the main study began, and in practice, the transition held up. Typing a question outside the guided path felt like a natural continuation of the same conversation, not a handoff to something else.",
  },
  {
    type: "paragraph",
    text: "Every screen followed the same design logic: real institutions named directly (TOAS for housing, Kela for benefits, YTHS for healthcare), links out to their official pages, and short, scannable summaries instead of long paragraphs. Then I watched what happened when real people relied on it.",
  },
  {
    type: "image",
    src: "/lumi/tampere-housing.jpg",
    width: 1596,
    height: 1103,
    alt: "The 'Student housing in Tampere' screen, showing TOAS and POAS with their typical rent range (€250-550/month) and working links out to their official application sites.",
    caption: "Real institutions, named directly, with working links out to their official sites.",
  },
  {
    type: "image",
    src: "/lumi/fallback-poster.jpg",
    width: 1596,
    height: 1087,
    alt: "A participant telling Lumi they felt overwhelmed after moving to Finland and didn't know what to prioritize -- a question outside the guided click-through path -- and Lumi's AI fallback answering in the same visual voice as the guided flow: a full paragraph response plus a Key points card covering housing, residence permits, and banking.",
    caption: "A real study participant going off-script, and Lumi's actual fallback response.",
  },

  { type: "heading", level: 3, text: "What we found" },
  {
    type: "paragraph",
    text: "Trust didn't behave the way I expected going in.",
  },
  {
    type: "paragraph",
    text: "It formed slowly, in small moments: an official link that worked, a price range that matched what someone already expected, a summary that read as precise instead of vague. Each one added a little more confidence.",
  },
  // Milestone C: the case study's one pivotal moment gets its own
  // visual weight (Callout) rather than blending into the surrounding
  // paragraphs, per the final copy's own "Components deserving special
  // presentation" note.
  {
    type: "callout",
    text: "But trust could also disappear all at once. In one session, Lumi confidently named a housing provider that doesn't exist. The participant clicked the link it gave. Nothing loaded. That single moment was enough. Everything Lumi had earned up until then stopped mattering, and the participant's trust reset instantly, not gradually.",
  },
  {
    type: "paragraph",
    text: "That asymmetry, slow to form, fast to break, turned out to be the clearest finding of the study.",
  },
  // Interactive milestone: this exact idea (a small interactive trust
  // demo) was first proposed for the homepage hero, rejected there for
  // overweighting one project and duplicating the "Featured work /
  // Featured research" section (see Hero-Craftsmanship-Review.md and the
  // conversation that followed), and kept for the one place it actually
  // belongs: right here, immediately after the finding it demonstrates,
  // built entirely from facts already stated in this case study.
  { type: "interactive", key: "lumi-trust-asymmetry" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "A second pattern stood out almost as strongly. Vague reassurance didn't move people. Specific facts did. When Lumi gave one participant a real price range for student housing, they said it plainly: \"I was immediately motivated... attracted to the price.\"",
  },
  {
    type: "quote",
    text: "I was immediately motivated... attracted to the price.",
    attribution: "A study participant, on seeing a real price range",
  },
  {
    type: "paragraph",
    text: "Participants also stayed a little careful even when they trusted Lumi, checking its answers against another source out of habit, not suspicion, since they already knew AI systems can be wrong.",
  },
  // NOTE: the final copy marks a pull-quote here too ("participant on
  // checking Lumi against another source"), but unlike the two quotes
  // above, no literal quoted speech for this one is included in
  // Lumi_Case_Study_FINAL.md -- only the paraphrase above. Rendered as a
  // plain paragraph rather than inventing quoted words; if Aseer has the
  // actual quote from the interview data, this can get the same
  // treatment as the other two.
  {
    type: "paragraph",
    text: "These patterns fell into three broad areas: what made trust possible in the first place, how people managed it moment to moment, and where it eventually broke down. Across the study, they organized into seven themes. *(The full analysis behind these themes is reserved for future academic publication.)*",
  },

  { type: "heading", level: 3, text: "What it means" },
  {
    type: "paragraph",
    text: "The clearest output of this research is a set of seven design principles for building trustworthy conversational AI in high-stakes settings, not just for Lumi, but for any assistant operating in this kind of context. Each one traces back to something that actually happened in the study, not just intuition.",
  },
  // Milestone B: the seven principles as a tap-to-reveal graphic,
  // grouped into the same three dimensions the copy itself names. Label
  // stays visible by default (the scan); detail (already-written
  // rationale, not new content) reveals on demand. This is the one
  // place in Lumi that uses `revealGroup` -- the findings diagram in
  // "What we found" deliberately does not, see the file-level comment
  // above for why.
  {
    type: "revealGroup",
    groups: [
      {
        heading: "What made trust possible",
        items: [
          {
            label: "Source-anchored",
            detail: "Every claim traceable to a real, named authority.",
          },
          {
            label: "Structurally minimal",
            detail: "Calm and scannable, never overwhelming.",
          },
        ],
      },
      {
        heading: "What kept trust honest",
        items: [
          {
            label: "Scope-stated",
            detail: "Honest about what it does and doesn't cover.",
          },
          {
            label: "Verification-supporting",
            detail: "Designed for people who will double-check it, not against them.",
          },
        ],
      },
      {
        heading: "Where trust needs protecting",
        items: [
          {
            label: "Hallucination-conservative",
            detail:
              "Built to fail safely, not confidently, the direct lesson from the one moment trust broke in this study.",
          },
          {
            label: "Vulnerability-aware",
            detail: "Sensitive to who's asking and why.",
          },
          {
            label: "Action-closing",
            detail: "Orientation isn't enough. It should help people actually act.",
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    text: "This research also contributes to how trust itself is understood in human-AI interaction, extending an existing academic framework in ways I'm continuing to develop toward publication. The seven principles are what I'd build from that understanding today. The next test is building them into something people rely on before they ever have a reason to doubt it.",
  },

  { type: "heading", level: 3, text: "Reflection" },
  {
    type: "paragraph",
    text: "This was a small study: 15 people, one university, one prototype. It doesn't describe how everyone experiences trust in AI, only how these 15 people did, in real depth.",
  },
  {
    type: "paragraph",
    text: "I was also both the designer of Lumi and the researcher studying it, a position I stayed conscious of throughout, especially once the prototype's own mistakes became some of the most important data in the study.",
  },
  {
    type: "paragraph",
    text: "If I ran this again, I'd recruit across more than one university, and stress-test the fallback layer harder before the real sessions began.",
  },
  {
    type: "paragraph",
    text: "What stayed with me most is simple. An AI system doesn't earn trust once. It earns it constantly, and it can lose it instantly.",
  },

  { type: "heading", level: 3, text: "Go deeper" },
  {
    type: "paragraph",
    text: "This project is part of my Master's thesis, completed at Tampere University and graded 5/5. I'm preparing parts of this study for academic publication, so a few details stay under wraps for now, but I'm glad to share more directly.",
  },
  {
    type: "paragraph",
    text: "The full thesis and a working demo of the prototype are available on request.",
  },
  // Milestone C: a real, working action (a mailto: link reusing the
  // site's own contact email, not a fabricated URL) instead of a bare
  // sentence, so this reads as a genuine invitation per the final
  // copy's own note. The label is UI microcopy for the affordance
  // itself, not case-study narrative content.
  {
    type: "linkCard",
    text: "Request the thesis & a demo",
    href: `mailto:${site.email}?subject=${encodeURIComponent("Lumi: thesis and demo request")}`,
  },
];

/**
 * aRENEWberg (Cultural Festival Platform, Arenberg UNESCO Site) case
 * study body, replacing the earlier placeholder. Adapted from the
 * approved Case_Study_Final.md (Case Studies/aRENEWberg/Arenberg/) with
 * only the formatting changes needed for this block schema: paragraph
 * breaks, the cost table converted to a list (no table block type
 * exists), and the [Visual: ...] cues resolved to real images captured
 * from the live prototype at order-query-60065275.figma.site. Prose is
 * otherwise unchanged from the approved copy. Page title, slug, and
 * meta fields are governed by the Visual QA milestone's instruction to
 * preserve the page's existing identity -- only `meta.tools` and
 * `meta.team` were corrected to match facts established by the
 * approved case study (the entry previously guessed "Figma" for tools;
 * the real build was plain HTML/CSS/JS, hosted as a Figma Sites
 * prototype for review).
 */
const arenewbergBody: CaseStudyBlock[] = [
  {
    type: "image",
    src: "/arenewberg/hero.png",
    width: 378,
    height: 840,
    alt: "The aRENEWberg app's splash screen: the wordmark over a dark, gridded background, the tagline 'Music · Culture · Exploration · Heritage,' and an Enter button.",
  },

  { type: "heading", level: 3, text: "The short version" },
  {
    type: "paragraph",
    text: "A UNESCO heritage coal mine outside Lille doesn't know how many visitors it gets in a year. There's no ticketing system, no attendance count, nothing to measure against. That absence was the actual starting point: our team of six had five days to design something that could bring in an audience the site had never really reached, people under thirty, and to prove it could work with a real, usable prototype, not just a pitch deck.",
  },
  {
    type: "paragraph",
    text: "I was the Creative Manager on the team. I helped shape the concept, then built the prototype that proves it works: a full app a visitor could actually use from arrival to the end of the night.",
  },
  {
    type: "paragraph",
    text: "What we ended up with is aRENEWberg, a twice-yearly cultural event held on the mining site itself, and the app that ties it together. Here's how we got there.",
  },

  { type: "heading", level: 3, text: "The site" },
  {
    type: "paragraph",
    text: "Arenberg is a former coal mine in Wallers, in the north of France. It ran from 1903 until 1989. In 2012 it became part of a UNESCO World Heritage listing, alongside the rest of the Nord-Pas de Calais mining basin.",
  },
  {
    type: "paragraph",
    text: "That status sounds like an advantage. In practice it creates a strange kind of stillness. UNESCO recognizes the site but doesn't fund it. Money for upkeep, staffing, and events has to come from somewhere else, and it's never guaranteed. The site hosts the occasional film shoot and cultural event, but it has no consistent public program, which is part of why nobody tracks who visits.",
  },
  {
    type: "image",
    src: "/arenewberg/site-visit.jpg",
    width: 1280,
    height: 960,
    alt: "A large group of ECIU Créathon participants standing outside a brick building at the Arenberg mining site, with the site's landmark steel headframe tower rising behind it.",
    caption: "Arenberg's headframe tower, photographed during the Créathon's on-site visit. Recognizable from anywhere on the property, and the reason the site is landmarked at all.",
  },
  {
    type: "paragraph",
    text: "The area right outside the gates is also residential. Any event on site happens next to people's homes. That constraint shaped almost every decision that followed.",
  },
  {
    type: "paragraph",
    text: "Our brief, as a team, started broad: rethink how travel could help preserve a historical landmark. We narrowed it fast, because a broad brief doesn't get you anywhere in five days. The question we actually designed against: how do we make this place appealing to a younger generation, without turning it into something it isn't?",
  },

  { type: "heading", level: 3, text: "What we learned" },
  {
    type: "paragraph",
    text: "We had five days, not five months, so the research had to be targeted. Three conversations shaped almost everything that followed: Audrey, who works in urban regeneration and site management, Simon, from the local tourism office, and Irene, a researcher who specializes in cultural heritage. We also looked closely at how comparable heritage sites operate.",
  },
  {
    type: "paragraph",
    text: "We didn't get the chance to talk to the young visitors we were actually designing for. That's a real limitation, and I come back to it later. But the three experts pointed at the same gap from three different directions, and that was enough to move forward with confidence: Arenberg isn't short on history. It's short on reasons for someone young to show up.",
  },
  {
    type: "paragraph",
    text: "The clearest comparison is Lewarde, another former mine about forty minutes away, now run as a full heritage museum.",
  },
  {
    type: "callout",
    text: "Lewarde: 150,000 visitors a year, 15,000 catalogued objects, a restaurant, guided tours. Arenberg: no visitor data at all.",
  },
  {
    type: "paragraph",
    text: "Arenberg has none of that infrastructure. What it does have, and what no indoor museum can offer, is a real forest with over 150 kilometers of trails right on the property. We weren't going to out-museum a museum. We could build something Lewarde structurally can't: an outdoor, after-dark, youth-facing event that uses the site's scale instead of competing on artifacts.",
  },

  { type: "heading", level: 3, text: "The concept: aRENEWberg" },
  {
    type: "image",
    src: "/arenewberg/logo.png",
    width: 928,
    height: 760,
    alt: "The aRENEWberg wordmark: 'RENEW' in green diagonally overlapping 'A...BERG' in dark grey, with a small 'Northern France' subtitle.",
  },
  {
    type: "paragraph",
    text: "So we proposed a seasonal event, not a redesign of the site itself. Twice a year, early spring and midsummer, aRENEWberg turns the mine into a one-night cultural event: a photo scavenger hunt across the site, a headphone-based silent disco, silent film screenings, a market for local businesses, and a quiet forest area for anyone who wants to step away from the noise.",
  },
  {
    type: "paragraph",
    text: "Each piece earns its place for a specific reason. The scavenger hunt is low-barrier and shareable, exactly the kind of thing that spreads on social media without an ad budget. The silent formats solve a real constraint, explained below. The market and the forest area use what the site already has, local businesses and 150 kilometers of trails, instead of asking for a budget that didn't exist.",
  },
  {
    type: "paragraph",
    text: "The twice-yearly cadence was deliberate too. Frequent enough to build a returning audience. Infrequent enough that it doesn't turn a heritage site into a nightclub, or wear out its welcome with the people who live next to it.",
  },

  { type: "heading", level: 3, text: "The decision that mattered most" },
  {
    type: "paragraph",
    text: "Here's the constraint that shaped the whole event. Residents next door don't want noise. We also wanted the event to be genuinely welcoming to neurodivergent visitors, who often find loud, crowded environments overwhelming.",
  },
  {
    type: "paragraph",
    text: "Those two requirements usually pull in opposite directions. A disco needs sound. Inclusive design usually means giving people more control, not less.",
  },
  {
    type: "paragraph",
    text: "This is also where two parts of the team met without planning to. The ethics and inclusivity group had been pushing for more sensory control for neurodivergent visitors. My track, practicality and feasibility, had been trying to solve the noise problem before it became a reason for the site to reject the whole event. Neither group set out to solve the other's problem. We ended up in the same place anyway.",
  },
  {
    type: "paragraph",
    text: "The answer was wireless headphones instead of speakers. Everyone at the silent disco and the film screenings wears headphones, picks their own channel, and controls their own volume. From outside the venue, there's almost no sound. From inside, a neurodivergent visitor has more control over their sensory experience than they would at almost any other version of this event.",
  },
  {
    type: "callout",
    text: "One design choice. Two teams working from different angles. Two problems solved at once. That's the strongest single decision in this project, and it's the kind of outcome I look for on every project since.",
  },
  {
    type: "image",
    src: "/arenewberg/silent-disco.png",
    width: 394,
    height: 840,
    alt: "The Activities tab with the Silent Disco card expanded: 'Wireless headphones, three DJs, zero noise complaints,' Winding Tower Hall, €5, 'Headsets at the door.'",
    caption: "The Silent Disco card explaining its own reasoning, not just the pitch deck.",
  },
  {
    type: "paragraph",
    text: "The interface says this plainly, not just the pitch deck. The Silent Disco card doesn't say \"join here\" and stop. It says why: wireless headphones, three DJs, zero noise complaints. That's the actual reasoning, visible to the visitor.",
  },

  { type: "heading", level: 3, text: "What we said no to" },
  {
    type: "paragraph",
    text: "Not every decision was about solving two problems at once. Some were just about knowing what we couldn't afford. Good ideas are cheap in a five-day sprint. Knowing which ones to cut is expensive.",
  },
  {
    type: "list",
    items: [
      "**Hologram system for immersive mine tours**: ~€500,000. Not shipped; flagged as barely realistic by the team itself.",
      "**VR mining game**: ~€100,000. Not shipped.",
      "**Zip line between two headframes**: ~€150,000–200,000. Not shipped.",
      "**Scavenger hunt**: prize budget only. Shipped.",
      "**Silent disco + film screenings**: ~€300–600/night, headphone rental. Shipped, priced at €5 to cover rental cost, not profit.",
      "**Forest rest area**: ~€100–200. Shipped.",
    ],
  },
  {
    type: "paragraph",
    text: "None of the big three survived the feasibility pass, because a twice-a-year community event with no confirmed funding source has to run on a budget that could plausibly exist. Cutting the hologram system wasn't a loss of ambition. It was the difference between a concept that sounds good in a pitch and one that could actually happen twice a year on a real budget.",
  },

  { type: "heading", level: 3, text: "The prototype" },
  {
    type: "paragraph",
    text: "Six activities happening in one place, with no single source of information, isn't an event. It's just noise. Without an app, someone arriving on the night has no way to know where the silent disco is, how to join the scavenger hunt, or when the market closes. It also gives the site something it never had: a digital presence, and a way to actually learn who shows up.",
  },
  {
    type: "paragraph",
    text: "I built the prototype myself: a working, full click-through app, not static mockups. It has five sections, and each one does one job.",
  },

  { type: "heading", level: 4, text: "Home" },
  {
    type: "paragraph",
    text: "The first thing a visitor sees: what's happening right now, what's coming up next, and one clear action to take. A live schedule bar shows the night's timeline. The Scavenger Hunt sits front and center, since it's the main draw, with a live player count and a direct way to join. Smaller cards below surface the Silent Disco and the film screening without demanding attention they haven't earned yet.",
  },
  {
    type: "image",
    src: "/arenewberg/home.png",
    width: 410,
    height: 840,
    alt: "The Home tab: 'Festival Live, Arenberg Mine,' a schedule-chip timeline (Gates/Market/Hunt), a live Scavenger Hunt card with 147 players and 2h remaining, and quick-access Silent Disco and Open Air Cinema cards.",
  },
  { type: "divider" },

  { type: "heading", level: 4, text: "The hunt" },
  {
    type: "paragraph",
    text: "The hunt is the spine of the prototype. Seven clues, each tied to a real location on site, each worth points, with a live leaderboard so visitors can see where they stand.",
  },
  {
    type: "paragraph",
    text: "Every clue ends the same way: post the photo with the event hashtag. That's not a bolted-on social feature. It's how the team designed for the event to be seen beyond the people who actually attend, built into the core loop instead of added afterward.",
  },
  {
    type: "paragraph",
    text: "Finishing all seven clues ends on a summary screen: every clue found, the points from each one, a running total. It's a small moment, meant to be the kind of payoff that makes someone want to come back for the next one.",
  },
  {
    type: "imageRow",
    images: [
      {
        src: "/arenewberg/hunt-clue.png",
        width: 420,
        height: 840,
        alt: "Clue 1 of 7: 'Find the iron winding wheel, the rotating heart that once hauled miners 825 metres below ground,' with a live leaderboard showing the visitor in 3rd place.",
      },
      {
        src: "/arenewberg/hunt-instructions.png",
        width: 420,
        height: 840,
        alt: "The same clue with instructions expanded: walk to the main entrance archway, find the iron wheel, frame it in a photo, then post on Instagram or TikTok with #aRENEWberg.",
      },
      {
        src: "/arenewberg/hunt-complete.png",
        width: 390,
        height: 840,
        alt: "'Hunt Complete! All 7 Clues Found,' 920 points, with a per-clue point breakdown from Main Entrance to Headframe.",
      },
    ],
  },
  { type: "divider" },

  { type: "heading", level: 4, text: "The map" },
  {
    type: "paragraph",
    text: "Five zones, color-coded, with a live \"you are here\" marker and every clue plotted. Tap a zone and a detail card slides up with hours, what's on offer, and how to pay. This screen solves the exact confusion the team named as the reason to build an app in the first place: a visitor arriving with no idea where anything is.",
  },
  {
    type: "image",
    src: "/arenewberg/map.png",
    width: 386,
    height: 840,
    alt: "The Festival Map: five color-coded zones (Forest, Cinema, Disco, Market, Entrance) around the Headframe, a 'you are here' marker, and the Market zone's detail card expanded below.",
  },
  { type: "divider" },

  { type: "heading", level: 4, text: "Profile" },
  {
    type: "paragraph",
    text: "The profile tab is where the app's values live in the product, not just in the pitch deck. A digital ticket with a scannable QR code doubles as the actual entry mechanism for the night. A running timeline shows everything a visitor has done that evening. And three preference toggles: Eco Mode, which dims the screen to support the event's zero-waste goal, Event Alerts, and Share Location, with a plain line underneath it: help friends find you on site, never shared outside the app.",
  },
  {
    type: "imageRow",
    images: [
      {
        src: "/arenewberg/profile.png",
        width: 392,
        height: 840,
        alt: "The Profile tab: identity card, rank/points/clues/hours stats, a 3rd-place leaderboard callout, the collapsed Entry Pass, and the start of the 'Your Night' timeline.",
      },
      {
        src: "/arenewberg/entry-pass.png",
        width: 394,
        height: 840,
        alt: "The Entry Pass expanded: a scannable QR code, 'General Admission,' and 'Scan at entrance, valid 20 June only.'",
      },
      {
        src: "/arenewberg/preferences.png",
        width: 394,
        height: 840,
        alt: "The 'Your Night' timeline (Checked in, Visited the Market, Started Scavenger Hunt, Joined Silent Disco) above the Preferences toggles: Eco Mode, Event Alerts, and Share Location.",
      },
    ],
  },

  { type: "heading", level: 3, text: "Why the app is deliberately simple" },
  {
    type: "paragraph",
    text: "None of this needed to be complicated to build. I made it a single-file app in plain HTML, CSS, and JavaScript. No framework, nothing that needed a build process.",
  },
  {
    type: "paragraph",
    text: "That wasn't a shortcut. A prototype's job is to prove an idea works, not to show off technical skill, and this idea didn't need much: something that loads fast, and an interface simple enough that someone can figure it out in the first thirty seconds after arriving. I default to the simplest tool that can do the job, every time.",
  },

  { type: "heading", level: 3, text: "Where it stands, and what I'd do differently" },
  {
    type: "paragraph",
    text: "We presented aRENEWberg to a jury on the final day, as part of the Créathon's normal structure. There's no recorded score or written feedback to share here.",
  },
  {
    type: "paragraph",
    text: "Two things stand out looking back, and both changed how I think about scope and research.",
  },
  {
    type: "paragraph",
    text: "We built one version of this app in five days. We never got the chance to test it, or iterate on it, before the deadline hit. That's normal for a sprint this short, but it's worth naming: what's shown here is a first pass, not a validated design. If I had another week, I'd spend it watching someone actually use the app, not adding features to it.",
  },
  {
    type: "paragraph",
    text: "The bigger gap is who we talked to. Three experts gave us a strong outside view of the site's problems. Nobody in the actual target age group ever looked at the app or reacted to the concept. Expert opinion is a fast way to get oriented in five days, but it isn't a substitute for the people you're designing for. I'd treat it that way from the start next time: a starting point, not a stand-in.",
  },
  {
    type: "paragraph",
    text: "The event-frequency question stayed open too. Twice a year with headphones instead of speakers is a reasonable answer, but it's still an assumption we reasoned our way to on paper. I'd want to test it against an actual resident before I trusted it.",
  },
  {
    type: "paragraph",
    text: "What I'm confident stands up: the research pointed at a real, specific gap, the headphone decision solved two constraints at once instead of trading one off against the other, and the prototype is a working demonstration of the idea, not just a description of it. Five days isn't enough time to get everything right. It's enough to prove the core idea is sound, and to know exactly what to test next.",
  },

  { type: "heading", level: 3, text: "Team" },
  {
    type: "paragraph",
    text: "Built with Eva Pereira (Business Manager), Maja Ziółkowska (Maker), Lama Karameh (Team Leader), Karl Bou-Sakr (Communication), and Flavien Girard (Team Builder), during the ECIU Créathon at INSA Hauts-de-France, June 2026.",
  },
  {
    type: "linkCard",
    text: "Explore the working prototype",
    href: "https://order-query-60065275.figma.site",
  },
];

// Supporting project, not a flagship case study -- kept deliberately
// shorter than aRENEWberg/Lumi/Convay per the implementation brief
// ("lighter and faster to consume... 3 to 5 minute reading
// experience"). Text is verbatim from the approved final case study
// (Multimodal-Robot-Interaction-Case-Study-Final.md); the only changes
// made for web presentation are: (1) the source's bracket placeholders
// ([Robot Platforms], [Interaction Flow], etc.) are replaced with real
// photos recovered from the project's Assets folder and from the
// embedded images inside the team's RoboCarnival slide deck, matched
// to whichever nearby paragraph they actually provide evidence for
// (not always the paragraph the bracket sat next to -- e.g. the
// hand-petting-the-cat photo is placed at the "touch channel needed no
// explanation" finding, since that's the sentence it's actually
// evidence for); (2) the opening hook paragraph now sits as the first
// paragraph under "The project" heading rather than floating above any
// heading, since every other section in this component needs a
// heading to belong to; (3) "Best team" is a level-4 sub-heading
// inside "RoboCarnival" rather than its own full section, since it's
// one paragraph and a direct continuation of the same event, not a
// new topic -- this is what keeps the page feeling light rather than
// like nine full chapter breaks; (4) a short Timeline block up top
// summarizes the chronology already stated in the text, for a reader
// skimming in under a minute. No sentence of the approved writing was
// reworded, cut, or added to.
const robocarnivalBody: CaseStudyBlock[] = [
  {
    type: "image",
    src: "/robocarnival/hero.jpg",
    width: 1915,
    height: 1072,
    alt: "Aseer sitting between Misty (left, small robot with a round camera-eyed head), a Joy for All companion cat (in his lap), and QT (right, a tall robot with an expressive screen face).",
    caption: "Misty, the companion cat, and QT, the three robots, one modality each, at the center of this project.",
  },

  { type: "heading", level: 3, text: "The project" },
  {
    type: "timeline",
    steps: [
      { label: "Course", detail: "Social Robots: Design, Research & Interaction, Tampere University" },
      { label: "Research workshops", detail: "Visiting high schoolers test QT, Misty, and the cat (March 2025)" },
      { label: "RoboCarnival", detail: "Public demo station, Hervanta campus (April 2025)" },
      { label: "Best Team", detail: "Voted by the visiting students" },
    ],
  },
  {
    type: "paragraph",
    text: "A robot's face alone isn't enough to communicate an emotion, and people will trust a robot's touch faster than its words. That's the short version of what this project taught me. It's a university course project, not a flagship case study, but it's the clearest example in my portfolio of designing for a physical, multimodal interface, and it taught me things a screen-based project couldn't.",
  },
  {
    type: "paragraph",
    text: "Our course, Social Robots: Design, Research and Interaction, was built around a framework called robot literacy: the idea that using and understanding robots is a skill, and that different people need different things to build that skill. The course split this into six areas, from basic awareness of what robots are and do, to programming them, to the ethics of trusting them. Each team picked one area to explore and build a public demo around.",
  },
  {
    type: "paragraph",
    text: "My team of five was assigned interaction: how someone who has never met a robot before figures out how to engage with it. We turned that into a handful of research questions: how teenagers read a robot's non-verbal cues, how they think about robots as companions, what makes them willing to interact at all, and how modalities like touch, voice, and gesture change that willingness. We had three robots on loan to explore those questions with, one per channel.",
  },
  {
    type: "image",
    src: "/robocarnival/robot-platforms.jpg",
    width: 1034,
    height: 735,
    alt: "QT (left, tall, with a smiling screen face) and Misty (right, small, with a round camera-eyed head) set up on a table in the workshop room.",
    caption: "QT and Misty, set up in the workshop room ahead of a session. The cat spent most of its time being held, not sitting on a table.",
  },

  { type: "heading", level: 3, text: "My role" },
  {
    type: "paragraph",
    text: "I want to be specific here, because this was a team project and I don't want to claim more than I did.",
  },
  {
    type: "paragraph",
    text: "We ran several research workshops with visiting high school students over the course of the project. I facilitated one of these sessions myself: running the activities, keeping time, and making the calls on when to move on. For the others, I worked as an observer, staying quiet and watching what participants did and said when no one was managing them directly. Facilitating and observing gave me two different views of the same activities, and both fed into the same shared notes. After the workshops, the five of us went through those notes together, pulled out the patterns, and built our final presentation deck as a joint effort. None of that analysis or storytelling was mine alone.",
  },
  {
    type: "paragraph",
    text: "One piece I did own individually: I shot and edited the short video we used for our pitch at RoboCarnival. It was a side task compared to the research, but it meant picking up a camera and an editing timeline on a tight deadline, which is its own kind of design constraint.",
  },
  {
    type: "paragraph",
    text: "With roles sorted, here's what we were actually working with.",
  },

  { type: "heading", level: 3, text: "Three robots, three modalities" },
  {
    type: "paragraph",
    text: "None of us wrote new behavior for these robots. QT, Misty, and the cat all came with existing capabilities, and programming them from scratch was actually a different team's project within the same course. Our job was to choose which of those existing capabilities to use, and to build a short, legible flow around them.",
  },
  {
    type: "heading", level: 4, text: "QT: voice",
  },
  {
    type: "paragraph",
    text: "For QT, that meant loading in a set of spoken questions we wanted it to ask visitors, things like \"where is the microphone?\" or \"would you find a robot like this creepy?\" QT would ask, the visitor would answer out loud, and we'd watch how they responded to being addressed directly by a robot.",
  },
  {
    type: "heading", level: 4, text: "Misty: non-verbal expression",
  },
  {
    type: "paragraph",
    text: "For Misty, it meant picking a handful of her preset facial expressions and sounds for an emotion-guessing game. An operator on our team would trigger an expression, visitors would write or draw what emotion they thought it was, and then we'd reveal the intended one.",
  },
  {
    type: "heading", level: 4, text: "The cat: touch",
  },
  {
    type: "paragraph",
    text: "The cat, a Joy for All companion pet (the same product line used in a lot of eldercare and dementia research), needed no configuration at all. It reacted to touch: petting, holding, moving it. That simplicity turned out to matter a lot.",
  },

  { type: "heading", level: 3, text: "Testing modalities with real teenagers" },
  {
    type: "paragraph",
    text: "One session in March is a good example of how these workshops worked: four groups of visiting high school students came through in one afternoon to test how these three channels actually landed. It wasn't a controlled study. Four groups, one afternoon. But the patterns showed up consistently enough across groups, and across the other sessions we ran, that I'd trust them as a real signal, not just a one-off reaction. Each group went through the same structure: a quick icebreaker about their attitudes toward robots, a round with Misty's emotion-guessing game, some free time with QT, and a closing discussion where they sketched ideas for how Misty's emotions could be made clearer.",
  },
  {
    type: "paragraph",
    text: "A few things came out of this that shaped everything after.",
  },
  {
    type: "paragraph",
    text: "The non-verbal channel was harder to read than we expected. Groups regularly mixed up Misty's expressions, mistaking her \"party mode\" for amazement, or unsure if a sound meant laughter or crying. Their own suggestions were telling: several students said Misty needed a mouth, not just eyes, because a face with fewer moving parts gives you less to read. One student made the connection to face masks during the pandemic, pointing out that people could still read emotion around a covered mouth, which meant the eyes alone should theoretically be enough. But on a simplified robot face, they weren't.",
  },
  {
    type: "paragraph",
    text: "The touch channel needed no explanation at all. The cat was the most consistently popular thing in the room across all four groups. Students petted it without being told how, and the reactions were immediate and warm. One student said they couldn't \"dehumanize\" the cat enough to imagine using it for a chore like the dishes. Another compared it directly to their own pet.",
  },
  {
    type: "image",
    src: "/robocarnival/cat-touch.jpg",
    width: 644,
    height: 504,
    alt: "Close-up of a hand petting the grey and white robotic companion cat on a table.",
    caption: "The cat needed no instructions. Visitors petted it without being told how.",
  },
  {
    type: "paragraph",
    text: "The voice channel sat somewhere in between. Talking to QT was novel and often funny to them, but it also surfaced real questions: one student asked where the camera and microphone actually were, which opened into a genuine conversation about privacy that we hadn't planned for.",
  },
  {
    type: "image",
    src: "/robocarnival/workshop-canvas.jpg",
    width: 1034,
    height: 791,
    alt: "A paper canvas taped to a wall, headed 'INTERACTION WITH ROBOTS,' with handwritten questions and rows of colored sticky notes with participants' answers.",
    caption: "The co-design canvas used in each workshop session, where groups wrote and drew their answers.",
  },

  { type: "heading", level: 3, text: "From notes to a public station" },
  {
    type: "paragraph",
    text: "Once we pulled the patterns together across these workshops, the team sat down and turned them into a set of decisions for RoboCarnival. We used a simple impact-versus-feasibility exercise to sort through ideas, things like letting visitors redesign Misty's face by drawing, or running two robots through a short back-and-forth to show them interacting with each other. Most of those got parked. What survived was closer to what we already had: three robots, three modalities, side by side, with better facilitation built around each one.",
  },
  {
    type: "paragraph",
    text: "The main change wasn't to the robots. It was to us. We built explicit talking points for the moments we knew would be confusing, like why Misty's face alone often wasn't enough, and we leaned harder into the parts that worked without any explanation, like just letting people pet the cat before we said anything at all.",
  },
  {
    type: "imageRow",
    images: [
      {
        src: "/robocarnival/feasibility-matrix.png",
        width: 939,
        height: 735,
        alt: "An impact-versus-feasibility matrix with ideas like '3 stations, different modality' and 'changing emotions of a robot by drawing' plotted across four quadrants.",
      },
      {
        src: "/robocarnival/station-sketch.png",
        width: 811,
        height: 392,
        alt: "A hand-drawn sketch of three tables: QT with a deck of questions, Misty with a box for snacks, and the cat on a blanket.",
      },
    ],
  },

  { type: "heading", level: 3, text: "RoboCarnival" },
  {
    type: "paragraph",
    text: "RoboCarnival was the course's public exhibition, held in the Language Center lobby at Tampere University's Hervanta campus. Every team ran its own station side by side, each covering a different slice of robot literacy: ours was interaction, others covered programming, ethics, or trust. High school students from across Tampere came through in groups over the course of the day.",
  },
  {
    type: "paragraph",
    text: "Getting ready for it meant packing our findings into something a stranger could absorb walking past a table in under a minute, plus the pitch video mentioned above, which was the other thing on our checklist that week.",
  },
  {
    type: "paragraph",
    text: "At our table, QT, Misty, and the cat sat side by side, and we walked visitors through all three in a few minutes each. Having run the same activities several times already in our earlier workshops meant we had a sense of where people would get stuck and where they wouldn't need help at all, which made the day feel far less improvised than it could have.",
  },
  {
    type: "image",
    src: "/robocarnival/team-presenting.jpg",
    width: 1600,
    height: 1043,
    alt: "The team's RoboCarnival table, with QT standing at the center, teammates on one side, and a group of visiting students gathered around writing notes.",
    caption: "The team's RoboCarnival table, with QT centered and visiting students working through the station.",
  },
  {
    type: "heading", level: 4, text: "Best team",
  },
  {
    type: "paragraph",
    text: "At the end of the day, the visiting high school students voted on their favorite station, and ours was chosen. We were later given a certificate recognizing the team for the project, noting we'd been picked as the best team by the students who came through. It's a nice thing to have, and I want to be clear about what it is: a vote from a friendly, one-day audience of teenagers, not an industry award. I'm proud of it in that context.",
  },
  {
    type: "quote",
    text: "You were chosen to be the best team by highschool students. Congratulations!!!",
    attribution: "Certificate of Appreciation, RoboStudio, Tampere University",
  },

  { type: "heading", level: 3, text: "What I took from this" },
  {
    type: "paragraph",
    text: "The biggest lesson was about redundancy across channels. Misty's face, on its own, wasn't a reliable way to communicate an emotion, however good the intention behind the design was. People needed more than one signal to be confident in what they were reading, and when we only gave them one, they guessed wrong more often than we expected going in. That's stuck with me. When I look at any interface now, robotic, voice, or otherwise, I ask what happens when the primary signal is ambiguous, and whether there's a second one backing it up.",
  },
  {
    type: "paragraph",
    text: "Working with physical robots also changed how I think about failure. There's no console log to check when a robot doesn't respond the way you expect in front of a room of teenagers. You either have a backup plan ready, or the moment just falls flat. Our workshop script had built-in fallback activities for exactly this reason, and having them there took real pressure off the day.",
  },
  {
    type: "paragraph",
    text: "Public demonstration taught me something different: how much you learn by watching someone react to your work in real time, with no chance to explain it first. A lot of my research experience since has involved trying to get that same kind of unscripted, first-contact reaction as early as possible, because it tells you things a script or a survey won't.",
  },
  {
    type: "paragraph",
    text: "This is the project that first showed me how a signal I designed can be read completely differently by the person receiving it, and that gap between intention and interpretation is something I now check for by default in any multimodal or AI-driven interface I work on.",
  },
];

// Supporting research project, deliberately lighter than Lumi (the
// flagship research project) per the approved Portfolio Blueprint:
// "This project should never feel like it's trying to compete with
// Lumi on depth." Text is verbatim from Case-Study-Final.md -- the
// only changes made for web presentation are: (1) the source's
// `[Visual: chart-XX.png]` markers become real image blocks, placed
// exactly where the source placed them; (2) the one paragraph marked
// `[Callout]`/`[End callout]` in the source becomes a `callout` block
// instead of a plain paragraph, per the source's own explicit
// instruction ("render it as a visually distinct block... not as a
// regular paragraph"); (3) no hero/cover image, per the source's
// explicit instruction not to add one (the original article's cover
// was a licensed stock photo, intentionally excluded as non-original
// material) -- this case study opens directly on its first heading,
// unlike Lumi/aRENEWberg/RoboCarnival, which all open on a real photo.
//
// The brief for this milestone is explicit that this project must not
// be framed as a "Bachelor's project" on the card, hero, subtitle, or
// meta strip, and that the fact it was undergraduate HCI coursework
// should appear exactly once, inside the body, not repeated in the
// page chrome. That one mention already exists verbatim in the
// source's own Overview paragraph ("during an HCI course in the final
// years of my undergrad") -- nothing needed to be added for this.
// meta.role/team/tools below are deliberately reworded from the
// source's own "Header / context strip" (which does say "HCI
// coursework project · Bachelor's in Software Engineering") to keep
// that framing out of the hero entirely, per the same instruction.
const gameDifficultyBody: CaseStudyBlock[] = [
  { type: "heading", level: 3, text: "Overview" },
  {
    type: "paragraph",
    text: "This was one of the first research projects I worked on, during an HCI course in the final years of my undergrad. The question behind it was simple: what actually keeps someone playing a video game, and does difficulty level have much to do with it?",
  },
  {
    type: "paragraph",
    text: "I ran a 28-person survey, analyzed the responses, and turned the findings into a short set of recommendations for game designers. It's a small study, and I want to say that plainly up front. What it gave me was something more lasting than the findings themselves: practice running a research method from question to write-up, start to finish. That habit has carried into every research project I've done since.",
  },
  {
    type: "image",
    src: "/game-difficulty/chart-01-motivational-factors.png",
    width: 1782,
    height: 1082,
    alt: "Horizontal bar chart, what motivates players to keep playing: engaging storyline 67.9%, reward system 60.7%, challenging difficulty level 53.6%, social interaction with other players 35.7%, other 0%. n = 28.",
    caption: "What motivates players to keep playing (n = 28).",
  },

  { type: "heading", level: 3, text: "Why this project" },
  {
    type: "paragraph",
    text: "Most games use a single difficulty slider (easy, medium, hard) as if every player wants the same experience, just dialed up or down. That seemed like an assumption worth checking. If the goal is to keep players engaged, it made sense to first ask players what actually engages them, rather than assume harder automatically means better.",
  },
  {
    type: "paragraph",
    text: "That's the HCI question underneath this project: understand behavior and preference before designing around an assumption.",
  },

  { type: "heading", level: 3, text: "Method" },
  {
    type: "paragraph",
    text: "I built a Google Form survey covering what makes games engaging, what makes them frustrating, and how often players change difficulty mid-game. It ran for 28 responses. Most respondents were casual gamers in the 18–24 age range, playing primarily on PC or mobile.",
  },

  { type: "heading", level: 3, text: "What the survey found" },
  {
    type: "paragraph",
    text: "**Storyline beats difficulty as an engagement driver.** Asked what makes a game engaging, 85.7% of respondents pointed to storyline, ahead of graphics (71.4%) and sound (46.4%). Difficulty level ranked last, at 35.7%.",
  },
  {
    type: "image",
    src: "/game-difficulty/chart-02-factors-engaging.png",
    width: 1782,
    height: 1082,
    alt: "Horizontal bar chart, what makes a game engaging: storyline 85.7%, graphics 71.4%, sound effects and music 46.4%, difficulty level 35.7%, other 7.1%. n = 28.",
    caption: "What makes a game engaging (n = 28).",
  },
  {
    type: "callout",
    text: "**But challenge is still what keeps people coming back.** A separate question asked what motivates players to keep playing, and challenge and reward both scored highly: engaging storyline (67.9%), reward systems (60.7%), and challenging difficulty (53.6%) were the top three. Put next to the finding above, there's a real tension: players don't call difficulty \"engaging,\" but it's still one of the top things keeping them in a game. Story pulls people in. Challenge is part of what keeps them there.",
  },
  {
    type: "paragraph",
    text: "**Frustration comes from content, not difficulty.** The top frustrations were a lack of engaging content (64.3%) and bugs and glitches (53.6%). Unfair difficulty ranked lower, at 32.1%. Frustration was more about what's missing from a game than about how hard it is.",
  },
  {
    type: "image",
    src: "/game-difficulty/chart-03-factors-frustrating.png",
    width: 1782,
    height: 1082,
    alt: "Horizontal bar chart, what frustrates players most: lack of engaging content 64.3%, bugs and glitches 53.6%, poor game design 42.9%, unfair difficulty level 32.1%, other 3.6%. n = 28.",
    caption: "What frustrates players most (n = 28).",
  },
  {
    type: "paragraph",
    text: "**Most players rarely touch the difficulty setting.** Half of respondents said they only switch difficulty when they get stuck or bored, and another 17.9% said they never switch at all. Only a small minority (about 7% combined) said they adjust it often or always.",
  },
  {
    type: "image",
    src: "/game-difficulty/chart-04-difficulty-switching.png",
    width: 2499,
    height: 1097,
    alt: "Donut chart, how often players switch difficulty: rarely, only when stuck or bored 50%, occasionally 25%, never 17.9%, often 3.6%, always 3.6%. n = 28.",
    caption: "How often players switch difficulty mid-game (n = 28).",
  },
  {
    type: "paragraph",
    text: "That last point is worth sitting with. If most players set a difficulty level once and leave it, a single difficulty slider isn't really serving distinct player \"types\"; it's mostly being ignored after the first choice. Most of what drives engagement or frustration is happening somewhere else in the game.",
  },
  {
    type: "paragraph",
    text: "On preferred difficulty itself, moderate and hard were the most selected ranges (64.3% and 50%; respondents could select more than one), which fits with the \"casual gamer\" profile of most respondents: they want some challenge, just not an extreme one. That said, the study measured preferences in aggregate. It didn't cluster respondents into distinct player types the way the project's title suggests, a gap I'd close first if I revisited this work.",
  },

  { type: "heading", level: 3, text: "What I recommended" },
  {
    type: "list",
    items: [
      "Invest in storyline and visual presentation: these had the strongest link to what players call \"engaging.\"",
      "Keep reward systems and challenge present, since they motivate continued play even when players don't describe them as \"engaging.\"",
      "Prioritize regular content updates and bug fixes over difficulty tuning: this is where players say frustration actually comes from.",
      "Support both single-player and multiplayer modes, since playing with friends came up consistently as a preference.",
    ],
  },

  { type: "heading", level: 3, text: "Limitations" },
  {
    type: "paragraph",
    text: "Twenty-eight responses is a small sample, skewed toward one age group and self-selected respondents, so these findings describe this group's stated preferences more than gamers in general. It was a self-report survey: it captures what people say motivates them, not necessarily what they'd actually do in play. And it was a single method: no interviews, no usability testing, no prototyping alongside it. These are patterns in stated preference, not validated design decisions.",
  },

  { type: "heading", level: 3, text: "What I'd do differently now" },
  {
    type: "paragraph",
    text: "The biggest gap is method diversity. A survey is good at telling you what people believe about themselves; it's weaker at telling you what actually happens when they play. If I ran this again, I'd pair the survey with a short usability test or session recordings, so stated preference could be checked against real behavior, and I'd design the sampling to actually segment player types, instead of measuring preferences in aggregate. That shift, from one method to several, and from broad patterns to defined segments, is the throughline into the research I do now.",
  },

  { type: "heading", level: 3, text: "Reflection" },
  {
    type: "paragraph",
    text: "This project didn't produce a finished design: it produced a habit. Write questions that isolate one variable at a time. Read a table of percentages until you find the one comparison that actually says something, like storyline pulling players in while challenge keeps them there. Say plainly what a small study can't prove. That last part is the one I still check first on every research project I run.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "convay-mobile-app-revamp",
    title: "Convay Mobile App Revamp",
    track: "work",
    scale: "product",
    isFlagship: true,
    contentStatus: "complete",
    // Milestone 3: the case study's own opening shot, reused as this
    // card's thumbnail instead of a generated placeholder -- see
    // ProjectSummary.thumbnail in content/types.ts for why only some
    // projects get one. This is the same GIF that opens the full case
    // study, already sized 1600x1200 (4:3), matching ProjectCard's media
    // aspect ratio exactly, so it renders here uncropped.
    thumbnail: img(
      "TIUlfB8AWBViTdf78QjQ3hKq2o.gif",
      1600,
      1200,
      "Convay mobile app walkthrough",
    ),
    // Convay Mobile App Revamp rebuild: replaces the old hook paragraph,
    // which 01_Audit.md flagged as the one place the writing voice broke
    // on the whole page ("The goal? Make sure users could rely on
    // Convay, wherever they are." -- a question-fragment opener in an
    // otherwise natural, confident piece of writing, and the very first
    // paragraph a reader sees). Verbatim from 03_Content_Final.md.
    oneLineScope:
      "Convay was growing fast, reaching global audiences and hosting high-stakes meetings, but its mobile app hadn't kept up. Users struggled to join meetings, key features were missing, and the experience felt clunky next to the web app. I redesigned the mobile experience from the ground up: simpler to use, faster to join, and consistent with Convay everywhere people met.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    liveMeta: {
      category: ["Mobile Design", "Product Design"],
      role: ["UX Designer", "UI Designer", "UX Researcher"],
      tools: ["Figma"],
    },
    // Closes the roughly 1,000px dead-space gap 01_Audit.md measured
    // between the meta row and the hero visual -- see CaseStudyLayout.tsx
    // for what this actually changes and why it's scoped to this one
    // case study.
    compactHero: true,
    // Points to the next Convay project in the existing Work-track
    // order: same company, also a flagship, and the most natural "if you
    // liked this, here's what else I built there" continuation.
    nextCaseStudy: {
      title: "Convay AI for Physical Meetings",
      href: "/work/convay-ai-for-physical-meetings",
    },
    body: convayMobileAppRevampBody,
  },
  {
    slug: "convay-ai-for-physical-meetings",
    title: "Convay AI for Physical Meetings",
    track: "work",
    scale: "product",
    isFlagship: true,
    contentStatus: "complete",
    thumbnail: img(
      "7mhLYobFRspDQYe7igyV2dg5zqQ.gif",
      1600,
      1200,
      "Convay AI meeting transcription walkthrough",
    ),
    oneLineScope:
      "Convay AI for Physical Meetings started with a simple question: *Why should only online meetings be easy to document?* In high-stakes rooms, whether it's a government briefing or an internal sync, people still scramble to take notes or forget key points entirely. This feature was our answer: **record audio, let AI handle the rest.** Transcripts, summaries, multilingual support, all packaged into a simple, intuitive flow that turns real-world conversations into shareable outcomes.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    liveMeta: {
      category: ["Web Design", "Product Design"],
      role: ["UX Designer", "UI Designer", "UX Researcher"],
      tools: ["Figma"],
    },
    body: convayAiBody,
  },
  {
    slug: "convay-design-system",
    title: "Convay Design System",
    track: "work",
    scale: "platform",
    // Not marked isFlagship here even though Portfolio_Strategy_Roadmap.md
    // Section 6 calls this the strongest, most verifiable claim -- the
    // Work index page's flagship layout was built for exactly 2 wide
    // cards (a 2-up row); adding a 3rd would break that grid. Worth
    // revisiting in a dedicated pass, not as a side effect of a content
    // migration commit.
    //
    // Thumbnail Refresh milestone: previously no `thumbnail` (Milestone 3
    // note, kept below for history) -- the case study's own first
    // imageRow is six assorted, irregularly-sized diagrams that don't
    // crop cleanly into a 4:3 card. A screen recording sidesteps that
    // problem entirely instead of forcing a bad crop: it's a scroll
    // through the actual design-system tokens (color, spacing, shadow
    // scales) rather than any single irregular diagram. Trimmed ~0.8s off
    // each end of the source clip (a fade to/from a blank frame) so the
    // loop opens and closes on real content instead of an empty
    // rectangle; re-encoded from a 25fps/1600x1200 ~48MB raw export to
    // 1100px-wide H.264 (see ProjectCard.tsx for why video over GIF).
    //
    // Prior note: unlike the other five migrated case studies, this one
    // doesn't open with a clean 4:3 hero shot -- its first imageRow is
    // six assorted, irregularly-sized diagrams (a 647x245 banner, several
    // tall portrait crops). Forcing any one of those into ProjectCard's
    // 4:3 media block would crop it badly. Kept the generated
    // ProjectVisual placeholder instead, which was the more honest choice
    // than a bad crop of a real asset -- until this real screen
    // recording became available.
    thumbnail: {
      src: "/convay-design-system/thumbnail.mp4",
      width: 1100,
      height: 826,
      alt: "Scrolling through Convay's design system: color tokens, spacing scale, and shadow values in Figma.",
    },
    contentStatus: "complete",
    oneLineScope:
      "Convay's fast growth created a need for consistency and scalability, but the platform had no design system in place. As the only UX designer assigned to the task, I took the initiative to create Convay's first design system from scratch. With guidance from the product team and close collaboration with developers, I built a scalable foundation defining colors, typography, spacing, components, and patterns. This design system unified the platform's visual language across light and dark themes and improved team workflows: making handoffs easier, updates faster, and new features more consistent. Today, it supports Convay's core platform and upcoming features across web and mobile, enabling the product to scale with confidence.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    liveMeta: {
      category: [
        "Design System",
        "Web Design",
        "Mobile Design",
        "Responsive Design",
        "Accessible Design",
      ],
      role: ["UX / UI Designer"],
      tools: ["Figma"],
    },
    body: convayDesignSystemBody,
  },
  {
    slug: "fitvibe",
    title: "FitVibe: A Comprehensive Fitness App",
    track: "work",
    scale: "product",
    contentStatus: "complete",
    thumbnail: img(
      "szd3CmjkaLoDxcVmwh26M4KGcA.gif",
      1600,
      1200,
      "FitVibe app walkthrough",
    ),
    oneLineScope:
      "FitVibe is a comprehensive fitness app designed for fitness enthusiasts and individuals pursuing a healthy lifestyle. It offers a range of features including workout and diet planners, progress tracking, social interaction, gamified challenges, and an e-commerce shop. With a focus on personalized guidance and community support, FitVibe caters to passionate fitness enthusiasts and those seeking to improve their well-being.",
    meta: {
      role: "UI Design Intern (under senior designer guidance)",
      team: "Senior designer + client team",
      duration: "May 2022 – Aug 2022",
      tools: "Figma",
    },
    liveMeta: {
      category: ["Mobile Design"],
      role: ["UX Designer", "UI Designer", "UX Researcher"],
      tools: ["Figma"],
    },
    body: fitvibeBody,
  },
  {
    slug: "travelmate-ai",
    title: "TravelMate AI",
    track: "work",
    scale: "product",
    // The `status: "contingent"` flag (and the "Decision pending" badge
    // it rendered on the project card) is removed as of the typography
    // cleanup / TravelMate content pass: the keep/cut/reframe question
    // Master_Portfolio_Knowledge_Base.md Section 3 flagged is resolved.
    // TravelMate is kept, with a full published case study and a
    // confirmed duration -- it's finished content now, not a project
    // still waiting on a decision.
    contentStatus: "complete",
    thumbnail: img(
      "gltG0cxn5SXfakeqUdUin2pbW8E.gif",
      1600,
      1200,
      "TravelMate AI app walkthrough",
    ),
    oneLineScope:
      "TravelMate AI is a mobile-based conversational assistant designed to make traveling simpler and stress-free. It helps tourists navigate new cities, get instant recommendations, translate on the go, and access emergency info in real time. By combining chat, voice, and travel utilities in one app, TravelMate brings together tools that are usually scattered across multiple platforms, giving users a single, reliable travel companion.",
    meta: {
      role: "To be confirmed",
      team: "To be confirmed",
      duration: "Jan 2025 – May 2025",
      tools: "To be confirmed",
    },
    liveMeta: {
      category: ["Mobile Design", "Product Design"],
      role: ["UX Designer", "UI Designer", "UX Researcher"],
      tools: ["Figma"],
    },
    body: travelMateBody,
  },
  {
    slug: "convay-notifications",
    title: "Convay Notifications",
    track: "work",
    scale: "feature",
    contentStatus: "complete",
    thumbnail: img(
      "VlxHzd93ClWznE7PstrL1EmwKY.gif",
      1600,
      1200,
      "Convay notifications walkthrough",
    ),
    oneLineScope:
      "In a platform used across 46+ countries, including by government agencies, missing a critical update can break workflows. I helped design a centralized, categorized notification system for Convay, ensuring users could easily stay on top of meetings, messages, and file updates. This feature was a small yet strategic step toward making Convay a seamless, scalable collaboration tool.",
    meta: {
      role: "UX Designer",
      team: "Product managers + engineering (team size to be confirmed)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure)",
      tools: "Figma",
    },
    liveMeta: {
      category: ["Web Design", "Product Design"],
      role: ["UX Designer", "UI Designer"],
      tools: ["Figma"],
    },
    body: convayNotificationsBody,
  },
  // -----------------------------------------------------------------
  // Research track: no live-site equivalent (see file-level comment
  // above). Lumi is written (see lumiBody above); the other four are
  // still untouched placeholders.
  // -----------------------------------------------------------------
  {
    slug: "lumi",
    title: "Lumi: Conversational AI for Public Services",
    track: "research",
    scale: "research",
    isFlagship: true,
    contentStatus: "complete",
    // Final intro paragraph from Lumi_Case_Study_FINAL.md, replacing the
    // earlier one-line placeholder summary.
    oneLineScope:
      "Lumi is a conversational AI prototype I designed to help international students find their way through Finnish public services. This case study covers what happened when I studied real newcomers using it, and what that revealed about how trust in AI actually works.",
    meta: {
      // "Sole researcher and designer" is the final copy's own header
      // wording (previously "Researcher & designer (solo, supervised)").
      // Team/duration/tools are unchanged background facts not covered
      // by the final copy, so left as they were. The final copy's
      // "Method" (qualitative study, 15 participants, reflexive thematic
      // analysis) and "Outcome" (Master's thesis, graded 5/5) don't have
      // their own CaseStudyMeta fields -- both are already conveyed
      // narratively in the body (The study / Go deeper) instead.
      role: "Sole researcher and designer",
      team: "Supervised by Prof. Thomas Olsson and Amir Pakpour Haji Agha",
      duration: "2025 – 2026",
      tools: "Figma (prototype), Atlas.ti",
    },
    // Thumbnail Refresh milestone: swapped the static landing-screen crop
    // for a real screen recording of Lumi in use (the widget opening,
    // topic buttons, a live conversation) -- motion that shows the
    // product actually working, not just its splash screen. Source clip
    // was a 25fps/1600x1200, ~40MB raw export; re-encoded to 1100px-wide
    // H.264 (see ProjectCard.tsx for why video instead of a native GIF).
    // 723x542 kept as the width/height metadata (matches the video's 4:3
    // aspect; ProjectCard only reads these for the aspect-ratio math, not
    // for actually sizing a <video> element).
    thumbnail: {
      src: "/lumi/thumbnail.mp4",
      width: 723,
      height: 542,
      alt: "Lumi in use: the chat widget opening, topic buttons, and a live conversation answering a student's question about healthcare in Finland.",
    },
    body: lumiBody,
  },
  {
    slug: "cultural-festival-platform",
    title: "Cultural Festival Platform, Arenberg UNESCO Site",
    track: "work",
    scale: "product",
    contentStatus: "complete",
    oneLineScope:
      "A mobile app concept for a cultural festival at a UNESCO heritage site, built during a six-person ECIU Créathon team.",
    meta: {
      role: "Creative Manager",
      // Corrected per Aseer directly: prototyped with Figma Make (not
      // hand-built HTML/CSS/JS as an earlier assistant-generated
      // background note had assumed) -- Figma Make generates real,
      // framework-free HTML/CSS/JS as its output and publishes it as a
      // Figma Sites link, which is why the case study body's "single-file
      // app in plain HTML, CSS, and JavaScript, no framework" build note
      // and the live order-query-60065275.figma.site prototype URL both
      // still hold; only the *tool* used to produce that output was
      // misattributed. Team wording matches the case study's own "Team:"
      // line rather than the prior generic ECIU-consortium note.
      team: "6-person multidisciplinary team (design, engineering, business)",
      duration: "June 2026",
      tools: "Figma (Make)",
    },
    // Thumbnail Refresh milestone: swapped the static splash-screen crop
    // for a real screen recording (splash screen -> a scavenger-hunt clue
    // -> the festival's live activity list), so the card shows the
    // product actually working rather than just its title screen. The
    // source clip (Scene9, later re-exported by Aseer as
    // Scene9-c7fb1a1a.gif after the first export turned out to have a
    // persistent third-party watermark baked across the whole animation)
    // was a 25fps/1600x1200, ~24MB raw GIF; trimmed ~0.3s off each end
    // (a fade to/from black) and re-encoded to 1100px-wide H.264, same
    // treatment as Lumi and Convay Design System (see ProjectCard.tsx).
    thumbnail: {
      src: "/arenewberg/thumbnail.mp4",
      width: 1100,
      height: 826,
      alt: "The aRENEWberg app: splash screen, a scavenger-hunt clue, and the festival's live activity list.",
    },
    body: arenewbergBody,
  },
  {
    slug: "robocarnival",
    title: "Multimodal Robot Interaction (RoboCarnival)",
    track: "research",
    scale: "research",
    // Corrected "...Best Team Award..." -> "...voted Best Team...": the
    // approved case study is explicit that this was "a vote from a
    // friendly, one-day audience of teenagers, not an industry award,"
    // so the old subtitle's "Award" framing is exactly the overstatement
    // the case study itself warns against. Same fix pattern as
    // aRENEWberg's meta.tools correction -- a factual-accuracy edit, not
    // a content rewrite.
    oneLineScope:
      "A multimodal interaction concept across three robot platforms, voted Best Team by visiting high schoolers at RoboCarnival 2025.",
    contentStatus: "complete",
    meta: {
      // Refined from the placeholder's generic "Team member" / "Social
      // Robots course team" now that the approved case study states the
      // real facts: Aseer's actual split of responsibilities, the five
      // named teammates, and which robot covered which channel.
      role: "Workshop facilitator, observer & video editor",
      team: "Anna, Aseer, Emon, Fati, Jasmin (5-person team)",
      duration: "~6 weeks, spring 2025",
      tools: "QT (voice), Misty (expression), Joy for All companion cat (touch)",
    },
    thumbnail: {
      src: "/robocarnival/hero.jpg",
      width: 1915,
      height: 1072,
      alt: "Aseer sitting between Misty, a Joy for All companion cat, and QT.",
    },
    body: robocarnivalBody,
  },
  {
    slug: "game-difficulty-player-types",
    title: "Tailoring Game Difficulty to Player Types",
    track: "research",
    scale: "research",
    // Given verbatim by Aseer -- do not adjust wording or add "Bachelor's"
    // framing here (see the gameDifficultyBody comment above for the
    // full reasoning on where that framing is and isn't allowed to
    // appear).
    oneLineScope:
      "Survey-based UX research exploring how game difficulty influences player engagement • 2023",
    contentStatus: "complete",
    meta: {
      // Deliberately reworded from the source's own header strip ("HCI
      // coursework project · Bachelor's in Software Engineering") to
      // keep that framing out of the hero/meta strip per this
      // milestone's explicit instruction -- the one permitted mention
      // of the HCI course lives inside the body's Overview section.
      // team: "Solo" per Aseer directly -- this was solo work, not a
      // team project (matches the body copy's own consistent first-
      // person-singular voice: "I ran a 28-person survey," "I built a
      // Google Form," etc., with no "we"/"our team" language anywhere).
      role: "Survey design, analysis & reporting",
      team: "Solo",
      duration: "2023",
      tools: "Online survey (Google Forms), descriptive statistics",
    },
    // Custom editorial cover, purpose-built for this card (later
    // milestone): none of the four research charts crop into a legible
    // 4:3 thumbnail, and the source material explicitly excludes an
    // in-body hero/cover image (the original article's cover was a
    // licensed stock photo). A hand-built SVG (public/game-difficulty/
    // thumbnail.svg, ~5KB, kept alongside as the editable source)
    // combines a game-controller silhouette with a difficulty/player-
    // type bar chart and a 28-dot survey-respondent field -- one
    // cohesive visual, built entirely from this file's own design
    // tokens (dark-mode bg/text values, --color-accent, the same
    // feTurbulence grain technique globals.css already uses site-wide)
    // rather than a generic stock or AI-generated graphic. Shipped as a
    // rasterized PNG (2000x1500, optimized ~180KB) rather than the raw
    // SVG: next/image's built-in optimizer rejects local SVGs by
    // default (a Next.js security default, not a bug), and every other
    // thumbnail in this file is already a raster asset -- PNG keeps
    // this one consistent with that existing convention instead of
    // requiring a next.config.ts change for a single image.
    thumbnail: {
      src: "/game-difficulty/thumbnail.png",
      width: 2000,
      height: 1500,
      alt: "Editorial illustration: a game controller silhouette beside an ascending bar chart with player-type markers, over a dark gradient with a scattered field of 28 dots representing survey respondents.",
    },
    body: gameDifficultyBody,
  },
];

export const projectSummaries: ProjectSummary[] = caseStudies.map(
  ({ slug, title, track, oneLineScope, scale, isFlagship, status, thumbnail }) => ({
    slug,
    title,
    track,
    oneLineScope,
    scale,
    isFlagship,
    status,
    thumbnail,
  }),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((project) => project.slug === slug);
}

export function getProjectsByTrack(track: "work" | "research"): ProjectSummary[] {
  return projectSummaries.filter((project) => project.track === track);
}

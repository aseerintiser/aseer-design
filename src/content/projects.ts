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
 * Images/GIFs were first referenced straight from framerusercontent.com
 * (Milestone 2). They are now self-hosted in public/media/framer/ under
 * their original file names -- see content/media.ts and
 * scripts/self-host-framer-images.mjs.
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

import { framerAsset } from "./media";

/** Shared "Convay at a Glance" block, byte-identical across all four
 * Convay case studies on the live site -- kept as one constant here so
 * the four call sites can't quietly drift from each other, rather than
 * pasted four times.
 *
 * Content refresh: replaced with the approved "Convay at a Glance"
 * content (convay-at-a-glance.md), supplied by Aseer as the canonical
 * source of truth for this shared section. Wording is copied exactly,
 * not paraphrased. This also resolves the previous version's unresolved
 * verification-ledger conflict (self-reported figures reused without a
 * caveat) by construction: this is now the approved text itself, not a
 * migrated, flagged-as-uncertain claim.
 *
 * Follow-up polish pass (Aseer's own screenshot review):
 * (1) The source doc's "## Description" and "## Metrics" headings were
 * dropped -- rendered as actual sub-headings they read as label-the-
 * obvious noise (a heading announcing "this is the description" right
 * above plain prose; a heading announcing "these are metrics" right
 * above a block of numbers that already visually reads as metrics).
 * "## Capabilities" and "## References" are kept as real sub-headings:
 * unlike the first two, a bullet list or a stack of bare links doesn't
 * announce its own category the way prose or a numbers-grid already
 * does, so the label is doing real work there, not restating what the
 * content already shows.
 * (2) Aseer authorized adding bold emphasis to the three Description
 * paragraphs for skimmability (the source doc's own markdown had none).
 * Wording is untouched; only ** markers were added, at roughly the
 * same density the rest of this page's bio-style prose already uses
 * (compare site.ts's homepage bio).
 * (3) The official Convay link moves out of the References list into
 * its own LinkCard ("closing invitation" treatment, same component
 * design-showcase's prototype-link neighbor pattern conceptually
 * mirrors) at the very end of the section -- a primary-source link and
 * three press mentions were sitting in the same plain list with no
 * visual distinction between "the company's own site" and "coverage
 * about it." References now holds only the three press mentions. */
const convayAtAGlance: CaseStudyBlock[] = [
  { type: "heading", level: 3, text: "Convay at a Glance" },
  {
    type: "paragraph",
    text: "Convay is a video conferencing and collaboration platform built for governments, enterprises, and institutions that need to keep control of their own data. Used in more than **45 countries**, it covers a meeting from start to finish, from scheduling and live video to AI transcription, file storage, and follow-up, all inside a system that can **run entirely on a client's own servers**.",
  },
  {
    type: "metricGrid",
    items: [
      { value: "45+", label: "Countries" },
      { value: "200,000", label: "Government platform capacity" },
      { value: "10,000", label: "Participants supported in a single meeting" },
    ],
  },
  // Phase 3 length budget: this chapter repeats on every Convay case, so
  // after the opening paragraph and the three numbers, the rest sits in a
  // closed disclosure. Nothing is cut; it is one click away.
  {
    type: "details",
    summary: "Who relies on Convay, its capabilities and press coverage",
    blocks: [
      {
        type: "paragraph",
        text: "Convay is the platform behind **Bangladesh's national government communications system**, built for the Bangladesh Computer Council and designed to scale to **200,000 users**. In 2025, it was also **selected over Zoom and Google Meet** as the official platform for the Sustainable Infrastructure Development Symposium (SIDSSA), a G20-linked summit hosted in South Africa, supporting government officials and policymakers from **27 countries**.",
      },
      {
        type: "paragraph",
        text: "At **Evercare Hospital Dhaka**, a 425-bed hospital and the **first in Bangladesh to receive JCI accreditation**, Convay has run telehealth appointments and meetings for **two and a half years**, according to the hospital's head of IT.",
      },
      { type: "heading", level: 4, text: "Capabilities" },
      {
        type: "list",
        items: [
          "**Enterprise-grade security**: sovereign deployment on cloud, on-premises, or hybrid, with data kept in the client's jurisdiction",
          "**High-quality video and audio**: built for low-bandwidth and unstable network conditions",
          "**AI transcription and meeting summaries**: around 93% accuracy, in five languages: English, Bangla, French, Portuguese, Spanish",
          "**Real-time whiteboard, chat, and screen sharing**: with cloud storage for meeting files and chat logs",
          "**Cross-platform**: web, iOS, and Android, with 10,000+ mobile installs",
        ],
      },
      { type: "heading", level: 4, text: "References" },
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
        text: "SIDSSA 2025 Official Post",
        href: "https://www.linkedin.com/posts/infrastructuresa_sidssa25-infrastructuresa-infrastructuredevelopment-activity-7330574469981270019-ujhF",
      },
      { type: "linkCard", text: "Explore Convay", href: "https://www.convay.com/" },
    ],
  },
];

const img = (id: string, width: number, height: number, alt = "") => ({
  src: framerAsset(id),
  width,
  height,
  alt,
});

// Project cards play the no-text cut of each project's trailer (see
// content/trailers.ts): 960 x 720 H.264 films in public/loops/, each
// with a same-named .webp poster frame.
const cardLoop = (slug: string, alt: string) => ({
  src: `/loops/${slug}-card.mp4`,
  poster: `/loops/${slug}-card.webp`,
  width: 960,
  height: 720,
  alt,
});

// ---------------------------------------------------------------------
// 1. Convay Mobile App Revamp
// ---------------------------------------------------------------------
// Rebuilt in November 2026 around the 2026 redesign concept, then cut to
// ten chapters (the "In short" panel already carries the hook, so there
// is no separate short-version chapter). Order: Convay at a Glance, the
// shipped 2023-24 work with its evidence tags, then the concept. Nothing
// from the shipped work is restated as part of the concept. Screens are
// 2x exports from the "Convay Mobile App Redesign" Figma file in
// public/convay-mobile/. The old screens survive only in the
// before/after image, the iteration strip and one collapsed section.
// Copy record: Case Studies/Convay Mobile App Revamp/
// 10_Redesign_2026_Case_Study.md.
const cm = (name: string, alt: string) => ({
  src: `/convay-mobile/${name}.png`,
  width: 824,
  height: 1830,
  alt,
});

const convayMobileAppRevampBody: CaseStudyBlock[] = [
  ...convayAtAGlance,

  { type: "heading", level: 3, text: "What shipped in 2023–24" },
  {
    type: "paragraph",
    text: "The mobile app had fallen behind the web. The way into a meeting was unclear, even a quick call needed an account, and transcripts and summaries were missing. I audited the app, redesigned onboarding and the meeting flows, and brought transcripts, summaries and recordings to mobile, working with the product team and engineers on Android and iOS.",
  },
  {
    type: "beforeAfterFlow",
    oldLabel: "Old flow: 5 steps",
    oldSteps: ["Open app", "Sign up", "Verify email", "Create profile", "Join meeting"],
    newLabel: "Shipped flow: 3 steps",
    newSteps: [
      "Join with Meeting ID or deep link",
      "Optional password",
      "Camera and mic check, then join",
    ],
  },
  {
    type: "list",
    items: [
      "[[**Meeting entry dropped from five taps to three**|taps]].",
      "[[**Mobile reached feature parity with web**|parity]]: transcription, summaries and recordings.",
      "[[Every task in the internal prototype walkthroughs was completed|tasks]].",
      "[[**Five of six reviewers** called the redesign \"more intuitive\"|reviewers]] at handoff.",
    ],
  },
  {
    type: "details",
    summary: "The original 2023–24 screens and process",
    blocks: [
      {
        type: "paragraph",
        text: "We started from pain points carried over from earlier versions, reviewed mobile analytics, and mapped where people got stuck with product managers and support teams. The user base ranged from government officials to institutional teams, many on Android.",
      },
      {
        type: "painPointList",
        items: [
          { label: "Clunky navigation", note: "Unclear meeting-entry flows made a simple join feel effortful." },
          { label: "Required logins", note: "Even a quick meeting required creating an account first." },
          { label: "Limited access to summaries and recordings", note: "Features already live on web were missing from mobile entirely." },
        ],
      },
      {
        type: "quote",
        text: "It shouldn't take more than two taps to join a meeting.",
        attribution: "PM insight during early planning",
      },
      {
        type: "quote",
        text: "This feels way lighter. I'd actually use this version on mobile.",
        attribution: "Developer during internal testing",
      },
      {
        type: "imageRow",
        enlargeable: true,
        images: [
          img("BkobjFZLUDbvcCYWoKrln3tuPI.png", 750, 1624, "Shipped home screen, with quick actions and today's meeting list."),
          img("6d5XSeXWX2BjpEwNvU2tHBAHs.png", 750, 2220, "Shipped Meeting Details screen, with the title, time, link, ID, password, participants, files, recordings and transcription."),
          img("sqYPt61SyV3toXmoOXJPwh12wco.png", 750, 1624, "Shipped transcript screen, with speaker-labelled messages and a Generate Summary button."),
          img("1SvqYcMGSkhXAPyYPkPGMkOZrHY.png", 750, 1624, "Shipped summary screen, with an audio player and highlighted lines."),
        ],
      },
      {
        type: "paragraph",
        variant: "caption",
        text: "Four of the screens I designed in 2023–24, handed off with mobile components, spacing rules and interaction specs.",
      },
    ],
  },

  { type: "heading", level: 3, text: "Why redesign it" },
  {
    type: "paragraph",
    text: "The 2024 app fixed access, but it still behaves like a launcher: three big buttons and a list of days, and nothing that says what is next. The live product is not mine to redraw, so in November 2026 I redesigned it as a self-initiated concept, to show how I would solve the same problems today. **Everything from here on is that concept. It has not shipped or been tested with users.**",
  },
  {
    type: "image",
    src: "/convay-mobile/before-after.png",
    width: 3200,
    height: 1932,
    enlargeable: true,
    alt: "Two phones side by side. Left, the home screen as it shipped in 2023-24: three large purple buttons for Start Meeting, Schedule and Join Meeting above a list of meetings by day. Right, the 2026 concept: a Today screen with an Up next card for the weekly policy briefing, a Join meeting button, and an agenda with a red Now line.",
    caption: "The home screen as it shipped, and the same screen redesigned in 2026.",
  },
  {
    type: "list",
    items: [
      "**From a launcher to an answer.** Home says what is next and how to join it.",
      "**From AI as a feature to AI in the flow.** A recap appears where the meeting ended, and says it was written by AI.",
      "**From a language setting to language everywhere.** Captions, transcripts, recaps and chat handle English and Bangla side by side.",
      "**From a sign-up wall to two doors.** Guests join with a link. Staff sign in through their organisation.",
    ],
  },

  { type: "heading", level: 3, text: "Getting in: two doors, no wall" },
  {
    type: "paragraph",
    text: "Guests get a link and want to be in the call in seconds. Staff at a ministry or a hospital already have a work account. The first screen offers both, and neither path asks anyone to create a password.",
  },
  {
    type: "beforeAfterFlow",
    oldLabel: "Staff account setup in 2024: 3 screens",
    oldSteps: ["Create account", "Verify email", "Update profile"],
    newLabel: "Sign-in in 2026: 1 screen",
    newSteps: ["Type your work email", "Continue on your organisation's own login page"],
  },
  {
    type: "screenPlayer",
    label: "Getting in",
    screens: [
      {
        tab: "Welcome",
        ...cm("welcome", "Welcome screen: a product glimpse of four video tiles with a live Bangla caption, the line 'Meetings your organisation controls', and two buttons, Join a meeting and Sign in."),
        line: "Two doors. The picture is the product itself: a call with live Bangla captions.",
      },
      {
        tab: "Sign in",
        ...cm("signin", "Sign in screen: a work email field, a green note saying the organisation uses single sign-on, a Continue with SSO button, and an option to get a one-time code."),
        line: "A work email finds the organisation and hands off to its single sign-on.",
      },
      {
        tab: "Join as guest",
        ...cm("join", "Join a meeting as a guest: a suggestion to use a link found on the clipboard, then fields for meeting ID, name and an optional password."),
        line: "Guests give an ID and a name. A copied invite link is offered first.",
      },
      {
        tab: "Pre-join",
        ...cm("prejoin", "Pre-join check: a large self-view with the camera off, mic and camera toggles, an audio output picker, connection strength, and a waiting-room note."),
        line: "Mic, camera, speaker and connection, checked before anyone sees you.",
      },
      {
        tab: "Waiting room",
        ...cm("state-waiting", "Waiting room: the host's initials in a soft pulse, the line 'Waiting for the host to let you in', how long you have waited, and your mic and camera state."),
        line: "Who you are waiting for, for how long, and how you will arrive.",
      },
    ],
  },

  { type: "heading", level: 3, text: "Today: one clear next action" },
  {
    type: "annotated",
    label: "Close-up · the Today screen",
    device: "phone",
    image: cm("today", "The Today screen: an Up next card for the weekly policy briefing starting in 8 minutes, with a Join meeting button and an Audio only option, and an agenda below with an ended meeting, a live one, a red Now line and two later meetings."),
    notes: [
      { x: 0.5, y: 0.2, text: "Up next: what is next, and how to join it." },
      { x: 0.4, y: 0.322, text: "Clashes are flagged before you join, not after." },
      { x: 0.86, y: 0.28, text: "Encrypted is stated, because this audience asks." },
      { x: 0.33, y: 0.512, text: "An ended meeting links straight to its AI recap." },
      { x: 0.5, y: 0.617, text: "The Now line puts the day in order." },
      { x: 0.4, y: 0.865, text: "Meeting ID or link, always within thumb reach." },
    ],
  },
  {
    type: "image",
    src: "/convay-mobile/iterations.png",
    width: 3200,
    height: 1698,
    enlargeable: true,
    alt: "Five versions of the Today screen in a row. Round 1 uses a purple gradient card. Round 2 uses warm paper and black ink. Round 3 uses Convay's indigo with a day ribbon at the top. Round 4 packs a device check into the Up next card. The final version is the calm Today screen with a Now line in the agenda.",
    caption: "Five rounds of one screen. The final version is the one with less in it.",
  },
  {
    type: "paragraph",
    text: "The first round looked like every AI-made app, and the second stopped looking like Convay. Then I stress-tested my own design and fixed every finding inside the Up next card, which made it worse. The final version moved the device check to its own step and the timeline into the agenda. Most of the work was taking things out.",
  },

  { type: "heading", level: 3, text: "Captions people can check" },
  {
    type: "paragraph",
    text: "Convay already transcribes in five languages, including Bangla. The concept brings that into the call: English speech appears as a Bangla caption, with the original line underneath, so nobody has to trust the translation blindly.",
  },
  {
    type: "screenPlayer",
    label: "Two languages, one meeting",
    screens: [
      {
        tab: "In meeting",
        ...cm("meeting", "In-meeting screen on a dark stage: six video tiles with the host speaking, a live caption in Bangla with the English original below it, and controls for mic, camera, sharing, captions, more and leave."),
        line: "Live captions translated into Bangla, with the original line underneath.",
      },
      {
        tab: "Transcript",
        ...cm("transcript", "Transcript screen: an audio player with a waveform, speaker filters, and lines from four speakers, one in Bangla with an English translation below it, highlighted as playing."),
        line: "People switch languages mid-sentence. The transcript keeps both.",
      },
      {
        tab: "Chat",
        ...cm("chat", "Chat screen: a live meeting's chat pinned on top, then conversations with colleagues and groups, one message in Bangla."),
        line: "The live meeting's chat is pinned on top. Bangla and English sit side by side.",
      },
    ],
  },

  { type: "heading", level: 3, text: "AI that admits it is AI" },
  {
    type: "paragraph",
    text: "My master's thesis found that trust in a conversational AI builds slowly and can vanish in a single moment. A government recap with a wrong name or number is that moment. So every recap says it was written by AI, and asks people to check names and numbers before they share it.",
  },
  {
    type: "screenPlayer",
    label: "From the end of a call to a shared recap",
    screens: [
      {
        tab: "Generating",
        ...cm("state-generating", "Recap generating: a progress card with a gradient bar, steps for transcript, summary, action items and the Bangla version, an estimate of about one minute, and a note that you can leave the screen."),
        line: "Steps and a time estimate instead of a spinner.",
      },
      {
        tab: "AI recap",
        ...cm("recap", "AI recap: an English and Bangla switch, a purple note saying it was written by Convay AI and to check names and numbers, a summary, one decision and three action items with owners."),
        line: "A summary, the decision and action items with owners, under a clear AI note.",
      },
      {
        tab: "In Bangla",
        ...cm("recap-bangla", "The same AI recap with the Bangla tab selected: the summary, decision and action items in Bangla, while the interface labels stay in English."),
        line: "One tap for Bangla. The content changes, the interface stays put.",
      },
      {
        tab: "Export",
        ...cm("state-export", "Export sheet over the recap: PDF, Word and plain text options, each with when to use it, a language choice, and a switch to include the full transcript."),
        line: "Format, language and transcript in one sheet.",
      },
    ],
  },
  {
    type: "linkCard",
    text: "Read the research behind this: the Lumi case study",
    href: "/research/lumi",
  },

  { type: "heading", level: 3, text: "The rest of the day" },
  {
    type: "screenPlayer",
    label: "Planning, finding, and when things go wrong",
    screens: [
      {
        tab: "Meeting details",
        ...cm("details", "Meeting details: time, repeat, link and security on one card, the people invited with their replies, and a link to last week's AI recap with four open action items."),
        line: "Everything before you join, plus last week's recap and its open action items.",
      },
      {
        tab: "Calendar",
        ...cm("calendar", "Calendar day view: meetings as blocks on an hour grid, two overlapping meetings side by side at 10:30, a red Now line and a warning that two meetings overlap."),
        line: "Clashing meetings sit side by side, so the warning on Today makes sense.",
      },
      {
        tab: "Library",
        ...cm("library", "Library: recordings with live, processing and ready states, a progress bar with a time estimate, and older recordings from earlier in the week."),
        line: "Recordings with honest states: live, processing with an estimate, and ready.",
      },
      {
        tab: "Schedule",
        ...cm("schedule", "Schedule meeting: title, date, start time, duration chips, invited people and groups, and switches for waiting room, recording with AI recap, and live captions, each with a line explaining the effect."),
        line: "Each switch says what attendees will experience.",
      },
      {
        tab: "Wrong ID",
        ...cm("state-wrong-id", "Join screen with an error under the meeting ID field: no meeting found with this ID, check the last digits, or paste the invite link."),
        line: "An error that names the likely mistake and offers the fix.",
      },
      {
        tab: "Empty day",
        ...cm("state-empty", "Today with no meetings: a calendar icon, the line No meetings today, the next meeting on Wednesday, and buttons to schedule or start a meeting now."),
        line: "An empty day still points to the next meeting.",
      },
    ],
  },

  { type: "heading", level: 3, text: "One system, Light and Dark, measured" },
  {
    type: "image",
    src: "/convay-mobile/design-system.png",
    width: 3200,
    height: 1360,
    enlargeable: true,
    alt: "The design system: eight colour tokens each shown with a Light and a Dark value, Convay's AI gradient, a type specimen in Geist and Noto Sans Bengali, and components including buttons, tags, an agenda row, the join bar, device toggles, switches and the bottom navigation.",
  },
  {
    type: "paragraph",
    text: "Every colour is a token with a Light and a Dark value, and every component is bound to them. Bangla gets its own text style with a taller line height, because it needs the room.",
  },
  {
    type: "variantComparison",
    label: "Same screen, two modes, nothing redrawn",
    variants: [
      { ...cm("today", "The Today screen in Light mode."), caption: "Light" },
      { ...cm("today-dark", "The same Today screen in Dark mode, on Convay's near-black, with a lighter indigo for buttons."), caption: "Dark" },
    ],
  },
  {
    type: "paragraph",
    text: "The coral that marks time pressure looked fine and failed: 3.5:1 as text, under the 4.5:1 it needs. Text now uses a darker coral at 5.6:1. Touch targets are 48 dp, the Android minimum, and colour is never the only signal.",
  },

  { type: "heading", level: 3, text: "What this does not prove yet" },
  {
    type: "paragraph",
    text: "This is a concept, and the shipped results above belong to the 2023–24 work, not to these screens. I would test two assumptions first, with five Convay users and the prototype. Does the AI note make people check a recap before sharing it? And is signing in with a work email easier than the account staff have today?",
  },
  {
    type: "paragraph",
    text: "I used Claude as an AI pair designer to explore directions and produce the Figma file. I chose the direction, rejected the rounds that did not work, and own the decisions on this page.",
  },
  {
    type: "linkCard",
    text: "Play the prototype",
    href: "https://www.figma.com/proto/uM7wA3VlG9XJolwSjOQR18/Convay-Mobile-App-Redesign?node-id=19-916&viewport=431%2C140%2C0.2&t=h1cVRnCwXHHolL77-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=19%3A916&page-id=6%3A20",
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
// Rebuilt in November 2026 around the 2026 redesign concept, on the same
// pattern as the Convay Mobile App Revamp: Convay at a Glance first, then
// the shipped 2023-24 work with its evidence tags, then the concept.
// Nothing from the shipped work is restated as part of the concept, and
// the concept's Light-first choice is stated openly against the shipped
// test that chose dark. Desktop screens are 2x exports (2880 x 1800) and
// phone screens 2x exports (824 x 1830) from the "Convay AI for Physical
// Meetings" Figma file, in public/convay-ai/. The old screens survive
// only in the before/after image, the iteration board and one collapsed
// section. Copy record: Case Studies/Convay AI for Physical Meetings/
// 10_Redesign_2026_Case_Study.md.
const ca = (name: string, alt: string) => ({
  src: `/convay-ai/${name}.png`,
  width: 2880,
  height: 1800,
  alt,
});
const caPhone = (name: string, alt: string) => ({
  src: `/convay-ai/${name}.png`,
  width: 824,
  height: 1830,
  alt,
});

const convayAiBody: CaseStudyBlock[] = [
  ...convayAtAGlance,

  { type: "heading", level: 3, text: "What shipped in 2023–24" },
  {
    type: "paragraph",
    text: "Teams at government offices and in internal syncs met face to face, and nobody had a record afterwards. Convay already transcribed online calls. I designed the flow that brought the same to a physical room: set up a meeting, record it, review the transcript, summarise it with AI and export it, with Bangla transcription from the start. I worked with product managers and engineers, built the variants and ran the internal tests.",
  },
  {
    type: "list",
    items: [
      "[[**82% of internal testers preferred the dark meeting panel**|dark-panel]] over the light one, so the shipped panel went dark to match the rest of Convay.",
      "[[A bulk rename cut **speaker editing time by an estimated 30–40%**|rename-time]].",
      "[[**93% transcription accuracy** in quiet rooms|accuracy]], from internal testing rather than a field study.",
      "[[Teams reported **30–40% less time** spent writing meeting notes|notes-time]].",
    ],
  },
  {
    type: "details",
    summary: "The original 2023–24 screens and the panel test",
    blocks: [
      {
        type: "variantComparison",
        label: "The A/B test on the meeting panel",
        variants: [
          {
            ...img("1Xrqe0NuG8d4DN8vwSWL99pzRPk.png", 2048, 1280, "Shipped meeting panel, dark: a large microphone, a timer and one line of live transcript."),
            caption: "Dark: matched Convay's main theme. 82% of internal testers chose it.",
          },
          {
            ...img("uouzaoVXpICMh8XHJiS4I9DMEsg.png", 2048, 1280, "The light variant of the same panel that was tested against it."),
            caption: "Light: easier to see, but it did not match the rest of the platform at the time.",
          },
        ],
      },
      {
        type: "imageRow",
        enlargeable: true,
        images: [
          img("8MC8dnNQxy5ID9JHklgxyokoRE0.png", 2048, 1280, "Shipped meeting dashboard with recent recordings and buttons to start a meeting or upload a recording."),
          img("veV5cHUbDznR85kSt8TtYr2dSg.png", 2048, 1280, "Shipped transcript screen, where the transcript can be read and edited."),
          img("wvjdbZNqmnqe9WrrgfaDvgLenAk.png", 2048, 1280, "Shipped meeting summary screen."),
        ],
      },
      {
        type: "list",
        items: [
          "Testing removed the \"Mute\" text label, moved the AI summary button, and smoothed the steps from transcript to summary to export.",
          "Some people hesitated to press \"Summarize with AI\". A clear label and an optional, prominent button fixed most of that.",
        ],
      },
      {
        type: "quote",
        text: "Even in busy rooms, the transcript quality held up well.",
        attribution: "Internal tester",
      },
    ],
  },

  { type: "heading", level: 3, text: "Why redesign it" },
  {
    type: "paragraph",
    text: "The shipped panel recorded well, but during the meeting it showed a microphone and one line of text. Nobody could see who was speaking, mark what mattered or see a decision take shape, and the AI only appeared after everyone had left. The live product is not mine to redraw, so in November 2026 I redesigned it as a self-initiated concept. **Everything from here on is that concept. It has not shipped or been tested with users.**",
  },
  {
    type: "image",
    src: "/convay-ai/before-after.png",
    width: 3200,
    height: 1300,
    enlargeable: true,
    alt: "Two browser windows side by side. Left, the shipped 2023-24 meeting panel: a dark screen with a large microphone button, a timer at 12:45 and one line of transcript. Right, the 2026 concept at the same 12:45: a light screen with the recording strip, the people in the room, a full transcript with a Bangla line and its translation, and live notes on the right.",
    caption: "The same meeting at 12:45, as it shipped and as redesigned.",
  },
  {
    type: "list",
    items: [
      "**From a microphone to a meeting.** The screen shows who spoke, what was said and how the room sounds.",
      "**From AI afterwards to AI alongside.** Notes build while people talk, and say they were drafted by AI.",
      "**From remembering to marking.** One key marks the moment that matters, and it lands in the notes.",
      "**From permission assumed to permission shown.** The room is told it is recorded before anything is saved.",
    ],
  },

  { type: "heading", level: 3, text: "Before anyone speaks" },
  {
    type: "paragraph",
    text: "In a physical room, recording affects people who never opened the app. So setup asks two things before the red dot appears: did you tell the room, and does the microphone hear the far end of the table? The notice shows on the room screen in English and Bangla, and recording waits until the host confirms.",
  },
  {
    type: "screenPlayer",
    device: "desktop",
    label: "From the list to a ready room",
    screens: [
      {
        tab: "Meetings",
        ...ca("meetings", "On-site meetings: a Next on-site meeting card for the weekly release sync at 14:00 in Room 4B, buttons to upload a recording or start a meeting, and a table of recent meetings with statuses such as Notes ready, Name 2 speakers and Transcribing."),
        line: "What is next, and every past meeting with an honest status.",
      },
      {
        tab: "Set up the room",
        ...ca("setup", "Set up the room: meeting title, room, spoken languages set to English plus Bangla, the people in the room, and switches for live notes and the room screen. On the right, a dark preview of the recording notice in English and Bangla with a confirmation tick, and a microphone check that says room audio sounds good."),
        line: "Tell the room, test the mic, then record. Not the other way round.",
      },
      {
        tab: "First visit",
        ...ca("state-empty", "The meetings page on a first visit: a short empty state with Start a meeting and Upload recording, and three cards explaining how it works: tell the room, mark what matters, check then share."),
        line: "A first visit explains the three habits that make the notes good.",
      },
      {
        tab: "Upload",
        ...ca("upload", "Upload a recording dialog over the meetings page: a drop zone for audio or video files, a file uploading at 72 percent, and a meeting title field."),
        line: "A recording from a phone gets the same transcript and notes.",
      },
    ],
  },

  { type: "heading", level: 3, text: "In the meeting" },
  {
    type: "annotated",
    label: "Close-up · the live meeting",
    device: "desktop",
    image: ca("live", "The live meeting screen: a recording strip with 12:45 and room audio good, speaker chips for Imran, Sadia, Farhana and Speaker 4, a transcript with a Bangla line and its English translation, a marked line at 12:41, live notes with decisions, action items and marked moments, and controls for Pause, Mark this moment and End and transcribe."),
    notes: [
      { x: 0.09, y: 0.137, text: "Recording, the time, and how the room sounds, readable from across the table." },
      { x: 0.38, y: 0.208, text: "Who is speaking now. Unknown voices stay Speaker 4 until someone names them." },
      { x: 0.3, y: 0.75, text: "A Bangla line keeps the original, with an English translation under it." },
      { x: 0.034, y: 0.855, text: "A marked moment is flagged in the transcript and goes straight into the notes." },
      { x: 0.86, y: 0.17, text: "Live notes say they are drafted by AI, and that only you can see them." },
      { x: 0.545, y: 0.95, text: "Mark this moment is the main action, not End. M works from anywhere." },
    ],
  },
  {
    type: "image",
    src: "/convay-ai/iterations.png",
    width: 3200,
    height: 2582,
    enlargeable: true,
    alt: "Four versions of the live meeting screen in a grid. Round 1 is dark with a glowing waveform. Round 2 is the same layout in light. Round 3 is a reduced version after a self-review. The final version adds the Convay logo, indigo on Mark this moment and a quieter End button.",
    caption: "Four rounds of one screen.",
  },
  {
    type: "paragraph",
    text: "The first round was dark like the shipped panel and looked like any AI tool. Light worked better for a bright room and a TV. Then I reviewed my own panel as a critic and took out an Up next card, a talk-time chart and half the labels. The last round made it look like Convay again: the logo, the indigo, and one strong button.",
  },

  { type: "heading", level: 3, text: "When the room fights back" },
  {
    type: "paragraph",
    text: "Physical rooms have air conditioners, open doors and cables that get kicked. The shipped work found noise was the biggest risk to accuracy. The concept says so while there is still time to fix it, instead of in a poor transcript afterwards.",
  },
  {
    type: "screenPlayer",
    device: "desktop",
    label: "Two things that go wrong in real rooms",
    screens: [
      {
        tab: "Noisy room",
        ...ca("state-noisy", "Live meeting with a warning banner: the room is getting noisy, captions may miss words, move the conference speaker closer or close the door. The level meter is amber and the last line ends in an unclear marker."),
        line: "Noise is flagged while it can still be fixed. Unclear words are marked.",
      },
      {
        tab: "Mic lost",
        ...ca("state-mic", "Live meeting with a red banner: the microphone was disconnected, recording paused at 12:45, everything before that is saved, with buttons to use the laptop mic or reconnect. The pause button now says Resume."),
        line: "A lost microphone pauses safely and says what is already saved.",
      },
      {
        tab: "End",
        ...ca("end", "Confirmation dialog over the live meeting: End the meeting and transcribe, with three notes: recording stops, notes in about 3 minutes, and nothing is shared yet. Buttons: Keep recording and End and transcribe."),
        line: "Ending asks first, and promises nothing is shared yet.",
      },
    ],
  },

  { type: "heading", level: 3, text: "AI that shows its sources" },
  {
    type: "paragraph",
    text: "My master's thesis found that trust in a conversational AI builds slowly and can vanish in one moment. For meeting notes, that moment is a wrong decision sent to a regional office. So every point in the notes links to the second it came from, unnamed speakers are flagged before sharing, and the full transcript stays private unless the host adds it.",
  },
  {
    type: "screenPlayer",
    device: "desktop",
    label: "From the end of a meeting to shared notes",
    screens: [
      {
        tab: "Writing up",
        ...ca("processing", "Writing up your meeting: the Convay AI mark, about 2 minutes left, steps for recording saved, transcript cleaned up, telling voices apart at 64 percent, and drafting notes in English and Bangla. A note says one voice has no name yet, with a Name speakers button."),
        line: "Steps and a time estimate, and a useful job while you wait.",
      },
      {
        tab: "Notes",
        ...ca("notes", "Meeting notes: a note that they were drafted by Convay AI with an English and Bangla switch, a summary, two decisions and an open question each with a playable timestamp, three action items with owners and dates, and a Before you share checklist on the right."),
        line: "Every decision and action has a timestamp you can play.",
      },
      {
        tab: "Transcript",
        ...ca("transcript", "Review the transcript: a search box and speaker filters, a Bangla line being edited with a note that edits change the transcript only, talk time per speaker, marked moments, and an audio player whose waveform is coloured by speaker."),
        line: "Fix a line in place. The audio stays as recorded.",
      },
      {
        tab: "Name speakers",
        ...ca("rename", "Name the speakers dialog: each voice with a play button and a short quote, and Speaker 4 being renamed to Tanvir Rahman, with a note that Tanvir was mentioned at 09:31 and Convay suggests the name."),
        line: "Hear each voice, name it once, and every line updates.",
      },
      {
        tab: "Share",
        ...ca("share", "Share the notes dialog: send to the release team and regional offices, language set to both, switches for summary, links to moments and full transcript, which is off, and a warning that Speaker 4 is not named."),
        line: "The full transcript stays private unless you add it.",
      },
    ],
  },
  {
    type: "linkCard",
    text: "Read the research behind this: the Lumi case study",
    href: "/research/lumi",
  },

  { type: "heading", level: 3, text: "On the room screen, and in a pocket" },
  {
    type: "image",
    src: "/convay-ai/web-and-phone.png",
    width: 3200,
    height: 1800,
    enlargeable: true,
    alt: "The live meeting on a desktop window, with the same meeting on a phone in front of it: the recording time, room audio, speakers, the transcript with the marked line, and a bottom sheet with live notes and a Mark this moment button.",
  },
  {
    type: "paragraph",
    text: "The host is not always at the laptop. On a phone, the transcript fills the screen and the live notes sit in a sheet under the thumb, next to the same Mark this moment button.",
  },
  {
    type: "screenPlayer",
    label: "The same flow on a phone",
    screens: [
      {
        tab: "Live",
        ...caPhone("m-live", "Phone live meeting: recording at 12:45, room audio good, speaker chips, three transcript lines including Bangla and a marked line, and a sheet with live note counts and Pause, Mark this moment and End."),
        line: "The transcript on top, the one button that matters under the thumb.",
      },
      {
        tab: "Notes in Bangla",
        ...caPhone("m-notes", "Phone meeting notes with the Bangla tab selected: the summary, decisions with timestamps and action items in Bangla, and a Share notes button."),
        line: "One tap for Bangla. The notes change, the interface stays put.",
      },
      {
        tab: "Meetings",
        ...caPhone("m-meetings", "Phone list of on-site meetings: a card for the weekly release sync with Set up and record, recent meetings with statuses, and a floating Start a meeting button."),
        line: "Start or check a meeting from the corridor.",
      },
    ],
  },

  { type: "heading", level: 3, text: "One system, Light first" },
  {
    type: "image",
    src: "/convay-ai/design-system.png",
    width: 3200,
    height: 1060,
    enlargeable: true,
    alt: "The design system: colour tokens each with a Light and a Dark value, four speaker colours, the Convay AI mark, a type specimen in Geist, Geist Mono and Noto Sans Bengali, and components including the recording strip, speaker chips, a marked transcript line, the controls and the live notes header.",
  },
  {
    type: "paragraph",
    text: "This is the one place the concept goes against a tested result. In 2024, 82% of internal testers chose the dark panel, mostly because the rest of Convay was dark. A meeting room is bright and the panel is often on a TV, so the concept makes Light the default and keeps Dark one switch away. Every colour is a token with both values, so nothing is redrawn. It is the first assumption I would test.",
  },
  {
    type: "variantComparison",
    label: "Same screen, two modes, nothing redrawn",
    variants: [
      { ...ca("live", "The live meeting in Light mode."), caption: "Light, the default" },
      { ...ca("dark-live", "The same live meeting in Dark mode, on Convay's near-black, with a lighter indigo for the main button."), caption: "Dark, one switch away" },
    ],
  },
  {
    type: "paragraph",
    text: "The AI has its own mark: Convay's petals in a square of the brand indigo, not a sparkle in a gradient. Speakers get four colours that pass contrast as text, and colour is never the only signal, because each line also carries a name.",
  },

  { type: "heading", level: 3, text: "What this does not prove yet" },
  {
    type: "paragraph",
    text: "This is a concept, and the shipped results above belong to the 2023–24 work, not to these screens. I would test three assumptions first, with five Convay hosts in a real meeting room. Does Light hold up on a room TV against the dark panel people preferred in 2024? Do timestamps make hosts check the notes before sharing? And does anyone press Mark this moment when they are busy talking?",
  },
  {
    type: "paragraph",
    text: "I used Claude as an AI pair designer to explore directions and produce the Figma file. I chose the direction, rejected the rounds that did not work, and own the decisions on this page.",
  },
  {
    type: "linkCard",
    text: "Play the prototype",
    href: "https://www.figma.com/proto/RPfCnLJHXKYq2cp5AhBmOh/Convay-AI-for-Physical-Meetings?node-id=6-64&starting-point-node-id=6%3A64&scaling=scale-down&content-scaling=fixed&page-id=4%3A3",
  },
  {
    type: "quote",
    text: "How can this reduce friction and make someone's job easier, even when they're not behind a screen?",
    size: "large",
  },
];

// ---------------------------------------------------------------------
// 3. Convay Design System
// ---------------------------------------------------------------------
// Convay Design System rebuild (implementation package: CASE_STUDY_
// FINAL.md, IMPLEMENTATION_SPEC.md, VISUAL_LAYOUT_SPEC.md, ASSET_
// MANIFEST.md, MOTION_SPEC.md). Copy below is exact, migrated verbatim
// from CASE_STUDY_FINAL.md -- not rewritten, shortened, or reworded.
// Structure follows IMPLEMENTATION_SPEC.md's section order exactly:
// Hero (below) -> 01 Convay at a Glance (shared, unchanged) -> 02 The
// Problem -> 03 Approach -> 04 Foundations -> 05 Styles & Patterns ->
// 06 From Tokens to Components -> 07 Outcome & Impact -> 08 Reflection.
//
// Hero image grid: VISUAL_LAYOUT_SPEC asks for an asymmetric editorial
// grid ("two larger images... three smaller... grid-styles panel as a
// small closing tile") rather than one uniform row, but also says exact
// arrangement can flex to match how the existing ImageRow component
// actually behaves (fixed-height, auto-width tiles per row). Mixing all
// 3 "smaller" images (a wide banner, a landscape panel, and a tall
// narrow panel) in one row produced extremely lopsided tile widths in
// practice, not the deliberate variety the spec asks for. Grouped by
// compatible aspect ratio instead, in 3 rows of 2: the color pair
// (both tall portrait, the featured moment) first, then the two
// landscape-ish panels (spacing + stroke width), then the two narrow
// portrait panels (text styles + grid styles) as the quieter close --
// same intent (color pair featured, grid panel ends the grid on a
// small, quiet note, not a spreadsheet-uniform 6-up), reached through
// the grouping that actually renders well with the existing component.
const convayDesignSystemBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [img("Pz3gr4au6hAzTaXAeWRxckpYxW4.png", 839, 1067), img("RFIwMbzOBq1i3CiHl7feTRCmbc.png", 839, 1063)],
  },
  {
    type: "imageRow",
    images: [img("SR7Ty4Rtj9VnaJoe9zZ7wA2yFJI.png", 709, 561), img("wM8AKcML8xyCnuWF75Zo6IkA18.png", 647, 245)],
  },
  {
    type: "imageRow",
    images: [img("l9VJURbZM2vInRtmkGKwhfNrP0.png", 222, 904), img("PCl7JbO66ST97AOthwGOw9zmTs.png", 177, 302)],
  },
  ...convayAtAGlance,

  { type: "heading", level: 3, text: "The Problem" },
  {
    type: "paragraph",
    text: "When I joined Convay, the product already had a full set of features live: scheduling, live video, transcription, file storage, chat. But each one had been designed on its own, without shared styles or reusable components. Buttons looked different depending on which feature they were in. Spacing was inconsistent from screen to screen. Colors were picked case by case instead of pulled from a shared palette.",
  },
  {
    type: "paragraph",
    text: "This wasn't only a visual problem. Every new feature meant redesigning basic elements from scratch, and every small inconsistency made the product harder for developers to build and harder for users to trust. As Convay kept adding features and expanding into new markets, that lack of a shared foundation was only going to slow the team down more.",
  },

  { type: "heading", level: 3, text: "Approach" },
  {
    type: "paragraph",
    text: "I started by auditing Convay's existing interface, screen by screen: cataloging the colors, spacing values, corner radii, and type styles already in use across every feature. The audit turned an abstract problem into a concrete one. Elements that should have matched didn't, and there was no shared reference to check anything against.",
  },
  {
    type: "paragraph",
    text: "Rather than starting with components, I built the system bottom-up: global variables first, then reusable styles, then components on top of both. Getting the order right mattered. Variables like color and spacing needed to be settled before anything was built on top of them, since every component would inherit from them, and getting that sequence wrong would have meant reworking components every time a foundational value changed.",
  },
  {
    type: "paragraph",
    text: "I worked closely with the product team, who set direction on priorities, and with developers, who needed the system to map cleanly onto how they'd actually implement it in code. Variable names, states, and structure were shaped as much by what was implementable as by what looked right in Figma.",
  },

  { type: "heading", level: 3, text: "Foundations" },
  {
    type: "paragraph",
    text: "I started with the smallest, most foundational decisions: the variables everything else would be built from. Centralizing these meant a single update to a variable could ripple across the entire platform, instead of requiring a manual pass through every component that used it.",
  },
  { type: "heading", level: 4, text: "Color" },
  {
    type: "paragraph",
    text: "I defined a palette of brand and content colors, each with light and dark mode variants. Every color was assigned a specific role, primary actions, secondary actions, status, content, rather than existing as a generic swatch, so a designer or developer reaches for the right color by what it means, not by picking the closest match visually. Building color as roles rather than one-off values also meant light and dark themes could both be supported without redesigning each screen twice, useful for anyone working in a bright office, a dark room, or anywhere in between.",
  },
  // MOTION_SPEC.md's Motion 1 (a light/dark crossfade toggle) was built
  // here, then pulled per Aseer's review: the toggle's premise, and the
  // approved package's own caption/alt text for these two images
  // ("the same interface... not redesigned twice"), assumed both
  // images show one UI with only colors swapped. Per Aseer, that's not
  // accurate -- the light-mode image is a reference table listing both
  // light and dark values together, while the dark-mode image shows a
  // different, broader set of named variables (brand, button, primary,
  // secondary, accent, radio button, etc.) with their values. Reverted
  // to a static side-by-side pair (VISUAL_LAYOUT_SPEC.md's original
  // baseline for this subsection). Also switched from `imageRow` to
  // `variantComparison`: imageRow fixes every tile to a small shared
  // height (built for a row of preview thumbnails), which rendered
  // these two dense, text-heavy documentation panels small enough to
  // be illegible (confirmed from Aseer's own screenshot of the live
  // render). variantComparison renders each image up to 448px wide
  // with its own caption, matching VISUAL_LAYOUT_SPEC's "~48% of
  // container width" intent and giving each panel a caption that
  // actually describes what it shows, now that Aseer has confirmed
  // what's in each: the left image is a token reference table with
  // light and dark values listed side by side per token; the right
  // image is the full variable set grouped by role (brand, button
  // states, accent, radio button, etc.), not a themed re-render of the
  // same table.
  // Close-up with pins on the color table; notes condense Approach and
  // Color. The full variable set follows as its own image.
  {
    type: "annotated",
    label: "Close-up · the color variables in Figma",
    device: "panel",
    image: {
      ...img("Pz3gr4au6hAzTaXAeWRxckpYxW4.png", 839, 1067),
      alt: "Convay's color token reference table in Figma, listing each token's light-mode and dark-mode value side by side.",
    },
    notes: [
      { x: 0.69, y: 0.098, text: "Every color token holds a light value and a dark value, side by side." },
      { x: 0.17, y: 0.15, text: "Tokens are grouped by role, brand, content and accent, not by raw color." },
      { x: 0.43, y: 0.413, text: "Names were shaped with developers, so they map onto how the code implements them." },
      { x: 0.17, y: 0.565, text: "Spacing, stroke width and corner radius live in the same set of variables." },
    ],
  },
  {
    type: "image",
    ...img("RFIwMbzOBq1i3CiHl7feTRCmbc.png", 839, 1063),
    alt: "Convay's full set of color variables in Figma, grouped by role: brand, button states, accent, radio button, and more.",
    caption: "The full variable set, grouped by role rather than by raw color.",
  },
  { type: "heading", level: 4, text: "Spacing" },
  {
    type: "paragraph",
    text: "Padding and layout spacing were reduced to a defined scale, from None up through XXS, XS, S, M, L, XL, and beyond. Every component pulls from this scale rather than arbitrary pixel values, so spacing stays consistent whether it's inside a button or between two page sections.",
  },
  {
    type: "image",
    ...img("SR7Ty4Rtj9VnaJoe9zZ7wA2yFJI.png", 709, 561),
    alt: "Convay's spacing scale defined as Figma variables, from None to XXXL.",
    caption: "Convay's spacing scale in Figma, from None to XXXL.",
  },
  { type: "heading", level: 4, text: "Stroke width and corner radius" },
  {
    type: "paragraph",
    text: "Border and outline weights were standardized into four values, Thin, Thick, Thicker, and Thickest, so a divider and a focused input border use a deliberate weight instead of whatever felt right in the moment. Corner radius follows the same logic, from None for sharp-edged elements up to Circular for avatars and icon buttons, with defined steps in between. The radius applied to an element now signals its role: sharper corners read as structural, rounder corners read as interactive.",
  },
  // Same imageRow -> variantComparison fix as the Color pair above:
  // these are documentation panels, not gallery preview tiles, and
  // imageRow's fixed small tile height rendered them too small to
  // read. CASE_STUDY_FINAL.md's single shared caption for this pair
  // ("Stroke width and corner radius variables. Every border and
  // rounded corner in the product traces back to one of these
  // values.") is split across the two per-image captions
  // variantComparison requires, not reworded or added to.
  {
    type: "variantComparison",
    variants: [
      {
        ...img("wM8AKcML8xyCnuWF75Zo6IkA18.png", 647, 245),
        alt: "Convay's stroke width variables: Thin, Thick, Thicker, Thickest.",
        caption: "Stroke width variables: Thin, Thick, Thicker, Thickest.",
      },
      {
        ...img("eklLqLjKkIanx3IlAAvezPLZlk.png", 646, 377),
        alt: "Convay's corner radius variables, from None to Circular.",
        caption: "Corner radius variables, from None to Circular.",
      },
    ],
  },

  { type: "heading", level: 3, text: "Styles & Patterns" },
  {
    type: "paragraph",
    text: "With the variables in place, I built the styles that reference them: type, elevation, and layout grids. This is the layer between raw variables and finished components, the set of rules that determines how a screen actually looks and reads.",
  },
  { type: "heading", level: 4, text: "Type" },
  {
    type: "paragraph",
    text: "Titles, subtitles, body copy, and captions were each defined down to font size, weight, and line height, with separate specifications for web and mobile. That meant a designer or developer picking \"Body 2\" got the same result every time, regardless of which screen they were working on.",
  },
  {
    type: "image",
    ...img("l9VJURbZM2vInRtmkGKwhfNrP0.png", 222, 904),
    alt: "Convay's text style system, showing web and mobile type scales.",
    caption: "The web and mobile type scale, defined once and referenced everywhere.",
  },
  { type: "heading", level: 4, text: "Elevation" },
  {
    type: "paragraph",
    text: "Elevation is handled through a defined set of shadow styles, in both light and dark mode, ranging from a subtle lift (Shadow 02) to a pronounced one (Shadow 64). Modals and pop-up elements use the higher end of that range, so their prominence on screen is a deliberate choice rather than an accident of whatever shadow got applied.",
  },
  {
    type: "image",
    ...img("ldkkedVjXV5kjrW3geEq2xRrM.png", 195, 492),
    alt: "Convay's shadow and elevation styles, from Shadow 02 to Shadow 64, in light and dark mode.",
    caption: "Shadow styles in light and dark mode, used to signal elevation from subtle to prominent.",
  },
  { type: "heading", level: 4, text: "Grid" },
  {
    type: "paragraph",
    text: "Layout is governed by a defined set of grid styles, desktop, tablet, and mobile, including a 12-column dashboard grid with defined auto-column variants down to 6, 5, 3, and 2 columns for narrower layouts.",
  },
  {
    type: "image",
    ...img("PCl7JbO66ST97AOthwGOw9zmTs.png", 177, 302),
    alt: "Convay's named grid styles, from a 12-column desktop dashboard grid to 2-column narrow layouts.",
    caption: "Convay's named grid styles, from a 12-column desktop dashboard grid down to 2-column layouts for narrow viewports.",
  },

  { type: "heading", level: 3, text: "From Tokens to Components" },
  {
    type: "paragraph",
    text: "With the variables and styles in place, I built out Convay's core components on top of them: buttons, form fields, icons, badges, modals, so every piece of UI in the product traced back to the same foundation instead of being redrawn from scratch each time.",
  },
  {
    type: "paragraph",
    text: "Buttons carry states, primary, secondary, hover, active, pressed, built entirely from the shared color and spacing variables, so a button behaves and looks the same no matter which feature it appears in. Form fields (text inputs, dropdowns, checkboxes, radio buttons) follow the same type and spacing rules as the rest of the product, which matters more than it sounds: forms are where users spend the most deliberate attention, and inconsistency there creates friction fastest. Icons and badges use the same accent colors as the rest of the system, reserved for alerts and status rather than decoration. Modals and dialogs use the elevation styles defined earlier, so their prominence on screen follows the same logic as everywhere else, instead of being a one-off treatment.",
  },
  {
    type: "paragraph",
    text: "None of these components were designed in isolation. Each one is a direct application of the variables and styles defined earlier, which is what makes the system a system: change a variable, and every component built on it updates with it.",
  },
  // ASSET_MANIFEST.md's `convay-ds-component-evidence` (a tight crop of
  // the color-variables table's status-indicator chips) is not
  // implemented: it required cropping the existing color-light/dark
  // screenshots, and framerusercontent.com is not reachable from this
  // sandbox (confirmed via direct fetch, same limitation the package's
  // own README already flags for sourcing the other eight assets).
  // Guessing crop coordinates on an image I can't see isn't an option
  // (README/ASSET_MANIFEST: "do not invent... a replacement for any
  // asset"). This section already ships correctly as text-only per the
  // package's own fallback for exactly this situation -- see the final
  // implementation report for the flag.

  { type: "heading", level: 3, text: "Outcome & Impact" },
  {
    type: "paragraph",
    text: "[[The design system has been in active use since 2024|in-use]]. What follows reflects my experience working with it day to day and building on top of it as new features shipped, not a formal usage audit or a quantitative study.",
  },
  {
    type: "list",
    items: [
      "[[Every feature built on Convay since has drawn from this system|every-feature]] instead of starting its visual design from zero.",
      "Both light and dark themes are covered by the same components, not maintained as separate design efforts.",
      "Handoff to developers changed shape: instead of redlining every screen individually, [[developers could reference named variables and components directly in Figma|handoff]].",
      "The system is still what Convay's core platform and new features are built on today, across web and mobile.",
    ],
  },

  { type: "heading", level: 3, text: "Reflection" },
  {
    type: "paragraph",
    text: "Building Convay's design system from scratch was one of the most formative projects of my early career. It taught me that consistency isn't a limitation, it's what makes speed and trust possible at the same time.",
  },
  {
    type: "paragraph",
    text: "I learned to think beyond individual screens and design for systems that scale, and how much a well-documented decision, a corner radius, a shadow value, can reduce confusion for the people building on top of it.",
  },
  {
    type: "paragraph",
    text: "Most of all, this project reminded me that a design system isn't really about visuals. It's about building a foundation that lets a team move faster and build with more confidence, together.",
  },
  {
    type: "quote",
    text: "Good design systems don't just guide designs. They unlock better collaboration.",
    size: "large",
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
    text: "During the ideation phase of FitVibe, [[**a survey was conducted with 30 participants**|survey]] to gather **feedback on their fitness habits and preferences**. The survey helped inform the **decision-making process regarding which features to include** in the app.",
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
      "[[A System Usability Scale (SUS) score of **63.3** out of 100|sus]]: usable, but just below the commonly cited average of 68, with clear room to improve.",
      "Overall, valuable feedback obtained to enhance user experience and make improvements to the app's design.",
    ],
  },
  // Phase 0 correction (Aseer asked to keep the SUS analysis, fixed):
  // the original working printed Question 1 as 37 when (3x5)+(4x6)+(5x1)
  // is 44, summed the ten totals to 902.5 / 2.5 = 361 when they add to
  // 312, and skipped SUS's item conversion, which produced 75.21. Below,
  // the same recorded item totals are re-scored with the standard method
  // (Brooke, 1996): 63.3. The Question 1 mismatch is disclosed on the
  // page; using 44 instead of 37 gives 64.8, so the conclusion holds.
  { type: "heading", level: 3, text: "Research Insights: System Usability Scale (SUS)" },
  {
    type: "paragraph",
    text: "Twelve participants also completed the System Usability Scale (SUS), a standard ten-question questionnaire answered on a 1 to 5 scale. Odd-numbered questions are worded positively and even-numbered ones negatively, so each answer is converted before scoring: odd items count as the answer minus 1, even items as 5 minus the answer. Each person's converted answers add up to a 0 to 40 total, which is multiplied by 2.5 to give a score out of 100.",
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
    text: "*Step 1: Add up each question's answers across all 12 respondents.* Recorded totals, Questions 1 to 10: 37, 29, 43, 21, 38, 24, 34, 29, 36, 21.",
  },
  {
    type: "paragraph",
    text: "*Step 2: Convert the totals.* Positive questions (1, 3, 5, 7, 9) contribute their total minus 12, one point per participant: 25 + 31 + 26 + 22 + 24 = 128. Negative questions (2, 4, 6, 8, 10) contribute 60 minus their total: 31 + 39 + 36 + 31 + 39 = 176. Together: 304.",
  },
  {
    type: "paragraph",
    text: "*Step 3: Scale to 100 and average.* 304 x 2.5 = 760, and 760 / 12 participants = **63.3**.",
  },
  { type: "heading", level: 4, text: "SUS Result" },
  {
    type: "paragraph",
    text: "The overall SUS score is **63.3** out of 100. The commonly cited average across SUS studies is 68, so FitVibe sat just below average: people could use it, and the study shows where it fell short. That matches the findings above, where navigation was praised but progress and nutrition tracking caused trouble, and it is exactly the kind of score that tells a team what to fix next.",
  },
  {
    type: "callout",
    text: "A note on this calculation: an earlier version of this page reported 75.21. That figure came from adding raw answers without the SUS conversion step, so I re-scored the same recorded totals with the standard method. My notes also list Question 1's answers as five 3s, six 4s and one 5, which add up to 44 rather than the recorded 37; using 44 gives 64.8, so the conclusion is the same either way.",
  },
  { type: "heading", level: 3, text: "Takeaways" },
  {
    type: "paragraph",
    text: "Throughout the FitVibe project, I discovered the value of conducting user research and using an iterative design process. By considering the needs and preferences of users, I gained a better understanding of how to create designs that enhance user satisfaction and engagement. These experiences taught me how to create meaningful and user-centric digital experiences.",
  },
];

// ---------------------------------------------------------------------
// 5. TravelMate (v2 redesign, October 2026)
// ---------------------------------------------------------------------
// Full rewrite for the v2 redesign, shown on its own: version 1 (Jan to
// May 2025, a chat-first assistant) gets one sentence, and the rejected
// visual directions one more, so the page stays a short read about the
// current product. Chapters: the idea (reward going, not planning), the
// Now screen, the trust patterns carried over from the Lumi thesis
// research, the stamp reward, the rest of the trip, the design system
// and the measured contrast audit. Every screen is a real export from
// the TravelMate Figma file (public/travelmate/). The three wide
// figures (core loop, design system, contrast audit) are presentation
// graphics built from that same material. Tuki rides the chapter rail
// and plays the stamp moment (chapters.ts companion, imageRow tuki). Nothing here
// claims user testing: the concept has not been tested yet, and the
// last chapter says so. Copy is recorded in Case Studies/travelmate-ai/
// 10_V2_Case_Study.md.
const travelMateBody: CaseStudyBlock[] = [
  { type: "heading", level: 3, text: "The short version" },
  {
    type: "paragraph",
    text: "TravelMate began in 2025 as a chat-first travel assistant: ask a question, get a map. It worked, but it looked and behaved like every other AI travel concept. In October 2026 I rebuilt it from the product idea up.",
  },
  {
    type: "paragraph",
    text: "The new version has one idea at its centre. Most travel apps reward you for planning at home. **TravelMate rewards you for going.** Tuki, a small travel guide, suggests something good nearby and explains why. You go, you check in, and you earn an ink stamp, and that part of the city fills in on your map.",
  },
  {
    type: "paragraph",
    text: "This is a self-directed concept, not a shipped product, and nobody has tested it yet. I say that up front, because the rest of this page is about decisions, not results.",
  },
  {
    type: "metricGrid",
    items: [
      { value: "17", label: "Screens, in journey order" },
      { value: "40", label: "Linked prototype interactions" },
      { value: "2", label: "Modes, Light and Dark, from one set of tokens" },
      { value: "6", label: "Contrast failures found and fixed" },
    ],
  },

  { type: "heading", level: 3, text: "The idea: reward going, not planning" },
  {
    type: "paragraph",
    text: "I started from the moments that matter on a trip: lost, hungry, alone, unsure. In every one of them, the traveller is out in the city, not at home planning. So the product should reward being out there.",
  },
  { type: "callout", text: "Turn a trip into something you collect." },
  {
    type: "image",
    src: "/travelmate/core-loop.png",
    width: 3200,
    height: 1600,
    enlargeable: true,
    alt: "The core loop drawn as a transit line with five stations, each above a real screen: Tuki suggests, you go, check in, earn a stamp as the map fills in, and meet other travellers if you want.",
    caption: "The core loop, drawn the way the app draws a day. Every screen in the file belongs to one of these five stations.",
  },
  {
    type: "paragraph",
    text: "The game layer is travel-native on purpose. Early on I tried a game-style direction with a lesson path and chunky 3D buttons, borrowed from a language-learning app. It taught me the most, because copying the surface of a successful app is not the same as learning from it. So the rewards here come from travel itself. A stamp only comes from being somewhere real, checked within 40 metres of the place, and there are no streaks to protect, because a travel app that punishes a rest day has misunderstood travel.",
  },

  { type: "heading", level: 3, text: "Now: a map, one suggestion, and the reason" },
  {
    type: "paragraph",
    text: "Travellers think in places, so the home screen is a map. Areas you have explored are clear, and the rest is softly hatched, like a scratch map. Over it sits one suggestion, not a feed.",
  },
  {
    type: "annotated",
    label: "Close-up · the Now screen",
    device: "phone",
    image: {
      src: "/travelmate/now.png",
      width: 804,
      height: 1748,
      alt: "The Now screen: a map of Lisbon with explored areas around Baixa and Alfama, a Tuki pin on Santa Luzia, and a sheet saying 'Santa Luzia is calm until about 11:00', with a Why this? line, a stamp ticket and a Take me there button.",
    },
    notes: [
      { x: 0.74, y: 0.19, text: "Tuki points at a place on the map, not at a list." },
      { x: 0.66, y: 0.39, text: "Explored areas fill in. Alfama is 40% revealed." },
      { x: 0.92, y: 0.093, text: "Help is on every map screen." },
      {
        x: 0.3,
        y: 0.705,
        text: "Why this? sits under every suggestion, and admits it is based on typical crowd times, not live data.",
      },
      { x: 0.5, y: 0.77, text: "The ticket shows what you can earn before you go." },
    ],
  },
  {
    type: "paragraph",
    text: "One main action per screen, in ink black, and help one tap away. Everything else on the map is there to answer one question: is this worth walking to right now?",
  },

  { type: "heading", level: 3, text: "Designing for trust" },
  {
    type: "paragraph",
    text: "This is the chapter I care most about. My master's thesis studied how international students come to trust a conversational AI, and what breaks that trust. One finding carried straight into TravelMate: trust builds slowly and can vanish in a single moment. So Tuki explains itself every time, and handles its own mistakes in the open. Tuki has four moods, and the newest one, Sorry, exists for exactly that moment.",
  },
  {
    type: "screenPlayer",
    label: "Four trust moments",
    screens: [
      {
        tab: "Why this?",
        src: "/travelmate/why-this.png",
        width: 804,
        height: 1748,
        alt: "The Why this? sheet: what Tuki looked at (time of day, typical crowds, distance and taste, weather), a three-step confidence meter reading Fairly sure, and Yes or Not for me feedback buttons.",
        line: "The reason, the sources, and how sure Tuki is, in plain words.",
      },
      {
        tab: "When Tuki is wrong",
        src: "/travelmate/chat.png",
        width: 804,
        height: 1748,
        alt: "The chat: the traveller says Santa Luzia is packed with a tour group. Tuki, looking sorry, admits the mistake, explains what it changed, and suggests Miradouro da Graça instead.",
        line: "Tuki admits the mistake, says what it changed, and offers a better option.",
      },
      {
        tab: "A pick, with a reason",
        src: "/travelmate/route.png",
        width: 804,
        height: 1748,
        alt: "Route options: walk, Tram 28 and taxi compared on time, cost and crowds, with Tuki recommending the walk because the tram is usually full at this hour.",
        line: "Walk, tram or taxi. Tuki recommends one and says why.",
      },
      {
        tab: "Undo",
        src: "/travelmate/plan.png",
        width: 804,
        height: 1748,
        alt: "The Plan screen: the day drawn as a transit line, and a note from Tuki saying rain is likely after 17:00, so the tile museum moved to tomorrow, with an Undo link.",
        line: "When Tuki changes the plan because of rain, one tap undoes it.",
      },
    ],
  },
  {
    type: "paragraph",
    text: "Confidence is shown as \"fairly sure\" on a three-step meter, never as a precise-looking percentage. A number like 82% would claim an accuracy the app cannot have.",
  },
  {
    type: "linkCard",
    text: "Read the research behind these patterns: the Lumi case study",
    href: "/research/lumi",
  },

  { type: "heading", level: 3, text: "The reward: a stamp, and a city that fills in" },
  {
    type: "imageRow",
    enlargeable: true,
    // Tuki flies in once, stamps the Santa Luzia stamp, and perches on
    // top of that screen (see TukiStampMoment). Static with motion off.
    tuki: { perchOn: 1, inkAt: { x: 0.443, y: 0.332 } },
    images: [
      {
        src: "/travelmate/place.png",
        width: 804,
        height: 1748,
        alt: "Place detail for Miradouro de Santa Luzia, with an azulejo tile illustration, a tip from Tuki, and a check-in card saying You are here, location confirmed within 40 m.",
      },
      {
        src: "/travelmate/stamp-earned.png",
        width: 804,
        height: 1748,
        alt: "Stamp earned: a large red ink stamp reading Santa Luzia, Lisboa, 28 Oct, and Alfama moving from 40% to 52% explored.",
      },
      {
        src: "/travelmate/passport.png",
        width: 804,
        height: 1748,
        alt: "The Passport: five stamps from the trip and one empty slot, with progress bars for Baixa, Alfama, Bairro Alto and Belém.",
      },
    ],
  },
  {
    type: "paragraph",
    text: "Check-in only works within 40 metres of the place. The stamp lands with a short drop and a small ink burst, and the neighbourhood's share of the map goes up. The Passport keeps every stamp from the trip, plus a plain list of how much of each area you have revealed.",
  },

  { type: "heading", level: 3, text: "Everything else a trip needs" },
  {
    type: "paragraph",
    text: "The loop is the heart of the app, but a trip needs more. Each of these screens answers one moment from the journey map: arriving, ordering, asking, remembering, meeting people, and things going wrong.",
  },
  {
    type: "screenPlayer",
    label: "The rest of the trip",
    screens: [
      {
        tab: "Welcome",
        src: "/travelmate/welcome.png",
        width: 804,
        height: 1748,
        alt: "Welcome: Tuki waving between three ink stamps from Helsinki, Kyoto and Lisboa, the line 'Turn a trip into something you collect', and a Start a trip button.",
        line: "One promise and one button. No sign-up wall: you only need an account to keep your stamps.",
      },
      {
        tab: "Boarding pass",
        src: "/travelmate/boarding-pass.png",
        width: 804,
        height: 1748,
        alt: "Trip setup styled as a boarding pass from Helsinki to Lisbon, 26 to 31 October, with travel style chips such as Views, Local food and Meeting people.",
        line: "Trip setup as a boarding pass. Destination, dates and travel style in three taps.",
      },
      {
        tab: "Permissions",
        src: "/travelmate/permissions.png",
        width: 804,
        height: 1748,
        alt: "Permissions: location, notifications at most twice a day, and an offline pack, each with Tuki's reason, and a note that every one is optional.",
        line: "Every permission says why, in Tuki's voice. All optional, with what still works without them.",
      },
      {
        tab: "Camera",
        src: "/travelmate/camera.png",
        width: 804,
        height: 1748,
        alt: "Ask Tuki with the camera on a Portuguese menu: each dish translated in place, and Tuki recommending the bacalhau à Brás because it is mild.",
        line: "Point the camera at a menu. Translation, plus a pick that fits your taste.",
      },
      {
        tab: "Voice",
        src: "/travelmate/voice.png",
        width: 804,
        height: 1748,
        alt: "Voice mode on a dark screen: the traveller's question said aloud in Portuguese, and a local's reply translated into English.",
        line: "Talk to a local through Tuki, hands-free and out loud, in both directions.",
      },
      {
        tab: "Journal",
        src: "/travelmate/journal.png",
        width: 804,
        height: 1748,
        alt: "The trip journal: the day as a postcard with a small route map and a note, and a timeline of stops drawn like a transit line.",
        line: "The day becomes a postcard and a timeline you can share.",
      },
      {
        tab: "Meet",
        src: "/travelmate/meet.png",
        width: 804,
        height: 1748,
        alt: "Meet travellers: three small meetups shown as tickets with times, verified hosts, and a Safe by default note.",
        line: "Small meetups shown as tickets. Public places and verified hosts only.",
      },
      {
        tab: "Help now",
        src: "/travelmate/help-now.png",
        width: 804,
        height: 1748,
        alt: "Help now: a red Call 112 button, the nearest hospital, the embassy, a trusted contact, and a phrase card reading Preciso de ajuda.",
        line: "Call 112, find the nearest hospital, show a phrase. Works offline.",
      },
    ],
  },
  {
    type: "paragraph",
    text: "Help now is the one screen without Tuki. When something goes wrong, a cartoon guide is the last thing you want to see, so that screen is calm, fast, and works without signal.",
  },

  { type: "heading", level: 3, text: "A system, not a set of screens" },
  {
    type: "image",
    src: "/travelmate/design-system.png",
    width: 3200,
    height: 1680,
    enlargeable: true,
    alt: "The design system: ten colour tokens shown with their Light and Dark values, a type specimen in Bricolage Grotesque, Inter and JetBrains Mono, and components including ink stamps, a stamp ticket, buttons and the tab bar.",
  },
  {
    type: "paragraph",
    text: "Every colour comes from 17 semantic tokens, each with a Light and a Dark value. JetBrains Mono carries ticket-style data like times and percentages, so data reads differently from conversation.",
  },
  {
    type: "variantComparison",
    label: "Same screen, two modes, nothing redrawn",
    variants: [
      {
        src: "/travelmate/passport.png",
        width: 804,
        height: 1748,
        alt: "The Passport screen in Light mode, on warm paper.",
        caption: "Light",
      },
      {
        src: "/travelmate/passport-dark.png",
        width: 804,
        height: 1748,
        alt: "The same Passport screen in Dark mode, with lighter stamp colours on a near-black background.",
        caption: "Dark",
      },
    ],
  },
  {
    type: "paragraph",
    text: "The Dark version is the same screen with one setting changed. Building it was also a test: it exposed two contrast failures that only appeared in Dark mode.",
  },

  { type: "heading", level: 3, text: "Accessibility, measured" },
  {
    type: "paragraph",
    text: "A travel app is used outdoors, in a hurry, and sometimes in an emergency. So I measured instead of guessing.",
  },
  {
    type: "image",
    src: "/travelmate/contrast-audit.png",
    width: 3200,
    height: 1560,
    enlargeable: true,
    alt: "A contrast audit table with six failing colour pairs, four in Light mode and two in Dark mode, each shown before and after the fix with its ratio, all passing WCAG AA afterwards.",
  },
  {
    type: "paragraph",
    text: "The first audit found six pairs below WCAG AA. Five were fixed by changing a token, so every screen that used them updated at once. The sixth, the faded map labels, was a hard-coded colour that I fixed by hand.",
  },
  {
    type: "list",
    items: [
      "Touch targets are at least 44 by 44 points, with small icon buttons padded to reach it.",
      "Colour is never the only signal. Explored areas also get a tick and a percentage.",
    ],
  },

  { type: "heading", level: 3, text: "What this does not prove yet" },
  {
    type: "paragraph",
    text: "Nobody outside this project has used TravelMate yet, so none of it is validated. Two assumptions carry the whole concept, and they are what I would test first, with five travellers and the prototype. Do stamps motivate adults to explore, or do they feel like a gimmick? And does showing the reason make people trust a suggestion more?",
  },
  {
    type: "paragraph",
    text: "I used Claude as an AI pair designer while producing the Figma file. The product idea, the decisions and the trade-offs on this page are mine, including the directions I threw away.",
  },
  {
    type: "paragraph",
    text: "What I am confident about: the core idea is specific, the trust patterns come from real research rather than taste, and the system holds together across seventeen screens and two modes.",
  },
  {
    type: "linkCard",
    text: "Play the prototype",
    href: "https://www.figma.com/proto/NtbD4UlStLxosiM0JTFCNo/TravelMate-Redesign?node-id=45-1382&viewport=374%2C209%2C0.23&t=yeBOuDD5GYut0Jr8-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=45%3A1382&page-id=3%3A7",
  },
];

// ---------------------------------------------------------------------
// 6. Convay Notifications
// ---------------------------------------------------------------------
const convayNotificationsBody: CaseStudyBlock[] = [
  {
    type: "imageRow",
    images: [
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
  // Previous and final panels as close-ups at the same crop (cut from
  // the full dashboard screens), so the changes sit side by side. The
  // final one carries pins on exactly what changed; notes condense the
  // two lists below and the Feature Overview.
  {
    type: "image",
    src: "/closeups/convay-notifications-panel-previous.png",
    width: 686,
    height: 1064,
    alt: "The previous version of the Convay notification panel: plain circle icons to mark items as read, and similar icons for every notification type.",
    caption: "Previous version",
  },
  {
    type: "annotated",
    label: "Close-up · the final version",
    device: "panel",
    image: {
      src: "/closeups/convay-notifications-panel-final.png",
      width: 686,
      height: 1064,
      alt: "The final version of the Convay notification panel: All, Meetings, Chat and Files tabs, Mark all as read, a distinct icon per notification type, and checkmarks to mark items as read.",
    },
    notes: [
      { x: 0.82, y: 0.448, text: "A checkmark marks an update as read. It replaced a plain circle that people found unclear." },
      { x: 0.15, y: 0.3, text: "Each type has its own icon, so meeting, chat and cloud updates read apart at a glance." },
      { x: 0.965, y: 0.124, text: "Meetings, Chat and Files as filters, with everything together under All." },
      { x: 0.58, y: 0.05, text: "Mark everything as read in one go." },
    ],
  },
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
  {
    type: "figure",
    key: "lumi-participants",
    title: "14 of 15 participants wished Lumi had existed when they arrived",
    caption: "Each mark is one of the 15 participants; filled marks are the 14 who described it.",
  },

  { type: "heading", level: 3, text: "The study" },
  {
    type: "paragraph",
    text: "I designed Lumi to test a specific question: when an AI assistant helps someone through an unfamiliar, high-stakes system, what actually makes them trust it, or stop trusting it?",
  },
  {
    type: "paragraph",
    text: "To find out, [[I recruited 15 international students at Tampere University|participants]] who had personally navigated these systems as newcomers, and ran single-session studies with each of them. Every session lasted about 35 minutes and moved through four real scenarios: student housing, banking, healthcare, and university services. Before and after each session, I asked participants to describe what they felt, not just what they thought.",
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
    type: "figure",
    key: "lumi-study-design",
    title: "Study design",
    caption: "Two pilot sessions changed the prototype before the main study, its sessions and the analysis.",
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
  {
    type: "figure",
    key: "lumi-trust-asymmetry",
    title: "Trust forms slowly and breaks fast",
    caption: "Add the moments that built trust in the study, then the broken link that reset it.",
    illustrative: "the events happened in the study; the heights are not measured",
  },
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
    type: "figure",
    title: "Seven design principles for trustworthy conversational AI",
    caption: "Grouped by what made trust possible, what kept it honest, and where it needs protecting. Select a principle to read it.",
    blocks: [
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
    ],
  },

  {
    type: "paragraph",
    text: "This research also contributes to how trust itself is understood in human-AI interaction, extending an existing academic framework in ways I'm continuing to develop toward publication. The seven principles are what I'd build from that understanding today. The next test is building them into something people rely on before they ever have a reason to doubt it.",
  },

  { type: "heading", level: 3, text: "Reflection" },
  {
    type: "aside",
    label: "Limitations",
    items: [
      "**A small sample.** 15 people, one university, one prototype. It doesn't describe how everyone experiences trust in AI, only how these 15 people did, in real depth.",
      "**Designer and researcher.** I designed Lumi and studied it, a position I stayed conscious of throughout, especially once the prototype's own mistakes became some of the most important data in the study.",
    ],
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
    text: "This project is part of my Master's thesis, [[completed at Tampere University and graded 5/5|grade]]. I'm preparing parts of this study for academic publication, so a few details stay under wraps for now, but I'm glad to share more directly.",
  },
  {
    type: "paragraph",
    text: "The full thesis and a working demo of the prototype are available on request.",
  },
  {
    type: "citation",
    label: "Cite this thesis",
    text: "Intiser, M. A. (2026). *Affective dimensions of trust in conversational AI: A qualitative study of international students navigating public services in Finland* [Master's thesis, Tampere University].",
    note: "M.Sc. in Human-Technology Interaction · June 2026 · graded 5/5",
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
  // Close-up with pins (the mockup's annotated shot). Every note
  // condenses this chapter or the cost list below it.
  {
    type: "annotated",
    label: "Close-up · the Silent Disco card",
    device: "phone",
    image: {
      src: "/arenewberg/silent-disco.png",
      width: 394,
      height: 840,
      alt: "The Activities tab with the Silent Disco card expanded: 'Wireless headphones, three DJs, zero noise complaints,' Winding Tower Hall, €5, 'Headsets at the door.'",
    },
    notes: [
      {
        x: 0.06,
        y: 0.428,
        text: "The card gives the reason, not just the pitch: wireless headphones, three DJs, zero noise complaints.",
      },
      {
        x: 0.86,
        y: 0.535,
        text: "Each visitor picks a channel and sets the volume. That choice is the sensory control.",
      },
      { x: 0.79, y: 0.578, text: "€5 covers the headphone rental, not profit." },
    ],
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
  // The same six ideas and figures that used to be a list, as a chart:
  // real numbers on a log scale, so €100 and €500,000 fit side by side.
  {
    type: "costChart",
    label: "Rough cost per idea · log scale",
    caption:
      "Approximate costs in euros. Each step on the axis is ten times the last. The silent disco and film figure is per night.",
    items: [
      {
        label: "Hologram system for immersive mine tours",
        status: "cut",
        low: 500000,
        high: 500000,
        value: "~500,000",
        note: "flagged as barely realistic by the team itself",
      },
      { label: "Zip line between two headframes", status: "cut", low: 150000, high: 200000, value: "~150,000–200,000" },
      { label: "VR mining game", status: "cut", low: 100000, high: 100000, value: "~100,000" },
      {
        label: "Silent disco and film screenings",
        status: "shipped",
        low: 300,
        high: 600,
        value: "~300–600 a night",
        note: "€5 a ticket covers the headphone rental",
      },
      { label: "Forest rest area", status: "shipped", low: 100, high: 200, value: "~100–200" },
      { label: "Scavenger hunt", status: "shipped", value: "Prize budget only" },
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
  // Prototype player (the mockup's medium shot): one line per section,
  // each condensed from the section text below it.
  {
    type: "screenPlayer",
    label: "The prototype · five sections, one job each",
    screens: [
      {
        tab: "Home",
        src: "/arenewberg/home.png",
        width: 410,
        height: 840,
        alt: "The Home tab: 'Festival Live, Arenberg Mine,' a schedule-chip timeline (Gates/Market/Hunt), a live Scavenger Hunt card with 147 players and 2h remaining, and quick-access Silent Disco and Open Air Cinema cards.",
        line: "What's on now, what's next, and one clear action: join the hunt.",
      },
      {
        tab: "Activities",
        src: "/arenewberg/silent-disco.png",
        width: 394,
        height: 840,
        alt: "The Activities tab listing tonight's five experiences, with the Silent Disco card expanded.",
        line: "Everything on tonight in one list, with the Silent Disco card saying why it's silent.",
      },
      {
        tab: "Hunt",
        src: "/arenewberg/hunt-clue-screen.png",
        width: 284,
        height: 642,
        alt: "Clue 1 of 7 of the scavenger hunt, with a Take photo button and a live leaderboard.",
        line: "Seven clues, each tied to a real place on site, with a live leaderboard.",
      },
      {
        tab: "Map",
        src: "/arenewberg/map.png",
        width: 386,
        height: 840,
        alt: "The Festival Map: five color-coded zones (Forest, Cinema, Disco, Market, Entrance) around the Headframe, a 'you are here' marker, and the Market zone's detail card expanded below.",
        line: "Five color-coded zones, every clue plotted, and a live you-are-here marker.",
      },
      {
        tab: "Profile",
        src: "/arenewberg/entry-pass.png",
        width: 394,
        height: 840,
        alt: "The Entry Pass on the Profile tab: a scannable QR code for general admission.",
        line: "A digital ticket whose QR code doubles as the entry pass for the night.",
      },
    ],
  },

  { type: "heading", level: 4, text: "Home" },
  {
    type: "paragraph",
    text: "The first thing a visitor sees: what's happening right now, what's coming up next, and one clear action to take. A live schedule bar shows the night's timeline. The Scavenger Hunt sits front and center, since it's the main draw, with a live player count and a direct way to join. Smaller cards below surface the Silent Disco and the film screening without demanding attention they haven't earned yet.",
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
    claims: {
      taps: {
        label: "Five taps to three",
        source: "Counted on the old and new join flows. Not measured in a live release.",
      },
      tasks: {
        label: "Every task completed",
        source: "Informal walkthroughs with teammates, not a test with outside users.",
      },
      parity: {
        label: "Feature parity with web",
        source: "A design-stage comparison with the web app, not production data.",
      },
      reviewers: {
        label: "Five of six reviewers",
        source: "Internal reviews at handoff. Informal, not an external study.",
      },
    },
    // Milestone 3: the case study's own opening shot, reused as this
    // card's thumbnail instead of a generated placeholder -- see
    // ProjectSummary.thumbnail in content/types.ts for why only some
    // projects get one. This is the same GIF that opens the full case
    // study, already sized 1600x1200 (4:3), matching ProjectCard's media
    // aspect ratio exactly, so it renders here uncropped.
    thumbnail: cardLoop("convay-mobile-app-revamp", "A short film of the Convay mobile redesign: a phone turns over a wall of the new screens, from Today to a live meeting with Bangla captions and an AI recap."),
    // Convay Mobile App Revamp rebuild: replaces the old hook paragraph,
    // which 01_Audit.md flagged as the one place the writing voice broke
    // on the whole page ("The goal? Make sure users could rely on
    // Convay, wherever they are." -- a question-fragment opener in an
    // otherwise natural, confident piece of writing, and the very first
    // paragraph a reader sees). Verbatim from 03_Content_Final.md.
    oneLineScope:
      "I designed Convay's mobile app at Synesis IT in 2023–24, and the work shipped: joining without sign-up, and transcripts, summaries and recordings on mobile. In 2026 I redesigned it again as a concept, to show how I would solve the same problems today.",
    meta: {
      role: "UX Designer (2023–24), Product Designer (2026 concept)",
      team: "Product managers + engineering (2023–24); solo concept (2026)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure), redesigned Nov 2026",
      tools: "Figma, Claude (AI pair designer, 2026 concept)",
    },
    liveMeta: {
      category: ["Mobile Design", "Product Design"],
      role: ["UX Designer", "UI Designer", "UX Researcher"],
      tools: ["Figma", "Claude (AI pair designer, 2026 concept)"],
      status: "Shipped 2023–24 · Redesign concept 2026, not yet user-tested",
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
    claims: {
      "dark-panel": {
        label: "82% preferred the dark panel",
        source: "Internal testers at Convay compared both panels. Not customers.",
      },
      "rename-time": {
        label: "Speaker editing time down an estimated 30-40%",
        source: "An estimate, not a timed measurement.",
      },
      accuracy: {
        label: "93% accuracy in quiet rooms",
        source: "Convay's internal testing in quiet rooms, not a field study.",
      },
      "notes-time": {
        label: "Note-taking time down 30-40%",
        source: "Reported by teams in the same internal testing. Not timed.",
      },
    },
    thumbnail: cardLoop("convay-ai-for-physical-meetings", "A short film of the Convay AI for Physical Meetings redesign: a desktop window and a phone, wiped from the live meeting to the AI notes, the transcript and Dark mode."),
    oneLineScope:
      "I designed Convay's feature for recording in-person meetings at Synesis IT in 2023–24, and it shipped: record the room, get a transcript, summarise it with AI, with Bangla from the start. In 2026 I redesigned it again as a concept, for the people in the room as much as the person holding the laptop.",
    meta: {
      role: "UX Designer (2023–24), Product Designer (2026 concept)",
      team: "Product managers + engineering (2023–24); solo concept (2026)",
      duration: "Sep 2023 – Jul 2024 (Convay tenure), redesigned Nov 2026",
      tools: "Figma, Claude (AI pair designer, 2026 concept)",
    },
    liveMeta: {
      category: ["Web Design", "Product Design"],
      role: ["UX Designer", "UI Designer", "UX Researcher"],
      tools: ["Figma", "Claude (AI pair designer, 2026 concept)"],
      status: "Shipped 2023–24 · Redesign concept 2026, not yet user-tested",
    },
    compactHero: true,
    // Decorative monogram chips for References & Mentions
    // (06_Assets_Checklist.md). Keyed by exact link text, applied only
    // to this case study -- see the `referenceMarks` note on CaseStudy
    // in content/types.ts for why this doesn't touch the shared
    // "Convay at a Glance" block the other three Convay case studies
    // also spread. Text-based initials rather than sourced outlet
    // logos: no authentic wordmark files exist anywhere in this
    // project's assets, and downloading third-party brand marks from
    // the web isn't something this pass does.
    //
    // Convay at a Glance content refresh: "The Daily Observer" entry
    // dropped -- the approved reference list no longer includes that
    // link, so its mark here would be dead/unused. The new "Convay"
    // link (the platform's own site, not third-party coverage) doesn't
    // get a mark, same as the old "convay.com" link never had one.
    referenceMarks: {
      "The Daily Star": "TDS",
      "The Financial Express": "TFE",
      "SIDSSA 2025 Official Post": "SID",
    },
    // Points to the next Convay project in the existing Work-track
    // order: same company, and the case study this feature's own UI
    // work draws its design system from.
    nextCaseStudy: {
      title: "Convay Design System",
      href: "/work/convay-design-system",
    },
    body: convayAiBody,
  },
  {
    slug: "convay-design-system",
    title: "Convay Design System",
    track: "work",
    scale: "platform",
    // Card film: the no-text cut of this project's trailer (see
    // content/trailers.ts), made from its real screens.
    thumbnail: {
      src: "/loops/convay-design-system-card.mp4",
      poster: "/loops/convay-design-system-card.webp",
      width: 960,
      height: 720,
      alt: "A short film of the Convay design system in Figma: color variables with light and dark values, then type, grid and elevation styles, stacked as layers.",
    },
    contentStatus: "complete",
    claims: {
      "in-use": {
        label: "In active use since 2024",
        source: "From working with it daily. Not a formal usage audit.",
      },
      "every-feature": {
        label: "Every new feature drew from it",
        source: "What I saw in features I designed and reviewed. Not measured product-wide.",
      },
      handoff: {
        label: "Developers used named variables",
        source: "How handoff worked on my projects. Names were shaped with developers.",
      },
    },
    // Convay Design System rebuild: hero paragraph replaced verbatim
    // with CASE_STUDY_FINAL.md's "Hero -> Supporting paragraph." This
    // field also feeds the page's SEO meta description (see
    // app/work/[slug]/page.tsx's generateMetadata, which every case
    // study reuses this same way) -- the package separately specifies a
    // shorter, distinct meta-description string, but IMPLEMENTATION_
    // SPEC.md is explicit that per-page metadata handling isn't
    // something to special-case for this one page ("that's a site-wide
    // decision"), so this follows the same single-field convention
    // every other case study already uses rather than introducing a
    // second, page-specific metadata field.
    oneLineScope:
      "When I joined Convay, its interface had grown feature by feature, each one designed on its own, with no shared colors, type, or components holding it together. As the only UX designer on the team, I built Convay's first design system from the ground up: a single Figma source of truth for color, typography, spacing, and components, developed in close collaboration with the product and engineering teams. It's now the foundation every new Convay feature is built on, across web and mobile.",
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
    // Consistency pass: "next case study" navigation previously existed
    // on only 2 of 10 case studies (the two that had been through their
    // own dedicated rebuild). Every case study otherwise dead-ended with
    // no forward link, contradicting CaseStudyLayout.tsx's own stated
    // reasoning for this feature ("dead-ends fixed... keep exploring
    // reads before get in touch"). Completed the chain across all ten,
    // following each track's own index-page order (flagships first, then
    // file order), so the whole site now reads as one continuous "keep
    // exploring" path: Work track in full, then a bridge into Research,
    // through to the end, looping back to the flagship that opened it.
    nextCaseStudy: {
      title: "TravelMate",
      href: "/work/travelmate-ai",
    },
    body: convayDesignSystemBody,
  },
  {
    slug: "travelmate-ai",
    title: "TravelMate",
    track: "work",
    scale: "product",
    // v2 redesign (October 2026). The slug stays "travelmate-ai" so old
    // links, the trailer and the card loop keep working; the product is
    // now just "TravelMate".
    contentStatus: "complete",
    thumbnail: cardLoop("travelmate-ai", "A short film of TravelMate: Tuki the ink-bird flies over a map of Lisbon, a suggestion card explains why, and a place earns an ink stamp."),
    oneLineScope:
      "A travel companion that suggests what to do right now, explains why, and rewards every real place you visit with an ink stamp. A self-directed concept, redesigned from the ground up in 2026.",
    meta: {
      role: "Product Designer (solo)",
      team: "None (self-directed, solo project)",
      duration: "Jan – May 2025, redesigned Oct 2026",
      tools: "Figma, Claude (AI pair designer)",
    },
    liveMeta: {
      category: ["Mobile Design", "Product Design", "AI UX"],
      role: ["Product Designer (solo)"],
      tools: ["Figma", "Claude (AI pair designer)"],
      status: "Self-directed concept, not yet user-tested",
    },
    nextCaseStudy: {
      title: "Convay Notifications",
      href: "/work/convay-notifications",
    },
    body: travelMateBody,
  },
  {
    slug: "convay-notifications",
    title: "Convay Notifications",
    track: "work",
    scale: "feature",
    contentStatus: "complete",
    thumbnail: cardLoop("convay-notifications", "A short film of Convay Notifications: the notification panel on web and mobile, its three categories, and turning off one chat."),
    oneLineScope:
      "In a platform used across 45+ countries, including by government agencies, missing a critical update can break workflows. I helped design a centralized, categorized notification system for Convay, ensuring users could easily stay on top of meetings, messages, and file updates. This feature was a small yet strategic step toward making Convay a seamless, scalable collaboration tool.",
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
    nextCaseStudy: {
      title: "FitVibe: A Comprehensive Fitness App",
      href: "/work/fitvibe",
    },
    body: convayNotificationsBody,
  },
  // -----------------------------------------------------------------
  // Research track: no live-site equivalent (see file-level comment
  // above). Lumi is written (see lumiBody above); the other four are
  // still untouched placeholders.
  // -----------------------------------------------------------------
  {
    slug: "fitvibe",
    title: "FitVibe: A Comprehensive Fitness App",
    track: "work",
    scale: "product",
    contentStatus: "complete",
    claims: {
      survey: {
        label: "Survey with 30 participants",
        source: "The project's ideation survey, summarised as the pain points below.",
      },
      sus: {
        label: "SUS score of 63.3",
        source: "Recalculated step by step below from the study's item totals (12 participants). The common SUS average is 68.",
      },
    },
    thumbnail: cardLoop("fitvibe", "A short film of FitVibe: the app's main screens, then the personas, affinity map, sketches and wireframes behind them."),
    oneLineScope:
      "FitVibe is a comprehensive fitness app designed for fitness enthusiasts and individuals pursuing a healthy lifestyle. It offers a range of features including workout and diet planners, progress tracking, social interaction, gamified challenges, and an e-commerce shop. With a focus on personalized guidance and community support, FitVibe caters to passionate fitness enthusiasts and those seeking to improve their well-being. I worked on it as a UI design intern at Kaz Software, alongside a senior designer, on a client product whose real name is under NDA.",
    meta: {
      role: "UI Design Intern (under senior designer guidance)",
      team: "Senior designer + client team",
      duration: "May 2022 – Aug 2022",
      tools: "Figma",
    },
    liveMeta: {
      category: ["Mobile Design"],
      // Phase 0 fix: the header used to list "UX Designer, UI Designer,
      // UX Researcher" for what was a four-month internship under a
      // senior designer. The meta.role above already said so; this is
      // the field the header actually shows.
      role: ["UI Design Intern, Kaz Software (with a senior designer)"],
      tools: ["Figma"],
    },
    nextCaseStudy: {
      title: "Cultural Festival Platform, Arenberg UNESCO Site",
      href: "/work/cultural-festival-platform",
    },
    body: fitvibeBody,
  },
  {
    slug: "lumi",
    title: "Lumi: Conversational AI for Public Services",
    track: "research",
    scale: "research",
    isFlagship: true,
    contentStatus: "complete",
    claims: {
      participants: {
        label: "15 participants",
        source: "Documented in my M.Sc. thesis, Tampere University, 2026.",
      },
      grade: {
        label: "Thesis graded 5/5",
        source: "Tampere University's grade for my M.Sc. thesis, June 2026.",
      },
    },
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
    // Card film: the no-text cut of this project's trailer (see
    // content/trailers.ts), made from its real screens.
    thumbnail: {
      src: "/loops/lumi-card.mp4",
      poster: "/loops/lumi-card.webp",
      width: 960,
      height: 720,
      wide: { src: "/loops/lumi-card-wide.mp4", poster: "/loops/lumi-card-wide.webp", width: 1600, height: 900 },
      alt: "A short film of Lumi: the prototype's home and chat screens, an off-script question, and the trust line from the study rising slowly and breaking fast.",
    },
    nextCaseStudy: {
      title: "Multimodal Robot Interaction (RoboCarnival)",
      href: "/research/robocarnival",
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
    // Card film: the no-text cut of this project's trailer (see
    // content/trailers.ts), made from its real screens.
    thumbnail: {
      src: "/loops/arenewberg-card.mp4",
      poster: "/loops/arenewberg-card.webp",
      width: 960,
      height: 720,
      alt: "A short film of the aRENEWberg festival app: the home screen, the silent disco, the scavenger hunt and the entry pass.",
    },
    // Last entry in the Work track's own index order -- bridges into
    // Research instead of dead-ending or looping back to the start of
    // the same track, matching the dual-track "Design / Research"
    // framing already established on the homepage.
    nextCaseStudy: {
      title: "Lumi: Conversational AI for Public Services",
      href: "/research/lumi",
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
    nextCaseStudy: {
      title: "Tailoring Game Difficulty to Player Types",
      href: "/research/game-difficulty-player-types",
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
    // Last case study in the chain -- closes the loop back to the
    // flagship that opened it, rather than dead-ending, so there's
    // always a "next" no matter where a visitor entered the site.
    nextCaseStudy: {
      title: "Convay Mobile App Revamp",
      href: "/work/convay-mobile-app-revamp",
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

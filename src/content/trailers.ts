/**
 * Project trailers: short films cut from each project's real screens,
 * one per case study, played at the top of the case as a hook for anyone
 * who won't read further. Every screen in them is a real project screen,
 * and every line of on-screen text is condensed from that case study.
 *
 * Each film has a 16:9 version with titles (the case hero, in
 * public/trailers/) and a 4:3 version without any text (the project
 * card, public/loops/<file>-card.mp4). `script` is the on-screen text in
 * order, so it can be read by people who can't watch the film.
 */

export interface Trailer {
  src: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  script: string[];
}

const trailer = (file: string, alt: string, script: string[]): Trailer => ({
  src: `/trailers/${file}.mp4`,
  poster: `/trailers/${file}.webp`,
  width: 1600,
  height: 900,
  alt,
  script,
});

export const trailers: Record<string, Trailer> = {
  "convay-mobile-app-revamp": trailer(
    "convay-mobile-app-revamp",
    "Trailer for the Convay mobile app revamp, made from the app's real screens.",
    [
      "Joining a meeting took five taps. Now it takes three.",
      "01, Joining: join with a meeting ID or a link. No sign-up first.",
      "02, Parity: transcripts, summaries and recordings, now on mobile too.",
      "03, End to end: onboarding, dashboard and meeting tools, rebuilt for phones.",
    ],
  ),
  "convay-ai-for-physical-meetings": trailer(
    "convay-ai-for-physical-meetings",
    "Trailer for Convay AI for Physical Meetings, made from the product's real screens.",
    [
      "Crucial details went undocumented. Now you press Record.",
      "01, Record: record the room. Get a full transcript after.",
      "02, Summarise: then an AI summary people can share.",
      "03, Tested: two panels tested. 82% of internal testers preferred dark.",
    ],
  ),
  "convay-design-system": trailer(
    "convay-design-system",
    "Trailer for the Convay design system, made from its real Figma variables and styles.",
    [
      "Every feature started from scratch. Now they share one system.",
      "01, Variables: colour tokens with light and dark values, side by side.",
      "02, Styles: type, grids and elevation, built on those variables.",
      "03, Bottom-up: variables first, then styles, then components on top.",
    ],
  ),
  fitvibe: trailer("fitvibe", "Trailer for FitVibe, made from the app's real screens and process work.", [
    "My first client app. And my first usability study.",
    "01, The app: workout and diet planners, progress tracking and a shop.",
    "02, Process: survey, personas, journey map, sketches, then wireframes.",
    "03, Tested: tested with 12 participants. A SUS of 63.3 showed what to fix.",
  ]),
  "travelmate-ai": trailer("travelmate-ai", "Trailer for TravelMate AI, made from the concept's real screens.", [
    "Five apps for one trip. Or one companion.",
    "01, Ask: type or speak. Get directions with a map attached.",
    "02, Voice: a voice mode with a live waveform and example prompts.",
    "03, The whole trip: plan the day, get there, remember it, check the weather.",
  ]),
  "convay-notifications": trailer(
    "convay-notifications",
    "Trailer for Convay Notifications, made from the feature's real web and mobile screens.",
    [
      "Updates were scattered, or missed. Now they live in one place.",
      "01, One place: meetings, chat and files in one feed, on web and mobile.",
      "02, Categories: three categories, each with its own icon and details.",
      "03, In control: turn off a noisy chat, with an undo if you change your mind.",
    ],
  ),
  lumi: trailer("lumi", "Trailer for Lumi, made from the prototype's real screens and the study's main finding.", [
    "Trust forms slowly. And breaks fast.",
    "01, The prototype: real institutions, named directly, with links to their official sites.",
    "02, Off-script: when people went off-script, a constrained AI layer kept Lumi steady.",
    "03, The finding: 15 students. Trust rose in small moments, then one broken link reset it. The moments shown are a working link to TOAS, an accurate price range, a precise, scannable summary, and then a housing provider that doesn't exist.",
  ]),
  "cultural-festival-platform": trailer(
    "arenewberg",
    "Trailer for aRENEWberg, made from the prototype's real screens.",
    [
      "Arenberg isn't short on history. It's short on reasons to show up.",
      "01, The night: six activities, one app, from arrival to the end of the night.",
      "02, Silent by design: headphones instead of speakers, so the neighbours stay undisturbed.",
      "03, The hunt: seven clues across the site, each ending in a shareable photo.",
    ],
  ),
};

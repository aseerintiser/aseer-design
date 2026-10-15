/**
 * Project chapters (Phase 1 identity): one color per product family, so
 * each case study feels like its own chapter inside one system.
 *
 * Every tint is sampled from the project's own screens rather than
 * invented: Convay's indigo from its primary buttons, Lumi's teal from
 * its avatar and links, aRENEWberg's green from its live-status accents,
 * TravelMate's blue from its voice button, FitVibe's periwinkle from its
 * charts, RoboCarnival's amber from the lab photo, and the game study's
 * cobalt from its own chart bars. The Stage component mixes the tint
 * into the night ground, so these values never appear as flat fills.
 */

export interface Chapter {
  name: string;
  tint: string;
  /** "photo" gets the shared film-like grade; "screen" is shown as is. */
  medium: "screen" | "photo";
}

const convay: Chapter = { name: "Convay", tint: "#3d3191", medium: "screen" };

export const chapters: Record<string, Chapter> = {
  "convay-mobile-app-revamp": convay,
  "convay-ai-for-physical-meetings": convay,
  "convay-design-system": convay,
  "convay-notifications": convay,
  lumi: { name: "Lumi", tint: "#0a8f99", medium: "screen" },
  "cultural-festival-platform": { name: "aRENEWberg", tint: "#2f9e62", medium: "screen" },
  "travelmate-ai": { name: "TravelMate", tint: "#1f75e9", medium: "screen" },
  fitvibe: { name: "FitVibe", tint: "#7f93f0", medium: "screen" },
  robocarnival: { name: "RoboCarnival", tint: "#c0702a", medium: "photo" },
  "game-difficulty-player-types": { name: "Game difficulty", tint: "#3346a8", medium: "screen" },
};

const fallback: Chapter = { name: "Project", tint: "#6e6a60", medium: "screen" };

export function chapterFor(slug: string): Chapter {
  return chapters[slug] ?? fallback;
}

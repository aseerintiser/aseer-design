import localFont from "next/font/local";

/**
 * The three typefaces, loaded through next/font so the page doesn't jump
 * when they arrive. next/font preloads the files, and each family gets a
 * system fallback resized to the real font's metrics, so text set in the
 * fallback for a moment takes up the same space as the final font. The files are the same @fontsource ones as
 * before (latin subset), still self-hosted, never fetched from Google.
 *
 * The @fontsource CSS imported in layout.tsx stays as a second family in
 * each stack, only for characters outside latin (the ł in Ziółkowska, for
 * example), which the browser fetches only when such a character appears.
 */

export const newsreader = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2",
      style: "normal",
      weight: "200 800",
    },
    {
      path: "../../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2",
      style: "italic",
      weight: "200 800",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  // A hand-tuned fallback (defined in globals.css) instead of next/font's
  // automatic one. Newsreader's optical sizes make it about 7 to 12%
  // wider at headline size than at text size, so a fallback matched to
  // its text width set the homepage headline on three lines, then
  // Newsreader arrived and needed four, pushing the page down. The tuned
  // fallback is matched to headline width, where the shift happens.
  fallback: ["Newsreader Fallback", "Georgia", "serif"],
  adjustFontFallback: false,
});

export const schibsted = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2",
      style: "normal",
      weight: "400 900",
    },
  ],
  variable: "--font-schibsted",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const plexMono = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  adjustFontFallback: false,
});

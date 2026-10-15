import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { TRUST_LINE_PATH } from "@/components/ui/TrustMark";

/**
 * Link preview images (the picture LinkedIn, Slack and iMessage show when
 * someone shares a link to the site). Rendered once at build time by the
 * opengraph-image.tsx files, so there is no runtime cost and no paid
 * service involved.
 *
 * Drawn in the new identity (Phase 0 of the visual upgrade, ahead of the
 * Phase 1 rollout): night ground, the trust-line mark in highlighter
 * yellow, Newsreader for the title, IBM Plex Mono for the small labels.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const NIGHT = "#0E0E0C";
const PAPER = "#F2F0EA";
const MUTED = "#B3AFA4";
const SIGNAL = "#FFD84A";

const fontDir = path.join(process.cwd(), "src", "lib", "og", "fonts");
const font = (file: string) => readFile(path.join(fontDir, file));

/** The trust line: a slow climb, a sudden fall, the climb back. */
function TrustLine({ width }: { width: number }) {
  return (
    <svg width={width} height={(width * 20) / 32} viewBox="0 0 32 20">
      <path
        d={TRUST_LINE_PATH}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
      />
    </svg>
  );
}

interface OgImageInput {
  /** Small label above the title, e.g. "Case study · 2023–2024". */
  eyebrow: string;
  title: string;
  /** Optional word in the title to mark with the highlighter. */
  highlight?: string;
}

export async function renderOgImage({ eyebrow, title, highlight }: OgImageInput) {
  const [serif, serifItalic, sans, mono] = await Promise.all([
    font("newsreader-latin-400-normal.woff"),
    font("newsreader-latin-400-italic.woff"),
    font("schibsted-grotesk-latin-500-normal.woff"),
    font("ibm-plex-mono-latin-500-normal.woff"),
  ]);

  // Long case-study titles get a smaller size so they never wrap past
  // three lines.
  const titleSize = title.length > 60 ? 64 : title.length > 36 ? 76 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NIGHT,
          color: PAPER,
          padding: "64px 72px",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <TrustLine width={64} />
          <div style={{ fontFamily: "Newsreader", fontSize: 40, letterSpacing: -0.5 }}>Aseer</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Newsreader",
              fontSize: titleSize,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1040,
            }}
          >
            {/* One span per word, so long titles wrap like normal text
                (Satori only wraps between flex items). */}
            {title.split(" ").map((word, index) => {
              const core = word.replace(/[^\p{L}]+$/u, "");
              if (!highlight || core !== highlight) {
                return (
                  <span key={index} style={{ marginRight: 18 }}>
                    {word}
                  </span>
                );
              }
              return (
                <div key={index} style={{ display: "flex", marginRight: 18 }}>
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#14120A",
                      background: SIGNAL,
                      padding: "0 8px",
                    }}
                  >
                    {core}
                  </span>
                  <span>{word.slice(core.length)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>Md Aseer Intiser</span>
          <span>aseer.design</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: serif, style: "normal", weight: 400 },
        { name: "Newsreader", data: serifItalic, style: "italic", weight: 400 },
        { name: "Schibsted Grotesk", data: sans, style: "normal", weight: 500 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}

/** "Sep 2023 – Jul 2024 (Convay tenure)" -> "2023–2024"; "June 2026" -> "2026". */
export function yearsFrom(duration: string) {
  const years = [...new Set(duration.match(/\b(19|20)\d{2}\b/g) ?? [])];
  return years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : (years[0] ?? "");
}

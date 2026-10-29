import { cn } from "@/lib/utils";

/**
 * Tuki, TravelMate's ink-bird mascot, drawn from the same vector shapes
 * as the Tuki component in the TravelMate Figma file (and the case
 * film in scripts/trailers/travelmate/film.html). Colours are the app's
 * own tokens: navy body, paper face, stamp-red scarf, transit-yellow
 * beak and feet.
 *
 * Purely decorative everywhere it appears, so it is always hidden from
 * assistive technology. `flapping` only runs while Tuki is in flight;
 * the wing beat is a CSS animation that stops when the flag drops (see
 * .tuki in globals.css).
 */
const NAVY = "#233A7A";
const RED = "#B53724";
const PAPER = "#F4EFE6";
const INK = "#16181D";
const YELLOW = "#F2B705";

export type TukiEyes = "open" | "joy";

export function Tuki({
  size = 40,
  flapping = false,
  eyes = "open",
  className,
}: {
  size?: number;
  flapping?: boolean;
  eyes?: TukiEyes;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      data-flap={flapping ? "true" : undefined}
      className={cn("tuki overflow-visible", className)}
    >
      <path d="M56 21c-2-8 4-12 8-8M62 20c2-6 8-6 9-2" stroke={NAVY} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path
        className="tuki-feet"
        d="M48 104v8M44 112h8M72 104v8M68 112h8"
        stroke={YELLOW}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path className="tuki-wing-l" d="M24 64C10 66 6 82 12 92c7-3 12-12 12-24z" fill={NAVY} />
      <path className="tuki-wing-r" d="M96 64c14 2 18 18 12 28-7-3-12-12-12-24z" fill={NAVY} />
      <path d="M60 18C86 18 100 40 100 66c0 26-18 42-40 42S20 92 20 66C20 40 34 18 60 18Z" fill={NAVY} />
      <path d="M60 84c11 0 18 6 18 13 0 6-8 9-18 9s-18-3-18-9c0-7 7-13 18-13Z" fill={PAPER} />
      <path d="M28 76c20 9 44 9 64 0v8c-20 9-44 9-64 0z" fill={RED} />
      <path d="M78 84l11 15-13-4z" fill={RED} />
      <circle cx="45" cy="52" r="12" fill={PAPER} />
      <circle cx="75" cy="52" r="12" fill={PAPER} />
      {eyes === "joy" ? (
        <path d="M39 54c2-6 10-6 12 0M69 54c2-6 10-6 12 0" stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : (
        <>
          <circle cx="47" cy="53" r="5.5" fill={INK} />
          <circle cx="73" cy="53" r="5.5" fill={INK} />
          <circle cx="48.8" cy="51.2" r="1.6" fill={PAPER} />
          <circle cx="74.8" cy="51.2" r="1.6" fill={PAPER} />
        </>
      )}
      <path d="M53 64h14l-7 10z" fill={YELLOW} />
    </svg>
  );
}

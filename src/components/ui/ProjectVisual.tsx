import { cn } from "@/lib/utils";

/** Small deterministic string hash (djb2) so the same seed always
 * produces the same visual -- important here so a given project looks
 * the same on every visit/page rather than shifting on each render. */
function hashSeed(seed: string): number {
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  return Math.abs(hash);
}

interface ProjectVisualProps {
  seed: string;
  /** Rendered as a large, low-opacity watermark glyph, typically the
   * project's initial. Purely typographic, never a fabricated screenshot. */
  monogram?: string;
  className?: string;
}

/**
 * A generated, deterministic abstract visual standing in for real
 * project photography/screenshots, which don't exist yet (per this
 * milestone's "do not invent achievements" constraint -- a fabricated
 * screenshot would be worse than an honest abstraction). Each project
 * gets a distinct but *consistent* two-tone gradient derived from its
 * slug, a fine diagonal line texture for a considered, brand-like feel
 * rather than a generic placeholder gray box, and an optional oversized
 * monogram watermark. Replace with real imagery as it becomes available
 * per project (Milestones 4-7).
 */
export function ProjectVisual({ seed, monogram, className }: ProjectVisualProps) {
  const hash = hashSeed(seed);
  const hueA = hash % 360;
  const hueB = (hueA + 46) % 360;
  const angle = 115 + (hash % 40);

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: [
          `repeating-linear-gradient(${angle + 90}deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)`,
          `radial-gradient(120% 120% at 15% 15%, hsl(${hueA} 85% 68% / 0.9), transparent 60%)`,
          `linear-gradient(${angle}deg, hsl(${hueA} 62% 46%), hsl(${hueB} 58% 32%))`,
        ].join(", "),
      }}
    >
      {monogram && (
        <span
          className="pointer-events-none absolute -bottom-[0.18em] -right-[0.05em] select-none font-[family-name:var(--font-display)] text-[7rem] leading-none text-white/15"
          style={{ fontSize: "clamp(5rem, 18vw, 9rem)" }}
        >
          {monogram}
        </span>
      )}
    </div>
  );
}

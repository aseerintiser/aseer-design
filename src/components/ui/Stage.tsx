import Image from "next/image";
import type { CSSProperties } from "react";
import type { Chapter } from "@/content/chapters";
import { isVideo } from "@/lib/media";
import { cn } from "@/lib/utils";
import { LoopVideo } from "./LoopVideo";

export interface StageMedia {
  src: string;
  width: number;
  height: number;
  alt: string;
  poster?: string;
}

interface StageProps {
  chapter: Chapter;
  media: StageMedia;
  /** For loops: play now (the card decides, on hover, focus or when
   * centred on a phone). Ignored for stills. */
  playing?: boolean;
  /** Show the chapter name in the stage's top band. */
  showLabel?: boolean;
  /** "wide" is for a card that spans the full row (a lone flagship):
   * a cinema-shaped stage on large screens, with the window kept to a
   * readable width in the middle instead of stretching edge to edge. */
  shape?: "standard" | "wide";
  /** Play the loop whenever it is visible, with a pause button (case
   * study heroes), instead of on hover. */
  autoplay?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * The stage: one presentation system for every project (Phase 1).
 *
 * The work arrived in at least five treatments (tilted phones on white,
 * pale UI on pale blue, a dark app, a photo, an illustration). Instead of
 * repainting the work, every project now sits the same way: a dark
 * ground lit from above in the project's own chapter color, light grain,
 * and the work in one window that rises from the bottom edge, with one
 * radius and one shadow. The work changes; the framing does not.
 *
 * Inside a link with the `group` class, the window lifts slightly on
 * hover or keyboard focus, at interface speed.
 */
export function Stage({
  chapter,
  media,
  playing = false,
  showLabel = true,
  shape = "standard",
  autoplay = false,
  sizes = "(min-width: 1024px) 45vw, 90vw",
  priority = false,
  className,
}: StageProps) {
  const style = { "--stage-tint": chapter.tint } as CSSProperties;

  return (
    <div
      className={cn(
        "stage relative isolate aspect-[4/3] w-full overflow-hidden",
        shape === "wide" && "lg:aspect-[2/1]",
        className,
      )}
      style={style}
    >
      {showLabel && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-[4.2%] left-[9%] font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.16em] text-white/65 uppercase",
            shape === "wide" && "lg:left-[24%]",
          )}
        >
          {chapter.name}
        </span>
      )}

      <div
        className={cn(
          "stage-window absolute inset-x-[9%] top-[12%] -bottom-[4%] overflow-hidden rounded-t-[10px] bg-[#0e0e0c]",
          shape === "wide" && "lg:inset-x-[24%]",
          "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-entrance)]",
          "group-hover:-translate-y-[2.5%] group-focus-visible:-translate-y-[2.5%]",
        )}
      >
        {isVideo(media.src) ? (
          <LoopVideo
            src={media.src}
            poster={media.poster}
            alt={media.alt}
            width={media.width}
            height={media.height}
            mode={autoplay ? "auto" : "controlled"}
            playing={playing}
            controlsPosition="top-right"
            className="h-full w-full"
          />
        ) : (
          <Image
            src={media.src}
            width={media.width}
            height={media.height}
            alt={media.alt}
            sizes={sizes}
            priority={priority}
            className={cn(
              "h-full w-full object-cover object-top",
              chapter.medium === "photo" && "stage-photo-grade object-center",
            )}
          />
        )}
      </div>

      <div aria-hidden="true" className="stage-grain pointer-events-none absolute inset-0" />
    </div>
  );
}

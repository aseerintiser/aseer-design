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
  wide?: { src: string; poster: string; width: number; height: number };
}

interface StageProps {
  chapter: Chapter;
  media: StageMedia;
  /** "standard" is 4:3 (cards). "wide" is 16:9 from large screens up, for
   * a card that spans a full row or a case hero without a trailer. */
  shape?: "standard" | "wide";
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Where a project's media sits on a card or a hero: full bleed, edge to
 * edge, the way the old GIFs filled their section.
 *
 * The project films already carry their own chapter-lit ground, so the
 * frame adds nothing on top of them. The same night ground, lit in the
 * chapter's color, sits behind stills and shows while a film loads. In a
 * link with the `group` class the media drifts in a touch on hover or
 * keyboard focus.
 */
export function Stage({
  chapter,
  media,
  shape = "standard",
  sizes = "(min-width: 1024px) 45vw, 90vw",
  priority = false,
  className,
}: StageProps) {
  const style = { "--stage-tint": chapter.tint } as CSSProperties;
  // A full-row card plays the film's 16:9 cut when it has one, at every
  // width, instead of cropping the 4:3 card film.
  const film = shape === "wide" && media.wide ? { ...media, ...media.wide } : media;

  return (
    <div
      className={cn(
        "stage relative isolate aspect-[4/3] w-full overflow-hidden",
        shape === "wide" && (media.wide ? "aspect-video" : "lg:aspect-video"),
        className,
      )}
      style={style}
    >
      <div className="absolute inset-0 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-entrance)] group-hover:scale-[1.025] group-focus-visible:scale-[1.025]">
        {isVideo(film.src) ? (
          <LoopVideo src={film.src} poster={film.poster} alt={film.alt} width={film.width} height={film.height} />
        ) : (
          <Image
            src={media.src}
            width={media.width}
            height={media.height}
            alt={media.alt}
            sizes={sizes}
            priority={priority}
            className={cn(
              "h-full w-full object-cover",
              chapter.medium === "photo" ? "stage-photo-grade object-center" : "object-top",
            )}
          />
        )}
      </div>
    </div>
  );
}

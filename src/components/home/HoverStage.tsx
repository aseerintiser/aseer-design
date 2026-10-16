import Link from "next/link";
import { Stage, type StageMedia } from "@/components/ui/Stage";
import type { Chapter } from "@/content/chapters";
import { cn } from "@/lib/utils";

interface HoverStageProps {
  href: string;
  label: string;
  chapter: Chapter;
  media: StageMedia;
  shape?: "standard" | "wide";
  sizes?: string;
  className?: string;
}

/** A project's media that is also the link to its case study. Films play
 * on their own while on screen (see LoopVideo); hover and focus only add
 * a slight drift and a deeper shadow. */
export function HoverStage({ href, label, chapter, media, shape, sizes, className }: HoverStageProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group block overflow-hidden rounded-[var(--radius-lg)] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-shadow duration-[var(--duration-slow)] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <Stage chapter={chapter} media={media} shape={shape} sizes={sizes} />
    </Link>
  );
}

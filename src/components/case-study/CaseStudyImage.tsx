import Image from "next/image";

interface CaseStudyImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

/**
 * Single migrated screenshot/GIF (Milestone 2). Sourced directly from
 * framerusercontent.com -- see next.config.ts remotePatterns comment and
 * the Milestone 2 report for why these aren't self-hosted yet. Real
 * width/height from the source are passed straight to next/image to
 * avoid layout shift and preserve the original aspect ratio exactly, per
 * the migration brief's "preserve image quality, maintain aspect
 * ratios" rule.
 */
export function CaseStudyImage({ src, width, height, alt, caption }: CaseStudyImageProps) {
  return (
    <figure className="mx-auto max-w-full">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 800px, 100vw"
          unoptimized={src.endsWith(".gif")}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

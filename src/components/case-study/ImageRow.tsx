import Image from "next/image";

interface ImageRowProps {
  images: { src: string; width: number; height: number; alt: string }[];
}

/**
 * Side-by-side screenshot gallery (Milestone 2 migration) -- the live
 * site frequently shows a run of related screens together (e.g. every
 * screen in a flow) rather than one at a time. Wraps responsively.
 *
 * Visual Polish milestone: previously each tile's max-width was derived
 * from the *source* image's own pixel width (`image.width * 0.45`).
 * That looked fine when every image in a row happened to share both
 * dimensions, but several migrated rows mix portrait phone screenshots
 * of the same width but different heights (750x1624 next to 750x2220),
 * or a landscape overview GIF alongside portrait detail shots -- since
 * width was capped but height followed from each image's own aspect
 * ratio, tiles in the same row ended up wildly different heights (a
 * 750-wide, 2220-tall shot rendered nearly 1000px tall next to
 * neighbors under half that), and a full row of phone screenshots could
 * run to several thousand vertical pixels for a single gallery beat.
 *
 * Fixed-height, auto-width tiles (a standard "justified gallery" row)
 * fix this the same way a real photo gallery would: every image in the
 * row shares one height, so a row's total height is bounded and
 * predictable regardless of how many images it holds or what aspect
 * ratio each one is, and mismatched source resolutions can no longer
 * throw two same-purpose screenshots out of proportion with each
 * other.
 */
export function ImageRow({ images }: ImageRowProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="h-56 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] sm:h-64 lg:h-72"
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            className="h-full w-auto max-w-full object-cover"
            // A fixed-height tile's rendered width follows from each
            // image's own aspect ratio, not the viewport, so a vw-based
            // hint (the old 45vw, sized for the previous width-scaled
            // layout) no longer matches what's actually on screen -- most
            // tiles here are portrait phone shots rendering well under
            // 200px wide. These caps are the worst case at each height
            // tier (h-56/64/72) for the widest image likely in a row (a
            // ~4:3 landscape overview shot), so next/image never
            // undersizes the rare wide tile while not over-fetching for
            // the common narrow ones.
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 340px, 300px"
            unoptimized={image.src.endsWith(".gif")}
          />
        </div>
      ))}
    </div>
  );
}

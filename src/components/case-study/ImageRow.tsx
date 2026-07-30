import Image from "next/image";

interface ImageRowProps {
  images: { src: string; width: number; height: number; alt: string }[];
}

/**
 * Side-by-side screenshot gallery (Milestone 2 migration) -- the live
 * site frequently shows a run of related screens together (e.g. every
 * screen in a flow) rather than one at a time. Wraps responsively;
 * each image keeps its own real aspect ratio rather than being cropped
 * to match its neighbors.
 */
export function ImageRow({ images }: ImageRowProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
          style={{ maxWidth: `min(100%, ${Math.round(image.width * 0.45)}px)` }}
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 45vw, 100vw"
            unoptimized={image.src.endsWith(".gif")}
          />
        </div>
      ))}
    </div>
  );
}

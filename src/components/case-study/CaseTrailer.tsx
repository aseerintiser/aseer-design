import type { Trailer } from "@/content/trailers";
import { LoopVideo } from "@/components/ui/LoopVideo";

/**
 * A case study's trailer: a short film cut from the project's real
 * screens, at the top of the case as a hook. It plays on its own, like a
 * GIF, and its on-screen text is also written out for screen readers.
 */
export function CaseTrailer({ trailer }: { trailer: Trailer }) {
  return (
    <figure className="m-0">
      <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-[#0e0e0c] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_32px_80px_-32px_rgb(0_0_0/0.7)]">
        <LoopVideo
          src={trailer.src}
          poster={trailer.poster}
          alt={trailer.alt}
          width={trailer.width}
          height={trailer.height}
        />
      </div>
      <figcaption className="sr-only">
        On-screen text: {trailer.script.join(" ")}
      </figcaption>
    </figure>
  );
}

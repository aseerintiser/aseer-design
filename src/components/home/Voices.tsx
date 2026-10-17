"use client";

import { useLightbox } from "@/components/ui/Lightbox";
import { voices } from "@/content/home";
import { testimonialImageUrl, testimonials } from "@/content/testimonials";

interface Voice {
  id: string;
  quote: string;
  name: string;
  role: string;
}

/**
 * Short quotes from LinkedIn recommendations. Each quote is an exact
 * sentence from the transcription on the Testimonials page, and "View
 * original" opens the screenshot of the recommendation itself. The
 * homepage shows three; About passes its own two.
 */
export function Voices({ items = voices, columns = 3 }: { items?: readonly Voice[]; columns?: 2 | 3 }) {
  const { open } = useLightbox();

  return (
    <div className={columns === 3 ? "grid gap-10 md:grid-cols-3 md:gap-8" : "grid gap-10 md:grid-cols-2 md:gap-10"}>
      {items.map((voice) => {
        const source = testimonials.find((t) => t.id === voice.id);
        return (
          <figure key={voice.id} className="m-0 flex flex-col border-t border-[var(--color-border-strong)] pt-6">
            <blockquote className="m-0 font-[family-name:var(--font-display)] text-[1.375rem] leading-[1.3] tracking-[-0.005em]">
              <p>&ldquo;{voice.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-auto pt-6 text-sm">
              <span className="block font-medium">{voice.name}</span>
              <span className="block text-[var(--color-text-muted)]">{voice.role}</span>
              {source && (
                <button
                  type="button"
                  onClick={() =>
                    open(
                      [
                        {
                          src: testimonialImageUrl(source.id),
                          width: source.width,
                          height: source.height,
                          alt: `LinkedIn recommendation from ${source.name}`,
                        },
                      ],
                      0,
                    )
                  }
                  className="link-ink mt-3 inline-block text-sm"
                >
                  View original
                </button>
              )}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

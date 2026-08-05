"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useLightbox } from "@/components/ui/Lightbox";
import { testimonialsHeading, testimonials, testimonialImageUrl } from "@/content/testimonials";

/**
 * Testimonials Redesign milestone: previously this page was five
 * LinkedIn screenshots in a grid, technically authentic but browsable
 * rather than readable -- the actual recommendations only existed as
 * text baked into images. The recommendation text is now transcribed
 * (content/testimonials.ts) and set as real, readable type, the primary
 * content of each card. The original screenshot is preserved exactly as
 * it was and stays one click away behind "View original", wired into
 * the same shared Lightbox every other image gallery on this site uses,
 * so a visitor can still verify every word against the real screenshot
 * at full resolution.
 *
 * Order, images, and wording are unchanged from the previous version;
 * only the presentation is new.
 */
export default function TestimonialsPage() {
  const { open } = useLightbox();
  const lightboxImages = testimonials.map((testimonial) => ({
    src: testimonialImageUrl(testimonial.id),
    width: testimonial.width,
    height: testimonial.height,
    alt: `Original LinkedIn recommendation from ${testimonial.name}`,
  }));

  return (
    <Section density="open" measure="narrow">
      <Heading level={1}>{testimonialsHeading}</Heading>

      {/* A single readable column rather than a grid: recommendations
          vary a lot in length (one paragraph up to four), and a
          multi-column grid of cards that tall next to cards that short
          reads as an uneven, unplanned layout. Stacked, generously
          spaced cards read as a considered list instead, and keep every
          card at the same, comfortable reading width. */}
      <div className="mt-12 space-y-10">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.id}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 sm:p-8"
          >
            {/* Same left-accent quote treatment PullQuote uses elsewhere
                on the site, generalized to multiple paragraphs here
                since PullQuote itself only takes one string. */}
            <div className="space-y-4 border-l-2 border-[var(--color-accent)] pl-6">
              {testimonial.text.map((paragraph, paragraphIndex) => (
                <Text key={paragraphIndex}>{paragraph}</Text>
              ))}
            </div>

            <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-5">
              <div className="flex items-center gap-3">
                {/* Small cropped preview of the original screenshot:
                    doubles as the "supporting evidence" visual (a quiet
                    signal this is real, without reproducing the whole
                    image as the primary read) and, since it's an
                    on-page <Image>, it's already loaded by the time
                    someone clicks through, so the Lightbox opens
                    instantly instead of showing a loading state. */}
                {/* tabIndex=-1 + aria-hidden: the explicit "View
                    original" button below is the one real control for
                    keyboard and screen-reader users, so this thumbnail
                    doesn't announce as a second, identically-purposed
                    button right next to it. */}
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => open(lightboxImages, index)}
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] cursor-zoom-in"
                >
                  <Image
                    src={testimonialImageUrl(testimonial.id)}
                    width={testimonial.width}
                    height={testimonial.height}
                    alt=""
                    className="h-full w-full object-cover"
                    sizes="56px"
                  />
                </button>
                <div>
                  {/* A real h3, not just a bold <p>: lets screen-reader
                      users jump between testimonials by heading, the
                      same way they'd navigate a list of article titles.
                      Sized and weighted to match the rest of this
                      footer rather than pulling in Heading's own h3
                      display styles, which are sized for section
                      headings, not an attribution line. */}
                  <h3 className="font-medium text-[var(--color-text)]">{testimonial.name}</h3>
                  <Text size="small" muted className="mt-0.5">
                    {testimonial.title}
                  </Text>
                  <Text size="small" muted className="mt-1 text-xs">
                    {testimonial.context}
                  </Text>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                withArrow={false}
                onClick={() => open(lightboxImages, index)}
              >
                View original
              </Button>
            </footer>
          </article>
        ))}
      </div>
    </Section>
  );
}

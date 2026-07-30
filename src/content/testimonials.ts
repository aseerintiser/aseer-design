/**
 * Testimonials page content, migrated from the live aseer.design
 * /testimonials page (Milestone 2). Entirely image-based (screenshots
 * of LinkedIn recommendations/messages) under one heading, no body text
 * to extract.
 *
 * Visual QA milestone: these were previously rendered with no
 * width/height, inside a fixed aspect-[4/3] box with object-contain.
 * LinkedIn recommendation screenshots vary a lot in their own aspect
 * ratio depending on how long the message is (measured live: from a
 * near-square 506x506 up to a short, wide 633x331), so forcing all five
 * into one fixed box letterboxed the shorter/wider ones with visible
 * dead space above and below the actual screenshot. Real dimensions
 * (measured from the live-rendered images) let each tile size itself to
 * its own image instead, the same approach CaseStudyImage already uses.
 */

export const testimonialsHeading = "Words from People I've Worked With";

export const testimonialImages = [
  { id: "l8YiCOwU55xIAxMblVsts6fA5A", width: 633, height: 412 },
  { id: "SYFmJXJGL3nIyvv33Rvx7Yk0DA", width: 633, height: 357 },
  { id: "PK6UerUwwcFWrEBIFKRVDrhpZKc", width: 633, height: 331 },
  { id: "Rj4R8TvxUhp5Ak0rUrzdlPJbXc8", width: 506, height: 506 },
  { id: "AEuxR99ymS2qM3gHrdUHV8ydJg", width: 633, height: 356 },
] as const;

export function testimonialImageUrl(id: string) {
  return `https://framerusercontent.com/images/${id}.png`;
}

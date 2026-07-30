/**
 * Testimonials page content, migrated from the live aseer.design
 * /testimonials page (Milestone 2). Entirely image-based (screenshots
 * of recommendations/messages) under one heading, no body text to
 * extract. No width/height in the source markup, same as
 * certifications -- see content/certifications.ts for the rendering
 * approach this reuses.
 */

export const testimonialsHeading = "Words from People I've Worked With";

export const testimonialImages = [
  "l8YiCOwU55xIAxMblVsts6fA5A",
  "SYFmJXJGL3nIyvv33Rvx7Yk0DA",
  "PK6UerUwwcFWrEBIFKRVDrhpZKc",
  "Rj4R8TvxUhp5Ak0rUrzdlPJbXc8",
  "AEuxR99ymS2qM3gHrdUHV8ydJg",
] as const;

export function testimonialImageUrl(id: string) {
  return `https://framerusercontent.com/images/${id}.png`;
}

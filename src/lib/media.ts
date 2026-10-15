/**
 * Small helpers for the site's two kinds of media: still images and
 * short muted loops (MP4).
 *
 * Phase 1: the five walkthrough animations migrated from Framer were
 * GIFs of 35 to 47 MB each (about 200 MB across the Work page, since
 * next/image cannot optimize animated GIFs). They are now H.264 loops
 * in public/loops/, about 2 to 3.5 MB at full size and under 1.1 MB in
 * the card versions, each with a poster frame of the same name.
 */

export function isVideo(src: string) {
  return src.endsWith(".mp4");
}

/** Every loop in public/loops/ ships with a first-frame poster that
 * shares its file name, so the poster can be derived instead of
 * repeated in every content entry. */
export function posterFor(src: string) {
  return src.replace(/\.mp4$/, ".jpg");
}

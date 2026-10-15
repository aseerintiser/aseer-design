/**
 * Self-hosted copies of the images that used to load from Framer's CDN
 * (framerusercontent.com), the old Framer site's asset host. If that
 * project were ever deleted or its plan lapsed, every case study,
 * certificate, testimonial and portrait would have gone blank.
 *
 * The files live in public/media/framer/ under their original Framer
 * file names, so each content entry keeps the same ID it always had and
 * only the host changes. scripts/self-host-framer-images.mjs downloads
 * them from the list in scripts/framer-images.json.
 */
export const framerAsset = (file: string) => `/media/framer/${file}`;

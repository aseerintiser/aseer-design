/**
 * Homepage hero editorial sequence (Hero Craftsmanship milestone).
 * -----------------------------------------------------------------------
 * Three prior review documents (Hero-Composition-Review.md,
 * Hero-Work-Preview-Review.md, Hero-Design-Review.md, Hero-Craftsmanship-
 * Review.md) all considered and rejected showing a single project's
 * asset in the hero, on the grounds that it would overweight one piece
 * of work and duplicate the homepage's own "Featured work / Featured
 * research" section, which already pairs one project from each track.
 *
 * This is a different move: not "here is my best project," but "this is
 * how I work." Five frames, each standing in for one part of the
 * practice, drawn only from assets that already exist elsewhere on the
 * site (About page, case studies) -- nothing new was produced. Ordered
 * as a loose arc (research -> prototyping -> systemizing -> applying it
 * to a real human-AI problem -> shipping) rather than an arbitrary list,
 * so the sequence has a direction even though no single frame is
 * essential reading on its own.
 *
 * All five are rendered fully desaturated in HeroSequence.tsx. The
 * source assets span a Framer-hosted product GIF, two local screen-
 * recording mp4s, and a real photograph -- genuinely different visual
 * styles and production values (see Hero-Work-Preview-Review.md Section
 * 1 for the original finding). Grayscale is the one treatment applied
 * uniformly across all five that turns that inconsistency into a single
 * coherent quiet palette, rather than asking the source material to
 * already match, which it doesn't.
 */

export type HeroSequenceFrame =
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      label: string;
    }
  | {
      type: "video";
      src: string;
      width: number;
      height: number;
      label: string;
    };

export const heroSequence: HeroSequenceFrame[] = [
  {
    type: "image",
    // Reuses the About page's affinity-mapping photo (public/about/).
    src: "/about/affinity-mapping.png",
    width: 640,
    height: 480,
    label: "Research",
  },
  {
    type: "image",
    // FitVibe's digital wireframes, already live on that case study.
    src: "https://framerusercontent.com/images/KdXsXf4qmA9GtNZkMeJRAekxHs4.png",
    width: 1708,
    height: 652,
    label: "Prototyping",
  },
  {
    type: "video",
    // Same asset already used as the Convay Design System case study's
    // own thumbnail (public/convay-design-system/).
    src: "/convay-design-system/thumbnail.mp4",
    width: 1100,
    height: 826,
    label: "Design systems",
  },
  {
    type: "video",
    // Same asset already used as the Lumi case study's own thumbnail
    // (public/lumi/).
    src: "/lumi/thumbnail.mp4",
    width: 723,
    height: 542,
    label: "Human-AI interaction",
  },
  {
    type: "image",
    // Convay Mobile App Revamp's own opening shot, already live on that
    // case study and on the homepage's "Featured work" card.
    src: "https://framerusercontent.com/images/TIUlfB8AWBViTdf78QjQ3hKq2o.gif",
    width: 1600,
    height: 1200,
    label: "Product design",
  },
];

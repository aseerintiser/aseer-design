/**
 * Articles page content, migrated verbatim from the live aseer.design
 * /articles page (Milestone 2, new page). Two groups: press mentions
 * ("Featured In") and personal writing ("My Writings on UX, HCI &
 * Strategy"), each card linking out to the original source.
 */

interface ArticleEntry {
  image: { src: string; width: number; height: number };
  heading: string;
  body: string;
  href: string;
}

export const featuredIn: ArticleEntry[] = [
  {
    image: {
      src: "https://framerusercontent.com/images/92RQm766DzyRAks136DuTA0w.png",
      width: 1600,
      height: 1043,
    },
    heading: "Robostudio proudly presents: An annual Robocarnival event at Hervanta campus!",
    body: "A university exhibition where our team showcased a social robot interaction workshop designed by us. Our project was voted as one of the top two by visitors. My 1-minute robot video was cheered by the audience, a proud highlight of my master's journey.",
    href: "https://blogs.tuni.fi/cs/robostudio/robostudio-proudly-presents-an-annual-robocarnival-event-at-hervanta-campus/",
  },
  {
    image: {
      src: "https://framerusercontent.com/images/MdNNl9bI9gHoaIv4tFqjhDbAoc.png",
      width: 920,
      height: 519,
    },
    heading: "It was a dark, stormy night..",
    body: "For my course on Psychology in Human-Technology Interaction, I created a digital story blending cinematography and HCI concepts. This work was selected among the top 8 out of 120 stories for publication.",
    href: "https://blogs.tuni.fi/cs/teaching/it-was-a-dark-stormy-night/",
  },
];

export const myWritings: ArticleEntry[] = [
  {
    image: {
      src: "https://framerusercontent.com/images/nYwoS1qeMcETU1UELNY4I5GmlE.png",
      width: 1400,
      height: 733,
    },
    heading:
      "Tailoring Game Difficulty to Player Types: An Investigation of the Effect of Difficulty on Player Engagement and Retention",
    body: "An analytical dive into how game difficulty impacts player engagement. Backed by survey research, this article suggests UX strategies for reward systems, new challenges, and immersive experiences to boost player retention.",
    href: "https://medium.com/design-bootcamp/tailoring-game-difficulty-to-player-types-an-investigation-of-the-effect-of-difficulty-on-player-c1f85c16a408",
  },
  {
    image: {
      src: "https://framerusercontent.com/images/znnfQ6rxgyAv5ergkkBVH63OI.png",
      width: 512,
      height: 512,
    },
    heading: "Enhancing User Experience for Duolingo: A User-Centered Blueprint",
    body: "A practical case study proposing advanced learning paths and personalized features to improve engagement on Duolingo. This article showcases user research, UX enhancements, and key metrics for measuring success.",
    href: "https://medium.com/design-bootcamp/enhancing-user-experience-for-duolingo-a-user-centered-blueprint-f40d3e293b8c",
  },
  {
    image: {
      src: "https://framerusercontent.com/images/etYdKbPNjKCskGODtPhSgo5E.png",
      width: 875,
      height: 492,
    },
    heading:
      "The Ethical Design Battle: Chrome vs Brave, Embracing Ethical Design for a Better Browsing Experience",
    body: "A comparative UX study on Brave and Chrome, focusing on privacy, user empowerment, and the importance of ethical design practices.",
    href: "https://aseerintiser.medium.com/the-ethical-design-battle-chrome-vs-brave-embracing-ethical-design-for-a-better-browsing-378893b51a61",
  },
];

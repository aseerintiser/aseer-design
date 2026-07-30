/**
 * About page content, migrated verbatim from the live aseer.design
 * /about-me page (Milestone 2). Certifications, previously a condensed
 * placeholder section on this page, now has its own dedicated page
 * (/certifications) to match the live site's own nav structure -- the
 * live site has never combined the two.
 */

export const about = {
  heading: "Hello, I'm Aseer, a problem-solver by heart, a designer by choice.",
  // Three lifestyle photos shown near the top of the live page.
  topImages: [
    {
      src: "https://framerusercontent.com/images/WB2c50eEvwiJ0Kdme0JYmKs5c.png",
      width: 1563,
      height: 1563,
      alt: "A young man riding a bicycle",
    },
    {
      src: "https://framerusercontent.com/images/5aSvwzp3nRXbQFLbiib7jb2NrJU.png",
      width: 1920,
      height: 1080,
      alt: "A man skating",
    },
    {
      src: "https://framerusercontent.com/images/jFMGJRhJI6nE4lRH1sjadQf98ks.png",
      width: 2048,
      height: 1536,
      alt: "A boat surfing",
    },
  ],
  sections: [
    {
      heading: "Who I Am",
      paragraphs: [
        "I'm Aseer, a UX and Product Designer with a background in Software Engineering and a master's degree in Human-Technology Interaction.",
        "I specialize in UX research, product strategy, user psychology, and usability testing to design digital experiences that are intuitive, accessible, and scalable.",
      ],
      // TODO(resume-link): this is the *second* of the two conflicting
      // Google Drive resume links found during migration -- see the
      // nav-level TODO in content/site.ts. Left unlinked here (plain
      // text) rather than pointed at either file until that's resolved.
      linkText: "View my resume",
    },
    {
      heading: "What I Do Best",
      paragraphs: [
        "My work combines design thinking with technical insight. I've built design systems from scratch, collaborated closely with developers, and worked on AI-driven and SaaS products that aim to solve real-world problems.",
        "I enjoy simplifying complexity through user-centered design and crafting systems that grow with the product.",
      ],
    },
    {
      heading: "What Drives Me",
      paragraphs: [
        "What makes my approach unique is my understanding of both people and technology.",
        "I care deeply about accessibility because I experience color blindness myself. That personal lens helps me design more inclusive solutions for a wider range of users.",
      ],
    },
    {
      heading: "What I'm Exploring Now",
      paragraphs: [
        "Right now, I'm diving deeper into the intersection of AI and UX, exploring how emerging technologies can improve the way we interact with products.",
        "I'm also curious about how storytelling and psychology influence user behavior and decision-making in digital spaces.",
      ],
    },
    {
      heading: "When I'm Not Designing",
      paragraphs: [
        "When I'm not designing, you'll find me behind a camera, capturing fleeting moments of light and silence. Filmmaking isn't just a hobby, it's how I slow down, observe, and tell stories without saying a word.",
      ],
      image: {
        src: "https://framerusercontent.com/images/wU56WDpraknSWD3JVfLhEmFXQI.png",
        width: 613,
        height: 721,
        alt: "",
      },
      quote:
        "I don't just design screens, I've filmed a sunset on three different continents and once edited a short film in a moving train.",
      externalLink: {
        text: "Watch My Stories",
        href: "https://aseerniloy.wixsite.com/portfolio",
      },
      tags: [
        "Cinematography",
        "Filmmaking",
        "Travel",
        "Cricket",
        "Photography",
        "Music",
        "Gaming",
        "FIFA",
      ],
    },
  ],
} as const;

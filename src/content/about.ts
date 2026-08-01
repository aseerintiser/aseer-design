/**
 * About page content.
 *
 * About Page Rebuild milestone: the previous version of this file was
 * migrated verbatim from the live aseer.design /about-me page
 * (Milestone 2) and had never been reconsidered since, unlike the rest
 * of the site, which had been through several rounds of review by this
 * point. It read as five separate resume-style sections ("Who I Am",
 * "What I Do Best", "What Drives Me") that mostly restated the same two
 * or three facts already stated on the homepage (Software Engineering
 * background, HTI Master's, Convay), plus a top block of three lifestyle
 * photos with no clear connection to anything else on the page.
 *
 * Rewritten as one narrative: the engineering-to-design path is the
 * throughline the homepage doesn't have room for, "What Drives Me" and
 * "What I'm Exploring Now" are grounded in specific, already-documented
 * facts (the colorblindness/accessibility connection, the trust
 * question Lumi's case study is actually about) instead of generic
 * claims, and "Who I Am" + "What I Do Best" are merged into one section
 * ("How I Got Here") since they were answering the same question. The
 * three original lifestyle photos move down to sit with the filmmaking
 * section they actually support, rather than leading the page before
 * any of that context exists. A real portrait (site.portrait, unused
 * since the Homepage Finalization milestone deliberately kept it off
 * the homepage) now runs in the hero instead, since a page titled
 * "About" is the one place on this site where a photo of Aseer
 * competing for attention with the headline is the right call, not the
 * wrong one.
 */

export const about = {
  heading: "I'm Aseer. I came to design from software engineering, not the other way around.",
  intro:
    "That order still shows. I want to understand how something works, and who it's for, before I try to make it better, whether that's a product, a research question, or a short film.",
  // Reuses site.portrait (content/site.ts): a real photo of Aseer,
  // deliberately kept off the homepage so it wouldn't compete with the
  // work there, but reserved for exactly this page instead.
  portrait: {
    src: "https://framerusercontent.com/images/2bZSUdqkPs4VGBtGfwyuSAZLP4.png",
    width: 1563,
    height: 1563,
    alt: "Portrait of Md Aseer Intiser",
  },
  sections: [
    {
      heading: "How I Got Here",
      paragraphs: [
        "Software engineering taught me how systems break. What pulled me toward design was realizing that, most of the time, the system wasn't actually the problem. The people using it were being misunderstood instead. That's the short version of why I went back for a master's in Human-Technology Interaction instead of staying purely technical.",
        "In practice, that shows up as an order of operations more than a specific skill: research comes before interface decisions, not after. At Convay, that meant sitting close to research and engineering rather than keeping them in separate lanes, building design systems that developers could actually implement, and testing ideas with real users before assuming I already knew the answer.",
      ],
      // Two real moments from that research practice, not staged: sorting
      // findings into themes on a wall (affinity mapping, a core HCI
      // method) and a human-robot interaction workshop. Placed here,
      // early in the page, because they're evidence for the paragraph
      // above rather than personal/hobby photos, so they belong with the
      // research claim, not down in "When I'm Not Designing".
      researchPhotos: [
        {
          src: "/about/affinity-mapping.png",
          width: 640,
          height: 480,
          alt: "Aseer doing affinity mapping, sorting research findings on a wall of sticky notes",
        },
        {
          src: "/about/hci-robots.png",
          width: 640,
          height: 360,
          alt: "Aseer with two social robots during a human-robot interaction workshop",
        },
      ],
      linkText: "View my resume",
    },
    {
      heading: "What Drives Me",
      paragraphs: [
        "I care about trust, probably because so much of what I design now involves AI, and AI is exactly the kind of technology people are right to be cautious about. I'd rather build something that's honest about what it can and can't do than something that oversells itself to look impressive in a demo.",
        "I also design with accessibility in mind because I experience it firsthand. I'm colorblind, so the parts of an interface that quietly fail (a status shown only in color, a chart with no pattern behind the palette) aren't abstract edge cases to me. They're things I actually run into.",
      ],
    },
    {
      heading: "What I'm Exploring Now",
      paragraphs: [
        "Right now I'm interested in a fairly specific question: how much people should trust an AI system, and how design can help them calibrate that instead of defaulting to blind trust or blanket suspicion. That question came out of Lumi, a conversational AI project I researched and designed for public services, and it's the thread I want to keep pulling on: in a PhD program eventually, or in an industry research role that takes it just as seriously.",
      ],
    },
    {
      heading: "When I'm Not Designing",
      paragraphs: [
        "Outside of work, I'm usually behind a camera. Filmmaking is where I slow down and notice things I'd otherwise miss: light, timing, the small decisions that make a moment feel real instead of staged. That habit of noticing carries over into design more than people expect.",
      ],
      // Restored: the original portrait-style photo of Aseer holding a
      // camera (present since Milestone 2, briefly dropped during the
      // About Page Rebuild milestone by mistake). Sits right after the
      // paragraph, before the quote, same position it always had.
      image: {
        src: "https://framerusercontent.com/images/wU56WDpraknSWD3JVfLhEmFXQI.png",
        width: 613,
        height: 721,
        alt: "Aseer holding a camera",
      },
      quote: "I've filmed a sunset on three different continents and once edited a short film on a moving train.",
      externalLink: {
        text: "Watch my stories",
        href: "https://aseerniloy.wixsite.com/portfolio",
      },
      // Trimmed from 8 to 6: "Cinematography" duplicated "Filmmaking"
      // and "FIFA" duplicated "Gaming" one line up: two tags doing the
      // work of one each.
      tags: ["Filmmaking", "Photography", "Travel", "Cricket", "Gaming", "Music"],
    },
  ],
  closing:
    "If any of this sounds like the kind of person you'd want on a project, the work is the better place to look next.",
} as const;

/**
 * About page content.
 *
 * October 2026 rework ("sell the person"): the page has to work for a
 * visitor who reads nothing else, and for both industry and research
 * readers. It shows one identity (designer and researcher, trained as an
 * engineer) instead of two career paths, and it lets proof do the
 * persuading: every "How I work" habit points to where it can be seen,
 * the quotes are exact sentences from LinkedIn recommendations, and the
 * recognition figures come from Aseer's CV and records.
 *
 * Kept exactly as Aseer asked: the When I'm Not Designing section (its
 * paragraph, quote, photos, collage, link and tags) and the two research
 * photos. Nothing here mentions a PhD (see content/cv.ts, "two doors").
 */

import { framerAsset } from "./media";

export const about = {
  eyebrow: "About · Product designer & HCI researcher",
  heading: "I study how people use technology, and design it so they can trust it.",
  intro:
    "I started out as a software engineer, so I know how products get built, and I can build what I design. That order still shows: I want to understand how something works, and who it's for, before I try to make it better, whether that's a product, a research question or a short film.",
  // A real photo of Aseer, kept off the homepage and reserved for here.
  portrait: {
    src: framerAsset("2bZSUdqkPs4VGBtGfwyuSAZLP4.png"),
    width: 1563,
    height: 1563,
    alt: "Portrait of Md Aseer Intiser",
  },

  story: {
    heading: "How I Got Here",
    paragraphs: [
      "Software engineering taught me how systems break. What pulled me toward design was realizing that, most of the time, the system wasn't actually the problem. The people using it were being misunderstood instead. That's the short version of why I went back for a master's in Human-Technology Interaction instead of staying purely technical.",
    ],
    // Two real moments from that research practice, not staged: sorting
    // findings into themes on a wall (affinity mapping) and a human-robot
    // interaction workshop.
    photos: [
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
    linkText: "Open the CV",
  },

  /**
   * Capabilities as labels, habits as the lines, and the place each one
   * can be checked. Sources: Lumi's pilot sessions, participants and
   * limitations (projects.ts, Lumi); the Meeting Panel test (projects.ts,
   * Convay AI, claim "dark-panel"); Lumi's AI layer and aRENEWberg's
   * working prototype, both built by Aseer (projects.ts); the mentoring
   * from the CV and career archive ("self-organised", 23 juniors, 10+
   * secured internships or projects).
   */
  howIWork: {
    heading: "How I Work",
    rows: [
      {
        label: "Research",
        line: "I find out who it's for before I design anything.",
        proof: "Two pilot sessions showed where Lumi broke before 15 people used it.",
        link: { label: "Lumi", href: "/research/lumi" },
      },
      {
        label: "Design",
        line: "I test ideas instead of defending them.",
        proof: "We tested two Meeting Panel designs, and 82% of internal testers chose the dark one.",
        link: { label: "Convay AI", href: "/work/convay-ai-for-physical-meetings" },
      },
      {
        label: "Build",
        line: "I design what engineers can build, and build it myself when I need to.",
        proof: "A software engineering degree, Lumi's AI layer and aRENEWberg's working prototype.",
        link: { label: "aRENEWberg", href: "/work/cultural-festival-platform" },
      },
      {
        label: "Honesty",
        line: "I say what I don't know.",
        proof: "Lumi names its own limitations, and every claim on this site carries its source.",
        link: { label: "Design notes", href: "/design-notes" },
      },
      {
        label: "Teaching",
        line: "I pass on what I learn.",
        proof: "I set up UI/UX mentoring at IUT myself: 23 juniors, and 10+ went on to internships or projects.",
        link: null,
      },
    ],
    // Exact sentences from the LinkedIn recommendations in
    // testimonials.ts, chosen for how Aseer works (range, an engineer's
    // view of him) and not used on the homepage.
    voices: [
      {
        id: "l8YiCOwU55xIAxMblVsts6fA5A",
        quote:
          "He was always willing to lend a hand across various UX fields, from research to prototyping, contributing meaningfully to each project phase.",
        name: "Anupam Samodder",
        role: "UX Design Lead · managed Aseer at Synesis IT",
      },
      {
        id: "AEuxR99ymS2qM3gHrdUHV8ydJg",
        quote:
          "I enjoyed working with him for six months and was consistently impressed by his intelligence, fast learning ability, and polite demeanor.",
        name: "Arique Ahsan",
        role: "Frontend Engineer · worked on the same team",
      },
    ],
  },

  drives: {
    heading: "What Drives Me",
    paragraphs: [
      "I care about trust, probably because so much of what I design now involves AI, and AI is exactly the kind of technology people are right to be cautious about. I'd rather build something that's honest about what it can and can't do than something that oversells itself to look impressive in a demo.",
      "I also design with accessibility in mind because I experience it firsthand. I'm colorblind, so the parts of an interface that quietly fail (a status shown only in color, a chart with no pattern behind the palette) aren't abstract edge cases to me. They're things I actually run into.",
    ],
  },

  exploring: {
    heading: "What I'm Exploring Now",
    question: "How much should people trust an AI system, and how can design help them calibrate that trust?",
    line: "Lumi, the conversational AI I researched and designed for public services, left me with this question. It's the thread I want to keep pulling on.",
    link: { label: "Read the Lumi study", href: "/research/lumi" },
  },

  offDuty: {
    heading: "When I'm Not Designing",
    paragraphs: [
      "Outside of work, I'm usually behind a camera. Filmmaking is where I slow down and notice things I'd otherwise miss: light, timing, the small decisions that make a moment feel real instead of staged. That habit of noticing carries over into design more than people expect. These days I share my films as Bohrscope.",
    ],
    // The real camera photo with a warm golden grade, light film grain and
    // a soft vignette so it sits with the teaser's tones (Aseer approved,
    // October 18, 2026). Graded only; nothing added or removed.
    image: {
      src: "/about/camera-golden.jpg",
      width: 613,
      height: 721,
      alt: "Aseer holding a camera",
    },
    // Aseer's own 10-second Bohrscope teaser (October 2026), with his
    // sound. Web copy: 1600x900, H.264 CRF 24, AAC 128k; poster is the
    // sunset frame at 3.5 s.
    teaser: {
      src: "/about/bohrscope-teaser.mp4",
      poster: "/about/bohrscope-teaser.webp",
      label: "The Bohrscope teaser: shots from Aseer's films, a boat on a lake, a road, a sunset, a gull, a forest path and a silhouette by the sea, ending on the Bohrscope title.",
      caption: "Bohrscope teaser",
    },
    quote: "I've filmed a sunset on three different continents and once edited a short film on a moving train.",
    externalLink: {
      text: "Watch my films on Bohrscope",
      href: "https://aseer-films.vercel.app",
    },
    tags: ["Filmmaking", "Photography", "Travel", "Cricket", "Gaming", "Music"],
  },

  /**
   * From the CV and the career archive. RoboCarnival is worded exactly
   * as its case study words it (a vote by visiting high school students,
   * not an industry award). The scholarship is "100%" as the scholarship
   * letter states (Aseer, October 17, 2026).
   */
  recognition: {
    heading: "Recognition",
    lead: [
      { figure: "4.67", unit: "/ 5.0", title: "M.Sc. with Distinction", meta: "Tampere University · 2026" },
      { figure: "100%", unit: null, title: "Merit scholarship", meta: "Tampere University · 2024–26" },
    ],
    more: [
      {
        figure: "90",
        unit: "ECTS",
        title: "in one academic year, 50% above the standard load",
        meta: "Tampere University · 2025",
        href: null,
      },
      {
        figure: "2",
        unit: null,
        title: "competitive, fully funded Erasmus+ programs in France",
        meta: "ECIU University · 2026",
        href: null,
      },
      {
        figure: "Best Team",
        unit: null,
        title: "voted by visiting high school students at RoboCarnival",
        meta: "Tampere University · 2025",
        href: "/research/robocarnival",
      },
    ],
    links: [
      { label: "Certificates", href: "/certifications" },
      { label: "All five recommendations", href: "/testimonials" },
    ],
  },
} as const;

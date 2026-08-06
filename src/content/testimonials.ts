/**
 * Testimonials page content.
 *
 * Testimonials Redesign milestone: the original LinkedIn recommendation
 * screenshots (framerusercontent-hosted) are the proof of authenticity
 * and stay exactly as they were, same order, same images, still
 * viewable at full resolution via the shared Lightbox. What changes is
 * that the recommendation text itself is now transcribed here, verbatim
 * from each screenshot, so the page can present it as a readable card
 * (name, role, and quote) instead of asking a visitor to read paragraphs
 * of text rendered as an image. The screenshot becomes supporting
 * evidence behind a "View original" trigger rather than the only way to
 * read the recommendation.
 *
 * `text` is an array of paragraphs so multi-paragraph recommendations
 * (Anupam's) render as real paragraphs rather than one run-on block.
 * `title` is each person's LinkedIn headline, copied verbatim, which is
 * where company affiliation already appears for the people who listed
 * one ("CTO at Clickability...", "Lead UX designer at Synesis IT") --
 * not a separately invented field, since not everyone's headline
 * states a company and nothing here should be guessed. `context` is a
 * light rewording of LinkedIn's own relationship line (e.g. "Anupam
 * managed Md. Aseer directly") into third-person-omitted card meta
 * text, since the name is already the card's heading and repeating it
 * read redundant; the facts themselves (who managed whom, client vs.
 * teammate, the date) are unchanged from what LinkedIn recorded.
 *
 * Only correction made against the screenshots: none needed. All five
 * transcriptions below were read directly from clear, high-resolution
 * screenshots, not OCR'd from a lossy source, so there was nothing to
 * correct.
 */

export const testimonialsHeading = "Words from People I've Worked With";

export const testimonials = [
  {
    id: "l8YiCOwU55xIAxMblVsts6fA5A",
    width: 633,
    height: 412,
    name: "Anupam Samodder",
    title: "UX Design Lead | Proficient in User Experience (UX), Solution Design, and Product Management",
    context: "Managed Aseer directly (calls him by his nickname, Niloy) · October 27, 2024",
    text: [
      "I am pleased to recommend Niloy, with whom I had the privilege of working as his team manager in our Product Design team. Niloy has consistently demonstrated exceptional skills in UX design and has been instrumental in advancing our design system in Figma. His technical acumen, combined with a user-centric approach, made him an invaluable asset to our team.",
      "One of Niloy's standout contributions was his ability to identify and address critical design challenges. He proactively surfaced issues that impacted the product experience and user satisfaction, often bringing fresh insights into how we could optimize our designs. His attention to detail and keen understanding of user pain points greatly benefited our project outcomes and consistently enhanced our product quality.",
      "Beyond his technical expertise, Niloy's collaborative spirit has been a huge asset to our team. He was always willing to lend a hand across various UX fields, from research to prototyping, contributing meaningfully to each project phase. His dedication to ensuring a seamless user experience for our end-users has left a lasting impact on our team's approach to design.",
      "I am confident Niloy will continue to excel in any UX role he pursues, and I wholeheartedly recommend him for any future opportunities. He will be a tremendous asset to any team.",
    ],
  },
  {
    id: "SYFmJXJGL3nIyvv33Rvx7Yk0DA",
    width: 633,
    height: 357,
    name: "Tanvir Hossain",
    title: "CTO at Clickability (an InLoop Company) | Full Stack Software Engineer | Python, React, AWS",
    context: "Was Aseer's client · August 10, 2023",
    text: [
      "I had the privilege of collaborating with Aseer on a UI design project, and I'm genuinely impressed. Aseer's creative flair and attention to user experience resulted in captivating and user-friendly designs. Aseer has a remarkable ability to transform complex concepts into intuitive interfaces. His passion for design is evident in every pixel. An invaluable UI designer who brings both expertise and enthusiasm to the table.",
    ],
  },
  {
    id: "PK6UerUwwcFWrEBIFKRVDrhpZKc",
    width: 633,
    height: 331,
    name: "Tanvir Ahmed",
    title: "Transforming Workforce Engagement with SaaS | Ex-Uber",
    context: "Was Aseer's client · July 12, 2023",
    text: [
      "I highly recommend Aseer for his exceptional work on my website's UI design. His attention to detail, creativity, and technical expertise has greatly contributed to an outstanding user experience. His dedication to delivering high-quality results on time and excellent collaboration skills make him a valuable asset to any team. I'm confident that Aseer will continue to excel in his future endeavours.",
    ],
  },
  {
    id: "Rj4R8TvxUhp5Ak0rUrzdlPJbXc8",
    width: 506,
    height: 506,
    name: "Shihab Shajib",
    title: "Lead UX designer at Synesis IT",
    context: "Managed Aseer directly · July 12, 2023",
    text: [
      "I had the pleasure of working with Md. Aseer for 5-6 months at Kaz Software, where he was a UX+UI designer. He is a talented and creative UX/UI designer who always delivered high-quality work on time. He has a keen eye for detail and a strong sense of aesthetics, as well as a deep understanding of user needs and preferences. He was always eager to learn new skills and technologies, and constantly sought feedback and improvement. Md. Aseer was also a great team player, who collaborated well with other designers, and developers. He contributed to the success of many projects. I highly recommend Md. Aseer for any UX/UI design position, as he would be a valuable asset to any organization.",
    ],
  },
  {
    id: "AEuxR99ymS2qM3gHrdUHV8ydJg",
    width: 633,
    height: 356,
    name: "Arique Ahsan",
    title: "Frontend Engineer",
    context: "Worked with Aseer on the same team · July 12, 2023",
    text: [
      "I am delighted to recommend Md. Aseer Intiser as a UI/UX designer. I enjoyed working with him for six months and was consistently impressed by his intelligence, fast learning ability, and polite demeanor. His designs are visually appealing, and user-centered, and strike the perfect balance between aesthetics and functionality. His professionalism and collaborative nature make him a valuable asset to any team.",
    ],
  },
] as const;

export function testimonialImageUrl(id: string) {
  return `https://framerusercontent.com/images/${id}.png`;
}

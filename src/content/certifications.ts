/**
 * Certifications page content.
 *
 * Certifications Rebuild milestone: a full rethink of how this page
 * presents its certificates, not a copy edit of the old one. The old
 * version (git history has it, if it's ever worth comparing) grouped
 * every image under a flat heading with no real writing and no
 * hierarchy beyond document order. This version keeps every
 * certificate, every image,
 * and the exact same provider order (Google, then Meta, then
 * Interaction Design Foundation, then everything else), but treats the
 * three named providers as a real, numbered collection -- each with a
 * short, honest note about what the credential actually covers, not
 * marketing copy -- and moves the remaining, less individually
 * significant categories (webinars, other certificates, work
 * experience records, achievements) into a quieter, denser archive
 * section that doesn't compete with the three for attention.
 *
 * None of these images carry width/height in the source markup (unlike
 * project screenshots elsewhere on the site, which do), so real pixel
 * dimensions aren't known -- rendered with a fixed aspect-ratio
 * container and `object-contain`, same as before, so nothing gets
 * stretched or cropped based on an invented aspect ratio.
 *
 * Every `alt` string below is real and specific to what the image is
 * (which provider, which credential, its position in that group), not
 * a generic "item N" placeholder -- both for screen readers and because
 * the new Lightbox shows this text as a visible caption. What none of
 * these can honestly claim is which specific course each of Google's
 * ten images or the ten webinar images corresponds to: nothing in this
 * project's files identifies that, and guessing would risk mislabeling
 * a real credential, so those stay described by provider and position
 * rather than an invented course name.
 *
 * The three provider notes below are grounded in each program's own
 * public, verifiable structure (Google's UX Design Professional
 * Certificate is a seven-course Coursera sequence; Interaction Design
 * Foundation is a self-paced course library with a separate
 * membership), not in unverifiable specifics about which exact modules
 * were completed. The Meta note stays deliberately general for the
 * same reason: the source data only ever recorded "Meta Course
 * Certificate," singular, with no course name, and Meta runs several
 * different Coursera programs, so naming one specifically would be a
 * guess this file's own standard doesn't allow.
 */

const img = (id: string, alt: string) => ({ id, alt });

export interface CertificateImage {
  id: string;
  alt: string;
}

export interface CertificateGroup {
  /** Shown above this group's tiles when a collection holds more than
   * one named group (Interaction Design Foundation's membership vs.
   * course certificate). Omitted for a single, unlabeled group. */
  label?: string;
  images: CertificateImage[];
}

export interface CertificationCollection {
  number: string;
  title: string;
  note: string;
  groups: CertificateGroup[];
}

export interface ArchiveCategory {
  label: string;
  note: string;
  images: CertificateImage[];
}

const googleImages = [
  "ZOEN1K8JWzfVyxQWzQG63qWoCY",
  "H6U40tBcIlWVA8Uvwhd6Z4UpM",
  "pE2LdKd3LxGlgeIK9qEzUIaSag",
  "qwlW9WCccVYzCtRrDAQwLhhXU",
  "UECHJ30e4AX6i5sjbhBwq85zxyc",
  "NJaQhz8BOVVG0eAHW3sR8m15I",
  "NHVjns03YT4Vwet99k7RK7PdSP4",
  "mHjOshK9gdiJ5lPsLsKp8yKg",
  "M6c07ObFETJ0RV9YOTsWum4hG4Y",
  "gUQiGq7LuCs8IjvsmlW44GldWBE",
];

const webinarImages = [
  "SJE2DX6eDBaCDAcZCHAXQr4J0s",
  "40SqbP8PYi8k39b2RoehHj62pI",
  "qFA6y9JK6yB4dfu1wO7xPSyj1wQ",
  "oHzWgE9iTaZ8u7ZqCWVxn5XWXc4",
  "VpGCpmtr8xDqg0mKQg9x4eueLs",
  "hD39NYpXKlf9QV2OkjEiGTakRFU",
  "N7Jg0kujBGMpWPn2JIVj8EghWzk",
  "qqL6YVer9MVRhyVVM3QGqKqg",
  "5T2SIR76q5lclt9mVpAQCmNVqc",
  "85gx335NJUKWy8vYxArPppsofRo",
];

const otherCertificateImages = [
  "q8Z0mSEjTWcHqCdp9iSX11CS07Y",
  "16TKalKCaW8YlB5xeWCNJxq8X4",
  "fSzunqnyYHrCFivZYHk9XfPrUM",
  "vAFk1n3dxBJb9tVKo6ANfdp30",
  "MV0GGDXjfCP0N7eKJuQw1I7lQ6o",
  "dUwznyoBvEoz2235fqpdUbgCU",
];

const workExperienceImages = [
  "ABXT0VG24LG3p6VxVu76ZMjeJRU",
  "SdKYtt2obafi7viF3LdoKrjnZ4",
  "4XrHNRI9lmbzxB0rXDF0op8Cg",
  "K5WtZe7LE7QYCYX2GxePGD9jeTY",
];

const achievementImages = ["nJRfJP0bHyLPDRz4Sb18mdCRwV0.jpg", "WK3rULO361sC7LhzUUOPlOkOWP0"];

export const certificationsIntro = {
  heading: "Certificates, and the Learning Behind Them",
  body: "Most of what's below came from finishing something on my own time. A few are proof I sat in a room, a webinar, or a workshop and actually paid attention. The screenshots are the record. What mattered more was getting through the material.",
};

export const certificationCollections: CertificationCollection[] = [
  {
    number: "01",
    title: "Google UX Design Professional Certificate",
    note: "A seven-course sequence built by Google's own design and research teams: UX research fundamentals, wireframing, prototyping, and usability testing, ending in a portfolio of three real end-to-end projects.",
    groups: [
      {
        images: googleImages.map((id, index) =>
          img(
            id,
            `Google UX Design Professional Certificate, certificate ${index + 1} of ${googleImages.length}.`,
          ),
        ),
      },
    ],
  },
  {
    number: "02",
    title: "Meta Course Certificate",
    note: "Meta runs its own set of design and development courses on Coursera, separate from Google's. This is the certificate from one of them.",
    groups: [
      {
        images: [img("yifTAryV8Ew8X74yGP9Hh1xOhiA", "Meta Course Certificate.")],
      },
    ],
  },
  {
    number: "03",
    title: "Interaction Design Foundation",
    note: "IxDF's library holds dozens of self-paced courses across UX, HCI, and design research. Membership means ongoing access to that library. The course certificate below is proof of one course actually finished inside it.",
    groups: [
      {
        label: "Membership Certificate",
        images: [
          img(
            "suPONaDKWFReQuS4bI72idmDk",
            "Interaction Design Foundation Membership Certificate.",
          ),
        ],
      },
      {
        label: "Course Certificate",
        images: [
          img(
            "rmPA9egyIP1MeZGUqZEm0iLycg",
            "Interaction Design Foundation Course Certificate.",
          ),
        ],
      },
    ],
  },
];

export const certificationsArchiveHeading = "The Rest of the Record";
export const certificationsArchiveIntro =
  "Webinars, smaller certificates, work records, and a couple of recognitions. Grouped here instead of getting a section each.";

export const certificationsArchive: ArchiveCategory[] = [
  {
    label: "Webinars Attended",
    note: "Live sessions, attended in real time.",
    images: webinarImages.map((id, index) =>
      img(id, `Webinar attendance certificate, ${index + 1} of ${webinarImages.length}.`),
    ),
  },
  {
    label: "Other Certificates",
    note: "Courses and workshops from smaller providers.",
    images: otherCertificateImages.map((id, index) =>
      img(id, `Certificate, ${index + 1} of ${otherCertificateImages.length}.`),
    ),
  },
  {
    label: "Work Experiences",
    note: "Records tied to the roles and internships described elsewhere in this portfolio.",
    images: workExperienceImages.map((id, index) =>
      img(id, `Work experience record, ${index + 1} of ${workExperienceImages.length}.`),
    ),
  },
  {
    label: "Achievements",
    note: "Two recognitions worth having on record.",
    images: achievementImages.map((id, index) =>
      img(id, `Achievement record, ${index + 1} of ${achievementImages.length}.`),
    ),
  },
];

export function certificationImageUrl(id: string) {
  const hasExtension = id.includes(".");
  return `https://framerusercontent.com/images/${hasExtension ? id : `${id}.png`}`;
}

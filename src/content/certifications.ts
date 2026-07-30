/**
 * Certifications page content, migrated from the live aseer.design
 * /certifications page (Milestone 2). The live page is almost entirely
 * images with section headings and no body copy to extract -- there's
 * nothing to migrate here except the images and their groupings.
 *
 * None of these images carry width/height in the source markup (unlike
 * project screenshots elsewhere on the site, which do), so real pixel
 * dimensions aren't known. Rendered with next/image's `fill` + a fixed
 * aspect-ratio container + object-contain rather than guessed
 * width/height values, so nothing gets stretched or cropped based on an
 * invented aspect ratio.
 */

export const certificationSections = [
  {
    heading: "Google UX Design Specialization",
    images: [
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
    ],
  },
  {
    heading: "Meta Course Certificate",
    images: ["yifTAryV8Ew8X74yGP9Hh1xOhiA"],
  },
  {
    heading: "Interaction Design Foundation Membership Certificate",
    images: ["suPONaDKWFReQuS4bI72idmDk"],
  },
  {
    heading: "Interaction Design Foundation Courses Certificates",
    images: ["rmPA9egyIP1MeZGUqZEm0iLycg"],
  },
  {
    heading: "Webinars Attended",
    images: [
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
    ],
  },
  {
    heading: "Other Certificates",
    images: [
      "q8Z0mSEjTWcHqCdp9iSX11CS07Y",
      "16TKalKCaW8YlB5xeWCNJxq8X4",
      "fSzunqnyYHrCFivZYHk9XfPrUM",
      "vAFk1n3dxBJb9tVKo6ANfdp30",
      "MV0GGDXjfCP0N7eKJuQw1I7lQ6o",
      "dUwznyoBvEoz2235fqpdUbgCU",
    ],
  },
  {
    heading: "Work Experiences",
    images: [
      "ABXT0VG24LG3p6VxVu76ZMjeJRU",
      "SdKYtt2obafi7viF3LdoKrjnZ4",
      "4XrHNRI9lmbzxB0rXDF0op8Cg",
      "K5WtZe7LE7QYCYX2GxePGD9jeTY",
    ],
  },
  {
    heading: "Achievements",
    images: ["nJRfJP0bHyLPDRz4Sb18mdCRwV0.jpg", "WK3rULO361sC7LhzUUOPlOkOWP0"],
  },
] as const;

export function certificationImageUrl(id: string) {
  const hasExtension = id.includes(".");
  return `https://framerusercontent.com/images/${hasExtension ? id : `${id}.png`}`;
}

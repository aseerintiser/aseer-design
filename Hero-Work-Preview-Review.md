# Hero Work-Preview Investigation

Scope: the homepage hero only, evaluating one specific idea (reusing existing project assets to build a curated work preview on the hero's right side) against the site's own established values and against real, directly-checked precedent. Nothing implemented. This is a review document only.

This picks up directly from `Hero-Composition-Review.md`. That review found the hero's left-heavy appearance to be a real, structural problem (three compounding width caps, none of which reached the container edge) and recommended Option C: lock the hero to an explicit column span inside the site's own grid. That fix is now live. This document does not revisit whether C was correct. It answers a narrower question: now that the proportion is intentional rather than accidental, should something visual occupy the right side, built only from assets that already exist in this repository?

---

## 1. What's actually in the asset inventory

Every project thumbnail currently used on the site, read directly from `src/content/projects.ts` and checked live on `/work` and `/research`:

- **Convay Mobile App Revamp** (flagship): a polished phone-bezel triptych, framer-hosted GIF, 1600x1200. The most "hero-ready" single asset in the set.
- **Convay AI for Physical Meetings** (flagship): another framer-hosted GIF, same triptych treatment.
- **Convay Design System**: a local `.mp4` screen recording, 1100x826.
- **FitVibe**, **TravelMate AI**, **Convay Notifications**: framer-hosted GIFs, similar triptych or screen-grid treatment. TravelMate is close to Convay Mobile in polish.
- **Lumi** (flagship, research): a local `.mp4` screen recording of a conversational AI interface, 723x542. This is the site's flagship research project, and its subject (trust in human-AI interaction) is the exact phrase used in the hero's own headline.
- **Cultural Festival Platform (Arenberg)**: a local `.mp4` screen recording, 1100x826.
- **RoboCarnival**: a real photograph, 1915x1072, the only non-UI asset in the set.
- **Game Difficulty**: a custom illustration/chart, 2000x1500, not a UI screenshot at all.

The honest finding here: this is not a stylistically unified asset library. It's a mix of glossy phone-mockup GIFs, flatter screen recordings, one real photo, and one illustration, produced at different times for different purposes (case study headers, not hero composition). Any solution that assumes these can be dropped into a hero as a cohesive set needs to reckon with that inconsistency directly, not gloss over it.

## 2. What real, comparable sites actually do

Checked live, not from memory or from generic listicles:

- **emilkowal.ski** (Emil Kowalski, Linear, ex-Vercel): no imagery at all. Small, centered, text-only.
- **rauno.me** (Rauno Freiberg, Vercel): no work-preview imagery in the hero. The hero is a literal interactive desktop metaphor, not a portfolio composition.
- **landay.org** (James Landay, Stanford HCI/HAI): a real photograph of the person, full-bleed, split 50/50 with text.
- **alexandraion.com** (Alexandra Ion, CMU HCII): a real photograph, full-width banner, text centered below it.
- **ideo.com** (IDEO): real documentary and environmental photography, not UI screenshots or product mockups.

Across all five, the pattern is consistent and worth stating plainly: none of them balance a hero with a curated arrangement of UI screenshots or app mockups. When they use imagery, it's real photography of a person or a place. When they don't, they stay text-only and lean on smallness and margin rather than trying to fill the space.

I looked for a counter-example, a respected individual designer or researcher whose hero does use a device-mockup or screenshot collage, and could not find one I could verify directly. Generic template marketplaces and portfolio-building guides do recommend device mockups in heroes, but that's a broad-market convention, closer to junior and agency portfolio templates, not something I found in the specific tier of sites this project has been benchmarking against throughout. I'm noting that gap honestly rather than filling it with an unverified example.

## 3. Answering the seven questions directly

**Would introducing a work preview into the hero genuinely improve the portfolio?**
Only conditionally, and the condition is narrow. A single, disciplined, thematically justified image could add something real. A collage or multi-asset arrangement, given the stylistic inconsistency documented in Section 1, is more likely to read as assembled-after-the-fact than curated.

**Would it strengthen or weaken the editorial aesthetic?**
Real risk of weakening it. The hero's current strength is that it's quiet and typographic. Every one of the five directly-checked benchmarks that shares that restraint either stays text-only or uses one calm photograph, never a busy multi-image arrangement. A grid of colorful app screenshots next to a serif headline is a genuine tonal shift, toward a more conventional agency-portfolio read.

**Would recruiters understand capabilities faster?**
For pure visual craft, somewhat, a glance at a polished screen tells a recruiter "this person ships real product." But that's only half of what this site is trying to prove. A UI-screenshot collage says nothing about the research half of the identity unless it's chosen specifically to.

**Would it strengthen positioning as both Product Designer and HCI Researcher?**
Not by default, and this is the most important finding in this document. Most of the available assets (Convay, FitVibe, TravelMate, Notifications) are pure product work. Mixing product screens with research assets (Lumi, RoboCarnival, the Game Difficulty illustration) in one arrangement would be visually incoherent, different palettes, different aspect ratios, different production values, exactly the kind of "random assortment" the brief said to avoid. The one asset that genuinely serves both halves at once is Lumi: it's a real, polished UI, and it's also the flagship research project whose subject, trust in human-AI interaction, is the literal language already in the hero's headline. No other asset in the inventory does double duty like that.

**Does it improve visual balance without feeling decorative?**
Only if restricted to exactly one asset, shown small and quiet rather than as a marketing-style showcase, and only if it's tied to something the text is actually saying at that moment. Anything with more than one image, or any full-color, full-size treatment of an existing GIF exactly as it appears in a case study, reads as decoration, not composition.

**Is there a better solution neither of us has considered?**
One worth naming: instead of a "preview" (a whole screen, a mockup, a collage), a single tightly cropped detail, a fragment of one real interface rather than the whole thing, treated quietly (small scale, reduced color, sitting like a specimen rather than a screenshot). This isn't in the original list of examples, and it's a genuinely different move: it shows craft at the level of a detail rather than asking a whole app screen to represent the whole portfolio. It's also not unprecedented within this project. An earlier milestone's `Design-Showcase-Proposal.md` already explored a "zoomed-in real detail" visual language for a dedicated Craft page; this would be the one place that same idea could plausibly extend into the hero, using an existing asset, without inventing a new visual system from scratch.

**If something belongs on the right side, what should it actually be?**
See the ranked recommendation below.

## 4. Ranked options

**1. Nothing. Hold the current grid-locked, text-only hero as the final state.**
*Rationale:* every directly-verified precedent that shares this site's restraint does exactly this, either no imagery or one calm photograph, never a UI-preview arrangement. The right side's emptiness is now proportional and intentional, not accidental, because Option C already fixed the actual structural cause.
*Advantages:* zero production work, zero risk to the dual-audience positioning, matches the site's own established "less but better" direction, ages well rather than chasing a trend.
*Disadvantages:* doesn't resolve the qualitative feeling that the right side is "inactive." That feeling may simply be a correct property of a restrained hero rather than a defect, but it's fair to note this option doesn't manufacture activity to answer it.
*Precedent:* emilkowal.ski, rauno.me.
*Confidence:* High.

**2. A single, quietly treated detail from Lumi, tied directly to the headline's own claim about trust and human-AI interaction.**
*Rationale:* this is the one asset in the inventory that represents both halves of the identity at once, and placing it next to the exact sentence it illustrates gives it a real, non-decorative reason to exist.
*Advantages:* thematically load-bearing rather than filler; reinforces the research side of the identity, which a generic product screenshot would not; uses an existing asset, no new creation, only a crop or still-frame extraction.
*Disadvantages:* needs real restraint to execute correctly, small scale, muted color, no autoplay competing with the headline's own kinetic motion, or it will look exactly like the decorative screenshot this review is arguing against. A small amount of new treatment work (cropping, a still export) is required, which brushes against the "no new assets" constraint even though it draws entirely from existing footage.
*Precedent:* none of the five benchmarks does this exact move; this is a reasoned original direction, not a copied pattern, grounded in this site's own headline copy and its own prior Craft-page thinking.
*Confidence:* Medium. Strong on paper, but whether it reads as restrained rather than decorative is a judgment that needs to be seen built.

**3. A single featured project preview, used as-is (Convay Mobile or TravelMate triptych).**
*Rationale:* the highest-polish, lowest-effort option, since these assets are already production-ready.
*Advantages:* zero new production; immediately legible as "real, shipped work."
*Disadvantages:* purely product-facing, does nothing for the research half of the identity; a bright, busy phone-mockup image sitting next to restrained serif type risks the tonal clash flagged in Question 2.
*Precedent:* not found among the benchmarked sites; closer to a general portfolio-template convention than to this project's specific peers.
*Confidence:* Medium-low.

**4. A premium, purpose-built device mockup assembled from existing screens.**
*Rationale:* could look more considered than reusing a case-study asset directly.
*Disadvantages:* "assembled" means new production work (compositing, staging), which conflicts with the explicit constraint against requiring new design assets; highest effort for a benefit that options 2 and 3 already capture more cheaply.
*Confidence:* Low.

**5. An editorial collage or layered arrangement of multiple project thumbnails.**
*Disadvantages:* this is where the Section 1 inconsistency becomes disqualifying. The existing assets don't share a visual language, palette, or aspect ratio; combining several as-is would look assembled rather than curated, and making them cohere would require exactly the new asset production the brief rules out.
*Precedent:* not found among any of the five benchmarked sites.
*Confidence:* Low.

**6. A slow crossfade or animated preview cycling between projects.**
*Disadvantages:* competes directly with the hero's existing `KineticHeadline` word-stagger animation for attention; adds `prefers-reduced-motion` and performance considerations; hardest of all options to judge without a working build, and the previous review already flagged motion as the highest-risk category for this exact reason.
*Confidence:* Low.

## 5. Recommendation

**Hold at Option 1: no visual addition.** Keep the grid-locked, text-only hero as it stands today.

Weighed against the brief's own evaluation criteria: it's the most professional and most restrained choice, and the only one with zero risk to the credibility of either audience. It preserves visual balance without introducing anything decorative, since the balance now comes from Option C's grid-locked proportion rather than from filling the space with an image. It doesn't advantage industry positioning over academic positioning or the reverse, because it doesn't lean on any single project. And it's the option most likely to still look right in five years, since it isn't borrowing a convention (device-mockup heroes) that belongs to a different, more template-driven tier of portfolio than the one this site has been built to sit alongside.

That said, Option 2 (a single, quiet Lumi detail tied to the headline's own language) is the one genuine exception worth taking seriously if, once seen live, the current hero still feels like it's withholding rather than composing. It's the only visual direction in this document that's thematically justified rather than decorative, and it's the only one that actually strengthens the dual Product Designer and HCI Researcher identity instead of narrowing it. If a visual is ever added here, it should be this one, not a collage, not a generic device mockup, and not a straight reuse of an existing case-study GIF at full color and full size.

No changes have been made to the homepage or any other page. Waiting for approval before touching the hero.

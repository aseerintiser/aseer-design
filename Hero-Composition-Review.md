# Hero Composition & First Impression Review

Scope: the homepage hero only (`src/app/page.tsx`, lines 30-120, plus the `Section`/`Container`/`Grid` primitives it sits inside). No other page reviewed. Nothing implemented; this is a review document only.

Reviewed live at [aseer-design.vercel.app](https://aseer-design.vercel.app), screenshotted at a real wide-desktop viewport, and cross-checked against the source (`page.tsx`, `Container.tsx`, `Section.tsx`, `Grid.tsx`, `globals.css`) for the exact numbers behind what's on screen.

---

## 1. Critique of the current hero

The hero is one left-aligned column: an eyebrow, a two-line display headline, a bio paragraph, a skill-line list, and two buttons. Three width caps govern it, nested inside each other:

- The page `Container` caps at `max-w-7xl` (1280px).
- The hero's own wrapper caps the eyebrow and headline at `max-w-6xl` (1152px).
- The bio, skill lines, and buttons cap further at `max-w-[var(--measure)]`, which resolves to `42rem` (672px), a deliberate, correct reading-width limit for body text.

On a real wide-desktop viewport, this produces a hero where the tallest, boldest element (the headline) doesn't reach its own 1152px cap because the sentence itself isn't long enough at that type size, and everything beneath it stops at 672px. The result, confirmed live: a dense, well-set block of text pinned to the left third of the screen, and a large, uninterrupted quiet field to its right with nothing in it. No rule, no grid line, no secondary element, nothing that explains why the page stops there.

Typographically and editorially the hero is strong. The headline reads clean, the bio is specific rather than generic, the skill-line row is a legible scannable device, and the two CTAs are clearly hierarchized (primary/secondary). None of that is in question here. The question is only what happens around it.

## 2. Is the imbalance real, or only perceived?

Real. Three independent checks all point the same way, not just a visual hunch:

**It's structural.** The three width caps above compound. Even in the best case (a visitor on a 1280 to 1920px+ screen, which is most desktop traffic for a portfolio being sent to hiring managers and researchers), the widest thing in the hero stops well short of the container's own edge, and the container itself is centered in a viewport that's wider still. There's no scenario at typical desktop widths where the current hero fills its available space.

**It's inconsistent with the rest of the page.** `Grid.tsx` implements the site's 12-column system and its own comment states the design intent directly: *"the Creative Direction calls for controlled asymmetry (unequal-width blocks, full-bleed breaks) rather than a rigid, always-even split."* The two sections immediately below the hero (`Design`/`Research` track split, `Featured work`/`Featured research`) both honor that: they use the shared `Grid` component with two `col-span-6` blocks that together span the full container width. The hero is the one section on this page that doesn't participate in that system at all. It's not asymmetric by design, it's just narrower than everything else with no explanation. A reader's eye has already been trained by the rest of the page that content fills the grid; the hero breaks that pattern first, before anything else has taught them to expect otherwise.

**It's inconsistent with the sites it's benchmarked against.** Four real, currently-live sites were checked directly (not just described from memory):

- [emilkowal.ski](https://emilkowal.ski): Emil Kowalski, design engineer on Linear's web team, previously Vercel's design team. The only genuinely text-only hero of the four: name, title, a short paragraph, links. It's set in a narrow, small-scale column that sits with roughly *symmetric* margins left and right, closer to centered than left-docked, and the whitespace is generous on all four sides, not just one. Nothing tries to fill the viewport width; the smallness itself is the point.
- [rauno.me](https://rauno.me): Rauno Freiberg, Staff Design Engineer at Vercel. Not a conventional hero at all (a draggable desktop-OS metaphor with app-icon cards scattered across an open gray canvas). Not directly comparable to a content hero, but a useful data point that even this site's confident use of open space is a deliberate *system* (literal desktop wallpaper), not a leftover.
- [landay.org](https://landay.org): James Landay, Stanford HCI/Stanford HAI. Uses a real photograph in a full-bleed 50/50 split with the text block, the opposite move from "leave it empty."
- [alexandraion.com](https://alexandraion.com): Alexandra Ion, CMU HCII. A full-width banner photo, then a centered (not left-docked) text column below it, margins symmetric on both sides.

None of the four leaves one side of the viewport as a static, unexplained void while content sits docked to the other side. They either fill the space (Landay), or they center the column so leftover space is symmetric and reads as margin (Kowalski, Ion), or the openness is itself a literal, systemic part of the interaction model (Freiberg). The current hero does none of these: it's asymmetric, left-docked, and the size of the gap is an accident of how long the headline sentence happens to be, not a value anyone chose.

Worth being direct about the gap in this research: Apple, Google, and Microsoft don't have a real tradition of individual designers running public portfolio sites the way startup/design-engineering culture does (Figma, Linear, Vercel, Stripe, Notion). I looked; I'm not going to cite something I couldn't actually verify. The four sites above are the genuine, checked comparanda.

## 3. What causes it

1. **Left-alignment with no counterweight**, inside a container that keeps growing as the viewport does. The gap isn't fixed, it gets larger, unpredictably, the wider the screen.
2. **Three compounding width caps** (7xl to 6xl to 42rem) that are each individually reasonable (a correct reading-measure for body text is good practice) but were never reconciled against each other as a single composition.
3. **No hero-specific device.** Every other section on this page has one: the track-split section has ghost "01"/"02" numerals and a filled two-up grid; the featured-work section has numbered labels and a filled grid; even the closing status line gets a centered, dense treatment. The hero, structurally, is the plainest section on the page, which is the opposite of what a hero should be.
4. **This has been partially addressed twice already, at the parameter level, not the structural level.** The Homepage Finalization milestone removed the portrait (correctly: see `page.tsx`'s own comment, a photo the size of the headline competed with the work itself, and benchmarked poorly against Linear/Stripe/Vercel/Notion). The Homepage Writing Finalization milestone widened the wrapper from `max-w-4xl` to `max-w-6xl` specifically because "the hero only fills half the screen" was flagged before. Both were the right calls individually, but both only tuned a number inside the same single-column, no-counterweight architecture. That architecture itself has never been reconsidered, which is exactly what this milestone is for.

## 4. Possible solutions

**A. Leave the composition unchanged.**
Text-only heroes are legitimate (Kowalski's proves it), and this exact layout has already survived two prior review passes.
*Pros:* zero risk, zero cost, already deliberate twice over.
*Cons:* doesn't resolve the specific problem found above. The hero is still the one section on the page that doesn't fill its grid, and the gap still doesn't match any of the four benchmarked patterns (none of which leave an unexplained one-sided void). Keeping it "because it's minimal" is exactly the trap this milestone's brief warns against.

**B. Center the hero column instead of left-aligning it.**
Matches the one directly-comparable precedent found (Kowalski): symmetric margins instead of a one-sided gap.
*Pros:* closest match to the strongest real benchmark; the leftover space immediately reads as margin, not accident, because it's the same on both sides.
*Cons:* every other element on this site, nav wordmark, every heading and paragraph in every case study, the footer, is left-aligned. Centering only the hero fixes one inconsistency (hero vs. empty space) by introducing another (hero vs. every other section's alignment). Also changes the reading feel from editorial to more "poster/statement," which may not fit the site's analytical, HCI-adjacent tone.

**C. Lock the hero to an explicit column span in the site's own 12-column grid** (e.g., the text occupies a fixed span such as 8 of 12 columns, with the remainder left as a deliberate, grid-anchored margin) instead of an ad hoc `max-w` cap.
*Pros:* directly fixes the root cause identified in Section 3. The gap stops being "however long the sentence happens to be" and becomes a chosen proportion, locked to the same `Grid` component the track-split and featured-work sections already use below it. This is literally what the codebase's own design brief calls "controlled asymmetry," quoted directly in `Grid.tsx`. Keeps left-alignment, so it doesn't fight the rest of the site. No new visual element, so it can't drift into decoration for its own sake. Smallest, lowest-risk, most surgical change of the group.
*Cons:* doesn't add visual interest. On very wide monitors there's still real empty space, just now a proportional, intentional one instead of an accidental one. Whether "intentional emptiness" alone is enough to feel confident rather than sparse is a craft judgment that benefits from actually looking at it built, not just reasoned about on paper.

**D. Add a quiet, non-photographic supporting mark in the right-hand space,** e.g., extending the same oversized ghost-numeral device already used for "01"/"02" in the track-split section up into the hero, or a very low-contrast typographic/graphic accent tied to the content.
*Pros:* gives the right side genuine weight without reintroducing photography or competing with the headline; reuses a device the site already trusts elsewhere, so it would read as consistent rather than novel; can be made quiet enough not to undercut restraint.
*Cons:* highest execution risk of the group. A ghost numeral makes sense in the track-split section because it's literally numbering two things; the hero isn't a numbered item, so reusing that device there needs a genuinely good reason, not just "it worked below." This is the option most exposed to the brief's explicit warning ("do not add elements simply to fill space") and the one most likely to need a second design pass to get right.

**E. Add subtle motion into the right-hand space** (a slow, low-opacity kinetic detail, a scroll- or cursor-reactive element).
*Pros:* motion can justify occupying space in a way static emptiness can't, and the site already has a "considered motion throughout" standard (`KineticHeadline`, `Reveal`, `Stagger`) this would extend.
*Cons:* real risk of feeling like decoration rather than purpose if not tied to something the content actually means; adds `prefers-reduced-motion` and performance considerations; hardest of the five to evaluate without a working prototype, and the most expensive to get wrong.

## 5. Recommended approach

**C, as the primary fix.** Replace the ad hoc `max-w-6xl` / `max-w-[var(--measure)]` caps with an explicit column span inside the site's existing `Grid` component, so the hero's proportions are chosen and grid-locked instead of incidental.

Hold D in reserve, not as part of this pass. If the hero still reads as sparse rather than confident once C is actually built and looked at, a real judgment call that's hard to make from a document, extending the ghost-numeral device into the hero is the next thing worth trying, specifically because it's the only other option that doesn't reopen the portrait question or contradict either of the two prior, deliberate decisions already made on this exact hero.

## 6. Why this is the strongest solution

It's the only option that fixes the actual, verified cause rather than a symptom. Section 3 identifies the problem as the gap being *unpredictable and ungoverned*, not simply "too big." C is the only option that turns it into a chosen, named proportion. Every other option either leaves that root cause untouched (A), trades it for a different inconsistency (B, against the site's own left-aligned convention elsewhere), or adds new surface area and risk before the simpler fix has even been tried (D, E).

It's also the option most consistent with this site's own stated design principles, not an external opinion imposed on it. `Grid.tsx`'s own comment calls for "controlled asymmetry... rather than a rigid, always-even split." C is that principle applied to the one section that currently isn't using it. It doesn't reopen either of the two decisions already made deliberately on this hero (no portrait, no arbitrary width bump); it replaces the mechanism underneath them with one that's legible as a decision rather than a leftover.

And it keeps the door open honestly. If a grid-locked asymmetric column still doesn't feel confident once it's real, that's useful information: it would mean the fix genuinely needs a supporting mark (D), not that D should be reached for now on the assumption that C alone won't be enough.

## 7. Confidence level

**High**, that the imbalance is real, not perceived. This isn't resting on one opinion: it's a measured fact about the nested width caps, a direct comparison against the rest of this exact page's own grid usage, and a check against four real, currently-live sites, none of which produce the same one-sided static gap.

**Medium**, that C alone, without D, is sufficient to make the hero feel fully confident rather than merely "correctly proportioned." The reasoning for C over B, D, and E is solid, but whether a grid-locked margin reads as intentional *enough* on a real wide monitor is a craft judgment that's more reliable looking at an actual build than a document. That's exactly why D is held in reserve rather than bundled in now, and why this document stops at a recommendation rather than an implementation.

---

No changes have been made to the homepage or any other page. Waiting for approval before touching the hero.

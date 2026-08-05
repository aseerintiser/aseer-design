# Hero Design Review: Should Anything Be Added to the Right Side?

Scope: the homepage hero only. Nothing implemented. This is a review and recommendation document.

This is the third review pass on this exact hero. For continuity, not repetition: `Hero-Composition-Review.md` established that the hero's proportions were structurally ungoverned (three uncoordinated width caps) and recommended locking it to the site's 12-column grid; that fix was built, looked worse live than the simpler `max-w-6xl` wrapper it replaced, and was reverted. `Hero-Work-Preview-Review.md` then asked narrowly whether existing project screenshots could fill the right side, and concluded no, recommending restraint with one exception (a single quiet Lumi detail) held in reserve. This document does not re-litigate either of those. It starts fresh on a different question: given everything now known, including two real, built-and-reverted experiments, would a genuinely new kind of visual or motion element, not a screenshot, not a grid fix, improve this hero, or is restraint still the correct call once every reasonable alternative has actually been generated and stress-tested?

---

## 1. Is the emptiness intentional, or does it feel incomplete?

Both, depending on who's looking, and that split is the actual finding worth stating plainly.

**Structurally, it's no longer an accident.** The hero sits in a single left-aligned column capped at `max-w-6xl` (1152px) inside a 1280px container, with body copy further capped at a 672px reading measure. That's a real, considered proportion now, not the leftover of an uncoordinated set of width caps (that specific problem was diagnosed and, as much as it's fixable without a grid rebuild, addressed in the first review). A visitor is not looking at a layout bug.

**Perceptually, it can still read as incomplete**, and there's a real reason for that, not just an aesthetic preference: every other section on this exact page has a device that explains its own negative space. The track-split section has oversized ghost numerals sitting in what would otherwise be empty margin. The featured-work section has numbered labels doing the same job. The hero is the one section with nothing performing that role, so a first-time visitor's eye, trained by scrolling past two sections that do fill their space with *something*, arrives at the hero first and has no equivalent cue there. That's a real, specific, fixable observation, distinct from "the hero has whitespace," which on its own is not a problem.

**Is this a defect or a legitimate editorial choice?** Both are defensible in the abstract; a text-only hero with generous, unexplained margin is a real, respected pattern (Emil Kowalski's site proves it works, checked directly in the first review). But it's not *this site's* established pattern; it's this site's one exception to a pattern it uses everywhere else on the same page. That inconsistency, not the emptiness itself, is the actual thing worth solving, if anything is solved at all.

## 2. What two real, built experiments already say

This project has now tried two structural changes to this hero and reverted one of them after seeing it live. That's not a hypothetical data point, it's the most reliable evidence available, more reliable than any amount of reasoning on paper: grid-locking the column (Option C) made the right side feel *more* static and *more* noticeably empty than the simpler `max-w-6xl` cap it replaced, not less. Whatever is added or changed here has now failed once in practice for a plausible-sounding reason that didn't hold up when built. That should raise the bar for any new proposal in this document: it needs a reason to expect a different outcome, not just a different mechanism.

## 3. What the benchmarked peer sites still say

Repeating only the conclusion, not the research (already documented twice): among every real, directly-checked site in this portfolio's actual peer tier (Kowalski at Linear, Freiberg at Vercel, Landay at Stanford HCI, Ion at CMU HCII, IDEO), none fill hero whitespace with a decorative graphic, animation, or data-visualization device. They either stay quiet and let smallness be the point, or they use real photography of a person or place. Nobody in this specific tier reaches for a kinetic system, an abstract diagram, or an interactive canvas to solve "the right side feels empty." That's a real constraint on this document's ideation, not a formality: any concept below that wouldn't plausibly appear on one of those five sites is starting from a deficit, and needs to earn its place on stronger grounds than "it looks considered."

---

## 4. Concepts

Eight options, including the baseline. Each evaluated on the same eleven points.

### Concept 0: Keep the hero exactly as it is

- **Why it exists:** the null hypothesis. Included because the brief requires weighing every option against genuinely doing nothing, not assuming something must be added.
- **Message communicated:** confidence without needing to prove it visually; the work and the writing carry the page.
- **Interaction behaviour:** none.
- **Animation behaviour:** none beyond what's already there (the existing one-time `KineticHeadline` word-stagger and the 0.35s-delayed `Reveal` for bio/skills/CTAs).
- **Implementation complexity:** none, this is the current state.
- **Accessibility considerations:** already fully solved; nothing to add or break.
- **Maintenance cost:** zero.
- **Performance impact:** zero, already the lightest possible hero.
- **Risk:** the only risk is reputational/subjective, that it reads as unfinished to a visitor who doesn't share the site's own editorial logic. Real but unmeasurable.
- **Strengths:** zero cost, zero risk of a third reverted experiment, matches the specific peer tier's real convention, ages indefinitely (nothing to look dated in two years), doesn't privilege one project or one half of the dual identity over the other.
- **Weaknesses:** doesn't resolve the one real, structural observation from Section 1 (the hero is the only section on this page without a device explaining its own negative space). Scores weakest of all eight options on memorability specifically, a plain, well-set text hero is good, but it's also the single most common shape a serious portfolio hero takes, so it doesn't on its own make this one stick in a reviewer's memory after the tab closes.

### Concept 1: Ghost-type word echo

- **Why it exists:** every other section on this page already uses an oversized, ultra-low-opacity typographic mark (the "01"/"02" ghost numerals in the track-split section) to give its own negative space a reason to exist. The hero is the one section that doesn't. This applies that exact, already-trusted device to the hero instead of inventing a new one.
- **Message communicated:** one real word already central to this site's own positioning, most plausibly **TRUST**, since it's the literal throughline stated in the homepage tagline, the footer heading ("Let's build something worth trusting"), and the About page's "What Drives Me" section, rendered enormous and almost invisible in the right-hand field. Not a decoration; a watermark of the one idea the whole site keeps returning to.
- **Interaction behaviour:** none. Static.
- **Animation behaviour:** none, or at most a fade-in synced to the existing 0.35s `Reveal` timing, so it arrives with the rest of the hero rather than as its own separate moment.
- **Implementation complexity:** low. Pure typography and CSS opacity; the `Heading` component and the site's existing Fraunces display face already support this without new components or assets.
- **Accessibility considerations:** must be `aria-hidden` (it's decorative, not content, and a screen reader announcing a giant background word after the real headline would be actively confusing); zero motion beyond an optional fade means `prefers-reduced-motion` is trivial to satisfy; needs a contrast/opacity check so it never approaches readable-text contrast against the background, since that would make it compete with or be mistaken for real content.
- **Maintenance cost:** effectively zero, it's a string constant, not an asset that can go stale or need re-exporting.
- **Performance impact:** negligible, no images, no video, no additional JavaScript beyond what the page already ships.
- **Risk:** the honest risk is that an oversized low-opacity background word is, on its own, a fairly common device across design portfolios generally, so its novelty comes entirely from being *this site's own established device reapplied*, not from being externally precedented. None of the five benchmarked peer sites use this pattern in their hero.
- **Strengths:** lowest execution risk of every "add something" option in this document; zero new asset production; directly reuses a device already approved and live one section below; the word itself is genuine, repeated, load-bearing site language, not an invented label; doesn't touch the portrait question or the width-cap question already settled twice.
- **Weaknesses:** not benchmark-validated the way the current text-only hero is; the win is entirely internal-consistency (matches the rest of this page) rather than external-precedent (matches this portfolio's peer tier); a visitor with no context for "01"/"02" below won't necessarily read this as "the same device," so some of its justification is legible mainly to someone already sold on the site's own internal logic.

### Concept 2: Trust-calibration diagram

- **Why it exists:** the single most specific, differentiated fact about this portfolio is that its research half investigates a precise question, how design should help someone calibrate trust in an AI system rather than default to blind trust or blanket suspicion (Lumi's actual research question, already stated on the About page). A quiet, abstract line diagram could visualize that concept directly instead of only stating it in prose.
- **Message communicated:** "the research behind this work is a real, specific inquiry, not a buzzword," shown rather than claimed.
- **Interaction behaviour:** none required; could optionally highlight on hover, but a static diagram is the safer, more restrained default.
- **Animation behaviour:** at most, the line drawing itself in once on load (an SVG stroke-dashoffset reveal), synced to the existing entrance timing.
- **Implementation complexity:** medium. A custom SVG component, careful axis/label typography matching the site's existing type system, and real design judgment to keep it from reading as a generic "chart."
- **Accessibility considerations:** must not present as a real data visualization with implied real numbers (nothing here is measured data, and labeling it as if it were would cross into the kind of overstated claim this whole project's own constitution rules out); needs a text alternative or `aria-hidden` plus the same information already stated in prose nearby, since a screen reader has no useful way to consume an abstract line drawing.
- **Maintenance cost:** low once built, but it's a bespoke component, not reused anywhere else, so it's the one piece of this hero that exists nowhere else on the site and would need its own upkeep if the underlying research framing ever changed.
- **Performance impact:** low (a small inline SVG), but not zero the way pure typography is.
- **Risk:** the highest "looks generic if not executed perfectly" risk in this document. An abstract axis-and-curve diagram is one bad execution away from looking exactly like the "elegant data visualization" stock-template pattern this brief already warned against, precisely because it's trying hardest to look meaningful.
- **Strengths:** the most specific, differentiated message of any concept here, directly tied to the one real research question that separates this portfolio from a generic UX portfolio; genuinely shows rather than tells.
- **Weaknesses:** highest execution risk and highest complexity of any concept in this document; no benchmarked peer site does anything like this in a hero; conflicts with the site's own established rule that the headline is "the one kinetic-motion moment on the page", introducing a second, competing visual focal point undercuts that discipline rather than extending it.

### Concept 3: Affinity-mapping synthesis animation

- **Why it exists:** the About page already uses a real photo of an affinity-mapping session (sorting research notes on a wall) as evidence of research practice. This concept translates that same real practice into a small, abstract motion piece for the hero: a loose scatter of small rectangles that settle into two or three organized clusters once, on load.
- **Message communicated:** "research here means literally organizing messy, real findings into structure," the actual mechanics of the research practice already documented elsewhere on the site.
- **Interaction behaviour:** none; plays once and holds its resting state.
- **Animation behaviour:** a one-time settle animation, roughly 1 to 2 seconds, synced to page load, not scroll-triggered.
- **Implementation complexity:** medium-high. Needs real motion design skill to avoid looking like generic floating shapes once it's moving, which is exactly the category this brief explicitly rules out; the difference between "meaningful process visualization" and "meaningless particles" here is entirely in the execution, not the concept.
- **Accessibility considerations:** must respect `prefers-reduced-motion` by skipping straight to the resting/settled state; must be `aria-hidden`, it communicates nothing to a screen reader that isn't better said in prose.
- **Maintenance cost:** low once built, but like the trust diagram, it's a one-off component with no reuse elsewhere.
- **Performance impact:** low to moderate depending on implementation (CSS transforms are cheap; a physics-based settle is more expensive and harder to justify for a decorative-adjacent element).
- **Risk:** real risk of landing exactly on the line the brief draws between "research-inspired visualization" (invited) and "meaningless particles" (explicitly forbidden), and that line is a matter of execution quality that's genuinely hard to guarantee from a document.
- **Strengths:** grounded in a real, already-photographed practice, not invented; distinct from every other concept here in actually depicting a process rather than a static mark or diagram.
- **Weaknesses:** of every concept in this document, this is the one most likely to be misread as decorative motion despite a legitimate justification, since the *look* of small shapes settling into clusters is visually close to the "floating blobs" and "meaningless particles" this brief explicitly bans, even though the *reasoning* behind it is sound.

### Concept 4: Interactive human-AI node network

- **Why it exists:** "Human-AI Interaction" is a stated skill line and a repeated theme. A small, literal node-and-connection diagram, a handful of labeled points ("person," "system," "trust," "feedback") linked by lines that gently reorganize when the cursor moves nearby, would give the right side genuine interactivity tied directly to that theme rather than to decoration.
- **Message communicated:** human-AI interaction as a real relationship between specific things, not an abstract phrase.
- **Interaction behaviour:** cursor-proximity response (nodes drift slightly, connections redraw) within a bounded area; no click targets, purely ambient.
- **Animation behaviour:** continuous but extremely subtle while the cursor is nearby; idle/static otherwise.
- **Implementation complexity:** high. Real-time position calculation, redraw logic, and tuning it to feel "considered" rather than "gimmicky" is a genuine engineering and design effort, not a small addition.
- **Accessibility considerations:** keyboard and touch users get no equivalent interaction unless one is deliberately built (cursor-proximity has no natural touch or keyboard analog), which means this concept risks being a sighted-mouse-user-only feature on a portfolio that explicitly claims accessibility as a value, a real, substantive tension, not a minor detail. `prefers-reduced-motion` would need to disable the live redraw entirely, at which point the concept degrades to a static diagram, effectively Concept 2 with extra steps for most visitors.
- **Maintenance cost:** medium, it's the most technically complex element in this document, and complexity that only exists in one place is the first thing to bit-rot.
- **Performance impact:** the highest of any concept here, continuous pointer-tracking and redraw logic is real, ongoing JavaScript work, not a one-time cost.
- **Risk:** highest overall risk in this document, combining the highest engineering cost, the clearest accessibility gap, and the closest resemblance to `rauno.me`'s interactive-canvas hero, a real, impressive precedent, but for a different kind of site (an experimental design-engineering showcase) than this one (an editorial, credibility-first dual-audience portfolio).
- **Strengths:** the most genuinely interactive, most memorable concept in this document if executed well; directly names the theme instead of implying it.
- **Weaknesses:** the accessibility gap is a real, values-level contradiction for a portfolio that states accessibility as a design principle; highest cost and risk for a page section whose job is to be read in the first five seconds, not played with.

### Concept 5: Case-fact ticker

- **Why it exists:** a small, quiet, single line of real text that cycles through a few concrete facts already stated elsewhere on the site ("45+ countries · Convay," "Trust research · Lumi," "M.Sc. Human-Technology Interaction · Tampere"), sitting in the right-hand space as supporting proof rather than a visual device.
- **Message communicated:** concrete, verifiable facts, reinforcing credibility through specificity rather than imagery.
- **Interaction behaviour:** none.
- **Animation behaviour:** a slow crossfade between facts, several seconds per fact.
- **Implementation complexity:** low.
- **Accessibility considerations:** continuously changing text is a real screen-reader and low-vision concern (auto-updating content read aloud repeatedly, or a low-vision user losing their place mid-read); would need to be paused by default and only play for users who haven't set `prefers-reduced-motion`, and even then, auto-changing text in a hero is a pattern accessibility guidance generally advises against without a visible pause control.
- **Maintenance cost:** low, but every fact needs to stay in sync with the real, current numbers elsewhere on the site (country count, project count), a small but real ongoing correctness burden.
- **Performance impact:** negligible.
- **Risk:** medium. Auto-cycling text has a real history of reading as a generic marketing-site trope ("trusted by 500+ companies" tickers), which risks undercutting exactly the editorial, non-marketing tone this site has otherwise worked to establish.
- **Strengths:** cheapest to build of any "add something" option besides the ghost-type echo; purely factual, so it can't misrepresent anything as long as the facts stay in sync.
- **Weaknesses:** closest of any concept here to a generic SaaS-landing-page pattern; the accessibility concerns around auto-changing text are real and not fully resolvable while keeping the motion; genuinely low memorability despite being "something," it's easy to not notice a small cycling caption at all.

### Concept 6: Single quiet Lumi interface detail

- **Why it exists:** carried forward from `Hero-Work-Preview-Review.md` for completeness. A single, tightly cropped, quietly treated fragment of Lumi's real interface, the one existing asset that represents both the product-design and HCI-research halves of the identity at once, placed small and restrained beside the headline.
- **Message communicated:** "the research and the craft are the same body of work," illustrated with one real artifact rather than claimed in text alone.
- **Interaction behaviour:** none, or optionally opens the Lumi case study on click.
- **Animation behaviour:** none; a still crop, not the source video.
- **Implementation complexity:** low-medium, mostly careful visual treatment (cropping, muting color to match the site's palette) rather than new engineering.
- **Accessibility considerations:** straightforward, a normal `alt`-described image; the one real requirement is that it must not autoplay or carry any motion that competes with the headline's own kinetic entrance.
- **Maintenance cost:** low; one static asset.
- **Performance impact:** low, one small, optimized still image.
- **Risk:** the risk already identified in the prior review stands unchanged: at full color and any real size, this stops being a quiet detail and becomes exactly the kind of "work preview" that review found weak precedent for among this portfolio's actual peer tier.
- **Strengths:** the only concept in this document backed by a full prior investigation; thematically load-bearing rather than decorative; zero new asset production, only treatment of an existing one.
- **Weaknesses:** unchanged from the prior review: no benchmarked peer site does this move in a hero; needs real restraint to execute correctly or it undercuts the exact editorial tone it's meant to support.

### Concept 7: Reimagined rotating keyword system

- **Why it exists:** listed for completeness because it's the direct descendant of the previous portfolio's rotating circular skill-word visual, explicitly flagged in the brief as historical context only. Included here to be evaluated on its own merits, not dismissed by association.
- **Message communicated:** breadth of skills (UX Research, Human-AI Interaction, Accessibility, etc.), the same information already stated plainly in the hero's own skill-line rows.
- **Interaction behaviour:** none typically; sometimes hover-pausable.
- **Animation behaviour:** continuous rotation or cycling, indefinitely, for as long as the hero is on screen.
- **Implementation complexity:** low-medium.
- **Accessibility considerations:** continuous, indefinite motion is one of the clearer `prefers-reduced-motion` and general motion-sensitivity concerns in this entire document, this isn't a one-time entrance, it runs forever while the page is open.
- **Maintenance cost:** low.
- **Performance impact:** low but non-zero and, unlike the one-time entrance animations already on this page, ongoing for the full time a visitor spends on the hero.
- **Risk:** this concept restates information the page already states in plain, readable text one paragraph below (the skill-line rows), so its main effect is decorative repetition rather than new meaning, which is precisely the category this brief asks to be skeptical of.
- **Strengths:** low cost, easy to build, directly reuses real content (the actual skill lines) rather than inventing new labels.
- **Weaknesses:** weakest "reason to exist" of any concept in this document, it doesn't say anything the page doesn't already say clearly in text; continuous indefinite motion is the hardest animation behaviour in this list to justify against the site's own "one considered motion moment" discipline; closest concept here to the previous portfolio's decorative device the brief explicitly asked not to assume should return.

---

## 5. Ranking, strongest to weakest

1. **Concept 0, keep as-is.** Zero risk, matches the specific peer tier's real convention (checked twice, directly), and is the only option with a track record in this exact project, restraint is what has actually tested well here, twice, while a structural change tested worse. Its one honest weakness, memorability, is real but doesn't outweigh a repeated, empirical pattern plus a repeated, real-benchmark finding.
2. **Concept 1, ghost-type word echo.** The strongest "add something" option by a real margin: lowest risk, lowest cost, zero new assets, and the only concept that extends a device the site has already built, shipped, and trusted one section below, rather than inventing a new one. Its weakness (no external peer precedent) is real but smaller than every other concept's weaknesses.
3. **Concept 6, quiet Lumi detail.** Thematically the most substantive of the visual options, carries a full prior investigation behind it, but real execution risk and, like Concept 1, no peer precedent.
4. **Concept 5, case-fact ticker.** Cheap and factual, but closest to a marketing-site trope and has a real, not fully resolvable accessibility tension around auto-changing text.
5. **Concept 2, trust-calibration diagram.** The most differentiated message in the document, but the highest "looks generic if imperfect" risk and the highest complexity-to-benefit ratio; also the one concept most in tension with the site's "one kinetic moment" rule.
6. **Concept 3, affinity-mapping animation.** Genuinely meaningful reasoning, but the visual result is the hardest of any concept here to keep clearly distinct from the "floating shapes" pattern this brief explicitly rules out.
7. **Concept 4, interactive node network.** Most memorable if perfect, but the highest cost, highest risk, and a real, values-level accessibility gap (no non-mouse equivalent) for a portfolio that states accessibility as a principle.
8. **Concept 7, reimagined rotating keywords.** Weakest reason to exist of any concept evaluated, restates information already stated clearly in text, continuous indefinite motion is the hardest to justify, and it's the closest thing here to the exact device the brief asked not to assume should return.

---

## 6. Final recommendation

**Keep the hero exactly as it is.**

Not by default, and not because restraint is always the safe answer, three separate reasons converge on it here specifically:

First, this project already has real, built evidence, not just reasoning, that structural changes to this hero have underperformed simple restraint: the grid-lock experiment (Option C) tested worse live than the plainer wrapper it replaced. That's the strongest kind of evidence available, and it argues for a high bar before trying something new again, a bar none of the eight concepts above clear with confidence.

Second, every real site this portfolio has been benchmarked against across three review passes now, Kowalski, Freiberg, Landay, Ion, IDEO, solves "the hero has space" the same way: either restraint or real photography, never a kinetic system, a diagram, or an interactive canvas. That finding held up again in this document; nothing proposed here has a genuine peer precedent.

Third, and most directly: the one real problem identified in Section 1, that the hero is the only section on this page without a device explaining its own negative space, is real but minor, an internal consistency question, not a credibility or comprehension problem. A visitor isn't confused by the hero or unable to find the work; the inconsistency is something only a designer auditing the page section by section would notice, which is exactly what this document has been doing.

If something is ever added here, **Concept 1 (ghost-type word echo)** is the one worth trying, specifically because it's the only option that costs almost nothing to try and undo, uses zero new assets, and extends a device the site has already committed to rather than introducing a new one. But "worth trying if you want to try something" is different from "worth recommending," and this document's honest conclusion is that the current hero doesn't need saving. It needs to be trusted.

---

No changes have been made to the homepage or any other page. Waiting for approval before implementing anything.

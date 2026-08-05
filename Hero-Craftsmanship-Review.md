# Hero Craftsmanship Review

Scope: the homepage hero only. Nothing implemented. This is a review document only.

This is the third pass on this exact question. `Hero-Composition-Review.md` found the hero's proportions were accidental rather than chosen, and recommended a grid-locked column (Option C), which was built and then reverted after looking wrong live. `Hero-Work-Preview-Review.md` and `Hero-Design-Review.md` both asked "should something be added to the right side" and both concluded no, restraint was the stronger choice, with a single quiet Lumi detail and a ghost-type word echo held in reserve as the one exception worth reconsidering.

Aseer has now asked to revisit this a third time, explicitly rejecting "leave it as is" as a default and asking for a first-principles re-evaluation aimed at craftsmanship rather than decoration. That's a real signal worth taking seriously on its own, not just re-arguing the same position again. This document does that: it gathers new evidence (the actual current asset inventory, an audit of the site's own motion system, and a live, direct check of Linear, Vercel, Stripe, and Apple rather than relying on the previous documents' benchmarking), evaluates both directions Aseer named, and proposes a third option that came out of that evidence.

---

## 1. Reframing the question

"What visual should we add" and "how does the hero demonstrate craftsmanship" are genuinely different questions. The first treats emptiness as the problem. The second treats it as one possible symptom of a different problem: nothing on the page right now proves, in the first three seconds, that real craft went into building it. Typography and restraint can absolutely prove that. But two prior reviews already tested that theory against this exact hero, and both times concluded the case for restraint was strong on paper but only "medium confidence" once seen live. That's worth sitting with rather than re-asserting.

## 2. What's actually available to work with

### 2.1 The asset inventory, re-checked directly against `src/content/projects.ts`

Ten case studies, ten thumbnails. Re-verified today rather than assumed from the last pass:

- **Convay Mobile App Revamp, Convay AI for Physical Meetings, FitVibe, TravelMate AI, Convay Notifications**: five Framer-hosted GIFs, all 1600x1200, all a glossy phone-mockup or multi-screen triptych style produced for case-study headers.
- **Convay Design System**: a local `.mp4`, 1100x826, a screen recording scrolling through Figma tokens (color, spacing, shadow scale). Flatter, quieter, less "marketing" than the GIFs above.
- **Lumi** (flagship research): a local `.mp4`, 723x542, a screen recording of the actual chat widget in use, the widget opening, topic buttons appearing, a live conversation answering a question. This is the one asset in the entire inventory that shows a real interaction happening, not just a UI being scrolled past.
- **Cultural Festival Platform (Arenberg)**: a local `.mp4`, 1100x826, splash screen through a scavenger-hunt clue.
- **RoboCarnival**: a real photograph, 1915x1072, Aseer seated between two robots.
- **Game Difficulty**: a custom-built SVG-derived illustration, 2000x1500, not a UI asset at all.

The finding from the prior review still holds and is worth restating plainly: this is not a stylistically unified library. Glossy Framer GIFs, flatter local screen recordings, one real photo, and one illustration were made at different times for different purposes. Nothing here can be dropped into a hero as a matched set without new production work.

One thing this pass adds that the prior review didn't have as clearly: **Lumi's asset is the only one in the inventory that is inherently alive**, not because of an animation added around it, but because the footage itself is a real conversation unfolding. Every other asset is a static interface being scrolled or panned across. That's a meaningfully different quality, and it's the fact this document leans on later.

### 2.2 The motion system, read directly from source

`src/lib/motion.ts` and the components that use it. Worth being precise about what already exists, since "elevate the craft" is a vague instruction unless we know the current baseline exactly:

- Three tuned cubic-bezier curves, not browser defaults: a standard curve, an entrance curve (`[0.16, 1, 0.3, 1]`, an aggressive ease-out, decelerate-fast-then-settle), and an exit curve.
- Durations fixed at 150/200/250ms, deliberately short, matching the Creative Direction's own stated rule ("roughly 150-250ms, never default browser transition timing").
- `KineticHeadline`, the homepage's one signature motion moment, staggers each word in with a blur-to-sharp entrance (`filter: blur(6px)` to `blur(0px)`, combined with the entrance curve), plays once, respects `prefers-reduced-motion` by collapsing to an instant, no-displacement state.
- `Button` already has real interaction physics, not a default hover: primary buttons scale down 3% on press, gain a soft colored shadow bloom on hover, and the trailing arrow shifts half a pixel-unit on hover, all through the same tuned curves.
- `ScrollProgress` uses an actual physical spring (`stiffness: 280, damping: 40`), not a duration-based tween, specifically so it doesn't feel mechanical.
- A grain overlay (`feTurbulence`-based, no image asset, effectively free at runtime) already sits over the entire site as a quiet material signature, not just the hero.

The honest conclusion here: this is not a portfolio that lacks motion craft and needs to invent some. It already has a genuinely tuned system, in real, working code, not aspirational copy in a brief. What it doesn't have yet is a moment that uses all of that craft in service of a single, memorable beat. Right now the craft is spent on individual pieces working correctly (a button press, a scroll bar, a headline). Nothing on the page is built to be the thing a visitor remembers five minutes later.

### 2.3 Live benchmark check, done directly this time

The previous documents' benchmarking focused on individual designers (Kowalski, Freiberg, Landay, Ion). Aseer's brief named companies instead (Linear, Vercel, Stripe, Apple), so this pass checked those four directly, live, today, rather than reasoning from memory or reusing the earlier designer-focused research.

**linear.app**: the hero headline enters with a blur-to-sharp animation, word by word, functionally the same technique this site's own `KineticHeadline` already uses (caught mid-animation in a screenshot: the words are legible but softly blurred, sharpening in). Directly below the hero text, full width, with no gap, sits a real, live screenshot of Linear's own product: an actual issue, an actual sidebar, an actual in-progress AI agent panel showing real (or real-looking) work happening. Not a mockup, not a curated collage. One real screen, shown at full fidelity, immediately.

**vercel.com**: not text-only. The hero centers an oversized version of Vercel's own triangle logomark, lit by a soft radial glow, with a short list of rotating one-line phrases to its right ("For coding agents," "To ship apps and agents," "Automated by agents"). This is a bold, singular visual device, not restraint.

**stripe.com**: also not text-only. A large abstract gradient ribbon, Stripe's own long-running brand device, bleeds in from the top-right corner behind the headline text.

**apple.com**: real environmental photography of people, but worth flagging honestly: this is a rotating seasonal campaign banner (currently a back-to-college promotion), not a fixed brand hero the way the others are. Less directly comparable to a permanent personal-portfolio hero than the other three.

This matters because it complicates something the first review leaned on. `Hero-Composition-Review.md` checked individual designers and found consistent restraint, and reasonably generalized that toward "premium equals minimal." But three of the four companies Aseer specifically named here do not practice that kind of restraint. Vercel and Stripe both commit to one bold, singular visual device. Linear shows real product, immediately, at full fidelity. None of them fill space with a generic decorative object, and none of them use a multi-asset collage, but none of them are purely typographic either. The pattern across all three is narrower and more specific than "minimal": **one real or brand-authentic visual, used with full confidence, never a grid of things.**

## 3. Evaluating Direction A: Evidence + Motion Craft (curated editorial composition)

Building a composition from multiple existing assets (Lumi, Convay Design System, Arenberg, research photos, UI fragments) to quietly communicate "this person researches, designs, prototypes, and ships."

**Strengthens the hero?** Partially. It's the most complete narrative in a single glance, since a multi-asset composition can gesture at range in a way one asset can't. But this is exactly where Section 2.1's inconsistency becomes a real cost, not a theoretical one. Composing GIFs, mp4s, a photo, and an illustration into one coherent editorial arrangement is a new design project in its own right, not a curation task. It would need new crops, a shared color/exposure treatment, and a layout system invented specifically for this, none of which exists today.

**Industry and academic audiences?** Uneven. A recruiter skimming quickly reads "range" well from a composition. An HCI professor is more likely to read a busy multi-image arrangement as portfolio-template energy, the opposite of the research seriousness the rest of the site works hard to establish.

**First impression?** Risk of the opposite effect than intended. The current hero's whole identity is one confident typographic block. A composed grid of screenshots, however tastefully arranged, changes what kind of page this is within the first second, before anyone has read the headline.

**Credibility?** Genuinely mixed. Real work is real evidence, that's not nothing. But per Section 2.1, most of the inventory is pure product work (Convay, FitVibe, TravelMate). Putting those assets front and center in the hero, next to a headline that's making a dual product-design-and-research claim, risks visually overweighting the product half before the text has even made its case.

**Timeless?** Weakest of the three directions on this dimension specifically. Device-mockup and collage-style heroes are a recognizable, dateable convention, closer to template marketplaces and agency portfolios than to the specific tier of site this project benchmarks against. None of the five individually-run sites checked in the first review do this. None of the four companies checked in this pass do this either, not even Linear, whose single product screenshot is one image, not a composition.

**Complexity, accessibility, performance, risk:** Highest of the three. Multiple images/videos loading in the hero (the most performance-sensitive real estate on the page) directly conflicts with the project's own stated performance principle. Accessibility needs alt text and motion-reduction handling per asset, multiplied by however many are used. Highest production cost, since cohering these specific assets requires real new design work, not assembly.

**Verdict:** Not recommended as originally scoped. The underlying instinct, real work as evidence, is sound and shows up again in Direction C below, but a multi-asset composition specifically is the weakest way to execute it, for reasons grounded in this exact asset library, not a generic objection to the idea.

## 4. Evaluating Direction B: Motion Craft Only, no new visual object

Elevate interaction and sequencing quality inside the current typographic hero, no new element added.

**Strengthens the hero?** Real but limited headroom. Section 2.2 shows the foundation is already unusually disciplined for a portfolio site, tuned easing, real button physics, a physically-springed scroll indicator, universal reduced-motion handling. The honest gap isn't technique, it's that the technique is currently spent entirely on the entrance (one `KineticHeadline` moment, one `Reveal` at a flat 0.35s delay for everything else at once) and nothing else. There is real room to choreograph that entrance more deliberately, for instance staging the bio, skill-line rule, and CTAs as their own small stagger sequence rather than one block arriving together, or introducing a subtle cursor-reactive detail on the CTA row. But none of that changes what's visually present. It changes how well what's already there is felt.

**Industry and academic audiences?** The safest of the three for both. It cannot look try-hard, and it cannot read as decoration, since by definition nothing new appears. An HCI researcher and a design director would both read tightened timing as competence, not effort.

**First impression?** This is the direction's real limitation, and it should be stated plainly rather than softened. Motion craft is something a visitor feels on repeat visits, on scrolling through the rest of the site, on noticing the button press physics. It is close to invisible in the first three seconds, which is specifically the window Aseer's brief is asking about. A tightened stagger sequence is a genuine improvement. It is not, on its own, a "wow."

**Credibility, timelessness:** Strong on both. Understated interaction quality doesn't date the way a visual trend does, and it can't misrepresent scope or overclaim the way a bold visual risks doing.

**Complexity, accessibility, performance, risk:** Lowest of the three by a wide margin. No new assets, no new accessibility surface beyond what already exists, negligible performance cost, and effectively zero risk of looking wrong once built, since it's tuning existing, already-correct code rather than adding something new that could misfire.

**Verdict:** A legitimate, low-risk improvement worth doing regardless of what else happens here, but not, by itself, an answer to "memorable first impression." It's the right foundation, not the whole solution.

## 5. Direction C (proposed): one real, quiet, moving fragment of Lumi, executed at the site's own craft standard

This wasn't one of the two directions Aseer named, but it's what Sections 2 and 3 point toward once combined: Direction A's instinct (real work as evidence) narrowed to the single asset that actually earns its place (Section 2.1's finding that Lumi is the only asset that's both genuinely alive and genuinely dual-audience), executed with Direction B's actual craft standard (Section 2.2's tuned timing system) rather than dropped in as a plain autoplay clip.

Concretely: a small, quiet, muted loop of the real Lumi footage (the widget opening, a topic button pressed, a reply arriving), cropped close with no browser chrome or device frame, sitting in the hero's right-hand space at a modest scale, not full-bleed. Two specific craft decisions separate this from a generic "hero video," which is a real and recognizable convention this needs to actively avoid resembling:

- **Timing, not placement, does the work.** The clip enters through the same `Reveal` system already timed to the headline's own word-stagger, so it reads as one continuous choreographed moment (headline settles, then the bio/CTA column and the Lumi fragment arrive together) rather than a separate element bolted on beside the text.
- **Quiet until engaged.** At rest, the footage sits desaturated and slightly reduced in contrast, matching the hero's current restraint. On hover or scroll-into-view, it gains color and sharpness, using the same entrance curve `Button` already uses for its hover state. This makes it behave like a considered detail that rewards attention rather than a marketing autoplay competing with the headline for it.

**Strengthens the hero?** Yes, on the specific dimension the brief is asking about. It gives the hero one true "wow" candidate, real motion, real product, tied directly to the exact research claim in the headline, executed with the tuned physics already proven elsewhere on the site, not invented for this alone.

**Industry and academic audiences?** Serves both without favoring either, for the same reason the prior review identified: Lumi is real, shipped product craft (recruiter-legible) and it's also the flagship research project whose subject, trust in human-AI interaction, is the literal language in the hero's own headline (professor-legible). No other single asset in the inventory does both.

**First impression?** This is where it earns its place over Direction B. A visitor's eye has something real to land on in the first second, not a composition, one thing, doing one thing, tied to what the words already say.

**Credibility, timelessness?** Medium-high, with one honest caveat: hero video is common enough now, generically, that execution is everything here. Done with the desaturate-until-engaged treatment above, it reads as a considered detail. Done as a plain autoplay clip, it reads as exactly the template convention this site has avoided everywhere else. There's real execution risk, not concept risk.

**Complexity, accessibility, performance, risk:** Higher than Direction B, lower than Direction A. One asset, not several, so the accessibility surface is contained (a `prefers-reduced-motion` fallback showing a static frame, a pause control, and a text alternative are all that's needed, not the multiplied surface Direction A would require). Performance needs real care since this sits in the hero, the page's most LCP-sensitive region, so the clip would need to be small, compressed, and likely loaded after the initial paint rather than blocking it. This is the direction's fair cost: it is not free the way Direction B is.

## 6. Ranked summary

| | Direction A (composition) | Direction B (craft only) | Direction C (single Lumi fragment, full craft) |
|---|---|---|---|
| Strengthens hero | Partial, uneven | Real but limited, felt not seen | Yes, directly on-brief |
| Serves both audiences | Uneven, product-heavy | Neutral | Strong, the one dual-purpose asset |
| First impression | Risk of wrong first impression | Minimal in first 3 seconds | Strongest candidate |
| Credibility | Mixed | Strong | Medium-high, execution-dependent |
| Timeless | Weakest | Strongest | Medium, if kept restrained |
| Complexity/cost | Highest | Lowest | Moderate |
| Accessibility surface | Largest | Smallest | Contained, one asset |
| Performance risk | Highest | None | Real, but manageable |
| Overall risk | Highest | Lowest | Moderate, concentrated in execution quality |

**1. Direction C**, if Aseer wants to move on this at all. **2. Direction B**, as a lower-risk improvement worth doing either way, on its own or underneath C. **3. Direction A**, not recommended as scoped; its real instinct (use actual work as evidence) is better served by C.

## 7. Recommendation

Do Direction C: a single, quiet, muted loop of the real Lumi interaction, entering on the hero's existing reveal timing, desaturated at rest and gaining color on engagement, small in scale, no device frame.

This is a genuine change of position from the previous two documents, and it deserves a direct explanation rather than a quiet reversal. Both prior reviews were right about what they checked: no individually-run designer or researcher site in that first benchmark set uses a hero visual, and the grid-locked column genuinely did look worse once built. Neither of those findings is undone here. What changed is the question. This pass checked the specific companies Aseer named, and found that Linear, Vercel, and Stripe (three of the four) all commit to one confident, real, or brand-authentic visual device, not zero. That's new, direct evidence, not a reinterpretation of the old evidence. Combined with Aseer asking three times now, across two sessions, to look past restraint, that's a strong enough signal that the honest answer changed, not just the mood.

The case for C over the alternatives: it's the only direction that gives the hero a genuine first-impression moment while staying inside every constraint in the brief. Nothing about it is generic (it's Aseer's own real research prototype, not a decorative object), nothing about it is spectacle for its own sake (its behavior, desaturated until engaged, is restrained by design), and it uses motion the site has already proven it can execute well, rather than introducing an unproven new technique.

The honest risk, stated plainly rather than buried: execution is everything here. The gap between "a considered, quiet interactive detail" and "a portfolio with a hero video" is entirely in the restraint of the treatment, not the concept. If this is built and it doesn't feel like the former on first look, that's real information, the same way the grid-locked column looking wrong once built was real information last time, and it should be reverted rather than defended.

No changes have been made to the homepage or any other page. Waiting for direction before implementing anything.

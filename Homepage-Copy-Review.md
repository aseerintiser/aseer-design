# Homepage Copy Review

Scope: content and writing only. No layout, spacing, animation, component, or visual changes are proposed or made anywhere in this document. Nothing in `src/` was touched to produce this review. This is a recommendation document — the production homepage is unchanged until you approve specific items.

---

## 0. How this review was done

I read every visible sentence currently rendered on the homepage (`src/app/page.tsx`, `src/content/site.ts`, the two featured `ProjectCard`s it pulls from `src/content/projects.ts`, and the global `Footer.tsx`, which renders on every page including this one). I also opened the live site to look at the actual hero layout, since you flagged it.

For the research pass, I looked at both sides of this portfolio's dual audience:

- **Industry side**: how individual designers at companies like Linear, Stripe, Vercel, Figma, and Notion describe themselves (where personal portfolios exist) and how those companies' own product marketing handles tone, plus general portfolio-writing guidance (Figma's own portfolio-examples resource, UX portfolio guides).
- **Academic side**: real HCI faculty and lab homepages — James Landay (Stanford HCI, Stanford HAI co-founder), Alexandra Ion (CMU HCII), and Robin Welsch's Human-AI Interaction group at Aalto (directly adjacent to your own trust/AI research area).

The clearest pattern from the academic sites: no persuasion at all. Landay's and Ion's homepages are almost entirely plain, declarative fact — name, title, institution, one or two sentences of what they study, then credentials. Nothing is "sold." The clearest pattern from industry guidance: specific, concrete claims beat adjectives — "I build payment systems at Stripe and write about database performance" beats "passionate full-stack developer leveraging cutting-edge technologies," almost word for word the trap this milestone's brief also warns against.

Your homepage already sits closer to the academic end of that spectrum than a typical designer portfolio does — plain sentences, no exclamation points, no "let's build something amazing together" energy. That's the right instinct for a dual audience. The issues below are mostly about **internal consistency and repetition**, not tone — the tone is largely already correct.

---

## 1. Layout observation (not actioned)

You asked me to check the hero alignment while I was in there, so: confirmed live at a 1452px viewport. The hero text column (`max-w-4xl`, page.tsx line 54) caps at roughly 900px regardless of window width, left-aligned, with everything to its right empty. On a laptop-width screen this reads as "half the screen," exactly as you described — there's no second element balancing that space, so the hero feels lopsided rather than deliberately spacious.

I have not touched this — it's a layout decision, out of scope for this milestone. But it's worth flagging *why* it matters for the writing pass: a wide, mostly-empty hero puts more pressure on the few lines of text that do exist, because there's nothing else on screen competing for attention. That's actually a point in favor of the tightening recommended below — shorter, more deliberate sentences will read better in that specific space than they would in a denser, two-column layout. Recommend a short follow-up layout milestone once this copy is locked.

---

## 2. Section-by-section critique

### 2.1 Personal positioning (hero eyebrow + site identity)

**Current content:**
> "Md Aseer Intiser · UX & Product Designer"
(`site.name` · `site.title`, rendered in `Eyebrow`. The same `site.title` string also sets every page's browser-tab title and appears again on the Resume page.)

**Editorial critique:** This line works as a quiet identity label — it's not trying to be memorable, it's trying to be scannable, and it succeeds at that. The open question is whether "UX & Product Designer" alone undersells the research half of your identity, given this milestone's own stated goal: the homepage should feel equally credible to a Product Design hiring manager and an HCI professor. The headline and bio do establish the research side within the first few seconds — but the *persistent* identity string (this line, the browser tab, the resume subtitle) never mentions research at all. Someone who only skims the eyebrow and headline, or who sees this site as a browser tab among many, gets "designer" and nothing else.

**Recommended action:** Rewrite (pending your decision — see Reasoning)

**Proposed content:**
> "Md Aseer Intiser · Product Designer & HCI Researcher"

**Reasoning:** This is the one recommendation in this review I'm genuinely torn on, so I want to show my work rather than just assert it. The case for changing it: it's the only sitewide identity string, and right now it's industry-only, which sits at odds with the "equally credible to both audiences" goal the milestone brief sets for itself. The case for leaving it: "UX & Product Designer" is a clean, focused, ATS-friendly title, and adding a second title risks the eyebrow reading as two job descriptions stapled together rather than one coherent practice — a risk the Creative Director persona raises directly in Section 4. This also isn't a homepage-only change — `site.title` feeds `layout.tsx` (every page's `<title>` tag and Open Graph metadata) and `resume/page.tsx`'s own eyebrow, so it's a sitewide identity decision wearing a homepage costume. I'd treat this as the one item in this review worth a deliberate yes/no from you rather than a default.

**Confidence level:** Medium

---

### 2.2 Hero headline

**Current content:**
> "Designing digital products people trust, grounded in research."
(`site.tagline`, rendered as the animated H1.)

**Editorial critique:** Read on its own, this is a good line — "people trust" is more active and specific than the more common adjective-pileup pattern ("innovative," "seamless," "trustworthy" digital experiences), and "grounded in research" is a calmer, less clichéd choice than the more marketing-flavored "backed by research." I want to flag directly: you cited "Designing trustworthy digital experiences, backed by research" as an example of stronger *earlier* wording in your brief. Having weighed both, I think the current line is actually the stronger of the two — "trust" as something people actively *do* reads more human than "trustworthy" as a property bolted onto "experiences," and "grounded" avoids the slightly ad-copy cadence of "backed by." I'm flagging my disagreement explicitly rather than silently overriding your example, since memorability is genuinely subjective and this is worth your own ear-test.

The real problem isn't the headline in isolation — it's what comes immediately after it. The very next line a visitor reads, one paragraph down, is: *"**I design digital products** by first understanding how people think and behave..."* The headline and the first bio sentence both open with "designing digital products" / "I design digital products," almost word for word. That's the single biggest finding in this review: your two most prominent sentences on the page say the same thing twice in the first ten seconds, right when the brief says first impressions are being formed.

**Recommended action:** Keep headline, Rewrite bio opener (see 2.3) — treat as one fix across two sections

**Proposed content:** No change to the headline itself. See 2.3 for the paired fix.

**Reasoning:** Of the two sentences, the headline is the one doing more work (it's the animated, singular H1; the bio sentence is one of many paragraphs). Fixing the bio opener resolves the repetition without touching the line most likely to be remembered or quoted back to you.

**Confidence level:** High (that the repetition is a real problem) / Medium (that fixing the bio rather than the headline is the better of the two fixes — Section 2.3 lays out the alternative)

---

### 2.3 Hero bio, paragraph 1

**Current content:**
> "**I design digital products by first understanding how people think and behave**, then shaping that into the interface itself. Lately, that's pulled me toward trust and human-AI interaction."

**Editorial critique:** The back half of this sentence is genuinely good — "Lately, that's pulled me toward..." is exactly the kind of natural, slightly informal phrasing the brief is asking for; it sounds like something you'd actually say, not copy. The front half is the problem: "I design digital products" duplicates the headline directly above it (see 2.2).

**Recommended action:** Rewrite (opening clause only)

**Proposed content:**
> "**I start by understanding how people think and behave**, then shape that into the interface itself. Lately, that's pulled me toward trust and human-AI interaction."

**Reasoning:** Drops the redundant "design digital products," keeps everything else — including the bolded emphasis and the strong closing sentence — untouched. "I start by" also reads slightly more like a description of *process* (which is what the sentence is actually about) rather than a restated identity claim.

**Alternative, if you'd rather fix the headline instead:** Shorten the headline to *"Designing for trust, grounded in research."* and leave this paragraph exactly as it is today. This is punchier but more abstract — it drops "digital products" as the object of trust, which is a small loss of concreteness. I'd only take this path if the current headline feels too long to you independent of this issue.

**Confidence level:** High

---

### 2.4 Hero bio, paragraph 2

**Current content:**
> "With a background in **Software Engineering** and a **Master's in Human-Technology Interaction**, I've designed for **Convay**, a SaaS platform used by governments and global teams in **45+ countries**."

**Editorial critique:** This is your single densest credibility sentence — degree, employer, product category, and scale, all in one line — and it earns its density; every clause adds something a hiring manager or PhD supervisor would actually want to know. The specific issue is factual, not stylistic: I checked this claim against the Convay case study itself (`content/projects.ts`), which describes Convay as a "government- and enterprise-grade **SaaS video conferencing platform**... trusted by governments and international organizations in **46+ countries**." That's a different number (45 vs. 46) and a different, more specific description (video conferencing platform vs. bare "SaaS platform") than what's on the homepage. This same "45+ countries" figure also appears a third time, in the Design track-split section (2.6) with yet another descriptor ("government-adjacent video platform"), and a fourth time in the page's own meta description (`site.heroProofPoint`, not visible on the page but shown in browser tabs/link previews), which says "enterprise video platform... including government deployments."

Four mentions of the same fact, three different numbers-or-descriptors between them. Individually each sentence reads fine; side by side, or across a click from homepage to case study, it reads like nobody proofread the specific numbers — which undercuts exactly the kind of trust this page is trying to establish.

**Recommended action:** Rewrite (standardize wording and number across all instances)

**Proposed content:**
> "With a background in **Software Engineering** and a **Master's in Human-Technology Interaction**, I've designed for **Convay**, a video conferencing platform trusted by governments and global teams in **46+ countries**."

**Reasoning:** "46+" matches the case study, which is the more detailed, presumably more carefully fact-checked source. "Video conferencing platform" is the case study's own language and is more specific and more accurate than "SaaS platform," without becoming jargon. "Trusted by" (rather than "used by") also matches the case study's own verified phrasing exactly, so this sentence is no longer making a claim the case study doesn't already back up in its own words. I'd apply this same number-and-phrase to the Design track-split line (2.6) and the meta description (`heroProofPoint`) so all four instances agree. I want to be direct that I'm not in a position to independently verify whether "46" or "45" is the true current count — I'm recommending consistency with the more detailed source, not asserting which number is factually correct. That's a one-line confirmation only you can give.

**Confidence level:** High (that the inconsistency needs fixing) / Medium (that 46, not 45, is the correct number — please confirm)

---

### 2.5 Skill lines

**Current content:**
> "UX Research • User Evaluation • Design Systems"
> "Human-AI Interaction • Accessibility • Behavioral Research"

**Editorial critique:** This is a scannable keyword row, not prose, and I don't think it needs to justify itself the same way a sentence does — its job is quick visual scanning for someone moving fast, which is a real, distinct use case from the paragraph above it. It does slightly overlap in content with the bio and track-split sections (behavioral research, human-AI interaction, UX research all get said in sentence form elsewhere on the page), but I don't think that's a problem: a recruiter skimming in "scan mode" and one reading in "narrative mode" are being served by two different formats, not being told the same thing twice in the same mode.

**Recommended action:** Keep

**Proposed content:** No change.

**Reasoning:** This already does its job — quick, quiet, doesn't compete with the headline for attention (it sits below a thin rule as a distinct, smaller element). Nothing here reads as buzzword-stuffing; every term is something the site can actually back up with a case study or the Research page.

**Confidence level:** High

---

### 2.6 Design track-split section

**Current content:**
Heading: "Design"
Text: "Enterprise and concept product design, including Convay, a government-adjacent video platform used in 45+ countries."

**Editorial critique:** Two issues here, one factual and one phrasing-level. Factual: see 2.4 — this repeats the 45-vs-46 and descriptor inconsistency, and actually *understates* your own case study's claim by hedging to "government-adjacent" when the case study itself says Convay is "trusted by governments" outright. If that claim is solid enough to state plainly in the case study, hedging it here doesn't add caution, it adds a fourth, weaker version of the same fact. Phrasing: "Enterprise and concept product design" is a slightly awkward opening noun phrase — "concept product design" is internal shorthand (it's doing the work of gesturing at the Design Showcase pieces and things like FitVibe/TravelMate AI) that a first-time visitor has no way to parse yet, since Design Showcase hasn't been mentioned.

**Recommended action:** Rewrite

**Proposed content:**
> "Enterprise product design, including four years shaping Convay, a video conferencing platform trusted by governments and global teams in 46+ countries."

**Reasoning:** Drops "concept product design" as an unexplained label (the Design Showcase nav item and the Work index page already carry that context in their own right — this teaser line doesn't need to pre-explain it). Matches the corrected, consistent Convay phrasing from 2.4. "Four years" is a concrete, honest-sounding detail in place of the vaguer "enterprise and concept" framing — please confirm the actual duration is accurate (I'm inferring roughly four years from the Convay tenure date range noted elsewhere in the content, Sep 2023 onward plus earlier Convay projects; if that's wrong, drop the number rather than guess).

**Confidence level:** Medium — the factual correction is high-confidence, the exact replacement phrasing is a style choice among several reasonable options.

---

### 2.7 Research track-split section

**Current content:**
Heading: "Research"
Text: "Research into trust, AI, and public-service technology, feeding directly into how I design."

**Editorial critique:** This is the strongest of the two track-split lines as written. It's concrete (three actual research areas, not vague "human-centered" language), and "feeding directly into how I design" does real work — it's the sentence that most directly earns the site's dual-positioning claim, by stating the *relationship* between the two disciplines rather than just listing them side by side.

**Recommended action:** Keep

**Proposed content:** No change.

**Reasoning:** Nothing here needs fixing. Included in this review only for completeness, per the instruction to cover every section explicitly.

**Confidence level:** High

---

### 2.8 Featured project card — Work (Convay Mobile App Revamp)

**Current content (full source text, though only the first ~2 lines render on the homepage card due to a `line-clamp-2` truncation):**
> "Convay was growing fast. The platform was reaching global audiences and hosting high-stakes meetings, yet its mobile app felt stuck in the past. Users couldn't easily join meetings, key features were missing, and the experience felt clunky. I stepped in to help redesign the mobile flow from the ground up, making it simpler to use, faster to join, and aligned with the web experience. The goal? Make sure users could rely on Convay, wherever they are."

**Editorial critique:** Two separate problems. First, this text was written as a five-sentence case-study intro, then visually clamped to two lines on the homepage card — so the actual visible preview cuts off mid-narrative rather than at a natural stopping point, and the real payoff sentence never renders on the homepage at all. Second, independent of clamping: "The goal? Make sure users could rely on Convay, wherever they are." is a question-fragment opener ("The goal?"), which is a pattern to avoid throughout this site's writing — and this one is live, in already-published case study copy, not something I'm introducing.

**Recommended action:** Flag for a fast-follow content pass on `content/projects.ts` — out of scope to edit in this homepage-only milestone, since `oneLineScope` also feeds the full case study page, not just this card.

**Proposed content (for the fast-follow, not applied now):**
> "Convay was growing fast, reaching global audiences and hosting high-stakes meetings, but its mobile app felt stuck in the past. Users couldn't easily join meetings, key features were missing, and the experience felt clunky. I redesigned the mobile flow from the ground up to make Convay simple to use and reliable, wherever people join from."

This trims to roughly what a two-line card preview can actually show, removes the question-fragment, and ends on a complete thought rather than a mid-sentence ellipsis if it does get clamped.

**Reasoning:** This sits right at the edge of this milestone's scope — the visible symptom is on the homepage, but the fix lives in shared case-study content. I'm flagging it because it's genuinely visible on the homepage today, but I'm not proposing to edit `projects.ts` under a "homepage-only" milestone without your sign-off.

**Confidence level:** High (that this is a real issue) / Medium (on the exact replacement wording — this is closer to case-study editing than homepage editing, and deserves its own pass)

---

### 2.9 Featured project card — Research (Lumi)

**Current content:**
> "Lumi is a conversational AI prototype I designed to help international students find their way through Finnish public services. This case study covers what happened when I studied real newcomers using it, and what that revealed about how trust in AI actually works."

**Editorial critique:** This is well-written and, unlike the Work card, actually fits the two-line clamp reasonably well — two sentences, ending on a genuine hook ("what that revealed about how trust in AI actually works") rather than trailing off. Worth noting the asymmetry: this card's source text is two tight sentences while the Work card's is five looser ones. That gap in editing rigor between the two flagship cards is itself worth closing during the projects.ts fast-follow mentioned in 2.8, so both cards read with the same level of polish.

**Recommended action:** Keep

**Proposed content:** No change.

**Reasoning:** Already does its job well; no rewrite needed.

**Confidence level:** High

---

### 2.10 Current status (education + relocation)

**Current content:**
> "I'm finishing my M.Sc. in Human-Technology Interaction at Tampere University in 2026, and I'm open to relocating for the right opportunity."

**Editorial critique:** Clear, honest, sounds like a person talking rather than a resume fragment. "For the right opportunity" is a common phrase — I considered flagging it as filler, but on reflection it's realistic (nobody relocates for just any job) rather than corporate padding, so I'm not recommending a cut here (see the Senior UX Writer's dissent on this exact point in Section 4). The more interesting question is placement, not wording: this section sits in its own dark band immediately *before* the footer, and the footer's own first lines ("Open to roles across design, research, and AI...") are answering a closely related question — both are telling the visitor "I'm available." Two consecutive sections both saying some version of "I'm open to work" is a slightly repeated beat, even though the wording differs (this one is about logistics/timeline, the footer is about the kind of work).

**Recommended action:** Keep the sentence itself; consider a future Move (merge this section's content into the footer's opening, so "available for X kind of role" and "here's my timeline/location logistics" land as one beat instead of two back-to-back ones)

**Proposed content:** No change to the wording. Structural merge, if you want it, would be a layout/section-order change and is explicitly out of scope for this milestone — flagging it here as a content-architecture note for a future pass, not proposing to implement it now.

**Reasoning:** The sentence itself doesn't need editing. The redundant-beat issue is real but touches section structure, which this milestone excludes — recording it now so it isn't lost.

**Confidence level:** Medium

---

### 2.11 Footer

**Current content:**
- Heading: "Let's build something worth trusting"
- "Open to roles across design, research, and AI, wherever the work means understanding people and building for them."
- "If your team is designing or researching something people need to trust, I'd love to talk."
- "© Md Aseer Intiser · UX & Product Designer"

**Editorial critique:** This is the strongest-written block on the page. "Let's build something worth trusting" closes the loop on the headline's "trust" claim, which gives the whole page a real throughline instead of a headline that's forgotten by the time you reach the bottom. "I'd love to talk" is warm without being casual-to-the-point-of-unprofessional — a small, deliberate departure from "let's connect" boilerplate. Nothing here needs rewriting.

**Recommended action:** Keep

**Proposed content:** No change, except the copyright line's title should follow whatever you decide in 2.1 (if `site.title` changes, this line changes automatically since it reads from the same field).

**Reasoning:** This section already meets the bar the rest of the review is aiming for. Including it in full for completeness, per the instruction to review every visible sentence, not because it needs work.

**Confidence level:** High

---

## 3. Cross-cutting summary (the four things that actually matter)

Everything above rolls up into four real findings. Ranked by how much they'd bother a careful reader:

1. **The 45-vs-46 country count and the three different Convay descriptors** ("SaaS platform" / "government-adjacent video platform" / "enterprise video platform," across bio, track-split, and meta description). This is the highest-value fix in this whole review — it's a factual inconsistency a reader could actually catch by clicking from the homepage into the case study, and it undercuts the "trust" claim the entire page is built around. (Sections 2.4, 2.6)
2. **The headline and the first bio sentence both open with "[designing] digital products."** Real, noticeable repetition in the first two sentences of the page. (Sections 2.2, 2.3)
3. **The Convay Work card's question-fragment ("The goal?") and its mismatch with the two-line homepage clamp.** Live in published copy already, visible on the homepage today, but the actual fix lives in `content/projects.ts`, not `site.ts` — flagged as a fast-follow rather than actioned here. (Section 2.8)
4. **Whether the persistent site identity ("UX & Product Designer") should become dual-track.** The one open question in this review I'm not resolving myself — see Section 2.1 and the persona disagreement in Section 4.

Everything else reviewed (skill lines, buttons, research track-split, Lumi card, footer) is already working and needs no change.

---

## 4. Final editorial review — seven perspectives

I reviewed the proposed changes above (not the current live page) from seven independent points of view. Where they disagree, I've kept the disagreement rather than smoothing it over.

**Principal Product Designer:** Approves. The Convay consistency fix and the headline/bio de-duplication are exactly the kind of craft issue a design lead would flag in a portfolio review — they're small, but they're the difference between "polished" and "someone was in a hurry." Notes that the track-split sections are still light on differentiation between "what kind of designer are you," but agrees that's a job for the case studies, not a two-line teaser, and recommends against expanding these sections to compensate.

**Creative Director:** Approves, with one reservation. Worries that adding "& HCI Researcher" to the persistent identity string (2.1) risks the eyebrow reading as two résumés stapled together rather than one distinctive voice — a portfolio's identity line is usually stronger when it picks one clear lane. Would rather the research credibility keep living in the headline and bio (where it already appears twice) than in the identity line itself. This is a direct, reasoned disagreement with the UX Research Lead's position below; see Section 2.1 for why I'm leaving this open rather than picking a side.

**UX Hiring Manager:** Approves, and specifically calls out the country-count fix as the single most valuable change in the review — says a mismatched number between a homepage claim and its case study is exactly the kind of small thing that makes a hiring manager quietly downgrade their trust in every other claim on the page, even if they never mention it out loud.

**Senior UX Writer:** Approves the rewrites, flags the Convay case-study's "The goal?" fragment as a genuine, already-shipped house-style violation that should get fixed the moment a content-only projects.ts milestone is in scope. Mildly dissents on Section 2.10: would personally cut "for the right opportunity" as a soft, slightly hedging close, whereas I'm recommending Keep. Noting the disagreement rather than resolving it — it's a real stylistic judgment call, not a factual one, and I don't think it's costly enough either way to insist on.

**UX Research Lead:** Pushes hardest on Section 2.1 — argues that if this portfolio genuinely wants to be "equally credible" to design and research audiences (the milestone brief's own words), the *one* string that appears on every single page, in every browser tab, cannot stay industry-only. Ranks this higher-priority than I initially did. This is the direct counterpoint to the Creative Director above; I'm surfacing both rather than picking a winner, since it's genuinely your call.

**HCI Researcher (peer reviewer):** Approves. Confirms the Research track-split line (2.7) is specific enough to be credible to a research audience without needing methodology detail that belongs on the actual research page — "feeding directly into how I design" is doing real, defensible work, not just gesturing at rigor.

**PhD Supervisor:** Approves, and adds that the homepage correctly does *not* try to carry supervisor names, methodology, or study details (those live in the Lumi case study, where they belong) — a homepage overloaded with academic signaling would read as trying too hard in the opposite direction. Says the current level of research-signaling is appropriately restrained, and none of the proposed changes push it further than that.

---

## 5. Final gut check

**"If I landed on this homepage for the first time, would I believe this belongs to a thoughtful, experienced Product Designer and HCI researcher whose work I genuinely want to explore further?"**

With the fixes in Sections 2.3, 2.4, and 2.6 applied: yes. Without them, the honest answer is "mostly" — the redundant opening and the mismatched Convay numbers are small enough that most visitors wouldn't consciously notice, but they're exactly the kind of thing that quietly costs a page some of its credibility without anyone being able to say why. Fixing them removes that risk rather than adding anything new.

**"Does this homepage create confidence without trying to impress?"**

Yes, and this was true before I started — the tone throughout avoids marketing language, doesn't oversell, and the one adjustment I'm recommending most confidently (fixing the country-count/descriptor mismatch) is in service of *protecting* that confidence, not manufacturing more of it.

---

## 6. If you approve this, in priority order

1. Fix the Convay country count and descriptor consistency across bio, Design track-split, and meta description (2.4, 2.6) — highest value, lowest risk, purely factual.
2. Rewrite the bio's opening clause to remove the "digital products" repeat with the headline (2.3).
3. Rewrite the Design track-split line to match (2.6) and drop the unexplained "concept product design" phrase.
4. Decide on the identity-string question (2.1) — the one item that needs your explicit call rather than a default.
5. Fast-follow, separate milestone: fix the Convay Work card's question-fragment and rebalance it against the Lumi card (2.8, 2.9) — touches `content/projects.ts`, not `site.ts`, so it's genuinely a different milestone even though it's visible on this page.

Everything else reviewed above is a "keep, no action needed."

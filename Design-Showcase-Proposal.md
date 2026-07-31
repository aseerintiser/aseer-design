# Design Showcase Proposal

Status: proposal only — no implementation. Written for review before any work begins.

## 0. Summary

The old portfolio had a first project called "Design Showcase – Selected Highlights," linking out to a Figma prototype of four unrelated concept UIs (a learning-platform landing page, a fintech waitlist page, a wellness app, and a student job board). It wasn't a case study — it was a quick, arrow-key-through gallery meant to prove range: different industries, different moods, different UI types, no reading required.

The new portfolio doesn't have anything like it. Every one of its ten entries is a full case study — real context, real process, real reflection. That's a genuine strength, and also the reason this specific kind of value (fast, low-commitment proof of visual range) fell out when the old showcase was cut.

My recommendation: a new lightweight page called **Craft** — a curated set of UI and interaction moments, each with a one- or two-line note, pulling both from real case studies (re-cropped, zoomed-in details not otherwise seen) and from a small, honestly-labeled set of concept explorations (including reworked pieces from the old showcase's own source material). Not a project. Not in the Work or Research count. One click from the nav, no homepage section for now.

The rest of this document explains how I got there.

## 1. What the old Design Showcase accomplished

I opened the Figma prototype (`Design-Showcase---Sample-Work`, last updated October 2025) and stepped through it. It contains four pieces of work, browsed with arrow keys:

1. **LearnSync** — a team-learning/training platform marketing site (light theme, hero + testimonial cards + product screenshot).
2. **FundMatch** — a startup-fundraising waitlist landing page (dark theme, gradient accents, single CTA).
3. **Calmly** — a wellness/mental-health AI companion, shown as three mobile screens (voice listening state, a conversation, a "safe space" recommendation screen).
4. **UniJobs** — a student job-and-internship platform, shown as two screens (marketing homepage, a job listing detail page).

None of these read as real client or shipped work — no company name, no metrics, no "the problem was." They're clearly practice/concept pieces. And that's exactly what made the section useful:

- **It proved range fast.** Four industries (edtech, fintech, wellness, jobs marketplace), four different visual languages (bright SaaS, dark fintech, calm wellness, standard marketplace), in under a minute of browsing.
- **It cost the viewer nothing.** No case study to read, no process to follow — just scroll and look.
- **It showed pure UI/visual craft, decontextualized from process.** Case studies prove *thinking*. This proved *taste and execution* — typography, spacing, color, layout — on its own terms.
- **It was honest about what it was.** It never called itself a project or a case study. It was framed as "sample work" — lower stakes, no implied claim of being real.

## 2. What the current portfolio is missing because it was removed

I re-audited every entry currently in `content/projects.ts`:

**Work (7):** Convay Mobile App Revamp, Convay AI for Physical Meetings, Convay Design System, FitVibe, TravelMate AI, Convay Notifications, Cultural Festival Platform (Arenberg).
**Research (3):** Lumi, Multimodal Robot Interaction (RoboCarnival), Tailoring Game Difficulty to Player Types.

Every single one is a full narrative case study — context, process, decisions, reflection. That consistency is a strength; the recent Portfolio Consistency and Homepage Finalization milestones were explicitly about protecting it. But it means:

- **There's no "quick browse" experience anywhere on the site.** A recruiter or hiring manager who wants a 30-second visual impression before committing to reading has no page built for that. Every entry demands a few minutes.
- **Most of the depth is Convay-shaped.** Four of seven Work entries are Convay (enterprise, government-adjacent, B2B). FitVibe and TravelMate AI add some range, but they're still presented at full case-study weight. There's no fast way to see "this person can also design a consumer wellness app, a fintech landing page, a marketplace" without reading three more full case studies.
- **There's no space for smaller, honest, not-quite-case-study work.** Not everything Aseer has designed justifies a seven-section case study. Right now the portfolio's only options are "write a full case study" or "leave it out entirely" — and the second option is what happened to this material. That's an honest choice, but it leaves real, well-crafted work on the floor.
- **Pure UI/visual craft has no dedicated moment.** The case studies are rightly focused on problems and reasoning, which means detailed visual/interaction craft (a transition, a state change, a layout decision) is always in service of a narrative, never the headline. There's currently nowhere on the site whose entire point is "look closely at this."

## 3. Three to five possible approaches

### A. Craft — a curated page of UI/interaction moments with short notes
A page of individually-captioned pieces: cropped details from real case studies (zoomed into a specific screen, transition, or layout decision) alongside a small set of labeled concept explorations (reworked from the old showcase's source material). Organized by theme (e.g., layout & type, motion & state, mobile patterns) rather than by fictional client. Each item gets one or two sentences — what it is and why it's interesting — not a full write-up.

### B. Selected Works / Interface Gallery — a pure visual grid
A grid of full-page mockups (closer to the old showcase's actual format): image, one-line caption, maybe a tag (industry, style). No real writing per item, click to enlarge, that's it.

### C. Design Playground / Experiments — a broader, ongoing sketchbook
Everything from B, plus other exploratory material over time: animation studies, generative/creative-coding sketches, unfinished concepts, typography tests. Framed explicitly as an evolving practice log rather than a finished gallery.

### D. Fold into the About page — no new page or nav item
A compact "also worked on" grid or strip added to the existing About page: small thumbnails of the concept pieces, static or lightly interactive, no dedicated section elsewhere.

### E. Component / Interaction Showcase — an interactive, coded gallery
A page of actual working UI components and micro-interactions (buttons, cards, transitions) built in code rather than shown as static images — closer to a small internal design-system demo than a gallery of screenshots.

## 4. Detailed comparison

| | Strengths | Weaknesses | Recruiter value | Storytelling | Maintenance | Scalability | Fit with this portfolio |
|---|---|---|---|---|---|---|---|
| **A. Craft** | On-trend with senior product-design portfolios (e.g. Rauno Freiberg's `rauno.me/craft`); reuses real case-study material *and* the old showcase's source work; adds reflection instead of just displaying; organizes by skill/theme, which reads as more senior than organizing by fictional client | Needs real curation and writing — a dumped screenshot grid with no captions would feel thin; some effort to source good crops from existing case studies | High — fast visual proof, plus a little of the "thinking" signal case studies already carry | Medium — not a narrative, but each item still says *why*, which is more than a pure gallery | Low–medium — grows a few items at a time, no pressure to keep it "complete" | Excellent — designed to keep growing indefinitely | Very strong — matches the analytical, HCI-researcher voice already established everywhere else on the site |
| **B. Selected Works gallery** | Fastest to build; most direct reuse of the four existing concept pieces; maximum breadth-per-second | Closest to literally recreating the old showcase, which the brief explicitly rules out; no reflection/writing lowers the signal beyond "can make things look nice"; risk of reading as a Dribbble clone, which undercuts the researcher positioning | High for breadth, lower for depth | Low | Low | Good, but same curation risk as A without the mitigation | Weak on its own — needs A's captions to avoid feeling like a step backward |
| **C. Design Playground** | Strongest "curious craftsperson" signal; most distinct from a typical polished-only portfolio; good fit for an HCI-research identity | Only works if there's a genuine, ongoing practice of producing this kind of material — otherwise it launches thin and ages badly, which conflicts with the portfolio's honesty principle; highest ongoing-maintenance expectation of any option | Medium–high, niche appeal | High, if genuinely ongoing | High — a stale "playground" looks worse than no playground at all | Depends entirely on Aseer's actual ongoing habits, not guaranteed | Risky right now — better as a future evolution of A than a starting point |
| **D. Fold into About** | Zero new navigation or IA decisions; lowest implementation risk; keeps Work/Research pages exactly as they are | Buries the content on a lower-traffic page; doesn't get its own "moment"; weakest at the specific job of *fast breadth signaling*, since a recruiter has to already be on About to find it | Low–medium, discovery-dependent | Low | Low | Fine, but low-impact | Safe, but doesn't really solve the problem — more a hedge than a solution |
| **E. Component Showcase** | Extremely strong signal for design-engineering-adjacent roles specifically; ties directly into the portfolio's recent CTA rewrite welcoming "design engineering collaboration"; genuinely novel/memorable if built well | Much higher build cost (real interactive components, not images) — not a small milestone; doesn't actually use the specific asset in question (the four old mockups are full pages, not isolated components); narrower — proves frontend/system craft, not the industry/style *breadth* the old showcase specifically provided | Very high, but for a narrower audience | Medium | Medium–high (components need to keep working, not just look good) | Good long-term, poor immediate fit | Interesting future extension, not an answer to this specific gap |

## 5. Recommendation

**Approach A: Craft.**

It's the only option that directly answers the actual question — "how do I show breadth without another project" — without quietly becoming either a recreation of the old showcase (B), a promise I'm not sure is genuinely ongoing (C), a page nobody will find (D), or a much bigger build than this gap calls for (E).

Concretely, I'd recommend:

- **Name:** "Craft." Quiet, one word, consistent with how the rest of the site already talks about craftsmanship in its own code comments and design principles. ("Design Notes" or "Studies" are reasonable alternates if "Craft" feels too close to other sites' naming.)
- **Content mix:** roughly two-thirds real-case-study details (a zoomed transition from Lumi, a state change from Convay Mobile App Revamp, a layout decision from Arenberg) the visitor hasn't already seen at that resolution, and one-third labeled concept explorations pulled and re-cropped from the four old showcase pieces — not the full-page dumps, just the strongest individual moments from each (LearnSync's hero type treatment, FundMatch's gradient/dark-mode contrast, Calmly's conversational UI states, UniJobs' listing layout).
- **Structure:** grouped by theme (type & layout, motion & state, mobile & conversational patterns), not by fictional company name — this reads as "here's what I've learned about X" rather than "here are four fake products," which is a stronger, more senior framing.
- **Every item gets a caption**, one or two sentences, in the same first-person, plain-spoken voice as the rest of the site. No item pretends to be a case study or a real shipped product.

## 6. Why this is stronger than simply restoring the old Design Showcase

- **Honesty.** The old showcase never disclosed that its four products were concept work, not real or shipped. The portfolio's own stated principle is "never invent information, never exaggerate" — silently restoring four unlabeled fake companies as a "project" doesn't meet that bar. Craft fixes this by labeling concept work as concept work, explicitly and without apology.
- **Focus.** A recent milestone was spent specifically removing weak, unfocused entries (a placeholder thesis project, an unrelated cause page) to sharpen what's on the site. Restoring a full "project" made of four unrelated fictional products would partially undo that work. Craft isn't a project — it doesn't compete with Work or Research for attention or count against that focus.
- **Voice.** Every other page on this site reflects and explains; the old showcase just displayed. Adding a line of reasoning to each piece is a small amount of extra effort that turns passive display into a small proof of design judgment — which is worth more to a hiring manager than the image alone.
- **Reuse over duplication.** Craft doesn't need all-new material. It's mostly a new way of looking at things that already exist (case-study details never shown at this zoom, plus the genuinely reusable parts of the old showcase's own source work) — "derived assets are encouraged" is already this project's own stated principle.

## 7. How it would integrate into the existing portfolio

- **Navigation:** add "Craft" to the primary nav, positioned between Work and Research. It sits naturally between the two "prove it" tracks as the lighter, faster one — someone who just read a Work case study can immediately see more range without committing to another full read.
- **Homepage:** no dedicated homepage section for now. The Homepage Finalization milestone just finished trimming the homepage to its essentials (hero, Design/Research split, two featured cards, status line, footer); adding another section immediately after would undercut that work. Craft is one click away via nav — if it earns a homepage moment later, that's a separate, deliberate decision, not a default.
- **Work/Research pages:** untouched. Craft is a third, distinct thing, not a tab or filter within either index.
- **Relationship to case studies:** each Craft item that's pulled from a real case study can link back to it ("from Lumi," "from Convay Mobile App Revamp"), so Craft feeds traffic toward the real case studies rather than away from them.
- **Visual treatment:** deliberately quieter than a ProjectCard — no "flagship" badge, no "View case study" hover label, no reading-time implication. Simple image + short caption is enough to signal "this is a smaller thing" at a glance.
- **Future scalability:** built as an ever-growing list from day one — new items get added in small batches whenever there's a genuinely interesting detail to add, the same way the rest of the portfolio has grown milestone by milestone. No expectation of ever being "finished" or "complete."

## 8. Risks and trade-offs

- **Under-curation risk.** If it launches as a large, loosely-captioned dump, it reads as filler and actively works against the "focused, curated portfolio" positioning. Mitigation: launch small (roughly 8–14 items), every item captioned, cut anything that doesn't clearly earn its place.
- **Staleness risk.** An abandoned "living" page ages worse than no page at all. Mitigation: treat future additions as genuinely optional, not a recurring obligation — better to have 10 strong items untouched for a year than to pad it on a schedule.
- **IA confusion risk.** A third nav item sitting next to Work and Research could blur the line between "real project" and "sample." Mitigation: distinct visual treatment (no case-study affordances) plus a short intro line on the page itself stating plainly what it is and isn't.
- **Positioning risk.** Concept/practice work sitting anywhere near real client work always carries some risk of the two being conflated. Mitigation: explicit labeling per item, and keeping the section's overall visual weight clearly secondary to Work and Research.
- **Effort trade-off.** This is a genuinely new page and content type, not a quick edit — it needs its own scoped milestone (curation, new cropped assets from the old showcase source file, writing captions, building a new lightweight card/grid component), not something to squeeze into an unrelated small change.

---

No implementation has been done. Waiting for a decision on the approach (or changes to it) before building anything.

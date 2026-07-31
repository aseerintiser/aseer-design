# Resume Strategy Research

Research only. Nothing in this document has been implemented. `src/app/resume/page.tsx` and `src/content/site.ts` are unchanged: the Resume page's download button is still the same disabled, "link pending confirmation" placeholder it's been since the migration, because of the two conflicting Google Drive links found back then. That underlying conflict is a separate, concrete problem that needs resolving regardless of which strategy below you pick, flagged again in Section 6.

---

## 1. Research findings

I looked at real personal sites, not just portfolio-advice articles, wherever I could find them, and treated the advice articles as secondary evidence. Three real sites anchor this research:

- **[Katie McCurdy](https://www.katiemccurdy.com/)**: healthcare UX designer/researcher, industry-only portfolio, one resume.
- **[James Landay](https://www.landay.org/)**: Stanford CS professor, HCI, co-founder of Stanford HAI. Academic-only, one CV.
- **[Alexandra Ion](https://alexandraion.com/)**: CMU HCII Assistant Professor. Academic-only, one CV.

Plus written guidance from [Nielsen Norman Group's UX researcher portfolio article](https://www.nngroup.com/articles/ux-researcher-portfolio/), [Johns Hopkins' Imagine career center on CVs vs. résumés for doctoral students](https://imagine.jhu.edu/resources/how-to-write-effective-resumes-and-cvs-for-doctoral-students-and-postdocs/), and general PhD-to-industry transition advice (MIT CAPD, ResumeBuilder, others).

**Direct answers to your ten questions:**

**1. Should a personal portfolio have a resume download at all?** Yes, essentially universally, in every real example and every piece of written guidance I found. Nobody argues against having *some* path to a downloadable credential document. The question that actually varies is placement and prominence, not existence.

**2. Where is it typically placed?** Not where you'd expect. On McCurdy's site, "Résumé" isn't a top-level nav destination competing with "Work"; it's in the *footer* nav row, and separately mentioned inline, as a plain sentence inside the About-page prose ("Download my resumé," linked directly to the PDF). Landay is the exception: "CV" sits directly in his top nav, one of five items. The difference tracks the audience: Landay's site serves people who already know who he is (students, journalists, collaborators, conference organizers) and want one specific document fast; McCurdy's site is aimed at a hiring manager who needs to be convinced by the *work* first, with the resume as confirmation once they're already interested, not the first thing offered. Ion's CV isn't in navigation at all; it's one line inside the Contact block, next to her LinkedIn and Google Scholar links.

**3. Is it common to provide both an Industry Resume and an Academic CV?** As simultaneous public downloads on the same personal website, I found no real example of this. Not one. The career-guidance literature is unanimous that you *maintain* both (Johns Hopkins' Imagine center: "a CV is best when applying for awards, fellowships, and jobs within academia... a resume demonstrates your preparation to work on specific tasks"), but every source frames this as maintaining two documents for two different *application contexts* (you send the CV to a search committee, you send the resume to a recruiter), not as two buttons sitting side by side on a homepage for a general visitor to choose between. This absence of precedent is itself a finding, not a gap in my search: it suggests a public dual-document selector is not an established convention, just an available option nobody seems to have needed.

**4. Would two documents create confusion, or read as lack of focus?** Reasoned through, rather than found stated outright: a design hiring manager doesn't want or need "Academic CV" as a visible option: it's irrelevant to their decision, and its mere presence could read as a signal that this person is somewhat academic-flavored rather than a focused industry practitioner, which is a real (if soft) risk in a competitive design hiring process. A PhD supervisor, symmetrically, is used to a CV being *the* comprehensive record; seeing a slick, bullet-heavy "Resume" offered as an alternative next to it could read as trying to look impressive rather than as thorough. Neither audience is well served by watching you visibly hedge between two self-presentations at the exact moment they're evaluating you. This is a plausible risk, not a proven one; I'm flagging the reasoning, not asserting it as settled fact.

**5. How do people who intentionally bridge industry and academia handle this?** The two academic examples I found (Landay, Ion) don't actually face your exact problem: they're both established, tenured faculty whose entire visiting audience already arrives academically inclined; a single CV is the correct, sufficient artifact for essentially everyone who lands on either site. Neither is simultaneously job-hunting in industry. The closer parallel to your situation (someone early-career, actively presenting to *both* audiences at once) comes from the PhD-to-industry transition literature, and its answer is: keep the documents separate and tailor them per application, not per public webpage.

**6. How do HCI researchers with strong design portfolios present themselves?** Both real academic examples I found lean almost entirely on plain, declarative prose and a publication list, closer to "no persuasion at all" than to a designer's portfolio in tone (this echoes what I found in the earlier Homepage Copy Review research). Neither treats a downloadable document as something that needs design-portfolio framing; it's just a fact, offered plainly.

**7. How do designers who later pursue PhDs present themselves?** I could not find a real personal-website example of this specific transition captured mid-flight (a working designer's site, updated in place, showing both an existing design portfolio and a newly added academic-application layer). The closest material was advice-article guidance (e.g., a political-science PhD candidate building a UX portfolio from scratch, writing about the process on Medium) rather than a live site to observe directly, worth being honest that this specific answer is thinner than the others.

**8. How do industry researchers (Microsoft Research, Google Research, Apple HCI, Meta Reality Labs) expose resumes/CVs?** I was not able to locate specific individual personal websites for researchers at these labs through search (most surface only via their employer's institutional profile page, Google Scholar, or LinkedIn, not an independently hosted personal site with its own resume link). I don't want to state a confident pattern here I couldn't actually verify, flagging this as an open gap rather than guessing.

**9. Are there examples with no resume shown at all?** None in my direct research, but it's a well-understood pattern in principle: extremely well-known people (where the portfolio itself, or reputation, already does the convincing) sometimes omit a resume entirely, on the logic that anyone who needs one badly enough will ask directly. This doesn't fit an early-career context where a recruiter or professor has never heard of you before landing on the page; the resume is doing real verification work at that stage, not just formality.

**10. What conventions have emerged recently?** Nothing dramatically new. If anything, the McCurdy pattern (resume demoted from a nav-level destination to a footer link plus an inline mention) reflects a broader, slow shift in portfolio advice toward "let the case studies do the convincing; the resume is confirmation, not the pitch", consistent with what the earlier Homepage Copy Review research also found (specific, concrete work beats credential-listing as the thing that actually persuades).

---

## 2. Observed conventions, with reasoning

**Convention: Resume/CV lives outside the primary nav (footer, About-page prose, or Contact block), not as a top-level destination.**
Why it exists: the case studies are the actual evidence; a nav item literally labeled "Resume" placed at the same level as "Work" implicitly tells a visitor the resume is equally important evidence, which undersells the work itself.
Who it benefits: anyone whose real strength is the portfolio content, i.e., you.
When it works: when the site already has strong, specific case studies (yours does).
When to avoid it: if you have very little shippable case-study work yet and the resume genuinely *is* your strongest asset. That isn't your situation.

**Convention: One document, not two, on any single real site observed.**
Why it exists: a public homepage doesn't know in advance who's about to read it; a document has to work as a single default for whoever arrives, whereas a job or fellowship application already knows its own audience and can be tailored per-application instead.
Who it benefits: visitors who want a fast, unambiguous answer to "can I trust this person's credentials," without a decision to make first.
When it works: when one document (yours would be the Industry Resume, given your primary-audience list) can honestly represent you to the majority of visitors.
When to avoid it: if your visitor mix is genuinely closer to 50/50 industry/academic *right now*, which, per your own stated primary/secondary audience split, it currently isn't.

**Convention: Secondary-audience documents get placed near the content that makes them relevant, not in the universal nav.**
Why it exists: a research collaborator or PhD supervisor is far more likely to already be reading your Research page or the Lumi case study when they start wondering "does a fuller CV exist": that's the moment the document is useful, not the homepage.
Who it benefits: the secondary audience gets served without adding a decision point for everyone else.
When it works: when the secondary audience is real but genuinely secondary (matches your own stated framing).
When to avoid it: if research credibility is actually your *primary* goal (e.g., you were applying to PhD programs starting now, not later). Then this would be backwards, and the CV should be the prominent one.

---

## 3. Approaches: pros and cons

**A. Industry Resume only, no CV anywhere on the site.**
Pros: simplest, zero risk of the "hedging between two identities" problem, matches your stated primary audience exactly, matches every real single-document example found.
Cons: a PhD supervisor or research collaborator who wants the fuller academic record (full publication/thesis detail, supervisors, etc.) has no path to it from the site itself and has to ask you directly or find it elsewhere (LinkedIn, email).

**B. Academic CV only, no industry resume.**
Pros: matches your stated secondary-only positioning for academia if you decide the site should lean fully into "portfolio for practice, CV for everything else."
Cons: actively wrong for your stated primary audience: a design hiring manager doesn't want a publication-format document, and this would be optimizing for the smaller of your two audiences. Not recommended given your own stated priorities.

**C. Both documents, shown together with equal prominence (e.g., two buttons side by side on one Resume page).**
Pros: technically serves both audiences without forcing you to choose.
Cons: no real precedent found for this working well; carries the "visibly hedging" risk discussed in Section 1, Q4; makes the site's identity tension visible at exactly the moment a visitor is deciding whether to trust you.

**D. Contextual placement: Resume prominent (footer + About/Contact-adjacent), CV placed quietly near research-relevant content (Research page and/or the Lumi case study), not in primary nav at all.**
Pros: matches the one real, closely-analogous pattern found (McCurdy: resume demoted from nav, placed where and when it's actually wanted); respects your own stated primary/secondary split instead of treating both audiences as equal; each document appears exactly where the visitor who wants it already is.
Cons: two files to keep in sync/updated instead of one; slightly more implementation surface (two link locations instead of one); requires clear, honest labeling so neither reads as hidden.

**E. No resume/CV at all, work speaks for itself.**
Pros: avoids the whole question.
Cons: wrong fit for an early-career visitor who's never heard of you before: the resume is doing real verification work at this stage that reputation can't yet do on its own. Not recommended.

---

## 4. Recommendation

**Approach D: Industry Resume as the one prominent, generally-discoverable document (footer + About page, not a dedicated top-level nav item); Academic CV placed quietly and specifically near your research content (Research page and/or the Lumi case study), not in the primary nav.**

Reasoning: this is the approach best supported by both your own stated priorities (industry-first primary audience, academia as a real but secondary audience) and the one real precedent that's actually analogous in spirit (McCurdy's resume-as-confirmation-not-pitch placement), while avoiding the one approach (C) that has no supporting precedent and a plausible, reasoned-through downside. It also means the *default* experience (for the large majority of visitors, who are industry-facing) never has to look at, wonder about, or be distracted by a second document that isn't for them, while the smaller audience that specifically wants the CV finds it exactly where they'd naturally go looking (the research content itself).

This also resolves, without extra machinery, the exact discoverability problem you're trying to avoid: nobody has to click a confusing "which document am I?" selector, because each document sits next to the content that makes it the obviously right one to want.

---

## 5. Alternative options

- **If you expect PhD applications to become your near-term primary goal** (not just a long-term possibility), Approach D should flip: CV becomes the prominent document, Resume becomes the contextual one placed near Work/case studies. Worth revisiting this whole question if that timeline changes.
- **A single, well-designed "credentials" page that leads with the Resume and offers the CV as a clearly secondary, plainly-labeled link at the bottom of the same page** is a lighter-weight variant of D if you'd rather not touch the Research page or Lumi case study at all. Slightly less "found in context," but simpler to build and maintain.
- **Approach A (Resume only, no CV on the site at all)** is a legitimate, defensible simplification if you'd rather not maintain two public-facing links at all. The CV would still exist and could be sent directly to anyone in academia who asks. This trades a small amount of academic discoverability for real simplicity.

---

## 6. Trade-offs

- Whichever approach you choose, the **actual resume file itself is still unresolved**: the migration found two different Google Drive links for what should be the same document (nav's old link vs. the About page's old link), and the current Resume page's download button has been a disabled placeholder this entire project because of that conflict. That's a separate, concrete fact-check task (which file is current) that has to happen before any of this can go live, independent of the strategic question this document answers.
- Approach D means two files to keep updated instead of one. If you're unlikely to keep both current, a single document (Approach A) is more honest than a stale second one.
- Contextual placement (D) is slightly less discoverable for an academic visitor who lands on the homepage and leaves without ever reaching the Research page. That's a real but small risk, mitigated by the fact that a PhD supervisor or collaborator evaluating you seriously would very likely read the research work itself before wanting the CV anyway.

---

## 7. Confidence level

**High**: that some resume/credential document should exist, and that a single, contextually-placed pair (not a side-by-side dual selector) is better supported by real precedent than showing both with equal prominence.

**Medium**: on the exact placement mechanics (footer vs. About-page-inline vs. Contact block for the Resume; Research page vs. Lumi case study specifically for the CV). The real examples found don't map onto your exact hybrid situation precisely, so this is reasoned extrapolation from adjacent precedent, not a directly observed match.

**Low-Medium**: on Q7 and Q8 specifically (designers-turned-PhD-applicants, and industry-research-lab personal sites). I was not able to find strong direct evidence for either, and said so rather than filling the gap with a confident-sounding guess.

---

## Waiting on your review

No implementation has happened. If Approach D (or one of the alternatives) looks right to you, next steps would be: confirm which resume file and which CV file are actually current, decide exact placement, and only then touch `content/site.ts` / `app/resume/page.tsx` / navigation.

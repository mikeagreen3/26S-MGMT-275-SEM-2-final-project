---
type: methodology
domain: mba
course: mgmt275-pm-delivery
status: ready
created: 2026-05-10
updated: 2026-05-10
---

# NotebookLM Source Corpus

> Inputs to load into NotebookLM as the grounding layer for AI-simulated host interviews. Ready to use the moment TA approval comes back on the methodology (see `ai-simulated-interviews-plan.md` Phase 0). Every persona quote must trace back to one of these sources.

## How to use this file

1. Create a NotebookLM notebook titled "MGMT 275 — STR Host Pain Points Corpus."
2. Add each source below as a Web link (for Reddit/blogs) or upload (for PDFs).
3. In Claude interview sessions, when a persona needs a verbatim quote, query NotebookLM with the question, paste the answer back as the persona's evidence.
4. Skip a source if NotebookLM rejects it (paywall, redirect, video) and note the skip in `interviews/raw/source-corpus-log.md`.

## Tier 1 — Reddit threads (primary user-voice data, 12 sources)

Already extracted and cited in `../../appendix-working-notes/q1-reddit-host-pain-points-findings.md`. Treated as raw user research, not as PR-FAQ citations (per syllabus policy).

| # | Subreddit | URL | Pain coverage |
|---|---|---|---|
| 1 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1pgsdhx/guests_locked_out/ | A (six-hours-away host, Wi-Fi drops, can't fix remotely) |
| 2 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1s7oi49/yale_assure_2_lock/ | A (midnight calls, keypad non-response) |
| 3 | r/vrbohosts | https://www.reddit.com/r/vrbohosts/comments/1pzesic/for_hosts_using_smart_locks_schlage_yale_august_or/ | A + B (Schlage lock reset, Hospitable fallback, multi-unit) |
| 4 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/18bi7j3/issues_with_schlage_encode/ | A (couldn't add new code remotely, fixed itself next day) |
| 5 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1eh5ovv/battery_procedures_with_schlage_encode_plus/ | A (battery replacement workflow, Host Tools founder comments) |
| 6 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1nx0kir/do_you_automate_the_creation_of_smart_lock_access/ | B (cleaner-code automation, PMS workflow gap) |
| 7 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/13yji3p/august_locks_2_locks_same_airbnb_different_codes/ | B (multi-door code mismatch, API workaround) |
| 8 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1jurso2/opinion_the_smart_lock_is_the_single_best_upgrade/ | B (last-four-digits-of-phone keypad workflow) |
| 9 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1gr92d8/automated_lock_code_from_airbnb/ | B (manual six-digit code configuration, advance scheduling) |
| 10 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1i2apwk/airbnb_not_generating_august_lock_codes_with_last/ | B→A (auto-generation failure becomes lockout risk) |
| 11 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1nw9vht/getting_started_giving_cleaners_special_access/ | B (cleaner role/permission setup) |
| 12 | r/airbnb_hosts | https://www.reddit.com/r/airbnb_hosts/comments/1rkj8w5/remote_door_code_changing/ | B (remote code change recommendations) |

## Tier 2 — STR host operations blogs (workflow context, 6-8 sources to add)

Add the most recent + most-host-focused posts. NotebookLM will rank them lower if they're marketing-heavy; that's fine, we want them for vocabulary and persona detail, not as authority.

- Hospitable blog — search "smart lock," "guest access," "check-in." Pick 2 recent posts.
  - https://hospitable.com/blog/
- Hostfully blog — search "smart lock integration," "access automation." Pick 2 recent posts.
  - https://www.hostfully.com/blog/
- iGMS blog — search "smart lock," "check-in automation." Pick 1-2.
  - https://www.igms.com/blog/
- AirHosta / AirHost Academy — pick 1-2 host-experience posts referencing lock setup or check-in flow.
- *Optional:* one host-podcast transcript if available (Get Paid for Your Pad, STR Unfiltered).

**Selection rule:** prefer posts with named hosts, specific anecdotes, and concrete workflow descriptions. Reject anything that's purely "5 reasons to use a smart lock" SEO content.

## Tier 3 — Smart lock product reviews (brand-specific texture, 5-10 sources)

These give personas a credible reason to mention specific brand frustrations. Pull from sources that allow longer-form review text.

- **Amazon reviews — Schlage Encode:** filter to 3-star reviews from verified purchasers, last 12 months. Aim for 5 reviews.
- **Amazon reviews — Schlage Encode Plus:** same filter, 3 reviews.
- **Amazon reviews — Yale Assure 2:** same filter, 3 reviews (will surface keypad non-response complaints).
- **Amazon reviews — August Wi-Fi Smart Lock:** 2 reviews (multi-door confusion already in Reddit, but adds non-host voice).
- **The Verge / Wirecutter smart lock reviews:** 1-2 review articles for Schlage Encode comparing brand reliability and battery life.

**Skip pattern:** reviews under 50 words, reviews from non-verified purchasers, and reviews that read as paid placements. NotebookLM doesn't filter these, we have to.

## Tier 4 — Allegion strategic context (company-grounding, 2-3 sources)

For personas who want to opine on "why hasn't Schlage already done this?" — provides realistic boundary on what they'd expect from the company.

- **Allegion 2024 10-K** (Form 10-K filed with SEC, FY2024). https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001579241&type=10-K
- **Allegion Q4 2024 earnings call transcript** — for product roadmap language. Available on Seeking Alpha or company IR page: https://investor.allegion.com/
- *Optional:* Allegion Investor Day presentation (most recent), if accessible.

**Citation note for PR-FAQ:** These are SEC and corporate IR sources, which are explicitly allowed under the syllabus citation policy.

## Tier 5 — Industry context (optional, 2-3 sources)

Lower priority. Use only if a persona needs to ground a market-size or growth-rate claim.

- Airbnb 2024 10-K (host count, listing count). https://investors.airbnb.com/financials/
- AirDNA market reports (host segmentation), if accessible without paywall.
- Grand View Research smart lock market report (cite carefully — assignment forbids Statista, and Grand View is similar; use for grounding only, not for PR-FAQ citation).

## Excluded (deliberately)

- Wikipedia entries — banned by syllabus.
- Statista pages — banned by syllabus.
- Generic listicles ("Top 10 Smart Locks 2026"). Adds noise, no host voice.
- TikTok or YouTube videos — NotebookLM can't ingest reliably.
- Twitter/X threads — would need individual scraping, low payoff for the effort.

## Corpus assembly checklist

- [ ] All 12 Tier 1 Reddit URLs added to NotebookLM
- [ ] 6-8 Tier 2 blog posts selected and added
- [ ] 10-12 Tier 3 product reviews copy-pasted into a single doc (NotebookLM accepts text uploads) and added
- [ ] Allegion 10-K downloaded and uploaded
- [ ] Allegion Q4 2024 earnings transcript added
- [ ] Total source count: aim for 25-30 documents (NotebookLM's effective context plateaus around 50)
- [ ] Run a "Notebook Guide" pass — if NotebookLM's auto-summary doesn't surface the STR-host pain themes, the corpus is too noisy and needs trimming

## Provenance log

When corpus is finalized, add a `corpus-loaded.md` to `interviews/` with:
- Date assembled
- Final source count per tier
- Any sources skipped and why
- Link to the actual NotebookLM notebook URL

This is part of the methodology section in `ux-eval-appendix.md` — graders will look for it.

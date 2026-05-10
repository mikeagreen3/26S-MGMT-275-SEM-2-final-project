---
type: research
domain: mba
course: mgmt275-pm-delivery
created: 2026-05-10
updated: 2026-05-10
---

# Research Queries

Reusable prompts for Perplexity, Claude, and other research tools. Each query is paired with the decision it informs.

---

## Q1 — Hero feature: Pre-Arrival Health Check vs. Natural-Language Code Management

**Decision it informs:** Which feature should lead the PR-FAQ press release. Currently the v1 PR leads with Pre-Arrival Health Check; eval and experiment writeups go deep on NL Code Management. Need to know which pain point STR hosts actually talk about more.

**Tool:** Perplexity (Reddit-focused). Fallback: manual `site:reddit.com` Google search.

**Prompt:**

```
Search Reddit (r/airbnb_hosts, r/AirBnB, r/airbnb, r/vrbohosts, r/Superhost,
r/PropertyManagement, r/realestateinvesting STR threads) for discussions by
short-term rental hosts (Airbnb/VRBO, 1-10 properties) about smart lock pain
points over the past 3 years.

I'm comparing two distinct host pain points to decide which is more painful
and more frequently discussed:

PAIN POINT A: Lock failures at check-in that hosts didn't know about in
advance. Examples: dead batteries, Wi-Fi disconnects, codes that didn't sync,
keypad stopped responding. The frustration is "I had no idea anything was
wrong until the guest called locked out."

PAIN POINT B: The manual friction of creating, managing, and rotating access
codes for cleaners, guests, contractors, and family. Examples: building each
code in a multi-field form, forgetting to revoke codes, conflicts between
overlapping codes, no easy way to set recurring access ("cleaner every
Tuesday").

For each pain point, return:
1. Approximate frequency of mentions (relative to each other — A is mentioned
   2x as often as B, etc.)
2. Intensity of language (which one generates more emotional/angry threads vs.
   matter-of-fact complaints)
3. 3-5 representative verbatim quotes per pain point, with subreddit and
   approximate date
4. Any patterns: does property count correlate with which pain point hosts
   care about? (1-property hosts vs. 5+ property hosts)
5. Specific products mentioned (Schlage, Yale, August, igloohome, etc.) and
   whether the complaint correlates with one brand

Cite each finding with the Reddit thread URL.

Do NOT include: complaints about smart locks in general (only the two pain
points above), complaints from renters/guests (only host perspective),
opinions from smart-home enthusiasts who aren't STR hosts.
```

**How to use the result:**
- Verbatim quotes feed the Customer FAQ in `prfaq.md` ("Why this product?")
- Quotes can supplement the UX appendix as anonymous "voice of the host" alongside real interviews
- Frequency + intensity numbers settle the hero-feature question

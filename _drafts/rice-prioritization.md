---
type: assignment
domain: mba
course: mgmt275-pm-delivery
deliverable: appendix-justification
status: draft
created: 2026-05-10
updated: 2026-05-12
revision: 2
---

# RICE Prioritization — STR Host Access Problems

> Used to justify the problem chosen for the final project and to settle the v1 PR-FAQ hero-feature question. Goes into the appendix as the "why this problem versus others" section. References Reddit findings in `q1-reddit-host-pain-points-findings.md`.

## Update — May 12 (revision 2)

Revisited after completing the **Schlage STR Host Agent design exercise** ([schlage-ai-agent-design.md](../../schlage-ai-agent-design.md)). The exercise sharpened the JTBD, named specific failure modes with deterministic guardrails, committed to anti-goals, and chose an agent shape. Three things change in this table as a result:

1. **A new winning candidate: C-pre.** The agent design committed to a tighter scope than full C (pre-arrival readiness only, lock side only, guest + cleaner code lifecycle only). That scope has its own RICE row now, and it's the v1 recommendation.
2. **Confidence on C rose, effort on C rose more.** The design proved technical feasibility (raises confidence) but also exposed work the original table under-counted: reconciliation layer, multi-property data model, F1/F2 infrastructure, eval set (raises effort).
3. **Two rejected candidates added** to document the strategic discipline: D (remote unlock as emergency intervention — anti-goal) and F (whole-stay continuous monitoring — deferred to v2).

The original analysis below is preserved so the provenance is auditable. Numbers and recommendation are updated.

## Problem candidates

Three problem framings were evaluated for v1. All three sit inside the same surface area (front-door access for STR hosts), but they imply different products, different SMART metrics, and different hero stories. After the agent design exercise, a fourth candidate (C-pre) emerged as a refinement of C.

| ID        | Problem                                                                                                                                                                                                                                                                                                                                                           | Source signal                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| A         | Lock fails at the moment of guest check-in (dead battery, Wi-Fi drop, keypad non-response, sync failure).                                                                                                                                                                                                                                                         | Reddit Pain A cluster: "guests locked out," midnight calls, six-hours-away hosts, remote-access cutoffs.                                          |
| B         | Host spends ongoing manual effort creating, rotating, and revoking access codes for guests, cleaners, maintenance, and owners across booking events.                                                                                                                                                                                                              | Reddit Pain B cluster: cleaner-code automation threads, last-four-digit phone keypad rotation, two-door August code mismatch, PMS integrations.   |
| C         | Combined: host cannot trust their front door because B (sloppy code management) silently turns into A (lockout at check-in) at the worst possible moment.                                                                                                                                                                                                         | Reddit research bottom line: B converts to A. Combined framing has the highest narrative coherence.                                               |
| **C-pre** | **Pre-arrival readiness only.** When a guest is about to arrive, the host wants proactive confidence the lock will work — without checking each property — so they never get the "I'm locked out" call. Includes the guest + cleaner code lifecycle that gates this moment. Excludes continuous in-stay monitoring, non-booking-tied codes, and learned defaults. | Agent design exercise JTBD (`schlage-ai-agent-design.md` §1). Reddit Pain A + the operational subset of Pain B that touches the booking turnover. |

## RICE scoring — v1 candidates

Scoring period: one quarter of host operation. Effort estimated as v1 build months. Confidence reflects Reddit-evidence strength, technical risk from product-brief, and (revision 2) technical de-risking from the agent design exercise.

| Problem | Reach (% of STR hosts touched per quarter) | Impact (0.25-3) | Confidence (%) | Effort (person-months) | RICE |
|---|---|---|---|---|---|
| **A. Lock fails at check-in** | 35% — Reddit shows pain is intense but actual lockout events are episodic. Multi-property remote hosts skew higher; single-property occupied-by-owner hosts skew lower. | **3** (massive — single event triggers 1-star review, refund, listing penalty, emergency support cost) | 80% — Reddit evidence is qualitative and skews toward people who post when angry; true event-frequency probably lower than discussion-frequency. | 6 — lock telemetry monitoring, pre-arrival risk model, push notification stack, remote remediation flow, multi-channel fallback. | (35 × 3 × 0.80) / 6 = **14.0** |
| **B. Manual code management** *(rev 2: effort re-priced)* | 87.5% — nearly every host with bookings and any non-self cleaner touches this every booking cycle. | **1.5** (operational, not catastrophic — but compounds with property count and adds friction to every reservation) | 90% — Reddit shows this everywhere across brands, property counts, and operating models. | **6** *(was 4)* — original 4-month estimate excluded reconciliation layer, multi-property data model, and the surrounding infrastructure the agent design exposed. Re-priced for consistency with full C and C-pre. | (87.5 × 1.5 × 0.90) / 6 = **19.7** *(was 29.5)* |
| **C. Combined access reliability** *(rev 2: confidence up, effort up)* | 95% — union of A and B. Every host with bookings touches B; many of those also experience A; the rest fear it. | **3** (combines the operational frequency of B with the catastrophic severity of A; product can promise "your door will work when the guest arrives" as one line) | **88%** *(was 85)* — agent design proved technical feasibility, named specific guardrails for F3/F4 catastrophic failures, articulated specific moats per competitor (esp. firmware-level diagnostics vs. Operto/RemoteLock), and gave the combined product a single JTBD-coherent promise. Cap stays at 90% until synthetic interviews land. | **10** *(was 8)* — +reconciliation layer (silent booking-API failure mitigation), +multi-property data model rework in Schlage Home app, +F1 alert eligibility/dedup infra, +F2 known-culprit catalog with confidence-thresholded attribution, +eval set construction with judgment-quality monitoring. Net of anti-goal scope cuts (no remote unlock, no guest comms, no firmware mid-stay, no auto-extend, no smart defaults v1). | (95 × 3 × 0.88) / 10 = **25.1** *(was 30.3)* |
| **C-pre. Pre-arrival readiness (rev 2 — agent-design JTBD scope)** | **90%** — every host with bookings hits the pre-arrival moment of truth; small discount for very-low-booking hosts. | **2.75** — single binary moment of truth ("the lock will work when the guest arrives"). Slightly below full C's 3 because the daily code-management value of B is in v2, not v1. | **90%** — technically de-risked by the agent design walkthrough; scope clarity is high; F3/F4 catastrophic failures have explicit deterministic guardrails; eval skeleton already drafted. At the doc's confidence cap. | **7** — full-C effort minus continuous in-stay monitoring (-2 mo), minus owner/maintenance/contractor code surface (-1 mo). Keeps booking sync with reconciliation, guest+cleaner code lifecycle, multi-property model basics, F3/F4 guardrails, F1 alert infra, eval set. | (90 × 2.75 × 0.90) / 7 = **31.8** |

## RICE scoring — considered and explicitly excluded from v1

These rows aren't candidates. They're documented to make the prioritization a traceable record of the agent design's anti-goal and scope decisions, not just a confirmation of the chosen answer.

| Problem | Reach | Impact | Confidence | Effort | RICE | Status |
|---|---|---|---|---|---|---|
| **D. Remote unlock as emergency intervention.** When all recovery paths have failed and a guest is locked out, the agent unlocks the door from the cloud. | 5% — only the narrow tail of cases where push retry, manual app push, and host intervention all failed. | 3 — saves the moment when it works. | 20% — legal exposure (unauthorized entry risk), fraud abuse vectors, brand catastrophe if the wrong person triggers it once. Mostly downside. | 5 — security review, fraud detection, abuse-prevention rate limits, legal sign-off, support flow. | (5 × 3 × 0.20) / 5 = **0.6** | **Anti-goal** per agent design Q6 #1. Never agent-initiated. Documented here so future "couldn't we just unlock it?" requests have a written rationale. |
| **F. Whole-stay continuous monitoring.** Agent runs continuously through the booking window, catching battery dips, Wi-Fi drops, code-expiry edge cases mid-stay. | 95% — every booking has an in-stay window. | 1.5 — most catastrophic failures cluster at check-in (which C-pre catches). Mid-stay issues are real but recoverable in most cases. | 75% — technically feasible but eval surface is much larger; alert-fatigue risk higher; long tail of mid-stay edge cases. | 12 — full-stay state machines, multi-signal correlation, broader F1 alert-eligibility tuning, in-stay extension handling, support-flow coverage. | (95 × 1.5 × 0.75) / 12 = **8.9** | **Deferred to v2** per agent design (JTBD scoped to pre-arrival only). v2 trigger: C-pre activation > 40% and a real user-data signal that mid-stay issues drive support contacts. |

## Interpretation

- **C-pre wins on RICE: 31.8.** Higher than full C (25.1) and B (19.7) once the latter two are re-priced with consistent agent-design rigor.
- **The decision is not "C-pre because of the score."** The decision is "C-pre because the agent design produced a tighter JTBD that maps to a smaller, sharper v1 with the same moat." The RICE math confirms the framing.
- **B re-priced loses to itself.** B at 4 months effort (29.5 RICE) was structurally under-priced; once you include reconciliation, multi-property model, and the eval set that B would also need, B is 19.7. The original "B beats A by 2.1x" line no longer holds at consistent pricing.
- **Full C is the v2+ ceiling, not the v1 build target.** C represents the end-state product (every loop closed across guest, cleaner, maintenance, owner, mid-stay monitoring). C-pre is the entry point that earns the right to expand into full C.
- **A loses on every axis except impact intensity.** Standalone A is a niche reliability play that requires high telemetry investment for an event any given host might see once a year. Building A first creates a "demo-good, daily-quiet" product. C-pre subsumes A's moment-of-truth value inside a broader workflow.
- **D and F are documented losses, not contested ones.** D is a permanent no (anti-goal). F is a deferral (v2 with named triggers).

## Recommendation

**Pick C-pre for the final project v1.** Justification:

1. **JTBD reads as one promise.** "I never get the 'I'm locked out' call." Binary outcome per booking. The agent design exercise validated this as a coherent single-job product, which the original C framing was always at risk of being two jobs in a trench coat.
2. **Catastrophic failure modes are bounded.** F3 (revoke mid-stay) and F4 (ready when not ready) have explicit deterministic guardrails. Technical confidence is at the doc's cap (90%).
3. **Moat is specific.** Firmware-level diagnostic depth vs. the aftermarket category (Operto, RemoteLock, PointCentral), North American residential channel vs. Yale, broader installed base + un-penetrated STR market vs. August (now Yale). Articulated per competitor; not "Schlage has a brand."
4. **v1 effort is bounded at ~7 person-months.** Smaller than full C (10), pricier than original B (4) but with a sharper product. For MGMT 275, the demo scope of C-pre is "one screen that says 'ready' or 'needs intervention' with a clear reason" — which is also the most-read artifact the agent produces.
5. **v2 path is named.** Full C becomes the explicit expansion (continuous in-stay monitoring, broader code-lifecycle workflows, learned smart defaults with guardrails). Not the v1 surface, not abandoned either.
6. **Anti-goal discipline is on the record.** D (remote unlock) and F (whole-stay v2) are listed with reasoning. Future scope-creep requests have written rationale to bounce against.

## Implication for PR v2 hero framing

The original C framing led with "every loop in your access workflow." C-pre is tighter: lead with the moment of truth.

**Revised PR lede candidate:**
> *Schlage today launched AI Access Concierge, a new operating layer for short-term rental hosts that catches the lock problems that would have left a guest locked out — before guests ever arrive.*

This is one promise, binary outcome, lock-specific (which the moat supports), and doesn't over-claim the daily workflow value that lives in v2.

**Body structure for the PR:**
- Open: the "I'm locked out" call. The host's nightmare scenario.
- The agent's pre-arrival check (the "moment of truth" payoff). What it verifies, what it does when something's wrong.
- The trust mechanism: deterministic guardrails (in plain language) for the catastrophic failures.
- The Schlage-specific assets that make this defensible (firmware-level diagnostics, end-to-end stack).
- What's next (v2: full-stay coverage, broader code-management workflows).

Don't lead with the alert. Hosts don't shop for alerts. They shop for "my door will work."

## Implication for SMART metrics

Revised for C-pre scope:

- **North star (lagging):** Guest-entry success rate ≥ 98% for scheduled access events, 12-month window.
- **Activation (leading, v1 scope):** ≥ 80% of bookings receive a definitive pre-arrival check signal (either "ready" or a specific "needs intervention" alert) within the configured pre-arrival window (default 6 hours before check-in).
- **Health (leading, v1 scope):** ≥ 70% of "needs intervention" alerts are acknowledged and resolved before check-in.
- **Restraint (leading, v1 scope — new for C-pre):** False-positive "ready" rate ≤ 1% (i.e., the agent said ready and the guest still couldn't get in). This is the F4 failure mode measured directly.
- **Outcome (lagging):** Host support contact volume related to access issues down ≥ 30% within 6 months.

The original "Activation (B side)" metric — "≥ 40% of users issue ≥ 1 NL-scheduled code in first 30 days" — moves to the v2 metric set, since natural-language code scheduling is the v2 expansion surface, not the v1 hero.

These tie back to the eval-writeup §1.1 metric set and the agent design's 3-behavior eval skeleton (severity tiering on Wi-Fi disconnect, cleaner rotation under partial signal, confidence-gated attribution).

## Open trade-offs to flag

1. **Audience tension is real.** ~95% of Encode buyers are not hosts. A host-first product story risks alienating the broader base. Mitigation in the brief: host features stay opt-in / segmented in the app. The PR can stay host-focused without breaking the non-host experience.
2. **API fragility is sharper for C-pre than for full C.** Pre-arrival readiness requires a booking signal. If the Airbnb/VRBO webhook is delayed or fails, the agent silently does nothing — the worst failure mode the agent design surfaced. Mitigation (also surfaced by the design): reconciliation layer (periodic full-calendar pulls), multi-source fallback (webhook + scheduled poll + PMS aggregator), and a separate "sync stale" alert so silent failure becomes visible. This must ship in v1.
3. **Confidence ceiling.** RICE Confidence column tops out at 90% because we have no real interview data yet. Re-score after Phase 4 of the simulated-interview plan; if synthetic interviews surface a stronger pain not captured in Reddit, revisit problem framing before locking PR-FAQ.
4. **Commercial / B2B parallel is out of scope for v1, deliberately.** Allegion has a commercial security business (offices, multifamily, hotels) with a different audience, different SLA expectations, longer sales cycles, and different security/compliance gates. The agent design's surface (residential STR hosts) does not generalize cleanly to commercial. Note the opportunity exists, but a v1 residential agent must not be designed in ways that *block* a later commercial agent (e.g., assuming a single property owner, hardcoding STR-specific role types). Flag in source-of-truth as a roadmap consideration, not a v1 scope item.
5. **Firmware co-design is the strongest moat claim and the least independently verified.** The recommendation rests partly on "Schlage can ship firmware that makes the agent smarter than any aftermarket layer." Validate against the Encode/Encode Plus actual firmware capabilities before locking the PR-FAQ. If firmware-level diagnostics aren't reachable on the current installed base, the moat narrative needs a revision (probably toward "Schlage owns the cloud + command channel" — still defensible against aftermarket, but a weaker claim).

---

*This file feeds:* `prfaq.md` (hero framing, SMART metrics) → `ux-eval-appendix.md` (problem justification section) → interview guide (concept presentation framing).

## Revision history

- **rev 1** (May 10) — initial 3-candidate analysis (A, B, C). Recommended C.
- **rev 2** (May 12) — added C-pre as the agent-design-scoped refinement; re-priced B and C effort for consistency; raised C confidence after technical de-risking; added rejected rows D (anti-goal) and F (deferred v2); revised PR lede and SMART metrics to match C-pre scope; added commercial-parallel and firmware-co-design trade-offs. Recommendation changed from C to **C-pre**.

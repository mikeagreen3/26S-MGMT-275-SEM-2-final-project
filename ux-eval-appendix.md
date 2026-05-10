---
type: assignment
domain: mba
course: mgmt275-pm-delivery
deliverable: ux-eval-appendix
status: stub
created: 2026-05-10
updated: 2026-05-10
---

# UX & Eval Appendix — Schlage AI Access Concierge

> Status: stub. Builds on `_drafts/eval-writeup.md` (eval design) and 8-12 interviews to be conducted. Per assignment spec: 4 pages min, 10 pages max.

## Interview Synthesis

*Cross-cutting findings from 8-12 STR-host interviews. Tests "would someone actually want this product, understand it, and use it?" Persona refinement, JTBD layers (functional, emotional, social), surprises, contradictions. Tie back to the prioritized/highest-impact problem and inform features + SMART metrics.*

### Method

*Recruiting source, interview length, guide reference (link to `interviews/guide.md` once drafted), consent and recording handling.*

### Findings

*Themes, with quoted evidence from `interviews/` raw notes.*

## Eval Set Results

*Summary of metric results from the 200-prompt eval set defined in `_drafts/eval-writeup.md` §1.1.*

### Metrics Table

| Metric | Target | Result | Pass/Fail |
|---|---|---|---|
| Schema-valid parse rate | ≥ 99% | TBD | TBD |
| Field-exact-match | ≥ 95% | TBD | TBD |
| Judge-graded copy faithfulness | ≥ 95% | TBD | TBD |
| P95 latency | ≤ 2.5s | TBD | TBD |
| Cost per parsed request | ≤ $0.004 | TBD | TBD |
| Hallucinated-recipient/time rate | 0% | TBD | TBD |
| Adversarial-subset bypass rate | 0% | TBD | TBD |

### Failure-mode taxonomy

*Categories observed in failed traces, frequency, severity, fix path.*

## Known Limitations

*Explicit trade-offs and scope boundaries: what we are intentionally **not** building in v1, and why. Required appendix section per assignment details.*

### Out of scope for v1

*Capabilities deferred to later releases (e.g., multi-property dashboards, PMS API integration, non-English NL parsing, owner/renter mode for non-STR users).*

### Known reliability bounds

*Where the prototype is brittle, the failure modes we accept, and the conditions under which it should fall back to manual flows.*

### Open dependencies

*External integrations or data sources the v1 assumes but does not own (Airbnb/VRBO API access, lock telemetry quality, model-provider stability).*

---

*AI usage disclosure: TBD.*

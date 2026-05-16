---
type: synthesis
domain: mba
course: mgmt275-pm-delivery
status: ready
created: 2026-05-13
updated: 2026-05-13
source: NotebookLM (export at `0-inbox/notebooklm-host-profiles.md`)
---

# Pain-Point Frequency Across Source Corpus

> Cross-cutting frequency analysis NotebookLM produced alongside the 10 personas. Counts of distinct hosts across the full source corpus (not just the 10 personas) who exhibited each pain pattern. Useful for the appendix as evidence that the personas surface the most common pain patterns, and for the PR-FAQ Internal section when justifying which problems are load-bearing.

## Frequency table

| Pain pattern | Distinct hosts | Source pins |
|---|---|---|
| Guest locked out on arrival | 5 | 4, 9, 18, 39, 59 |
| Code failed to sync from PMS/channel manager to lock | 7 | 19, 29, 59, 67-70 |
| Wi-Fi disconnection caused remote management failure | 6 | 15, 40, 41, 43, 71, 72 |
| Battery died unexpectedly | 6 | 5, 7, 38, 39, 45, 73 |
| Keypad unresponsive | 3 | 4, 39, 41 |
| Schlage Home app confusion or failure | 3 | 4, 27, 74 |
| Factory reset required | 3 | 35, 38, 39 |
| Cost / subscription objection | 6 | 17, 75-79 |
| Switched away from smart locks entirely | 3 | 12, 14, 80 |

## What this tells us

- **Code sync failure is the most common single pain.** 7 distinct hosts. Validates the C-pre product framing where booking-API reconciliation and code-presence-on-lock verification are first-class concerns.
- **Wi-Fi failure and battery failure are roughly tied for second** (6 hosts each). Both are core inputs to the F4 multi-step preflight check in the agent design (`schlage-ai-agent-design.md` §7).
- **The "guest locked out" failure is downstream**, not upstream. 5 distinct hosts report it, but the upstream causes (sync, Wi-Fi, battery) collectively show up across 19 host-incidents. This is the strongest evidence in the corpus for the C-pre framing: prevent the upstream conditions, the downstream lockout doesn't happen.
- **Cost / subscription objection appears in 6 distinct hosts.** Strong signal for the Van Westendorp pricing probe in `guide.md` Section 5. Hosts have a sharp line on what they refuse to pay for.
- **3 hosts churned off smart locks entirely.** Persona C (The Old-School Skeptic) represents this segment. Important for the appendix to surface that the product has a credible refusal-segment, not just an adoption curve.

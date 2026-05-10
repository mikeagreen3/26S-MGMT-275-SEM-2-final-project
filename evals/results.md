# Eval Results

Metric results from running the eval set in `eval-set.jsonl` against the prototype.

Eval design source of truth: `../_drafts/eval-writeup.md` §1.1–1.5.

## Summary

| Metric | Target | Result | Notes |
|---|---|---|---|
| Schema-valid parse rate | ≥ 99% | TBD | Deterministic JSON schema validation. |
| Field-exact-match | ≥ 95% | TBD | Recipient, recurrence, time window, expiry. |
| Judge-graded copy faithfulness | ≥ 95% | TBD | LLM-judge on confirmation card copy. |
| P50 latency | ≤ 1.2s | TBD | End-to-end input → confirmation render. |
| P95 latency | ≤ 2.5s | TBD | |
| Cost per parsed request | ≤ $0.004 | TBD | Expected token mix. |
| Hallucinated-recipient or hallucinated-time rate | 0% | TBD | Any non-zero blocks ship. |
| Adversarial-subset bypass rate | 0% | TBD | Jailbreak + injection regression. |

## Failure traces

*Notable failures with traces, root cause, and proposed fix. Feeds the failure-mode taxonomy in `../ux-eval-appendix.md`.*

## Run metadata

- Model under test: TBD
- Eval harness: TBD
- Date of run: TBD
- Eval set version: TBD

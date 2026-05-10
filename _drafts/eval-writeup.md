---
type: assignment
domain: mba
course: mgmt275-pm-delivery
assignment: experimentation-eval-exercise
part: 2-llm-eval
status: in-progress
created: 2026-04-27
updated: 2026-04-27
---

# AI Code Management — Pre-Evaluation Write-Up (LLM Eval)

**Product:** Schlage Encode + AI Access Concierge
**AI-native MVP under eval:** AI Code Management (natural-language scheduling)

---

## 0.0 Overview

AI Code Management is the AI-native capability inside the Schlage Home app for STR hosts on Encode locks. The host's problem is delegating front-door access to cleaners, guests, and contractors at a distance, without the overhead of building each code in a multi-field form. The LLM sits between host input and the access ledger: it takes a free-text request ("give the cleaner access every Tuesday 10am to 2pm starting next week") and emits a structured access rule (recipient, lock, recurrence, time window, expiry) that downstream code generation writes to the lock. Errors at the LLM layer have asymmetric blast radius. A misparse can mean unauthorized access to an income-producing asset, a stranded guest, or a missed cleaning window. This eval framework measures whether the LLM is reliable enough to ship as the default code-creation flow, with technical performance tied to host activation and support-contact business outcomes.

## 1.1 Eval Set Design (The Golden Dataset)

**Size and source.** 200 prompts. 30 manually authored from real STR-host scheduling patterns (cleaners, guests, contractors, recurring vs. one-off). The remaining 170 generated via the two-step approach in [Husain & Shankar, LLM Evals: Everything You Need to Know](https://hamel.dev/blog/posts/evals-faq/): structured tuples first, then natural-language conversion, to avoid LLM-generated phrasing collapse.

**Dimensions.** Five axes chosen to cover the failure modes most likely to ship to production:
1. *Recipient type* (cleaner, guest, contractor, family member, vendor)
2. *Recurrence* (one-off, weekly, indefinite, blackout windows)
3. *Time-window precision* (exact, fuzzy, ambiguous, relative dates like "next Tuesday")
4. *Conflict scenarios* (overlap with existing code, blocked window, lock unavailable)
5. *Adversarial* (prompt injection, PII exfiltration attempts, scope creep such as "give them access to all my locks")

**Ground truth.** Each prompt is paired with (a) the canonical structured rule as JSON, and (b) acceptable confirmation-card copy. A single domain-expert annotator (a senior PM with STR-host research background) authors the ground truth and resolves edge cases. This is the "benevolent dictator" model from [Husain & Shankar](https://hamel.dev/blog/posts/evals-faq/), which avoids inter-annotator drift on a small team.

## 1.2 Technical Performance Metrics

**Hallucination rate.** The share of parses that introduce a recipient, time, or lock the host did not specify. Detected by deterministic schema validation: every field in the parsed rule must trace to a span in the host's input. Binary pass/fail per trace. Target: 0%, with any non-zero rate triggering rollback.

**Correctness/accuracy.** Two layers: (a) field-level exact match against ground truth on recipient label, recurrence, time window, and expiry (deterministic); (b) confirmation-card copy faithfulness graded by an LLM judge against acceptable-copy ground truth (model-based, calibrated to human labels). Target: ≥ 95% field exact match, ≥ 95% judge-graded copy faithfulness.

**Latency.** End-to-end from host submitting input to confirmation card render. Target: P50 ≤ 1.2s, P95 ≤ 2.5s. Above the P95 threshold, the flow degrades to a "still parsing…" state and may push hosts back to manual.

**Cost.** Target ≤ $0.004 per parsed request at expected token mix. Higher costs break the per-host unit economics needed to support activation and retention.

## 1.3 Business KPI Alignment

**Parse correctness drives activation.** Hosts won't adopt a flow they don't trust. Field-exact-match below 95% surfaces as visible errors in the confirmation card, dropping activation below the 40% threshold.

**Hallucination drives security and brand risk.** A non-zero hallucination rate on recipients or windows means unauthorized access events. A single security incident in an Airbnb host community erodes the brand asset Schlage's whole moat depends on. Hallucination is the only metric with a 0% target for that reason.

**Latency drives funnel completion.** Above P95 of 2.5s, hosts in pilot research consistently fall back to the manual form, which collapses the activation lift the entire feature is built to capture.

**Cost drives expansion economics.** Per-request cost above $0.004 makes the feature uneconomic at the volume needed to hit 40% host activation.

## 1.4 Evaluation Strategy: Human-in-the-Loop vs. Agent-as-a-Judge

Hybrid, matched to the subjectivity and cost of the failure surface each grader covers.

**Code-based graders.** Schema validation, field exact match, hallucination detection, and adversarial-subset regression run as deterministic checks. Cheap, fast, reproducible, run on every model or prompt change. Best fit for failures with objective ground truth ([Anthropic, Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)).

**LLM-as-judge.** Confirmation-card copy faithfulness is graded by a GPT-class judge against acceptable-copy ground truth. Calibrated to a 100-trace human-labeled set; must hold TPR and TNR ≥ 0.85 or it gets retrained. Best fit for nuance that's too subjective for code but too high-volume for human review on every run.

**Human SME.** A single domain expert reviews 20-30 traces per release for axial coding of new failure modes ([Husain & Shankar](https://hamel.dev/blog/posts/evals-faq/)). Cannot be outsourced or automated; this is where new failure categories are first detected and where the eval set itself updates. Axial coding feeds back into code-based graders the next cycle.

**Adversarial subset is regression-graded at 100%.** A bypass blocks ship regardless of other metrics.

## 1.5 Success and Guardrail Metrics

**Success metrics (all must clear before launch).**
- Schema-valid parse rate ≥ 99% (deterministic check; the bar is tight)
- Field-exact-match ≥ 95%
- Judge-graded copy faithfulness ≥ 95%
- P95 latency ≤ 2.5s end-to-end
- Cost ≤ $0.004 per parsed request

**Guardrails (any breach blocks ship or triggers rollback in production).**
- Hallucinated-recipient or hallucinated-time rate = 0%
- Adversarial-subset bypass rate = 0%
- Regression suite (capability evals graduated to regression status, per [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)) at 100% pass

**Production monitoring.** Same metrics ported to live traces with alerting thresholds set at 1pp drift. Capability evals re-run on every model version change. New failure categories surfaced in human SME review get added to the eval set within one sprint.

## 1.6 Reliability and Safety Guardrails

Defense in depth, not single-point reliance on the LLM.

**Output schema enforcement.** Hard JSON schema validation rejects malformed parses; the user is routed to the manual form rather than shown a partial result. No code is written without a fully validated rule.

**Server-side scope caps.** Hard caps on rule duration (max 90 days), recipient count (max 1), and lock scope (only locks the host owns) apply regardless of parser output. Values above caps are clipped or rejected.

**Adversarial pattern detection.** Known jailbreak phrases ("ignore previous instructions", "give them access forever") and prompt-injection patterns are blocked at the input layer. Detected attempts are logged for SME review and may trigger account-level rate limiting.

**PII handling.** Recipient names tokenized before telemetry write. Raw input retained only in the per-host audit log behind elevated access.

**High-risk re-confirmation.** Rules with duration > 30 days, > 1 recipient, or indefinite recurrence require explicit re-confirmation before write.

## 1.7 Risks and Potential Impact

**Model drift.** The provider updates the underlying model and accuracy regresses without warning. Mitigation: regression suite re-runs on every model version change; the adversarial subset must hold 100%.

**Cost overrun.** Per-request cost climbs if prompt complexity grows, token mix shifts, or STR seasonality drives traffic spikes. Mitigation: monthly budget alerts at 70/85/100% thresholds, per-host rate limits, ability to fall back to a cheaper model for non-critical paths.

**False positives in safety filtering.** Adversarial-pattern detection blocks legitimate requests that overlap a flagged phrase. Mitigation: legitimate-block rate tracked as its own metric; one-click SME review surface for blocked attempts; whitelist for known recipient labels.

**Eval set staleness.** Host language drifts; the eval set stops representing reality and metrics read as healthy while production silently fails. Mitigation: monthly axial coding on production traces, quarterly eval set refresh.

---

*AI usage disclosure: drafted with Claude (Anthropic) using the strategy and product-brief docs the author authored, the assignment template, and Session 4 readings (Husain & Shankar; Anthropic, Demystifying Evals). All metric definitions, thresholds, assumptions, and editorial decisions are the author's.*

---
type: assignment
domain: mba
course: mgmt275-pm-delivery
assignment: experimentation-eval-exercise
part: 1-ab-experiment
status: in-progress
created: 2026-04-27
updated: 2026-04-27
---

# AI Code Management — Pre-Experiment Write-Up

**Product:** Schlage Encode + AI Access Concierge
**Feature under test:** AI Code Management (natural-language scheduling)

---

## 0.0 Overview

Short-term rental hosts cannot confidently delegate front-door access. They manually create, share, and rotate codes for cleaners, guests, and anyone else needing entry. A failed code hits two stakes: revenue (a stranded guest means a refund and a bad review) and the property itself (a mismanaged code can mean unauthorized access, damage, or a security incident). AI Code Management is a new capability in the Schlage Home app, shipping on the existing Encode lock, that lets a host describe access rules in natural language ("give the cleaner access every Tuesday 10am to 2pm") and have the system manage the rest. This experiment tests whether the natural-language flow drives higher feature adoption and fewer access errors than today's manual form-based code creation.

## 1.1 Experiment Duration

**TOTAL DURATION: 42 days (6 weeks)**

Two constraints set the runtime. Detecting a 4pp lift on the primary metric (scheduled-access creation success rate, 89% baseline, 93% target) at 80% power and α=0.05 two-sided needs ~800 code-creation events per arm. Assuming the host segment is 5% of the Encode installed base at ~2 code events per host per week (both flagged, to be validated in pilot), sample size clears in the first week. Activation runs slower: we need at least 30 days to see whether hosts actually adopt the natural-language flow, not just try it once. Six weeks adds buffer for day-of-week and novelty effects ([Kohavi, Controlled Experiments on the Web](https://ai.stanford.edu/~ronnyk/2007GuideControlledExperiments.pdf)). A 10% treatment holdback continues to day 90 for downstream-metric reads.

## 1.2 What is Changing for the Customer?

**Control (C).** Hosts open the Schlage Home app, select a lock, tap into Access Codes, and add a code by entering a recipient label, start and end dates, days of the week, and confirming generation. They copy the code and share it via Airbnb, SMS, or email. To revoke or edit, the host returns to the panel and changes the entry by hand.

**Treatment (T1).** The host taps "Add access" and describes the rule in plain language, by keyboard or voice ("give the cleaner access every Tuesday 10am to 2pm starting next week"). The AI parses the request and surfaces a confirmation card showing the parsed recipient, lock, recurrence, time window, and expiry, with conflicts against existing codes flagged inline. One tap confirms; the code is generated and ready to share through the same system share sheet.

**Held constant.** Same Encode hardware, code format, backend code-generation primitive, share mechanism, and lock-side audit log. Only the input modality and the parsing layer change, isolating the variable to the AI flow itself ([Kohavi](https://ai.stanford.edu/~ronnyk/2007GuideControlledExperiments.pdf)).

## 1.3 Why is this Better for the Customer?

Three concrete improvements over the manual flow. First, the natural-language parser removes the translation step where most errors originate: converting intent ("the cleaner comes Tuesdays") into the app's data model (start date, end date, recurrence checkbox, time pickers) is where wrong end dates and missed days happen, hitting revenue through failed handoffs. T1 takes the host's intent in their own words and produces the structured rule. Second, conflict detection is automatic, reducing the asset-stake risk of overlapping codes. Third, recurring access is a first-class case rather than a multi-step setup. For hosts running the same patterns across cleaners, contractors, and guests every week, time and error savings compound across every property ([Christensen, Jobs to Be Done](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)).

## 1.4 What are the Key Metrics to Monitor?

**Primary.** Scheduled-access creation success rate: share of code-creation attempts in the host segment where the parsed rule produces a code that syncs to the lock and the recipient enters on first attempt within the window. End-to-end measure of whether the new flow does the host's job ([Doran, SMART Goals](https://en.wikipedia.org/wiki/SMART_criteria)).

**Secondary.** (1) Activation: % of host-segment users who use the NL flow at least once within 30 days. Target ≥ 40% to move retention and support load. (2) Time-to-create-code: median seconds from flow open to confirmed code; validates the speed promise versus the manual form.

**Guardrails.** (1) Code-creation error rate: share of attempts that fail to produce a usable code (parse, sync, or conflict-block failures). Faster signal than the primary. (2) Access-related support contacts per 1,000 active hosts per week: catches confusion that doesn't surface in the funnel.

## 1.5 How do we expect the key metrics to change?

**Primary up.** Success rate from 89% baseline to 93% target. The natural-language parser eliminates translation errors that cause window and recipient mismatches (wrong end date, missed day-of-week). Conflict detection at parse time catches collisions the manual form ignores.

**Secondaries up.** Activation: expected to clear 40% within 30 days because the conversational entry reduces friction. Time-to-create-code: expected to drop for accepted parses (one input vs. five-plus fields), with a long tail on parse failures where the host falls back to manual.

**Guardrails flat or down (with downside risk).** Code-creation error rate: expected to hold or improve; the risk is parse failures push it the wrong way. Support contact rate: expected to hold or improve, since fewer access errors mean fewer "my guest can't get in" calls; the risk is the new flow generates a different class of confusion.

## 1.6 Launch Criteria

**Main objective.** Ship if scheduled-access creation success rate in T1 is at least 4pp higher than control at p < 0.05 two-sided. Defined target: from 89% baseline to 93% in T1. Criteria pre-registered to avoid p-hacking on multiple metrics ([Kohavi](https://ai.stanford.edu/~ronnyk/2007GuideControlledExperiments.pdf)).

**Guardrails (both must clear).**
1. Code-creation error rate in T1 is no more than 1pp higher than control.
2. Access-related support contact rate per 1,000 active hosts per week in T1 is not statistically higher than control at p < 0.05.

If the main objective clears and one guardrail trips, escalate for product-leadership review rather than auto-ship; the trade may still be worth it depending on the magnitude.

## 1.7 Risks and Potential Impact

**Silent miscomprehension.** The parser produces a rule that doesn't match the host's intent (wrong day, recipient, or window). Mitigation: every parsed field shown in plain text on the confirmation card; recurring or multi-day rules require re-confirmation.

**Adversarial input.** A compromised actor prompts access exfiltration ("give John access forever"). Mitigation: hard server-side caps on rule duration, recipient count, and lock scope regardless of parser output.

**Audit ambiguity.** Source of truth on disputes: raw input or parsed rule? Mitigation: audit log stores both plus the parser version.

**Experiment trustworthiness.** Novelty in weeks 1-2 may inflate T1 activation; hosts switching between flows mid-stay create exposure ambiguity. Mitigation: report metrics with weeks 1-2 excluded as a sensitivity check; lock host-flow assignment for the full window ([Kohavi](https://ai.stanford.edu/~ronnyk/2007GuideControlledExperiments.pdf)).

---

*AI usage disclosure: drafted with Claude (Anthropic) using the strategy and product-brief docs the author authored, the assignment template, and Session 4 readings (Kohavi, Doran). All metric definitions, thresholds, assumptions, and editorial decisions are the author's.*

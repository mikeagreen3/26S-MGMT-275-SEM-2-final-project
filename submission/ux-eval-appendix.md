---
type: assignment
domain: mba
course: mgmt275-pm-delivery
deliverable: ux-eval-appendix
status: draft
created: 2026-05-10
updated: 2026-05-13
---

# UX & Eval Appendix — Schlage AI Access Concierge

> Companion to `prfaq.md` and `source-of-truth.md`. The Interview Synthesis section reflects 10 AI-simulated user interviews conducted on 2026-05-13. The Eval Set Results section will be populated after the 200-prompt eval run defined in `../appendix-working-notes/eval-writeup.md` is executed. Per assignment spec: 4 page min, 10 page max.

## Interview Synthesis

### Method

Group 3 ran **10 AI-simulated user interviews** against synthetic STR-host personas, in lieu of recruiting live hosts. The methodology was approved by the TA on 2026-05-11 (see `../_assignment-refs/faculty-correspondence.md`). Full pipeline documented in [`interviews/methodology.md`](./interviews/methodology.md). Summary:

1. A 25–30 source corpus (Reddit threads from r/airbnb_hosts and r/vrbohosts, STR operations blogs, Schlage and competitor product reviews, Allegion 10-K) was loaded into NotebookLM as the grounding layer.
2. NotebookLM generated 10 distinct personas with source-pinned quotes ([`interviews/personas/`](./interviews/personas/)). Personas vary along five axes: property count (1 / 2–4 / 5+), pain dominance (hardware failure / code management / both / refusal), tech savviness (low / medium / high), lock brand (Schlage Encode, Schlage Connect, August, Yale + August Connect, Kwikset Halo, Kwikset SmartCode 270 offline), and operating model (solo / cleaners / PMS-automated / churned).
3. Each persona was run through a shared 7-section interview guide ([`interviews/guide.md`](./interviews/guide.md)) covering warm-up, problem validation, concept presentation, solution comprehension, usage intent + Van Westendorp pricing, anti-goal stress test, and wrap. Transcripts averaged ~2,770 words; all are available at [`interviews/raw/`](./interviews/raw/).
4. Anonymized per-persona syntheses live at [`interviews/host-{a-j}-*.md`](./interviews/). This section pulls cross-cutting findings out of those 10 files.

**Limitations explicitly named** (see methodology §Limitations for full discussion): synthetic personas don't push back on a bad question the way a live stranger would; emotional intensity from a transcript alone is bounded; the Reddit-heavy corpus biases toward vocal, tech-engaged hosts; Claude's behavioral tendencies (agreeableness, pattern-completion) can soften disagreement even with explicit "push back" instructions. Production research would triangulate with 6–8 live interviews and a quantitative survey (n=50–100). Documented as next-step work, not a gap in this submission.

### Findings

#### 1. The pre-arrival readiness check is the wedge — but only if it's a real device-side ping, not a dashboard read

Nine of ten personas named the pre-arrival readiness check as the single strongest pull in the concept. The framing held across very different operating models: solo single-property (A, B, D), portfolio operators on existing PMS stacks (E, H, I, J), and the Schlage-at-scale customer (G). Even Host C, the skeptic who churned off smart locks entirely, conceded value on the "not ready" alert specifically.

The critical condition: the check has to ping the lock physically, not read app state. Host A surfaced this directly:

> "The app is the broken part. If your new product is built on top of the same app that lies to me about battery levels, why is bolting AI on top going to fix that?"

Host E (the Hospitable + SmartThings persona) sharpened the strategic implication. Their existing stack can verify codes were *pushed*. It cannot verify codes are *present on the lock*. That hardware-aware confirmation is what Schlage owns that a software-only competitor cannot:

> "I will not pay for a third bridge layer to connect software I already own. That's the deal-breaker. But the code-on-lock check, that I can't get from Hospitable."

**Implication for v1.** The product narrative should lead with "code present on the lock" verification, not generic readiness. Anything that reads as "another dashboard" loses the multi-property savvy segment immediately.

#### 2. The "ready" message is contested. The "not ready" message is not.

Hosts split on the happy-path notification. Some want minimal confirmation ("Beach house is ready for the Smiths, 3pm check-in" — Host B). Some want explicit silence on success ("I don't need a green light every single time. I need a red light when it matters" — Host F). Host C went further and asked the team to cut the ready message from v1 entirely, citing notification blindness risk.

The "not ready" message produced consensus. Every persona who engaged with the question demanded: which property / which door, specific failure mode, time remaining to check-in, prescribed next action, and a one-click resolution path inside the notification. Vague alerts ("lock issue detected, check the app") will erode trust faster than no alert at all. Host A:

> "If I get an alert that says 'lock issue detected' and nothing else I will scream."

**Implication for v1.** Default the ready message to a configurable "silent on success" mode for hosts who want it. Treat the "not ready" message as the highest-stakes copy in the product; the schema should require specific failure type, lock identity, and action in every alert.

#### 3. Cleaner code rotation is the single most fragile feature in the spec

Nine of ten personas pushed back on auto-rotating cleaner codes. The pattern is consistent: hosts run long-tenured cleaner relationships with permanent codes, treat the cleaner as part of the operating infrastructure, and view auto-revoke as a *new* failure mode the product introduces. Host C framed it as a category error:

> "You're solving a problem I don't have by creating a problem I will have. Let the host decide when the cleaner's code is dead. We know our people. You don't."

Host A added a specific operational risk: cleaners sometimes return next-day for forgotten supplies or touch-ups. Auto-revoke at end-of-window creates a "Tuesday rotation, Wednesday lockout" scenario the host can't fix from a meeting. Host G, paying for paid software on Schlage hardware today, framed the trust gradient:

> "Get the check right, prove it works for ninety days, then earn the right to touch my codes."

**Implication for v1.** Default cleaner rotation off, opt-in only, with a confirmation step ("rotation happened, confirm to commit") for the first 30–60 days before enabling fully automatic mode. Several personas (F, G, J) volunteered this design unprompted.

#### 4. Anti-goal validation is mostly strong, with two specific tensions

Each of the four committed anti-goals tested differently:

| Anti-goal | Endorsement | Tension |
|---|---|---|
| No remote unlock | **Unanimous endorse** (10/10) | Host J: "Thank god. That is the right answer." |
| No after-stay surveillance | **Unanimous endorse** (10/10) | Host B: "That feels creepy." Read as risk-reduction, not gap. |
| No auto-extension of guest code | **Unanimous endorse** (10/10) | All hosts want to own the money/trust call. |
| No guest messaging | **9/10 endorse, 1 partial flip** | Host J would opt in for code-issue notifications direct to guests, rationale: "messaging doesn't open the door." |
| No in-stay monitoring | **9/10 implicit endorse, 1 pushback** | Host G demanded mid-stay battery ping on multi-night bookings. They've lived through mid-stay lock-death. |

The two tensions are worth carrying into the PR-FAQ Internal anti-goals defense. Host J's flip surfaces a useful design principle that the anti-goals can be sharpened around: the bias should be against *physical actuation* without host consent, not against feature scope generally. Notifications and proactive sync-retry don't open the door; they reduce the cases where the host has to. Host G's pushback on in-stay monitoring is grounded in real failure history and may justify a narrow exception (battery only, no other signals) on multi-night bookings.

**Surprise worth flagging.** The skeptic persona (Host C, who churned off smart locks) cited the anti-goals as the most compelling part of the product:

> "The anti-goals are the only reason I'm still in this conversation."

This is a counterintuitive finding for the messaging strategy. A frame built around what the product *won't* do may land harder with skeptic and refusal segments than a feature-led pitch.

#### 5. Pricing converges $7–$12/month for hosts who'll pay, with two refusal patterns and one clear displacement anchor

Van Westendorp four-point pricing across the cohort:

| Host | Too expensive | Expensive (considering) | **Great deal** | Suspiciously cheap |
|---|---|---|---|---|
| A — Frustrated App Wrestler (1 unit) | $30/mo | $15/mo | **$7/mo** | <$3/mo |
| B — Coastal Panic (1 unit) | $40/mo | $25/mo | **$10/mo** | $3/mo |
| C — Old-School Skeptic (1 unit) | Any non-zero | refused | **$0 / bundled** | inverted question |
| D — August Agonizer (1 unit) | $20+/mo | $12–15/mo | **$5–7/mo** | <$2/mo |
| E — Lakehouse Automation (per property) | $25 | $15 | **$7** | <$3 |
| F — Yale Yale-er (per property) | $50 | $25 | **$10** | <$3 |
| G — Warranty Warrior (~13 locks) | $40+ | $25–30 | **$10–12** total | <$4 |
| H — Kwikset Convert (per property) | $40 | $20 | **$8–10** | <$3 |
| I — Operations Optimizer (4-unit total) | $60+ | ~$40 | **$25 total** | <$10 |
| J — Auto-Lock Agnostic (per property) | $40 | $25 | **$12** | <$5 |

Three patterns:

1. **Convergence at $7–$12/month per property** for the hosts who'll engage with subscription pricing at all. This is a tight band across very different portfolio sizes and tech-savviness levels.
2. **Subscription refusal is a real segment.** Host C refused the four-question battery entirely and would only accept a higher one-time hardware cost (~$300) in lieu of any recurring charge. Host G's pricing was contingent on warranty being bundled into the subscription. Strategic implication: a subscription-only revenue model will fail for these segments. A hardware-tier upgrade SKU or a warranty-bundled subscription tier should be tested before launch.
3. **Displacement anchors are stronger than survey pricing.** Host I (Operations Optimizer) pays ~$30/month for RemoteLock today. She'd cancel RemoteLock and switch entirely if Schlage came in under that price with the readiness check included. This is the most defensible pricing anchor in the cohort because it's grounded in a real budget she's already allocated. The "below RemoteLock" pricing band ($20–$25/month for a 4-unit portfolio) is the conversion threshold for the prosumer multi-property segment.

#### 6. The "software on broken hardware" objection is the most common killer objection

Five of ten personas (A, B, C, G, J) surfaced variants of the same core objection: a subscription on top of hardware they've already paid for reads as a tax on Schlage's failure to ship complete hardware in the first place. Host C made it explicit:

> "Why am I paying you every month to tell me whether the thing I already bought is working? If the lock is good, I shouldn't need a babysitter. If the lock needs a babysitter, the lock isn't good."

Host G, an existing Schlage customer at scale, framed it as double-billing:

> "Why am I paying you a monthly fee to monitor the hardware that you sold me, which fails outside of warranty, which you then refuse to stand behind?"

This objection is load-bearing for purchase intent in a way the C-pre concept does not directly address. The PR-FAQ Internal section needs an explicit narrative on why a software subscription is a different value layer than the hardware (e.g., model improvements, integration maintenance, customer-facing recovery experience). It also needs a position on warranty bundling, since Host G's threshold for paying ("bundle extended warranty into the subscription") is a defensible commercial answer the team can build.

#### 7. Displacement, not acquisition, is the dominant strategic risk for the multi-property segment

Two personas surfaced clear displacement targets:

- **Host E (Lakehouse Automation):** Hospitable PMS + SmartThings hub. Their stack covers ~80% of the Concierge's described scope. Schlage's wedge is hardware-aware code-presence verification (not generic readiness). Conversion conditions: direct Hospitable connector (no middleware), one-screenshot demo of code-pushed-but-not-on-lock, and upgrade or backward compatibility for their existing Schlage Connect (Z-Wave) hardware.
- **Host I (Operations Optimizer):** Schlage Encode hardware + RemoteLock software. RemoteLock costs her ~$30/month for code automation she now considers commodity. The Concierge could displace RemoteLock entirely at the right price ($20–$25/month for her 4-unit portfolio). Her positioning quote:

  > "You're not adding a tool to my stack, you're displacing one."

For Host I in particular, the appendix should flag the positioning implication: do not pitch the Concierge as a Schlage add-on. Pitch it as a RemoteLock replacement for Schlage hardware owners.

#### 8. Hardware switching cost is the gating barrier for competitor-brand hosts

Three personas (D — August, F — Yale, H — Kwikset) are on competitor hardware. Their reactions clustered around the same blocker:

> "I already own four Yale locks I paid good money for and your software doesn't run on them. Why is this my problem to solve, not yours?" (Host F)

> "I'd have to rip out my August lock and buy your hardware to use your software." (Host D)

Both Host D and Host F surfaced the same conversion threshold: a single-property trial with easy return or trade-in. Host F was explicit: "All-or-nothing is how you lose me at the door. One property is how you earn the second." Host D added a financial-skin-in-the-game condition: a per-event refund or month credit when the readiness check produces a false positive, on the rationale that "sorry, we'll do better" was the response that failed them on August's integration.

**Implication for v1 go-to-market.** A single-lock trial offer (one property, one season, easy return) targeted at multi-property competitor-brand hosts is a defensible acquisition wedge. Schlage's launch should lead with greenfield buyers and Schlage Encode upgraders, and treat competitor-brand conversion as a year-two motion built on social proof from the early cohort.

#### 9. Rural connectivity is an unresolved architectural decision

Host H (Kwikset Convert) surfaced what may be the single hardest objection in the persona set:

> "Your product assumes reliable Wi-Fi at the lock. Half of my properties don't have reliable Wi-Fi at the lock. What does the AI Concierge tell me when the lock is offline, and how is that different from what I already get today, which is silence?"

The Concierge is architected as cloud-mediated and Wi-Fi-dependent. For rural STR (mountain, cabin, lakefront), Wi-Fi at the lock is unreliable by default and the very condition the product is designed to detect ("lock not ready") is often the condition that prevents the product from communicating it. Host C raised the same architectural concern from a different angle ("You've built a smoke alarm that turns off in a fire").

Three design requirements emerged:

1. **Cellular fallback for alerts.** Alerts can't ride only on the lock's Wi-Fi. If Wi-Fi is the failure mode, the alert path needs an independent channel.
2. **Explicit offline-state handling.** "Couldn't reach lock" is not an acceptable terminal alert. The product needs defined behavior for offline locks with a clear next-step.
3. **A "could not verify" third state.** Host J asked for this explicitly: beyond ready/not-ready, the product should distinguish "the check ran and the lock is OK" from "the check could not run." Silence reads as ready, and ready when you're not ready is the worst possible state.

The appendix recommends the team make an explicit decision: either rural STR hosts are an explicit non-goal for v1 and the segmentation is named in marketing, or the architecture commits to cellular fallback and explicit offline-state UX. Either answer is defensible. Silence on the question is not.

#### 10. The false-positive readiness event is brand-killing, and the recovery experience matters as much as the primary one

Four personas (B, D, G, J) flagged a single bad false-positive ready message as a one-shot trust event. Host B:

> "I'd rather have no system and check it myself than a system that lied to me. Lying is worse than not knowing."

Host G spent more emotional energy in the interview describing what they want to happen *when the product is wrong* (automated apology, credit, log transparency within an hour) than describing the happy path:

> "The relationship-saving move is what you do when the system is wrong."

**Implication for the eval set.** The accuracy bar on the readiness check should be set explicitly higher than the current eval target of 95% on judge-graded copy faithfulness. A 5% false-positive rate on the readiness check itself would be unacceptable to this cohort; the product probably can't ship at >0.5%. The eval set should add a "false-ready" specific metric with a separate, stricter threshold.

The implication for the product is that the recovery experience (what users see when a false-ready event happens) is not a polish item, it is the brand-trust mechanism. The appendix recommends scoping a v1 incident recovery flow with auto-apology, automatic month credit, and a transparent post-mortem in the host dashboard within one hour of the event.

### JTBD layer mapping

| Layer | Job | Evidence from interviews |
|---|---|---|
| **Functional** | Prevent check-in failures and automate the guest/cleaner code lifecycle | All 10 personas named pre-arrival check-in failure as a primary pain |
| **Emotional** | Get a good night's sleep before arrival days; reduce the chronic dread of refreshing the app | Host A: "I sleep on Thursday night. That's how it changes." Host J: "Pre-arrival uncertainty as a chronic dread loop." |
| **Social** | Protect Airbnb search ranking and review scores; preserve long-tenured cleaner relationships | Host I: "Four-star with a comment about 'confusing entry' and that knocks your search ranking." Host A: "Trust collapses entirely once it touches the relationship with a long-tenured cleaner." |

The functional layer is well-served by the C-pre scope. The emotional layer is the actual buy trigger across the cohort. The social layer is where the cleaner-rotation feature creates as much friction as it removes; v1 should default off.

### Persona clustering

Five behavioral segments emerged from the 10 interviews:

1. **Solo Anxious (A, B):** Single-unit hosts whose primary buy trigger is sleep / anxiety reduction. Pricing band $7–$10/month. Read pre-arrival check as the product. Cleaner rotation: hard pushback.
2. **Schlage At Scale (G):** Existing Schlage customer with portfolio (~13 locks). Buy gate: warranty bundled into the subscription. Without that, software alone does not rescue Schlage's reputation. Trial likely; retention conditional.
3. **PMS-Automated Prosumer (E, H, I, J):** 2–5 properties, PMS-integrated, displacement targets. Conversion is about replacing existing software spend (RemoteLock for I, Hospitable for E and H) or filling the gap (J on OwnerRez). Pricing band defined by the displacement anchor, not by abstract willingness-to-pay.
4. **Competitor Hardware Considerers (D, F):** On August or Yale, multi-year hosts with hardware sunk cost. Single-property trial is the only viable acquisition motion. Year-two conversion built on early-cohort forum signal.
5. **Refusal (C):** Churned off smart locks; trust is broken. Will not accept a subscription. Endorses the anti-goals as the most compelling part of the product. Useful as a counter-voice in messaging strategy, not as a target buyer.

### Surprises and contradictions

A few non-obvious findings worth carrying forward:

1. **The anti-goals do messaging work, not just product work.** Multiple personas (A, B, C, E, F, J) cited the anti-goals as the strongest trust signal in the entire concept. Schlage saying what it won't do reads as discipline, not as a gap.
2. **Code automation is contested as the lead value.** The product team has historically led with the readiness check, treating code automation as commodity. Host H inverted this: "If Schlage shipped just the code automation piece and called it a day, that would still be worth a paid subscription to me." For PMS-orphaned segments (Kwikset users without a Kwikset-Hospitable connector), code automation alone is a paid feature.
3. **The lockbox is sacred.** Host B and Host C both surfaced the physical-key lockbox as psychological infrastructure they will not retire. Product messaging that implicitly positions the smart lock as a lockbox replacement will scare this segment. The frame should be "the Concierge is a second pair of eyes, not a replacement for your backup."
4. **Adjacent product opportunity: moisture sensing.** Host B raised this unprompted. Out of C-pre scope but a paid-upgrade adjacency worth flagging in the roadmap.
5. **"Test the lock now" manual button.** Host D requested this unprompted. The 2-hour pre-arrival window feels right, but multi-property hosts who'd drive to the property want a manual re-run as a control surface as check-in approaches.

### Implications for the PR-FAQ and prototype

The interview findings produce a short list of concrete v1 decisions:

- **Default cleaner-code rotation OFF.** Opt-in only. Confirmation step for first 30–60 days. Build this as a setting, not a launch differentiator.
- **Treat "code-on-lock verification" as the lead value prop, not "readiness check."** This is the specific capability competitive software stacks (Hospitable, RemoteLock) cannot replicate.
- **Add a "could not verify" third readiness state.** Distinguish "check ran and lock is OK" from "check could not run." Silence reading as ready is the worst-case UX.
- **Ship a single-lock trial offer.** One property, one season, easy return or trade-in. The acquisition motion for competitor-brand multi-property hosts.
- **Bundle warranty into a subscription tier.** Either offer a "Concierge + Coverage" SKU that includes hardware warranty, or have a clear story why the subscription doesn't.
- **Tighten the false-positive readiness eval threshold.** 5% is too loose; <0.5% is more defensible against the brand-killing event personas described.
- **Make an explicit rural-segmentation decision.** Either cellular fallback + offline UX in v1, or rural STR is a named non-goal.

---

## Eval Set Results

*Pending execution. Targets and structure defined in `../appendix-working-notes/eval-writeup.md` §1.1. The Interview Synthesis above recommends a stricter false-positive readiness threshold (<0.5%) than the current general copy-faithfulness target.*

### Metrics Table

| Metric | Target | Result | Pass/Fail |
|---|---|---|---|
| Schema-valid parse rate | ≥ 99% | TBD | TBD |
| Field-exact-match | ≥ 95% | TBD | TBD |
| Judge-graded copy faithfulness | ≥ 95% | TBD | TBD |
| **False-positive readiness rate** (new, from interview findings) | **≤ 0.5%** | TBD | TBD |
| P95 latency | ≤ 2.5s | TBD | TBD |
| Cost per parsed request | ≤ $0.004 | TBD | TBD |
| Hallucinated-recipient/time rate | 0% | TBD | TBD |
| Adversarial-subset bypass rate | 0% | TBD | TBD |

### Failure-mode taxonomy

*Categories observed in failed traces, frequency, severity, fix path. Pending eval run.*

## Known Limitations

### Out of scope for v1

- **Multi-property dashboards.** Single-property focus for v1; aggregate views are roadmap.
- **PMS API integration beyond Airbnb / VRBO.** Hospitable, OwnerRez, Guesty are roadmap. Interview signal suggests Hospitable is the highest-leverage second integration (see Host E, Host H findings).
- **Non-English natural-language scheduling.** English-only for v1.
- **Owner / renter mode for non-STR users.** Long-term rentals are not the target use case.
- **Continuous in-stay monitoring.** Per anti-goals. Interview tension noted (Host G mid-stay battery ping); revisit in v2 with narrow scope.
- **Schlage Connect (Z-Wave) compatibility.** Encode and Encode Plus only for v1. Host E's adoption is gated on Connect support.

### Known reliability bounds

- **Wi-Fi at the lock is the critical dependency.** Where Wi-Fi is unreliable (rural / cabin properties), the readiness check degrades from a green/red signal to a "could not verify" state. v1 does not include cellular fallback. See Finding #9.
- **Battery percentage from the lock is approximate.** Several personas (A, G) flagged that the battery indicator can read 80%+ shortly before the lock dies. The product should expose battery percentage as a signal among several, not as a confidence anchor on its own.
- **False-positive ready events are brand-killing.** v1 should weight model conservatism toward "not ready" over "ready" when ambiguous; treat "could not verify" as a first-class state rather than collapsing to ready by default.

### Open dependencies

- **Airbnb / VRBO API access.** Required for booking-event ingestion. Production deployment assumes terms of service compliance and rate-limit headroom.
- **Schlage lock telemetry quality.** The "code present on lock" verification depends on lock firmware exposing the state reliably. Spec-level confirmation needed with the firmware team.
- **Model-provider stability.** Anthropic / OpenAI API uptime and version-rollback behavior. Eval set should include a model-drift detection check on a monthly cadence.
- **Notification channels (SMS, push).** Cost and deliverability assumptions in the eval set. SMS preferred by Host B; push preferred by A, F, G, I, J. Channel selection should be a host preference.

---

*AI usage disclosure: User interviews in this appendix are AI-simulated against synthetic personas grounded in a public source corpus, per the methodology approved by the TA on 2026-05-11. Full methodology, source corpus, persona profiles, and raw transcripts are committed in [`interviews/`](./interviews/). Cross-cutting findings in §Interview Synthesis were synthesized by Claude with human review. The eval set design and prototype implementation are documented separately in `../appendix-working-notes/eval-writeup.md` and `../appendix-working-notes/experiment-writeup.md`.*

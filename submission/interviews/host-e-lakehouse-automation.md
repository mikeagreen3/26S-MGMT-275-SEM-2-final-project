---
type: interview-synthesis
domain: mba
course: mgmt275-pm-delivery
persona: host-e
handle: The Fully Automated Lakehouse Host
date: 2026-05-13
status: synthesis
---

# Host E — The Fully Automated Lakehouse Host (Synthesis)

## Anonymized profile

Multi-year vacation-rental host operating 2-3 lakehouse units across Airbnb, VRBO, and Booking.com. High technical sophistication. Runs a fully PMS-automated stack (Hospitable as system of record, SmartThings hub, Schlage Connect locks via Z-Wave). Solo operator on the host side, rotating cleaning team. Cold-weather lake market; low-connectivity edge cases are routine.

## Top 3 pains (with quotes)

1. **Hardware drops in extreme cold.** "We had a stretch where it hit negative twenty-five Fahrenheit at the lake. The exterior lock would drop offline and reconnect every couple hours all on its own. SmartThings would lose it, find it, lose it."
2. **PMS-integration errors that silently message guests.** "Hospitable's integration didn't like the guest's phone number format... the system then auto-emailed the guest a confusing fallback message with a backup code right before check-in."
3. **Trust tax on a stack that's "supposed to be" automated.** "I check the lock state in SmartThings the morning of arrival just to feel okay. Because the integration has burned me before."

## Reactions per capability

- **Pre-arrival readiness check:** Highest perceived value. The hardware-aware "is the code actually on the lock" specifically beats what their existing dashboard can confirm. This is the wedge.
- **Guest code lifecycle:** Already covered (mostly) by Hospitable. Marginal value unless tied to lock-state verification.
- **Cleaner code rotation:** Skeptical in v1. Wants soft launch with notification + delay/override. "Not in the first six months."
- **Anti-goal: no remote unlock:** Strongly endorsed. "I don't want Schlage holding the unlock authority anyway, that's a liability surface I don't need."
- **Anti-goal: no guest messaging:** Strongly endorsed. Hospitable owns that channel and templates are tuned. "Hard pass."
- **Anti-goal: no auto-extend:** Endorsed. "That's a money decision, not a software decision."

## Standout quotes

- "I will not pay for a third bridge layer to connect software I already own. That's the deal-breaker."
- "Don't make me read three lines. If everything's green, the message is the green."
- "Give me an action, not just a diagnosis."
- "False negatives in low-connectivity environments will train me to ignore the alerts, and then the product is dead."

## Van Westendorp pricing (per property, per month)

- Too expensive: **$25**
- Expensive but considering: **$15**
- Great deal: **$7**
- Too cheap (trust floor): **<$3**

## Killer objection

"I already get most of this from Hospitable plus SmartThings. What does your readiness check do that my dashboard doesn't, specifically, and is the marginal value worth a new subscription and a new account to manage?"

## What surprised us

- The persona enthusiastically embraced every anti-goal, including ones we expected pushback on (no remote unlock). The "stay in your lane" scope is read as trustworthy, not limiting.
- They volunteered cutting cleaner rotation from v1, matching the PM instinct but coming from a trust-of-integration angle rather than a complexity angle.
- The hardware-aware code-presence check (not battery, not Wi-Fi) was the specific feature they couldn't get from their PMS. That's where Schlage's hardware ownership beats software-only automation. Not the readiness check broadly, the code-on-lock verification specifically.
- They asked unprompted about offline behavior in low-connectivity properties. Failure-mode UX matters as much as happy-path UX for this segment.

## Competitive displacement signal

For this persona to add AI Access Concierge on top of their existing Hospitable + SmartThings stack, three things have to be true:

1. **Direct Hospitable integration, not middleware.** They will not pay for a bridge layer or manage a duplicate Schlage account. If integration looks like another connector to configure, churned at signup.
2. **Hardware-aware verification is concretely demonstrated.** The code-on-lock check must be communicated as something their PMS provably cannot do. A single screenshot of "code pushed by PMS but not present on lock" would be sufficient.
3. **Hardware upgrade path or backward compatibility.** Currently on Schlage Connect (Z-Wave), not Encode. They'd consider upgrading only if integration with Hospitable was direct and they could roll the upgrade across both units within one season. If Connect support ever shipped, immediate adoption candidate.

Price ceiling is real but not the gating factor. The gating factor is whether Schlage can credibly own the hardware verification layer without forcing the host to take on a second account and a second source of truth.

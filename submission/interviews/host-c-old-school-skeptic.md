---
type: interview-synthesis
domain: mba
course: mgmt275-pm-delivery
persona: host-c
handle: The Old-School Skeptic
date: 2026-05-13
status: synthesis
---

# Host C — The Old-School Skeptic (Synthesis)

## Anonymized profile

Solo host, one rental unit, Airbnb-only, less than two years hosting. Lives in a region prone to weather events that disrupt residential Wi-Fi. Previously used a name-brand connected smart lock and churned off it after a check-in failure during a storm. Now runs an offline keypad deadbolt (Kwikset SmartCode 270) and a combination lockbox with a backup key. Does most turns personally; uses a trusted local cleaner who holds a static, non-rotated code. Trusts Airhosts Forum and BiggerPockets as primary information channels.

## Top 3 pains (with quotes)

1. **System-of-record dishonesty.** Connected lock dashboards that report green when the lock is actually offline. "The app told me everything was fine, actually. It thought the code was on the lock. It wasn't. That's the part that really got me." This is the formative wound and shapes every reaction below.
2. **Connectivity dependence in adverse conditions.** Wi-Fi outages during storms made remote management impossible at the moment access mattered most. "You've built a smoke alarm that turns off in a fire."
3. **Subscription fatigue on owned hardware.** Refuses recurring fees on a device they paid for outright. "Subscriptions on physical hardware I already bought are a racket. I bought the lock. The lock is mine."

## Reactions per capability

- **Pre-arrival readiness check:** Tepid acceptance, but only if it materially differs from the dashboard that lied to them before. Sees it as a notification layer over a broken hardware experience, not a solution. "It's a babysitter for your smart lock... If the lock worked, you wouldn't need the babysitter."
- **"Ready" message:** Rejects outright. Wants silence on success. Will go notification-blind if greens are sent and miss the one that matters. Suggests cutting it from v1.
- **"Not ready" message:** The single piece they value. Wants plain English, specific failure mode, prescribed next action, delivered as SMS not app push.
- **No remote unlock (anti-goal):** Strong positive. Calls it "the only reason I'm still in this conversation." Surveillance and remote-unlock anti-goals are the product's strongest trust signals to this persona.
- **Code automation:** Indifferent to dismissive. Can program a 4-digit code in 30 seconds and prefers the manual ritual.
- **Cleaner rotation:** Actively hostile. Treats it as the product applying generic security logic to a personal trust relationship. Real operational risk: cleaner sometimes returns next-day; auto-revocation creates a new lockout problem.
- **Anti-goals (extend, message, surveil):** All three endorsed. Particularly emphatic on no guest messaging ("the minute Schlage starts talking to my guests, I'm the third party in my own rental") and no after-stay reporting (data-breach risk).

## Standout quotes

- "The system was lying to me, in a way. Not on purpose. But the dashboard said one thing and the lock said another. So which one am I supposed to trust?"
- "You're solving a problem I don't have by creating a problem I will have. Let the host decide when the cleaner's code is dead. We know our people. You don't."
- "If you tell me I'm ready and I'm not, I will never trust another green checkmark from you again."
- "You've built a smoke alarm that turns off in a fire."

## Van Westendorp

This persona refused to engage with the four-question battery and treated the entire subscription premise as illegitimate.

- **Too expensive:** Any non-zero monthly price. "Not a dollar a month, not five dollars a month, not fifty."
- **Expensive but considering:** Refused to answer.
- **Great deal:** Free, bundled with hardware. Willing to pay a higher one-time hardware cost (called out $300 one-time vs. $5/mo recurring) to avoid a subscription entirely.
- **Suspiciously cheap:** Inverted the question. Any subscription at all makes them question whether the product works, because a working product wouldn't need recurring revenue.

For appendix pricing math: treat this persona as a hard zero on subscription and a soft positive on hardware-bundled pricing.

## Killer objection

"Why am I paying you every month to tell me whether the thing I already bought is working? If the lock is good, I shouldn't need a babysitter. If the lock needs a babysitter, the lock isn't good." This frames the entire product as evidence that the underlying hardware is unreliable, and recasts the subscription as a permanent tax on a defect.

## What surprised us

Two surprises worth pulling forward into the appendix.

First, the anti-goals are this persona's favorite part of the product. We expected the skeptic to wave away the whole concept; instead they singled out the no-remote-unlock and no-after-stay-surveillance commitments as genuinely compelling. The anti-goals are doing more brand work than we credited them with. A messaging frame built around what the product won't do may land harder with the skeptic segment than features.

Second, this persona offered an unprompted product idea: a cellular-fallback failure alert that works when home Wi-Fi is down. The whole reason their original smart lock failed was the same Wi-Fi the readiness check would depend on. If the alert path depends on the same connection that's likely to fail, the value proposition collapses for the exact use case it's pitched at. Worth flagging in the PR-FAQ as an open architectural question.

---
type: interview-synthesis
domain: mba
course: mgmt275-pm-delivery
persona: host-j
handle: The Auto-Lock Agnostic
date: 2026-05-13
status: synthesis
---

# Host J — The Auto-Lock Agnostic (Synthesis)

## Anonymized profile

Remote Superhost managing two active out-of-state Airbnb units (third pending) with Schlage Encode locks and OwnerRez as the PMS. Medium tech savviness, fully automated check-in model, no on-site presence. Two years hosting. Trusts OwnerRez forums and r/airbnb_hosts. Has been burned by hardware/automation failures and now runs a paranoid belt-and-suspenders setup (manual lockboxes with physical keys at every property, auto-lock disabled).

## Top 3 pains (with quotes)

1. **Hardware/sync failure with no advance signal.** PMS API outage left a guest stranded forty minutes; the host had no idea until the guest texted. *"In both cases I had no advance signal. I was running blind until someone was already standing outside in a bad situation."*
2. **Auto-lock incidents causing harm.** Guest stepped outside at 5 a.m., dog inside, door auto-locked. Host five hours away, couldn't get a locksmith out until 10. Three-star review and a locksmith bill. Now disables auto-lock everywhere. *"After the dog incident I went and disabled auto-lock on every property."*
3. **Pre-arrival uncertainty as a chronic dread loop.** Every check-in day, refreshes OwnerRez and the Schlage app repeatedly and still doesn't know if the code synced. *"Not knowing if the sync happened. That's it, that's the whole answer."*

## Reactions per capability

- **Pre-arrival readiness check:** Strong yes. "That is the product to me." Wants the "ready" message as a one-line push notification, two hours out.
- **Code automation:** Lukewarm. OwnerRez already does most of it. Will only switch if Schlage handles the failure modes OwnerRez doesn't, i.e. retry-until-confirmed sync.
- **Cleaner code rotation:** Skeptical. Would not trust auto-revoke at first; wants manual confirm for 30-60 days minimum. Would cut from v1.
- **No remote unlock (anti-goal):** Enthusiastic endorsement. Champion of restraint here.
- **No guest messaging (anti-goal):** Would actually opt in if it existed. See surprises.
- **No auto-extension (anti-goal):** Endorses. Doesn't want squatter risk.
- **No after-stay surveillance (anti-goal):** Endorses on privacy grounds.

## Standout quotes

- *"I don't want it to just observe the failure, I want it to fight the failure."* (Re: code retry behavior.)
- *"Why should I trust this when your own hardware locked a guest out of their own rental at five in the morning."* (Killer objection.)
- *"I'm not anti-feature, I'm anti-feature-that-touches-the-physical-door-without-me."* (On the asymmetry between anti-goals.)
- *"Silence reads as ready, and ready when you're not ready is the worst possible state."*
- *"The lockbox is always the answer for me now."*

## Van Westendorp pricing (per property, per month)

| Point | Price |
|---|---|
| Too expensive | $40 |
| Expensive but considered | $25 |
| Great deal | $12 |
| Too cheap (questionable) | <$5 |

Anchor: "$40 a month per property is locksmith money over a year."

## Killer objection

*"Why should I trust this when your own hardware locked a guest out of their own rental at five in the morning. You're selling me software peace of mind on a hardware platform that I have personally watched fail in a way that hurt a guest. Convince me you're not going to layer software failure on top of hardware failure."*

This is the hardest objection to answer because it ties the new product's credibility directly to existing Schlage Encode hardware failures the host has personally experienced. No software-only response addresses it. PR-FAQ Internal needs an explicit narrative on hardware-failure-aware design (battery thresholds, offline fallback, lockbox advisory in "not ready" messages).

## What surprised us

1. **Strongest anti-remote-unlock champion in the cohort so far.** Section 4.6 landed harder than expected. "Thank god. That is the right answer." The hardware-failure scar tissue is the source.
2. **Would actually want guest messaging.** Despite endorsing every other anti-goal, this host flipped on Section 6.2 and asked for opt-in code-issue notifications direct to guests. Articulated a clean rationale: messaging doesn't touch the physical door, so the risk asymmetry vs. remote unlock is completely different.
3. **Wants the system to ACT on sync failure, not just observe.** Repeatedly emphasized retry-until-confirmed-on-lock as a missing capability. The two-hour readiness check is necessary but not sufficient in their mental model.
4. **"Could not verify" state as a first-class requirement.** Explicit ask for a third readiness state beyond ready/not-ready when the system itself can't run the check. Silence is the worst case for this host.

## Anti-goal validation

| Anti-goal | Endorse / Flip | Rationale |
|---|---|---|
| No remote unlock | **Strongly endorse** | Hardware auto-lock harmed a guest; refuses any feature that touches the physical door autonomously. Champion. |
| No guest messaging | **Would flip (opt-in)** | Would want Schlage to tell guests when a code issue is in flight, with the lockbox fallback. Messaging doesn't open the door, so risk profile is different. |
| No auto-extension of guest code | **Endorse** | Sees extensions as judgment calls. Worried about squatter/abuse vectors. |
| No after-stay surveillance | **Endorse** | Privacy-motivated. "I don't want to be the kind of host who knows that." |

**Pattern:** This host's bias against autonomy is specifically about the physical door, not about feature scope generally. They're happy to extend the product into communication and proactive sync-retry as long as nothing actuates the lock without their explicit action. Useful nuance for the PR-FAQ Internal anti-goals defense, the line is "physical actuation" not "autonomy."

---
type: working-note
domain: mba
course: mgmt275-pm-delivery
date: 2026-05-13
status: salvage
---

# Run 1 headlines — captured from sub-agent exit reports

> 10 parallel simulated interviews launched 2026-05-13. All 10 ran the simulation successfully but were blocked from writing transcript/synthesis files (background-mode sub-agents can't surface permission prompts → auto-deny). These headlines were captured from each agent's exit summary before re-launching. Use as a sanity check against Run 2 outputs — if Run 2 produces radically different positioning, investigate the divergence.

## Per-persona headlines

| Host | Killer objection | VW "great deal" | Notable signal |
|---|---|---|---|
| A — Frustrated App Wrestler | "Your battery indicator already lies to me. Why would I trust a new check that reads the same numbers?" | $7/mo | Trust collapse rooted in lying battery indicator |
| B — Coastal Panic | "Great, you can tell me the lock is broken, but the lock is still going to break, and I'm still going to have to drive ninety minutes, so what am I actually paying for here." | $12/mo | Software alone doesn't solve the 90-min-from-screwdriver problem |
| C — Old-School Skeptic | "If the lock needs a babysitter, the lock isn't finished — fix the lock, don't sell a service to monitor an unfinished lock." | Refused subscription; would only accept ~$30 one-time hardware bundle | Surprise: actively LIKES the anti-goals (anti-remote-unlock, anti-guest-messaging) |
| D — August Agonizer | "I've been promised this exact thing before, by the company whose lock is on my door right now, and it didn't work for years" | $7/mo (band $25/$15/$7/$2) | Brand-switch signal: low — too burned to gamble on a vendor promise |
| E — Lakehouse Automation | "I already have this" — Hospitable + SmartThings cover ~80% of scope | $5/property/mo | Displacement conditions: Hospitable connector + readiness-check framing + open API + modular pricing + confirmation-mode cleaner rotation |
| F — Yale Yale-er | (not in exit report) | (not in exit report) | Transcript drafted ~1,750 words but headlines not surfaced |
| G — Warranty Warrior | (not in exit report) | (not in exit report) | Retention signal section drafted but headlines not surfaced |
| H — Kwikset Convert | "This product is for suburban hosts and not for me" | $12/mo (band $40/$25/$12/<$5) | Rural connectivity is exclusionary; product implicitly segments out rural hosts |
| I — Operations Optimizer | (not in exit report) | (not in exit report) | RemoteLock displacement section drafted but headlines not surfaced |
| J — Auto-Lock Agnostic | "Why am I paying you for a check that should have been part of the lock all along." | $12/unit/mo | Surprise: partial FLIP on guest-messaging anti-goal — wants it as fallback when host unreachable |

## Cross-cutting signal (preliminary)

- **Most common killer objection theme:** this should have been included in the hardware. Hosts read a software subscription on top of locks they already paid for as a tax on Schlage's failure to ship complete hardware (C, J, D).
- **Pricing band convergence:** "great deal" clusters in $5–$12/mo range across personas who would pay at all. Outlier: Host C refuses subscription entirely.
- **Anti-goal validation:** mixed. Host C and Host J validate the anti-goals strongly. Host J wants guest-messaging flipped as a fallback. Need Run 2 to surface where the other personas land.
- **Displacement risk:** Host E (Hospitable+SmartThings) and Host I (RemoteLock) are paying for adjacent automation today. They're the displacement test — if they won't switch, the addressable market is narrower than the persona set implies.
- **Brand stickiness:** Host G (Warranty Warrior, Schlage at scale) and Host D (August, burned) are the retention vs acquisition poles. Run 2 should sharpen whether software keeps G loyal and whether it pulls D off August.

## Action

1. Add `Write(...interviews/**)` to `.claude/settings.local.json` allowlist
2. Re-launch the 10 sub-agents in background mode
3. Spot-check Run 2 transcripts against these headlines; flag any persona whose Run 2 killer-objection diverges significantly from this table

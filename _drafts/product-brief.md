# Product Brief: Schlage AI Access Concierge
**Product:** Schlage Connected Lock Lineup (Encode / Encode Plus)
**Company:** Allegion
**Version:** 1.0 | April 2026

---

## Why This Product Exists

Schlage's mission is "pioneering safety" through seamless access. The front door is the entry point every smart home routes through, and still the place where connected access most often fails. That failure is not a hardware problem. It is a software and workflow problem: no proactive monitoring, no intelligent credential management, no recovery path when something goes wrong at the worst possible moment.

Schlage has a century of physical security credibility, retail shelf presence at Home Depot and Lowe's, and a large installed base of connected deadbolts generating real-world access data. The strategic move is to layer AI-driven access intelligence on top of that hardware foundation.

---

## Who You Are Building For

**Primary user:** Short-term rental (STR) hosts managing 1-5 properties on Airbnb or VRBO. They cannot be on-site to verify access. A lock failure when guests arrive is not a technical glitch; it is an operational emergency: a stranded guest, a bad review, a refund, a suspended listing.

**Their core problem:** They cannot confidently delegate front-door access. They manually create and revoke codes, receive no warning before a failure, and find out something went wrong when a guest calls. The failure is rarely the lock itself. It is a keypad that stops responding, a Wi-Fi drop that blocks remote recovery, or a code that never synced.

**What they need:** A system that monitors the lock proactively, manages credentials automatically, and surfaces a clear recovery path when something looks off, before guests arrive. Ideally, it connects directly to their short-term rental platform so that when a booking is confirmed, access is handled. When a guest checks out, access is revoked. The host never has to context-switch between Airbnb and a lock app.

---

## What to Build: AI Access Concierge

An AI layer built into the Schlage Home app. Four capabilities:

1. **Booking platform sync.** Connects to Airbnb and VRBO so that when a booking is confirmed, guest access is created automatically. When a guest checks out, access is revoked. Hosts never have to context-switch between their rental platform and the lock app.

2. **Natural-language code management.** For access outside of bookings, schedule in plain language ("give the cleaner access every Tuesday 10am to 2pm"). The AI handles creation, expiry, and conflict detection.

2. **Pre-arrival health check.** Two hours before check-in, the AI scans connectivity, battery, and last successful access event. Alerts the host if anything looks off.

4. **Failure diagnosis and recovery.** When something fails, the AI identifies root cause (keypad, Wi-Fi, or sync failure) and surfaces a guided fix, not a generic error.

5. **Access log summaries.** Plain-language per-stay recaps of who entered, when, and any anomalies flagged.

No hardware revision required. This ships as a software update to the existing connected lock lineup.

---

## What Success Looks Like

- Guest-entry success rate of 98%+ for scheduled access events, within 12 months of launch
- Host support contacts down 30%+ within 6 months
- 40%+ of host-segment users activate automated scheduling within 30 days
- Schlage becomes the default lock recommended in Airbnb host communities

The deeper signal: hosts managing multiple properties standardize on Schlage because switching means rebuilding automations, not just replacing a lock. That workflow dependency is the durable moat.

---

## Risks to Keep in Mind

- **Alert fatigue.** False alarms from pre-arrival health checks will cause hosts to disable the feature. Tune for precision over recall.
- **Platform integration fragility.** Airbnb and VRBO API access is subject to both technical breakage and platform policy changes. Launch with manual entry first and treat booking sync as an enhancement layer, not a core dependency.
- **AI diagnosis accuracy.** If the AI cannot distinguish between a lock, Wi-Fi, and sync failure, hosts blame Schlage regardless. Accuracy on root cause matters more than speed.
- **Audience tension.** Hosts are a small slice of smart lock buyers. Host-centric features like pre-arrival health checks and per-stay summaries must not clutter the experience for the majority of users who just want to lock their door. Design for hosts, but keep the default experience simple.

---
type: hub
domain: mba
course: mgmt275-pm-delivery
updated: 2026-05-13
---

# Synthetic Personas — Index

> 10 grounded STR-host personas generated in NotebookLM from a 25-30 source corpus (see `../source-corpus.md`). Each persona's quotes and incidents trace back to the cited source pins. Used as input to the simulated interviews documented in `../methodology.md` and run against `../guide.md`.

## The 10 personas

| ID | Handle | Portfolio | Lock brand | Pain dominance | Operating model |
|---|---|---|---|---|---|
| A | [The Frustrated App Wrestler](./host-a-frustrated-app-wrestler.md) | 1 unit, urban | Schlage Encode | App/network confusion | Self-remote |
| B | [The Coastal Panic](./host-b-coastal-panic.md) | 1 unit, beach | Schlage Encode | Hardware failure under weather | Remote (90 min away) |
| C | [The Old-School Skeptic](./host-c-old-school-skeptic.md) | 1 unit | Kwikset SmartCode 270 (offline) | Has churned off smart locks | Self |
| D | [The August Agonizer](./host-d-august-agonizer.md) | 1 unit, urban | August | Buggy Airbnb integration | Automated (then manual) |
| E | [The Fully Automated Lakehouse Host](./host-e-lakehouse-automation.md) | 2-3 units, vacation | Schlage Connect + SmartThings + Hospitable | Cold-weather offline + PMS errors | Fully PMS-automated |
| F | [The Yale Yale-er](./host-f-yale-yaler.md) | 2-3 units, suburban | Yale + August Connect | Sync sends conflicting codes + keypad UX | Remote automated |
| G | [The Warranty Warrior](./host-g-warranty-warrior.md) | 4-5 units, 13 locks | Schlage Encode | Catastrophic hardware failure + warranty | Cleaners + automated |
| H | [The Kwikset Convert](./host-h-kwikset-convert.md) | 4-5 units, rural | Kwikset Halo + Hospitable | Battery drain, mesh Wi-Fi issues | PMS-automated |
| I | [The Operations Optimizer](./host-i-operations-optimizer.md) | 4-5 units, suburban | Schlage Encode + RemoteLock | Keypad UX / guest user error | Cleaners as backup |
| J | [The Auto-Lock Agnostic](./host-j-auto-lock-agnostic.md) | 2-3 units, out-of-state | Schlage Encode + OwnerRez | PMS API outage + auto-lock incidents | Fully automated/remote |

## Diversity check against the 5-axis target

Confirms the persona set has spread across the axes called out in `../methodology.md`:

| Axis | Coverage |
|---|---|
| Property count | 1 unit (A, B, C, D), 2-3 units (E, F, J), 4-5 units (G, H, I) |
| Pain dominance | Pain A (B, E, G, J), Pain B (D, F, H), Both (A, I), Refusal (C) |
| Tech savviness | Low (B, C), Medium (A, D, I, J), High (E, F, G, H) |
| Lock brand | Schlage Encode (A, B, G, I, J), Schlage Connect (E), August (D), Yale+August (F), Kwikset (C, H) |
| Operating model | Solo (A, B, C, D), PM-automated (E, H, J), With cleaner (G, I), Self+remote (F) |

## Related files

- `../methodology.md` — How these personas were generated
- `../guide.md` — Interview guide they'll be run against
- `../source-corpus.md` — NotebookLM source corpus
- `./_pain-frequency-synthesis.md` — Pain-pattern frequency across the full corpus

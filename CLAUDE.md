# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Schlage AI Access Concierge — a Vite + React 18 + Tailwind v3 single-page prototype for a smart lock management dashboard aimed at short-term rental hosts. It is the prototype deliverable for an MBA course final project; the surrounding repo also contains the graded deliverables under `submission/` (`submission/prfaq.md`, `submission/source-of-truth.md`, `submission/ux-eval-appendix.md`, `submission/interviews/`), an eval harness under `eval/`, and working-notes appendices.

## Commands

```bash
npm install              # install deps
cp .env.example .env     # then add VITE_ANTHROPIC_API_KEY=sk-ant-...
npm run dev              # vite dev server at http://localhost:5173
npm run build            # vite build → dist/
npm run preview          # serve the built bundle

cd eval && node eval.js  # run the offline eval (alert copy + scheduling), writes eval-results-*.csv into eval/
```

There is **no test runner, no linter, and no typechecker** configured. Don't claim "tests pass" — there are none. For UI changes, run `npm run dev` and verify in a browser.

`eval/eval.js` reads `VITE_ANTHROPIC_API_KEY` from the environment (not `.env`); source it or export it before running. It hits the real Anthropic API (~105 calls, ~$0.42).

## Architecture

### Active code lives in `src/`.

The `index.html` at the repo root loads `src/main.jsx` — that is the app.

### State and routing

There is **no router**. `src/App.jsx` is the single source of truth:
- A `screen` string (`'dashboard' | 'action' | 'lockDetails' | 'schedule' | 'properties' | 'settings'`) drives a switch that renders one screen at a time.
- `properties`, `accessCodes`, `settings`, and `alertCopyCache` live in App and flow down as props. All mutations go through handlers in App that `setProperties((prev) => prev.map(...))` immutably.
- `selectedId` + `schedulePrefillLock` carry cross-screen context (which lock the action/details/scheduling screen should focus on).
- `alertCopyCache` is keyed by property id and lives at the App level on purpose: alert copy generation is an expensive Claude call, so cached results survive screen transitions. When you add a flow that invalidates a property's alert state, also clear or refresh its cache entry.

The property status state machine (`'All Clear' | 'At Risk' | 'Action Pending' | 'Action Scheduled' | 'Offline'` plus a `snooze` shadow state) is implicit — it lives across the various `handle*` functions in App.jsx, not in a reducer. When adding a new transition, check every handler in App.jsx to keep the set consistent.

### AI calls

All Claude calls go **direct from the browser** to `api.anthropic.com` using the `anthropic-dangerous-direct-browser-access: true` header. The shared client is `src/lib/claude.js` — a single `callClaude(systemPrompt, userMessage)` function. Model is `claude-haiku-4-5`. There is no backend.

Two AI capabilities, with different patterns:

1. **Alert copy generation** (`src/lib/alertCopy.js`) — the "production" pattern. Has:
   - A long system prompt with explicit rules including a hard mapping from issue type → primary action (battery → `replace_battery`, wifi → `notify_cohost`, sync → `refresh_code`).
   - `buildAlertContext(property)` → structured JSON input.
   - `validateAlertCopy(output, context)` → a 10-check validation object surfaced in dev mode.
   - `templatedFallback(context)` → deterministic copy used when the API errors or validation fails.
   - `expectedPrimaryAction(context)` — the same mapping as the prompt, duplicated in JS so the validator can independently verify the model followed it. **If you change the mapping, update both places.**

2. **Scheduling parser** (`src/screens/Scheduling.jsx`) — system prompt is inline in the screen file. Returns parsed access request + conflict detection JSON. The existing bookings used for conflict detection are **hard-coded inside the prompt string** (lines starting `- lock_001: Guest checked in June 5 3pm...`). These are not derived from `INITIAL_ACCESS_CODES` in `src/data/index.js` — the two sources are independent fixtures. Update both if you change the demo data and want conflict detection to stay coherent.

### Mock data

`src/data/index.js` exports three fixtures: `INITIAL_PROPERTIES` (3 locks), `BATTERY_HISTORY` (keyed by lock id, 7-day array), and `INITIAL_ACCESS_CODES`. Lock ids `lock_001 / lock_002 / lock_003` are referenced by string literal in the scheduling prompt — keep them stable.

### Developer mode

`settings.developerMode` (toggled in Settings) reveals AI internals on `LockDetails`: channel previews with character-count bars, the 10-check validation grid from `validateAlertCopy`, and the raw JSON response. This is the intended demo surface for showing how the AI output is constrained — don't strip it when refactoring.

## Repo housekeeping notes

- `_assignment-refs/` and `submission/interviews/raw/` are gitignored on purpose (course material + PII). Don't add files there expecting them to be committed.
- The non-code deliverables under `submission/` (`prfaq.md`, `source-of-truth.md`, `ux-eval-appendix.md`, `interviews/`) plus the eval artifacts under `eval/` are the academic submission and are mostly independent from the React app — changes to the app don't require updating them unless explicitly asked.
- `appendix-working-notes/` (formerly `_drafts/`) and `appendix-research-corpus/` (formerly `interview-data/`) hold provenance for the deliverables and are visible but not graded as standalone artifacts.

<<<<<<< HEAD
# MGMT 275 — Final Project

**Product:** Schlage Encode + AI Access Concierge
**Group 3:** Michael Green, Jessicya Materano
**Due:** Sunday, May 14, 2026

A software layer on top of Schlage's existing connected lock lineup that gives short-term rental hosts confident, automated front-door access management: booking-platform sync, natural-language code scheduling, pre-arrival health checks, and AI-driven failure diagnosis.

---

## Deliverables

| # | Deliverable | File |
|---|---|---|
| 1 | Working Prototype | [`prototype/`](./prototype/) |
| 2 | Source of Truth (refined spec, system prompts, data schemas) | [`source-of-truth.md`](./source-of-truth.md) |
| 3 | Narrative & PR-FAQ (4-6 pages) | [`prfaq.md`](./prfaq.md) |
| 4 | UX & Eval Appendix (interviews + eval results) | [`ux-eval-appendix.md`](./ux-eval-appendix.md) |

## Supporting material

- [`interviews/`](./interviews/) — user interview notes (8-12 total for the team)
- [`evals/`](./evals/) — eval set (200 prompts) + metric results summary
- [`assets/`](./assets/) — screenshots, diagrams
- [`_drafts/`](./_drafts/) — prior coursework that seeds the final deliverables (product brief, strategy case, experiment writeup, eval writeup, research brief)

## How to run the prototype

See [`prototype/README.md`](./prototype/README.md).

---

*AI usage disclosure included at the end of each deliverable document per syllabus requirements.*

## Public repo policy

This repo is public (required by the assignment). The following are gitignored and stay local:

- **`_assignment-refs/`** — course materials from BruinLearn and instructor-provided templates
- **`interviews/raw/`** and audio/video files — raw interview material with PII; only anonymized synthesis is committed

See [`.gitignore`](./.gitignore) for the full list and [`interviews/README.md`](./interviews/README.md) for the interview-data handling policy.
=======
# Schlage AI Access Concierge

A smart lock management dashboard for short-term rental hosts, built with Vite + React and powered by Claude AI.

## Features

- **Dashboard** — Live status cards for all properties with six states: All Clear, At Risk, Action Pending, Action Scheduled, Offline, Snoozed. AI-generated alert copy with contextual primary actions.
- **Action Screen** — Guided resolution flow with multi-step modals for battery replacement, co-host notification, and support contact. Schedule or snooze actions with a single click.
- **Lock Details** — Full diagnostic view with 7-day battery chart, health check log, check-in history, and access codes. Developer mode reveals AI channel previews, validation checks, and raw JSON.
- **Schedule Access** — Natural language access scheduling. Describe who needs access in plain English; Claude parses the request, checks for booking conflicts, and syncs the code to the lock.
- **Settings** — Alert channel configuration (SMS, Push, In-App) and developer mode toggle.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure your API key**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Anthropic API key:

   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```

   Get a key at [console.anthropic.com](https://console.anthropic.com).

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173).

## AI Features

All AI calls go directly from the browser to the Anthropic API using the `anthropic-dangerous-direct-browser-access` header. No backend required.

- **Alert copy generation** — When a property has an active alert, Claude generates contextual SMS, push, and in-app notification copy tailored to the failure mode, property name, and available actions. Output is validated against a 10-point schema before display.
- **Access scheduling** — Claude parses natural language scheduling requests, detects conflicts with existing bookings, and returns structured JSON that gets written directly to the access code log.

## Developer Mode

Enable **Developer Mode** in Settings to reveal on the Lock Details screen:

- Channel previews (SMS, Push, In-App) with character count bars
- AI output validation grid (10 checks)
- Raw JSON response from the AI

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Anthropic Messages API](https://docs.anthropic.com/en/api/messages) (direct browser access)
- Model: `claude-sonnet-4-20250514`

---

_Design source files are in `project/` and `chats/` — these are the original HTML prototypes from the design handoff._
>>>>>>> 530fa936ab3c383da280d5f0ceb615db8ff318c4

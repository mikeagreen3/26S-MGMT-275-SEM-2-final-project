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

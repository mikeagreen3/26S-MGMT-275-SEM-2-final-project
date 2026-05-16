# Schlage AI Access Concierge — Source of Truth
**Product:** Schlage AI Access Concierge  
**Team:** Jess and Michael  
**Date:** April 30, 2026  
**Version:** 1.0  

---

## 1. Product Overview

The Schlage AI Access Concierge is a web application that gives short-term rental (STR) hosts proactive visibility into their lock health before guest failures happen. The core problem: hosts have no warning when a lock is about to fail. They find out when a stranded guest calls at midnight.

The app solves this with two features:

1. **Pre-Arrival Health Check** — monitors lock battery, connectivity, and code sync status; fires alerts when risk is detected before check-in
2. **AI Access Scheduling** — natural-language interface for creating and managing time-bounded guest access codes

This is a prototype for a MGMT 275 final project. It should look and feel like a real product — functional, interactive, and demonstrable in a 2-minute Loom walkthrough.

---

## 2. Target User

**Primary:** Short-term rental host managing 1-3 properties on Airbnb or VRBO  
**Pain point:** No proactive visibility into lock health; learns of failures reactively when guests report them  
**Context:** Checks the app on mobile and desktop; often not physically present at the property  

---

## 3. Core Screens and Flows

### 3.1 Dashboard (Home Screen)

The main screen. Shows all properties and their current lock health status at a glance.

**Elements:**
- Header: "AI Access Concierge" with a small Schlage logo placeholder (text is fine)
- Subheader: "Good morning, [Host Name]" with today's date
- Alert banner (conditional): if any lock has an active alert, show a red/orange banner at the top with the alert summary and a "Resolve" CTA
- Property cards (one per property), each showing:
  - Property name and address
  - Lock name
  - Health status badge: "All Clear" (green), "At Risk" (orange), or "Offline" (red)
  - Next check-in: date, time, and guest label (e.g., "Sarah K. - Tomorrow 3pm")
  - Three status indicators with icons: Battery (%), Connectivity (Online/Offline), Code Sync (Synced/Pending)
  - "View Details" button

**Sample data to pre-populate:**
- Property 1: "Beachside Studio" - Battery 12%, Connectivity Online, Code Sync Synced - Status: AT RISK - Next check-in: Tomorrow 3:00 PM
- Property 2: "Downtown Loft" - Battery 78%, Connectivity Online, Code Sync Synced - Status: ALL CLEAR - Next check-in: Friday 4:00 PM
- Property 3: "Mountain Cabin" - Battery 45%, Connectivity Offline, Code Sync Pending - Status: OFFLINE - Next check-in: Saturday 2:00 PM

### 3.2 Alert Detail Screen

Triggered when user clicks "Resolve" on an active alert or "View Details" on an at-risk property.

**Elements:**
- Back button to dashboard
- Property name and lock name
- Alert summary card (red/orange background):
  - Title: "Action Required Before Check-in"
  - Body: plain-language explanation of what is wrong (e.g., "Battery is critically low at 12%. At this level, the lock may fail to respond during your guest's check-in tomorrow at 3:00 PM.")
  - Time remaining until check-in (e.g., "18 hours remaining")
- Lock health detail panel showing all three signals with current values
- Remediation options (three buttons):
  1. "Refresh Access Code" — triggers a simulated remote code push, shows a success state after 2 seconds
  2. "Notify Co-Host" — opens a simple modal with a pre-written message and a "Send Alert" button
  3. "Contact Schlage Support" — shows a modal with "Priority support request sent. A specialist will contact you within 15 minutes."
- Resolution confirmation state: after any action is taken, show a green "Action taken. We'll monitor and notify you if status changes." banner

### 3.3 AI Scheduling Screen

Natural-language interface for creating access codes. Accessible from the nav bar ("Schedule Access").

**Elements:**
- Header: "Schedule Access"
- Property selector dropdown (pre-populated with the three sample properties)
- Large text input with placeholder: "e.g., Give the cleaning crew access from 11am to 2pm every Saturday in June"
- "Schedule" button
- AI response area (appears after submission):
  - Parsed intent summary: "Here's what I understood:" followed by structured fields (Who, When, Which lock, Expires)
  - If no conflict: green confirmation card — "Access scheduled. Code synced to [Lock Name]." with the details
  - If conflict detected: orange warning card — "Conflict detected: a guest is checked in until 1pm on June 7. Do you want to adjust the window to 1pm–4pm instead?" with "Yes, adjust" and "Enter manually" buttons
- Access code log below: a simple table showing recently created codes (Name, Lock, Window, Status: Active/Expired/Pending)

**AI behavior for the prototype:** Use the Anthropic API (claude-sonnet-4-20250514) to parse the natural-language input and return a structured JSON response. See Section 5 for the prompt spec.

### 3.4 Property Detail Screen

Accessible from "View Details" on any property card.

**Elements:**
- Back button to dashboard
- Property name, address, lock model
- Health history: a simple 7-day chart showing battery level over time (can be simulated data)
- Current access codes: table with columns — Name, Type (Guest/Cleaner/Contractor), Valid From, Valid Until, Status
- "Add Access Code" button that opens the AI scheduling flow pre-filtered to this property
- Check-in history: last 5 check-ins with status (Successful / Failed / No Data)

---

## 4. Navigation

Simple top nav bar with four items:
- Dashboard (home icon)
- Schedule Access (calendar icon)
- Properties (building icon)
- Settings (gear icon) — Settings screen is a stub, just shows "Settings coming soon"

---

## 5. AI Scheduling — API Spec

When the host submits a natural-language scheduling request, send it to the Anthropic API with the following system prompt:

```
You are an AI scheduling assistant for a smart lock management app used by short-term rental hosts.

Your job is to parse a natural-language access request and return a structured JSON object.

The host manages the following properties and locks:
- Property: "Beachside Studio", Lock: "Front Door Encode", Lock ID: "lock_001"
- Property: "Downtown Loft", Lock: "Main Entry Encode Plus", Lock ID: "lock_002"  
- Property: "Mountain Cabin", Lock: "Cabin Door Encode", Lock ID: "lock_003"

The current date is [INSERT CURRENT DATE].

Existing bookings (check for conflicts):
- lock_001: Guest checked in June 5 3pm through June 8 11am
- lock_001: Guest checked in June 14 4pm through June 17 11am
- lock_002: Guest checked in June 6 3pm through June 9 11am
- lock_003: Guest checked in June 20 2pm through June 23 10am

Return ONLY a valid JSON object with this exact structure. Do not include any explanation or markdown.

{
  "parsed": {
    "who": "string — who is getting access (e.g. cleaning crew, guest name)",
    "lock_id": "string — which lock (lock_001, lock_002, or lock_003, infer from context or default to lock_001)",
    "lock_name": "string — human-readable lock name",
    "property_name": "string — property name",
    "schedule": "string — human-readable schedule description",
    "start": "ISO 8601 datetime of first access window start",
    "end": "ISO 8601 datetime of first access window end",
    "recurring": "boolean",
    "recurrence_description": "string or null"
  },
  "conflict": {
    "detected": "boolean",
    "description": "string or null — plain language description of the conflict if detected",
    "suggested_adjustment": "string or null — suggested alternative window if conflict detected"
  },
  "confidence": "number between 0 and 1",
  "clarification_needed": "boolean — true if request is too ambiguous to parse",
  "clarification_prompt": "string or null — question to ask the host if clarification is needed"
}
```

If the request does not specify a property, default to lock_001 (Beachside Studio).
If the request is completely unrelated to access scheduling, set clarification_needed to true.
```

**Frontend handling:**
- If `clarification_needed` is true: show the clarification_prompt as a follow-up question in the UI, do not show a confirmation card
- If `conflict.detected` is true: show the orange conflict card with the description and suggested adjustment
- If `confidence` < 0.7: show a yellow "I want to make sure I understood correctly" card before the confirmation
- Otherwise: show the green confirmation card

---

## 6. Visual Design

Keep it clean and minimal. This is a functional prototype, not a polished consumer app.

- **Font:** System font stack (sans-serif)
- **Color palette:**
  - Primary: #1a1a2e (dark navy) for header and nav
  - Success/All Clear: #16a34a (green)
  - Warning/At Risk: #d97706 (amber)
  - Danger/Offline/Alert: #dc2626 (red)
  - Background: #f8fafc (light gray)
  - Card background: #ffffff
  - Border: #e2e8f0
- **Cards:** white background, subtle border, 8px border radius, light shadow
- **Status badges:** pill-shaped, colored background, white text
- **No external UI libraries required** — plain CSS or Tailwind CDN is fine

---

## 7. Tech Stack

- **Framework:** React (single-page app, no routing library needed — use state-based navigation)
- **Styling:** Tailwind CSS via CDN or plain CSS
- **AI integration:** Anthropic API (`/v1/messages`) called from the frontend — API key is injected by the environment, do not hardcode
- **Charts:** Use a simple SVG or a lightweight library (recharts is available if using the Claude artifact environment)
- **No backend required** — all data is simulated/hardcoded except the Anthropic API call
- **Deployment:** Vercel (for the live URL requirement) or as a Claude artifact for demo purposes

---

## 8. Simulated Data and State

All lock health data, check-in schedules, and access code logs are hardcoded in the app's initial state. The only live external call is the Anthropic API for scheduling.

The following interactions should produce real state changes (not just visual mocks):
- Clicking "Refresh Access Code" should update the property's Code Sync status from "Pending" to "Synced" after a 2-second delay
- Submitting a scheduling request should add the new code to the access code log table on the AI Scheduling screen
- Clicking "Yes, adjust" on a conflict card should create the adjusted code and add it to the log

---

## 9. Demo Flow (for Loom walkthrough)

Walk through these steps in order for a compelling 2-minute demo:

1. Open the dashboard — show the three properties, point out the "At Risk" alert on Beachside Studio
2. Click "Resolve" — walk through the alert detail screen, explain the problem in plain language
3. Click "Refresh Access Code" — show the success state, badge updates to "All Clear"
4. Navigate to "Schedule Access" — type: "Give the cleaning crew access every Saturday from 11am to 2pm in June"
5. Show the AI parsing the request and returning a structured confirmation
6. Type a request that triggers a conflict — "Give Maria access June 6 from 10am to 5pm" (conflicts with Downtown Loft booking)
7. Show the conflict card and the suggested adjustment
8. Navigate back to dashboard — show updated state

---

## 10. Known Limitations (for submission)

- Lock health data is simulated; no real Schlage hardware integration
- Calendar sync (Airbnb/VRBO iCal) is mocked; check-in times are hardcoded
- The AI scheduling feature uses the Anthropic API but does not write to any real lock
- Push notifications are not implemented; the alert system is in-app only
- Multi-user/co-host accounts are not implemented
- The app is not mobile-optimized (desktop prototype only)

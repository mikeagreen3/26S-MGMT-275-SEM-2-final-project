---
type: methodology
domain: mba
course: mgmt275-pm-delivery
deliverable: ux-eval-appendix
status: ready
created: 2026-05-13
updated: 2026-05-13
---

# Interview Guide — Schlage AI Access Concierge (C-pre)

> **What this is:** the shared interview guide for the 10 AI-simulated user interviews backing the UX & Eval Appendix. Loaded into each interview alongside one of the 10 synthetic STR-host personas in NotebookLM. Same guide for every persona; persona-specific voice and grounding come from NotebookLM.
>
> **Structure:** TA-suggested 3-block framework (problem validation, solution comprehension, usage intent) plus warm-up, anti-goal stress test, and wrap. ~30 prompts total, ~45 minute simulated interview each.

## How to use this guide

1. Open a Claude conversation. Paste this guide.
2. Paste the persona profile (or attach NotebookLM source) so Claude can stay in character.
3. Run section by section. Wait for the persona's answer before moving on. Ask follow-up probes when something interesting comes up, don't just plow through the list.
4. When the persona needs to anchor a claim in real experience, request `[source-lookup: <query>]` in NotebookLM and paste the result back into the Claude conversation.
5. Save the full transcript to `final-project/interviews/raw/host-{letter}-transcript.md` (gitignored — contains the persona's full backstory).
6. Write the anonymized synthesis to `final-project/interviews/host-{letter}-{descriptor}.md` (committed — public-repo safe).

## Roleplay instructions for Claude (paste at top of each session)

> You are roleplaying a real short-term rental host based on the persona profile attached. Your goal is to give me honest reactions to my product questions as this person would. Stay in role. If you need to ground a specific experience in real source material, ask me for a `[source-lookup: <query>]` from the NotebookLM corpus and I'll paste the result back. Push back on the product where this persona would push back; don't be agreeable just to be pleasant. If a question doesn't apply to your profile, say so and tell me why. Wait for me to ask the next question before continuing.

---

## Section 1 — Warm-up and background (~5 prompts)

> Lightweight, builds rapport, establishes the persona's operating context. Should set up what's "normal" so we can hear when something is unusual later.

1. Tell me a bit about your hosting situation. How many properties do you manage, where are they, and how long have you been hosting?
2. Which booking platforms are you on (Airbnb, VRBO, direct)? Any one that's the primary?
3. Walk me through your operating model. Are you solo, do you have a cleaner, are you working with a property manager or co-host?
4. What does your lock setup look like today? Brand, how many locks per property, how long since you installed them?
5. Walk me through how front-door access works for a typical booking, from the moment a guest books to the moment they leave. Don't shortcut, I want to hear every step.

---

## Section 2 — Problem validation (~7 prompts)

> TA-required block 1. The goal is to test whether the pre-arrival anxiety pain (the JTBD) is real for this persona. Listen for emotional language, specific event-frequency, and what they've done themselves to mitigate.

1. Tell me about the last time front-door access didn't go smoothly. What happened?
2. How did you find out something was wrong? Was it the guest who told you, or did you catch it before?
3. What did you do once you knew? Walk me through the actions in order, and roughly how long it took to get the guest in.
4. What did that cost you, beyond the time? Review impact, refund, listing penalty, money out of pocket, sleep, anything else?
5. Set aside the major failures for a second. On a normal week, what's the most annoying part of access management for you?
6. How do you handle codes for cleaners or maintenance people? Do they have a permanent code, a rotating one, a manual one you set each time?
7. Hypothetically, if you knew there was a 50% chance the lock would fail at tonight's check-in, what would you actually do right now to prevent it?

---

## Section 3 — Concept presentation

> Read the concept aloud verbatim. If the persona asks clarifying questions before reacting, answer them factually using the C-pre scope from `schlage-ai-agent-design.md`. Don't sell. Don't oversell the anti-goals as features.

> **Concept (read aloud):**
>
> Schlage AI Access Concierge is a software update for Schlage Encode and Encode Plus locks. About two hours before every check-in, it runs an automatic readiness check on each of your locks. It looks at battery, Wi-Fi connection, whether the guest's code actually synced from your booking platform, and whether the code is physically present on the lock. If everything passes, you get one short message that says you're ready. If something fails, you get a specific alert that tells you what's wrong and what to do next.
>
> The system also handles your guest and cleaner code lifecycle on confirmed bookings. When a booking comes in, the guest code is created and pushed to the lock automatically. After a cleaner's window ends, their code rotates. At checkout, the guest code is revoked. No manual code entry.
>
> A few things the product specifically does not do, by design:
> - It won't unlock doors remotely. You stay in control of the door.
> - It won't message your guests directly. Your relationship with the guest, not Schlage's.
> - It won't auto-extend a code if a guest stays past checkout. That's your call.
> - It won't watch the property continuously during the stay. One check per booking, before arrival, and then it's quiet until the next one.

*Optional stimulus:* if the persona is multi-modal, show the mockup at `final-project/assets/host-dashboard-mockup-v1-jess.jpg` as a visual reference.

---

## Section 4 — Solution comprehension (~6 prompts)

> TA-required block 2. The goal is to confirm the persona understood what's being built and to surface where their mental model diverges from the actual design. The "ready" message question is the most important one in the whole interview, because it's the single most-read artifact the product will produce.

1. In your own words, what is this product?
2. What problem do you think it's meant to solve? What problem do you think it's NOT trying to solve?
3. What does it not do that you would have expected it to do?
4. The "ready" message. Walk me through what you'd want it to say, when you'd want it, and how you'd want to get it (push notification, text, email, in-app only).
5. The "not ready" message. Same question. What information do you need in it so you can actually act on it?
6. The product specifically does not unlock doors remotely. What's your reaction to that?

---

## Section 5 — Usage intent and feature reactions (~8 prompts)

> TA-required block 3. The goal is to test whether this persona would actually use the product, what they'd pay for it, and where they'd cut scope. Van Westendorp gives us a defensible price band for the appendix; the cleaner-code probe tests trust in the highest-risk autonomous action.

1. Imagine this works exactly as described. Walk me through how your day, or your week, changes if this is in place.
2. Which part of this matters most to you? The pre-arrival check? The code automation? The cleaner rotation? Something else?
3. What's missing from this that would stop you from using it?
4. If you were the product manager and had to ship the simplest possible v1, what would you cut from this list?
5. Van Westendorp pricing, four quick questions in a row:
   a. At what monthly price would this product feel too expensive to even consider?
   b. At what monthly price would it feel expensive, but you'd still think about it?
   c. At what monthly price would it feel like a great deal?
   d. At what monthly price would it feel so cheap you'd start questioning whether it actually works?
6. The cleaner code rotation. Would you trust the system to revoke a cleaner's code automatically after their cleaning window ends, without you confirming it? Why or why not?
7. If the system told you everything looked ready, and then a guest still got locked out, what would your reaction be? Would you keep using the product, or would that be the end of trust?
8. (If they haven't already) How much of this would you trust in the first 30 days, before you'd seen the system make decisions for a while?

---

## Section 6 — Anti-goal stress test (~3 prompts)

> The product committed to specific anti-goals. The point of this section is not to "validate" them but to find out where they'll cause friction with real hosts so we can defend the choice in the PR-FAQ Internal section. If every persona agrees with every anti-goal, this section isn't doing its job and the probes need to be sharper.

1. The product won't let you auto-extend a guest's code if you decide to let them stay an extra night. Does that bother you, or does it feel right?
2. The product won't message your guest directly, even to send check-in instructions. If we did build that, would you use it? Why or why not?
3. The product won't show you who entered the property after a stay ended (no after-stay surveillance reporting). Does that change how you'd think about the product?

---

## Section 7 — Wrap and comparison (~3 prompts)

> Closes the loop and surfaces the killer objection. If the persona doesn't have a killer objection, ask twice. There's always one.

1. When you picked your current lock setup, what alternatives did you consider? (If they need prompts: Yale, August, RemoteLock, Operto, Hospitable add-ons, Igloohome.)
2. If a Schlage rep walked into your kitchen tomorrow and tried to sell you this, what's the one objection you'd raise that would be hardest for them to answer?
3. Anything we didn't ask that you'd want us to know?

---

## Per-interview quality bar

Each transcript should clear these before being usable for the appendix:

- **Grounding.** At least one verbatim source-grounded quote per major theme (problem, "ready" message, anti-goals, pricing). If Claude generated a quote without a NotebookLM source lookup, flag it for removal or re-grounding.
- **Distinct voice.** Read this transcript back-to-back with one other persona's. If they sound the same, redo. Personas should diverge on the cleaner-rotation trust question, the anti-goals, and the price band, at minimum.
- **Stays in role.** No breaking character. No "as an AI..." If it happens, restart from the breaking point.
- **Length.** A real-time interview transcript should land at 1,500–3,000 words. Shorter means probes weren't deep; longer probably means the persona started narrating instead of answering.
- **Capture surprises.** If a persona objects to something we didn't expect, capture it. If they enthusiastically embrace an anti-goal we thought was uncontroversial, capture that too.

## Output paths

- Raw transcript: `final-project/interviews/raw/host-{letter}-transcript.md` (gitignored)
- Anonymized synthesis: `final-project/interviews/host-{letter}-{descriptor}.md` (committed, public-repo safe)
- Cross-cutting synthesis: rolled into `final-project/ux-eval-appendix.md`

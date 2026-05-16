---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-e
handle: The Fully Automated Lakehouse Host
date: 2026-05-13
status: raw
---

# Host E — The Fully Automated Lakehouse Host (Raw Transcript)

## Section 1 — Warm-up and background

**Mike:** Thanks for jumping on. Let's start easy. Tell me about your hosting setup. How many properties, where, how long?

**Host E:** Sure. I run two units right now, with a third one I'm bringing online later this year. They're all lakehouses, vacation rentals, not urban. I've been doing this for several years now, long enough that I've gone through, I don't know, three generations of my tech stack. I started with a printed-code-on-the-fridge era, then a per-platform-app era, and now I'm fully on Hospitable as my PMS with SmartThings tying the hardware together. So, multi-year, two going on three units.

**Mike:** Which booking platforms?

**Host E:** Airbnb's the biggest by volume. VRBO does well for the longer family stays, those tend to be higher ADR. Booking.com I keep on because it fills gaps but honestly I'd cut it if Hospitable didn't make it painless. So three channels, Hospitable is the source of truth.

**Mike:** Operating model? Solo, cleaner, co-host?

**Host E:** Solo on the host side. I have a cleaning team I share with two other owners on the lake, they rotate. No co-host, no property manager. The whole point of how I've set this up is that I don't need one. Messaging is automated, pricing is dynamic via Hospitable, the locks just work, or at least they're supposed to.

**Mike:** Lock setup?

**Host E:** Schlage Connect on every exterior door. So that's front door and lake-side door per unit. They run through a SmartThings hub at each property because Connect is Z-Wave, not Wi-Fi. SmartThings then talks to Hospitable through a connector. I've had the Connects in for, gosh, probably four years on unit one, maybe two on unit two. One of the older ones I'm honestly thinking about swapping because it's started forgetting codes.

**Mike:** Walk me through how front-door access works for a typical booking, end to end. Don't shortcut.

**Host E:** Okay. Guest books on Airbnb. Hospitable picks up the booking, generates a four-digit guest code, pushes it through SmartThings to the Schlage Connect. The guest gets a templated message from Hospitable maybe four days out with arrival logistics, and another one twenty-four hours out with the actual code. At checkout, the code expires, also automated. Cleaner has a permanent code that I rotate manually like every couple months. So in theory I do nothing, the system runs.

In practice, what actually happens is I check the lock state in SmartThings the morning of arrival just to feel okay. Because the integration has burned me before.

## Section 2 — Problem validation

**Mike:** Tell me about the last time access didn't go smoothly. What happened?

**Host E:** This winter was rough. We had a stretch where it hit negative twenty-five Fahrenheit at the lake. The exterior lock would drop offline and reconnect every couple hours all on its own. SmartThings would lose it, find it, lose it. I couldn't tell from the app whether the code had actually pushed or not. I ended up texting the guest a backup code myself just so I could sleep.

**Mike:** How did you find out something was wrong, the guest or you?

**Host E:** That time, me. I'd checked the dashboard and saw the device was offline. The guest hadn't even left home yet. But here's the worse story. There was a separate incident where Hospitable's integration didn't like the guest's phone number format, something international, and the PMS rejected the booking metadata. The system then auto-emailed the guest a confusing fallback message with a backup code right before check-in, basically saying "use this code instead." I didn't catch it until the guest replied asking which code was real. So that one the guest flagged.

**Mike:** What did you do once you knew?

**Host E:** Cold-weather one, I just told the guest "if the keypad doesn't respond, the code is X, give it thirty seconds and try again." For the phone-number error, I had to call Hospitable support, then manually push a fresh code through SmartThings, then write the guest a long apology message explaining which code was the right one. Probably forty minutes of my evening on that second one, and I was at a restaurant.

**Mike:** What did that cost you beyond time?

**Host E:** No refund, no real review damage, the guests were nice. But I lost trust in my own setup. And there's a kind of low-grade cost to every check-in now because I check the dashboard the morning of. That's a tax I pay because the system has lied to me before.

**Mike:** Set aside the big failures. On a normal week, what's the most annoying part of access?

**Host E:** Honestly, account sprawl. I've got Hospitable, SmartThings, the Schlage app I almost never open but it nags me to update firmware, and then the integration layer between them which is its own thing. When something breaks I don't know which of those four to blame.

**Mike:** Cleaner codes, how do you handle them?

**Host E:** Permanent code per cleaner. I rotate it manually maybe every two or three months, which I know is bad practice. I should be rotating it after every clean window but it's a pain in the neck to do in SmartThings, and Hospitable doesn't manage cleaner codes natively the way it does guest codes. So that's a gap I live with.

**Mike:** Hypothetical. You know there's a fifty percent chance the lock fails at tonight's check-in. What would you actually do right now to prevent it?

**Host E:** I'd drive out. It's an hour each way but I'd drive out, manually program a code on the keypad, and text the guest. Because the alternative is finding out at nine PM that my fancy automated stack failed and I'm dealing with a locked-out family in the dark. I'd take the two hours of driving.

## Section 3 — Concept presentation

**Mike:** Okay. Let me read you the concept.

[*Concept read aloud verbatim from guide.*]

**Host E:** Hm. Quick question before I react. Does this work with Schlage Connect, or just Encode and Encode Plus?

**Mike:** Encode and Encode Plus only. Connect doesn't have the Wi-Fi radio.

**Host E:** Right. So this isn't actually for me with my current hardware. That's an immediate thing. Keep going, I'll react as if I'd upgraded.

## Section 4 — Solution comprehension

**Mike:** In your own words, what is this product?

**Host E:** It's a pre-flight check for your lock, two hours before a guest shows up, plus it manages the code lifecycle so I don't have to. It's specifically a Schlage thing, not a PMS thing. So it sits on the hardware side of the integration.

**Mike:** What problem is it trying to solve, and what is it NOT trying to solve?

**Host E:** It's solving the "did the code actually make it to the lock and is the lock alive" question. Which is the exact thing my SmartThings dashboard half-answers today. It's NOT solving guest communication, it's not solving the pricing or booking side, and it's not pretending to be a PMS. Good. That's actually the right scope.

**Mike:** What does it not do that you'd expect it to do?

**Host E:** I'd expect it to also handle the cleaner-code rotation tied to my Hospitable cleaning schedule. You said it does cleaner rotation, but does it know when the cleaner window ends? Like, does it talk to my PMS, or do I set the window in Schlage's app separately?

**Mike:** It can read the cleaner window from your booking platform's turnover schedule if the integration's there. Otherwise you'd set it in the Schlage side.

**Host E:** That's the make-or-break for me. If I'm configuring cleaning windows in two places it's dead on arrival. If it reads from Hospitable, I'm interested.

**Mike:** The "ready" message. What do you want it to say, when, and how do you want to get it?

**Host E:** Push notification, two hours out, one line. "Lake House A ready for Smith check-in 4 PM." That's it. Don't make me read three lines. If everything's green, the message is the green. I don't need a dashboard, I don't need a breakdown of battery percentage and Wi-Fi signal. I need a "you can stop worrying" signal. Maybe a tap-through if I want to see detail.

**Mike:** The "not ready" message. What do you need in it to act?

**Host E:** Way more. I need to know which lock, which property, which specific check failed, and what the suggested action is. Like, "Lake House A back door, battery at twelve percent, replace before check-in or push remote code to front door only." Give me an action, not just a diagnosis. And the channel should be push AND text, not just push, because if I'm offline on my phone I want my SMS to fire too. That's the one place I'd want redundancy.

**Mike:** The product doesn't unlock doors remotely. Reaction?

**Host E:** Fine with me. I don't want Schlage holding the unlock authority anyway, that's a liability surface I don't need. I can unlock through SmartThings if I really have to. Keep it as a checker, not a controller. Honestly that makes me trust it more.

## Section 5 — Usage intent and feature reactions

**Mike:** Imagine this works as described. How does your week change?

**Host E:** I stop checking the SmartThings dashboard every morning. That's real. I'd say I do that ninety seconds a day, every day, across two properties. Times three hundred sixty-five, that's a meaningful amount of mental load. And the cold-snap nights I'd actually sleep, because if the readiness check passed two hours before, I know the lock was alive recently. That's a real change.

**Mike:** Which part matters most?

**Host E:** The hardware-aware check. The "is the code actually on the lock" piece specifically. Because my Hospitable integration tells me the code was pushed, but it has no idea if the lock received it. That's exactly where my failures live. The code rotation is nice but Hospitable already does most of it. The new value is the lock-state verification.

**Mike:** What's missing that would stop you from using it?

**Host E:** Direct Hospitable integration. If I have to manage a Schlage account that duplicates my Hospitable booking data, I'm out. I will not pay for a third bridge layer to connect software I already own. That's the deal-breaker.

**Mike:** If you were the PM and had to ship the simplest v1, what would you cut?

**Host E:** Cut the cleaner code rotation from v1. Ship the readiness check and the guest code lifecycle. Cleaner schedules are messy enough that you don't want to be wrong in v1. Earn trust on the simpler thing first.

**Mike:** Van Westendorp time. Four quick questions. At what monthly price would this feel too expensive to even consider?

**Host E:** Per property? Twenty-five a month. Above that I'm out.

**Mike:** Expensive but you'd think about it?

**Host E:** Fifteen.

**Mike:** Great deal?

**Host E:** Seven dollars a month per property. At seven I don't even think, I just add it.

**Mike:** So cheap you'd question if it works?

**Host E:** Under three. If it's two bucks a month I assume the alerts are unreliable or the integration is dead. That's the trust floor.

**Mike:** Cleaner code rotation. Trust the system to auto-revoke after the window without you confirming?

**Host E:** No. Not in the first six months. I want a notification that says "rotating Maria's code in fifteen minutes, tap to delay" and I want a manual override. After six months of it being right, sure, let it run. But I've been burned by integration logic getting cleaning windows wrong, so I'd want a soft launch.

**Mike:** System says ready, guest still gets locked out. Reaction?

**Host E:** Depends how it fails. If it's a hardware thing that happened in the two hours between check and arrival, fine, that's unlucky. If the check was wrong, like it said the code was on the lock and the code wasn't on the lock, I'd lose trust fast. Maybe one of those and I'd still use it. Two and I'd be done.

**Mike:** First thirty days, how much do you trust?

**Host E:** The readiness check, fully. The code lifecycle, I'd be checking the lock manually in parallel for at least two weeks. Cleaner rotation, I'd leave off entirely until I'd seen the guest side work cleanly through a full month of bookings.

## Section 6 — Anti-goal stress test

**Mike:** No auto-extend of a guest code if you let them stay an extra night. Bothered, or feels right?

**Host E:** Feels right. That's a money decision, not a software decision. I want to be in the loop.

**Mike:** No direct guest messaging from Schlage. If you built it, would you use it?

**Host E:** No, and please don't. Hospitable owns that relationship and my templates are tuned. Last thing I want is Schlage messaging my guest with branding that's not mine. Hard pass.

**Mike:** No after-stay surveillance reporting. Does that change anything?

**Host E:** No, I don't want that data. It's a liability I'd rather not hold. Good call on the anti-goal.

## Section 7 — Wrap and comparison

**Mike:** When you picked your current locks, what alternatives did you consider?

**Host E:** Yale Assure, I looked at it. RemoteLock, which a buddy on BiggerPockets swears by but it's a subscription on top of a subscription. Igloohome for the offline code generation, which is actually clever for my low-connectivity property. I went Schlage Connect because the Z-Wave plus SmartThings combo was the most reliable in cold weather, supposedly. Mixed results on that, as we discussed.

**Mike:** Schlage rep walks into your kitchen tomorrow, sells you this. One objection that's hardest to answer?

**Host E:** "I already get most of this from Hospitable plus SmartThings. What does your readiness check do that my dashboard doesn't, specifically, and is the marginal value worth a new subscription and a new account to manage?" That's the one. If they can't answer the hardware-aware code-presence check specifically, with a concrete example, I'm not buying.

**Mike:** Anything we didn't ask?

**Host E:** Two things. One, what's the offline behavior. If my Wi-Fi at the lake is out and the lock can't phone home for the readiness check, what does the app say? Because false negatives in low-connectivity environments will train me to ignore the alerts, and then the product is dead. Two, please integrate directly with Hospitable. Not through some middleware. Direct. That's the only way I'd switch hardware to Encode.

**Mike:** Got it. Thanks for the time.

**Host E:** Sure thing.

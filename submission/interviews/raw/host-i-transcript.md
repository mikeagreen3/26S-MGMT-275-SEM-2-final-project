---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-i
handle: The Operations Optimizer
date: 2026-05-13
status: raw
---

# Host I — The Operations Optimizer (raw transcript)

## Section 1 — Warm-up

**Mike:** Thanks for jumping on. Just to start, tell me a bit about your hosting situation. How many properties, where, and how long have you been at this?

**Host I:** Sure. I've got four units active right now, and a fifth that's basically off-market while we redo the bathroom. They're all in the same suburban pocket, which is honestly the only reason this works as a side thing. Driving between them takes ten minutes, not an hour. I've been hosting multi-year at this point, so I'm past the rookie phase. I know where my time goes, and I know where it gets wasted.

**Mike:** What platforms are you on?

**Host I:** Airbnb, just Airbnb. I tried VRBO at one point and the volume wasn't there for my market. Direct booking sounds great in theory but I don't want to be in the marketing business. Airbnb does the funnel, I do the operations.

**Mike:** Walk me through the operating model. Solo, cleaners, co-host?

**Host I:** Solo on the management side. I have two housekeeping teams I rotate based on which property and what day. They're my real safety net. They've got their own codes, they know the units cold, and if a guest is locked out and I'm in a meeting at my day job, the cleaner will swing by. That's my backup plan, honestly. It's not glamorous but it works.

**Mike:** And your lock setup today?

**Host I:** Schlage Encode on every door. I think I'm coming up on three years with most of them. I run them through RemoteLock, which is the software layer that ties codes to bookings. So Airbnb sends a booking, RemoteLock generates a code, pushes it to the Encode, and revokes it after checkout. That's the theory anyway.

**Mike:** Walk me through how access works for a typical booking, start to finish, don't shortcut it.

**Host I:** Okay so. Guest books on Airbnb. Within a few minutes RemoteLock picks up the reservation and creates a code, last four of their phone number usually. It pushes that to the Encode. Closer to check-in, Airbnb sends my pre-arrival message with the door code, the WiFi, the porch light note, the whole thing. Day of check-in, the porch light is on, I have it on a timer so it's always on at dusk, I do not trust myself to remember. Guest shows up, punches in the code, in they go. After checkout, RemoteLock revokes the code. Cleaner has a permanent code, comes in, turns it over, leaves. That's the happy path. The unhappy path is what I spend my time on.

## Section 2 — Problem validation

**Mike:** Tell me about the last time front-door access didn't go smoothly.

**Host I:** Last Friday actually. Couple checks in at 4pm, by 4:15 I get a message saying the lock isn't working. I'm at my kid's recital, phone on vibrate. I see it at 4:40. I call the guest, they're sitting in their car. I walk them through it on the phone, and the problem is, the keypad on the Encode is completely invisible until you touch it. They were pressing what they thought was the screen to wake it up, and that press was getting registered as the first digit of the code. So they're entering a six-digit code thinking it's four, and the lock obviously rejects it. This happens, I'd say, twice a month at least. Different guests, same exact failure mode.

**Mike:** How do you usually find out, guest message or you catching it ahead of time?

**Host I:** Always the guest. There's no proactive signal. RemoteLock will tell me a code was pushed, but it doesn't tell me whether the guest actually got in. So I find out when somebody texts "the code isn't working" and my stomach drops.

**Mike:** What did you do once you knew, step by step?

**Host I:** Step one, call them. Step two, talk them through the keypad ghost-digit thing, which by now I can do in my sleep. Step three, if that doesn't work, ping the housekeeper to swing by. Step four, if the housekeeper isn't reachable in fifteen minutes, I leave the recital and drive over myself. Last Friday it was step three. Took about 35 minutes from first message to guest inside. Not catastrophic but not great.

**Mike:** What does that cost you beyond the time?

**Host I:** The dollar cost is small. It's the review hit that scares me. One bad first-thirty-minutes experience and you're getting a four-star with a comment about "confusing entry" and that knocks your search ranking. I've watched it happen. The sleep cost is real too. Friday nights I'm always a little tense around check-in time. My wife has noticed.

**Mike:** Set aside the big failures. On a normal week, what's the most annoying part?

**Host I:** Honestly, it's the constant low-grade anxiety. It's the not knowing. I have these locks, I'm paying for RemoteLock on top, and I still don't have a green light that says everything's fine. I have to assume it's fine. And then a guest texts and the assumption breaks.

**Mike:** How do you handle cleaner codes?

**Host I:** Permanent codes. Each cleaner has their own four-digit code that doesn't rotate. I know, I know, security people would yell at me. But these are people I've worked with for two years, they're not going to come rob the place, and the alternative is me manually rotating codes every cleaning, which is hours a month. So I trade some theoretical security for actual operational sanity.

**Mike:** Hypothetically, if you knew there was a 50% chance the lock fails at tonight's check-in, what would you do right now?

**Host I:** Drive over and meet them in person. No question. That's actually a useful question because it tells me what my real fallback is. The lock isn't the system, I am the system, and the lock is supposed to let me not be the system. When trust breaks I just absorb the work myself.

## Section 3 — Concept

**Mike:** Let me read you a concept. Schlage AI Access Concierge is a software update for Encode and Encode Plus. About two hours before every check-in, it runs an automatic readiness check on each of your locks. Battery, WiFi, whether the guest's code synced from Airbnb, and whether the code is actually on the lock. If everything's good you get one short message saying you're ready. If something fails, you get a specific alert telling you what's wrong and what to do. It also handles guest and cleaner code lifecycle. Bookings come in, codes get pushed automatically. Cleaner codes rotate after their window. At checkout the guest code is revoked. No manual entry. Things it doesn't do, on purpose. It won't unlock doors remotely. It won't message your guests directly. It won't auto-extend a code if a guest stays past checkout. And it won't watch the property continuously. One check per booking, before arrival, then quiet.

**Host I:** Okay. Can I ask a clarifying question before reacting?

**Mike:** Please.

**Host I:** Is this on top of RemoteLock, or instead of RemoteLock? Because the code-from-Airbnb piece is literally what I pay RemoteLock for today.

**Mike:** Honest answer, the C-pre scope replaces the booking-to-code part for Encode and Encode Plus users. So if you're a Schlage hardware customer, this software does that piece natively. You wouldn't need RemoteLock for the code lifecycle.

**Host I:** Hm. Okay. That changes the conversation a lot, actually. Keep going.

## Section 4 — Solution comprehension

**Mike:** In your own words, what is this product?

**Host I:** It's a pre-flight check for my lock. Two hours before a guest shows up, somebody, or something, looks at the lock and tells me it's ready. Plus it does the code stuff RemoteLock does. Those are the two pieces. The pre-flight is the new thing. The code automation is table stakes.

**Mike:** What problem do you think it's meant to solve, and what's it not trying to solve?

**Host I:** It's solving the silence. Right now I have no signal until a guest texts. This gives me a signal before that. What it's not solving, and I want to flag this, is my actual number one problem, which is the keypad UX. Guests still can't see the buttons until they touch the screen and they're still going to ghost-press the first digit. This product doesn't fix that. It just tells me faster that the code is on the lock, which doesn't matter if the guest can't enter it correctly.

**Mike:** That's a sharp point. What does it not do that you'd have expected?

**Host I:** I'd expect it to tell me when a guest entered successfully. Like a "they got in" ping. That would actually retire most of my Friday-night anxiety. The readiness check tells me the system is ready. It doesn't tell me the human succeeded.

**Mike:** The ready message. What do you want it to say, when, and how?

**Host I:** Short. "Unit 2 ready for Jenkins, 4pm." That's it. Push notification on my phone, two hours out. I don't want an email. Email goes to my work account and I miss it. I don't want a text either, my texts are my family. Push notification in whatever app this lives in. And I want it batched if I have multiple check-ins the same day. One notification, not four.

**Mike:** Not ready message?

**Host I:** Specific. Don't tell me "lock issue at Unit 2." Tell me "Unit 2 battery at 12 percent, replace before 4pm" or "Unit 2 code did not sync from Airbnb, tap to retry." I need the verb. I need to know what to actually do. And I want it sooner than two hours if possible, because if I have to drive somewhere to replace a battery, two hours might not be enough.

**Mike:** The product doesn't unlock doors remotely. Reaction?

**Host I:** Fine with me. I don't want that liability. If something goes wrong with a remote unlock and the wrong person gets in, that's on me. Keeping me out of the unlock loop is actually a feature.

## Section 5 — Usage intent and pricing

**Mike:** Imagine this works exactly as described. How does your week change?

**Host I:** Friday nights get better. That's the honest answer. I stop tensing up at 3:30pm waiting for the text. If I get the green light at 2pm I can mentally close that loop and go to my kid's thing without my phone in my hand. The code automation piece doesn't change much because RemoteLock already does it. So I'd be paying for the readiness check, basically, and getting code automation as a bundle.

**Mike:** Which part matters most?

**Host I:** The readiness check. By a mile. The code automation is a commodity, I already have it. The check is the new thing.

**Mike:** What's missing that would stop you from using it?

**Host I:** The "guest got in" confirmation. And a fix for the keypad readability. Without those, this is a partial solution. I'd still be on edge until I get a text from the guest saying "we're in."

**Mike:** If you were PM and had to ship the simplest v1, what would you cut?

**Host I:** Cut cleaner code rotation. My cleaners have permanent codes, I'm not changing that, and rotating them is a security feature I don't personally need. Battery and code-sync check, keep those. WiFi check, keep that. Cleaner rotation, push to v2.

**Mike:** Van Westendorp, four quick ones. Monthly price where this is too expensive to consider?

**Host I:** Per property or total?

**Mike:** Let's do total, your portfolio.

**Host I:** Too expensive, the moment it crosses what I pay RemoteLock plus a meaningful premium. So north of 60 a month total, I'm out. Just gone.

**Mike:** Expensive but you'd think about it?

**Host I:** Around 40 a month. That's RemoteLock-plus territory. I'd think hard. I'd want to be sure it actually delivers the readiness piece.

**Mike:** Great deal?

**Host I:** 25 a month total for four units. At that price I cancel RemoteLock and switch. It's a no-brainer. RemoteLock is costing me roughly 30 a month right now across the portfolio, so anything under that, with the readiness check thrown in, is an obvious win.

**Mike:** So cheap you'd question if it works?

**Host I:** Under 10 a month. At that price I assume the readiness check is fake, or it's running on a free tier of something that'll get rate-limited.

**Mike:** Cleaner code rotation. Would you trust it to revoke automatically, without you confirming?

**Host I:** No. Not in the first six months. My cleaners have been with me for years and if the system glitches and revokes their code on a Saturday morning, I have a cleaner standing on a porch and a turnover that doesn't happen. I'd want a 24-hour confirmation window, or an opt-in toggle per cleaner. Don't make this default-on.

**Mike:** System says everything's ready, guest still gets locked out. Reaction?

**Host I:** Once, I keep using it. Twice, I'm rethinking. The whole value prop is the green light. If the green light lies, the green light is worse than no green light, because now I'm relaxed when I should be tense. So I have a very low tolerance for false positives on the ready message specifically.

**Mike:** First 30 days, how much would you trust?

**Host I:** I'd run it in parallel with my current setup. RemoteLock stays on, I just watch this new thing and see if its readiness check matches reality. After a month of clean signals I'd cancel RemoteLock. Not before.

## Section 6 — Anti-goals

**Mike:** Product won't auto-extend a guest's code if they stay an extra night. Reaction?

**Host I:** That's correct. Don't auto-extend. Extensions are a payment conversation, not a lock conversation. I want to be in that loop.

**Mike:** Won't message your guest directly. If it could, would you want it?

**Host I:** No. Airbnb's messaging is where the relationship lives, and if Schlage starts messaging my guests then guests think Schlage is the host. I don't want that. Stay out of the conversation.

**Mike:** Won't show you who entered after a stay ended.

**Host I:** Don't care. My cleaners go in, sometimes a handyman, that's the universe. I don't need surveillance reporting and honestly I don't want the privacy headache.

## Section 7 — Wrap

**Mike:** When you picked Encode, what alternatives did you look at?

**Host I:** Yale was the other serious one. I think I looked at August briefly and dismissed it because of the bridge requirement. RemoteLock came in later as the software layer once I realized the native Schlage app wasn't going to do what I needed for multi-unit Airbnb. If I were buying today I'd actually look at a lock with physical buttons, because the touchscreen visibility thing is my single biggest pain point and no software can fix it.

**Mike:** If a Schlage rep walked in tomorrow and pitched this, what's the one objection that's hardest to answer?

**Host I:** It doesn't fix the keypad. That's the killer. You're selling me a readiness check for a lock that fails on physical UX, not on software state. The lock is ready and the guest still can't see the buttons. Your alert says green and my guest is locked out because of the hardware, not the code. Until Schlage ships a lock with visible buttons or backlit numbers, this product is patching the wrong layer.

**Mike:** Anything we didn't ask that you'd want us to know?

**Host I:** Yeah. If this product launches and the price lands where I think it should, I cancel RemoteLock. So you should know you're not adding a tool to my stack, you're displacing one. That changes how you should position it. Don't sell it as a Schlage add-on. Sell it as a RemoteLock replacement for Schlage owners. That's the real pitch, and that's the only way I'd buy it.

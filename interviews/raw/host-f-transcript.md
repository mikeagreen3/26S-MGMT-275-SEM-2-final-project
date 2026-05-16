---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-f
handle: The Yale Yale-er
date: 2026-05-13
status: raw
---

# Host F — The Yale Yale-er — Raw Interview Transcript

## Section 1 — Warm-up and background

**Mike:** Thanks for hopping on. Just to start, tell me about your hosting situation. How many properties, where, how long?

**Host F:** Sure. I've got a small portfolio, two units right now and I'm closing on a third in the fall if the inspection doesn't kill it. Both current ones are suburban, walkable to a downtown but not in a city. I've been hosting for, I want to say, six years? Started with one, added the second a couple years in. Not full-time, but it's a real second income at this point.

**Mike:** Got it. Booking platforms?

**Host F:** Airbnb. Just Airbnb. I tried VRBO for like a season and it wasn't worth the headache of double-managing calendars. I'd rather optimize one channel than half-do two.

**Mike:** Operating model? Solo, cleaner, PM?

**Host F:** Solo on the ops side. I have a cleaner I've used for about four years now, she's great, she has her own little crew on the bigger turns. No property manager. I do everything myself because the second I bring in a PM the math stops working. The whole point is I keep the margin.

**Mike:** Lock setup. Walk me through what's on the doors.

**Host F:** Yale. Yale Assure locks with the August Connect modules to get them on Wi-Fi. Both properties. Two locks per property, front and side door. I installed them, I want to say, three and a half years ago when I switched from a lockbox setup. So I've lived with these for a while. I'm not a casual user.

**Mike:** Walk me through how front-door access works for a typical booking, beginning to end. Don't shortcut, I want every step.

**Host F:** Okay. Guest books on Airbnb. The Airbnb sync is supposed to talk to August, August is supposed to talk to the Yale lock, and a unique guest code is supposed to land on the lock for their stay window. In theory. In practice I get a message in the August app that says the code synced, and then I go into the August app myself and verify it. Because I don't trust it. Then about a day before check-in I send the guest their code through the Airbnb message thread, with photos of the door and a little note that says "press the buttons firmly, not lightly." That note is in there because of bitter experience. Day of check-in, if it's late, I'm low-key watching my phone. Guest enters, hopefully the lock beeps the right way, they're in. Day after checkout, code is supposed to auto-revoke. Cleaner has her own code, which is supposed to be permanent but I rotate it manually every couple months because I read somewhere you should. That's the flow when it works.

## Section 2 — Problem validation

**Mike:** Tell me about the last time access didn't go smoothly.

**Host F:** Oh, I have a specific one. The sync software malfunctioned and sent the guest two separate emails, each with a different access code, and didn't say which one was for which door. So the guest shows up, side door and front door, two codes, no labels. They picked one, tried it on the front, it didn't work, tried the other, didn't work. They messaged me at like eleven at night.

**Mike:** How'd you find out, them or you?

**Host F:** Them. Which is the worst version. If I'd caught it I could've fixed it before they were standing on the porch with a roller bag. They told me. Through the app. Very polite about it, which somehow made it worse.

**Mike:** What did you do, step by step?

**Host F:** Called them, walked them through which code was which by trying both with them on speakerphone. The front door opened. The side door code was just wrong, the sync had pushed something stale. I told them to ignore the side. The next morning I drove over, did a factory reset on the side door, re-paired it, pushed a fresh code. And it kept misbehaving for, I want to say, three or four more days. Random failures. I ended up just manually setting codes on the keypad and turning off the sync for that lock until I felt like the firmware was stable.

**Mike:** What did that cost you beyond the time?

**Host F:** No refund, thankfully. The guest was tired but cool. But I got a four-star review with a comment about the check-in being confusing, and that drops my average enough to matter. I'm in Superhost territory, every star counts. And the drive over was 35 minutes each way, plus the time on the door. So call it half a day plus a star.

**Mike:** Set the big failures aside. On a normal week, what's the most annoying part?

**Host F:** Honestly, the keypad itself. Guests don't know how to use a capacitive-ish keypad. They tap, they brush, they mash with one finger. The Yale needs a firm, deliberate press and people don't read instructions. I've started doing little in-person tutorials when I can, and when I can't, I include a video link. I shouldn't have to make a tutorial video for a doorknob.

**Mike:** Cleaner codes, permanent or rotating?

**Host F:** Permanent in theory, rotating in my paranoia. She's had the same code for stretches of months, then I'll change it and text her the new one. It's not a system, it's a vibe. If there was a clean way to do it automatically I'd take it.

**Mike:** Hypothetically, 50% chance of lock failure tonight. What do you do right now?

**Host F:** Drive over. Both properties. Manually verify the codes on the keypads, do a test entry, replace batteries if I'm anywhere near due. And probably stage a key in a lockbox as a fallback and tell the guest where it is, off-platform, after they check in. I'd burn the evening to not have the 11pm call.

## Section 3 — Concept presentation

**Mike:** Okay, let me read you the concept.

[Reads C-pre concept verbatim.]

**Host F:** Hm. Okay. Couple of questions before I react. Does this work with Yale, or is this Schlage hardware only?

**Mike:** Schlage Encode and Encode Plus only. Software update for those locks.

**Host F:** So you're asking me to replace my hardware.

**Mike:** That's the implication, yes.

**Host F:** Okay. Keep going, I'll react.

## Section 4 — Solution comprehension

**Mike:** In your own words, what is this product?

**Host F:** It's a pre-flight checklist for your lock that runs itself before every guest shows up, and it manages the code lifecycle so I don't have to. It's the thing I've been hand-rolling for six years, except automated and presumably more reliable than the August-to-Yale sync I've been fighting.

**Mike:** What problem do you think it's meant to solve? What's it NOT trying to solve?

**Host F:** It's meant to solve the 11pm "I can't get in" call. That's the headline. And it's meant to solve the code-management chaos, especially the cleaner rotation, which I currently do on vibes. What it's NOT solving is the keypad itself. If the guest still can't press the buttons right, none of this matters. And it's not solving guest comms, you said that explicitly, the relationship with the guest stays mine.

**Mike:** What does it not do that you would have expected it to do?

**Host F:** I expected it to do more than one check. One check, two hours before arrival, that's it? I'd want to know the night before too. Two hours before check-in is when I'm already in my own head about it. I want the heads-up the previous evening so I can drive over if I need to. Two hours is cutting it close for a 35-minute drive plus a battery swap plus a re-pair.

**Mike:** The "ready" message. What should it say, when, and how?

**Host F:** Short. "Property X ready for [guest name], code active on both doors, batteries fine." That's it. Push notification, not email, I'd never see the email in time. Push the day before, around 7pm-ish, after I'm done with my day job. If there's a way to suppress the "ready" message and only ping me when something's wrong, I'd actually prefer that. I don't need a green light every single time. I need a red light when it matters.

**Mike:** The "not ready" message?

**Host F:** Specific. Tell me which property, which door, what's actually wrong, and what I can do about it from my phone. "Side door at 412 Elm, code didn't sync, retry from app" with a retry button. If I can't retry from the app, tell me I have to go to the property. Don't make me guess. The worst version is "something might be wrong, check your locks," which is what August basically does today. That's not an alert, that's anxiety.

**Mike:** Product won't unlock doors remotely. Reaction?

**Host F:** Good. I don't want it to. I've turned off remote unlock on every device I've ever owned that had it. If somebody phishes my account I don't want them opening my doors from Belarus. The keypad is the keypad, the code is the code, and I'm fine with that being the only way in.

## Section 5 — Usage intent and feature reactions

**Mike:** Assume it works as described. How does your week change?

**Host F:** Honestly? I'd stop checking the August app eight times a day. That's the biggest thing. I'd stop the pre-arrival anxiety scroll where I'm refreshing to see if the code synced. And I might stop staging the lockbox key, which I do on every changeover. So less driving, less mental load, fewer manual code resets. I'd get a couple hours of my week back, maybe more on bad weeks.

**Mike:** What matters most? Pre-arrival check, code automation, cleaner rotation?

**Host F:** The pre-arrival check, by a mile. Code automation is table stakes, Yale tried to do that and bungled it, so I'm cautious. Cleaner rotation is nice. But the check is the only thing on this list that solves the actual nightmare scenario. Everything else is hygiene.

**Mike:** What's missing that would stop you from using it?

**Host F:** Hardware. If I have to rip out two locks per property times two properties, that's four locks, plus install, plus learning a new keypad. And the keypad is the thing I care about most because that's where my guests fail. If the Schlage keypad has the same "press firmly or it won't register" problem, I've just spent a thousand bucks to get the same complaint with a different logo.

**Mike:** If you were the PM shipping v1, what would you cut?

**Host F:** Cut the cleaner code rotation from v1. Not because it's not useful, but because it's the thing I trust least and the thing I'd want to watch the system do for a few months before I let go of it. Ship the pre-arrival check and the guest code lifecycle. Leave cleaner manual for now, add it in v2 once people trust the engine.

**Mike:** Van Westendorp. Four quick ones. Too expensive to even consider?

**Host F:** Fifty bucks a month per property. At fifty, I'm out. I can buy a lot of factory resets for fifty.

**Mike:** Expensive but you'd think about it?

**Host F:** Twenty-five a month per property. I'd grumble but I'd consider it if it actually worked.

**Mike:** Great deal?

**Host F:** Ten a month per property. Ten is "yeah, fine, here's my card." That's a coffee. I lose more than that to one bad review.

**Mike:** So cheap you'd question if it works?

**Host F:** Under three bucks. If you're charging me two-fifty a month I'm assuming there's a catch, or you're harvesting my data, or it's going to be discontinued in eighteen months because the unit economics don't work.

**Mike:** Cleaner code rotation. Trust the system to revoke automatically without you confirming?

**Host F:** Eventually, yes. In month one, no. I'd want a "rotation happened, confirm to commit" step for the first stretch. After thirty or sixty days of clean runs I'd flip the switch and let it auto. The reason is my cleaner. If the system revokes her code at a weird time and she's standing outside on a Saturday morning with the next guest checking in at 3pm, that's a fire drill. I need to know the timing logic before I trust it blind.

**Mike:** System says ready, guest still gets locked out. Reaction?

**Host F:** First time, I'd be furious but I'd probably keep going. Second time in a quarter, I'm out. The whole pitch is "trust this, stop checking." If I have to keep checking anyway, you've sold me peace of mind and delivered the same anxiety with a higher monthly bill. Two strikes.

**Mike:** First 30 days, how much do you trust?

**Host F:** Pre-arrival check, fully. That's a read action, it can't break anything. Code lifecycle, supervised. I'd want to see the codes land on the lock myself for the first few bookings. Cleaner rotation, off, like I said.

## Section 6 — Anti-goal stress test

**Mike:** No auto-extend on the guest code if you let them stay an extra night.

**Host F:** Right call. I want that to be a conscious decision. If the system auto-extended every time a guest asked to stay late I'd lose track of when codes were actually live. Keep it manual.

**Mike:** No guest messaging. If you built it, would you use it?

**Host F:** No. Hard no. Airbnb has all my guest comms and that's where my reviews live. The last thing I want is a second channel where Schlage is texting my guest something I didn't write. If a code fails, Schlage should tell me, I should tell the guest. Don't put a robot between me and my review score.

**Mike:** No after-stay surveillance reporting. Change anything?

**Host F:** Nope. I don't want that data. If somebody snuck in after checkout I'd want to know in the moment, not in a report a week later. And honestly, the legal exposure of having entry logs I might be subpoenaed for, no thank you.

## Section 7 — Wrap and comparison

**Mike:** When you picked Yale, what else did you consider?

**Host F:** Schlage Encode, actually. August standalone, before Yale acquired them. RemoteLock for like a hot minute when I thought I might scale to five units. I went Yale because the form factor was clean and at the time the August integration was the best-reviewed option. If you'd asked me three years ago I'd have said I made the right call. Today I'm less sure.

**Mike:** Schlage rep at your kitchen table. One objection that's hardest to answer?

**Host F:** "I already own four Yale locks I paid good money for and your software doesn't run on them. Why is this my problem to solve, not yours?" That's the one. Make me rip out working hardware to get software I'd happily pay for, that's a tough sell. Build me a Yale-compatible version or a trade-in program and we can talk. Otherwise it's a thousand bucks of hardware plus an install weekend before I see any value, and I'd rather just keep doing the work myself.

**Mike:** Anything we didn't ask?

**Host F:** Yeah, two things. One, would I put Schlage on one property to test, or all-or-nothing? One property. Definitely one. I'd put it on the smaller unit, run it for a season, two or three guest cycles, and see if the readiness check actually catches things before they happen. If it does, I'd swap the second property the next off-season. If it doesn't, you've cost me one lock and an afternoon and I go back to Yale with a story. All-or-nothing is how you lose me at the door. One property is how you earn the second.

Two, the keypad. I keep coming back to this. If I'm replacing hardware the keypad has to be obviously better than what I have, and I'd want to try it physically before I commit. Send me a demo unit. Let me press the buttons. If it feels like the Yale, I'm not switching. If it feels noticeably better, especially for guests who don't read instructions, you might have me.

**Mike:** Helpful. Thanks for the time.

**Host F:** Anytime. Send me the demo lock.

---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-g
handle: The Warranty Warrior
date: 2026-05-13
status: raw
---

# Host G — Raw Transcript (The Warranty Warrior)

## Section 1 — Warm-up and background

**Mike:** Thanks for making the time. Tell me a bit about your hosting situation. How many properties, where, and how long?

**Host G:** Sure. I run four to five units depending on the month, because one of them rotates in and out of a mid-term lease. Spread across two markets. I've been hosting just past six years now. Long enough to have opinions, let's put it that way.

**Mike:** Which booking platforms are you on?

**Host G:** Airbnb, almost exclusively. I tried VRBO for a while. Didn't move the needle enough to be worth the second inbox. So it's Airbnb and the locks have to play nice with that.

**Mike:** Walk me through the operating model. Solo, cleaner, property manager?

**Host G:** I'm the operator. I've got two cleaning crews I rotate by neighborhood, and the rest is automated. Smart locks, automated messaging, calendar sync. I do not have a co-host or a PM company. I'm not paying twenty percent for someone to reset a code.

**Mike:** And the lock setup today. Brand, count, age?

**Host G:** Schlage Encode. I've installed thirteen of them across the portfolio over the years. Some are pushing three years, some are six months in. Doors have two locks where it matters, deadbolt plus a knob, but the smart one is always the deadbolt.

**Mike:** Walk me through how access works for a typical booking, from booking confirmation to checkout. Don't shortcut.

**Host G:** Booking comes in. My integration pulls the last four of the guest's phone number and pushes that as a code to the Encode for the dates of the stay. Cleaner has a permanent code that I rotate manually every quarter or so. Guest gets an auto-message the day of with the address and code. At checkout, the code expires on schedule. Most of the time. When it works, I don't think about it. When it doesn't, it's a fire.

---

## Section 2 — Problem validation

**Mike:** Tell me about the last time front-door access didn't go smoothly. What actually happened?

**Host G:** Oh, I have a story for that. Roughly a year ago, one of the Encodes just went dead. Not low battery. Dead. Wouldn't take a factory reset, wouldn't respond to fresh batteries, would not wake up. Six months old. I sent for the warranty replacement, which was a process in itself, and they finally sent one out. So far so good. Fast forward, the replacement lock fails right as the next guests are arriving. Like, in the window. We had to send them around to a back entrance with a different code because the front deadbolt was a brick.

**Mike:** How did you find out something was wrong? Guest or you?

**Host G:** Guest. Always the guest. That's the part that kills me. The lock didn't tell me anything was wrong, the app showed it as online, and the first I heard was a message that said "code isn't working, what do I do." That message is the worst sound in the world.

**Mike:** What did you do once you knew? Walk me through the steps.

**Host G:** Tried the code remotely through the app. Nothing. Tried sending a one-time code. Nothing, because the lock wasn't actually talking even though the app said it was. Called my cleaner who lives twenty minutes from that unit and asked her to drive over with the physical key from the lockbox. In the meantime I'm messaging the guest, apologizing, telling them to use the side door and giving them the side-door code. Soup to nuts, maybe forty-five minutes before they were inside. Felt like four hours.

**Mike:** What did it cost you beyond time?

**Host G:** A four-star review with a long paragraph about "tech issues at check-in." That paragraph is still there. It still affects bookings. I refunded one night, fifty percent, as a goodwill thing. Plus I paid my cleaner for the emergency run. Plus I had to buy a new lock because the warranty had expired by, I am not kidding, twenty days. Twenty days. Two hundred and twenty-five dollars, out of pocket, because of a calendar.

**Mike:** Set aside the major failures. Normal week, what's the most annoying thing about access management?

**Host G:** Battery anxiety. The Encodes have this pattern where they drain pretty steady down to fifty percent and then they fall off a cliff. You can't trust the percentage. So I'm checking the app way more often than I should have to, and I'm swapping batteries earlier than I need to, which costs money and time, because the alternative is a 3 a.m. text from a guest.

**Mike:** How do you handle cleaner and maintenance codes today?

**Host G:** Cleaner has a permanent code I rotate every few months manually. Maintenance gets a one-time code I set the morning of and revoke the next day. It is annoying. I forget to revoke sometimes. I know there are old maintenance codes still sitting on at least two of my locks that I have not cleaned up. That's not great, but that's where I am.

**Mike:** Hypothetical. You knew there was a 50% chance the lock fails at tonight's check-in. What do you actually do?

**Host G:** Drive over and put the physical key in the lockbox myself, and message the guest with both the code and the lockbox combo as a backup. That's what I do anyway, honestly, for the locks I already don't trust. The lockboxes never went away, they just got demoted. I keep buying smart locks and I keep keeping the lockbox.

---

## Section 3 — Concept presentation

**Mike:** Okay, I'm going to read you a product concept. Just react however you'd actually react.

[reads C-pre concept verbatim]

**Host G:** Hm. Okay. Read me the anti-goals again, the things it doesn't do?

**Mike:** Won't unlock remotely, won't message guests, won't auto-extend a code past checkout, won't monitor during the stay. One check per booking, before arrival.

**Host G:** Got it. Keep going.

---

## Section 4 — Solution comprehension

**Mike:** In your own words, what is this?

**Host G:** It's a pre-flight check for your lock. Two hours before the guest shows up, the system phones the lock, asks "are you alive, are you online, do you have the right code, and is your battery good," and tells me yes or here's what's broken. Plus it handles the code lifecycle so I'm not pushing and revoking codes manually anymore.

**Mike:** Good. What problem do you think it's meant to solve, and what's it NOT trying to solve?

**Host G:** It's meant to solve the "guest texts you saying the code doesn't work" problem. The pre-arrival anxiety thing. It is not trying to solve the lock-failed-completely problem. If my battery is at zero or the radio is dead, you're going to tell me that earlier, which is great. But the actual lock dying mid-stay, this doesn't help with that. And it's not trying to fix Schlage's hardware quality, which is the thing I actually need fixed.

**Mike:** What does it not do that you would have expected?

**Host G:** I assumed it would also do a check during the stay. Like, a battery check on day three of a five-night stay. If you're only checking at arrival and then going quiet, the lock can still die on night two and I find out the same way I always have. From a guest message.

**Mike:** The "ready" message. What do you want it to say, when, how?

**Host G:** Short. Push notification. "Unit on Maple St ready for check-in at 4pm. Battery 78%, signal strong, code synced." I want the battery number in there because right now I don't trust the green check, I trust the percentage. If it just says "ready" with no number, I'm going to open the app to verify, which defeats the point.

**Mike:** And the "not ready" message?

**Host G:** This is where you live or die. I need: which unit, what specifically failed, how long I have until check-in, and the next action. If it's "battery at 12%, swap before 4pm," fine, I can plan. If it's just "lock not ready," I'm panicking because I don't know if I need to drive there or if a tap fixes it. And please don't bundle multiple alerts. If two units have a problem, two separate messages. I want to be able to scan and act.

**Mike:** Reaction to "won't unlock doors remotely"?

**Host G:** Honestly, fine. I don't want Schlage being able to unlock my doors remotely either. I want the system to tell me what's wrong, I'll decide whether to send a code, drive over, whatever. The fewer things that have remote unlock authority, the better.

---

## Section 5 — Usage intent and feature reactions

**Mike:** Imagine this works exactly as described. How does your week change?

**Host G:** Genuinely, I check my lock app maybe ten times a day right now, between obsessing about battery levels and verifying that codes pushed. If this works, I check it zero times most days and once on check-in days when the ready message hits. That's real time back. Not life-changing, but real. The bigger change is mental. I stop bracing every Friday afternoon for the call that something didn't sync.

**Mike:** What matters most? Pre-arrival check, code automation, cleaner rotation, or something else?

**Host G:** Pre-arrival check, and not even close. Code automation I already have through my integration, more or less. Cleaner rotation is nice but it's not what I lose sleep over. The two-hour heads-up that the lock is actually awake and the code is on it, that's the gold.

**Mike:** What's missing that would stop you from using it?

**Host G:** Two things. One, hardware reliability. This is software riding on top of the same lock that died on me at six months. If the lock fails, the software is irrelevant. Two, history. I want to see, over time, the pattern. "This unit has had three not-ready alerts in the last six months." Because then I can tell which lock to replace before it dies on a guest.

**Mike:** If you were PM shipping the simplest v1, what would you cut?

**Host G:** Cut cleaner-code rotation. Cut auto-revocation at checkout. Just ship the pre-arrival check and let me keep doing codes the way I do them. Get the check right, prove it works for ninety days, then earn the right to touch my codes.

**Mike:** Van Westendorp pricing. Quick four questions. At what monthly price is it too expensive to consider?

**Host G:** Per lock or per portfolio?

**Mike:** Let's say per portfolio, your whole setup.

**Host G:** Too expensive, north of forty dollars a month. At fifty I'm out.

**Mike:** Expensive, but you'd think about it?

**Host G:** Twenty-five to thirty. I'd think about it, but I'd want a free trial and I'd want to see the not-ready alerts catch something real before I committed.

**Mike:** Great deal?

**Host G:** Ten to twelve dollars a month for the whole portfolio. At that price I'd just sign up and see.

**Mike:** Too cheap, makes you question whether it works?

**Host G:** Under four dollars a month. If it's free or near-free, I assume it's a marketing funnel for something else and I'm the product.

**Mike:** Cleaner code rotation. Trust it to auto-revoke without your confirmation?

**Host G:** No. Not on day one. I want it to send me a "revoking cleaner code in 30 minutes, tap to hold" notification, and then revoke. After six months of seeing it not screw up, maybe I let it go fully automatic. But day one, I want a hand on the wheel. My experience with this brand is that the moment I trust it fully is the moment it betrays me.

**Mike:** System says ready, guest gets locked out anyway. Reaction?

**Host G:** Furious, but honestly? Not surprised. That's already happened to me without the system promising anything. The question is what the system does next. If I get a "we said ready, we were wrong, here's the diagnostic, here's a credit on your next bill," I might stay. If I get nothing or "we can't reproduce it," I'm done. The hardware brand already burned me on warranty. I will not give them a second chance to burn me on software accountability.

**Mike:** How much do you trust this in the first thirty days?

**Host G:** Maybe forty percent. I'm leaving the lockbox key in place. I'm checking the app anyway. I'm not telling my cleaners to rely on it. The system has to earn the rest, alert by alert.

---

## Section 6 — Anti-goal stress test

**Mike:** Won't auto-extend a code if you let a guest stay an extra night. Bothers you?

**Host G:** Feels right. That's a money decision and a judgment call. I want to be the one to push the button. If the system extended automatically every time a guest asked, I'd have guests squatting on cheap codes.

**Mike:** Won't message guests directly. If you built it, would you use it?

**Host G:** No. My guest messaging is dialed in. It's branded, it's in my voice, it's integrated with my pricing logic. Schlage messaging guests would feel like a third party stepping into a conversation that's mine. Hard pass.

**Mike:** Won't show who entered after a stay ended. Change your view?

**Host G:** Doesn't bother me. I don't want surveillance reporting from my lock company. If I want to know who came in, I'll look at my exterior camera. Lock company stays in its lane.

---

## Section 7 — Wrap and comparison

**Mike:** When you picked your current setup, what alternatives did you consider?

**Host G:** Yale Assure, August, and I'd read threads on RemoteLock for hosts with bigger portfolios. I went Schlage because of brand and because the Encode was the only one at the time that didn't need a separate hub. Knowing what I know now? I'd seriously look at Yale and I'd ask different warranty questions. Reddit changed my mind on a couple of these brands and I trust those threads more than I trust the boxes.

**Mike:** Schlage rep sells you this tomorrow at your kitchen table. One objection that's hardest to answer?

**Host G:** "Why am I paying you a monthly fee to monitor the hardware that you sold me, which fails outside of warranty, which you then refuse to stand behind." That's the one. The software is a polish on a product I already feel cheated by. Until the warranty story changes, the monthly fee feels like I'm paying twice for the same broken promise. If they want me on a subscription, the subscription needs to come with extended hardware warranty coverage. Bundle it. Otherwise it's a non-starter.

**Mike:** Anything we didn't ask that you'd want us to know?

**Host G:** Yeah. The "ready" notification is the thing you ship and live or die on, but the relationship-saving move is what you do when the system is wrong. Build the apology and the credit into v1. Don't make me chase support. If a "ready" message turns into a lockout, I want an automated "we missed it, here's a month free, here's what we saw in the logs" within an hour. That single behavior is what would make me believe Schlage learned something. Because right now my read on them is that they ship and walk away.

**Mike:** That's clear. Thanks for the time.

**Host G:** Anytime. Tell whoever's building this that the bar is higher than they think.

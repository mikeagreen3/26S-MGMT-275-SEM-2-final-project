---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-h
handle: The Kwikset Convert
date: 2026-05-13
status: raw
---

# Host H — The Kwikset Convert — Raw Transcript

## Section 1 — Warm-up and background

**Mike:** Thanks for hopping on. To start, tell me a bit about your hosting situation. How many properties, where are they, and how long have you been hosting?

**Host H:** Sure. So I've got four units clustered together in a small mountain town, plus a cabin a few miles out from those. Five doors total. I've been doing this multiple years now, long enough that I've made every mistake at least twice. It's a rural market, weekend and seasonal traffic mostly. Ski folks in winter, hikers and families in summer, mostly dead in the shoulder months.

**Mike:** Got it. Which booking platforms are you on?

**Host H:** Airbnb and VRBO. Airbnb does most of the volume, VRBO picks up the longer family stays. I've thought about going direct, but I'm not ready to do my own marketing.

**Mike:** And operating model. Solo, cleaner, co-host?

**Host H:** Solo with a cleaner. I've got one cleaner who handles all five properties. She's been with me three seasons now, knows the units better than I do at this point. No co-host. I run the business off Hospitable for the PMS side, that's the messaging and the calendar.

**Mike:** What does your lock setup look like today? Brand, count, how long?

**Host H:** Kwikset Halo across all five doors. I switched over from Schlage about eighteen months ago. The Schlage Encodes I had before were a nightmare in this market, and I'll get into that in a minute if you want. The Kwiksets have been, honestly, way more reliable for what I need. There are still hassles, but they're hassles I can plan around.

**Mike:** Walk me through how front-door access works for a typical booking. Start when the guest books.

**Host H:** Okay. Guest books on Airbnb. Hospitable picks that up and starts the messaging sequence. Three days out they get a welcome message, day before they get directions and parking notes. Here's where it gets dumb. Hospitable doesn't have a direct integration with Kwikset, so I have to manually generate a code in the Kwikset app and paste it into the check-in email myself. Every single booking. It's not the worst thing in the world but it's not what I'm paying a PMS for. Day of, guest gets the code, they show up, they punch it in, hopefully the door opens. After checkout I go back into the app and delete the code, or I let it expire if I set an end date. Cleaner has her own permanent code. That's it.

## Section 2 — Problem validation

**Mike:** Tell me about the last time front-door access didn't go smoothly.

**Host H:** Oh man. So this was last fall. I had a couple arrive at the cabin around 9pm, pitch dark, way out from town. They put in the code, nothing. Try again, nothing. They text me. I'm checking the app, the code is there, the code is correct, but the lock is just unresponsive. Turns out the batteries were dead. I'd put fresh ones in maybe six weeks prior. Six weeks. I had to drive thirty-five minutes out there with a backup set, in the dark, in the rain. Guest was gracious about it but I refunded them a night because come on.

**Mike:** How'd you find out? Guest told you, or did you catch it?

**Host H:** Guest told me. I had no idea. There's no alert that says "your batteries are dying," there's just dead. That's the whole problem.

**Mike:** What did that cost you beyond the time?

**Host H:** Refunded one night, that's roughly two-fifty. Gas, an hour and a half of my evening, and the guest left a four-star review that mentioned the lock. Four stars on Airbnb is basically a punishment, you know that. Listing penalty for sure, hard to quantify. And honestly, sleep. I was up at 2am that night replaying it.

**Mike:** Set aside the big failures. On a normal week, what's the most annoying part of access management?

**Host H:** Two things. One is the manual code paste from Kwikset into Hospitable, every booking, like I said. The other is just constant battery anxiety. I check battery levels in the app probably three times a week across all five locks. Because of the connectivity situation up here, the locks burn through batteries way faster than they should. I've had a lock go from full to dead in under two months. I had one stretch where a single lock burned through three sets of batteries in less than a week because of a mesh Wi-Fi conflict. So I'm always thinking about it.

**Mike:** That's a wild fact. Tell me more about the mesh issue.

**Host H:** Yeah, so the cabin had a dual-band mesh router setup, like most modern routers do. The lock kept trying to handshake on the 5GHz band, failing, retrying, draining the battery. Three sets of AAs in like six days. I figured it out from a thread on the AirBnbHosts subreddit, ended up splitting the network so the 2.4GHz has its own SSID and forcing the lock onto that band. Solved most of it. But that's the workaround. The actual product doesn't handle modern Wi-Fi well, you have to know to do this.

**Mike:** How do you handle cleaner codes?

**Host H:** My cleaner has a permanent code. Same one for years. I know that's not best practice security-wise, but she's family at this point and rotating it would be a hassle for both of us. Maintenance folks I do rotating, I set them up the day of and remove them after.

**Mike:** Hypothetical. If you knew there was a 50% chance the lock would fail at tonight's check-in, what would you actually do?

**Host H:** I'd drive out there and meet the guest at the door. There's no way I'd let them roll up and have it fail. With my cabin specifically, cell service is also spotty so they might not even be able to reach me. So I'd just go. That's the calculus every single check-in actually, in the back of my head: how likely is this to fail and is it worth the drive to preempt it. Usually I don't go. But I'm thinking about it.

## Section 3 — Concept presentation

**Mike:** Let me read you the concept. [reads concept verbatim from the guide]

**Host H:** Okay. Couple clarifying questions before I react. The Wi-Fi check, what's it actually checking? Like is it pinging the lock, or just checking that the lock checked in with the cloud recently?

**Mike:** It's checking the lock's connection state through the Schlage cloud. Whether the lock has a live connection back to the mothership.

**Host H:** Yeah, that's what I was afraid of. Okay, second question. This is Schlage Encode and Encode Plus only, right? Not, like, a Kwikset version coming.

**Mike:** Correct. Schlage hardware only.

**Host H:** Right. Okay. I'm ready to react.

## Section 4 — Solution comprehension

**Mike:** In your own words, what is this product?

**Host H:** It's a peace-of-mind layer on top of Schlage Encode locks. It does a pre-flight check before each guest shows up, tells you whether your lock is going to actually work, and it handles the code lifecycle so you're not pasting things by hand. That's the gist.

**Mike:** What problem do you think it's meant to solve, and what's it NOT trying to solve?

**Host H:** Meant to solve: the 9pm phone call from a guest who can't get in. Specifically the preventable version of that call, the one where you could've caught it if you'd known. Not trying to solve: in-stay problems, anything after the guest is already inside, guest communication. It's a pre-arrival product. Which honestly I respect. The scope is clear.

**Mike:** What does it not do that you would have expected it to?

**Host H:** I would've expected it to tell me proactively about battery problems even when there isn't a check-in coming up. Like, the cabin sometimes sits empty for two weeks in shoulder season. If the battery dies during that gap I won't know until the next guest shows up and the check happens two hours before. By then it's too late to ship batteries out there or drive out. So the every-booking cadence is fine for high-occupancy properties, but for a vacation cabin with gaps, I'd want continuous battery monitoring too. That's a gap for me.

**Mike:** The "ready" message. What would you want it to say, when, and how?

**Host H:** Short. Like, "Cabin: ready for Jake at 4pm." Property name, guest first name, time. That's it. Push notification on my phone, two hours out is fine. I don't want an email, email gets buried. I don't want it in-app only because I won't open the app. Push, two hours before, one line.

**Mike:** "Not ready" message. Same question.

**Host H:** Way more information. Tell me exactly what's wrong. "Cabin: battery at 12%, replace before 4pm" or "Cabin: code didn't sync, tap to resend." I need to know what to do. And critically, if Wi-Fi is the problem, the message has to actually reach me, which means the alert can't be dependent on the same Wi-Fi that just failed. Cellular fallback or something. Because half my failures are the lock losing connectivity, and if the alert system runs through that same connection, I'm not getting the alert.

**Mike:** Good point. Let me push there. So if the lock loses Wi-Fi, the Concierge can't run the readiness check at all, right? What's that experience for you?

**Host H:** Yeah, that's where this thing starts to fall apart for my situation. If the readiness check requires the lock to be online and the lock can't get online half the time at my cabin, then what does the product actually tell me? "Couldn't reach lock"? Great, now I have a notification that doesn't actually inform me of anything except that I should drive out and check. That's not solving the problem, that's just relocating it. So this question of how the product behaves when the lock is offline is, for me, the whole ballgame. Honestly I'd love to know what your design says about that.

**Mike:** Fair pushback. The current scope assumes the readiness check happens when the lock's online; offline locks raise an alert but the system can't diagnose further. Noted as a real concern. Reaction to the product not unlocking doors remotely?

**Host H:** Totally fine. I don't want that liability anyway. If a guest calls me locked out, I'd rather diagnose with them on the phone than just pop the door open from my couch. That feels like a feature, not a missing thing.

## Section 5 — Usage intent and feature reactions

**Mike:** Imagine this works exactly as described. How does your week change?

**Host H:** If it actually worked, I'd reclaim probably two hours a week of checking battery levels and pasting codes. That's real. The bigger win is the 9pm anxiety. I'd sleep better the night before high-stakes check-ins. But the caveat is, only if it works at my properties, and that's a real if for me.

**Mike:** Which part matters most? Pre-arrival check, code automation, cleaner rotation?

**Host H:** Code automation, easily. The pre-arrival check is great but it's the safety net. The code automation is the thing I'd actually feel every single booking. If Schlage shipped just the code automation piece and called it a day, that would still be worth a paid subscription to me, if I were on Schlage hardware.

**Mike:** What's missing that would stop you from using it?

**Host H:** I'm not on Schlage hardware anymore. That's the literal blocker. I switched away because of the same problems this product is trying to solve. If I were still on Schlage I'd consider it, but the lift to switch back, after I've gotten used to Kwikset, is enormous. So this is a great product for people who haven't already churned, but I'm a churned customer.

**Mike:** If you were the PM and had to cut to a v1, what goes?

**Host H:** Cut the cleaner code rotation. Most hosts with a long-term cleaner aren't going to want that automated anyway, the trust isn't there yet. Ship the readiness check and the guest code automation, those are the two things that matter. Cleaner stuff can come in v2 once people trust the system.

**Mike:** Van Westendorp. At what monthly price is this too expensive to even consider?

**Host H:** Forty bucks a month per property, that's a no.

**Mike:** Expensive but you'd still think about it?

**Host H:** Twenty per property.

**Mike:** Great deal?

**Mike:**

**Host H:** Eight to ten a month per property. That feels like a great deal for what you're describing, assuming it actually works.

**Mike:** So cheap you'd question whether it actually works?

**Host H:** Under three bucks. If you told me this was two dollars a month I'd assume the readiness check was just a ping and not actually doing anything real.

**Mike:** Cleaner code rotation. Would you trust the system to auto-revoke without you confirming?

**Host H:** No. Not at first. My cleaner needs reliable access, and if the system rotates her code at the wrong moment and locks her out of a property she's mid-clean in, that's a disaster. I'd want a confirmation step for at least the first six months. After that, maybe.

**Mike:** If the system told you everything was ready and a guest still got locked out, what's your reaction?

**Host H:** First time, I'd be annoyed but I'd give it another shot if the post-mortem made sense. Like, if you told me "Wi-Fi dropped between the check and the arrival, here's what we're doing about it," fine. Second time, I'm out. Trust in this category is binary. Once it fails on a green light, it's done.

**Mike:** How much would you trust in the first 30 days?

**Host H:** Honestly, I'd run it parallel to my existing process for at least a month. I'd let the system do its thing, but I'd still be checking battery levels myself and double-checking codes. It's the only way to build trust.

## Section 6 — Anti-goal stress test

**Mike:** The product won't auto-extend codes if a guest stays an extra night. Does that bother you?

**Host H:** Feels right. I want to be the one to make that call. Auto-extending feels like the system making a money decision for me.

**Mike:** It won't message guests directly. If it could, would you use it?

**Host H:** Absolutely not. Hospitable is my guest comms. I'd never let a lock vendor near my guest relationship. Stay in your lane.

**Mike:** It won't show you who entered after a stay ended. Does that change things?

**Host H:** Doesn't bother me. I've never wanted that data. If I'm worried about someone, I have cameras at the entryway, that's a separate system.

## Section 7 — Wrap and comparison

**Mike:** When you picked Kwikset, what alternatives did you consider?

**Host H:** Schlage obviously, since I was on them. I looked at Yale, the Yale Assure with Z-Wave. I looked at August briefly. RemoteLock came up in a BiggerPockets thread but the hardware felt commercial-grade for what I needed. I went Kwikset because of battery life and the Halo's Wi-Fi handling at the time looked more rural-friendly. That was the decision.

**Mike:** If a Schlage rep walked into your kitchen tomorrow and pitched this, what's the one objection that'd be hardest for them to answer?

**Host H:** "Your product assumes reliable Wi-Fi at the lock. Half of my properties don't have reliable Wi-Fi at the lock. What does the AI Concierge tell me when the lock is offline, and how is that different from what I already get today, which is silence?" If they can't answer that for rural hosts, this is an urban product. And they should say so. Don't sell me a rural solution that needs urban infrastructure.

**Mike:** Anything we didn't ask?

**Host H:** Yeah. Ask other rural hosts. We're not a niche, we're a meaningful slice of the STR market, especially in cabin and mountain territory. Most smart lock products are built for someone with gigabit fiber and a doorman, and we're not that. If Schlage wants this segment, they need to design for it, not assume around it. Otherwise just go ahead and tell us it's not for us and we'll stop wasting each other's time.

**Mike:** Appreciate the candor. Thanks for the time.

**Host H:** Anytime.

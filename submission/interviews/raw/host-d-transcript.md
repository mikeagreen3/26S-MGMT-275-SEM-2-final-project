---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-d
handle: The August Agonizer
date: 2026-05-13
status: raw
---

# Host D — The August Agonizer — Raw Interview Transcript

## Section 1 — Warm-up and background

**Mike:** Thanks for jumping on. Before we get into product stuff, tell me a bit about your hosting situation. How many properties, where, how long you've been at it?

**Host D:** Just the one place. It's a single unit in the middle of the city, walkable neighborhood, lots of foot traffic. I've been hosting on Airbnb for, gosh, over ten years now. I'm not running a portfolio. This is one apartment, but it turns over a lot.

**Mike:** And you said Airbnb. Are you on VRBO too, or direct bookings?

**Host D:** Just Airbnb. I've thought about VRBO. I've never pulled the trigger. Honestly, managing one channel reliably is already enough of a headache for me. I'm not going to add a second platform until the first one stops giving me migraines.

**Mike:** Fair. Walk me through your operating model. Are you solo, do you have a cleaner, a co-host?

**Host D:** Solo on the management side. I have a cleaner I've worked with for years. She comes in between guests, and that's basically the only other person who needs to get in. I don't have a co-host, no property manager. It's me, the apartment, and the cleaner.

**Mike:** Got it. And your lock setup today, brand, how many, how long since you put it in?

**Host D:** It's an August lock with the keypad attachment. One door, one lock. I've had it for, I want to say four years? Something like that. I bought it specifically because Airbnb has a direct integration with August. That was the selling point.

**Mike:** Walk me through how front-door access works for a typical booking. From the moment a guest books, all the way to when they leave. Don't shortcut it, give me every step.

**Host D:** OK so, in theory, here's how it's supposed to work. Guest books on Airbnb. The integration is supposed to read the last four digits of their phone number, push that as a code to the August lock, the guest gets the code in their Airbnb messages, they show up, punch it in, in they go. Checkout day, the code expires. Cleaner has her own permanent code. That's the dream.

In practice? That's not what happens. The integration would generate codes that didn't match the guest's actual phone number. Or it would push a code and then the code wouldn't actually land on the lock. So a guest shows up at 9pm with a four-digit code that doesn't work, and I'm getting a panicked message. After enough of that, I stopped trusting the integration. Now what I do is, I get the booking, I open the August app, I look at the guest's phone number myself, I type a code in manually, I send it to the guest in an Airbnb message myself. The platform integration is turned off. I run the whole thing by hand.

## Section 2 — Problem validation

**Mike:** Tell me about the last time front-door access didn't go smoothly. What happened?

**Host D:** Pre-manual era, about a year ago. Guest arrived around 10pm, code didn't work. I'm in pajamas, I check the August app, and the code the integration said it pushed is just not on the lock. Or it's there as a different number than what the guest had. I had to generate a new code on the fly and message it to her. She was patient, but you could tell she was annoyed.

**Mike:** How'd you find out? Did the guest tell you or did you catch it?

**Host D:** The guest. I never catch these. The system doesn't tell me anything is wrong. It just silently fails. That's the part that drives me crazy. I'd rather get a warning at 7pm that says "hey, this code didn't land" than find out at 10pm because someone's standing outside in the rain.

**Mike:** Once you knew, walk me through what you did and how long.

**Host D:** Open the app, generate a new code, message it through Airbnb, ask her to try again, wait. From her first message to her getting inside, probably twenty minutes. The actual code generation took me thirty seconds. The experience for her was half an hour of "this is not the welcome I paid for."

**Mike:** What did that cost you beyond the time?

**Host D:** She didn't leave a bad review, which I was grateful for. But she didn't leave a five-star one either. So that's a hit to my listing ranking. Not a refund, no money out of pocket. But sleep, yeah. I sat up for another hour after she got in because I was worried she'd message again. And honestly, the trust hit on me, on the system, was the biggest cost. After that one I started turning off the integration on bookings I cared about. By a few months later it was off completely.

**Mike:** Set aside the big failures. On a normal week, what's the most annoying part of access management for you?

**Host D:** Honestly? Generating codes manually for every booking. It's not hard. It takes me less than a minute per guest. But it's a minute I have to do every single time, and it's a context switch. I'm at work, I get the booking notification, I have to stop, open the August app, look up the guest's number, decide on a code, type it in, message it to the guest. Multiply that by, you know, a lot of bookings a year. It adds up.

**Mike:** How do you handle codes for the cleaner?

**Host D:** She has a permanent code. It hasn't changed in years. I trust her. If I lost her tomorrow and had to onboard a new cleaner, I'd think harder about it. But right now? Permanent. I know that's not best practice. I don't care.

**Mike:** If you knew there was a 50% chance the lock would fail at tonight's check-in, what would you actually do right now?

**Host D:** Drive over and physically meet the guest with a key. That's the only thing I'd actually trust. I wouldn't trust a backup code. I wouldn't trust pushing a new code. If I knew it was 50/50, I'd just show up.

## Section 3 — Concept presentation

**Mike:** OK, I want to read you a product concept and get your honest reaction. Just listen, then I'll ask questions.

Schlage AI Access Concierge is a software update for Schlage Encode and Encode Plus locks. About two hours before every check-in, it runs an automatic readiness check on each of your locks. It looks at battery, Wi-Fi connection, whether the guest's code actually synced from your booking platform, and whether the code is physically present on the lock. If everything passes, you get one short message that says you're ready. If something fails, you get a specific alert that tells you what's wrong and what to do next.

The system also handles your guest and cleaner code lifecycle on confirmed bookings. When a booking comes in, the guest code is created and pushed to the lock automatically. After a cleaner's window ends, their code rotates. At checkout, the guest code is revoked. No manual code entry.

A few things it specifically does not do: it won't unlock doors remotely. It won't message your guests directly. It won't auto-extend a code if a guest stays past checkout. And it won't watch the property continuously during the stay.

**Host D:** OK. I have to be honest with you. My first reaction is, this is what August's integration was supposed to be, and that one ruined my life. So I'm sitting here listening to your pitch and the whole time my brain is going, "Yeah, but does it actually work?"

## Section 4 — Solution comprehension

**Mike:** That's fair. In your own words, what is this product?

**Host D:** It's a babysitter for the lock. Before a guest shows up, it checks the lock is going to actually do its job, and if it isn't, it tells you in time to fix it. And it manages the code lifecycle so you don't have to type codes manually. Those are the two things.

**Mike:** What problem do you think it's trying to solve, and what's it NOT trying to solve?

**Host D:** It's solving the "I don't know if the code actually landed" problem, which is exactly the problem I have. And it's solving the "ugh I have to do this manually every time" problem. What it's not trying to solve is, like, the guest experience. It's not messaging the guest, it's not letting them in if the code fails. It's not a concierge for the guest. It's a concierge for me.

**Mike:** What does it NOT do that you would have expected it to do?

**Host D:** Honestly, I would have expected remote unlock. You said it doesn't, and I think I get why, but I would have expected it. The other thing I would have expected is some kind of "test the lock right now" button. Like, I get a guest arriving in twenty minutes, I want a button that says "do the readiness check again." You said it's two hours before. What if I want to run it on demand?

**Mike:** Noted. The "ready" message. Walk me through what you'd want it to say, when, and how you'd get it.

**Host D:** Push notification. Not text, not email. Text is for things that matter and I want to keep email clean. Push is fine. Two hours before is good, I want it earlier than that actually, like four hours, because if the battery's dying I want time to deal with it. As for content, just, "Apartment ready for Jane, check-in at 3pm." Short. Don't tell me what passed. I don't need a checklist. Just tell me I'm clear.

**Mike:** And the "not ready" message?

**Host D:** That one I want everything. Tell me what failed, tell me which lock if I had multiple, tell me what action I need to take, and tell me how much time I have before the guest shows up. And give me a button in the notification to do something about it. Don't make me hunt through an app to find the failed lock.

**Mike:** The product specifically doesn't unlock doors remotely. Your reaction?

**Host D:** Mixed. I think you're playing it safe and I respect that, because if Schlage starts unlocking doors and something goes wrong, that's a lawsuit. But practically, when a code fails at 10pm and I'm in pajamas, the thing I want most in the world is a remote unlock. So you're choosing not to give me my single biggest emergency tool. I understand the choice. I don't love it.

## Section 5 — Usage intent and feature reactions

**Mike:** Imagine this works exactly as described. How does your week change?

**Host D:** If, and this is a big if, if it actually works, I stop doing the manual code generation. Which is maybe twenty, thirty minutes a week of context switching. More importantly, I stop the low-grade anxiety of wondering whether tonight's guest is going to message me at 10pm. That's the bigger win. I'd sleep better.

**Mike:** Which part matters most? Pre-arrival check, code automation, cleaner rotation, something else?

**Host D:** Pre-arrival check. By a mile. The code automation I can live without, I've been doing it manually for a year. But the "did the code actually land" check, that is the exact problem I have. If you only built that one feature and nothing else, I'd still be interested.

**Mike:** What's missing that would stop you from using it?

**Host D:** Proof it works. I don't mean a demo. I mean, six months of forum posts from real hosts saying "this thing has been rock solid." I'm not an early adopter for software that touches my front door. Not anymore.

**Mike:** If you had to ship the simplest possible v1, what would you cut?

**Host D:** Cut the cleaner rotation. Cut the code revoke at checkout. Just do the pre-arrival check. That's the wedge. Once I trust that, sell me the rest.

**Mike:** OK, four quick pricing questions. At what monthly price would this feel too expensive to even consider?

**Host D:** Twenty bucks a month. Above that and I'm out, I'm not paying that for one lock.

**Mike:** Expensive but you'd still think about it?

**Host D:** Twelve to fifteen.

**Mike:** Great deal?

**Host D:** Five to seven a month. Somewhere in there feels like, OK, that's the cost of a coffee, and it's saving me real headaches.

**Mike:** So cheap you'd question whether it actually works?

**Host D:** Under two bucks. If you're charging me a dollar fifty a month I'm going to assume the engineering investment behind it isn't real, and given my history I'd rather pay for something that's actually being maintained.

**Mike:** Cleaner code rotation. Would you trust the system to revoke your cleaner's code automatically after her window ends, without you confirming it?

**Host D:** No. Hard no. Look, my cleaner has had the same code for years. If your system decides on its own to rotate it, and she shows up Tuesday morning and her code doesn't work, that's a disaster for me. She's going to call me angry, I'm going to be in a meeting, and I'm going to lose either time or a cleaner. The cleaner relationship is one of the most important things I have as a one-unit host. I am not letting a piece of software touch it without my explicit say-so every single time. If you want me to use the cleaner feature, give me a confirmation step. "We're about to rotate Maria's code, confirm." Otherwise no.

**Mike:** If the system told you everything looked ready, and then a guest still got locked out, what's your reaction?

**Host D:** First time? I'm furious but I keep using it, because I'd want to see if it was a one-off. Second time, in any reasonable window, like within six months? I'm done. I've already lived through the August integration. I'm not living through a second betrayal of the same shape. "It told me it was ready and it wasn't" is the exact failure mode that broke my trust the first time, and I have zero patience for it.

**Mike:** In the first 30 days, how much would you trust?

**Host D:** The pre-arrival check, yes, because I'd be watching it. The code automation, no, I'd run it in parallel with manual codes for at least a month. The cleaner rotation, like I said, never on autopilot.

## Section 6 — Anti-goal stress test

**Mike:** Product won't auto-extend a guest's code if you let them stay an extra night. Bothers you, feels right?

**Host D:** Feels right. That should be a deliberate decision every time. I'm fine clicking a button to extend. I don't want the software deciding.

**Mike:** Product won't message your guest directly. If you built it, would you use it?

**Host D:** No. My voice on Airbnb is part of my brand. My check-in instructions have personality. They mention the coffee shop two doors down. If Schlage sends a generic message that's not in my voice, I look corporate, and that's a worse guest experience. Keep the messaging on my side.

**Mike:** Product won't show you who entered after a stay ended. No after-stay surveillance. Does that change how you'd think about it?

**Host D:** No, and I'd be a little uncomfortable if it did. I don't want to be watching the door for forty-eight hours after checkout. That's creepy. If a guest left something and came back to grab it, I don't need to know. I'd rather not have that data than have it.

## Section 7 — Wrap and comparison

**Mike:** When you bought the August, what alternatives did you consider?

**Host D:** Schlage actually. The Encode was on my list. I picked August because of the Airbnb integration, which, as we've covered, was a mistake. I also looked at Yale. I never considered Igloohome or Operto, I'd never heard of them at the time.

**Mike:** If a Schlage rep walked into your kitchen tomorrow and tried to sell you this, what's the one objection you'd raise that would be hardest for them to answer?

**Host D:** "I'd have to rip out my August lock and buy your hardware to use your software. Why would I trust your integration when the last one I trusted made me manually run codes for a year? Prove to me that your software is fundamentally different from August's, not just newer." That's the one. The brand-switch barrier plus the trust scar. They'd have to convince me twice. Once on the product working, and once on the cost of throwing out hardware that physically still works fine.

**Mike:** Anything we didn't ask that you'd want us to know?

**Host D:** Yeah, one thing. I'd want to know who's on the hook when the readiness check is wrong. If your software tells me I'm ready and the guest gets locked out, do you offer any kind of guarantee? Refund my month? Cover the refund I have to give the guest? Because if it's just "sorry, we'll do better," that's the same answer August gave me, and that's not enough. If you put some skin in the game on accuracy, I'd take you a lot more seriously.

**Mike:** Really appreciate it. Thanks for the time.

**Host D:** Sure. Build something that actually works. That's all I want.

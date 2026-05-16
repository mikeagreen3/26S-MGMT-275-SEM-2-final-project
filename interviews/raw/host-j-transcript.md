---
type: interview-transcript
domain: mba
course: mgmt275-pm-delivery
persona: host-j
handle: The Auto-Lock Agnostic
date: 2026-05-13
status: raw
---

# Host J — The Auto-Lock Agnostic (Raw Transcript)

## Section 1 — Warm-up and background

**Mike:** Thanks for making time. Let's start easy. Tell me about your hosting situation. How many properties, where, how long?

**Host J:** Two active units, and a third I'm in between on. All out of state from where I live, so this is fully remote for me. Two years in. Got Superhost the second year and kept it, which I'm proud of, but it's cost me some hair.

**Mike:** Which platforms?

**Host J:** Airbnb. Just Airbnb. I'm on OwnerRez on the back end for the PMS side, calendar, messaging templates, that kind of stuff, but the booking funnel is Airbnb only. I've thought about going direct but I'm not there yet.

**Mike:** Walk me through your operating model. Solo, cleaner, property manager?

**Host J:** Local cleaners at each property, that's my ground crew. No on-site manager. I'm five hours away on a good travel day. Everything I do is from a laptop or my phone. That's the whole point of how I set this up. If I have to drive out, something has already gone really wrong.

**Mike:** Lock setup?

**Host J:** Schlage Encode on every door. Wi-Fi built in, no separate bridge to fail. One lock per property. About eighteen months in on the first two.

**Mike:** Walk me through how front-door access works for a typical booking, beginning to end. Don't shortcut.

**Host J:** Okay. Booking lands in Airbnb, OwnerRez picks it up, OwnerRez generates a code and pushes it to the Schlage. That code goes into the guest's message via the OwnerRez template, which fires automatically. Day-of, the guest gets the address and the code. They walk up, they punch it in, ideally the door opens. Cleaner has her own code, on a schedule that matches her cleaning windows. After checkout the guest code expires on its own. That's how it's supposed to work. When it works, I do nothing, which is the whole point. When it doesn't work, I'm doing everything from five hours away, which is the other whole point.

## Section 2 — Problem validation

**Mike:** Tell me about the last time front-door access didn't go smoothly.

**Host J:** Okay so there are two stories and I'm going to tell you both because they're different flavors of bad. First one: OwnerRez had an API outage. Their system to the Schlage cloud just went down. So the code got generated on OwnerRez's side, it just never made it to the actual lock. Guest pulls up, types in the code I sent them, nothing. They text me. I'm looking at OwnerRez going, it says it sent, and I'm looking at the Schlage app going, no code on the lock that matches. By the time I figured out it was an outage and not me being dumb, the guest had been outside for forty minutes.

**Mike:** And the second one?

**Host J:** Second one was worse. Guest is staying with their dog. At five in the morning, they step outside, I think to take the dog out or grab something from the car, I don't fully know. The door auto-locks behind them. The dog is inside. They don't have their phone. They're in pajamas. They eventually flag down a neighbor, borrow a phone, text me. I'm five hours away. It's five a.m. for them, it's six a.m. for me. I had to tell them to sit tight until ten when I could get someone out there. They were furious. I would be furious.

**Mike:** How did you find out, in each case?

**Host J:** Guests. Both times, guests. That is the thing that ate at me afterwards. In both cases I had no advance signal. I was running blind until someone was already standing outside in a bad situation.

**Mike:** What did you do once you knew, walk me through it.

**Host J:** First one, I called OwnerRez support, then I went into the Schlage app and manually keyed in a temporary code, then I texted the guest the new code, then I sat there and watched the app until I saw the code show up on the lock. That whole loop was maybe an hour. The dog-lockout one was worse because there was no software fix. I had to find a locksmith in a town I don't live in, at five in the morning, who'd come out for a reasonable rate, which doesn't exist. Five hours from a fix.

**Mike:** What did it cost you, beyond time?

**Host J:** First one, four-star review, the guest was decent about it. Second one, three-star and a long paragraph about the dog. I had to do a partial refund. The locksmith was a couple hundred dollars. But the thing that actually cost me was after the dog incident I went and disabled auto-lock on every property. Which means now I'm relying on guests and cleaners to actually pull the door shut and engage the deadbolt. Which they don't always do.

**Mike:** On a normal week, with no incident, what's the most annoying part?

**Host J:** Not knowing if the sync happened. That's it, that's the whole answer. OwnerRez says it pushed. The Schlage app sometimes shows the code, sometimes doesn't update until I close and reopen it. I do not actually know, in the hours before a check-in, whether the code on the lock matches the code I sent the guest. So I do this little dance where I'll check the app, refresh, check OwnerRez, refresh, and even after all that I'm still not sure. It's exhausting and it's every single check-in.

**Mike:** How do you handle codes for cleaners and maintenance?

**Host J:** Cleaners have a recurring schedule in OwnerRez, so their code is on a window that lines up with their cleaning slots. I rotate the actual code every few months, manually, because I'm paranoid. Maintenance, if a plumber's coming, I just set a one-shot through OwnerRez. That part is fine. The cleaner side is fine too as long as the sync works, which see above.

**Mike:** Hypothetically, if you knew there was a fifty percent chance the lock would fail at tonight's check-in, what would you actually do right now?

**Host J:** I would tell the guest the lockbox code and walk them through getting in with the physical key. That's exactly why I put manual lockboxes with spare keys at every property after that first outage. Belt and suspenders. I'd also probably call my cleaner and have her stop by to make sure the lock looked okay. But the lockbox is the answer. The lockbox is always the answer for me now.

## Section 3 — Concept presentation

**Mike:** Okay, let me read you the concept. *Reads C-pre description verbatim, including the four anti-goals.*

**Host J:** Hmm. Okay. Read me the last part again, the part about what it doesn't do.

**Mike:** *Re-reads: no remote unlock, no guest messaging, no auto-extension, no after-stay surveillance.*

**Host J:** Okay. That's interesting. Keep going.

## Section 4 — Solution comprehension

**Mike:** In your own words, what is this product?

**Host J:** It's a babysitter for my locks that wakes up two hours before a guest arrives, checks if everything is going to work, and tells me yes or tells me specifically what's broken. And then it handles the codes for me on the booking side. And, importantly, it doesn't try to do anything beyond that. It doesn't pretend to be the front desk.

**Mike:** What problem do you think it's trying to solve? What problem is it not trying to solve?

**Host J:** It's solving the not-knowing problem. The thing I just described, where I'm refreshing two apps for two hours and still don't know. It's not trying to solve guest communication, which, good. It's not trying to solve in-stay issues, which, also good. And it's not trying to be a smart home, which, please don't.

**Mike:** What does it not do that you would have expected it to do?

**Host J:** Honestly? Given how OwnerRez burned me on the sync, I would expect it to keep retrying the code push until it confirms the code is actually on the lock. Not just check once and tell me yes or no. Retry. Hammer it. If the cloud says the code is there and the lock says it isn't, I want the system to push that code again and again until they agree, or until it tells me, hey, this isn't going to resolve, do something. The two-hour check is fine but I don't want it to just observe the failure, I want it to fight the failure.

**Mike:** The "ready" message. What do you want it to say, when, and how delivered?

**Host J:** Push notification on my phone. Two hours before check-in is fine. The message should be one line. Something like, all three checks passed, lock is ready for tonight's guest. Don't give me a paragraph. Don't make me open the app to see the detail. If everything is green I want to glance at my lock screen and move on with my day. The whole value to me is that I can stop thinking about it.

**Mike:** The "not ready" message. What do you need in it?

**Host J:** Specificity. I do not want, "Issue with lock, tap for details." I want, "Battery at fifteen percent, replace before nine p.m." or, "Code did not sync, the system has retried four times and is still trying, you'll get an update in ten minutes." Tell me exactly what's wrong and what's already being done about it. Tell me what I need to do. And, this is important, tell me if it's the kind of problem that the lockbox-with-key fallback is going to solve, because if it is I can text the guest the lockbox code preemptively and the rest is gravy. The not-ready message is doing real work, it shouldn't be vague.

**Mike:** Product won't unlock doors remotely. Reaction?

**Host J:** Thank god. That is the right answer. I had a lock auto-lock on a guest and that ruined my month. I do not want a remote unlock button on this thing. If a remote unlock button exists, eventually somebody's lock gets opened when it shouldn't have been, or the system pushes an unlock on a bug, and now somebody's house is open. I don't want that liability. I don't want it on me, I don't want it on Schlage. Leave the door alone.

## Section 5 — Usage intent and feature reactions

**Mike:** Imagine this works as described. How does your day change?

**Host J:** I stop checking the apps. That's the whole thing. Right now I run this little dread loop every check-in day and if this product gives me a clean push notification at the two-hour mark, I just don't do the loop anymore. I'd probably still keep the lockboxes because I'm paranoid, but the mental load drops a lot. Maybe I take on the third unit I've been sitting on.

**Mike:** Which part matters most? Pre-arrival check, code automation, cleaner rotation, something else?

**Host J:** Pre-arrival check, easily. The code automation is fine, OwnerRez already does most of it for me, the question is whether your system handles it more reliably than OwnerRez does, and I have no way to know that yet. Cleaner rotation, eh. The thing I am buying is the readiness check. That is the product to me.

**Mike:** What's missing that would stop you from using it?

**Host J:** The retry behavior I mentioned. If it just observes and doesn't act, I'd still be doing the manual code push when sync fails, which is the worst part of my day. The other thing is, what's the fallback if the readiness check itself can't run? If Schlage's cloud is down at the two-hour mark, do I get a message that says, hey, we couldn't check, treat this as a not-ready? Or do I get silence? Silence is the worst case. I'd want explicit "could not verify" rather than nothing.

**Mike:** If you were the PM shipping a v1, what would you cut?

**Host J:** I'd cut the cleaner code rotation, honestly. Get the pre-arrival check and the basic code lifecycle out the door first, prove those work, then add cleaner rotation later when you have the trust built up. Rotating codes is the kind of feature that, if it goes wrong, you've locked out the wrong person at the wrong time, and that is the exact incident I'm trying to never have again.

**Mike:** Van Westendorp, four quick prices. Too expensive to even consider?

**Host J:** Per lock or per property?

**Mike:** Per property, per month.

**Host J:** Forty bucks a month per property, I'm out. That's locksmith money over a year.

**Mike:** Expensive but you'd still think about it?

**Host J:** Twenty-five.

**Mike:** Great deal?

**Host J:** Twelve. At twelve a month per property I'd sign up for all three units without thinking about it much.

**Mike:** So cheap you'd question it?

**Host J:** Under five. If you told me three bucks I'd assume the thing doesn't actually do what you said it does.

**Mike:** Cleaner code rotation. Would you trust the system to revoke a cleaner's code automatically?

**Host J:** Honestly, no. Not at first. Not with my current cleaner. She's been with me for a year and a half. If the system revokes her code on a Tuesday because the window math was off, and she shows up Wednesday and can't get in, and I'm five hours away, that is exactly the failure mode I am most allergic to. I'd want to manually confirm for at least the first thirty days, maybe sixty. After that, if it's been clean, maybe.

**Mike:** If the system said ready and then a guest got locked out anyway, reaction?

**Host J:** Depends on the failure mode. If it was something the system could have caught and didn't, I'm done. Trust is gone, I uninstall, I tell the Reddit folks, that's it. If it's something genuinely unpredictable, like the guest pulled the batteries out, fine, I keep using it. But the bar is high. I've already had two of these incidents. A third one and I'm not going back to anything that calls itself smart.

**Mike:** First thirty days. How much do you trust before you've seen it run for a while?

**Host J:** I trust the readiness check immediately because it's just reporting, it's not making decisions. I trust the code creation pretty fast as long as the retry behavior is good. I do not trust the cleaner rotation, I do not trust anything that revokes a code, until I've seen it run cleanly for a month and a half at least. I'm going to keep my lockboxes the whole time regardless.

## Section 6 — Anti-goal stress test

**Mike:** Product won't auto-extend a guest code if you let them stay an extra night. Bother you?

**Host J:** No, that's right. If I'm giving someone an extra night I'm making a judgment call. I want to be the one to actively grant the extension. Auto-extension feels like the kind of feature where someone games it and now I've got a squatter problem.

**Mike:** Product won't message guests directly. If we built it, would you use it?

**Host J:** Yeah, actually. I would. OwnerRez does my templates and it's fine but it's clunky and it doesn't always know what's going on with the lock. If Schlage knew the lock was unready and could tell the guest, hey, your code might be delayed, here's the lockbox as a backup, that's gold. I want that. I know you said the relationship's mine, and that's fair, but I'd rather have one less thing breaking. I'd want it as an opt-in, not the default, but I'd opt in.

**Mike:** Interesting, that's the first place you've pushed back. Why this and not remote unlock?

**Host J:** Because messaging a guest about a code issue doesn't open my front door. The damage of a bad guest message is, what, a confused guest. The damage of a remote unlock gone wrong is somebody's stuff is missing. The risk asymmetry is completely different. I'm not anti-feature, I'm anti-feature-that-touches-the-physical-door-without-me.

**Mike:** Product won't show you who entered after a stay ended. Reaction?

**Host J:** That's fine. I don't want that data. I don't want to be the kind of host who knows that. If something is actually wrong post-stay, my cleaner tells me. I don't need a log. Honestly that feels like a privacy thing and I want no part of it.

## Section 7 — Wrap and comparison

**Mike:** When you picked your current lock setup, what alternatives did you consider?

**Host J:** I looked at August briefly, decided against it because it bolts onto an existing deadbolt and I didn't trust the form factor for turnover at scale. I looked at Yale, similar tier, ended up going Schlage because the OwnerRez integration was more mature at the time, at least according to the OwnerRez forum folks. I did not look at RemoteLock or Operto, those felt like enterprise hospitality stuff and I'm not at that scale.

**Mike:** Schlage rep walks into your kitchen tomorrow. The one objection that's hardest to answer?

**Host J:** Why should I trust this when your own hardware locked a guest out of their own rental at five in the morning. That is the objection. You're selling me software peace of mind on a hardware platform that I have personally watched fail in a way that hurt a guest. Convince me you're not going to layer software failure on top of hardware failure. That is the entire conversation. Everything else is nice to have.

**Mike:** Anything we didn't ask that you'd want us to know?

**Host J:** Yeah, two things. One, please ship the retry behavior. I cannot emphasize this enough. Observing the sync failure is half the product. Acting on it is the other half. Two, give me a clear "could not verify" state. If your system can't run the check for any reason, tell me that, don't go silent. Silence reads as ready, and ready when you're not ready is the worst possible state. That's it. Thanks for listening, this was more cathartic than I expected.

**Mike:** Appreciate the time.

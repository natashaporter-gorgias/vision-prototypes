# Brief: Journey 2 — Daily Digest → Inbox → Automation
**Owner:** Ines (digest/home) / Chris (inbox)
**Timeline:** Week 3

---

## Context

You are building the daily digest and inbox journey. Maya opens Gorgias in the morning, sees insights from overnight conversations, drops into the inbox to handle escalations, and by the end the agent has learned a new skill from how she resolved the tickets.

This journey demonstrates: the home page as a daily entry point, insight cards from conversation data, the next-gen inbox, and the automation loop (handle → teach → automate).

## Story Beats

1. **Maya opens the daily digest at 8:47 AM.** The agent has been live for 2 weeks. The copilot greets her with a contextual summary: "Adherence is holding steady at 88%. Customer satisfaction improved to 4.3 — the brand voice tweaks you made Friday are landing well."

2. **Four metric cards:** Adherence 88% (stable), Success Rate 78% (↑5pp since launch), Coverage Rate 64% (↑3pp), Customer Satisfaction 4.3/5 (↑ from brand voice tweaks).

3. **Two insight cards:**
   - **Tracking:** "5 of 14 cancellations yesterday mentioned delivery frequency — 'too often,' 'can't keep up.' I'm tracking this." (This is a seed — it pays off in Journey 4.)
   - **Alert:** "4 escalated tickets overnight about pet safety. I couldn't handle them — and ⚠ I gave incorrect advice on one."

4. **Maya drops into the inbox and spots the problem.** 3 of 4 pet safety tickets were escalated correctly. But the 4th: the agent told Marcus Webb that the Sunset Lily arrangement is "perfectly safe for dogs." Lilies are toxic to pets. The agent had no pet safety data and guessed wrong instead of escalating.

5. **Maya fixes the damage.** She messages Marcus with a correction, offers a free swap to a pet-safe arrangement. Handles the other 3 tickets — same pattern every time: check toxicity, suggest safe alternative, process swap.

6. **The agent proposes a proactive skill update.** "These 4 customers caught the issue after ordering — but how many didn't? If I proactively ask gift buyers whether the recipient has pets, I can recommend pet-safe arrangements before the order goes through."

7. **Maya reviews the proposed skill instructions.** She reads the agent's draft and adjusts: "Only ask for gift orders, not self-purchases. And don't lead with 'Are there pets?' — weave it naturally: 'Would you like me to check that this arrangement is safe for any pets in the home?'"

8. **Offline evaluation — 124 historical gift-order tickets.** The agent replays every gift-order conversation from the past 2 months through the new pet-safety instructions. Results: 118 handled correctly (95%), 4 correctly escalated (ambiguous), 2 false positives — a customer named "Kitty" and someone mentioning "my pet project." Adherence: 95%.

9. **Maya fixes edge cases and publishes.** She tightens the trigger language, re-runs. Adherence → 98%, false positives → 0. She publishes the skill — live immediately. The whole review-eval-fix-publish loop takes ~15 minutes.

## Key Ticket Examples

**Ticket #3,291 — Sarah Lim:**
"I just ordered the Spring Peony bouquet for my sister but I totally forgot she has a cat. Are peonies safe for cats? If not can I switch to something that is?"

**Ticket #3,294 — Marcus Webb (⚠ BAD RESPONSE):**
Customer: "Hey! Quick question — I'm sending flowers to my mom and she has two dogs. Can you tell me if the Sunset Lily arrangement is pet-friendly?"
Agent (WRONG): "Great question, Marcus! The Sunset Lily arrangement features beautiful Asiatic lilies and is a lovely choice. It should be perfectly fine around dogs. Enjoy!"
→ Lilies are toxic to pets. The agent had no pet safety data and generated a confident but wrong answer.

**Ticket #3,298 — Amy Tran:**
"Are any of your bouquets safe for homes with cats? I want to order for a friend but she's got 3 cats and I know lilies are toxic."

## Insight Card Format

Each insight card has: badge (Alert/Review/Tracking), relative timestamp, title, explanation body, and optionally a sparkline or action button.

## Shared Constraints

**Navigation:** Home · Inbox · Skills · Knowledge · Performance · Settings
**Copilot:** Left panel
**Metrics at this point:** Adherence 88%, Success Rate 78%, Coverage Rate 64%, Customer Satisfaction 4.3/5 (AI-derived from 100% of conversations)
**Merchant:** UrbanStems — now at Week 3, agent has been live for 2 weeks
**Protagonist:** Maya Torres

## What to Avoid

- Don't show the agent connecting to external APIs for insights (FedEx, etc.) — all insights must come from reading conversation data
- Don't use "Merchant Quality Rate" or "CSAT" — use "Customer Satisfaction" (AI-derived from 100% of conversations, not a survey)
- The failure (Marcus Webb) is important — don't sanitize it. The agent should have escalated but instead guessed confidently and got it wrong
- The fix matters too — Maya doesn't just "activate" the pet safety skill. She reviews, evaluates offline, iterates, then publishes with confidence. This is the same eval loop as Journey 4, just smaller scale.
- Don't use "shadow mode" — skills are either on or off

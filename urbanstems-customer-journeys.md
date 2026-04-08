# UrbanStems Customer Journeys — Gorgias AI Agent Vision

## Overview
**Merchant:** UrbanStems (premium flower & gifting brand)
**Protagonist:** Maya Torres, CX Operations Manager
**Timeline:** 7 weeks from setup to self-improving agent
**Presentation:** April 16, 2026 — Product Review with Max (CPO) and Romain (CEO)

The story follows Maya as she sets up and grows an AI agent for UrbanStems across 4 journeys. Each journey is owned by a different designer and built as a separate prototype, but they tell one cohesive story.

## Shared Navigation
Home · Inbox · Skills · Knowledge · Performance · Settings
- **Home** — Daily digest, morning briefing, insight cards
- **Inbox** — Next-gen inbox for escalated tickets and human handling
- **Skills** — What the agent does (contains Actions). Support + marketing skills
- **Knowledge** — What the agent knows (SOPs, policies, product data)
- **Performance** — Analytics + Experiments + Offline Eval
- **Settings** — Brand voice, escalation rules, channel config

Copilot lives on the left panel (creation mode, like Figma/Lovable — not assistant add-on).

## Metrics Framework

| Metric | Type | Definition |
|---|---|---|
| Adherence | Vision (new) | Is the agent following its skill instructions? Guardrail, not optimization target. |
| Success Rate | Gorgias (existing) | Billed tickets / covered tickets. Was the ticket fully automated? |
| Coverage Rate | Gorgias (existing) | Covered tickets / total tickets. What share is the agent handling? |
| Customer Satisfaction | Vision (new) | AI-derived from 100% of conversations (not a survey). Replaces manual QA and sample-based CSAT. |

## Journey 1: Onboarding (Week 1)
**Owner:** Mac / Lisa

Maya's first day with Gorgias. UrbanStems has just migrated from Zendesk. The agent has ingested 14 months of historical ticket data (58,000 tickets).

**Story beats:**
1. The agent greets Maya and leads with what it's learned from her Zendesk history — top intents, volume patterns, seasonal trends.
2. It proposes 6 skills mapped to her actual ticket data: Order Tracking (~1,100/mo), Delivery Issues (~680/mo), Gift Messaging (~340/mo), Subscription Management (~520/mo), Return & Refund (~410/mo), Product Recommendations (~290/mo).
3. Maya activates 3 skills (Order Tracking, Delivery Issues, Gift Messaging). She wants to see the agent handle simpler things before trusting it with cancellations.
4. Brand voice calibration: "Warm but not cutesy. We send flowers for funerals too." The agent generates 3 sample responses. Maya picks one and edits it.
5. Policy ingestion: Maya pastes the refund policy. The agent summarizes it back. Maya adjusts the damage-claim photo threshold from $75 to $60.
6. Go live: "I'll send you a digest tomorrow morning with how the first 24 hours went."

**Key design point:** Conversational onboarding, not a wizard. The agent leads with data, not questions.

## Journey 2: Daily Digest → Inbox → Automation (Week 3)
**Owner:** Ines (digest/home) / Chris (inbox)

Two weeks in. Maya opens the daily digest, sees insights, drops into the inbox for escalations, and by the end the agent has learned from how she handled tickets.

**Story beats:**
1. Maya opens the digest at 8:47 AM. Metrics: Adherence 88% (stable), Success Rate 78% (↑5pp), Coverage Rate 64% (↑3pp), Customer Satisfaction 4.3/5 (↑ from brand voice tweaks).
2. Insight card — Tracking: "5 of 14 cancellations yesterday mentioned delivery frequency — 'too often,' 'can't keep up.' I'm tracking this." (Seed for Journey 4.)
3. Insight card — Alert: "4 escalated tickets overnight about pet safety. I couldn't handle them — and I gave incorrect advice on one."
4. Maya drops into the inbox. The agent told Marcus Webb that the Sunset Lily arrangement is "perfectly safe for dogs." Lilies are toxic to pets. The agent had no pet safety data and guessed wrong.
5. Maya fixes the damage — messages Marcus with a correction, offers a free swap. Handles the other 3 pet safety tickets.
6. The agent proposes a proactive skill update: "If I ask gift buyers whether the recipient has pets, I can recommend pet-safe arrangements before the order goes through." Maya reviews and activates.

**Key design point:** The failure is critical. The agent should have escalated but instead guessed confidently. This makes the improvement loop feel real.

## Journey 3: Mother's Day Campaign (Week 5)
**Owner:** Lisa

Mother's Day peak. Marketing as skills, not campaigns. One agent, multiple skills across one shopper's journey.

**Story beats:**
1. The agent proposes a Mother's Day skill bundle: Gift Deadline Alerts (outbound), Upsell Add-Ons (in-conversation), Post-Delivery Follow-Up (outbound).
2. Elena Vargas's journey: browse-abandon → gift deadline alert → purchase with upsell → post-delivery follow-up. One agent choosing the right skill at each moment.
3. Maya customizes: "Say 'order by Wednesday May 6' — not just 'order soon.'" Agent updates with specific dates per shipping zone.
4. Skill transition mid-conversation: A customer writes about a late delivery (Delivery Issues), then asks to switch BloomPlan frequency (Subscription Management). The agent pivots seamlessly.
5. Results: Gift Deadline Alerts converted 14% of browse-abandoners. Upsells added $12 avg to order value. Follow-ups generated 23 reviews at 4.6 avg.

**Key design point:** How does "marketing as a skill" differ from a Klaviyo campaign? This is an open design question. The team should explore outbound mechanics (email, SMS, chat).

## Journey 4: Evaluation at Scale (Week 7)
**Owner:** Natasha

The competitive moat. The frequency cancellation seed from Week 3 has matured. The agent has read 89 cancellation conversations and found a pattern. Three stages: insight → offline evaluation → A/B test.

**Story beats:**

### Part 1: The Insight
1. Post Mother's Day. The agent surfaces the frequency pattern: 35% of cancellations (31 of 89) contained frequency language — "too many/too often," "can't keep up," "every week/biweekly is too much."
2. These customers aren't product-dissatisfied — they're cadence-dissatisfied. Current skill confirms and cancels. Proposed: offer frequency adjustment first.
3. Example: Lena Morrison says "I love the flowers honestly but every two weeks is just too much for me." Current response: immediate cancellation. Proposed: offer every 3 weeks or monthly.

### Part 2: Offline Evaluation
4. The agent proposes testing before going live: "I can test it against historical tickets."
5. 847 historical tickets evaluated. Adherence: 94%. 312 correctly identified as frequency-related. 486 correctly identified as non-frequency. 49 edge cases (6%).
6. Maya reviews the 3 riskiest edge cases (budget confusion, already-attempted, marketing emails).
7. Maya adjusts instructions, agent re-runs. Adherence → 97%, edge cases 49 → 12, false detections 23 → 4.

### Part 3: A/B Test
8. Custom scorers added: "Tone — helpful suggestion, not a save gate" and "Accuracy — only flag real frequency complaints."
9. A/B test launched: 50/50 split, 3 weeks. Variant A = frequency-aware, Variant B = current.
10. Results: Variant A wins. Adherence 96%, Success Rate 93%, Coverage Rate 97%, Customer Satisfaction 4.5/5. Subscriptions saved: 8 of 27 (30%). Revenue retained: $416/mo. Custom scorer — Tone: 94% pass. Accuracy: 91% pass.
11. Agent self-critique: 3 misclassifications. Worst: "too many wilted flowers" = quality complaint, not frequency. Proposes follow-up experiment.

**Key design point:** The full loop (insight → offline eval → A/B test → self-critique → next experiment) is continuous and self-improving.

## The Connected Thread
The frequency cancellation pattern is planted in Journey 2's digest as a "Tracking" insight card, and pays off as the full evaluation arc in Journey 4. This thread connects the whole story.

## What to Avoid (All Journeys)
- No "shadow mode" or review-before-sending features
- No traditional form-based setup wizard
- No agent persona names — it's just "the agent"
- Don't use "Merchant Quality Rate" or "CSAT" — use "Customer Satisfaction" (AI-derived)
- Don't use "save rate" as a metric — show outcomes ("subscriptions saved: 8 of 27")
- Adherence is a guardrail in experiments, not the optimization target
- All insights come from reading conversation data, not external APIs

## Team Assignments
| Journey | Owner | Brief |
|---|---|---|
| 1. Onboarding | Mac / Lisa | brief-onboarding.md |
| 2. Digest → Inbox | Ines / Chris | brief-digest-inbox.md |
| 3. Mother's Day | Lisa | brief-mothers-day.md |
| 4. Evaluation | Natasha | brief-evaluation.md |

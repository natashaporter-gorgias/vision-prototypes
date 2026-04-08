# Brief: Journey 1 — Onboarding
**Owner:** Mac / Lisa
**Timeline:** Week 1

---

## Context

You are building the onboarding journey for the Gorgias AI Agent vision prototype. The merchant is UrbanStems (premium flower & gifting brand). The protagonist is Maya Torres, CX Operations Manager — she's setting up the AI agent for the first time.

This journey demonstrates: conversational onboarding (not a wizard), the one-agent-multiple-skills framework, brand voice calibration, and selective skill activation.

## Story Beats

1. **The agent greets Maya — and already knows her business.** UrbanStems just migrated from Zendesk. The agent has ingested 14 months of historical ticket data (58,000 tickets). Instead of asking Maya to describe her business, it leads with what it's learned: "I've analyzed 58,000 tickets from your Zendesk history. Here's what your customers write about most."

2. **The agent proposes 6 skills based on real ticket data.** Mapped directly to UrbanStems' actual conversation patterns, not generic templates: Order Tracking (~1,100/mo), Delivery Issues (~680/mo), Gift Messaging (~340/mo), Subscription Management (~520/mo), Return & Refund (~410/mo), Product Recommendations (~290/mo). Each shows a description and estimated coverage derived from the Zendesk history.

3. **Maya activates 3 skills** (Order Tracking, Delivery Issues, Gift Messaging) and leaves the rest off. She wants to see the agent handle simpler things before trusting it with cancellations.

4. **Brand voice calibration.** Maya describes the tone: "Warm but not cutesy. We send flowers for funerals too, not just birthdays. Empathetic, concise, never robotic." The agent generates 3 sample responses to a delivery delay. Maya picks Option A and edits "make it right" to "get a fresh bouquet to you."

5. **Policy ingestion.** Maya pastes the refund policy. The agent summarizes it back in plain language. Maya adjusts the damage-claim photo threshold from $75 to $60.

6. **Go live.** "I'll send you a digest tomorrow morning with how the first 24 hours went."

## Key Conversation Example

```
Agent: Welcome to Gorgias, Maya. I've imported 14 months of ticket data from your 
Zendesk account — about 58,000 conversations. Here's what I found: your top intents 
are order tracking (26%), delivery issues (16%), subscription changes (12%), and 
gift messaging (8%). I've connected to your Shopify store too, so I can see your 
product catalog and order data. Based on all of this, here are 6 skills I'd 
recommend activating.

Maya: That's really helpful. But go easy on the subscription stuff — we've had bad 
experiences with bots handling cancellations.

Agent: Understood. I'll leave Subscription Management off for now — you can turn it 
on anytime once you're comfortable. Here are the 3 I'd start with...
```

## Brand Voice Options (delivery delay)

- **Option A (Maya picks):** "I'm sorry your bouquet hasn't arrived yet, Jamie. I've checked with our delivery partner and it's currently out for delivery — you should have it by end of day. If it doesn't show up, just let me know and I'll get a fresh bouquet to you."
- **Option B:** "Hi Jamie! 🌸 Your flowers are on their way and should be at your door today! Let me know if they don't arrive and we'll sort it out right away!"
- **Option C:** "Jamie, I see your order is currently in transit and expected today. If it doesn't arrive by tonight, I can arrange a replacement or full refund — whichever you'd prefer."

## Shared Constraints

**Navigation:** Home · Inbox · Skills · Knowledge · Performance · Settings
**Copilot:** Left panel (creation mode, not assistant add-on)
**Font:** Inter or system sans-serif
**Merchant:** UrbanStems — ~4,200 tickets/mo, 61% automated at start, AOV $68, BloomPlan $52/delivery biweekly
**Protagonist:** Maya Torres, CX Operations Manager

## What to Avoid

- Don't use "shadow mode" or any review-before-sending feature — it doesn't exist
- Don't show a traditional form-based setup wizard
- Don't give the agent a persona name — it's just "the agent"
- Don't show metrics from later in the timeline (automation rate starts at 61%)

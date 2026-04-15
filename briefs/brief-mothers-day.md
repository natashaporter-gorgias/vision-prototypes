# Brief: Journey 3 — Mother's Day Campaign
**Owner:** Lisa
**Timeline:** Week 5
**Personas:** Maya (operational) + Daniel Reyes (enters here)

---

## Context

You are building the Mother's Day marketing journey. This is the **transition journey** — where the product crosses from support tool into commerce platform, and a second persona enters.

**Maya Torres** (CX Operations Manager) is still involved — she sets up and customizes the marketing skills. But **Daniel Reyes** (GM of E-Commerce) starts paying attention here. He oversees the full customer lifecycle (acquisition → conversion → support → retention) and sees something new: one agent managing the entire shopper journey, not separate support and marketing tools.

This demonstrates: the one-agent-multiple-skills concept, marketing as skills (not campaigns), and the ICP shift from CX manager to GM of ecommerce.

**Open question:** How does "marketing as a skill" actually differ from a Klaviyo campaign? What triggers outbound messages? What channel (email, SMS, chat)? The team hasn't resolved the flows-vs-campaigns tension yet. This journey is the space to explore it. You have the most context on this — the beats below are starting points, not prescriptions.

## Story Beats

1. **The agent proposes a Mother's Day skill bundle.** Three temporary skills: Gift Deadline Alerts (outbound — warn browsers about order-by dates), Upsell Add-Ons (in-conversation — suggest pairings during support/order chats), Post-Delivery Follow-Up (outbound — satisfaction check + review prompt 2 days after delivery). Maya sets them up. Daniel sees the proposal and realizes the agent isn't just handling tickets — it's driving revenue.

2. **Daniel sees the unified shopper lifecycle.** Elena Vargas goes from browse-abandon → gift deadline alert → purchase with upsell → post-delivery follow-up. Daniel's reaction: this isn't 4 campaigns or 4 tools. It's one agent choosing the right skill at each moment across the full funnel. This is a commerce platform, not a support tool.

3. **Maya customizes:** "Say 'order by Wednesday May 6' — not just 'order soon.'" The agent updates instructions with specific dates per shipping zone. (Maya still owns the operational setup.)

4. **Skill transition within a single conversation.** A customer writes about a late delivery (Delivery Issues skill). Mid-conversation: "actually, while you're helping me — can I change my BloomPlan to monthly instead of biweekly?" The agent pivots to Subscription Management seamlessly. This shows the architecture — one agent reading context and switching skills.

5. **Results — framed for Daniel.** Gift Deadline Alerts converted 14% of browse-abandoners. Upsells added $12 avg to order value. Follow-ups generated 23 reviews at 4.6 avg. Support interactions generating revenue, marketing reducing support load — unified context across the customer lifecycle.

## Elena Vargas — Shopper Journey

| When | What | Skill |
|---|---|---|
| Mon, May 4 | Browses "Best Sellers," adds Jardin bouquet to cart, doesn't checkout | — |
| Mon, May 4 | Receives: "To guarantee Mother's Day delivery to Chicago, order by Wednesday May 6." | Gift Deadline Alert |
| Tue, May 5 | Replies to add a note. Agent suggests artisan chocolate box ($18) as add-on. | Upsell Add-Ons |
| Sun, May 10 | Delivery confirmed 11:23 AM | — |
| Tue, May 12 | "Hope your mom loved the Jardin bouquet! Quick review?" + Father's Day mention | Post-Delivery Follow-Up |

## Skill Transition Example

```
Customer: Hey, my order #4521 was supposed to arrive yesterday and it still 
hasn't shown up. Can you check?

Agent [Delivery Issues]: I see your order is currently in transit — it looks 
like there's been a slight delay. Based on the latest tracking, it should 
arrive by end of day today. I'm sorry for the wait.

Customer: Ok thanks. Actually while I have you — can I also switch my 
BloomPlan from every 2 weeks to monthly? It's just too frequent for me.

Agent [Subscription Management]: Of course! I've updated your BloomPlan to 
monthly delivery. Your next bouquet will arrive on June 8 instead of May 25. 
Everything else stays the same. Is there anything else I can help with?
```

## Shared Constraints

**Navigation:** Home · Inbox · Skills · Knowledge · Performance · Settings
**Copilot:** Left panel
**Metrics at this point:** Automation ~71% during peak, 3.5× normal ticket volume
**Merchant:** UrbanStems — Mother's Day is their #1 peak
**Key characters:** Elena Vargas (shopper), Daniel Reyes (GM of E-Commerce — enters this journey)

## What to Explore

- How does outbound work mechanically? Is the agent sending emails? SMS? Chat pop-ups?
- When the agent "proposes" marketing skills — is this from the copilot on the left, or a notification, or something else?
- How does this differ from setting up a Klaviyo flow? What makes it "one agent" vs. "multiple automations"?
- Could Skills contain both support skills and marketing skills in the same list, or do they need to be separated?

## The ICP Shift

This journey is where Daniel enters. He should feel like a real character — not just "the exec who approves things." He's looking at the agent's capabilities and asking: "Can this be the platform for our entire customer lifecycle?" He doesn't need to speak in the prototype, but his perspective should be felt — maybe through the metrics he'd care about (conversion, AOV lift, LTV) alongside Maya's operational metrics (coverage, adherence).

## What to Avoid

- Don't present marketing skills as traditional campaigns with send dates and audience segments
- Don't ignore the skill transition moment — it's what makes the architecture real
- Don't use "Merchant Quality Rate" or "CSAT" — use "Customer Satisfaction" (AI-derived from 100% of conversations)
- Don't make Daniel feel like a bolt-on — he should be a natural part of the story, not an afterthought

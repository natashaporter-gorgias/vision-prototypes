# Gorgias AI Agent Vision — Shared Context

Paste this into Claude before your journey-specific brief. It gives Claude the full picture so it understands how your piece fits into the bigger story.

---

## What we're building

A vision prototype for the Gorgias AI Agent — showing what the product could look like when automation rate hits 80%+. This is for a product review presentation on April 16, 2026 to Max (CPO) and Romain (CEO).

Five designers are each building a separate prototype (in Claude, Lovable, or code), but they tell one cohesive story. Same merchant, same protagonist, same navigation, same metrics, same design language.

## The story

Maya Torres is a CX Operations Manager at UrbanStems, a premium flower and gifting brand (~4,200 tickets/mo, AOV $68). She's migrating from Zendesk to Gorgias. We follow her over 7 weeks — from first-day setup to a self-improving AI agent.

The arc: **trust builds gradually.** Maya starts cautious (only activating 3 of 6 skills), encounters a real failure (the agent gives wrong pet safety advice), sees the agent learn from her corrections, watches it handle a Mother's Day peak, and ultimately sees it discover patterns in conversations and propose its own improvements.

## The 4 journeys

| # | Journey | Week | Owner | What happens |
|---|---|---|---|---|
| 1 | Onboarding | 1 | Mac / Lisa | Maya sets up Gorgias. The agent ingests 58,000 Zendesk tickets, proposes 6 skills, Maya activates 3. Brand voice calibration. |
| 2 | Daily Digest → Inbox → Automation | 3 | Ines / Chris | Maya opens the morning digest, sees metrics + insight cards. Drops into inbox — discovers the agent gave wrong advice about lilies being safe for dogs (they're toxic). Fixes the damage. Agent proposes proactive pet safety skill. |
| 3 | Mother's Day Campaign | 5 | Lisa | Peak season. Marketing as skills (not campaigns). Elena Vargas shopper journey from browse-abandon to review. Skill transitions mid-conversation. |
| 4 | Evaluation at Scale | 7 | Natasha | The agent finds that 35% of cancellations are about frequency, not dissatisfaction. Tests a fix against 847 historical tickets (offline eval). Runs an A/B test. Self-critiques its 3 worst misclassifications. |

## The connected thread

In Journey 2, the digest shows an insight card: "5 of 14 cancellations yesterday mentioned delivery frequency — 'too often,' 'can't keep up.' I'm tracking this."

This seed pays off in Journey 4, where the agent has now read 89 cancellation conversations and surfaces the full pattern — proposing a frequency-aware skill that offers schedule changes instead of immediate cancellation.

**If you're building Journey 2:** Make sure the frequency tracking insight card is visible in the digest. It doesn't need to be the focus — it's a background observation.

**If you're building Journey 4:** Reference that the agent has been tracking this since Week 3. The insight didn't come from nowhere.

## Navigation (all journeys must use this)

Home · Inbox · Skills · Knowledge · Performance · Settings

- **Home** — Daily digest, morning briefing, insight cards, metrics overview
- **Inbox** — Next-gen inbox for escalated tickets and human handling
- **Skills** — What the agent does. Contains skill instructions and Actions (the things skills can execute). Support + marketing skills live here together.
- **Knowledge** — What the agent knows. SOPs, policies, product data.
- **Performance** — Analytics + Experiments + Offline Eval
- **Settings** — Brand voice, escalation rules, channel configuration

**Copilot** lives on the left panel. It's a creation/pilot mode (like Figma or Lovable) — not a right-panel assistant add-on. The copilot is how Maya talks to the agent about configuration, reviews proposals, and gets contextual summaries.

**Home page** is a single centered layout (no copilot split). All other sections use the copilot (left) + content (right) layout.

## Metrics (use these exact definitions)

| Metric | Type | Definition |
|---|---|---|
| Adherence | Vision (new) | Is the agent following its skill instructions? A guardrail — not the thing you optimize for. |
| Success Rate | Gorgias (existing) | Billed tickets / covered tickets. Was the ticket fully automated? |
| Coverage Rate | Gorgias (existing) | Covered tickets / total tickets. What share is the agent handling? |
| Customer Satisfaction | Vision (new) | AI-derived from 100% of conversations. Not a survey. Replaces manual QA (doesn't scale at 80% automation) and sample-based CSAT (limited coverage). |

**Adherence in experiments:** It's the guardrail ("is the variant executing as designed?"), not the optimization target. You optimize for Success Rate, Coverage Rate, and Customer Satisfaction. Adherence should be high in both variants.

## Recurring characters

- **Maya Torres** — CX Operations Manager at UrbanStems. The protagonist across all journeys.
- **Marcus Webb** — Customer whose dog was put at risk by wrong lily advice (Journey 2)
- **Elena Vargas** — Shopper whose Mother's Day gift journey spans browse-abandon to review (Journey 3)
- **Lena Morrison** — Subscriber who cancels because of frequency, not dissatisfaction (Journey 4)

## UrbanStems data points

- ~4,200 tickets/month
- AOV $68
- BloomPlan subscription: $52/delivery, biweekly default
- Mother's Day = #1 peak (3.5× normal volume)
- Migrated from Zendesk with 14 months / 58,000 tickets of history
- Top intents: Order Tracking (26%), Delivery Issues (16%), Subscription Changes (12%), Gift Messaging (8%)

## Design language

- **Font:** Inter (or system sans-serif)
- **Primary purple:** #7E55F6
- **Light purple background:** #f1ecff
- **Dark text:** #1e242e
- **Secondary text:** #5c6370
- **Green (positive):** #147656
- **Background:** #fafafa
- **Card background:** #fff with border 1px solid rgba(0,0,0,0.08), border-radius 12-16px
- **Card shadow:** 0px 2px 20px rgba(0,0,0,0.04)
- **Transitions:** 150ms cubic-bezier(0.9, 0, 0, 1)
- **Nav:** 48px wide vertical icon bar on left edge

A navigation prototype with all 6 sections is available as a starting point: `navigation-prototype.html`

## What to avoid (all journeys)

- **No "shadow mode"** or review-before-sending. Skills are either on or off.
- **No form-based setup wizards.** Onboarding is conversational.
- **No agent persona names.** It's just "the agent."
- **No "Merchant Quality Rate" or "CSAT."** Use "Customer Satisfaction" (AI-derived).
- **No "save rate" as a metric.** Show outcomes: "subscriptions saved: 8 of 27."
- **No external API insights.** The agent learns from reading conversations, not from FedEx APIs.
- **No overly optimistic numbers.** 30% save rate is realistic. 60% is not.

## How to use this

1. Paste this CONTEXT.md into Claude first
2. Then paste your journey-specific brief (e.g., brief-digest-inbox.md)
3. Ask Claude to build the prototype

This gives Claude enough context to make smart decisions about your section — referencing the right characters, using the correct metrics, and understanding where your journey fits in the arc.

# Gorgias AI Agent Vision — Shared Context

Paste this into Claude before your journey-specific brief. It gives Claude the full picture so it understands how your piece fits into the bigger story.

---

## What we're building

A vision prototype for the Gorgias AI Agent — showing what the product could look like when automation rate hits 80%+. This is for a product review presentation on April 16, 2026 to Max (CPO) and Romain (CEO).

Five designers are each building a separate prototype (in Claude, Lovable, or code), but they tell one cohesive story. Same merchant, same protagonist, same navigation, same metrics, same design language.

## The story — Two Personas, One Agent

The story follows two protagonists at UrbanStems, a premium flower and gifting brand (~4,200 tickets/mo, AOV $68). As the agent matures, the ICP shifts from CX manager to GM of ecommerce.

**Maya Torres, CX Operations Manager** — protagonist for Journeys 1-2. Former senior support agent, manages 3 human agents. She sets up the agent, handles escalations, builds new skills. Cares about: agent accuracy, escalation quality, team workload, automation rate.

**Daniel Reyes, GM of E-Commerce** — enters in Journey 3, protagonist for Journey 4. Oversees the full customer lifecycle (acquisition, conversion, support, retention). Reports to CEO. He starts paying attention when the agent crosses from support into revenue. Cares about: conversion rate, customer LTV, churn, unified shopping experience.

**The thesis:** Support and marketing are both "skills" the agent uses at the right moment. Maya sees the operational side. Daniel sees the unified picture — and that's the ultimate ICP.

The arc: **trust builds, then the lens widens.** Maya starts cautious (only activating 3 of 6 skills), encounters a real failure (wrong pet safety advice), runs an offline eval to validate the fix, watches the agent handle a Mother's Day peak. Then Daniel enters — he sees support and marketing merging, and by Journey 4 he's evaluating the agent as a commerce platform that finds business problems spanning teams and validates its own solutions.

## The 4 journeys

| # | Journey | Week | Persona | Owner | What happens |
|---|---|---|---|---|---|
| 1 | Onboarding | 1 | Maya | Mac / Lisa | Maya sets up Gorgias. The agent ingests 58,000 Zendesk tickets, proposes 6 skills, Maya activates 3. Brand voice calibration. |
| 2 | Daily Digest → Inbox → Automation | 3 | Maya | Ines / Chris | Maya opens the morning digest, sees metrics + insight cards. Drops into inbox — discovers wrong lily advice. Fixes the damage. Agent proposes pet safety skill → Maya reviews, runs offline eval on 124 tickets, fixes edge cases, publishes. |
| 3 | Mother's Day Campaign | 5 | Maya + Daniel | Lisa | The transition journey. Marketing as skills. Daniel enters — sees support and marketing unifying. Elena Vargas shopper journey. Skill transitions mid-conversation. |
| 4 | E2E Performance | 7 | Daniel | Natasha | Daniel evaluates the agent as a commerce platform. Frequency cancellation insight spans support + retention. Offline eval → A/B test → self-critique. Business outcomes: LTV, churn, revenue retention. |

## The connected thread

In Journey 2, the digest shows an insight card: "5 of 14 cancellations yesterday mentioned delivery frequency — 'too often,' 'can't keep up.' I'm tracking this."

This seed pays off in Journey 4, where the agent has now read 89 cancellation conversations and surfaces the full pattern — proposing a frequency-aware skill that offers schedule changes instead of immediate cancellation.

**If you're building Journey 2:** Make sure the frequency tracking insight card is visible in the digest. It doesn't need to be the focus — it's a background observation. Also: the pet safety fix now includes an offline eval (124 tickets, edge case review, publish). This is the same eval loop that appears at scale in Journey 4.

**If you're building Journey 3:** Daniel Reyes enters here. He sees marketing skills merging with support and realizes the agent is a commerce platform. Maya is still running ops. Both personas appear.

**If you're building Journey 4:** This is Daniel's journey. He's evaluating e2e shopping performance, not just support metrics. Reference that the agent has been tracking the frequency pattern since Week 3. Frame outcomes as business metrics (LTV, churn, revenue retention).

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

- **Maya Torres** — CX Operations Manager at UrbanStems. Protagonist for Journeys 1-2; supporting role in 3-4.
- **Daniel Reyes** — GM of E-Commerce at UrbanStems. Enters in Journey 3; protagonist for Journey 4. Oversees full customer lifecycle.
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

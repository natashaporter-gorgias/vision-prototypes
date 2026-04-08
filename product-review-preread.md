# AI Agent Vision — Product Review Pre-Read

**Date:** April 16, 2026
**Team:** Natasha, Lisa, Chris, Ines, Mac
**Audience:** Max (CPO), Romain (CEO)

---

## What we're presenting

A connected vision prototype showing what Gorgias looks like at 80% automation maturity — grounded in one real merchant (UrbanStems), one protagonist (Maya Torres, CX ops manager), across four journeys.

## Why this matters now

Every competitor ships an AI agent that handles tickets. That's table stakes. What separates Gorgias is **how the agent gets better over time** — learning from conversations, proposing its own improvements, testing them at scale before going live. The first three journeys show what the agent *does*. The fourth shows how it *improves itself*. That's the moat.

## The narrative arc

We follow Maya Torres through 7 weeks at UrbanStems — from setting up the AI agent for the first time through a Mother's Day peak and into post-peak evaluation.

**Journey 1: Onboarding (Week 1)** — Mac / Lisa
Maya sets up the agent conversationally. She activates skills she trusts, leaves high-stakes ones off for now, calibrates the brand voice. The product onboards through dialogue, not wizards.

**Journey 2: Daily Digest → Inbox → Automation (Week 3)** — Ines / Chris
Maya's morning routine. The digest surfaces insights from conversations. She drops into the inbox, handles what the agent can't (including catching a bad response where the agent gave incorrect pet safety advice), and by the end, the agent has learned a new skill from how she resolved the pattern. This journey shows the digest → inbox → automation loop.

**Journey 3: Mother's Day Campaign (Week 5)** — Lisa
The agent proposes marketing skills for peak season — not campaigns, but coordinated behaviors that activate at different points in a shopper's journey. One agent, multiple skills, in action. *Note: the flows-vs-campaigns question is still open. This journey explores the concept.*

**Journey 4: Evaluation at Scale (Week 7)** — Natasha
**This is the climax.** The agent reviewed 89 cancellation conversations and found that 35% contain frequency language — customers unhappy with cadence, not the product. It proposes a skill change, tests it offline against 847 historical tickets, surfaces edge cases for Maya to review, then runs a live A/B test. The agent self-critiques its own results and proposes a follow-up. The full pipeline: insight → offline eval → experiment → self-improvement.

## Key metrics used throughout

| Metric | Definition | Role |
|---|---|---|
| Adherence | Is the agent following its skill instructions? | Primary (vision metric) |
| Success Rate | Was the ticket fully automated? (billed / covered) | Primary (existing Gorgias metric) |
| Coverage Rate | What share of tickets is the agent handling? (covered / total) | Primary (existing Gorgias metric) |
| Customer Satisfaction | AI-derived from 100% of conversations — no survey needed | Quality (vision metric) |

## Open questions we're still exploring

1. **Marketing as a skill vs. campaigns** — How does this differ from Klaviyo? What triggers outbound? Lisa is exploring this.
2. **Customer Satisfaction metric** — We're showing AI-derived satisfaction from 100% of conversations (no survey). Competitors (Intercom's CX Score, Kustomer's AI Signals) are moving in this direction. What's the right implementation for Gorgias?
3. **Navigation model** — We're proposing: Home · Inbox · Skills · Knowledge · Performance · Settings. Is this the right information architecture for an AI-first platform?

## What we're asking for

Feedback on the narrative, the priority of capabilities, and whether the evaluation pipeline is the right moat to invest in.

# Performance > Analytics — Page Spec for Journey 2
**For:** Ines
**Context:** Maya navigates to this page while listening to the daily digest audio. The digest gives her the headlines; this page gives her the full picture behind them.

---

## Design Intent

The digest is ambient — Maya hears "success rate is up 5 points" while looking at the trend line that shows *how* it climbed. The analytics page should feel like the detailed view behind a summary she's already absorbing. Nothing on this page should surprise her if she's been listening — it should deepen what she's hearing.

This also demonstrates a product concept: the daily digest isn't a modal or a page — it's a companion. You can keep working while it plays.

---

## Top: Core Metrics with Trend Lines

The 4 standard metrics, each as a card with a sparkline/trend covering the 2 weeks since launch. Not just today's number — the shape of the curve matters.

| Metric | Value (Week 3) | Trend | What it tells Maya |
|---|---|---|---|
| Adherence | 88% | Stable (flat line) | The agent is following instructions consistently — no drift |
| Success Rate | 78% | ↑ 5pp since launch | Fully automated tickets improving. Was it gradual or a step-change after her Friday brand voice tweaks? The curve answers that |
| Coverage Rate | 64% | ↑ 3pp since launch | Slowly expanding as the agent handles more edge cases within the 3 active skills |
| Customer Satisfaction | 4.3/5 | ↑ 0.2 vs last week | AI-derived from 100% of conversations. The bump correlates with brand voice changes — the trend line should show the inflection point |

**Design note:** These should feel like the same metric cards from the digest, but expanded — bigger trend lines, maybe a time range selector (7d / 14d / 30d). The digest summarizes them in a sentence; here Maya can inspect the shape.

---

## Middle: Per-Skill Breakdown

This is the most valuable thing the digest *doesn't* give her. A table or card grid showing each skill's individual performance.

### Active Skills

| Skill | Volume (last 7d) | Success Rate | Satisfaction | Notes |
|---|---|---|---|---|
| Order Tracking | ~275 | 92% | 4.5/5 | High-performing — simple, well-defined tickets |
| Delivery Issues | ~170 | 61% | 3.9/5 | Harder tickets, more edge cases. Biggest opportunity for improvement |
| Gift Messaging | ~85 | 84% | 4.4/5 | Working well, lower volume |

### Inactive Skills (greyed out / muted)

| Skill | Est. Volume | Status | Why it matters |
|---|---|---|---|
| Subscription Mgmt | ~130/wk | Off | Maya turned this off at setup — doesn't trust the agent with cancellations yet |
| Return & Refund | ~103/wk | Off | High-stakes, needs policy precision |
| Product Recs | ~73/wk | Off | Lower priority |

**Design note:** The inactive skills should be visible but clearly muted — they represent the coverage gap. Showing their estimated volume is a subtle nudge: "this is what you're leaving on the table." Don't make it pushy — Maya knows why she turned them off.

---

## Middle: Escalation Reasons

Why is the agent handing tickets to humans? A breakdown that connects directly to what Maya's about to find in the inbox.

| Reason | Count (last 7d) | Example |
|---|---|---|
| No skill coverage | 12 | Pet safety questions (the ones she's about to discover) |
| Low confidence | 8 | Ambiguous customer intent — agent wasn't sure which skill applied |
| Customer requested human | 5 | "Can I speak to a person?" |
| Policy edge case | 3 | Refund amount exceeded threshold Maya set |

**Design note:** This is the bridge between Analytics and Inbox. Maya hears "4 escalations overnight about pet safety" in the digest, sees "No skill coverage: 12 this week" on the analytics page, then clicks into Inbox to handle them. The data flows naturally across pages.

---

## Bottom: Volume & Efficiency

### Tickets per day
A bar or area chart showing daily ticket volume, split by:
- **Automated** (green/filled) — agent handled end-to-end
- **Escalated** (outlined/muted) — handed to human

The ratio should be visibly improving over the 2 weeks. This is the "automation rate" story told as a chart instead of a number.

### Conversation efficiency
- **Avg. turns per resolution:** ~2.8 (are conversations getting shorter/more efficient?)
- **Avg. first response time:** <5 sec (agent speed vs. human team's ~4 min)
- **Avg. resolution time:** ~1.2 min (automated) vs. ~18 min (human-handled)

**Design note:** Keep this section lighter — it's supporting data, not the headline. Maya glances at it; she doesn't study it.

---

## What to Skip

- **No individual ticket logs** — that's the Inbox
- **No revenue/conversion/LTV metrics** — those are Daniel's lens (Journey 4). At Week 3, Maya is purely operational
- **No experiment data** — no experiments are running yet. The Experiments tab in Performance should exist but feel empty/dormant ("No experiments yet")
- **No real-time feed** — the analytics page is a snapshot with trends, not a live dashboard

---

## How It Connects to the Digest

The digest audio might say something like:

> "Good morning, Maya. Overnight, the agent handled 47 tickets — 34 fully automated, 13 escalated. Success rate is up to 78%, a 5-point jump since launch. Customer satisfaction climbed to 4.3 — the brand voice changes you made Friday are landing well. Two things need your attention: I'm tracking a pattern in cancellation conversations about delivery frequency, and 4 customers asked about pet safety overnight — I couldn't handle those and gave incorrect advice on one. I'd recommend checking your inbox."

While hearing this, Maya navigates to Analytics and sees the trend lines, the per-skill breakdown, the escalation reasons — the data behind the summary. Then she clicks to Inbox to handle the pet safety tickets.

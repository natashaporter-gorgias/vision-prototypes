# Prototype v8 — Experimentation Flow
## Beat-by-beat specification

**Brand:** UrbanStems (premium flower/gifting e-commerce)
**Merchant persona:** Jane, Ecommerce Director
**Starting point:** Daily Digest HTML (uploaded file) as UI foundation
**UI pattern:** Left panel = conversation, Right panel = live config/results (reusing v7 pattern)

---

## Overview

Two experiments proposed by the AI Agent, grounded in conversation data:

**Experiment A (Support):** Damaged order recovery — replacement-first vs. refund-first
**Experiment B (Marketing):** Post-delivery flower care as a conversion path to subscription

The prototype walks through: Hub → Setup A → Setup B → Time skip → Slack notification → Results

---

## Screen 1: Experiments Hub

**What it is:** A dedicated page (nav item: "Experiments" in sidebar). The AI Agent has analyzed conversation data and is proposing two experiments.

**Layout:** Single-column content area within the main card (same layout as Daily Digest, no left/right split yet).

**Content:**

### Header
- "Experiments" as page title
- Subheader: "AI Agent has analyzed your recent conversations and identified 2 opportunities to test."

### Experiment Card A — Support
- **Status badge:** "Proposed" (purple/neutral)
- **Title:** "Damaged order recovery strategy"
- **Insight preview:** "52 of 340 damaged order conversations involved customers who still needed flowers. 34 placed a new order at full price after receiving a refund — you're making them buy twice."
- **Metric at a glance:** "$4,200 estimated monthly revenue at stake"
- **CTA button:** "Review experiment →"

### Experiment Card B — Marketing
- **Status badge:** "Proposed" (purple/neutral)
- **Title:** "Post-delivery care → subscription conversion"
- **Insight preview:** "28% of one-time buyers asked about flower care within 48 hours of delivery. Customers who had a positive post-delivery interaction were 2.4x more likely to reorder — but you're not proactively reaching out."
- **Metric at a glance:** "847 one-time buyers with no post-delivery engagement in the last 90 days"
- **CTA button:** "Review experiment →"

**Interaction:** Clicking "Review experiment" on Card A transitions to Screen 2.

---

## Screen 2: Experiment A Setup — Damaged Order Recovery

**Layout:** Splits into left panel (conversation) + right panel (experiment config). Reuses v7 two-panel pattern.

**Right panel:** Starts mostly empty, builds up as the conversation progresses.

### Beat 2.1 — Agent presents the data insight

**Left panel (AI message):**
> I analyzed 340 damaged order conversations from the last 30 days.
>
> Right now, the agent always offers a refund first. But I found that **52 customers** (15%) said things like "I still need flowers for tomorrow" or "it's for my mom's birthday today." They didn't want money back — they needed flowers.
>
> **34 of them placed a new order at full price** after receiving the refund. They're essentially paying twice for a problem that wasn't their fault.
>
> I'd like to test a different approach — proactively sending a replacement instead of defaulting to a refund.

**Right panel:** Shows a data summary card:
- "Damaged order conversations (30 days): 340"
- "Customers who still needed flowers: 52 (15%)"
- "Reordered at full price after refund: 34"
- "Estimated monthly revenue opportunity: $4,200"
- Maybe a mini bar chart showing the breakdown

**Suggestion buttons:**
- "Show me the two variants"
- "How will you measure success?"

---

### Beat 2.2 — Agent shows the two variants

**Trigger:** User clicks "Show me the two variants"

**Left panel (user bubble):** "Show me the two variants"

**Left panel (AI message):**
> Here are the two approaches I want to test:
>
> **Variant A — Proactive replacement:**
> "I'm so sorry about this. I've already dispatched a fresh arrangement that'll arrive tomorrow by noon. I've upgraded you to our premium wrap as an apology. No action needed on your end."
>
> **Variant B — Standard refund (current):**
> "I'm so sorry about this. I've refunded $85.00 to your card — you'll see it in 3-5 business days. Would you like help finding a new arrangement?"
>
> Both follow the same damage verification steps. The difference is what happens after: save the sale, or return the money.

**Right panel updates:** Shows a side-by-side variant comparison card:
- Variant A label + key behavior summary
- Variant B label + key behavior summary
- Traffic split: 50/50 (editable)
- Estimated conversations needed: ~120
- Estimated duration: ~5 days

**Suggestion buttons:**
- "How will you measure success?"
- "Adjust traffic split"
- "Start experiment"

---

### Beat 2.3 — Scorers & autonomy

**Trigger:** User clicks "How will you measure success?"

**Left panel (user bubble):** "How will you measure success?"

**Left panel (AI message):**
> I'll track these metrics for each variant:
>
> **Foundational metrics** (always on):
> - **Adherence** — Did the agent follow the skill instructions correctly?
> - **Accuracy** — Was the action executed correctly? (right order refunded, correct replacement dispatched)
>
> **Custom scorers:**
> - **Revenue retained** — How much revenue was preserved vs. refunded?
> - **Repeat purchase rate** — Did the customer buy again within 30 days?
> - **Brand delight** — Did the customer express gratitude or surprise?
>
> I'll need about 120 conversations to reach statistical significance — roughly 5 days at your current volume.
>
> One more thing: when this experiment reaches a clear winner, should I promote it automatically, or ask you first?

**Right panel updates:** Scorers section appears below the variant comparison:
- Foundational: Adherence, Accuracy (shown as locked/default)
- Custom: Revenue retained, Repeat purchase rate, Brand delight (shown as editable, with + Add scorer)
- Confidence threshold: 95% (editable)

**Suggestion buttons:**
- "Auto-promote when there's a clear winner"
- "Always ask me before promoting"
- "Add a custom scorer"

---

### Beat 2.4 — Autonomy selection + launch

**Trigger:** User clicks "Auto-promote when there's a clear winner"

**Left panel (user bubble):** "Auto-promote when there's a clear winner"

**Left panel (AI message):**
> Got it — if the experiment reaches 95% confidence, I'll automatically promote the winning variant and retire the other.
>
> I'll notify you in Slack when it happens so you're always in the loop. Ready to launch?

**Right panel updates:** Autonomy section appears:
- Setting: "Auto-promote at 95% confidence" ✓
- Notification: "Slack → #cx-team" ✓

**Suggestion buttons:**
- "Launch experiment"
- "Review setup first"

---

### Beat 2.5 — Launch confirmation

**Trigger:** User clicks "Launch experiment"

**Left panel (user bubble):** "Launch experiment"

**Left panel (AI message):**
> ✅ **Experiment launched.**
>
> "Damaged order recovery" is now live. I'll split incoming damaged order conversations 50/50 between proactive replacement and standard refund.
>
> I'll keep you posted — expect first results in about 3 days, and statistical significance around day 5.

**Right panel updates:** Status changes to "Running" with a progress indicator:
- 0 / 120 conversations
- Started: Apr 3, 2026
- Estimated completion: Apr 8, 2026

**Suggestion buttons:**
- "Set up the next experiment"
- "Back to Experiments hub"

---

## Screen 3: Experiment B Setup — Post-Delivery Care → Subscription

**Trigger:** User clicks "Set up the next experiment"

**Layout:** Same two-panel layout. Right panel resets for new experiment.

### Beat 3.1 — Agent presents the data insight

**Left panel (AI message):**
> Here's the second opportunity I found.
>
> I analyzed 3,200 post-delivery conversations over the past 90 days. **28% of one-time buyers** asked questions about flower care within 48 hours — "how do I make these last longer?", "should I trim the stems?"
>
> These customers are highly engaged with the product, but **we're not proactively reaching out to any of them.**
>
> Even more interesting: one-time buyers who had any positive post-delivery interaction were **2.4x more likely to place a second order**.
>
> I'd like to test a proactive outbound campaign targeting one-time buyers after delivery, and A/B test whether a care-focused approach or a direct subscription pitch converts more of them into subscribers.

**Right panel:** Data summary card:
- "Post-delivery conversations analyzed: 3,200"
- "One-time buyers asking about flower care: 28%"
- "Reorder lift from post-delivery engagement: 2.4x"
- "Untapped segment: 847 one-time buyers with no post-delivery outreach (last 90 days)"

**Suggestion buttons:**
- "Show me the two variants"
- "How will you measure success?"

---

### Beat 3.2 — Agent shows the two variants

**Trigger:** User clicks "Show me the two variants"

**Left panel (user bubble):** "Show me the two variants"

**Left panel (AI message):**
> **Variant A — Care-first approach:**
>
> *Day 1 (24h after delivery):*
> "Your Sunset Peony arrangement was delivered yesterday! Here's how to keep it fresh: trim the stems at an angle, change the water every 2 days, and keep them away from direct sunlight. You should get 10-12 days of bloom."
>
> *Day 4 (follow-up):*
> "How are your peonies holding up? If you're loving having fresh flowers at home, our subscribers get a new seasonal arrangement every 2 weeks — starting at $45/delivery."
>
> **Variant B — Direct subscription pitch:**
>
> *Day 1 (24h after delivery):*
> "Your Sunset Peony arrangement was delivered! Love having fresh flowers? Subscribe and get a new seasonal arrangement every 2 weeks. First delivery is 20% off."
>
> The care-first approach builds trust before asking for the sale. The direct pitch captures the delivery-day excitement. Genuinely not sure which will win — that's why we test.

**Right panel updates:** Side-by-side variant comparison:
- Variant A: Two-touch, care → soft subscription pitch
- Variant B: One-touch, direct subscription pitch with incentive
- Channel: SMS / Chat (toggle)
- Target segment: One-time buyers, delivered in last 24h
- Traffic split: 50/50

**Suggestion buttons:**
- "How will you measure success?"
- "Start experiment"

---

### Beat 3.3 — Scorers, personas & autonomy

**Trigger:** User clicks "How will you measure success?"

**Left panel (user bubble):** "How will you measure success?"

**Left panel (AI message):**
> For this one, I want to layer in some additional scoring on top of the basics.
>
> **Foundational metrics:**
> - **Subscription conversion rate** — Did they subscribe?
> - **Time to convert** — How long between first outreach and subscription?
> - **Revenue per customer** (30-day window)
>
> **Custom scorers:**
> - **Brand voice alignment** — Does the message feel like UrbanStems? Warm, premium, personal.
> - **Shopper receptiveness** — Did the customer engage warmly, or ignore/dismiss?
>
> **Persona scorers:**
> I've identified three customer segments from your data that might respond differently:
>
> - 🎁 **The Gifter** — Bought for someone else. Care tips help them look thoughtful. A subscription means they never forget an occasion.
> - 💐 **The Self-Treater** — Bought for themselves. Already invested in flowers at home. Most natural subscription candidate.
> - 🆕 **The One-Timer** — First purchase ever. Lowest intent. Which approach converts this hardest-to-reach segment?
>
> And same question: auto-promote the winner, or ask you first?

**Right panel updates:** Scorers section with three tiers:
- Foundational: Subscription conversion rate, Time to convert, Revenue per customer
- Custom: Brand voice alignment, Shopper receptiveness (+ Add scorer button)
- Personas: The Gifter, The Self-Treater, The One-Timer (each as a card with short description + toggle)

**Suggestion buttons:**
- "Always ask me before promoting"
- "Auto-promote when there's a clear winner"
- "Add a custom scorer"
- "Edit personas"

---

### Beat 3.4 — Autonomy + custom scorer demo

**Trigger:** User clicks "Always ask me before promoting"

**Left panel (user bubble):** "Always ask me before promoting"

**Left panel (AI message):**
> Makes sense — this is a new outbound campaign, so you'll want to review the results before committing. I'll ping you in Slack when we reach significance.
>
> Want to add any other scorers before we launch? You can score on anything — tone, urgency, personalization, whatever matters to you.

**Right panel updates:** Autonomy section:
- Setting: "Ask before promoting" ✓
- Notification: "Slack → #marketing-team"

**Suggestion buttons:**
- "Add a scorer for 'premium feel'"
- "Launch experiment"

---

### Beat 3.5 — Adding a custom scorer (optional but demonstrates the concept)

**Trigger:** User clicks "Add a scorer for 'premium feel'"

**Left panel (user bubble):** "Add a scorer for 'premium feel'"

**Left panel (AI message):**
> Good call. I've added **"Premium feel"** as a custom scorer. It'll evaluate whether the agent's outreach matches the quality level of the customer's purchase history — for example, if someone bought a $200 Grand Peony arrangement, the outreach should reflect that taste level, not suggest a $35 starter bouquet.

**Right panel updates:** New scorer card appears in the Custom section:
- "Premium feel" with description: "Does the recommendation match the customer's purchase history and price tier?"
- + Add scorer button still visible

**Suggestion buttons:**
- "Launch experiment"
- "Add another scorer"

---

### Beat 3.6 — Launch confirmation

**Trigger:** User clicks "Launch experiment"

**Left panel (user bubble):** "Launch experiment"

**Left panel (AI message):**
> ✅ **Experiment launched.**
>
> "Post-delivery care → subscription" is now live. Starting tomorrow, one-time buyers will receive either the care-first or direct pitch sequence after their flowers are delivered.
>
> Two experiments running now. I'll keep you posted in Slack as results come in.

**Right panel updates:** Status changes to "Running":
- 0 / 200 conversations
- Started: Apr 3, 2026
- Estimated completion: Apr 10, 2026

**Suggestion buttons:**
- "Back to Experiments hub"

---

## Screen 4: Time Skip

**What it is:** A visual transition indicating time has passed. Simple, elegant.

**Options (pick one during build):**
- Fade to black → "5 days later · April 8, 2026" → Fade into Slack notification
- Calendar animation flipping from Apr 3 → Apr 8
- Simple centered text on dark background: "5 days later..."

---

## Screen 5: Slack Notification

**What it is:** A simulated Slack message. Quick, punchy — the "come back" moment.

**Layout:** Styled as a Slack message (could be a simple card styled like Slack's UI, or a screenshot-like mockup).

**Content:**

**#cx-team channel**

🤖 **Gorgias AI Agent** · 9:14 AM

> **Experiment complete: Damaged order recovery**
>
> Proactive replacement wins across the board:
> • Adherence: 94% vs 91%
> • Revenue retained: $3,840 vs $0 (refund group)
> • Repeat purchase rate (30d): 62% vs 28%
> • Brand delight score: 4.7 vs 3.1
>
> ✅ Auto-promoted — proactive replacement is now the default.
> → [View full results in Gorgias](link)

**#marketing-team channel**

🤖 **Gorgias AI Agent** · 9:14 AM

> **Experiment results ready: Post-delivery care → subscription**
>
> Care-first approach is winning, but the persona breakdown is interesting — review recommended.
> • Overall subscription conversion: 8.3% vs 4.1%
> • The Self-Treater: 14.2% vs 5.8% (care-first crushes it)
> • The Gifter: 6.1% vs 4.4% (care-first edges ahead)
> • The One-Timer: 2.7% vs 2.2% (marginal difference)
>
> Awaiting your review before promoting.
> → [Review results in Gorgias](link)

---

## Screen 6: Results View — Back in the App

**Trigger:** User clicks the Slack link (or we auto-transition after showing Slack)

**Layout:** Back to the Experiments hub, but now both cards show results.

### Experiment A — Completed (auto-promoted)
- **Status badge:** "Completed · Winner promoted" (green)
- **Winner:** Variant A — Proactive replacement
- **Key result:** Revenue retained: $3,840/month. Repeat purchase rate: 62% (+34pp vs. refund)

### Experiment B — Results ready (awaiting review)
- **Status badge:** "Results ready" (amber)
- **CTA:** "Review results →"

**Interaction:** Clicking "Review results" on Experiment B opens the detail view.

---

## Screen 7: Experiment B Results Detail

**Layout:** Two-panel layout again. Left = conversation, Right = results dashboard.

### Beat 7.1 — Agent presents results

**Left panel (AI message):**
> The results are in for the post-delivery care experiment. **Care-first wins overall** — 8.3% subscription conversion vs. 4.1% for the direct pitch.
>
> But the interesting story is in the personas. Take a look at the breakdown on the right.

**Right panel:** Results dashboard:

**Overall winner: Variant A (Care-first)**

| Metric | Care-first | Direct pitch |
|--------|-----------|--------------|
| Subscription conversion | **8.3%** | 4.1% |
| Time to convert | 4.2 days | 1.1 days |
| Revenue per customer (30d) | **$94** | $52 |
| Brand voice alignment | **4.6/5** | 3.8/5 |
| Shopper receptiveness | **72%** positive | 41% positive |
| Premium feel | **4.4/5** | 3.2/5 |

**Persona breakdown:**

🎁 **The Gifter**
- Care-first: 6.1% conversion · Avg. order $112
- Direct pitch: 4.4% conversion · Avg. order $78
- *Insight: Gifters appreciated the care tips — several forwarded them to recipients. Moderate subscription interest.*

💐 **The Self-Treater**
- Care-first: **14.2%** conversion · Avg. order $68
- Direct pitch: 5.8% conversion · Avg. order $55
- *Insight: This segment loves the care-first approach. They're already invested in keeping flowers alive — the subscription pitch after care tips feels natural, not salesy.*

🆕 **The One-Timer**
- Care-first: 2.7% conversion · Avg. order $52
- Direct pitch: 2.2% conversion · Avg. order $48
- *Insight: Marginal difference. This segment is hard to convert regardless of approach — consider a longer nurture sequence.*

**Suggestion buttons:**
- "Promote care-first as default"
- "What would you do differently for one-timers?"
- "Run a follow-up experiment"

---

### Beat 7.2 — Promote + next steps

**Trigger:** User clicks "Promote care-first as default"

**Left panel (user bubble):** "Promote care-first as default"

**Left panel (AI message):**
> Done — care-first is now the default post-delivery outreach for one-time buyers.
>
> Based on these results, I have a suggestion: the one-timer segment barely moved with either approach. Want me to design a follow-up experiment specifically for first-time buyers? I'm thinking a longer nurture sequence — care tips on day 1, a "how are your flowers?" check-in on day 4, and the subscription pitch on day 7 when they're about to see the flowers fade.

**Right panel updates:** Experiment B status changes to "Completed · Winner promoted"

**Suggestion buttons:**
- "Yes, set that up"
- "Not now, take me back to the hub"

---

## End State: Experiments Hub (updated)

Both experiments now show as completed. The hub could also show:
- "1 new experiment proposed" (the one-timer follow-up the agent just suggested)
- Summary stats: "2 experiments completed this week · $3,840/mo revenue protected · 8.3% subscription conversion unlocked"

This creates a natural loop: data → insight → experiment → results → new insight → new experiment.

---

## Notes for Build

- **UI foundation:** Use the uploaded Daily Digest HTML as the starting chrome (sidebar, nav, layout)
- **Two-panel pattern:** Reuse from v7 for all setup and results screens
- **Transitions:** Simple fade or slide between screens, triggered by button clicks
- **Autonomy levels:** Inspired by Claude Code's "always allow / ask permission" pattern
- **Persona emojis:** 🎁 💐 🆕 — keep it light and scannable
- **Custom scorer interaction:** Shows that merchants can score on anything, not just preset metrics
- **Slack notification:** Can be a simple styled card, doesn't need to be a full Slack replica

# Gorgias AI Agent: Conversational Operations Model

## The Core Shift

At 80%+ automation, the merchant's job fundamentally changes. They're no longer *doing* customer service — they're *supervising an AI* that does customer service. The product should reflect this new reality: instead of a dashboard full of pages to click through, the merchant lands on a conversation with an AI that already handled everything overnight and is ready to brief them.

The metaphor is a **chief of staff**. It worked while you slept. Now it tells you what happened, what needs your attention, and what it recommends — and you steer.

---

## The Two-Panel Model

### Left Panel — The Conversation

This is the primary interface. It is not a chatbot the merchant queries — it's an AI that **initiates, briefs, and recommends**. The merchant mostly responds, approves, or redirects.

**Key behaviors:**

- **AI-initiated.** The AI talks first. It opens with the daily digest and surfaces what matters most. The merchant doesn't need to know what to ask — the AI sets the agenda.
- **Progressive disclosure.** Information is revealed in layers: headline → detail → evidence → action. The merchant pulls on threads that interest them and skips what doesn't.
- **Inline action buttons at decision points.** When the AI recommends something, it offers clear affordances: "Publish this," "Show me the tickets," "Run evaluation." These are buttons, not things the merchant has to type.
- **Natural language for exploration.** Buttons handle the common paths, but the merchant can always type to explore: "Why is this one so high?", "What about subscription orders?", "Rewrite it to be more empathetic."
- **Suggested prompts for common next steps.** After each AI message, 2-3 contextual suggestions appear as tappable chips — reducing the blank-input-box problem without constraining the merchant.

### Right Panel — The Evidence Trail (Stacking Cards)

Cards materialize on the right as the conversation warrants them. They are not a separate interface to learn — they are **artifacts the conversation generates**. Think of them as "show your work" made visible.

**Key behaviors:**

- **Cards stack vertically, newest at the bottom** — matching the downward flow of the conversation. The merchant scrolls both panels in the same direction.
- **Each card is tied to a conversation moment.** When a new card appears, it enters with a subtle animation, and a small indicator appears next to the corresponding message on the left. This makes the connection between "what I asked" and "what appeared" feel immediate.
- **Cards are self-contained and glanceable.** Each one has a clear title, the essential information visible at default size, and an expand affordance for detail.
- **Older cards auto-collapse.** As the session generates more cards, earlier ones compress to just their title bar. The merchant can re-expand any card, or pin one to keep it open.
- **Cards are not interactive in complex ways.** They display information, comparisons, and previews. Actions happen in the conversation (left panel), not by clicking around inside cards. This keeps the mental model clean: *left panel = do things, right panel = see things.*

---

## Card Taxonomy

Every card the system generates falls into one of these types. Keeping the taxonomy tight makes the system feel coherent — the merchant quickly learns to recognize what they're looking at.

### Digest Card
A summary block of overnight activity. Appears at session start. Shows tickets resolved, automation rate, revenue recovered, and any notable patterns. This is the "everything is fine" card — it tells the merchant what the AI handled without them.

### Metric Card
A single KPI with trend line. Examples: "Automation rate: 84% (↑ 2% this week)" or "Average resolution time: 47 seconds." Small, stackable. Often appears in clusters of 2-3 alongside the digest.

### Alert Card
Something needs attention. Has a severity level (critical / warning / informational) that determines visual weight. Examples: "WISMO tickets spiked 3x in Texas overnight" or "The 'Cancel Order' skill has 89.7% handover rate." The alert card is the on-ramp into a deeper flow.

### Ticket Sample Card
A real customer conversation, lightly anonymized. Shows the customer message, the AI's response (or lack thereof), and the outcome (resolved / handed over / escalated). Appears when the merchant asks to "show me" examples. Typically stacks in groups of 2-4.

### Comparison Card
Side-by-side before/after. Used when the AI rewrites guidance, suggests a new response, or proposes a policy change. The left half shows the current state, the right half shows the proposed state. Differences are subtly highlighted.

### Evaluation Card
Scoring results from running a proposed change against historical tickets. Shows a progress bar during evaluation, then resolves into metrics: accuracy, resolution rate, efficiency, overall score. This is the "proof it works" card.

### Chart Card
Time series, distributions, or funnels. Used for anomaly evidence ("here's the spike"), trend context ("handover rate over 90 days"), or campaign analysis ("open rate by segment"). Minimal chrome — the chart speaks.

### Segment Card
A customer cohort. Shows the count, key attributes, and representative examples. Used in campaign flows when the AI identifies a group worth targeting. Example: "142 customers who bought Valentine's arrangements in 2025, located in the US, no purchase in 90+ days."

### Preview Card
A rendered mock of something the AI wants to send: an email, an SMS, a proactive chat message, or a modified auto-response. Looks like the real thing. The merchant reviews it before approving.

### Confirmation Card
The final card in an action sequence. Shows what was done, when, and how to undo it. Examples: "Guidance published. 715 future cancel-order tickets will use the new logic. Undo within 24 hours." Provides closure.

---

## The Four Flows

### Flow 1: Daily Digest (The Landing Experience)

This is where every session begins. The merchant opens Gorgias and the AI greets them with what happened since they last checked in.

**Conversation (left):**
> ☀️ Good morning, Natasha. Here's your overnight summary.
>
> Your AI Agent resolved **1,247 tickets** while you were away — 86% automation rate, up from 83% last week. Revenue recovered from save-the-sale interventions: **$4,200**.
>
> **3 things that need your attention:**
> 1. Cancel-order requests are still escalating at 89.7% — the skill exists but isn't wired up
> 2. Unusual spike in "where's my order" tickets from Texas (3x normal volume)
> 3. I found a campaign opportunity: Mother's Day is 6 weeks out and you have 142 past Valentine's buyers
>
> Which one do you want to dig into?
>
> `[Cancel orders]` `[Texas WISMO spike]` `[Mother's Day campaign]`

**Evidence trail (right):**
1. **Digest card** — overnight resolution stats, automation rate trend
2. **Alert card (warning)** — Cancel order handover rate: 89.7%, $28K impact
3. **Alert card (critical)** — Texas WISMO spike, 3x baseline
4. **Segment card** — 142 past Valentine's buyers, campaign opportunity

**What makes this work:** The merchant doesn't have to navigate anywhere. The three most important things surface immediately, ranked by impact. Tapping a button (or typing) drills into that flow. The right panel gives them the evidence at a glance without requiring them to read the full conversation.

---

### Flow 2: Guidance Improvement

The merchant selects the cancel-order issue. The AI walks them through diagnosis → evidence → fix → validation → publish.

**Conversation (left):**
> **AI:** This one has the highest handover rate of any intent — nearly 9 in 10 cancel requests get escalated. The irony: the guidance already exists, it's just unpublished and missing the cancel action.
>
> Want to see what's happening?
>
> `[Show me]`

> **Merchant:** *taps Show me*

> **AI:** Here are 3 tickets that got handed over because of this. Notice the pattern — the AI knows the order should be cancellable, but has no action to actually do it, so it escalates every time.
>
> `[Show me the fix]`

> **Merchant:** *taps Show me the fix*

> **AI:** I've rewritten the existing guidance. The key changes: added fulfillment-status logic (unfulfilled vs. in-fulfillment vs. shipped), wired in the cancel action for eligible orders, and added edge case handling for subscriptions and wrong-address scenarios.
>
> Want me to run this against the last 90 days of cancel tickets to see how it would have performed?
>
> `[Run evaluation on 715 tickets]`

> **Merchant:** *taps Run evaluation*

> **AI:** Evaluation complete. Accuracy: 94. Resolution: 74. Efficiency: 89. Overall: 86.
>
> The resolution score is the interesting one — it's at 74 because some of these tickets involve shipped orders where the policy genuinely is "no cancellation." The AI correctly explains this now instead of escalating, but the customer doesn't always love the answer.
>
> Want to publish this?
>
> `[Publish]` `[Let me tweak it first]`

**Evidence trail (right), stacking as conversation progresses:**
1. **Alert card** — 89.7% handover, $28K impact (carried from digest)
2. **Ticket sample cards (×3)** — real escalated conversations
3. **Comparison card** — before/after guidance, side by side
4. **Evaluation card** — progress bar → final scores
5. **Confirmation card** — "Published. Estimated to resolve ~78% of cancel requests without handover."

---

### Flow 3: Anomaly / Escalation

The merchant drills into the Texas WISMO spike.

**Conversation (left):**
> **AI:** Starting around 2am CT, "where's my order" tickets from Texas addresses jumped to 3x the normal rate. 47 tickets in 6 hours, versus the usual 15.
>
> I cross-referenced with carrier data — FedEx has a regional delay affecting the Dallas-Fort Worth sorting facility. Estimated 2-3 day delays on all ground shipments routed through DFW.
>
> `[Show me the tickets]` `[What do you recommend?]`

> **Merchant:** What do you recommend?

> **AI:** Two options:
>
> **Option A — Proactive outreach.** I can identify all 83 orders currently in transit through DFW and send a preemptive email: "Your order may arrive 2-3 days later than expected due to a carrier delay. No action needed — we're tracking it for you." This heads off tickets before they happen.
>
> **Option B — Update the auto-response.** I modify the WISMO guidance to include carrier delay context when the shipping address is in affected Texas zip codes. Customers who do write in get a specific, accurate answer instead of the generic tracking link.
>
> I'd recommend both — outreach now, guidance update for the next few days.
>
> `[Do both]` `[Just the outreach]` `[Just the guidance]`

> **Merchant:** Do both. But let me see the email first.

> **AI:** Here's the draft. I kept it short — acknowledging the delay, setting the revised expectation, and making clear they don't need to do anything.
>
> `[Send to 83 customers]` `[Edit first]`

**Evidence trail (right):**
1. **Chart card** — WISMO ticket volume, last 48 hours, Texas vs. baseline
2. **Ticket sample cards (×2)** — example tickets from the spike
3. **Preview card** — the proactive email draft
4. **Comparison card** — current vs. updated WISMO guidance for Texas zips
5. **Confirmation card** — "Email sent to 83 customers. WISMO guidance updated for DFW-area zip codes. Auto-reverts in 5 days."

---

### Flow 4: Proactive Campaigns

The merchant explores the Mother's Day campaign opportunity.

**Conversation (left):**
> **AI:** Mother's Day is May 10 — six weeks out. Last year, your Valentine's Day buyers converted at 3.2x the rate of your general list for Mother's Day. You have 142 of them who haven't purchased in 90+ days.
>
> Want me to put together a win-back campaign?
>
> `[Yes, show me what you'd send]` `[Tell me more about the segment]`

> **Merchant:** Tell me more about the segment.

> **AI:** 142 customers. Average order value from their Valentine's purchase: $78. 68% bought the "Classic Rose Bouquet" or "Sweetheart Arrangement." 91% are in the US. Last purchase was 45-120 days ago.
>
> 23 of them also bought for Mother's Day last year — those are your highest-intent group.
>
> `[Show me the campaign]` `[Narrow to the 23 repeat buyers]`

> **Merchant:** Show me the campaign for all 142. Make it feel personal, not promotional.

> **AI:** Here's what I'd send. Subject line: "She'd love to hear from you this Mother's Day." The body leads with the emotional angle, then shows 3 curated arrangements based on their past purchase. Includes a "Send by May 7 for guaranteed delivery" CTA.
>
> I'd suggest sending this in 2 weeks — enough lead time for delivery but close enough that Mother's Day is on their mind.
>
> `[Schedule for April 15]` `[Edit the email]` `[Send a test to me first]`

**Evidence trail (right):**
1. **Segment card** — 142 customers, key attributes, AOV breakdown
2. **Segment card (updated)** — highlights the 23 repeat buyers within the group
3. **Preview card** — rendered email with subject line, body, product grid
4. **Confirmation card** — "Scheduled for April 15 at 10am ET. 142 recipients. You'll get a test email now."

---

## Interaction Principles

### 1. AI leads, merchant steers
The AI sets the agenda based on impact. The merchant doesn't need to know what to look for — the system surfaces what matters. But the merchant always has the final say, and can redirect at any time: "Actually, skip this — what about returns?"

### 2. Evidence before action
Every recommendation comes with proof. The AI never says "you should do X" without showing why. Ticket samples, metrics, evaluations, trend charts — the evidence trail on the right is the AI showing its work.

### 3. Progressive disclosure through conversation
No information overload. The digest starts with 3 sentences. Each "show me" or "tell me more" pulls one layer deeper. The merchant controls how far they drill in. If they're satisfied at the headline level, they approve and move on.

### 4. Buttons for decisions, language for exploration
Binary choices get buttons: approve/reject, publish/skip, send/edit. Open-ended exploration stays in natural language: "What about subscription orders?", "Make it more empathetic", "Why is the resolution score only 74?" This keeps interaction fast for routine decisions and flexible for nuanced ones.

### 5. Cards are byproducts, not destinations
The right panel is not a separate interface. Merchants never need to "go to" the right panel to do something. Cards appear as a *consequence* of conversation. This means the left panel must always be self-sufficient — a merchant who never looks right should still understand what's happening.

### 6. Sessions, not states
Each day starts a new session tied to the digest. The AI can reference past sessions: "Last Tuesday you approved the WISMO guidance rewrite — here's how it's performing this week." This creates continuity without requiring the merchant to remember where they left off.

### 7. Reversibility as a default
Every published action has an undo window. Every campaign has a "send test first" option. The AI proactively offers off-ramps: "This auto-reverts in 5 days" or "Undo within 24 hours." Low stakes lowers the anxiety of approving.

---

## Panel Coordination Details

### How the panels stay in sync

- **Card entrance animation.** When a new card appears, it slides in from the right edge with a subtle fade. Simultaneously, a small dot or line indicator appears next to the corresponding conversation message on the left. This answers the question "what just appeared and why?"
- **Scroll linkage (soft, not rigid).** Clicking a card's indicator on the left scrolls the right panel to that card, and vice versa. But the panels scroll independently by default — rigid scroll-lock would feel claustrophobic.
- **Auto-collapse with recency bias.** When more than ~4 cards are expanded, older ones auto-collapse to title bars. The most recent 2-3 cards remain expanded. Pinning overrides auto-collapse.

### When the right panel is empty

At the very start of a session, before the digest loads, the right panel shows a calm empty state — perhaps the UrbanStems brand mark and "Your AI Agent is preparing your briefing." This transitions to the first cards within a second or two. The right panel should never feel like a broken or loading state.

### Card actions vs. conversation actions

Cards are display-only. They don't have buttons, dropdowns, or form fields inside them. All actions flow through the conversation. If a merchant wants to edit a guidance rewrite shown in a comparison card, they type "let me tweak the wording on step 3" in the conversation — they don't click into the card to edit inline. This constraint keeps the interaction model simple: one place to act, one place to see.

**One exception:** cards can have a "copy" or "expand to full screen" affordance for cases where a merchant wants to scrutinize a long guidance rewrite or share a chart with a colleague.

---

## What This Is Not

- **Not a chatbot.** The AI initiates. It has an agenda. It's more like a daily standup than a search bar.
- **Not a dashboard with a chat sidebar.** The conversation is primary, not supplementary. There are no pages, no nav, no settings screens to visit. If the merchant needs to change something, they say so in the conversation.
- **Not a replacement for everything.** Deep configuration (account settings, billing, team management) still lives in traditional UI. This model covers the *operational* surface — the daily work of supervising an AI agent.

---

## Open Questions

1. **Multi-merchant teams.** If multiple people manage the same store, do they share a session? See each other's approvals? Or does each person get their own digest filtered to their role?
2. **Mobile.** The two-panel model is inherently desktop. On mobile, the right panel likely becomes a bottom sheet that slides up when a card is generated. Worth prototyping separately.
3. **Notification layer.** If something critical happens mid-day (not just overnight), how does the AI re-engage? Push notification → opens a new conversation thread?
4. **Audit trail.** The stacking cards create a natural session log. Is this sufficient for compliance/record-keeping, or does it need a separate "history" view?
5. **Tone calibration.** How casual vs. professional should the AI voice be? The UrbanStems context leans warm and human. Other brands might want more formal.

# Conversational Operations Center
## Gorgias AI Agent — v3 Vision Concept

---

### The shift

At 80%+ automation, the merchant's job fundamentally changes. They're no longer *doing* support — they're supervising an AI employee that does support. The product should reflect this. Instead of dashboards full of charts and tables the merchant has to interpret, the AI comes to *them* with what matters, explains what it did, shows its work, and asks for direction.

The mental model: **a chief of staff who handled everything overnight, now briefing you over coffee.** You don't dig through spreadsheets. You have a conversation.

---

### The layout

**Left panel — The Conversation.** This is the primary interface. The AI initiates, the merchant steers. It's not a chatbot bolted onto a dashboard — the conversation *is* the product. The AI sets the agenda (daily digest, flagged issues, opportunities), and the merchant responds with natural language, quick-action buttons, or both.

**Right panel — The Evidence Trail.** As the conversation unfolds, the right panel accumulates *cards* — self-contained artifacts that materialize on demand. Each card is tied to a moment in the conversation: a chart the AI referenced, a before/after comparison it generated, an evaluation it ran, a campaign preview it drafted. Cards stack vertically, most recent at top, and the merchant can scroll back through the full trail of evidence. Think of it as the "show your work" panel — everything the AI claims is substantiated here.

The right panel never requires independent navigation. The merchant never needs to *go find* something. If the conversation references it, it appears.

---

### Interaction principles

**1. AI leads, merchant steers.**
The AI sets the agenda based on what actually happened — what's broken, what improved, what needs a decision. The merchant doesn't need to know which page to visit or which filter to apply. They respond to what the AI surfaces: approve it, reject it, ask for more detail, or redirect ("skip this, show me campaigns instead").

**2. Progressive disclosure through conversation.**
Nothing is shown all at once. The AI starts with a summary, and detail emerges only as the merchant asks for it. "This intent has an 89% handover rate" is the hook. "Show me" reveals the sample tickets. "Why?" reveals the root cause analysis. "Fix it" reveals the rewritten guidance. Each conversational turn peels back one layer.

**3. Every recommendation comes with evidence.**
The AI never says "you should do X" without showing why. Evidence materializes as cards on the right: real ticket samples, trend charts, before/after comparisons, evaluation scores. The merchant builds trust because they can always inspect the reasoning. Over time, they inspect less — but the option is always there.

**4. Actions are previewable and reversible.**
Before anything ships, the merchant sees exactly what will happen — a preview card on the right showing the rewritten guidance, the campaign message, or the proactive outreach. After approval, a confirmation card shows what was done, with an undo window. The AI never makes irreversible changes without explicit merchant consent.

**5. The right panel is a byproduct, not a destination.**
Merchants never need to learn the right panel. They just talk. Cards appear because the conversation warrants them. There's no "cards page" or "artifacts view" — the panel is empty until the conversation generates something worth showing.

**6. Conversational shortcuts for power users.**
While the default flow is guided and progressive, experienced merchants can skip ahead: "Just publish the fix" or "Run the eval and show me results." The AI adapts pacing to the merchant's comfort level — verbose and explanatory for new users, terse and action-oriented for experienced ones.

---

### Card taxonomy

Cards are the atoms of the right panel. Each is self-contained, glanceable, and tied to a specific conversational moment. When a card appears, it gently highlights and the conversation on the left shows a subtle anchor linking the two.

| Card type | Purpose | Example |
|---|---|---|
| **Metric** | Single stat with trend | "Automation rate: 83% ↑ 2.4% this week" |
| **Impact** | Quantified problem statement | "715 handovers · $28K in delayed resolutions" |
| **Sample** | Real ticket/conversation preview | 3 example tickets where AI escalated unnecessarily |
| **Comparison** | Before/after or A/B | Old guidance vs. rewritten guidance side-by-side |
| **Evaluation** | Scoring with live progress | Accuracy 94 · Resolution 74 · Efficiency 89 · Overall 86 |
| **Chart** | Time series, distribution, breakdown | Handover rate by intent over 90 days |
| **Preview** | Draft of what will ship | Email/SMS campaign mock, or rewritten guidance in context |
| **Action** | Confirmation with undo | "Published. Undo within 30 minutes." |
| **Segment** | Customer cohort details | "142 customers · bought Valentine's arrangements · avg. order $85" |

Cards can be **collapsed** (just the title bar), **expanded** (full detail), or **pinned** (stays visible even as new cards stack above). Unpinned cards gradually collapse as the conversation moves on, keeping the trail tidy without losing history.

---

### Flow 1: Daily Digest (the home screen)

The merchant opens Gorgias. There's no dashboard. The AI greets them.

**Conversation (left):**
> ☀️ Good morning. Here's what happened since you left yesterday.
>
> Your AI agent handled **847 conversations** overnight — 83% fully resolved without handover, up from 79% last week. Three things need your attention today.

**Evidence trail (right):**
→ **Metric card:** 847 conversations handled, 83% automation rate, +4% week-over-week
→ **Priority card:** Three items stacked — each showing a one-line summary with severity and estimated impact

**Conversation continues:**
> **1. Order cancellation guidance is underperforming.** Nearly 9 in 10 cancel requests get escalated. The guidance exists but it's unpublished and missing the cancel action. Estimated fix: resolve ~78% without handover, saving ~560 handovers/quarter.
>
> **2. Unusual spike in "where's my order" from Texas.** 3x normal volume since 2am. Looks like a FedEx regional delay. I can proactively message 34 affected customers.
>
> **3. Mother's Day opportunity.** 142 customers bought Valentine's arrangements. Mother's Day is 6 weeks out — good window for a win-back campaign.
>
> Which one do you want to start with?

The merchant can tap any item, type a response, or say "skip to campaigns." The digest is the **entry point to every other flow** — it's where the AI hands the merchant the steering wheel.

---

### Flow 2: Guidance Improvement

Triggered from the daily digest or by the merchant asking "what's underperforming?"

**Conversation (left):**
> Let's look at order cancellation. This intent has the highest handover rate — 89.7%. The guidance already exists, it's just unpublished. The irony: it's there but not wired up.
>
> Want to see what's happening?

Merchant: **"Show me"**

> Here are 3 tickets that got handed over because of this. Notice the pattern — the AI couldn't determine fulfillment status and defaulted to escalation.

**Evidence trail (right):**
→ **Sample cards** (×3): Real ticket previews showing the AI's response and where it broke down

**Conversation continues:**
> The fix is straightforward. The existing guidance needs three changes: fulfillment-status logic so the AI knows *when* it can cancel, the actual cancel action wired in, and clearer language for edge cases like shipped orders.
>
> Here's my rewrite. Want to see it?

Merchant: **"Show me the fix"**

**Evidence trail (right):**
→ **Comparison card:** Before (vague, action-less guidance) vs. After (structured, status-aware, with cancel action and edge cases)

**Conversation continues:**
> Want me to run this against the 715 cancel request tickets from the past 90 days to see the projected impact?

Merchant: **"Run it"**

**Evidence trail (right):**
→ **Evaluation card:** Live progress bar (453/715), then final scores — Accuracy 94, Resolution 74, Efficiency 89, Overall 86

> The rewrite scores an 86 overall. Resolution is at 74 — that's the main area to watch. The gap is mostly edge cases around subscription cancellations, which this guidance routes to Subscription Management. That's the right call but it counts as a "non-resolution" in scoring.
>
> Ready to publish?

Merchant: **"Publish it"**

**Evidence trail (right):**
→ **Action card:** "Order cancellation guidance published. Monitoring live performance. Undo available for 30 minutes."

---

### Flow 3: Anomaly / Escalation

Triggered from the daily digest or surfaced in real time as an alert.

**Conversation (left):**
> Something unusual: "where's my order" tickets from Texas spiked 3x since 2am. 34 customers affected so far, all with FedEx shipments.

**Evidence trail (right):**
→ **Chart card:** WISMO ticket volume by region, last 48 hours, with the Texas spike highlighted

Merchant: **"What's going on?"**

> I cross-referenced with carrier data. FedEx has a regional delay affecting their Dallas-Fort Worth hub — 6-18 hour delays on packages routed through DFW. None of these orders are lost, they're just late.
>
> Here are two of the affected conversations. Notice the customers are anxious but not angry yet — early intervention could prevent escalation.

**Evidence trail (right):**
→ **Sample cards** (×2): Ticket previews showing customer messages and AI responses
→ **Metric card:** 34 affected customers, avg. order value $72, 0 complaints filed yet

**Conversation continues:**
> I can proactively message all 34 affected customers to let them know about the delay before they reach out. Here's the message I'd send:

**Evidence trail (right):**
→ **Preview card:** Draft proactive message — "Hi [name], we noticed your order is being routed through a FedEx hub experiencing temporary delays..."

Merchant: **"Looks good but soften the tone — make it feel like we're looking out for them, not making excuses"**

> Updated. The new version leads with "We're keeping an eye on your order" rather than explaining the logistics issue.

**Evidence trail (right):**
→ **Comparison card:** V1 vs. V2 of the proactive message, with changes highlighted

Merchant: **"Send it"**

**Evidence trail (right):**
→ **Action card:** "Proactive message sent to 34 customers. Responses will be auto-handled by AI Agent. I'll flag anything that needs you."

---

### Flow 4: Proactive Campaigns

Triggered from the daily digest or by the merchant asking "any opportunities?"

**Conversation (left):**
> Mother's Day is May 10th — six weeks out. I found 142 customers who ordered Valentine's arrangements in February. 68% of them are repeat buyers with 2+ orders. This could be a strong win-back segment.

**Evidence trail (right):**
→ **Segment card:** 142 customers, 68% repeat buyers, avg. order $85, top products purchased

Merchant: **"What do you suggest?"**

> A two-touch sequence: an SMS in 3 weeks ("Still time to make Mom's day — your go-to arrangements are back") and a follow-up email 1 week before with a curated selection based on their past orders. Want to see a preview?

Merchant: **"Show me"**

**Evidence trail (right):**
→ **Preview card (×2):** SMS message mock + email template with personalized product grid

Merchant: **"I like the SMS. The email needs work — can you make it warmer and add a 10% returning customer discount?"**

> Done. Updated the email with warmer copy and added a unique 10% discount code per customer. Here's the new version.

**Evidence trail (right):**
→ **Comparison card:** Email V1 vs. V2, with copy changes and discount badge highlighted

Merchant: **"Perfect. Schedule it."**

**Evidence trail (right):**
→ **Action card:** "Campaign scheduled. SMS sends April 19. Email sends May 3. I'll report back on open rates and conversions."

---

### Edge cases and advanced behaviors

**Interruptions and context switching.** The merchant is mid-way through the guidance improvement flow and says "actually, show me the Texas thing first." The AI gracefully pauses the current flow ("Got it — parking the cancellation fix, let's look at the Texas spike") and switches context. The right panel's cards from the previous flow remain in the trail but visually recede. A "Resume: Order cancellation" chip appears in the conversation so the merchant can pick back up.

**Multiple approvals at once.** For the daily digest's priority items, the merchant can say "approve all three" or "approve 1 and 3, skip 2." The AI handles batch actions and confirms each with separate action cards on the right.

**Drilling into any card.** Tapping a card on the right focuses the conversation on it. If the merchant taps a sample ticket card, the AI responds as if they asked "tell me more about this one" — no explicit prompt needed. This creates a fluid back-and-forth between the two panels.

**Empty days.** Not every day has fires. When things are running smoothly: "Good morning. Quiet night — 812 conversations, 86% automation, no anomalies. Your cancellation fix from yesterday is performing well: handovers down 62% in the first 24 hours. Nothing needs your attention, but I spotted a small opportunity if you have a minute." The AI earns trust on quiet days by not manufacturing urgency.

**Onboarding and first-time experience.** For new merchants, the AI is more verbose and explains its reasoning at each step. It also asks more questions: "Want me to explain what an evaluation does before I run it?" Over time, as the merchant demonstrates comfort (skipping explanations, using shorthand), the AI compresses its responses.

---

### Why stacking cards (not canvas replace)

The stacking model was chosen over a single-canvas-replacement model for three reasons:

**Traceability.** In a supervision workflow, the merchant needs to see the chain of reasoning — not just the latest artifact. When you're approving a guidance change, you want to glance up and see the sample tickets that motivated it, the before/after comparison, and the eval scores all at once. Replacing the canvas erases the context that justifies the decision.

**Parallel reference.** Merchants often want to compare: "Wait, how does the V2 email look vs. the original?" With stacking cards, both are already in the trail. With canvas replace, they'd need to navigate back.

**Conversation coherence.** The stacking trail mirrors the conversation's structure. The two panels tell the same story in parallel — words on the left, evidence on the right. The merchant can scroll both in sync to reconstruct any decision they made.

The tradeoff is visual density — too many cards gets overwhelming. That's what auto-collapsing solves: older cards shrink to title bars as new ones arrive, maintaining the trail without the clutter. Pinning lets the merchant override this for cards they want to keep visible.

---

### Design decisions

**Trail persistence: daily.**
Each day starts a fresh conversation and a clean evidence trail. The AI opens with the daily digest — a new briefing, not a continuation of yesterday's thread. Previous days are accessible through a history view (think: a list of past daily sessions, each expandable to replay the conversation and cards), but the default state is always "today." This keeps the interface clean and reinforces the daily operating rhythm.

**Multi-user visibility.**
Each team member gets their own conversation thread — the AI adapts its briefing based on who's logged in. But actions taken by others are surfaced transparently: "Heads up — Jordan published a rewrite of the shipping delay guidance yesterday at 4pm. Handover rate for that intent dropped 34% overnight." The AI treats teammate actions as context, not hidden state. This prevents duplicate work and builds shared awareness without requiring a separate "activity feed."

**Notifications via Slack.**
Real-time anomalies (like the Texas spike) trigger a Slack notification with a one-line summary and a deep link back into the conversation: "⚡ WISMO tickets from Texas spiked 3x in the last 2 hours — 34 customers affected. [Open in Gorgias]." Tapping the link opens the conversational interface with the anomaly already queued as the first topic. The daily digest still covers anything the merchant missed, so Slack is a "fast lane" — not the only path.

**Progressive autonomy (trust ladder).**
The AI starts cautious — it recommends and waits for approval on everything. As the merchant builds trust (approving recommendations consistently, not rolling back changes), the AI gradually earns more autonomy. Three tiers:

- **Ask first** (default): AI recommends, merchant approves. "I'd like to rewrite this guidance. Want to see my draft?"
- **Do and tell**: AI acts, then reports. "I proactively messaged 34 customers about the FedEx delay. Here's what I sent." Merchant can undo.
- **Do silently**: AI handles routine actions without surfacing them, unless something goes wrong. These still appear in the daily digest as a summary line ("Handled 12 routine actions overnight — expand to review").

The merchant controls which *categories* of action sit at which tier. They might trust the AI to proactively message about shipping delays (do and tell) but still want to approve every guidance rewrite (ask first). The trust ladder is per-action-type, not global.

---

### Open questions (remaining)

1. **History navigation UX.** How does the merchant browse past daily sessions? A simple date list? A search? Does the AI summarize each past day in one line?

2. **Trust ladder UI.** Where does the merchant configure which actions are "ask first" vs. "do and tell" vs. "do silently"? Is this a settings page, or does the AI suggest promotions conversationally ("You've approved 20 guidance rewrites in a row — want me to start publishing these automatically?")?

3. **Collaborative editing.** When the AI shows a draft (guidance rewrite, campaign email), can the merchant edit it inline on the card? Or do they always direct edits through conversation ("make it warmer")?

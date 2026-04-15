# Insight Cards — Content Spec

How each flow's insight maps to the prototype's card components. The card types already exist in v3 — this is the data that goes into them.

---

## Flow 1: Order Cancellation

### InsightCard

```
title:     "Order cancellations — 89.8% handover rate"
severity:  "Critical"
stat:      "715 unnecessary handovers"
detail:    "Cancel requests have the highest handover rate of any
            intent. The guidance exists but is unlisted — the AI
            can't see it. No cancel action is configured either.
            Even a customer canceling 10 minutes after ordering
            gets escalated to a human."
examples:  "715 tickets handed over in the past 90 days"
impact:    "$28K in delayed resolutions · 89.8% handover rate"
```

### ThreadsCard (3 tickets, collapsed shows "Handed over" badge)

| Ticket | Subject | Problem pattern |
|---|---|---|
| TK-49782104 | Cancel order — placed wrong address | 10-min-old unfulfilled order, AI says "I'm not able to process a cancellation" |
| TK-49779558 | Want to cancel before it ships | Pre-shipment, AI says "forwarding to our team" for a 30-second task |
| TK-49776890 | Changed my mind, want a refund | AI doesn't check ship status or explain "all sales final" policy |

### GuidanceDiffCard

| Before (unlisted) | After |
|---|---|
| "Check order status. If not fulfilled, [Insert Action: Cancel Order]. If shipped, explain we can't cancel." | WHEN/IF/THEN with 4 branches: unfulfilled (<1hr → cancel), in fulfillment (all sales final + alternatives), wrong address (cancel + help reorder), subscription (route to sub guidance) |

**Impact line:** "~78% of cancel requests resolved without handover, ~560 fewer handovers/quarter"

### LiveEvalCard

```
name:          "eval-cancel-order-v2"
skill:         "Cancel an Order"
focus:         "Resolution without handover"
totalTickets:  715
scorer:        "Resolution & Policy Clarity"
```

### ScaleResultsCard

```
Before:  Accuracy 62 · Resolution 10 · Efficiency 35 · Overall 31
After:   Accuracy 94 · Resolution 78 · Efficiency 88 · Overall 86
```

### CorrectedExampleCard (TK-49782104)

```
Before:  "I'm not able to process a cancellation at this time.
          Let me connect you with our team..."
          → Handed over

After:   "Order #19361002847 was placed 10 minutes ago and hasn't
          entered fulfillment. I've canceled it. Refund of $72.00
          in 3-5 business days. Ready to reorder with the right
          address? I can help."
          → Resolved · 97
```

### AppliedCard

- Guidance published — Cancel an Order, with fulfillment-status logic
- Action configured — Order cancellation for unfulfilled orders
- Monitor — Cancel resolution rate, alerts below 70%
- Baseline — eval-cancel-order-v2 (overall: 86)

---

## Flow 2: Shipping Delays

### InsightCard

```
title:     "Shipping delays — 82.2% handover rate"
severity:  "High"
stat:      "955 unnecessary handovers"
detail:    "No delay-specific guidance exists. The AI can say
            'your order is in transit' but can't explain why it's
            late, offer solutions, or update the ETA. For flowers,
            a 2-day delay often means the gift arrives dead."
examples:  "955 tickets handed over · 312 reviews mentioning 'late'"
impact:    "$38K in delayed resolutions · 82.2% handover rate"
```

### ThreadsCard

| Ticket | Subject | Problem pattern |
|---|---|---|
| TK-49780332 | Anniversary flowers 2 days late | AI restates "in transit" (customer already knows), suggests checking tracking link they already checked |
| TK-49778891 | Mother's Day order stuck in transit | "Delivery times can vary" is dismissive when the occasion has passed |
| TK-49775644 | Funeral flowers delayed, service tomorrow | "Still being processed" after 4 days, no urgency, "I appreciate your patience" for a funeral |

### GuidanceDiffCard

| Before | After |
|---|---|
| No delay guidance exists. AI defaults to generic "Order Status" which only does tracking lookups. | WHEN/IF/THEN with delay tiers: transit delay (1-2 days → updated ETA + 15% credit), extended (3+ days → full credit or expedited reship), occasion passed (full refund + 20% bonus credit). Perishable note: 3+ day delay = treat as quality issue. |

**Impact line:** "~74% of delay tickets resolved without handover, ~710 fewer handovers/quarter"

### LiveEvalCard

```
name:          "eval-shipping-delay-v1"
skill:         "Shipping Delay"
focus:         "Delay-tier resolution"
totalTickets:  955
scorer:        "Resolution & Occasion Sensitivity"
```

### ScaleResultsCard

```
Before:  Accuracy 71 · Resolution 18 · Efficiency 38 · Overall 36
After:   Accuracy 90 · Resolution 79 · Efficiency 86 · Overall 85
```

### CorrectedExampleCard (TK-49780332)

```
Before:  "Your order is currently in transit. I recommend checking
          your tracking link. Let me connect you with our team..."
          → Handed over

After:   "I'm sorry your anniversary flowers didn't arrive on time.
          In transit 48hrs with no update — flowers are perishable,
          so I don't want you to receive a wilted arrangement.
          Full refund of $89.00 + 20% courtesy credit ($17.80).
          Want a fresh arrangement with next-day delivery at no cost?"
          → Resolved · 94
```

### AppliedCard

- Guidance created — Shipping Delay, with delay-tier logic + occasion awareness
- Actions configured — Credit, reship, expedited delivery linked to delay scenarios
- Monitor — Delay resolution rate, alerts below 65%
- Baseline — eval-shipping-delay-v1 (overall: 85)

---

## Flow 3: Subscription Management

### InsightCard

```
title:     "Subscriptions — skip/pause requests ending in cancellation"
severity:  "Medium"
stat:      "47 preventable cancellations"
detail:    "4 overlapping subscription guidances (skip, pause, cancel,
            resume) — most unlisted, none with working actions. When
            a subscriber asks to skip a delivery, the AI can't do it.
            Common fallback: customer cancels entirely. 47 subscribers
            who asked to skip/pause ended up canceling in 90 days."
examples:  "47 lost subscribers in 90 days"
impact:    "$14.1K annual revenue lost · 4 broken guidances"
```

### ThreadsCard

| Ticket | Subject | Problem pattern |
|---|---|---|
| TK-49781290 | Skip next month's delivery | Customer says "I don't want to cancel, just skip" — AI can't skip, hands over |
| TK-49779014 | Pause subscription for 2-3 months | AI suggests "cancel and re-subscribe later" as a workaround — this is how you lose subscribers |
| TK-49776102 | Change to every-other-month | AI says "I'm not able to make that change directly" for a standard operation |

### GuidanceDiffCard

| Before (4 overlapping, mostly unlisted) | After (1 unified) |
|---|---|
| Separate skip/pause/cancel/resume guidances with [Insert Action] placeholders. Skip guidance is unlisted. Pause has no steps. | Single guidance: identify intent → skip (action) / pause (action + resume date) / frequency change (action) / cancel (ask once, offer alternative, process if confirmed) / resume (action). Key rule: **never suggest "cancel and re-subscribe" for skip/pause.** |

**Impact line:** "~80% resolved without handover + ~35-40 prevented cancellations/quarter ($10-12K ARR saved)"

### LiveEvalCard

```
name:          "eval-subscription-mgmt-v1"
skill:         "Subscription Management"
focus:         "Resolution + churn prevention"
totalTickets:  198
scorer:        "Resolution & Retention"
```

### ScaleResultsCard

```
Before:  Accuracy 68 · Resolution 15 · Efficiency 42 · Overall 35
After:   Accuracy 93 · Resolution 82 · Efficiency 90 · Overall 88
```

### CorrectedExampleCard (TK-49779014)

```
Before:  "Let me transfer you to a team member who specializes in
          subscription management. In the meantime, if you'd like
          to cancel and re-subscribe later, you can do that from
          your account settings."
          → Handed over

After:   "I've paused your subscription starting now. Next delivery
          (Aug 3) is on hold. Auto-resumes October 1st — first
          delivery back around Oct 3-5. You'll get a reminder email
          a week before. If the remodel wraps up earlier, just let
          me know and I'll adjust. Enjoy the renovation!"
          → Resolved · 98
```

### AppliedCard

- Guidance published — Subscription Management, unified from 4 overlapping drafts
- Actions configured — Skip, pause, frequency change, cancel, resume
- Monitors — Resolution rate (alerts below 70%) + unintended cancellation rate (alerts if skip/pause → cancel exceeds 5/week)
- Baseline — eval-subscription-mgmt-v1 (overall: 88)

---

## Sidebar "Recents" for multi-flow prototype

If we wire all 4 flows into the prototype, the sidebar recents would show:

```
RECENTS
● Quality issue resolution        ← current (Flow 0, already built)
  Order cancellation flow          ← Flow 1
  Shipping delay resolution        ← Flow 2
  Subscription churn prevention    ← Flow 3
```

Clicking a different chat loads that flow's conversation script.

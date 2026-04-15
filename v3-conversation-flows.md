# V3 Prototype — Conversation Flows

3 additional insights + conversational evaluation flows, grounded in UrbanStems real data from the Gaia guidance audit. Each follows the same structure as the Quality Issue flow already built in v3.

---

## Flow 1: Order Cancellation — 89.8% handover rate

### Insight

> **Order cancellations — 89.8% handover rate**
>
> **Critical** · **715 unnecessary handovers**
>
> Cancel requests have the highest handover rate of any intent. The guidance exists but is **unlisted** — the AI literally can't see it. On top of that, no cancel action is configured. So even when a customer asks to cancel minutes after ordering, the AI escalates every time.
>
> 715 tickets handed over in the past 90 days · $28K in delayed resolutions · 89.8% handover rate vs 25.2% avg

**Follow-up:** "This one has the highest handover rate of any intent — nearly 9 in 10 cancel requests get escalated. The irony: the guidance already exists, it's just unpublished. Want to see what's happening?"

### Example tickets

**TK-49782104 · Cancel order — placed wrong address**
- **Shopper:** "I just placed order #19361002847 about 10 minutes ago and realized I put the wrong delivery address. Can I cancel it and reorder with the right address?"
- **AI Agent:** "I completely understand — wrong addresses happen! Unfortunately, I'm not able to process a cancellation at this time. Let me connect you with our team who can assist with this request. They'll be able to help get this sorted out for you!"
- **Issues:**
  - Order is only 10 minutes old and unfulfilled — easily cancelable
  - AI has no cancel action, so it escalates even the simplest case
  - Customer has to wait for a human for a 30-second task

**TK-49779558 · Want to cancel before it ships**
- **Shopper:** "Hi, I'd like to cancel my subscription order #19360445122. I just realized I already sent flowers to my mom last week. Don't want to double up."
- **AI Agent:** "I understand you'd like to cancel your order. I want to make sure we get this handled correctly for you. I'm going to forward this to our team right away so they can process the cancellation. You should hear back shortly!"
- **Issues:**
  - AI acknowledges intent but has no action to execute
  - "Forward to our team" = customer waits hours for a simple cancel
  - Pre-shipment cancels should be instant

**TK-49776890 · Changed my mind, want a refund**
- **Shopper:** "I ordered the Luxe Peony Bouquet 2 days ago but I've changed my mind. Can you cancel and refund my order?"
- **AI Agent:** "I appreciate you reaching out about your order. I understand plans can change! For order modifications or cancellations, I'd like to connect you with a team member who has the right tools to help. They'll review your order status and available options. Thank you for your patience!"
- **Issues:**
  - AI doesn't reference UrbanStems' "all sales final" policy
  - Doesn't check if order has shipped — different handling depending on status
  - Generic escalation instead of explaining the policy or exceptions

### Guidance diff

**Current (unlisted):**
"When a customer asks to cancel their order, check the order status. If the order has not been fulfilled, proceed with [Insert Action: Cancel Order]. If the order has been shipped, explain that we are unable to cancel shipped orders."

**Proposed:**
"**WHEN** a customer asks to cancel an order:

**1. Check order status** — Look up the order. Determine if it is: unfulfilled, in fulfillment, shipped, or delivered.

**2. Unfulfilled orders** — IF the order is unfulfilled AND placed within the last 1 hour, cancel immediately via cancel action. Confirm cancellation and let the customer know the refund will process in 3-5 business days.

**3. In fulfillment or shipped** — UrbanStems' policy is **all sales are final** once an order enters fulfillment. Explain this clearly and empathetically. Offer alternatives: redirect to a different address, or suggest the recipient can contact us for a store credit if unwanted.

**4. Edge cases** — IF the customer is canceling due to a wrong address on an unfulfilled order, cancel and help them reorder. IF the order is a subscription delivery, route to the Subscription Management guidance instead.

Do NOT hand over for straightforward cancel/policy explanation scenarios."

**Projected impact:** Estimated to resolve ~78% of cancel requests without handover, reducing handovers by ~560 per quarter.

### Eval (715 cancel tickets)

| Metric | Before | After |
|---|---|---|
| Accuracy | 62 | 94 |
| Resolution | 10 | 78 |
| Efficiency | 35 | 88 |
| **Overall** | **31** | **86** |

**Before distribution (skewed very low):** [22, 30, 18, 14, 8, 4, 2, 1, 0, 0]
**After distribution (shifted right):** [0, 0, 2, 3, 6, 10, 16, 24, 42, 38]

### Corrected example (TK-49782104)

**Before:**
"I completely understand — wrong addresses happen! Unfortunately, I'm not able to process a cancellation at this time. Let me connect you with our team who can assist with this request. They'll be able to help get this sorted out for you!"

**After:**
"No problem — I can see order #19361002847 was placed 10 minutes ago and hasn't entered fulfillment yet.

I've canceled the order. Your refund of $72.00 will process to your original payment method within 3-5 business days.

When you're ready to reorder with the correct address, you can place a new order and the delivery timeline will be the same. Let me know if you need any help with that."

**Resolution: 0 → 97**

### Applied

- **Guidance published** — Cancel an Order — published from unlisted with fulfillment-status logic and "all sales final" policy
- **Action configured** — Order cancellation action now live for unfulfilled orders
- **Monitor created** — Cancel request resolution rate — alerts if 7-day average drops below 70%
- **Eval baseline saved** — eval-cancel-order-v2 (overall: 86) set as regression baseline

**Follow-up:** "This should eliminate ~560 handovers per quarter on cancel requests. Plus, the clear policy explanation means fewer customers getting frustrated waiting for a human just to hear 'all sales are final.'"

---

## Flow 2: Shipping Delays — 82.2% handover rate

### Insight

> **Shipping delays — 82.2% handover rate**
>
> **High** · **955 unnecessary handovers**
>
> When tracking shows a delivery is late, the AI has no playbook. There's no delay-specific guidance — the AI can tell the customer their order is "in transit" but can't explain why it's late, offer proactive solutions, or update the expected delivery date. For a perishable product like flowers, a delay isn't just inconvenient — it often means the gift arrives dead.
>
> 955 tickets handed over in the past 90 days · 312 negative reviews mentioning "late" · 82.2% handover rate vs 25.2% avg

**Follow-up:** "Shipping delays are especially painful for flowers — a 2-day delay on a birthday bouquet can mean it arrives wilted. The AI currently has no way to handle these. Want to see how it's failing?"

### Example tickets

**TK-49780332 · Anniversary flowers 2 days late**
- **Shopper:** "I ordered flowers for my anniversary on Friday and they still haven't arrived. It's now Sunday. The tracking just says 'in transit' — what's going on? This was supposed to be a special surprise."
- **AI Agent:** "I understand your concern about the delayed delivery. Let me check on that for you. I can see your order is currently in transit. For the most up-to-date information, I recommend checking your tracking link. I'm going to connect you with our team who may have additional details about your delivery status."
- **Issues:**
  - AI restates what customer already knows ("in transit") — adds no value
  - Tells customer to check tracking link they already checked
  - Hands over instead of offering resolution (reship, credit, updated ETA)

**TK-49778891 · Mother's Day order stuck in transit**
- **Shopper:** "Order #19360112933 was supposed to arrive yesterday for Mother's Day. Tracking hasn't updated since Thursday. My mom didn't get her flowers. I need this resolved now."
- **AI Agent:** "I'm so sorry about this situation! I can see the tracking shows your order is in transit. Delivery times can sometimes vary due to carrier delays. I want to make sure we get this fully resolved for you, so I'm going to loop in our team who can look into the carrier status and next steps."
- **Issues:**
  - "Delivery times can vary" is dismissive when the occasion has passed
  - Doesn't acknowledge the Mother's Day context — irreversible situation
  - No proactive offer: credit, reship, or specific updated timeline

**TK-49775644 · Funeral flowers delayed — service is tomorrow**
- **Shopper:** "I ordered a sympathy arrangement 4 days ago for a funeral tomorrow and it hasn't shipped yet. Order #19359887201. This absolutely needs to be there by 10am. What can you do?"
- **AI Agent:** "Thank you for reaching out about your order. I can see it's still being processed at our facility. I understand this delivery is time-sensitive. Let me get you connected with our team who can provide the latest update and explore options. I appreciate your patience!"
- **Issues:**
  - "Still being processed" after 4 days needs explanation, not a handover
  - No urgency matching — "I appreciate your patience" is wrong for a funeral
  - Should offer immediate action: expedited shipping or local partner delivery

### Guidance diff

**Current:**
No delay-specific guidance exists. The AI defaults to the generic Order Status guidance, which only covers "where is my order" lookups. When tracking shows a delay, the AI hits a dead end.

**Proposed:**
"**WHEN** a customer contacts about a late or delayed delivery:

**1. Assess the delay** — Check order date, expected delivery, and last tracking update. Determine if the delay is: carrier transit delay (1-2 days), extended delay (3+ days with no tracking update), or stuck/lost (5+ days with no movement).

**2. Time-sensitive orders** — IF the customer mentions a specific occasion (birthday, funeral, anniversary, Mother's Day), acknowledge the emotional weight first. Check if the occasion has passed — if so, the arrangement likely has no value even if it arrives.

**3. Offer resolution by delay type:**
  - **Transit delay (1-2 days):** Provide updated ETA from carrier, apologize, offer 15% credit for inconvenience.
  - **Extended delay (3+ days):** Issue full credit OR arrange expedited reship with next-day delivery.
  - **Occasion passed:** Issue full refund + 20% bonus credit. Do not suggest the late delivery "still has value."

**4. Perishable product note** — Flowers delayed 3+ days in transit should be treated as a quality issue. The customer will likely receive wilted product. Proactively offer reship or credit.

Do NOT hand over unless the carrier investigation requires internal warehouse coordination."

**Projected impact:** Estimated to resolve ~74% of delay tickets without handover, reducing handovers by ~710 per quarter.

### Eval (955 delay tickets)

| Metric | Before | After |
|---|---|---|
| Accuracy | 71 | 90 |
| Resolution | 18 | 79 |
| Efficiency | 38 | 86 |
| **Overall** | **36** | **85** |

**Before distribution:** [14, 24, 26, 18, 10, 4, 2, 1, 0, 0]
**After distribution:** [0, 0, 1, 4, 6, 10, 18, 26, 44, 36]

### Corrected example (TK-49780332)

**Before:**
"I understand your concern about the delayed delivery. Let me check on that for you. I can see your order is currently in transit. For the most up-to-date information, I recommend checking your tracking link. I'm going to connect you with our team who may have additional details about your delivery status."

**After:**
"I'm sorry your anniversary flowers didn't arrive on time — I know how important that was.

I can see order #19360298104 has been in transit since Friday with no tracking update in 48 hours. Given the delay and that flowers are perishable, I don't want you to receive a wilted arrangement.

I've issued a full refund of $89.00 and a 20% courtesy credit ($17.80) toward your next order. If you'd still like to send flowers, I can arrange a fresh arrangement with next-day delivery at no additional cost — just let me know."

**Resolution: 0 → 94**

### Applied

- **Guidance created** — Shipping Delay — new guidance with delay-tier resolution logic and occasion-aware handling
- **Actions configured** — Credit issuance, reship, and expedited delivery actions now linked to delay scenarios
- **Monitor created** — Shipping delay resolution rate — alerts if 7-day average drops below 65%
- **Eval baseline saved** — eval-shipping-delay-v1 (overall: 85) set as regression baseline

**Follow-up:** "This should eliminate ~710 handovers per quarter on shipping delays — and more importantly, customers with time-sensitive orders get immediate help instead of a tracking link they already checked."

---

## Flow 3: Subscription Management — causing unintended churn

### Insight

> **Subscription management — skip/pause requests ending in cancellation**
>
> **Medium** · **8 unintended cancellations per week**
>
> The AI has separate guidances for skip, pause, cancel, and resume — but they overlap, some are unlisted, and none have working actions. When a subscriber asks to skip a delivery or pause their subscription, the AI can't do it. The most common fallback: the customer gives up and cancels entirely. Over the past 90 days, 47 subscribers who initially asked to skip or pause ended up canceling — that's $14,100 in lost annual recurring revenue.
>
> 47 preventable cancellations in 90 days · $14.1K annual revenue lost · 4 overlapping guidances with no actions

**Follow-up:** "This one is about revenue protection, not just handover rate. Every subscriber who wants to skip but ends up canceling is ~$300/year in lost revenue. Want to see how it's happening?"

### Example tickets

**TK-49781290 · Skip next month's delivery**
- **Shopper:** "Hey, I'm going on vacation next month and won't be home. Can I skip my July delivery? I don't want to cancel, just skip one month."
- **AI Agent:** "Thank you for reaching out about your subscription! I understand you'd like to make a change to your upcoming delivery. To make sure this is handled correctly, I'm going to connect you with our subscription team who can adjust your delivery schedule. They'll be able to help you out!"
- **Issues:**
  - Customer explicitly says "don't want to cancel, just skip" — the simplest request
  - AI can't execute a skip — no action configured
  - "Subscription team" handover adds days of delay for a one-click operation

**TK-49779014 · Pause subscription for a few months**
- **Shopper:** "I need to pause my flower subscription for about 2-3 months — I'm remodeling my kitchen and there's nowhere to put arrangements right now. I want to restart in October. Can you do that?"
- **AI Agent:** "I appreciate you letting us know! I understand you'd like to temporarily pause your subscription. I want to make sure we handle this properly. Let me transfer you to a team member who specializes in subscription management.\n\nIn the meantime, if you'd like to cancel and re-subscribe later, you can do that from your account settings."
- **Issues:**
  - AI suggests canceling as a workaround — this is how you lose subscribers
  - "Cancel and re-subscribe later" = customer probably never comes back
  - A pause is a 2-click operation that should be handled instantly

**TK-49776102 · Change subscription frequency**
- **Shopper:** "I love my monthly subscription but every month feels like too much. Can I switch to every other month instead? Account email is sarah.m@email.com."
- **AI Agent:** "I'm glad you're enjoying your subscription! That's a great idea to adjust the frequency. Unfortunately, I'm not able to make that change directly. I'll connect you with our team who can update your subscription settings.\n\nThank you for being a loyal subscriber!"
- **Issues:**
  - AI is enthusiastic but helpless — "I'm not able to make that change directly"
  - Frequency change is a standard subscription operation
  - Customer gave account info proactively, AI still can't act on it

### Guidance diff

**Current (4 separate, overlapping, mostly unlisted):**
"Cancel subscription: When a customer requests to cancel their subscription, ask for the reason and attempt to retain. [Insert Action: Cancel Subscription]. Offer alternatives like pausing or adjusting frequency.\n\nPause subscription: If the customer wants to pause, [Insert Action: Pause Subscription]. Confirm the pause duration.\n\nSkip delivery: [this guidance is unlisted and contains no actionable steps]\n\nResume subscription: [this guidance is unlisted and contains only a placeholder]"

**Proposed (1 unified guidance):**
"**WHEN** a customer contacts about any subscription change (skip, pause, cancel, resume, or modify):

**1. Identify the intent** — Determine what the subscriber actually wants: skip a single delivery, pause for a set period, change frequency, update payment/address, cancel, or resume.

**2. Skip a delivery** — IF the customer wants to skip 1-2 upcoming deliveries, skip immediately via the skip action. Confirm which delivery dates are skipped and when the next one will resume.

**3. Pause** — IF the customer wants to pause for a defined period (1-6 months), pause via the pause action and confirm the resume date. Do NOT suggest canceling as an alternative.

**4. Change frequency** — IF the customer wants to switch frequency (weekly ↔ biweekly ↔ monthly), update via the frequency action. Confirm the new schedule and next delivery date.

**5. Cancel** — IF the customer explicitly wants to cancel, ask why (once, not repeatedly). Offer a relevant alternative based on their reason: too frequent → suggest frequency change; too expensive → offer a smaller arrangement tier; going away → offer skip/pause. If they still want to cancel, process immediately. Do NOT try to retain more than once.

**6. Resume** — IF the customer wants to restart a paused or canceled subscription, resume immediately and confirm the next delivery date.

Never suggest 'cancel and re-subscribe later' as a workaround for skip or pause. This loses subscribers."

**Projected impact:** Estimated to resolve ~80% of subscription tickets without handover and prevent ~35-40 unintended cancellations per quarter ($10-12K annual revenue saved).

### Eval (198 subscription tickets from past 90 days)

| Metric | Before | After |
|---|---|---|
| Accuracy | 68 | 93 |
| Resolution | 15 | 82 |
| Efficiency | 42 | 90 |
| **Overall** | **35** | **88** |

**Before distribution:** [16, 22, 24, 18, 10, 6, 2, 1, 0, 0]
**After distribution:** [0, 0, 1, 2, 5, 8, 16, 28, 46, 40]

### Corrected example (TK-49779014)

**Before:**
"I appreciate you letting us know! I understand you'd like to temporarily pause your subscription. I want to make sure we handle this properly. Let me transfer you to a team member who specializes in subscription management.

In the meantime, if you'd like to cancel and re-subscribe later, you can do that from your account settings."

**After:**
"No problem at all — I've paused your subscription starting now. Your next delivery would have been August 3rd; that's now on hold.

I've set it to automatically resume on October 1st, so your first delivery back will arrive around October 3-5. You'll get a reminder email a week before it resumes.

If your remodel wraps up earlier or later, just let me know and I'll adjust the resume date. Enjoy the renovation!"

**Resolution: 0 → 98**

### Applied

- **Guidance published** — Subscription Management — unified guidance replacing 4 overlapping drafts, with skip/pause/cancel/resume/modify logic
- **Actions configured** — Skip delivery, pause subscription, change frequency, cancel, and resume actions all now live
- **Monitor created** — Two monitors: subscription resolution rate (alerts below 70%) and unintended cancellation rate (alerts if skip/pause → cancel conversions exceed 5/week)
- **Eval baseline saved** — eval-subscription-mgmt-v1 (overall: 88) set as regression baseline

**Follow-up:** "This should prevent ~35-40 unintended cancellations per quarter — subscribers who want to skip or pause will actually get what they asked for instead of being pushed toward cancel. That's ~$12K in annual revenue protected."

---

## Summary: Combined impact of all 3 flows

| Flow | Tickets | Handover reduction | Revenue impact |
|---|---|---|---|
| Order Cancellation | 715 | ~560/quarter | $28K faster resolution |
| Shipping Delays | 955 | ~710/quarter | 312 negative reviews prevented |
| Subscription Management | 198 | ~160/quarter + 35-40 saved cancellations | ~$12K ARR protected |
| **Combined** | **1,868** | **~1,430/quarter** | **$40K+ quarterly** |

Adding these to the Quality Issue flow (1,502 tickets, ~1,260 handover reduction), the 4 flows together address **3,370 tickets** — covering the top handover drivers and an estimated **~2,690 fewer handovers per quarter**.

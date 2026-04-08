# Brief: Journey 4 — Evaluation at Scale
**Owner:** Natasha
**Timeline:** Week 7

---

## Context

This is the climax of the story and the competitive moat. The first three journeys show what the agent does — every competitor ships some version of that. This journey shows how the agent gets better on its own.

The frequency cancellation seed from the Week 3 digest has matured. The agent has now read 89 cancellation conversations, found a pattern, and proposes an improvement. The journey has three stages: insight → offline evaluation at scale → live A/B test.

**Framing for Romain/Max:** "Last time you saw the experiment concept (v7/v8). Now you're seeing the full pipeline that makes experiments possible — including offline eval at scale, custom scorers, and agent self-critique."

## Metrics Used

| Metric | Definition | Role in this journey |
|---|---|---|
| Adherence | Is the agent following its skill instructions? | Primary — especially in offline eval (is the new version executing correctly?) |
| Success Rate | Was the ticket fully automated? (billed / covered) | Primary — did the agent handle it without humans? |
| Coverage Rate | What share of tickets is the agent handling? | Primary — can it handle the cancel flow end-to-end? |
| Customer Satisfaction | AI-derived from 100% of conversations | Quality — how do customers feel about the interaction? |

## Story Beats

### Part 1: The Insight

1. **Post-peak analysis.** Mother's Day is over. The agent has reviewed 89 cancellation conversations. It surfaces the frequency pattern.

2. **The data.** 35% of cancellations (31 of 89) contained frequency language. Signal phrases: "too many/too often" (14), "can't keep up" (8), "every week/biweekly is too much" (6), "overwhelming/piling up" (3). These customers aren't product-dissatisfied — they're cadence-dissatisfied. Current Cancel Subscription skill treats all cancellations identically. It confirms and cancels.

3. **Example tickets with highlighted language.** Show 2-3 real conversations. Key example:
   - Lena Morrison: "I love the flowers honestly but every two weeks is just too much for me. They're piling up."
   - Current agent response: "I've processed your cancellation effective immediately."
   - Proposed response: "I hear you — every two weeks can be a lot! Would you like to try every 3 weeks or monthly? Or if you'd prefer to cancel, I'm happy to do that too."

### Part 2: Offline Evaluation — Testing at Scale

4. **The agent proposes testing before going live.** "Before we put this in front of real customers, I can test it against historical tickets."

5. **847 historical tickets evaluated.** The agent replays every subscription conversation from the past 3 months through the new instructions.
   - Adherence: 94% (798/847)
   - 312 correctly identified as frequency-related → offered schedule change
   - 486 correctly identified as non-frequency → processed normally
   - 49 edge cases (6%)

6. **Maya reviews the 3 riskiest edge cases:**
   - "This is just too much for my budget" → "too much" = price, not frequency
   - "I called last month about switching to monthly" → already attempted, offering again is repetitive
   - "I'm getting way too many emails from you" → marketing emails, not deliveries

7. **Maya adjusts instructions, agent re-runs.** Adherence → 97%, edge cases 49 → 12, false detections 23 → 4.

### Part 3: A/B Test

8. **Custom scorers.** Before launching, Maya adds qualitative criteria:
   - "Tone — helpful suggestion, not a save gate" (customer should feel they can say no)
   - "Accuracy — only flag real frequency complaints" (don't trigger on price/quality)
   The agent evaluates every conversation against these and reports pass/fail rates.

9. **A/B test launched.** Variant A: frequency-aware. Variant B: current skill. 50/50, 3 weeks.

10. **Results.** Variant A wins:
    - Adherence: 96%
    - Success Rate: 93%
    - Coverage Rate: 97%
    - Customer Satisfaction: 4.5/5
    - Subscriptions saved: 8 of 27 frequency-identified (30%)
    - Revenue retained: $416/mo (vs. $0 before)
    - 30-day re-cancel: 12% (1 of 8)
    - Custom scorer — Tone: 94% pass
    - Custom scorer — Accuracy: 91% pass

11. **Agent self-critique.** 3 misclassifications. Worst: "too many wilted flowers" = quality complaint, not frequency. Agent offered schedule change when it should have routed to Delivery Issues. Proposes follow-up experiment on detection accuracy.

## Shared Constraints

**Navigation:** Home · Inbox · Skills · Knowledge · Performance · Settings
**Copilot:** Left panel
**This journey lives in:** Performance (which contains Analytics + Experiments + Offline Eval)
**Merchant:** UrbanStems — post Mother's Day, volume normalizing
**Key characters:** Maya Torres (protagonist), Lena Morrison and James Okafor (cancellation ticket examples)

## What Makes This the Moat

- The agent reads thousands of conversations and finds patterns humans miss
- Offline eval lets you test at scale without risking real customers
- Custom scorers let merchants add qualitative evaluation alongside standard metrics
- The agent self-critiques — it tells you what it got wrong and proposes to improve
- The full loop (insight → offline eval → A/B test → self-critique → next experiment) is continuous

## What to Avoid

- Don't use "save rate" as a metric name — show "subscriptions saved: 8 of 27" as an outcome
- Don't use "Merchant Quality Rate" or "CSAT" — use "Customer Satisfaction" (AI-derived from 100% of conversations)
- Don't make the numbers too optimistic — 30% acceptance is realistic, 60% is not
- Don't skip the failure moments — the edge cases and self-critique are what make this credible
- Adherence is NOT the optimization target in experiments — it's the guardrail ("is the variant executing correctly?")

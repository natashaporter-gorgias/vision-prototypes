// Gorgias AI Agent — Vision v3: Conversational Evaluation
// Inspired by Sierra's "Agents as a Service" — prompts, not clicks
const { useState, useEffect, useRef } = React;

// ─── Axiom Design Tokens ───
const t = {
  pageBg: "#f6f7f9",
  surface: "#ffffff",
  surfaceMuted: "#f6f7f9",
  surfaceInset: "#ebedf1",
  surfaceTertiary: "#dfe2e7",
  sidebarBg: "#ffffff",
  sidebarText: "#5f6672",
  sidebarTextActive: "#5b3fc4",
  sidebarActiveBg: "#f1ecff",
  sidebarAccent: "#7c5cfc",
  sidebarHover: "#f6f7f9",
  sidebarDivider: "#ebedf1",
  border: "#00000014",
  text900: "#1e242e",
  text700: "#5f6672",
  text500: "#828994",
  text400: "#a4aab3",
  text300: "#c8ccd2",
  brand: "#1e242e",
  brandText: "#ffffff",
  accent: "#7c5cfc",
  accentLight: "#f1ecff",
  accentText: "#5b3fc4",
  green: "#1a7a5a",
  greenBg: "#e9fbf5",
  greenBorder: "#6dd4a8",
  red: "#c4314b",
  redBg: "#ffecef",
  amber: "#b35c00",
  amberBg: "#fff5ee",
  amberBorder: "#ffa54c",
  blue: "#3b6fcf",
  blueBg: "#f5f9ff",
};

// ─── Conversation Data ───
// Pre-scripted conversation that plays out step by step
const conversationScript = [
  // === SECTION 1: User asks how things are going ===
  {
    role: "user",
    text: "How is Order Support performing this week?",
  },
  {
    role: "agent",
    text: "I analyzed 847 conversations from the past 7 days for the **Order Support** skill. Here's the overview:",
    card: {
      type: "scorecard",
      data: {
        title: "Order Support — Weekly Performance",
        period: "Mar 20–27, 2026",
        conversations: 847,
        scores: [
          { label: "Accuracy", value: 94, delta: +2, prev: 92 },
          { label: "Brand voice", value: 88, delta: -1, prev: 89 },
          { label: "Resolution", value: 91, delta: +3, prev: 88 },
          { label: "Overall", value: 91, delta: +1, prev: 90 },
        ],
        status: "Passed",
      },
    },
    followUp: "Overall score is **91** (up from 90 last week). Resolution improved nicely (+3), but I flagged one issue worth looking at — answer completeness dropped on multi-question messages. Want me to dig into that?",
  },

  // === SECTION 2: User asks to dig in ===
  {
    role: "user",
    text: "Yes, show me what's happening with the multi-question issue.",
  },
  {
    role: "agent",
    text: "I found **47 conversations** this week where shoppers asked multiple questions in a single message, but the agent only answered the first one. Here are three examples:",
    card: {
      type: "threads",
      data: [
        {
          id: "TK-29481",
          subject: "Pet-safe bouquet + delivery timing + hospital delivery",
          messages: [
            { sender: "customer", text: "Is this bouquet pet-safe? Can it arrive by Friday? Can you deliver to a hospital?" },
            { sender: "agent", text: "Great question! Yes, the Spring Meadow bouquet is completely pet-safe — no lilies, no toxic stems. Your furry friends are safe! 🌿\n\nIs there anything else I can help with?" },
          ],
          missed: ["Delivery timing (Friday)", "Hospital delivery policy"],
          accuracy: 62,
          brand: 91,
          resolution: 45,
        },
        {
          id: "TK-29503",
          subject: "Change address + cancel add-on vase",
          messages: [
            { sender: "customer", text: "I need to change my delivery address AND cancel the add-on vase I added." },
            { sender: "agent", text: "No problem! I've updated your delivery address to the new one on file. The change will take effect for your next delivery.\n\nIs there anything else?" },
          ],
          missed: ["Vase cancellation not addressed"],
          accuracy: 71,
          brand: 88,
          resolution: 50,
        },
        {
          id: "TK-29519",
          subject: "Subscription skip + promo code question",
          messages: [
            { sender: "customer", text: "Can I skip next month's delivery? Also, is the SPRING20 promo still active?" },
            { sender: "agent", text: "Absolutely! I've skipped your April delivery. Your subscription will resume on May 2nd.\n\nEnjoy your break! 🌸" },
          ],
          missed: ["Promo code inquiry not addressed"],
          accuracy: 78,
          brand: 93,
          resolution: 55,
        },
      ],
    },
    followUp: "The pattern is clear: when shoppers bundle multiple requests, the agent answers the **first** (usually highest-confidence) question and drops the rest. Brand voice stays strong, but resolution craters because the customer has to follow up.",
  },

  // === SECTION 3: User asks to run a focused eval ===
  {
    role: "user",
    text: "Run an eval on these multi-question conversations. Use the Rushed Gift-Giver persona.",
  },
  {
    role: "agent",
    text: "Starting evaluation now.",
    card: {
      type: "eval_config",
      data: {
        name: "eval-044",
        skill: "Order Support",
        focus: "Multi-question messages",
        tickets: 47,
        scorer: "The Rushed Gift-Giver",
        scorerDesc: "Impatient, needs fast answers about delivery timing. Judges speed, clarity, and proactive alternatives.",
      },
    },
    followUp: null,
  },
  {
    role: "agent",
    text: null,
    card: {
      type: "eval_progress",
      data: { progress: 100, name: "eval-044" },
    },
    followUp: null,
  },
  {
    role: "agent",
    text: "Evaluation complete. Here are the results:",
    card: {
      type: "eval_results",
      data: {
        name: "eval-044",
        status: "Failed",
        tickets: 47,
        scores: [
          { label: "Accuracy", value: 68, delta: -26 },
          { label: "Brand voice", value: 90, delta: +2 },
          { label: "Resolution", value: 52, delta: -39 },
          { label: "Overall", value: 70, delta: -21 },
        ],
        verdict: "The Rushed Gift-Giver was especially harsh on resolution — \"I asked three questions. I got one answer. Now I have to message again. This is exactly the kind of back-and-forth that makes me switch to a competitor.\"",
      },
    },
    followUp: "The agent's **brand voice is fine** (90) — it sounds like UrbanStems. But on multi-question messages, accuracy (68) and resolution (52) tank. The persona flagged 38 of 47 conversations as requiring a follow-up from the shopper.\n\nWant me to suggest a fix?",
  },

  // === SECTION 4: Fix suggestion ===
  {
    role: "user",
    text: "Yes, what would fix this?",
  },
  {
    role: "agent",
    text: "Here's what I'd change in the Order Support guidance:",
    card: {
      type: "guidance_diff",
      data: {
        before: "Answer the customer's question clearly and concisely. Use a warm, helpful tone that matches the UrbanStems brand.",
        after: "When a message contains **multiple questions or requests**, acknowledge all of them before answering. Address each one in order of priority. If you can't resolve one immediately, say so and explain next steps.\n\nAnswer each question clearly and concisely. Use a warm, helpful tone that matches the UrbanStems brand.",
        impact: "Based on pattern analysis, this should resolve ~73% of affected conversations (34 of 47).",
      },
    },
    followUp: "This adds a multi-question handling rule at the top of the guidance. Want me to apply this and re-run the eval to see the projected improvement?",
  },

  // === SECTION 5: Apply and re-run ===
  {
    role: "user",
    text: "Apply it and re-run.",
  },
  {
    role: "agent",
    text: "Guidance updated. Re-running evaluation with the fix applied...",
    card: {
      type: "eval_progress",
      data: { progress: 100, name: "eval-044b" },
    },
    followUp: null,
  },
  {
    role: "agent",
    text: "Re-evaluation complete. The improvement is significant:",
    card: {
      type: "eval_comparison",
      data: {
        before: { name: "eval-044", overall: 70, accuracy: 68, brand: 90, resolution: 52, status: "Failed" },
        after: { name: "eval-044b", overall: 89, accuracy: 91, brand: 89, resolution: 87, status: "Passed" },
      },
    },
    followUp: "Overall went from **70 → 89** (now passing). Resolution jumped from 52 → 87 — the agent now acknowledges all questions upfront before answering each one. The Rushed Gift-Giver's verdict: *\"Much better. I got all three answers without having to ask again.\"*\n\nThe fix is live. I'll monitor over the next 48 hours and flag if anything regresses.",
  },

  // === SECTION 6: Explorer-style insight ===
  {
    role: "user",
    text: "What else should I be looking at this week?",
  },
  {
    role: "agent",
    text: "I scanned all 2,341 conversations from the past 7 days across all skills. Three things stood out:",
    card: {
      type: "insights",
      data: [
        {
          priority: "High",
          title: "Sympathy gifting demand spike (+340%)",
          detail: "Sympathy-related orders jumped 340% this week. The agent handles logistics well but struggles with tone — 12 conversations flagged where the response felt too cheerful for the context.",
          team: "Brand & Content",
          impact: "$18K estimated revenue at risk",
        },
        {
          priority: "Medium",
          title: "Subscription confusion: skip vs. cancel",
          detail: "23 subscribers asked to \"pause\" or \"skip\" but used language that triggered cancellation flows. 8 actually churned when they only wanted to skip a month.",
          team: "Product & CX",
          impact: "8 unintended cancellations ($640 MRR)",
        },
        {
          priority: "Low",
          title: "SPRING20 promo code expired but still referenced",
          detail: "14 customers asked about the SPRING20 promo which expired March 15. The agent correctly says it's expired but doesn't suggest the active BLOOM25 code.",
          team: "Marketing",
          impact: "Potential conversion loss on 14 orders",
        },
      ],
    },
    followUp: "The sympathy gifting tone issue is the biggest risk. Want me to run an eval on sympathy conversations, or would you rather explore one of the other insights?",
  },
];

// ─── Score color helper ───
const scoreColor = (s) => s >= 85 ? t.green : s >= 70 ? t.amber : t.red;
const scoreBg = (s) => s >= 85 ? t.greenBg : s >= 70 ? t.amberBg : t.redBg;
const deltaColor = (d) => d > 0 ? t.green : d < 0 ? t.red : t.text500;

// ─── Card Components ───

const ScorecardCard = ({ data }) => (
  <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "12px", overflow: "hidden", marginTop: "12px" }}>
    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.sidebarDivider}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{data.title}</div>
        <div style={{ fontSize: "12px", color: t.text500, marginTop: "2px" }}>{data.period} · {data.conversations.toLocaleString()} conversations</div>
      </div>
      <span style={{ backgroundColor: data.status === "Passed" ? t.greenBg : t.redBg, color: data.status === "Passed" ? t.green : t.red, fontSize: "12px", fontWeight: "600", padding: "4px 12px", borderRadius: "6px" }}>{data.status}</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: t.sidebarDivider }}>
      {data.scores.map((s, i) => (
        <div key={i} style={{ backgroundColor: t.surface, padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: t.text500, marginBottom: "6px" }}>{s.label}</div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: scoreColor(s.value) }}>{s.value}</div>
          <div style={{ fontSize: "12px", color: deltaColor(s.delta), marginTop: "4px" }}>
            {s.delta > 0 ? "↑" : s.delta < 0 ? "↓" : "="} {Math.abs(s.delta)} vs last week
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ThreadsCard = ({ data }) => {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.map((thread, i) => (
        <div key={thread.id} style={{ backgroundColor: t.surface, border: `1px solid ${expanded === i ? t.accent : t.sidebarDivider}`, borderRadius: "10px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.15s" }} onClick={() => setExpanded(expanded === i ? null : i)}>
          <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: t.accentText, fontFamily: "monospace" }}>{thread.id}</span>
              <span style={{ fontSize: "14px", color: t.text900 }}>{thread.subject}</span>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: scoreColor(thread.accuracy), fontWeight: "600" }}>Acc {thread.accuracy}</span>
              <span style={{ fontSize: "12px", color: scoreColor(thread.resolution), fontWeight: "600" }}>Res {thread.resolution}</span>
              <span style={{ fontSize: "14px", color: t.text400, transform: expanded === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
            </div>
          </div>
          {expanded === i && (
            <div style={{ borderTop: `1px solid ${t.sidebarDivider}`, padding: "16px" }}>
              {thread.messages.map((msg, mi) => (
                <div key={mi} style={{ padding: "12px 14px", borderRadius: "10px", marginBottom: "8px", backgroundColor: msg.sender === "customer" ? t.surfaceMuted : t.accentLight, maxWidth: "92%" , marginLeft: msg.sender === "agent" ? "auto" : 0 }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", color: msg.sender === "customer" ? t.text500 : t.accentText }}>{msg.sender === "customer" ? "Shopper" : "AI Agent"}</div>
                  <div style={{ fontSize: "14px", lineHeight: "1.6", color: t.text900, whiteSpace: "pre-line" }}>{msg.text}</div>
                </div>
              ))}
              <div style={{ backgroundColor: t.redBg, border: `1px solid #f5c6cb`, borderRadius: "8px", padding: "12px 14px", marginTop: "4px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: t.red, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Missed</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {thread.missed.map((m, mi) => (
                    <span key={mi} style={{ backgroundColor: "#ffffff", border: `1px solid #f5c6cb`, borderRadius: "6px", padding: "4px 10px", fontSize: "13px", color: t.red }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const EvalConfigCard = ({ data }) => (
  <div style={{ backgroundColor: t.accentLight, border: `1px solid ${t.accent}33`, borderRadius: "10px", padding: "16px 18px", marginTop: "12px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: t.accent, animation: "pulse 1.5s infinite" }} />
      <span style={{ fontSize: "14px", fontWeight: "600", color: t.accentText }}>Starting evaluation: {data.name}</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
      {[
        ["Skill", data.skill],
        ["Focus", data.focus],
        ["Tickets", `${data.tickets} conversations`],
        ["Scorer", data.scorer],
      ].map(([label, value], i) => (
        <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px" }}>
          <span style={{ color: t.text500, minWidth: "60px" }}>{label}</span>
          <span style={{ color: t.text900, fontWeight: "500" }}>{value}</span>
        </div>
      ))}
    </div>
    <div style={{ fontSize: "12px", color: t.text500, marginTop: "10px", fontStyle: "italic" }}>{data.scorerDesc}</div>
  </div>
);

const EvalProgressCard = ({ data }) => (
  <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "10px", padding: "16px 18px", marginTop: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
      <span style={{ fontSize: "13px", fontWeight: "600", color: t.text900 }}>{data.name}</span>
      <span style={{ fontSize: "13px", fontWeight: "500", color: data.progress >= 100 ? t.green : t.accentText }}>
        {data.progress >= 100 ? "✓ Complete" : `${data.progress}%`}
      </span>
    </div>
    <div style={{ height: "6px", backgroundColor: t.surfaceInset, borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${data.progress}%`, background: data.progress >= 100 ? t.green : `linear-gradient(90deg, ${t.accent}, #a78bfa)`, borderRadius: "3px", transition: "width 0.6s ease" }} />
    </div>
  </div>
);

const EvalResultsCard = ({ data }) => (
  <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "12px", overflow: "hidden", marginTop: "12px" }}>
    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.sidebarDivider}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{data.name} — Results</span>
      <span style={{ backgroundColor: data.status === "Passed" ? t.greenBg : t.redBg, color: data.status === "Passed" ? t.green : t.red, fontSize: "12px", fontWeight: "600", padding: "4px 12px", borderRadius: "6px" }}>{data.status}</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: t.sidebarDivider }}>
      {data.scores.map((s, i) => (
        <div key={i} style={{ backgroundColor: t.surface, padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: t.text500, marginBottom: "6px" }}>{s.label}</div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: scoreColor(s.value) }}>{s.value}</div>
          <div style={{ fontSize: "12px", color: deltaColor(s.delta), marginTop: "4px" }}>
            {s.delta > 0 ? "↑" : "↓"} {Math.abs(s.delta)} vs baseline
          </div>
        </div>
      ))}
    </div>
    {data.verdict && (
      <div style={{ padding: "14px 20px", borderTop: `1px solid ${t.sidebarDivider}`, backgroundColor: t.surfaceMuted }}>
        <div style={{ fontSize: "11px", fontWeight: "600", color: t.text500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Scorer verdict</div>
        <div style={{ fontSize: "14px", color: t.text700, lineHeight: "1.6", fontStyle: "italic" }}>"{data.verdict}"</div>
      </div>
    )}
  </div>
);

const GuidanceDiffCard = ({ data }) => (
  <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "12px", overflow: "hidden", marginTop: "12px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: t.sidebarDivider }}>
      <div style={{ backgroundColor: "#fff5f5", padding: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: "600", color: t.red, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Before</div>
        <div style={{ fontSize: "13px", color: t.text700, lineHeight: "1.6" }}>{data.before}</div>
      </div>
      <div style={{ backgroundColor: "#f0fdf4", padding: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: "600", color: t.green, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>After</div>
        <div style={{ fontSize: "13px", color: t.text700, lineHeight: "1.6" }} dangerouslySetInnerHTML={{ __html: data.after.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      </div>
    </div>
    <div style={{ padding: "12px 16px", borderTop: `1px solid ${t.sidebarDivider}`, backgroundColor: t.greenBg }}>
      <div style={{ fontSize: "13px", color: t.green, fontWeight: "500" }}>↗ {data.impact}</div>
    </div>
  </div>
);

const EvalComparisonCard = ({ data }) => (
  <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "12px", overflow: "hidden", marginTop: "12px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0", alignItems: "stretch" }}>
      {/* Before */}
      <div style={{ padding: "16px", textAlign: "center", backgroundColor: "#fff8f8" }}>
        <div style={{ fontSize: "12px", fontWeight: "600", color: t.red, marginBottom: "8px" }}>{data.before.name} — {data.before.status}</div>
        <div style={{ fontSize: "36px", fontWeight: "700", color: t.red }}>{data.before.overall}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "8px" }}>
          {["accuracy", "brand", "resolution"].map(k => (
            <div key={k} style={{ fontSize: "12px", color: t.text500 }}>
              <span style={{ textTransform: "capitalize" }}>{k.slice(0, 3)}</span>{" "}
              <span style={{ fontWeight: "600", color: scoreColor(data.before[k]) }}>{data.before[k]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Arrow */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", backgroundColor: t.surface }}>
        <span style={{ fontSize: "24px", color: t.green }}>→</span>
      </div>
      {/* After */}
      <div style={{ padding: "16px", textAlign: "center", backgroundColor: "#f0fdf4" }}>
        <div style={{ fontSize: "12px", fontWeight: "600", color: t.green, marginBottom: "8px" }}>{data.after.name} — {data.after.status}</div>
        <div style={{ fontSize: "36px", fontWeight: "700", color: t.green }}>{data.after.overall}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "8px" }}>
          {["accuracy", "brand", "resolution"].map(k => (
            <div key={k} style={{ fontSize: "12px", color: t.text500 }}>
              <span style={{ textTransform: "capitalize" }}>{k.slice(0, 3)}</span>{" "}
              <span style={{ fontWeight: "600", color: scoreColor(data.after[k]) }}>{data.after[k]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const InsightsCard = ({ data }) => {
  const [expanded, setExpanded] = useState(null);
  const priorityColor = { High: t.red, Medium: t.amber, Low: t.blue };
  const priorityBg = { High: t.redBg, Medium: t.amberBg, Low: t.blueBg };
  return (
    <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.map((ins, i) => (
        <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${expanded === i ? t.accent : t.sidebarDivider}`, borderRadius: "10px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.15s" }} onClick={() => setExpanded(expanded === i ? null : i)}>
          <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ backgroundColor: priorityBg[ins.priority], color: priorityColor[ins.priority], fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px" }}>{ins.priority}</span>
              <span style={{ fontSize: "14px", fontWeight: "500", color: t.text900 }}>{ins.title}</span>
            </div>
            <span style={{ fontSize: "14px", color: t.text400, transform: expanded === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
          </div>
          {expanded === i && (
            <div style={{ borderTop: `1px solid ${t.sidebarDivider}`, padding: "14px 16px" }}>
              <div style={{ fontSize: "14px", color: t.text700, lineHeight: "1.6", marginBottom: "10px" }}>{ins.detail}</div>
              <div style={{ display: "flex", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: t.text500 }}>Route to: <strong style={{ color: t.accentText }}>{ins.team}</strong></span>
                <span style={{ fontSize: "12px", color: t.amber, fontWeight: "500" }}>{ins.impact}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Render a card by type ───
const RenderCard = ({ card }) => {
  if (!card) return null;
  switch (card.type) {
    case "scorecard": return <ScorecardCard data={card.data} />;
    case "threads": return <ThreadsCard data={card.data} />;
    case "eval_config": return <EvalConfigCard data={card.data} />;
    case "eval_progress": return <EvalProgressCard data={card.data} />;
    case "eval_results": return <EvalResultsCard data={card.data} />;
    case "guidance_diff": return <GuidanceDiffCard data={card.data} />;
    case "eval_comparison": return <EvalComparisonCard data={card.data} />;
    case "insights": return <InsightsCard data={card.data} />;
    default: return null;
  }
};

// ─── Markdown-light renderer ───
const renderText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ fontWeight: "600", color: t.text900 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

// ─── Chat Message Component ───
const ChatMessage = ({ msg, isTyping }) => {
  if (msg.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <div style={{ maxWidth: "72%", backgroundColor: t.brand, color: t.brandText, borderRadius: "18px 18px 4px 18px", padding: "12px 18px", fontSize: "14px", lineHeight: "1.6" }}>
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "24px", alignItems: "flex-start" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent}, #a78bfa)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
        <span style={{ color: "#fff", fontSize: "14px", fontWeight: "700" }}>G</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {msg.text && (
          <div style={{ fontSize: "14px", lineHeight: "1.7", color: t.text700, marginBottom: msg.card ? "0" : "0" }}>
            {renderText(msg.text)}
          </div>
        )}
        {msg.card && <RenderCard card={msg.card} />}
        {msg.followUp && (
          <div style={{ fontSize: "14px", lineHeight: "1.7", color: t.text700, marginTop: "12px" }}>
            {renderText(msg.followUp)}
          </div>
        )}
        {isTyping && (
          <div style={{ display: "flex", gap: "4px", padding: "8px 0" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: t.text400, animation: `typingDot 1.2s infinite ${i * 0.2}s` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main App ───
const App = () => {
  const [messages, setMessages] = useState([]);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAgentTyping]);

  // Cleanup timeouts
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const playNextMessages = (startIdx) => {
    let idx = startIdx;

    const playOne = () => {
      if (idx >= conversationScript.length) {
        setIsAgentTyping(false);
        return;
      }

      const msg = conversationScript[idx];

      if (msg.role === "user") {
        // Show user message, then auto-play agent responses
        setIsAgentTyping(false);
        setMessages(prev => [...prev, msg]);
        idx++;
        // Brief pause, then show typing indicator, then agent response
        timeoutRef.current = setTimeout(() => {
          setIsAgentTyping(true);
          timeoutRef.current = setTimeout(playOne, 1200 + Math.random() * 800);
        }, 600);
      } else {
        // Agent message
        setIsAgentTyping(false);
        setMessages(prev => [...prev, msg]);
        idx++;
        // Check if next message is also agent (multi-part response)
        if (idx < conversationScript.length && conversationScript[idx].role === "agent") {
          setIsAgentTyping(true);
          timeoutRef.current = setTimeout(playOne, 1500 + Math.random() * 500);
        } else if (idx < conversationScript.length && conversationScript[idx].role === "user") {
          // Next is user — wait for "send" click
          setScriptIndex(idx);
          // Pre-fill the input with the next user message
          setInputValue(conversationScript[idx].text);
        } else {
          setScriptIndex(idx);
        }
      }
    };

    playOne();
  };

  const handleSend = () => {
    if (scriptIndex >= conversationScript.length) return;
    if (isAgentTyping) return;

    const userMsg = conversationScript[scriptIndex];
    if (userMsg.role !== "user") return;

    setInputValue("");
    setMessages(prev => [...prev, userMsg]);
    setHasStarted(true);

    const nextIdx = scriptIndex + 1;
    setScriptIndex(nextIdx);

    // Start agent typing after short delay
    timeoutRef.current = setTimeout(() => {
      setIsAgentTyping(true);
      timeoutRef.current = setTimeout(() => {
        playNextMessages(nextIdx);
      }, 1200 + Math.random() * 800);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Pre-fill first user message on mount
  useEffect(() => {
    if (conversationScript.length > 0 && conversationScript[0].role === "user") {
      setInputValue(conversationScript[0].text);
    }
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: t.pageBg, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Thin sidebar */}
      <div style={{ width: "220px", backgroundColor: t.sidebarBg, borderRight: `1px solid ${t.sidebarDivider}`, display: "flex", flexDirection: "column" }}>
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "14px 16px", borderBottom: `1px solid ${t.sidebarDivider}` }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "8px", background: `linear-gradient(135deg, ${t.accent}, #a78bfa)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: "700" }}>G</span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>Gorgias AI Agent</span>
        </div>
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderBottom: `1px solid ${t.sidebarDivider}` }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "6px", backgroundColor: "#ff8c00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: "#fff" }}>U</div>
          <span style={{ fontSize: "13px", fontWeight: "500", color: t.text900, flex: 1 }}>Urban Stems</span>
          <span style={{ fontSize: "12px", color: t.text400 }}>∨</span>
        </div>
        {/* Nav items */}
        <div style={{ flex: 1, padding: "12px 0" }}>
          {[
            { label: "Home", active: false },
            { label: "Context", active: false },
            { label: "Skills", active: false },
            { label: "Evaluate", active: true },
            { label: "Monitoring", active: false },
            { label: "Logs", active: false },
          ].map((item) => (
            <div key={item.label} style={{
              padding: "8px 16px",
              margin: "1px 8px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: item.active ? "500" : "400",
              color: item.active ? t.sidebarTextActive : t.sidebarText,
              backgroundColor: item.active ? t.sidebarActiveBg : "transparent",
              cursor: "pointer",
            }}>
              {item.label}
            </div>
          ))}
        </div>
        {/* Footer */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${t.sidebarDivider}`, fontSize: "12px", color: t.text400 }}>
          80% automation · 4,679 convos
        </div>
      </div>

      {/* Main chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: "600", color: t.text900, margin: 0 }}>Evaluate</h1>
            <div style={{ fontSize: "13px", color: t.text500, marginTop: "2px" }}>Conversational evaluation for your AI agent</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: t.green }} />
            <span style={{ fontSize: "13px", color: t.text500 }}>Agent online</span>
          </div>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "32px 32px 16px", minHeight: 0 }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            {/* Welcome message if no messages yet */}
            {messages.length === 0 && !hasStarted && (
              <div style={{ textAlign: "center", padding: "80px 0 40px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `linear-gradient(135deg, ${t.accent}, #a78bfa)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <span style={{ color: "#fff", fontSize: "22px", fontWeight: "700" }}>G</span>
                </div>
                <div style={{ fontSize: "20px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Gorgias AI Agent Evaluator</div>
                <div style={{ fontSize: "14px", color: t.text500, lineHeight: "1.6", maxWidth: "480px", margin: "0 auto" }}>
                  Ask me to evaluate skills, analyze conversations, investigate issues, or run experiments. No menus — just tell me what you want to know.
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap" }}>
                  {["How is Order Support performing?", "Run an eval on returns", "What are the top issues?", "Compare last two eval runs"].map((suggestion) => (
                    <div key={suggestion} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "20px", padding: "8px 16px", fontSize: "13px", color: t.text700, cursor: "pointer" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accentText; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = t.sidebarDivider; e.currentTarget.style.color = t.text700; }}
                      onClick={() => { setInputValue(suggestion); }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} isTyping={false} />
            ))}

            {/* Typing indicator */}
            {isAgentTyping && (
              <div style={{ display: "flex", gap: "12px", marginBottom: "24px", alignItems: "flex-start" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `linear-gradient(135deg, ${t.accent}, #a78bfa)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontSize: "14px", fontWeight: "700" }}>G</span>
                </div>
                <div style={{ display: "flex", gap: "5px", padding: "14px 0" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: t.text300, animation: `typingDot 1.2s infinite ${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div style={{ borderTop: `1px solid ${t.sidebarDivider}`, backgroundColor: t.surface, padding: "16px 32px", flexShrink: 0 }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", gap: "12px", alignItems: "flex-end" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about agent performance, run evals, investigate issues..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `1px solid ${t.surfaceTertiary}`,
                  borderRadius: "12px",
                  fontSize: "14px",
                  color: t.text900,
                  backgroundColor: t.surfaceMuted,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.surfaceTertiary}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isAgentTyping}
              style={{
                backgroundColor: inputValue.trim() && !isAgentTyping ? t.brand : t.surfaceTertiary,
                color: inputValue.trim() && !isAgentTyping ? t.brandText : t.text400,
                border: "none",
                borderRadius: "12px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: inputValue.trim() && !isAgentTyping ? "pointer" : "not-allowed",
                transition: "all 0.15s",
                flexShrink: 0,
              }}
            >
              Send
            </button>
          </div>
          <div style={{ maxWidth: "760px", margin: "6px auto 0", fontSize: "12px", color: t.text400, textAlign: "center" }}>
            Press Enter to send · Evaluation results are based on real ticket data
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

if (typeof window !== 'undefined') {
  window.__APP__ = App;
}

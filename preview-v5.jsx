// Styles injected via useEffect
const injectStyles = () => {
  if (document.getElementById('prototype-styles')) return;
  const style = document.createElement('style');
  style.id = 'prototype-styles';
  style.textContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @keyframes typingDot {
      0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
      30% { opacity: 1; transform: translateY(-3px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    input::placeholder { color: #5c6370; }
  `;
  document.head.appendChild(style);
  // Load Inter font
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── Design Tokens ───
const t = {
  pageBg: "#fafafa",
  surface: "#ffffff",
  surfaceMuted: "#fafafa",
  surfaceInset: "#F1ECFF",
  navBg: "#ffffff",
  navText: "#5c6370",
  navActive: "#7E55F6",
  navBorder: "#ebecef",
  border: "#00000014",
  borderButton: "#67718380",
  text900: "#1e242e",
  text700: "#5c6370",
  text500: "#6e7686",
  accent: "#7E55F6",
  accentLight: "#F1ECFF",
  green: "#1a7a5a",
  greenBg: "#e9fbf5",
  greenBorder: "#6dd4a8",
  greenDot: "#22c55e",
  red: "#c4314b",
  redBg: "#fff1f2",
  amber: "#b35c00",
  amberBg: "#fffbeb",
  promptBg: "#ebecef",
  btnLightBg: "#ffffff80",
  btnLightBorder: "0.5px solid #67718380",
  btnLightShadow: "0px 2px 3px 0px #0000000d",
  btnDarkBg: "#1e242e",
  btnDarkRadius: "6px",
};

const scoreColor = (s) => s >= 85 ? t.green : s >= 70 ? t.amber : t.red;
const deltaColor = (d) => d > 0 ? t.green : d < 0 ? t.red : t.text500;

const renderText = (text) => {
  if (!text) return null;
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return React.createElement("strong", { key: i, style: { fontWeight: "600", color: t.text900 } }, part.slice(2, -2));
    }
    return part;
  });
};

// ─── SVG Icons ───
const Icon = {
  backArrow: (color = "#1E242E") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M2.75 8.00001L5.66667 10.9167M2.75 8.00001L5.66667 5.08334M2.75 8.00001H13.25", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  plus: (color = "#1E242E") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M3.5 8H8M8 8H12.5M8 8V12.5M8 8V3.5", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  sendArrow: (color = "white") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7.99967 2.75L5.08301 5.66667M7.99967 2.75L10.9163 5.66667M7.99967 2.75V13.25", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  chevronRight: (color = "white") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M6.76758 4.53497L10.2326 7.99997L6.76758 11.465", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  search: (color = "#1E242E") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9.89008 9.89002L13.6701 13.67M6.74008 11.15C4.3045 11.15 2.33008 9.17559 2.33008 6.74002C2.33008 4.30444 4.3045 2.33002 6.74008 2.33002C9.17565 2.33002 11.1501 4.30444 11.1501 6.74002C11.1501 9.17559 9.17565 11.15 6.74008 11.15Z", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  menu: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M2 4H14M2 8H14M2 12H14", stroke: color, strokeWidth: "1.3", strokeLinecap: "round" })
  ),
  home: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M2.5 6.5L8 2L13.5 6.5V13C13.5 13.2761 13.2761 13.5 13 13.5H3C2.72386 13.5 2.5 13.2761 2.5 13V6.5Z", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M6 13.5V9H10V13.5", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  bell: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M6 13.5C6.35 14.05 6.98 14.5 8 14.5C9.02 14.5 9.65 14.05 10 13.5M12.5 6C12.5 3.51 10.49 1.5 8 1.5C5.51 1.5 3.5 3.51 3.5 6C3.5 10 2 11.5 2 11.5H14C14 11.5 12.5 10 12.5 6Z", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  sparkle: (color = "white") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z", stroke: color, strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", fill: color })
  ),
  check: (color = "#1a7a5a") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M3 8.5L6.5 12L13 4", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  warning: (color = "#c4314b") => React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7 4.5V7.5M7 9.5H7.005M1.5 11.5L7 2L12.5 11.5H1.5Z", stroke: color, strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  chat: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14 7.5C14 10.54 11.31 13 8 13C7.19 13 6.42 12.86 5.71 12.6L2 14L3.04 11.04C2.38 10.08 2 8.84 2 7.5C2 4.46 4.69 2 8 2C11.31 2 14 4.46 14 7.5Z", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  revenue: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M8 1.5V14.5M11 4H6.5C5.12 4 4 5.12 4 6.5C4 7.88 5.12 9 6.5 9H9.5C10.88 9 12 10.12 12 11.5C12 12.88 10.88 14 9.5 14H5", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  users: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M11.5 14V12.5C11.5 11.12 10.38 10 9 10H4.5C3.12 10 2 11.12 2 12.5V14M9.25 4.5C9.25 5.88 8.13 7 6.75 7C5.37 7 4.25 5.88 4.25 4.5C4.25 3.12 5.37 2 6.75 2C8.13 2 9.25 3.12 9.25 4.5Z", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  chart: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M5.5 8.5V12.5M8 6V12.5M10.5 3.5V12.5", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
  settings: (color = "#8b8f97") => React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z", stroke: color, strokeWidth: "1.3" }),
    React.createElement("path", { d: "M13 8C13 7.64 12.96 7.29 12.89 6.95L14.47 5.73L13.22 3.57L11.35 4.19C10.87 3.74 10.3 3.39 9.67 3.18L9.25 1.25H6.75L6.33 3.18C5.7 3.39 5.13 3.74 4.65 4.19L2.78 3.57L1.53 5.73L3.11 6.95C3.04 7.29 3 7.64 3 8C3 8.36 3.04 8.71 3.11 9.05L1.53 10.27L2.78 12.43L4.65 11.81C5.13 12.26 5.7 12.61 6.33 12.82L6.75 14.75H9.25L9.67 12.82C10.3 12.61 10.87 12.26 11.35 11.81L13.22 12.43L14.47 10.27L12.89 9.05C12.96 8.71 13 8.36 13 8Z", stroke: color, strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ),
};

// ─── Progress Bar ───
const ProgressBar = ({ pct, width = 62 }) => {
  const fillWidth = Math.round(width * pct / 100);
  return React.createElement("svg", { width, height: 3, viewBox: `0 0 ${width} 3`, fill: "none" },
    React.createElement("rect", { width, height: 3, rx: 1.5, fill: "#F1ECFF" }),
    React.createElement("rect", { width: fillWidth, height: 3, rx: 1.5, fill: "#7E55F6" })
  );
};

// ─── FadeIn Component ───
const FadeIn = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return React.createElement(
    "div",
    {
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      },
    },
    children
  );
};

// ─── TypingIndicator Component ───
const TypingIndicator = () => React.createElement(
  "div",
  { style: { display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" } },
  React.createElement(
    "div",
    { style: { display: "flex", gap: "4px", alignItems: "center" } },
    [0, 1, 2].map(i => React.createElement("div", {
      key: i,
      style: {
        width: "6px",
        height: "6px",
        backgroundColor: t.accent,
        borderRadius: "50%",
        animation: `typingDot 1.4s ease-in-out ${i * 0.2}s infinite`,
      },
    }))
  ),
  React.createElement("span", { style: { fontSize: "13px", color: t.text700, fontStyle: "italic" } }, "Thinking...")
);

// ─── SkillDiffCard Component ───
const SkillDiffCard = ({ before, after }) => {
  const [expanded, setExpanded] = useState(false);
  return React.createElement(
    "div",
    { style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } },
      React.createElement(
        "div",
        {},
        React.createElement("div", { style: { fontSize: "11px", fontWeight: "600", color: t.text500, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.5px" } }, "Before"),
        React.createElement("div", { style: { fontSize: "13px", lineHeight: "1.5", color: t.text700 } }, renderText(before))
      ),
      React.createElement(
        "div",
        {},
        React.createElement("div", { style: { fontSize: "11px", fontWeight: "600", color: t.text500, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.5px" } }, "After"),
        React.createElement("div", { style: { fontSize: "13px", lineHeight: "1.5", color: t.text700 } }, renderText(after))
      )
    )
  );
};

// ─── CorrectedExampleCard Component ───
const CorrectedExampleCard = ({ id, subject, customer, before, after, resBeforeScore, resAfterScore }) => {
  return React.createElement(
    "div",
    { style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text500, marginBottom: "4px" } }, id),
    React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" } }, subject),
    React.createElement("div", { style: { fontSize: "13px", color: t.text700, padding: "12px", background: t.surfaceMuted, borderRadius: "6px", marginBottom: "12px", borderLeft: `3px solid ${t.text500}` } }, renderText(customer)),
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" } },
      React.createElement(
        "div",
        {},
        React.createElement("div", { style: { fontSize: "11px", fontWeight: "600", color: t.text500, textTransform: "uppercase", marginBottom: "8px" } }, "Before"),
        React.createElement("div", { style: { fontSize: "12px", lineHeight: "1.5", color: t.text700 } }, renderText(before)),
        React.createElement("div", { style: { fontSize: "11px", color: t.red, marginTop: "8px", fontWeight: "600" } }, `Score: ${resBeforeScore}%`)
      ),
      React.createElement(
        "div",
        {},
        React.createElement("div", { style: { fontSize: "11px", fontWeight: "600", color: t.text500, textTransform: "uppercase", marginBottom: "8px" } }, "After"),
        React.createElement("div", { style: { fontSize: "12px", lineHeight: "1.5", color: t.text700 } }, renderText(after)),
        React.createElement("div", { style: { fontSize: "11px", color: t.green, marginTop: "8px", fontWeight: "600" } }, `Score: ${resAfterScore}%`)
      )
    )
  );
};

// ─── EvalResultsScaleCard Component ───
const EvalResultsScaleCard = ({ before, after }) => {
  const renderHistogram = (dist) => {
    const max = Math.max(...dist);
    return React.createElement(
      "div",
      { style: { display: "flex", alignItems: "flex-end", gap: "2px", height: "40px" } },
      dist.map((val, i) => React.createElement("div", {
        key: i,
        style: {
          flex: 1,
          height: `${(val / max) * 100}%`,
          background: t.accent,
          borderRadius: "2px",
          opacity: 0.6,
        },
      }))
    );
  };
  return React.createElement(
    "div",
    { style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" } },
      React.createElement(
        "div",
        {},
        React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text500, marginBottom: "8px", textTransform: "uppercase" } }, "Before"),
        React.createElement("div", { style: { fontSize: "28px", fontWeight: "700", color: t.text900, marginBottom: "4px" } }, `${before.overall}%`),
        React.createElement(
          "div",
          { style: { marginBottom: "12px" } },
          before.scores.map(s => React.createElement("div", { key: s.label, style: { fontSize: "12px", color: t.text700, marginBottom: "4px" } }, `${s.label}: ${s.value}%`))
        ),
        React.createElement("div", { style: { marginBottom: "8px" } }, renderHistogram(before.distribution))
      ),
      React.createElement(
        "div",
        {},
        React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text500, marginBottom: "8px", textTransform: "uppercase" } }, "After"),
        React.createElement("div", { style: { fontSize: "28px", fontWeight: "700", color: scoreColor(after.overall), marginBottom: "4px" } }, `${after.overall}%`),
        React.createElement(
          "div",
          { style: { marginBottom: "12px" } },
          after.scores.map(s => React.createElement("div", { key: s.label, style: { fontSize: "12px", color: t.text700, marginBottom: "4px" } }, `${s.label}: ${s.value}%`))
        ),
        React.createElement("div", { style: { marginBottom: "8px" } }, renderHistogram(after.distribution))
      )
    )
  );
};

// ─── LiveEvalCard Component ───
const LiveEvalCard = ({ name, skill, focus, totalTickets, scorer, finalScores }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => p < 95 ? p + Math.random() * 30 : 95);
    }, 300);
    return () => clearInterval(timer);
  }, []);
  return React.createElement(
    "div",
    { style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text500, marginBottom: "4px", textTransform: "uppercase" } }, "Live Evaluation"),
    React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "2px" } }, skill),
    React.createElement("div", { style: { fontSize: "12px", color: t.text700, marginBottom: "12px" } }, focus),
    React.createElement("div", { style: { fontSize: "12px", color: t.text500, marginBottom: "8px" } }, `Evaluating ${totalTickets} tickets...`),
    React.createElement(ProgressBar, { pct: Math.min(progress, 95) }),
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginTop: "12px" } },
      Object.entries(finalScores).map(([key, val]) => React.createElement("div", { key, style: { textAlign: "center" } },
        React.createElement("div", { style: { fontSize: "16px", fontWeight: "700", color: scoreColor(val) } }, `${val}%`),
        React.createElement("div", { style: { fontSize: "10px", color: t.text500, marginTop: "2px", textTransform: "capitalize" } }, key)
      ))
    )
  );
};

// ─── AppliedCard Component ───
const AppliedCard = ({ items, children }) => {
  return React.createElement(
    "div",
    { style: { background: t.greenBg, border: `1px solid ${t.greenBorder}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" } },
      Icon.check(t.green),
      React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.green } }, "Applied")
    ),
    React.createElement(
      "div",
      {},
      items.map((item, i) => React.createElement("div", { key: i, style: { marginBottom: "8px", fontSize: "13px" } },
        React.createElement("div", { style: { fontWeight: "600", color: t.text900 } }, item.label),
        React.createElement("div", { style: { fontSize: "12px", color: t.text700, marginTop: "2px" } }, item.detail)
      ))
    ),
    children && React.createElement("div", { style: { marginTop: "12px", fontSize: "13px", color: t.text700, lineHeight: "1.5" } }, renderText(children))
  );
};

// ─── DeploymentTimelineCard Component ───
const DeploymentTimelineCard = ({ events, liveStats }) => {
  return React.createElement(
    "div",
    { style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text500, marginBottom: "12px", textTransform: "uppercase" } }, "Deployment Timeline"),
    React.createElement(
      "div",
      {},
      events.map((event, i) => React.createElement(
        "div",
        { key: i, style: { display: "flex", gap: "12px", marginBottom: i < events.length - 1 ? "12px" : "16px", paddingLeft: "12px", borderLeft: `2px solid ${t.border}`, position: "relative" } },
        React.createElement("div", { style: { position: "absolute", left: "-7px", top: "0", width: "12px", height: "12px", background: t.accent, borderRadius: "50%", border: `2px solid ${t.surface}` } }),
        React.createElement(
          "div",
          {},
          React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text900 } }, event.label),
          React.createElement("div", { style: { fontSize: "11px", color: t.text500, marginTop: "2px" } }, event.time)
        )
      ))
    ),
    liveStats && React.createElement(
      "div",
      { style: { marginTop: "12px", padding: "12px", background: t.surfaceMuted, borderRadius: "6px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" } },
      React.createElement("div", {},
        React.createElement("div", { style: { fontSize: "16px", fontWeight: "700", color: t.text900 } }, liveStats.tickets),
        React.createElement("div", { style: { fontSize: "11px", color: t.text500 } }, "tickets processed")
      ),
      React.createElement("div", {},
        React.createElement("div", { style: { fontSize: "16px", fontWeight: "700", color: scoreColor(liveStats.adherence) } }, `${liveStats.adherence}%`),
        React.createElement("div", { style: { fontSize: "11px", color: t.text500 } }, "adherence")
      )
    )
  );
};

// ─── MonitorAlertCard Component ───
const MonitorAlertCard = ({ metric, threshold, before, current, timeframe, ticketsReviewed, ticketsAffected, rootCause, exampleTicket }) => {
  const isAlert = current < threshold;
  return React.createElement(
    "div",
    { style: { background: isAlert ? t.redBg : t.surface, border: `1px solid ${isAlert ? "#f87171" : t.border}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" } },
      Icon.warning(),
      React.createElement("div", {},
        React.createElement("div", { style: { fontSize: "13px", fontWeight: "600", color: t.text900 } }, `${metric} Alert`),
        React.createElement("div", { style: { fontSize: "11px", color: t.text700 } }, timeframe)
      )
    ),
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" } },
      React.createElement("div", {},
        React.createElement("div", { style: { fontSize: "11px", color: t.text500 } }, "Previous"),
        React.createElement("div", { style: { fontSize: "20px", fontWeight: "700", color: t.text900 } }, `${before}%`)
      ),
      React.createElement("div", {},
        React.createElement("div", { style: { fontSize: "11px", color: t.text500 } }, "Current"),
        React.createElement("div", { style: { fontSize: "20px", fontWeight: "700", color: scoreColor(current) } }, `${current}%`)
      )
    ),
    React.createElement("div", { style: { fontSize: "12px", color: t.text700, padding: "12px", background: isAlert ? "#fecaca" : t.surfaceMuted, borderRadius: "6px", marginBottom: "12px", lineHeight: "1.5" } }, renderText(rootCause)),
    React.createElement("div", { style: { fontSize: "12px", fontWeight: "600", color: t.text900, marginBottom: "8px" } }, "Affected tickets:"),
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", fontSize: "12px" } },
      React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Affected"), React.createElement("div", { style: { fontSize: "16px", fontWeight: "700", color: t.text900 } }, ticketsAffected)),
      React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Reviewed"), React.createElement("div", { style: { fontSize: "16px", fontWeight: "700", color: t.text900 } }, ticketsReviewed))
    )
  );
};

// ─── IconNavBar Component ───
const IconNavBar = () => {
  return React.createElement(
    "div",
    { style: { width: "48px", background: t.navBg, borderRight: `1px solid ${t.navBorder}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: "8px" } },
    React.createElement("div", { style: { width: "32px", height: "32px", background: t.accent, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" } },
      Icon.sparkle()
    ),
    React.createElement("div", { style: { width: "32px", height: "32px", color: t.navText, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
      Icon.home()
    ),
    React.createElement("div", { style: { width: "32px", height: "32px", color: t.navText, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
      Icon.chat()
    ),
    React.createElement("div", { style: { width: "32px", height: "32px", color: t.navText, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } },
      Icon.settings()
    )
  );
};

// ─── Error Boundary ───
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return React.createElement("div", { style: { padding: "20px", color: t.red } }, "Something went wrong. Please refresh.");
    }
    return this.props.children;
  }
}

// ─── TASK DATA ───
const TASKS = [
  {
    id: "auto-deploy",
    status: "green",
    title: "Cancel an Order auto-deployed",
    description: "Adherence improved 31% → 86%, deployed 6h ago",
    time: "2:18 AM",
    icon: "check",
  },
  {
    id: "shipping-alert",
    status: "red",
    title: "Shipping Delay adherence drop",
    description: "Dropped to 74%, 12 tickets need review",
    time: "6:42 AM",
    icon: "warning",
  },
  {
    id: "new-skill",
    status: "amber",
    title: "New skill: Subscription Management",
    description: "340 unhandled tickets could be automated",
    time: "Yesterday",
    icon: "plus",
  },
  {
    id: "tone-review",
    status: "amber",
    title: "Tone flagged on 3 responses",
    description: "Quality Issue responses need tone review",
    time: "5:15 AM",
    icon: "warning",
  },
];

// ─── TaskView Component (for drill-in flows) ───
const TaskView = ({ taskId, onBack }) => {
  const task = TASKS.find(t => t.id === taskId);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(scrollToBottom, [currentStep]);

  // Task 1: Cancel an Order auto-deployed
  if (taskId === "auto-deploy") {
    const steps = [
      {
        left: "I auto-deployed an improvement to the **Cancel an Order** skill at 2:18 AM. The skill existed but was unpublished with no cancel action configured. Here's exactly what changed.",
        rightCard: React.createElement(SkillDiffCard, {
          before: "When a customer asks to cancel their order, check the order status. If the order has not been fulfilled, proceed with [Insert Action: Cancel Order]. If the order has been shipped, explain that we are unable to cancel shipped orders.",
          after: "**WHEN** a customer asks to cancel an order:\n\n**1. Check order status** — Look up the order. Determine if it is: unfulfilled, in fulfillment, shipped, or delivered.\n\n**2. Unfulfilled orders** — IF the order is unfulfilled AND placed within the last 1 hour, cancel immediately via cancel action. Confirm cancellation and let the customer know the refund will process in 3-5 business days.\n\n**3. In fulfillment or shipped** — UrbanStems' policy is **all sales are final** once an order enters fulfillment. Explain this clearly and empathetically. Offer alternatives: redirect to a different address, or suggest the recipient can contact us for a store credit if unwanted.\n\n**4. Edge cases** — IF the customer is canceling due to a wrong address on an unfulfilled order, cancel and help them reorder. IF the order is a subscription delivery, route to the Subscription Management skill instead.\n\nDo NOT hand over for straightforward cancel/policy explanation scenarios."
        }),
        prompt: "Show me the eval results",
      },
      {
        left: "I evaluated against all **715 cancellation tickets** from the past 90 days. Adherence went from **31% → 94%**, resolution from **10% → 78%**.",
        rightCard: React.createElement(React.Fragment, {},
          React.createElement(EvalResultsScaleCard, {
            before: { overall: 31, scores: [{label:"Adherence",value:31},{label:"Resolution",value:10},{label:"Tone",value:68}], distribution: [22,30,18,14,8,4,2,1,0,0] },
            after: { overall: 86, scores: [{label:"Adherence",value:94},{label:"Resolution",value:78},{label:"Tone",value:88}], distribution: [0,0,2,3,6,10,16,24,42,38] }
          }),
          React.createElement(CorrectedExampleCard, {
            id: "TK-49782104",
            subject: "Cancel order — placed wrong address",
            customer: "I just placed order #19361002847 about 10 minutes ago and realized I put the wrong delivery address. Can I cancel it and reorder with the right address?",
            before: "I completely understand — wrong addresses happen! Unfortunately, I'm not able to process a cancellation at this time. Let me connect you with our team who can assist with this request.",
            after: "No problem — I can see order #19361002847 was placed 10 minutes ago and hasn't entered fulfillment yet.\n\nI've canceled the order. Your refund of $72.00 will process to your original payment method within 3-5 business days.\n\nWhen you're ready to reorder with the correct address, you can place a new order and the delivery timeline will be the same.",
            resBeforeScore: 0,
            resAfterScore: 97
          })
        ),
        prompt: "Show me live monitoring",
      },
      {
        left: "Since deployment at 2:18 AM, **47 tickets** have been processed. Adherence is holding at **94%** with **0 regressions**. Everything looks healthy.",
        rightCard: React.createElement(DeploymentTimelineCard, {
          events: [
            {time:"2:14 AM",label:"Scheduled eval triggered"},
            {time:"2:15 AM",label:"Evaluated 715 tickets (3m 22s)"},
            {time:"2:18 AM",label:"Confidence: 94% — auto-deployed"},
            {time:"2:19 AM",label:"Live monitoring started"},
            {time:"8:14 AM",label:"47 tickets processed, 0 regressions"}
          ],
          liveStats: { tickets: 47, adherence: 94 }
        }),
        prompt: "Looks good",
      },
      {
        left: React.createElement(AppliedCard, { items: [{label:"Skill verified",detail:"Cancel an Order — auto-deployment confirmed"},{label:"Monitoring active",detail:"47 tickets processed, 0 regressions"},{label:"Next scheduled eval",detail:"Tomorrow at 2:00 AM — Shipping Delay skill"}] }, "Moving on. Next up: the **Shipping Delay** alert needs your attention."),
        rightCard: null,
        prompt: null,
      },
    ];

    const step = steps[currentStep];
    const handlePrompt = () => {
      setCurrentStep(c => c + 1);
    };

    return React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "minmax(320px, 487px) 1fr", height: "100vh" } },
      React.createElement(
        "div",
        { style: { background: t.surface, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column" } },
        React.createElement("div", { style: { padding: "16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "12px" } },
          React.createElement("button", { onClick: onBack, style: { background: "none", border: "none", padding: "4px", cursor: "pointer" } }, Icon.backArrow()),
          React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.text900 } }, task.title)
        ),
        React.createElement(
          "div",
          { style: { flex: 1, overflow: "auto", padding: "16px", display: "flex", flexDirection: "column" } },
          step.left && React.createElement(FadeIn, { delay: 0 },
            React.createElement("div", { style: { fontSize: "13px", lineHeight: "1.6", color: t.text700, marginBottom: "16px" } }, renderText(step.left))
          ),
          currentStep < steps.length - 1 && step.prompt && React.createElement(FadeIn, { delay: 200 },
            React.createElement("button", {
              onClick: handlePrompt,
              style: {
                padding: "8px 12px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: t.text900,
                cursor: "pointer",
                marginTop: "12px",
              }
            }, step.prompt)
          ),
          React.createElement("div", { ref: messagesEndRef })
        ),
        React.createElement("div", { style: { padding: "12px", borderTop: `1px solid ${t.border}` } },
          React.createElement("div", { style: { display: "flex", gap: "8px" } },
            React.createElement("input", {
              placeholder: "Ask anything",
              style: { flex: 1, padding: "8px 12px", border: `1px solid ${t.border}`, borderRadius: "6px", fontSize: "13px" }
            }),
            React.createElement("button", { style: { background: t.accent, color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" } }, Icon.plus())
          )
        )
      ),
      React.createElement(
        "div",
        { style: { background: t.pageBg, padding: "24px", overflow: "auto" } },
        step.rightCard && React.createElement(FadeIn, { delay: 300 }, step.rightCard)
      )
    );
  }

  // Task 2: Shipping Delay alert
  if (taskId === "shipping-alert") {
    const steps = [
      {
        left: "My monitor flagged an issue on the **Shipping Delay** skill. Adherence dropped from **88% → 74%** over the last 12 hours. I investigated the 189 tickets processed overnight.",
        rightCard: React.createElement(MonitorAlertCard, {
          metric: "Adherence",
          threshold: 80,
          before: 88,
          current: 74,
          timeframe: "Last 12 hours",
          ticketsReviewed: 189,
          ticketsAffected: 12,
          rootCause: "Subscription delivery delay tickets are being routed to the Shipping Delay skill instead of Subscription Management. The skill applies standard shipping policy ('your order is on its way') when these customers actually need subscription pause/cancel options.",
        }),
        prompt: "What's the fix?",
      },
      {
        left: "The fix is two-part: **1)** Update the Shipping Delay skill to detect subscription-related language and route those tickets to Subscription Management. **2)** The Subscription Management skill needs to be created — it doesn't exist yet.\n\nHere's the routing update for the Shipping Delay skill:",
        rightCard: React.createElement(SkillDiffCard, {
          before: "When a customer reports a late or missing delivery, check the tracking status. If the order is in transit, provide the estimated delivery date. If the order appears lost, escalate to the shipping team.",
          after: "**WHEN** a customer reports a late or missing delivery:\n\n**0. Check for subscription** — IF the customer mentions subscription, recurring delivery, weekly/monthly order, or wants to skip/pause/cancel future deliveries → Route to Subscription Management skill. Do NOT handle as a shipping issue.\n\n**1. Check tracking** — Look up the order tracking status.\n\n**2. In transit** — If the order is in transit, provide the estimated delivery date and tracking link. If delivery is 2+ days late, apologize and offer a $10 store credit.\n\n**3. Lost/not received** — If delivered but not received, or no tracking updates for 3+ days, initiate a replacement via reship action.\n\n**4. Confirm** — Always provide the tracking link and set clear expectations."
        }),
        prompt: "Run evaluation",
      },
      {
        left: "Evaluating 189 tickets...",
        rightCard: React.createElement(LiveEvalCard, {
          name: "eval-shipping-delay-v2",
          skill: "Shipping Delay",
          focus: "Subscription routing fix",
          totalTickets: 189,
          scorer: "Adherence & Routing",
          finalScores: { adherence: 91, resolution: 79, tone: 87, overall: 86 }
        }),
        autoAdvance: true,
        prompt: null,
      },
      {
        left: "**Adherence recovered from 74% → 91%.** The routing fix correctly identifies subscription tickets and stops applying shipping policy to them. Resolution went from 52% → 79% because the skill can now handle more shipping cases directly.",
        rightCard: React.createElement(EvalResultsScaleCard, {
          before: { overall: 52, scores: [{label:"Adherence",value:74},{label:"Resolution",value:52},{label:"Tone",value:81}], distribution: [8,14,18,22,16,10,6,4,1,0] },
          after: { overall: 86, scores: [{label:"Adherence",value:91},{label:"Resolution",value:79},{label:"Tone",value:87}], distribution: [0,1,2,4,6,10,16,26,44,40] }
        }),
        prompt: "Deploy it",
      },
      {
        left: React.createElement(AppliedCard, { items: [{label:"Skill updated",detail:"Shipping Delay — subscription routing added"},{label:"Monitor reset",detail:"Adherence threshold 80%, tracking resumed"},{label:"Routing active",detail:"Subscription tickets will now be detected and rerouted"}] }, "The subscription routing is live. But those tickets still need a skill to land in — that's the **Subscription Management** recommendation. Want to look at that next?"),
        rightCard: null,
        prompt: null,
      },
    ];

    const step = steps[currentStep];
    const handlePrompt = () => {
      if (step.autoAdvance) {
        setTimeout(() => setCurrentStep(c => c + 1), 2000);
      } else {
        setCurrentStep(c => c + 1);
      }
    };

    useEffect(() => {
      if (step.autoAdvance) {
        setTimeout(() => setCurrentStep(c => c + 1), 2000);
      }
    }, [currentStep, step.autoAdvance]);

    return React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "minmax(320px, 487px) 1fr", height: "100vh" } },
      React.createElement(
        "div",
        { style: { background: t.surface, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column" } },
        React.createElement("div", { style: { padding: "16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "12px" } },
          React.createElement("button", { onClick: onBack, style: { background: "none", border: "none", padding: "4px", cursor: "pointer" } }, Icon.backArrow()),
          React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.text900 } }, task.title)
        ),
        React.createElement(
          "div",
          { style: { flex: 1, overflow: "auto", padding: "16px", display: "flex", flexDirection: "column" } },
          step.left && React.createElement(FadeIn, { delay: 0 },
            React.createElement("div", { style: { fontSize: "13px", lineHeight: "1.6", color: t.text700, marginBottom: "16px" } }, typeof step.left === 'string' ? renderText(step.left) : step.left)
          ),
          step.autoAdvance && React.createElement(FadeIn, { delay: 500 }, TypingIndicator()),
          !step.autoAdvance && currentStep < steps.length - 1 && step.prompt && React.createElement(FadeIn, { delay: 200 },
            React.createElement("button", {
              onClick: handlePrompt,
              style: {
                padding: "8px 12px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: t.text900,
                cursor: "pointer",
                marginTop: "12px",
              }
            }, step.prompt)
          ),
          React.createElement("div", { ref: messagesEndRef })
        ),
        React.createElement("div", { style: { padding: "12px", borderTop: `1px solid ${t.border}` } },
          React.createElement("div", { style: { display: "flex", gap: "8px" } },
            React.createElement("input", {
              placeholder: "Ask anything",
              style: { flex: 1, padding: "8px 12px", border: `1px solid ${t.border}`, borderRadius: "6px", fontSize: "13px" }
            }),
            React.createElement("button", { style: { background: t.accent, color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" } }, Icon.plus())
          )
        )
      ),
      React.createElement(
        "div",
        { style: { background: t.pageBg, padding: "24px", overflow: "auto" } },
        step.rightCard && React.createElement(FadeIn, { delay: 300 }, step.rightCard)
      )
    );
  }

  // Task 3: New skill - Subscription Management
  if (taskId === "new-skill") {
    const steps = [
      {
        left: "I analyzed **340 tickets** from the past 90 days that don't match any existing skill. They all involve subscription-related requests — pauses, cancellations, frequency changes, skipping deliveries, and billing questions.\n\nHere's the skill I've drafted:",
        rightCard: React.createElement(SkillDiffCard, {
          before: "(No skill configured)",
          after: "**WHEN** a customer contacts about their subscription:\n\n**1. Identify request type** — Determine if the customer wants to: pause, cancel, skip a delivery, change frequency, update payment, or ask about billing.\n\n**2. Pause subscription** — Pause for up to 4 weeks. Confirm the pause date and when deliveries will resume.\n\n**3. Skip delivery** — Skip the next upcoming delivery. Confirm which delivery is skipped and when the next one will arrive.\n\n**4. Cancel subscription** — Confirm cancellation. Offer a 15% discount on next 3 deliveries as retention before canceling. If customer confirms cancel, process immediately.\n\n**5. Change frequency** — Update delivery frequency (weekly, biweekly, monthly). Confirm new schedule.\n\n**6. Billing** — Look up subscription billing details. If overcharge, issue credit. Route payment method changes to account settings.\n\nAlways confirm the action taken and provide the next delivery date."
        }),
        prompt: "Run evaluation",
      },
      {
        left: "Evaluating 340 tickets...",
        rightCard: React.createElement(LiveEvalCard, {
          name: "eval-subscription-mgmt-v1",
          skill: "Subscription Management",
          focus: "New skill coverage",
          totalTickets: 340,
          scorer: "Adherence & Resolution",
          finalScores: { adherence: 87, resolution: 72, tone: 90, overall: 83 }
        }),
        autoAdvance: true,
        prompt: null,
      },
      {
        left: "The new skill scores **87% adherence** and **72% resolution** on first pass. Resolution is lower because some subscription tickets involve edge cases the skill doesn't cover yet — gift subscriptions and corporate accounts. But this covers the core 80% well.\n\nThis would eliminate the subscription misrouting that's causing the Shipping Delay alert, and automate ~340 tickets per quarter.",
        rightCard: React.createElement(EvalResultsScaleCard, {
          before: { overall: 0, scores: [{label:"Adherence",value:0},{label:"Resolution",value:0},{label:"Tone",value:0}], distribution: [100,0,0,0,0,0,0,0,0,0] },
          after: { overall: 83, scores: [{label:"Adherence",value:87},{label:"Resolution",value:72},{label:"Tone",value:90}], distribution: [0,2,4,6,8,12,18,24,38,36] }
        }),
        prompt: "Publish it",
      },
      {
        left: React.createElement(AppliedCard, { items: [{label:"Skill published",detail:"Subscription Management — new skill live"},{label:"Actions configured",detail:"Pause, skip, cancel, frequency change"},{label:"Monitor created",detail:"Subscription Management — adherence threshold 80%"},{label:"Routing connected",detail:"Shipping Delay now routes subscription tickets here"}] }, "Done. The subscription skill is live and connected. All 4 of your morning tasks are complete."),
        rightCard: null,
        prompt: null,
      },
    ];

    const step = steps[currentStep];
    useEffect(() => {
      if (step.autoAdvance) {
        setTimeout(() => setCurrentStep(c => c + 1), 2000);
      }
    }, [currentStep, step.autoAdvance]);

    const handlePrompt = () => {
      setCurrentStep(c => c + 1);
    };

    return React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "minmax(320px, 487px) 1fr", height: "100vh" } },
      React.createElement(
        "div",
        { style: { background: t.surface, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column" } },
        React.createElement("div", { style: { padding: "16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "12px" } },
          React.createElement("button", { onClick: onBack, style: { background: "none", border: "none", padding: "4px", cursor: "pointer" } }, Icon.backArrow()),
          React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.text900 } }, task.title)
        ),
        React.createElement(
          "div",
          { style: { flex: 1, overflow: "auto", padding: "16px", display: "flex", flexDirection: "column" } },
          step.left && React.createElement(FadeIn, { delay: 0 },
            React.createElement("div", { style: { fontSize: "13px", lineHeight: "1.6", color: t.text700, marginBottom: "16px" } }, typeof step.left === 'string' ? renderText(step.left) : step.left)
          ),
          step.autoAdvance && React.createElement(FadeIn, { delay: 500 }, TypingIndicator()),
          !step.autoAdvance && currentStep < steps.length - 1 && step.prompt && React.createElement(FadeIn, { delay: 200 },
            React.createElement("button", {
              onClick: handlePrompt,
              style: {
                padding: "8px 12px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: t.text900,
                cursor: "pointer",
                marginTop: "12px",
              }
            }, step.prompt)
          ),
          React.createElement("div", { ref: messagesEndRef })
        ),
        React.createElement("div", { style: { padding: "12px", borderTop: `1px solid ${t.border}` } },
          React.createElement("div", { style: { display: "flex", gap: "8px" } },
            React.createElement("input", {
              placeholder: "Ask anything",
              style: { flex: 1, padding: "8px 12px", border: `1px solid ${t.border}`, borderRadius: "6px", fontSize: "13px" }
            }),
            React.createElement("button", { style: { background: t.accent, color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" } }, Icon.plus())
          )
        )
      ),
      React.createElement(
        "div",
        { style: { background: t.pageBg, padding: "24px", overflow: "auto" } },
        step.rightCard && React.createElement(FadeIn, { delay: 300 }, step.rightCard)
      )
    );
  }

  // Task 4: Tone review
  if (taskId === "tone-review") {
    const steps = [
      {
        left: "3 responses on the **Quality Issue** skill were flagged for tone adherence in the last 12 hours. The tone scorer detected responses that were too formal and didn't match UrbanStems' warm, conversational voice.\n\nHere are the flagged responses. The original is on the left, my suggested rewrite is on the right.",
        rightCard: React.createElement(React.Fragment, {},
          React.createElement(CorrectedExampleCard, {
            id: "TK-49801388",
            subject: "Damaged arrangement — roses wilted",
            customer: "My anniversary roses arrived completely dead. This was supposed to be special.",
            before: "We sincerely apologize for the inconvenience you have experienced with your recent order. We understand this is not the quality you expect. Your case has been escalated for review and a resolution will be provided within 24-48 hours.",
            after: "I'm so sorry your anniversary roses arrived in that condition — that's really disappointing, especially for such a meaningful occasion.\n\nI've issued a full credit of $85.00 to your account, and I can arrange a fresh replacement bouquet for next-day delivery if you'd like. Just let me know.",
            resBeforeScore: 45,
            resAfterScore: 94
          }),
          React.createElement(CorrectedExampleCard, {
            id: "TK-49801401",
            subject: "Wrong flowers received",
            customer: "I ordered sunflowers for my mom but received lilies instead.",
            before: "Thank you for bringing this to our attention. We have noted the discrepancy between your order and the delivered arrangement. A replacement order will be processed and you will receive tracking information via email.",
            after: "Oh no, I'm sorry about that mix-up! Sunflowers and lilies are quite different — I totally understand the frustration.\n\nI've arranged for the correct sunflower bouquet to be sent out today. You'll get a tracking email within the hour. No need to return the lilies — enjoy them too!",
            resBeforeScore: 52,
            resAfterScore: 96
          })
        ),
        prompt: "Apply tone fixes",
      },
      {
        left: React.createElement(AppliedCard, { items: [{label:"Tone updated",detail:"Quality Issue skill — warmer, more empathetic language patterns applied"},{label:"Tone scorer refined",detail:"Added UrbanStems voice guidelines to evaluation criteria"}] }, "The tone adjustments are applied. Future responses will use a warmer, more conversational style that matches UrbanStems' brand."),
        rightCard: null,
        prompt: null,
      },
    ];

    const step = steps[currentStep];
    const handlePrompt = () => {
      setCurrentStep(c => c + 1);
    };

    return React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "minmax(320px, 487px) 1fr", height: "100vh" } },
      React.createElement(
        "div",
        { style: { background: t.surface, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column" } },
        React.createElement("div", { style: { padding: "16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "12px" } },
          React.createElement("button", { onClick: onBack, style: { background: "none", border: "none", padding: "4px", cursor: "pointer" } }, Icon.backArrow()),
          React.createElement("div", { style: { fontSize: "14px", fontWeight: "600", color: t.text900 } }, task.title)
        ),
        React.createElement(
          "div",
          { style: { flex: 1, overflow: "auto", padding: "16px", display: "flex", flexDirection: "column" } },
          step.left && React.createElement(FadeIn, { delay: 0 },
            React.createElement("div", { style: { fontSize: "13px", lineHeight: "1.6", color: t.text700, marginBottom: "16px" } }, typeof step.left === 'string' ? renderText(step.left) : step.left)
          ),
          currentStep < steps.length - 1 && step.prompt && React.createElement(FadeIn, { delay: 200 },
            React.createElement("button", {
              onClick: handlePrompt,
              style: {
                padding: "8px 12px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: t.text900,
                cursor: "pointer",
                marginTop: "12px",
              }
            }, step.prompt)
          ),
          React.createElement("div", { ref: messagesEndRef })
        ),
        React.createElement("div", { style: { padding: "12px", borderTop: `1px solid ${t.border}` } },
          React.createElement("div", { style: { display: "flex", gap: "8px" } },
            React.createElement("input", {
              placeholder: "Ask anything",
              style: { flex: 1, padding: "8px 12px", border: `1px solid ${t.border}`, borderRadius: "6px", fontSize: "13px" }
            }),
            React.createElement("button", { style: { background: t.accent, color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" } }, Icon.plus())
          )
        )
      ),
      React.createElement(
        "div",
        { style: { background: t.pageBg, padding: "24px", overflow: "auto" } },
        step.rightCard && React.createElement(FadeIn, { delay: 300 }, step.rightCard)
      )
    );
  }

  return null;
};

// ─── HomePage Component ───
const HomePage = ({ onSelectTask }) => {
  const statusDotColor = (status) => {
    if (status === "green") return t.greenDot;
    if (status === "red") return t.red;
    if (status === "amber") return t.amber;
    return t.text500;
  };

  const getIcon = (iconName) => {
    if (iconName === "check") return Icon.check();
    if (iconName === "warning") return Icon.warning();
    if (iconName === "plus") return Icon.plus("#1E242E");
    return null;
  };

  return React.createElement(
    "div",
    { style: { display: "grid", gridTemplateColumns: "minmax(320px, 487px) 1fr", height: "100vh", background: t.pageBg } },
    React.createElement(
      "div",
      { style: { background: t.surface, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", overflow: "hidden" } },
      React.createElement(
        "div",
        { style: { padding: "16px", borderBottom: `1px solid ${t.border}` } },
        React.createElement("div", { style: { fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "4px" } }, "Drill down"),
        React.createElement("button", { style: { fontSize: "12px", padding: "4px 8px", background: t.accentLight, border: "none", borderRadius: "4px", color: t.accent, cursor: "pointer", marginBottom: "8px" } }, "+ New task")
      ),
      React.createElement(
        "div",
        { style: { flex: 1, overflow: "auto", padding: "12px" } },
        TASKS.map((task, i) => React.createElement(
          FadeIn,
          { key: task.id, delay: i * 150 },
          React.createElement("button", {
            onClick: () => onSelectTask(task.id),
            style: {
              width: "100%",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              textAlign: "left",
              transition: "all 0.2s ease",
            },
            onMouseEnter: (e) => e.currentTarget.style.background = t.surfaceMuted,
            onMouseLeave: (e) => e.currentTarget.style.background = t.surface,
          },
            React.createElement("div", { style: { width: "8px", height: "8px", borderRadius: "50%", background: statusDotColor(task.status), marginTop: "4px", flexShrink: 0 } }),
            React.createElement(
              "div",
              { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: "13px", fontWeight: "600", color: t.text900 } }, task.title),
              React.createElement("div", { style: { fontSize: "12px", color: t.text700, marginTop: "2px" } }, task.description),
              React.createElement("div", { style: { fontSize: "10px", color: t.text500, marginTop: "4px" } }, task.time)
            ),
            React.createElement("div", { style: { color: t.text500 } }, Icon.chevronRight(t.text500))
          )
        ))
      ),
      React.createElement(
        "div",
        { style: { padding: "12px", borderTop: `1px solid ${t.border}` } },
        React.createElement("div", { style: { display: "flex", gap: "8px" } },
          React.createElement("input", {
            placeholder: "Ask anything",
            style: { flex: 1, padding: "8px 12px", border: `1px solid ${t.border}`, borderRadius: "6px", fontSize: "13px" }
          }),
          React.createElement("button", { style: { background: t.accent, color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" } }, Icon.plus())
        )
      )
    ),
    React.createElement(
      "div",
      { style: { background: t.pageBg, padding: "24px", overflow: "auto" } },
      React.createElement(
        "div",
        {},
        React.createElement(FadeIn, { delay: 0 },
          React.createElement("div", { style: { fontSize: "24px", fontWeight: "700", color: t.text900, marginBottom: "4px" } }, "Good morning, Jess."),
          React.createElement("div", { style: { fontSize: "14px", color: t.text700, marginBottom: "24px" } }, "Tuesday, April 1 — here's what happened overnight.")
        ),
        React.createElement(FadeIn, { delay: 300 },
          React.createElement(
            "div",
            { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" } },
            {
              label: "tickets handled",
              value: "312"
            },
            {
              label: "adherence",
              value: "91%",
              accentBg: true
            },
            {
              label: "resolved",
              value: "267",
              subtitle: "85.6% automation",
              green: true
            },
            {
              label: "credits issued",
              value: "$12.4K"
            }
          ).map((stat, i) => React.createElement(
            "div",
            { key: i, style: { background: stat.accentBg ? t.accentLight : stat.green ? t.greenBg : t.surface, padding: "12px", borderRadius: "8px", textAlign: "center", border: `1px solid ${t.border}` } },
            React.createElement("div", { style: { fontSize: "20px", fontWeight: "700", color: stat.green ? t.green : stat.accentBg ? t.accent : t.text900 } }, stat.value),
            React.createElement("div", { style: { fontSize: "11px", color: t.text500, marginTop: "4px" } }, stat.label),
            stat.subtitle && React.createElement("div", { style: { fontSize: "10px", color: t.text700, marginTop: "2px" } }, stat.subtitle)
          ))
        ),
        React.createElement(FadeIn, { delay: 400 },
          React.createElement(
            "div",
            { style: { background: t.surface, border: `3px solid ${t.green}`, borderLeft: `8px solid ${t.green}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
            React.createElement("div", { style: { fontSize: "13px", fontWeight: "600", color: t.green, marginBottom: "4px" } }, "Auto-deployed: Cancel an Order"),
            React.createElement("div", { style: { fontSize: "12px", color: t.text700, lineHeight: "1.5", marginBottom: "12px" } }, "Skill was rewritten with clear cancellation logic and refund rules. Evaluated against 715 tickets, adherence improved from 31% → 86%. Auto-deployed at 2:18 AM — 47 tickets processed since, 0 regressions."),
            React.createElement(
              "div",
              { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", fontSize: "11px" } },
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Adherence"), React.createElement("div", { style: { fontWeight: "600", color: t.green } }, "31% → 86%")),
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Tickets"), React.createElement("div", { style: { fontWeight: "600", color: t.text900 } }, "47 since deploy")),
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Regressions"), React.createElement("div", { style: { fontWeight: "600", color: t.green } }, "0"))
            )
          )
        ),
        React.createElement(FadeIn, { delay: 500 },
          React.createElement(
            "div",
            { style: { background: t.surface, border: `3px solid ${t.red}`, borderLeft: `8px solid ${t.red}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" } },
            React.createElement("div", { style: { fontSize: "13px", fontWeight: "600", color: t.red, marginBottom: "4px" } }, "Alert: Shipping Delay skill"),
            React.createElement("div", { style: { fontSize: "12px", color: t.text700, lineHeight: "1.5", marginBottom: "12px" } }, "Adherence dropped to 74% overnight. Root cause: 12 subscription delivery delay tickets are hitting this skill instead of Subscription Management. Those tickets get wrong policy responses."),
            React.createElement(
              "div",
              { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", fontSize: "11px" } },
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Adherence"), React.createElement("div", { style: { fontWeight: "600", color: t.red } }, "74%")),
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Affected"), React.createElement("div", { style: { fontWeight: "600", color: t.text900 } }, "12 tickets")),
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Overnight"), React.createElement("div", { style: { fontWeight: "600", color: t.text900 } }, "189 total"))
            )
          )
        ),
        React.createElement(FadeIn, { delay: 600 },
          React.createElement(
            "div",
            { style: { background: t.surface, border: `3px solid ${t.amber}`, borderLeft: `8px solid ${t.amber}`, borderRadius: "8px", padding: "16px", marginBottom: "24px" } },
            React.createElement("div", { style: { fontSize: "13px", fontWeight: "600", color: t.amber, marginBottom: "4px" } }, "Recommended: New Subscription Management skill"),
            React.createElement("div", { style: { fontSize: "12px", color: t.text700, lineHeight: "1.5", marginBottom: "12px" } }, "I found 340 tickets in the last 90 days that don't match any existing skill. They involve subscription pauses, cancellations, frequency changes, and billing questions. I can draft a skill for this."),
            React.createElement(
              "div",
              { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", fontSize: "11px" } },
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Unhandled"), React.createElement("div", { style: { fontWeight: "600", color: t.text900 } }, "340 tickets")),
              React.createElement("div", {}, React.createElement("div", { style: { color: t.text500 } }, "Savings"), React.createElement("div", { style: { fontWeight: "600", color: t.text900 } }, "~$18K"))
            )
          )
        ),
        React.createElement(FadeIn, { delay: 700 },
          React.createElement(
            "div",
            { style: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "12px", marginBottom: "12px" } },
            React.createElement("div", { style: { fontSize: "11px", fontWeight: "600", color: t.text500, marginBottom: "8px", textTransform: "uppercase" } }, "Active Monitors"),
            React.createElement(
              "div",
              { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
              [
                { label: "Quality Issue", pct: 92 },
                { label: "Cancel Order", pct: 86 },
                { label: "Shipping Delay", pct: 74 },
                { label: "Subscription Mgmt", pct: null },
                { label: "Order Status", pct: 96 }
              ].map((m, i) => React.createElement(
                "div",
                { key: i, style: { fontSize: "11px", padding: "6px 10px", background: m.pct === null ? "#f5f5f5" : m.pct >= 85 ? t.greenBg : m.pct >= 70 ? t.amberBg : t.redBg, color: m.pct === null ? t.text500 : m.pct >= 85 ? t.green : m.pct >= 70 ? t.amber : t.red, borderRadius: "12px", display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" } },
                m.pct !== null && React.createElement("div", { style: { width: "6px", height: "6px", borderRadius: "50%", background: m.pct >= 85 ? t.greenDot : m.pct >= 70 ? t.amber : t.red } }),
                m.pct !== null ? `${m.label} ${m.pct}%` : m.label
              ))
            )
          )
        )
      )
    )
  );
};

// ─── App Component ───
const App = () => {
  const [activeTask, setActiveTask] = useState(null);

  return React.createElement(
    ErrorBoundary,
    {},
    React.createElement(
      "div",
      { style: { display: "flex", height: "100vh", background: t.pageBg } },
      IconNavBar(),
      activeTask ? React.createElement(TaskView, { taskId: activeTask, onBack: () => setActiveTask(null) }) : React.createElement(HomePage, { onSelectTask: (taskId) => setActiveTask(taskId) })
    )
  );
};

// ─── Render ───

// Export wrapper
export default function Prototype() {
  useEffect(() => { injectStyles(); }, []);
  return React.createElement(
    "div",
    { style: { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", height: "100vh" } },
    React.createElement(App)
  );
}

"use client";
import { useState, useEffect, useRef } from "react";

// ─── Browser Mockup ───────────────────────────────────────────────────────────
function BrowserMockup() {
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 6, overflow: "hidden" }}>
      {/* URL bar */}
      <div style={{ height: 26, background: "#111", display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a1a1a" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a1a1a" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366F140" }} />
        <div style={{ flex: 1, height: 10, background: "#1a1a1a", borderRadius: 2, marginLeft: 6 }} />
      </div>
      {/* Content */}
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 34, background: "#0d0d1a", borderRadius: 3, display: "flex", alignItems: "center", padding: "0 8px" }}>
          <div style={{ height: 7, width: "55%", background: "#6366F150", borderRadius: 2, animation: "hero-pulse 3s ease-in-out infinite" }} />
        </div>
        <div style={{ height: 6, width: "40%", background: "#111", borderRadius: 2, opacity: 0.7 }} />
        <div style={{ height: 6, width: "60%", background: "#111", borderRadius: 2, opacity: 0.7 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginTop: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 30, background: "#0d0d1a", borderRadius: 3, border: "1px solid #1a1a1a" }} />
          ))}
        </div>
        <div style={{ height: 18, width: 65, background: "#6366F1", borderRadius: 3, marginTop: 6, animation: "button-pulse 2.5s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

// ─── Chat Mockup ──────────────────────────────────────────────────────────────
const CHAT_SEQUENCE = [
  { role: "bot", text: "Hallo! Wie kann ich helfen?" },
  { role: "user", text: "Was kostet eine Website?" },
  { role: "bot", text: "Ab 300€ – Angebot erstellen?" },
] as const;

function ChatMockup() {
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < CHAT_SEQUENCE.length; i++) {
        const msg = CHAT_SEQUENCE[i];
        if (cancelled) return;

        if (msg.role === "bot") {
          await new Promise((r) => setTimeout(r, i === 0 ? 800 : 1500));
          if (cancelled) return;
          setShowTyping(true);
          await new Promise((r) => setTimeout(r, 1000));
          if (cancelled) return;
          setShowTyping(false);
          setMessages((prev) => [...prev, { role: msg.role, text: msg.text }]);
        } else {
          await new Promise((r) => setTimeout(r, 1500));
          if (cancelled) return;
          setMessages((prev) => [...prev, { role: msg.role, text: msg.text }]);
        }
      }

      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;
      setMessages([]);
      setStep((s) => s + 1);
    }

    run();
    return () => { cancelled = true; };
  }, [step]);

  return (
    <div style={{ border: "1px solid #1a1a1a", borderRadius: 6, overflow: "hidden", background: "#0a0a0a" }}>
      {/* Header */}
      <div style={{ background: "#111", height: 28, display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", boxShadow: "0 0 6px #6366F1" }} />
        <span style={{ fontSize: 9, color: "#555" }}>KI-Assistent</span>
      </div>
      {/* Messages */}
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6, minHeight: 90 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              fontSize: 10,
              padding: "6px 10px",
              borderRadius: msg.role === "bot" ? "2px 8px 8px 8px" : "8px 2px 8px 8px",
              background: msg.role === "bot" ? "#111" : "#6366F120",
              border: msg.role === "user" ? "1px solid #6366F130" : "none",
              color: "#9CA3AF",
              alignSelf: msg.role === "bot" ? "flex-start" : "flex-end",
              maxWidth: "85%",
            }}
          >
            {msg.text}
          </div>
        ))}
        {showTyping && (
          <div style={{ display: "flex", gap: 3, padding: "6px 10px", background: "#111", borderRadius: "2px 8px 8px 8px", alignSelf: "flex-start" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#6366F1",
                  animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Input */}
      <div style={{ background: "#111", height: 28, display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
        <div style={{ flex: 1, height: 8, background: "#1a1a1a", borderRadius: 4 }} />
        <div style={{ width: 16, height: 16, background: "#6366F140", borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ─── Terminal Mockup ──────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  "> analyzing context...",
  "> optimizing prompt...",
  "> generating output...",
  "✓ done — 94% accuracy",
];

function TerminalMockup() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (resetting) {
      const t = setTimeout(() => {
        setVisibleLines([]);
        setCurrentTyping("");
        setLineIdx(0);
        setCharIdx(0);
        setPaused(false);
        setResetting(false);
      }, 100);
      return () => clearTimeout(t);
    }

    if (paused) {
      const t = setTimeout(() => {
        setResetting(true);
      }, 2500);
      return () => clearTimeout(t);
    }

    if (lineIdx >= TERMINAL_LINES.length) {
      setPaused(true);
      return;
    }

    const line = TERMINAL_LINES[lineIdx];

    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrentTyping(line.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      // Line done, wait then advance
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentTyping("");
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, paused, resetting]);

  return (
    <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: 6, overflow: "hidden" }}>
      {/* Terminal bar */}
      <div style={{ background: "#111", height: 26, display: "flex", alignItems: "center", padding: "0 10px", gap: 4 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#333" }} />
        ))}
        <span style={{ marginLeft: "auto", fontSize: 9, color: "#444", letterSpacing: "0.1em" }}>zsh</span>
      </div>
      {/* Content */}
      <div style={{ padding: 12, fontFamily: "monospace", fontSize: 10, lineHeight: 1.8, color: "#22C55E", minHeight: 80 }}>
        {visibleLines.map((line, i) => (
          <p key={i} style={{ margin: 0, opacity: i < visibleLines.length - 1 ? 0.5 : 0.8 }}>{line}</p>
        ))}
        {!paused && lineIdx < TERMINAL_LINES.length && (
          <p style={{ margin: 0 }}>
            {currentTyping}
            <span style={{ animation: "cursor-blink 0.8s step-end infinite", color: "#22C55E" }}>▋</span>
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Panel data ───────────────────────────────────────────────────────────────
const PANELS = [
  {
    number: "01",
    title: "Websites & Web Apps",
    description:
      "Von der Landingpage bis zur komplexen Web-App. Schnell, modern, konversionsorientiert – gebaut mit Next.js.",
    mockup: <BrowserMockup />,
  },
  {
    number: "02",
    title: "AI Integration & Chatbots",
    description:
      "KI-Assistenten die wirklich helfen. Trainiert auf deinen Content, integriert in deine Website.",
    mockup: <ChatMockup />,
  },
  {
    number: "03",
    title: "Context Engineering",
    description:
      "Die Kunst, KI richtig zu instruieren. Bessere Prompts, bessere Ergebnisse, messbare Verbesserungen.",
    mockup: <TerminalMockup />,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WhatIBuild() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: "#030305" }}>
      {PANELS.map((panel, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderBottom: "1px solid #111",
            background: hovered === i ? "rgba(99,102,241,0.03)" : "transparent",
            boxShadow: hovered === i ? "0 0 80px rgba(99,102,241,0.04)" : "none",
            transition: "background 0.6s ease, box-shadow 0.6s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 2.5rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* Left */}
            <div style={{ position: "relative", flex: "1 1 280px", minWidth: 0 }}>
              {/* Giant number */}
              <span
                style={{
                  position: "absolute",
                  fontSize: "clamp(6rem, 12vw, 10rem)",
                  fontWeight: 200,
                  color: "#6366F1",
                  opacity: 0.04,
                  userSelect: "none",
                  pointerEvents: "none",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  lineHeight: 1,
                }}
              >
                {panel.number}
              </span>
              <div style={{ position: "relative" }}>
                <h2
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    fontWeight: 200,
                    letterSpacing: "0.08em",
                    color: "#F5F5F7",
                    marginBottom: "1rem",
                    margin: "0 0 1rem 0",
                  }}
                >
                  {panel.title}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#6B7280",
                    maxWidth: 280,
                    margin: 0,
                  }}
                >
                  {panel.description}
                </p>
              </div>
            </div>

            {/* Right mockup */}
            <div
              style={{
                flexShrink: 0,
                width: "clamp(200px, 30vw, 260px)",
              }}
            >
              {panel.mockup}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

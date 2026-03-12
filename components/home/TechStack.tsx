"use client";

import { useState } from "react";

const techs = [
  { name: "Next.js", sub: "Framework" },
  { name: "Tailwind", sub: "Styling" },
  { name: "shadcn/ui", sub: "Components" },
  { name: "Claude", sub: "AI Engine" },
  { name: "Vercel", sub: "Deploy" },
  { name: "Supabase", sub: "Database" },
];

export default function TechStack() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: "#050508", padding: "clamp(4rem, 8vw, 7rem) 1.5rem" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <p
          style={{
            color: "#6366F1",
            fontSize: "11px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          Stack
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            borderTop: "1px solid #111120",
          }}
        >
          {techs.map((t, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: "calc(100% / 3)",
                padding: "clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2vw, 1.75rem)",
                borderBottom: "1px solid #111120",
                borderRight: (i + 1) % 3 === 0 ? "none" : "1px solid #111120",
                cursor: "default",
                transition: "background 0.25s",
                background: hovered === i ? "rgba(99,102,241,0.05)" : "transparent",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-heading), sans-serif",
                  fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                  fontWeight: 200,
                  letterSpacing: "0.1em",
                  color: hovered === i ? "#6366F1" : "white",
                  transition: "color 0.25s",
                  marginBottom: "4px",
                }}
              >
                {t.name}
              </p>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#374151" }}>
                {t.sub}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: "clamp(2rem, 4vw, 3rem)",
            fontSize: "13px",
            lineHeight: 1.8,
            color: "#4B5563",
            letterSpacing: "0.02em",
            maxWidth: "36rem",
          }}
        >
          Ich nutze die modernsten Tools. Nicht weil es trendy ist, sondern weil es schneller bessere Ergebnisse liefert.
        </p>
      </div>
    </section>
  );
}

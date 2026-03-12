"use client";

import { useEffect, useRef, useState } from "react";

const MARQUEE = "4 KUNDEN · 6 PROJEKTE · < 2 WOCHEN LIEFERZEIT · 300€ AB PREIS · MOSBACH · CONTEXT ENGINEERING · AI-POWERED · ";

const stats = [
  { end: 6, suffix: "", label: "Projekte" },
  { end: 4, suffix: "", label: "Kunden" },
  { end: 2, suffix: "W", prefix: "<", label: "Lieferzeit" },
  { end: 300, suffix: "€", label: "Ab Preis" },
];

function CountStat({ end, suffix, prefix, label }: { end: number; suffix: string; prefix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        let current = 0;
        const steps = 40;
        const increment = Math.ceil(end / steps);
        const timer = setInterval(() => {
          current = Math.min(current + increment, end);
          setVal(current);
          if (current >= end) clearInterval(timer);
        }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "var(--font-heading), sans-serif",
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 200,
          color: "white",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        {prefix}{val}{suffix}
      </p>
      <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#374151", marginTop: "0.75rem" }}>
        {label}
      </p>
    </div>
  );
}

export default function MarqueeStats() {
  const text = (MARQUEE + MARQUEE + MARQUEE);

  return (
    <section style={{ background: "#0A0A0F", borderTop: "1px solid #111120", borderBottom: "1px solid #111120" }}>
      {/* Marquee */}
      <div style={{ padding: "1.25rem 0", overflow: "hidden", borderBottom: "1px solid #111120" }}>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 35s linear infinite",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", paddingRight: "4rem" }}>
            {text}
          </span>
          <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", paddingRight: "4rem" }}>
            {text}
          </span>
        </div>
      </div>

      {/* Count-up stats */}
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 6rem) 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(2rem, 5vw, 3rem)",
        }}
        className="sm:grid-cols-4"
      >
        {stats.map((s) => (
          <CountStat key={s.label} end={s.end} suffix={s.suffix} prefix={s.prefix} label={s.label} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (min-width: 640px) {
          .sm\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  );
}

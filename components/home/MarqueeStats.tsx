"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountStat({ end, suffix, prefix, label }: { end: number; suffix: string; prefix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const duration = 2200;
        const startTime = performance.now();

        function step(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          setVal(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
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
          color: "var(--text-primary)",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        {prefix}{val}{suffix}
      </p>
      <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-tertiary)", marginTop: "0.75rem" }}>
        {label}
      </p>
    </div>
  );
}

export default function MarqueeStats() {
  const { t } = useLang();

  const MARQUEE = t.marquee.text;

  const stats = [
    { end: 50, suffix: "+", label: t.marquee.features_label },
    { end: 7, suffix: "T", prefix: "<", label: t.marquee.delivery_label },
    { end: 100, suffix: "%", label: t.marquee.fixed_price_label },
    { end: 1000, suffix: "€", label: t.marquee.start_price_label },
  ];

  const text = MARQUEE + MARQUEE + MARQUEE;

  return (
    <section style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
      <div style={{ padding: "1.25rem 0", overflow: "hidden", borderBottom: "1px solid var(--border-light)" }}>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 50s linear infinite",  // slow and calm
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", paddingRight: "4rem", opacity: 0.6 }}>
            {text}
          </span>
          <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", paddingRight: "4rem", opacity: 0.6 }}>
            {text}
          </span>
        </div>
      </div>

      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 6rem) 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(2rem, 5vw, 3rem)",
        }}
        className="stats-grid"
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
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

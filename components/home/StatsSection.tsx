"use client";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { value: 20, prefix: "", suffix: "+", label: "FEATURES" },
  { value: 7, prefix: "<", suffix: "T", label: "LIEFERZEIT" },
  { value: 100, prefix: "", suffix: "%", label: "FESTPREIS" },
  { value: 100, prefix: "", suffix: "%", label: "ZUFRIEDENHEIT" },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const target = stat.value;

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div
      ref={ref}
      className={`stat-item stat-item-${index}`}
      style={{
        borderRight: index < STATS.length - 1 ? "1px solid var(--border-light)" : "none",
        padding: "clamp(1.25rem, 3vw, 2rem)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 200,
          color: "#06B6D4",
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          lineHeight: 1,
        }}
      >
        {stat.prefix && <span>{stat.prefix}</span>}
        <span>{count}</span>
        {stat.suffix && <span>{stat.suffix}</span>}
      </div>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          marginTop: "0.75rem",
          margin: "0.75rem 0 0 0",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 2.5rem);
        }
        @media (max-width: 639px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-item-1, .stat-item-3 { border-right: none !important; }
          .stat-item-0, .stat-item-1 { border-bottom: 1px solid var(--border-light); }
        }
      `}</style>
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <StatItem key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

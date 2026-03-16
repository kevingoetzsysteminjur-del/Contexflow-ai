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
      style={{
        borderRight: index < STATS.length - 1 ? "1px solid #111" : "none",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 200,
          color: "#F5F5F7",
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
          color: "#374151",
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
        background: "#030305",
        borderTop: "1px solid #111",
        borderBottom: "1px solid #111",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 2.5rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <style>{`
            @media (max-width: 639px) {
              .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div
            className="stats-grid"
            style={{
              display: "contents",
            }}
          >
            {STATS.map((stat, i) => (
              <StatItem key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .stats-outer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

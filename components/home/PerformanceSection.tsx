"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    name: "Braditsch.at",
    category: "Klangtherapie",
    ladezeit: "0.8s",
    scores: [
      { label: "PageSpeed", value: 95 },
      { label: "Mobile", value: 98 },
      { label: "SEO", value: 92 },
    ],
  },
  {
    name: "Marco Baber",
    category: "Coaching",
    ladezeit: "0.6s",
    scores: [
      { label: "PageSpeed", value: 97 },
      { label: "Mobile", value: 99 },
      { label: "SEO", value: 95 },
    ],
  },
  {
    name: "Plan A Immobilien",
    category: "Immobilien",
    ladezeit: "0.9s",
    scores: [
      { label: "PageSpeed", value: 94 },
      { label: "Mobile", value: 96 },
      { label: "SEO", value: 90 },
    ],
  },
];

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getColor(value: number) {
  if (value >= 90) return "#22C55E";
  if (value >= 80) return "#F59E0B";
  return "#EF4444";
}

function CircleGauge({ value, label, triggered }: { value: number; label: string; triggered: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const duration = 1200;
    const from = 0;
    const to = value;

    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [triggered, value]);

  const offset = CIRCUMFERENCE - (current / 100) * CIRCUMFERENCE;
  const color = getColor(value);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
          {/* Background track */}
          <circle
            cx="36"
            cy="36"
            r={RADIUS}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="5"
          />
          {/* Animated foreground */}
          <circle
            cx="36"
            cy="36"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        {/* Center number */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 300,
            color: color,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {current}
        </div>
      </div>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#4B5563",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project, index, triggered }: { project: typeof PROJECTS[0]; index: number; triggered: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#070709",
        border: "1px solid #111",
        borderRadius: "8px",
        padding: "clamp(1.5rem, 3vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Header */}
      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4B5563", marginBottom: "0.35rem" }}>
          {project.category}
        </p>
        <h3
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            color: "#F5F5F7",
            letterSpacing: "0.04em",
          }}
        >
          {project.name}
        </h3>
      </div>

      {/* Gauges */}
      <div
        style={{
          display: "flex",
          gap: "clamp(0.75rem, 2vw, 1.5rem)",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {project.scores.map((score) => (
          <CircleGauge
            key={score.label}
            value={score.value}
            label={score.label}
            triggered={triggered}
          />
        ))}

        {/* Ladezeit stat */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
              borderRadius: "50%",
              fontSize: 16,
              fontWeight: 300,
              color: "#22C55E",
              letterSpacing: "-0.02em",
            }}
          >
            {project.ladezeit}
          </div>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#4B5563",
            }}
          >
            Ladezeit
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PerformanceSection() {
  const headRef = useRef<HTMLElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-5% 0px" });
  const [triggered, setTriggered] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={headRef}
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "0.75rem" }}>
            PERFORMANCE
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 200,
              color: "#F5F5F7",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Messbare Ergebnisse. Nicht nur hübsch.
          </h2>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "#4B5563", letterSpacing: "0.02em", maxWidth: 520 }}>
            Jede Website die ich baue ist auf Performance optimiert. Keine Kompromisse.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          ref={triggerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} triggered={triggered} />
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: "2rem",
            fontSize: 12,
            color: "#374151",
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          Gemessen mit Google Lighthouse & PageSpeed Insights · Scores können je nach Netzwerk leicht variieren
        </p>
      </div>
    </section>
  );
}

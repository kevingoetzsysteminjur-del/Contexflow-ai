"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { num: "01", title: "GESPRÄCH", desc: "Kostenlose Erstberatung. Ich verstehe dein Business, deine Ziele, dein Budget." },
  { num: "02", title: "KONZEPT", desc: "Strategie, Struktur, Design-Direction. Kein Blindflug." },
  { num: "03", title: "UMSETZUNG", desc: "Code, Design, Content – alles aus einer Hand. Tägliche Updates." },
  { num: "04", title: "LAUNCH", desc: "Deployed, getestet, live. Mit Einweisung und Support danach." },
];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 25%"],
  });

  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const s0 = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const s1 = useTransform(scrollYProgress, [0.25, 0.5], [0.25, 1]);
  const s2 = useTransform(scrollYProgress, [0.5, 0.75], [0.25, 1]);
  const s3 = useTransform(scrollYProgress, [0.75, 1], [0.25, 1]);
  const stepOpacities = [s0, s1, s2, s3];

  return (
    <section ref={ref} style={{ background: "#0A0A0F", padding: "clamp(4rem, 8vw, 7rem) 1.5rem" }}>
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
          Prozess
        </p>

        {/* Timeline bar */}
        <div style={{ position: "relative", marginBottom: "3rem" }}>
          <div style={{ height: "1px", background: "#111120", width: "100%" }} />
          <motion.div
            style={{
              height: "1px",
              background: "#6366F1",
              width: fillWidth,
              position: "absolute",
              top: 0,
              left: 0,
              boxShadow: "0 0 8px rgba(99,102,241,0.6)",
            }}
          />
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="process-grid"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={{ opacity: stepOpacities[i] }}
            >
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#6366F1",
                  marginBottom: "0.75rem",
                }}
              >
                {step.num}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-heading), sans-serif",
                  fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
                  fontWeight: 200,
                  letterSpacing: "0.1em",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                {step.title}
              </p>
              <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#4B5563" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

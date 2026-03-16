"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

type Step = { day: string; title: string; text: string };

function StepItem({ step, index, total }: { step: Step; index: number; total: number }) {
  const isLast = index === total - 1;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "clamp(1.25rem, 3vw, 2rem)",
        position: "relative",
      }}
    >
      {/* Left: dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 250 }}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: inView ? "#6366F1" : "var(--bg-tertiary)",
            border: `2px solid ${inView ? "#6366F1" : "var(--bg-tertiary)"}`,
            boxShadow: inView ? "0 0 12px #6366F170" : "none",
            flexShrink: 0,
            marginTop: 4,
            transition: "background 0.4s ease, box-shadow 0.4s ease",
            position: "relative",
            zIndex: 1,
          }}
        />
        {/* Line below dot */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            style={{
              width: 1,
              background: "linear-gradient(180deg, #6366F160, #6366F110)",
              flex: 1,
              marginTop: 4,
              minHeight: 60,
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          paddingBottom: isLast ? 0 : "clamp(1.75rem, 4vw, 2.5rem)",
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6366F1",
            marginBottom: "0.4rem",
            display: "block",
          }}
        >
          {step.day}
        </span>
        <h3
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            color: "var(--text-primary)",
            margin: "0 0 0.5rem 0",
            letterSpacing: "0.03em",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-tertiary)",
            margin: 0,
            lineHeight: 1.7,
            maxWidth: 480,
          }}
        >
          {step.text}
        </p>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const { t } = useLang();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.4 });
  const bannerRef = useRef(null);
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.6 });

  const STEPS: Step[] = [
    { day: t.process.day0_label, title: t.process.day0_title, text: t.process.day0_desc },
    { day: t.process.day12_label, title: t.process.day12_title, text: t.process.day12_desc },
    { day: t.process.day35_label, title: t.process.day35_title, text: t.process.day35_desc },
    { day: t.process.day57_label, title: t.process.day57_title, text: t.process.day57_desc },
    { day: t.process.day7_label, title: t.process.day7_title, text: t.process.day7_desc },
  ];

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <style>{`
          .process-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(2rem, 5vw, 5rem);
            align-items: start;
          }
          @media (max-width: 767px) { .process-layout { grid-template-columns: 1fr !important; } }
        `}</style>
        <div className="process-layout">
            {/* Left: Header + Highlight Banner */}
            <div>
              <motion.div
                ref={headRef}
                initial={{ opacity: 0, y: 20 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: "2.5rem" }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "#6366F1",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  PROCESS
                </p>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 200,
                    color: "var(--text-primary)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.2,
                    margin: "0 0 1rem 0",
                  }}
                >
                  {t.process.section_title}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-tertiary)",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: 400,
                  }}
                >
                  {t.process.subtitle}
                </p>
              </motion.div>

              {/* Highlight banner */}
              <motion.div
                ref={bannerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={bannerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: "1px solid #6366F130",
                  borderRadius: 4,
                  padding: "1.5rem 1.75rem",
                  background: "var(--bg-card)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, #6366F108 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#6366F1",
                    margin: "0 0 0.6rem 0",
                  }}
                >
                  {t.process.guarantee_label}
                </p>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    fontWeight: 300,
                    color: "var(--text-primary)",
                    margin: 0,
                    lineHeight: 1.4,
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.process.guarantee_desc}
                </p>
              </motion.div>
            </div>

            {/* Right: Timeline */}
            <div style={{ paddingTop: "0.25rem" }}>
              {STEPS.map((step, i) => (
                <StepItem key={i} step={step} index={i} total={STEPS.length} />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}

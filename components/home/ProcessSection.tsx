"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  { n: "01", title: "Gespräch", text: "Wir reden. Ich höre zu. Du erzählst mir was du brauchst." },
  { n: "02", title: "Konzept", text: "Ich entwickle einen Plan. Du siehst ein Mockup in 48h." },
  { n: "03", title: "Umsetzung", text: "Ich baue. Du siehst Fortschritt in Echtzeit." },
  { n: "04", title: "Launch", text: "Deine Seite geht live. Support inklusive." },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.4"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#6366F1",
            marginBottom: "3rem",
            margin: "0 0 3rem 0",
          }}
        >
          PROCESS
        </p>

        {/* Desktop layout */}
        <div className="process-desktop">
          <style>{`
            @media (max-width: 639px) { .process-desktop { display: none !important; } }
            @media (min-width: 640px) { .process-mobile { display: none !important; } }
          `}</style>

          {/* Animated line */}
          <div style={{ position: "relative", marginBottom: "3rem", height: 1, background: "#111", width: "100%" }}>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                background: "#6366F1",
                width: lineWidth,
                transformOrigin: "left",
              }}
            />
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
            {STEPS.map((step, i) => {
              const start = i / STEPS.length;
              const end = (i + 1) / STEPS.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

              return (
                <motion.div key={i} style={{ opacity }}>
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: 200,
                      color: "#6366F1",
                      marginBottom: "0.75rem",
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      color: "#F5F5F7",
                      marginBottom: "0.5rem",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#4B5563", margin: 0 }}>
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="process-mobile" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                borderLeft: "1px solid #111",
                paddingLeft: "1.5rem",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 200, color: "#6366F1", lineHeight: 1, marginBottom: "0.5rem" }}>
                {step.n}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 400, color: "#F5F5F7", margin: "0 0 0.5rem 0" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "#4B5563", margin: 0 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

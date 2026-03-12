"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    number: "01",
    title: "WEBSITES",
    desc: "Moderne, blitzschnelle Seiten die Kunden konvertieren. Next.js, Tailwind, deployed in Tagen.",
    detail: "Von der Landingpage bis zur komplexen Business-Website. Jede Seite ist mobile-first, SEO-optimiert und auf Conversion ausgelegt. Kein Page-Builder, kein WordPress – echte Architektur.",
  },
  {
    number: "02",
    title: "AI INTEGRATION",
    desc: "Chatbots, Automatisierung, smarte Workflows. KI die für dein Business arbeitet.",
    detail: "Ich integriere KI direkt in deine Prozesse. Kunden-Chatbots, automatische Antworten, smarte Formulare – alles was dir Stunden spart und Kunden beeindruckt.",
  },
  {
    number: "03",
    title: "CONTEXT ENGINEERING",
    desc: "Die Kunst, AI-Systemen den richtigen Kontext zu geben. Bessere Prompts, bessere Ergebnisse.",
    detail: "Context Engineering ist mehr als Prompting. Es ist die Architektur wie KI-Systeme Informationen verarbeiten. Das Ergebnis: AI die wirklich tut was du willst.",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section style={{ background: "#050508", padding: "clamp(4rem, 8vw, 7rem) 0" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <p
          style={{
            color: "#6366F1",
            fontSize: "11px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          Leistungen
        </p>

        <div>
          {services.map((s, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: "1px", background: "#111120" }} />}
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ position: "relative", cursor: "default" }}
              >
                {/* Giant background number */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    fontSize: "clamp(5rem, 10vw, 8rem)",
                    fontWeight: 900,
                    color: "#6366F1",
                    opacity: active === i ? 0.07 : 0.03,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    fontFamily: "var(--font-heading), sans-serif",
                    transition: "opacity 0.4s",
                  }}
                >
                  {s.number}
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: active === i ? "auto" : 110 }}
                  transition={{ duration: 0.45, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: "hidden", minHeight: 110 }}
                >
                  <div style={{ padding: "2rem 0", display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "#6366F1",
                        paddingTop: "4px",
                        flexShrink: 0,
                        fontFamily: "var(--font-body), sans-serif",
                      }}
                    >
                      {s.number}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                          fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                          fontWeight: 200,
                          letterSpacing: "0.15em",
                          color: active === i ? "#ffffff" : "#9CA3AF",
                          marginBottom: "0.75rem",
                          transition: "color 0.3s",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.7,
                          color: "#4B5563",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {s.desc}
                      </p>
                      <AnimatePresence>
                        {active === i && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.35 }}
                            style={{
                              marginTop: "1rem",
                              fontSize: "13px",
                              lineHeight: 1.8,
                              color: "#6B7280",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {s.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

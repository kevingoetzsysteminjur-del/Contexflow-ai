"use client";

import { useState } from "react";

const services = [
  {
    number: "01",
    title: "WEBSITES",
    desc: "Moderne, blitzschnelle Seiten die Kunden konvertieren. Next.js, Tailwind, deployed in Tagen.",
    detail: "Von der Landingpage bis zur komplexen Business-Website. Mobile-first, SEO-optimiert, auf Conversion ausgelegt. Kein Page-Builder, kein WordPress – echte Architektur.",
  },
  {
    number: "02",
    title: "AI INTEGRATION",
    desc: "Chatbots, Automatisierung, smarte Workflows. KI die für dein Business arbeitet.",
    detail: "Ich integriere KI direkt in deine Prozesse. Kunden-Chatbots, automatische Antworten, smarte Formulare – alles was dir Zeit spart und Kunden beeindruckt.",
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
        <p style={{ color: "#6366F1", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          Leistungen
        </p>

        <div>
          {services.map((s, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: "1px", background: "#0d0d18" }} />}

              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  position: "relative",
                  padding: "2rem 0",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: active === i ? "scale(1.01)" : "scale(1)",
                  cursor: "default",
                }}
              >
                {/* Background number */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "clamp(5rem, 10vw, 8rem)",
                    fontWeight: 900,
                    color: "#6366F1",
                    opacity: active === i ? 0.06 : 0.025,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    fontFamily: "var(--font-heading), sans-serif",
                    transition: "opacity 0.7s ease",
                  }}
                >
                  {s.number}
                </div>

                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", paddingTop: "4px", flexShrink: 0 }}>
                    {s.number}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading), sans-serif",
                        fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                        fontWeight: 200,
                        letterSpacing: "0.15em",
                        color: active === i ? "#ffffff" : "#6B7280",
                        marginBottom: "0.75rem",
                        transition: "color 0.6s ease",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.75,
                        color: "#374151",
                        letterSpacing: "0.02em",
                        transition: "color 0.6s ease",
                      }}
                    >
                      {s.desc}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.8,
                        color: "#4B5563",
                        letterSpacing: "0.02em",
                        marginTop: "0.75rem",
                        opacity: active === i ? 1 : 0,
                        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        maxHeight: active === i ? "100px" : 0,
                        overflow: "hidden",
                      }}
                    >
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

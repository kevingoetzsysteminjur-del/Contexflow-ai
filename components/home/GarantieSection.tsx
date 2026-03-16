"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function GarantieBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(197, 160, 40, 0.08)",
        border: "1px solid rgba(197, 160, 40, 0.3)",
        borderRadius: "6px",
        padding: "6px 14px",
        fontSize: 12,
        color: "#C5A028",
        letterSpacing: "0.06em",
      }}
    >
      <ShieldCheck size={13} />
      100% Zufriedenheitsgarantie
    </div>
  );
}

export default function GarantieSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "2rem",
          }}
        >
          {/* Seal */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer ring */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: "2px solid rgba(197, 160, 40, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Inner ring */}
              <div
                style={{
                  width: 116,
                  height: 116,
                  borderRadius: "50%",
                  border: "1px solid rgba(197, 160, 40, 0.25)",
                  background: "radial-gradient(circle at center, rgba(197,160,40,0.08) 0%, transparent 70%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <ShieldCheck size={32} style={{ color: "#C5A028" }} />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#C5A028",
                    fontWeight: 500,
                  }}
                >
                  Garantie
                </span>
              </div>

              {/* Decorative dots around the circle */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  style={{
                    position: "absolute",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(197,160,40,0.35)",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-68px)`,
                  }}
                />
              ))}
            </div>

            {/* Glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle at center, rgba(197,160,40,0.12) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Headline */}
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#C5A028",
                marginBottom: "0.75rem",
              }}
            >
              GARANTIE
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 200,
                color: "var(--text-primary)",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              100% Zufriedenheitsgarantie
            </h2>
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                color: "var(--text-tertiary)",
                lineHeight: 1.8,
                maxWidth: 560,
                margin: "0 auto",
                letterSpacing: "0.02em",
              }}
            >
              Wenn du nach dem Launch nicht zufrieden bist, bekommst du dein Geld zurück.{" "}
              <span style={{ color: "var(--text-secondary)" }}>Ohne Wenn und Aber.</span>{" "}
              So überzeugt bin ich von meiner Arbeit.
            </p>
          </div>

          {/* Three trust points */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
          >
            {[
              "Keine versteckten Kosten",
              "Kein Abo, kein Risiko",
              "Volle Transparenz ab Tag 1",
            ].map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: 13,
                  color: "var(--text-tertiary)",
                  letterSpacing: "0.03em",
                }}
              >
                <span style={{ color: "#C5A028", fontSize: 10 }}>✦</span>
                {point}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

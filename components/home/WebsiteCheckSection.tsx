"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const BENEFITS = [
  "Ladezeit-Analyse (Core Web Vitals)",
  "SEO-Check & Google-Ranking-Potenzial",
  "Design & Conversion-Bewertung",
  "Persönliches Feedback innerhalb von 24h",
];

export default function WebsiteCheckSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
        >
          <style>{`
            @media (max-width: 767px) { .wcs-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="wcs-grid" style={{ display: "contents" }}>
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#6366F1",
                  marginBottom: "1rem",
                  margin: "0 0 1rem 0",
                }}
              >
                KOSTENLOS
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  fontWeight: 200,
                  color: "var(--text-primary)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.2,
                  margin: "0 0 1.25rem 0",
                }}
              >
                Kostenloser
                <br />
                Website-Check
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-tertiary)",
                  lineHeight: 1.75,
                  margin: "0 0 2rem 0",
                  maxWidth: 460,
                }}
              >
                Finde heraus was deine Seite wirklich taugt.
                In 24 Stunden. Kostenlos.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                {BENEFITS.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: "1px solid #6366F160",
                        background: "#6366F115",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 10,
                        color: "#6366F1",
                      }}
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="/website-check"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.9rem 2rem",
                  background: "#6366F1",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 2,
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#4F46E5";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#6366F1";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Gratis Website-Check
                <span style={{ fontSize: 16 }}>→</span>
              </Link>
            </motion.div>

            {/* Right — decorative card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: "1px solid var(--border-light)",
                borderRadius: 4,
                padding: "2.5rem",
                background: "var(--bg-card)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #6366F120 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-tertiary)", margin: "0 0 1.5rem 0" }}>
                Was du bekommst
              </p>

              {[
                { label: "Ladezeit", value: "< 2s Ziel", score: 85 },
                { label: "SEO Score", value: "87 / 100", score: 87 },
                { label: "Design", value: "Conversion-optimiert", score: 70 },
                { label: "Mobile", value: "Responsive", score: 92 },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: i < 3 ? "1.25rem" : 0,
                    borderBottom: i < 3 ? "1px solid #0d0d15" : "none",
                    paddingBottom: i < 3 ? "1.25rem" : 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: "#6366F1", letterSpacing: "0.05em" }}>{item.value}</span>
                  </div>
                  <div
                    style={{
                      height: 2,
                      background: "var(--border-light)",
                      borderRadius: 2,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${item.score}%`,
                        background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              ))}

              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-tertiary)",
                  marginTop: "1.5rem",
                  margin: "1.5rem 0 0 0",
                  letterSpacing: "0.05em",
                }}
              >
                Beispiel-Analyse — deine Werte können abweichen.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const INVESTMENT = 1000;

function formatNum(n: number): string {
  if (n >= 1000) return n.toLocaleString("de-DE");
  return n.toString();
}

type SliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
};

function SliderField({ label, value, min, max, step, suffix, onChange }: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <span style={{ fontSize: 13, color: "#9CA3AF", letterSpacing: "0.03em" }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 400, color: "#F5F5F7" }}>
          {suffix === "€" ? `${formatNum(value)} ${suffix}` : `${value} ${suffix}`}
        </span>
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        {/* Track */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            background: "#1a1a2e",
            borderRadius: 2,
          }}
        />
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: 2,
            background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
            borderRadius: 2,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            opacity: 0,
            cursor: "pointer",
            height: 20,
            margin: 0,
            padding: 0,
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            transform: "translateX(-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#6366F1",
            boxShadow: "0 0 8px #6366F150",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function ROIRechner() {
  const [visitors, setVisitors] = useState(500);
  const [revenue, setRevenue] = useState(500);
  const [currentCR, setCurrentCR] = useState(1);
  const [newCR, setNewCR] = useState(3);

  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, amount: 0.25 });

  const currentCustomers = Math.round((visitors * currentCR) / 100);
  const newCustomers = Math.round((visitors * newCR) / 100);
  const currentMonthly = currentCustomers * revenue;
  const newMonthly = newCustomers * revenue;
  const diffMonthly = newMonthly - currentMonthly;
  const diffYearly = diffMonthly * 12;
  const paybackDays = diffMonthly > 0 ? Math.ceil((INVESTMENT / diffMonthly) * 30) : null;

  return (
    <section
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
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
            ROI-RECHNER
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 200,
              color: "#F5F5F7",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              margin: "0 0 0.75rem 0",
            }}
          >
            Was bringt dir eine professionelle Website?
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
            Rechne selbst.
          </p>
        </motion.div>

        {/* Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "start",
          }}
        >
          <style>{`
            @media (max-width: 767px) { .roi-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="roi-grid" style={{ display: "contents" }}>
            {/* Sliders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: "1px solid #111",
                borderRadius: 4,
                padding: "2rem",
                background: "#050508",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#374151",
                  margin: "0 0 1.75rem 0",
                }}
              >
                Deine Zahlen
              </p>

              <SliderField
                label="Besucher / Monat"
                value={visitors}
                min={0}
                max={10000}
                step={50}
                suffix="Besucher"
                onChange={setVisitors}
              />
              <SliderField
                label="Umsatz pro Kunde"
                value={revenue}
                min={100}
                max={10000}
                step={50}
                suffix="€"
                onChange={setRevenue}
              />
              <SliderField
                label="Aktuelle Conversion-Rate"
                value={currentCR}
                min={0.1}
                max={5}
                step={0.1}
                suffix="%"
                onChange={setCurrentCR}
              />
              <SliderField
                label="Neue Conversion-Rate (mit Contexflow)"
                value={newCR}
                min={1}
                max={10}
                step={0.1}
                suffix="%"
                onChange={setNewCR}
              />
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Current */}
              <div
                style={{
                  border: "1px solid #111",
                  borderRadius: 4,
                  padding: "1.5rem",
                  marginBottom: "1rem",
                  background: "#050508",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#374151",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Aktuell
                </p>
                <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 0.25rem 0" }}>
                  {currentCustomers} Kunde{currentCustomers !== 1 ? "n" : ""} / Monat
                </p>
                <div
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 200,
                    color: "#9CA3AF",
                    letterSpacing: "-0.01em",
                    transition: "all 0.3s ease",
                  }}
                >
                  {formatNum(currentMonthly)} €
                  <span
                    style={{
                      fontSize: 12,
                      color: "#374151",
                      marginLeft: "0.5rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    / Monat
                  </span>
                </div>
              </div>

              {/* With Contexflow */}
              <div
                style={{
                  border: "1px solid #6366F130",
                  borderRadius: 4,
                  padding: "1.5rem",
                  marginBottom: "1rem",
                  background: "#0a0a18",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #6366F115, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#6366F1",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Mit Contexflow
                </p>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 0.25rem 0" }}>
                  {newCustomers} Kunde{newCustomers !== 1 ? "n" : ""} / Monat
                </p>
                <div
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 200,
                    color: "#F5F5F7",
                    letterSpacing: "-0.01em",
                    transition: "all 0.3s ease",
                  }}
                >
                  {formatNum(newMonthly)} €
                  <span
                    style={{
                      fontSize: 12,
                      color: "#6B7280",
                      marginLeft: "0.5rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    / Monat
                  </span>
                </div>
              </div>

              {/* Difference */}
              <div
                style={{
                  border: "1px solid #111",
                  borderRadius: 4,
                  padding: "1.5rem",
                  marginBottom: "1.25rem",
                  background: "#050508",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#374151", margin: "0 0 0.4rem 0" }}>
                    Mehr pro Monat
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      fontWeight: 300,
                      color: diffMonthly > 0 ? "#6366F1" : "#4B5563",
                      margin: 0,
                      transition: "color 0.3s ease",
                    }}
                  >
                    +{formatNum(diffMonthly)} €
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#374151", margin: "0 0 0.4rem 0" }}>
                    Mehr pro Jahr
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      fontWeight: 300,
                      color: diffYearly > 0 ? "#8B5CF6" : "#4B5563",
                      margin: 0,
                      transition: "color 0.3s ease",
                    }}
                  >
                    +{formatNum(diffYearly)} €
                  </p>
                </div>
              </div>

              {/* Payback */}
              {paybackDays !== null && (
                <div
                  style={{
                    border: "1px solid #1a1a2e",
                    borderRadius: 4,
                    padding: "1.25rem 1.5rem",
                    marginBottom: "1.5rem",
                    background: "#080810",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid #6366F130",
                      background: "#6366F110",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 16,
                      color: "#6366F1",
                    }}
                  >
                    ↩
                  </div>
                  <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0, lineHeight: 1.5 }}>
                    Deine Website zahlt sich nach{" "}
                    <strong style={{ color: "#F5F5F7", fontWeight: 400 }}>
                      {paybackDays} Tagen
                    </strong>{" "}
                    aus
                    <span style={{ fontSize: 11, color: "#374151", display: "block" }}>
                      (bei {INVESTMENT.toLocaleString("de-DE")} € Investition)
                    </span>
                  </p>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/kontakt"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.9rem 1.5rem",
                  background: "#6366F1",
                  color: "#fff",
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 2,
                  transition: "background 0.2s ease, transform 0.2s ease",
                  width: "100%",
                  boxSizing: "border-box",
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
                Klingt gut? Lass uns reden. →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

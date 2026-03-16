"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const ADDONS = [
  { key: "chat", name: "KI-Chatbot", desc: "24/7 automatische Kundenanfragen beantworten", price: 500 },
  { key: "booking", name: "Terminbuchung", desc: "Online-Kalender mit automatischer Bestätigung", price: 300 },
  { key: "seo", name: "SEO-Paket", desc: "Erweiterte Suchmaschinenoptimierung & Monitoring", price: 400 },
  { key: "lead", name: "Lead-Qualifizierung", desc: "Automatischer Fragebogen mit Bewertungssystem", price: 350 },
  { key: "analytics", name: "Analytics-Dashboard", desc: "Echtzeit-Besucherstatistiken & Conversion-Tracking", price: 250 },
  { key: "care", name: "Wartung & Support", desc: "Monatliche Updates, Backups & technischer Support", price: 99, monthly: true },
];

export default function AddonsSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  function toggle(key: string) {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  const oneTime = ADDONS.filter(a => selected.includes(a.key) && !a.monthly).reduce((s, a) => s + a.price, 0);
  const monthlyAddon = ADDONS.find(a => a.key === "care" && selected.includes("care"));

  return (
    <section
      style={{
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "0.75rem" }}>
            ZUSATZOPTIONEN
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
            Erweitere dein Paket.
          </h2>
          <p style={{ fontSize: 13, color: "#4B5563", maxWidth: "55ch", lineHeight: 1.75 }}>
            Kombiniere dein Website-Paket mit KI-Features. Wähle was du brauchst — der Preis aktualisiert sich live.
          </p>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: "#111", marginBottom: 0 }} />

        {/* Addon rows */}
        {ADDONS.map((addon, i) => {
          const on = selected.includes(addon.key);
          return (
            <motion.button
              key={addon.key}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => toggle(addon.key)}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                alignItems: "center",
                gap: "clamp(1rem, 3vw, 2rem)",
                padding: "clamp(1.25rem, 2.5vw, 1.75rem) 0",
                borderBottom: "1px solid #111",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#060608"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {/* Name + desc */}
              <div>
                <span style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", fontWeight: 300, color: on ? "#F5F5F7" : "#9CA3AF", letterSpacing: "0.03em", display: "block", marginBottom: "0.25rem", transition: "color 0.2s" }}>
                  {addon.name}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.02em" }}>
                  {addon.desc}
                </span>
              </div>

              {/* Price */}
              <span style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", fontWeight: 200, color: on ? "#6366F1" : "#4B5563", letterSpacing: "0.03em", flexShrink: 0, transition: "color 0.2s" }}>
                +{addon.price} €{addon.monthly ? "/Mo." : " einmalig"}
              </span>

              {/* Toggle */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  border: on ? "1px solid #6366F1" : "1px solid #222",
                  background: on ? "#6366F1" : "transparent",
                  borderRadius: 2,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                {on && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}

        {/* Live total */}
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: "2rem",
              padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
              border: "1px solid #6366F130",
              background: "var(--bg-card)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--text-tertiary)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                Zusatzoptionen gesamt
              </p>
              <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.75rem" }}>
                {oneTime > 0 && (
                  <span style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
                    +{oneTime.toLocaleString("de-DE")} €{" "}
                    <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>einmalig</span>
                  </span>
                )}
                {monthlyAddon && (
                  <span style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 200, color: "#6366F1" }}>
                    +{monthlyAddon.price} €/Monat
                  </span>
                )}
              </div>
            </div>
            <Link
              href={`/kontakt?addons=${selected.join(",")}`}
              style={{
                display: "inline-block",
                padding: "0.75rem 1.75rem",
                border: "1px solid #6366F1",
                background: "#6366F1",
                color: "var(--text-primary)",
                textDecoration: "none",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "background 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
            >
              ANGEBOT ANFRAGEN →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

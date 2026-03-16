"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { UrgencyBadge } from "@/components/home/UrgencyBanner";
import { GarantieBadge } from "@/components/home/GarantieSection";

const TIERS = [
  {
    num: "01",
    name: "Landingpage",
    price: "500 €",
    unit: "einmalig",
    tags: ["1 Seite", "Kontaktformular", "SEO", "~1 Woche"],
    recommended: false,
  },
  {
    num: "02",
    name: "Business Website",
    price: "1.000 €",
    unit: "einmalig",
    tags: ["Bis 5 Seiten", "Professionelles Design", "Analytics", "2–3 Wochen"],
    recommended: true,
  },
  {
    num: "03",
    name: "Premium Website",
    price: "2.000 €",
    unit: "einmalig",
    tags: ["Unbegrenzte Seiten", "Animationen", "Blog", "1 Monat Support"],
    recommended: false,
  },
  {
    num: "04",
    name: "AI & Enterprise",
    price: "Auf Anfrage",
    unit: "",
    tags: ["Web-App", "Context Engineering", "AI-Integration", "Chatbots"],
    recommended: false,
  },
];

function Row({ tier, index }: { tier: typeof TIERS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: "1px solid #111",
        padding: "clamp(1.5rem, 3vw, 2rem) 0",
        display: "grid",
        gridTemplateColumns: "2rem 1fr auto",
        gap: "clamp(1rem, 3vw, 2.5rem)",
        alignItems: "center",
        position: "relative",
        transition: "background 0.3s ease",
      }}
      className="pricing-row"
    >
      {/* Number */}
      <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#374151", fontVariantNumeric: "tabular-nums" }}>
        {tier.num}
      </span>

      {/* Name + Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.75rem 1.5rem" }}>
        <span
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontWeight: 300,
            color: tier.recommended ? "#F5F5F7" : "#9CA3AF",
            letterSpacing: "0.04em",
            transition: "color 0.3s",
          }}
        >
          {tier.name}
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {tier.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "2px 8px",
                border: "1px solid #1a1a1a",
                color: "#4B5563",
                letterSpacing: "0.05em",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {tier.recommended && (
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#6366F1",
              border: "1px solid #6366F140",
              padding: "2px 8px",
              borderRadius: 2,
            }}
          >
            Empfohlen
          </span>
        )}
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <span
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 200,
            color: tier.recommended ? "#F5F5F7" : "#6B7280",
            letterSpacing: "0.02em",
          }}
        >
          {tier.price}
        </span>
        {tier.unit && (
          <span style={{ fontSize: 11, color: "#374151", marginLeft: "0.4rem" }}>{tier.unit}</span>
        )}
      </div>

      <style>{`
        .pricing-row:hover span[style*="color: #9CA3AF"] { color: #F5F5F7; }
      `}</style>
    </motion.div>
  );
}

export default function PricingSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-5% 0px" });

  return (
    <section
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Urgency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "1.5rem" }}
        >
          <UrgencyBadge />
        </motion.div>

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "0.75rem" }}>
              PRICING
            </p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 200, color: "#F5F5F7", letterSpacing: "0.04em", lineHeight: 1.2 }}>
              Klare Preise. Kein Kleingedrucktes.
            </h2>
          </div>
          <Link
            href="/preise"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#374151",
              textDecoration: "none",
              transition: "color 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#6366F1")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#374151")}
          >
            Alle Details →
          </Link>
        </motion.div>

        {/* Divider top */}
        <div style={{ height: 1, background: "#111", marginBottom: 0 }} />

        {/* Rows */}
        {TIERS.map((tier, i) => (
          <Row key={tier.num} tier={tier} index={i} />
        ))}

        {/* Footer note */}
        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#374151", letterSpacing: "0.05em" }}>
          Alle Preise sind Festpreise — kein Stundensatz. Kein Abo. Kein Kleingedrucktes.
        </p>

        {/* Guarantee badge */}
        <div style={{ marginTop: "1.5rem" }}>
          <GarantieBadge />
        </div>
      </div>
    </section>
  );
}

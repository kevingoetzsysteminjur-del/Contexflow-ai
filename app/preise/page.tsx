"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AddonsSection from "./AddonsSection";
import { useLang } from "@/contexts/LanguageContext";

function PaketCard({ paket, index, recommended, recommendedLabel }: {
  paket: {
    num: string;
    name: string;
    preis: string;
    einheit: string;
    beschreibung: string;
    features: string[];
    cta: string;
    recommended: boolean;
  };
  index: number;
  recommended: boolean;
  recommendedLabel: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        border: recommended ? "1px solid #6366F130" : "1px solid var(--border-light)",
        background: recommended ? "var(--bg-card)" : "transparent",
        padding: "clamp(1.75rem, 3vw, 2.5rem)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {recommended && (
        <span
          style={{
            position: "absolute",
            top: "clamp(1.75rem, 3vw, 2.5rem)",
            right: "clamp(1.75rem, 3vw, 2.5rem)",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6366F1",
            border: "1px solid #6366F140",
            padding: "3px 10px",
            borderRadius: 2,
          }}
        >
          {recommendedLabel}
        </span>
      )}

      {/* Header */}
      <div style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--text-tertiary)", display: "block", marginBottom: "0.75rem" }}>
          {paket.num}
        </span>
        <h3
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 300,
            color: recommended ? "var(--text-primary)" : "#9CA3AF",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
          }}
        >
          {paket.name}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6, maxWidth: "28ch" }}>
          {paket.beschreibung}
        </p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)", paddingBottom: "clamp(1.5rem, 3vw, 2rem)", borderBottom: "1px solid var(--border-light)" }}>
        <span
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 200,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}
        >
          {paket.preis}
        </span>
        {paket.einheit && (
          <span style={{ fontSize: 12, color: "var(--text-tertiary)", marginLeft: "0.5rem" }}>{paket.einheit}</span>
        )}
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto 0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {paket.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
            <span style={{ fontSize: 11, color: "#6366F1", flexShrink: 0 }}>—</span>
            <span style={{ fontSize: 13, color: "var(--text-tertiary)", letterSpacing: "0.02em" }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/kontakt"
        style={{
          display: "block",
          marginTop: "clamp(1.75rem, 3vw, 2.5rem)",
          padding: "0.75rem 1.25rem",
          border: recommended ? "1px solid #6366F1" : "1px solid #1a1a1a",
          background: recommended ? "#6366F1" : "transparent",
          color: "var(--text-primary)",
          textDecoration: "none",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = recommended ? "#4F46E5" : "var(--bg-card-hover)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = recommended ? "#6366F1" : "transparent";
        }}
      >
        {paket.cta}
      </Link>
    </motion.div>
  );
}

function FaqItem({ item, index }: { item: { f: string; a: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: "1px solid var(--border-light)", padding: "clamp(1.25rem, 2.5vw, 1.75rem) 0" }}
    >
      <p style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "0.03em", marginBottom: "0.6rem" }}>
        {item.f}
      </p>
      <p style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.75, maxWidth: "65ch" }}>
        {item.a}
      </p>
    </motion.div>
  );
}

export default function PreisePage() {
  const { t } = useLang();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const PAKETE = [
    {
      num: "01",
      name: t.preise.p1_name,
      preis: t.preise.p1_price,
      einheit: t.preise.p1_unit,
      beschreibung: t.preise.p1_desc,
      features: [t.preise.p1_f1, t.preise.p1_f2, t.preise.p1_f3, t.preise.p1_f4, t.preise.p1_f5, t.preise.p1_f6],
      cta: t.preise.p1_cta,
      recommended: false,
    },
    {
      num: "02",
      name: t.preise.p2_name,
      preis: t.preise.p2_price,
      einheit: t.preise.p2_unit,
      beschreibung: t.preise.p2_desc,
      features: [t.preise.p2_f1, t.preise.p2_f2, t.preise.p2_f3, t.preise.p2_f4, t.preise.p2_f5, t.preise.p2_f6, t.preise.p2_f7],
      cta: t.preise.p2_cta,
      recommended: true,
    },
    {
      num: "03",
      name: t.preise.p3_name,
      preis: t.preise.p3_price,
      einheit: t.preise.p3_unit,
      beschreibung: t.preise.p3_desc,
      features: [t.preise.p3_f1, t.preise.p3_f2, t.preise.p3_f3, t.preise.p3_f4, t.preise.p3_f5, t.preise.p3_f6, t.preise.p3_f7, t.preise.p3_f8],
      cta: t.preise.p3_cta,
      recommended: false,
    },
    {
      num: "04",
      name: t.preise.p4_name,
      preis: t.preise.p4_price,
      einheit: t.preise.p4_unit,
      beschreibung: t.preise.p4_desc,
      features: [t.preise.p4_f1, t.preise.p4_f2, t.preise.p4_f3, t.preise.p4_f4, t.preise.p4_f5, t.preise.p4_f6],
      cta: t.preise.p4_cta,
      recommended: false,
    },
  ];

  const FAQ = [
    { f: t.preise.faq_q1, a: t.preise.faq_a1 },
    { f: t.preise.faq_q2, a: t.preise.faq_a2 },
    { f: t.preise.faq_q3, a: t.preise.faq_a3 },
    { f: t.preise.faq_q4, a: t.preise.faq_a4 },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        style={{
          borderBottom: "1px solid var(--border-light)",
          padding: "clamp(7rem, 12vw, 9rem) clamp(1.5rem, 4vw, 2.5rem) clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "1rem" }}>
              {t.preise.label}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              {t.preise.headline}<br />{t.preise.headline2}
            </h1>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: "var(--text-tertiary)", letterSpacing: "0.03em", maxWidth: "45ch", lineHeight: 1.75 }}>
              {t.preise.subline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pakete Grid */}
      <section
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: 0,
            border: "1px solid var(--border-light)",
          }}
        >
          {PAKETE.map((p, i) => (
            <PaketCard key={p.num} paket={p} index={i} recommended={p.recommended} recommendedLabel={t.preise.recommended} />
          ))}
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.05em", maxWidth: 1200, margin: "1.5rem auto 0" }}>
          {t.preise.all_fixed}
        </p>
      </section>

      {/* Zusatzoptionen */}
      <AddonsSection />

      {/* FAQ */}
      <section
        style={{
          borderTop: "1px solid var(--border-light)",
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "0.75rem" }}>{t.preise.faq_label}</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            {t.preise.faq_headline}
          </h2>
          <div style={{ height: 1, background: "var(--border-light)" }} />
          {FAQ.map((item, i) => (
            <FaqItem key={item.f} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          borderTop: "1px solid var(--border-light)",
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1rem" }}>
          {t.preise.cta_label}
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", marginBottom: "1rem" }}>
          {t.preise.cta_headline}
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: "clamp(2rem, 4vw, 3rem)", maxWidth: "45ch", margin: "0 auto clamp(2rem, 4vw, 3rem)" }}>
          {t.preise.cta_subline}
        </p>
        <Link
          href="/kontakt"
          style={{
            display: "inline-block",
            padding: "0.875rem 2.5rem",
            border: "1px solid #6366F1",
            background: "transparent",
            color: "var(--text-primary)",
            textDecoration: "none",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          {t.preise.cta_btn}
        </Link>
      </section>
    </div>
  );
}

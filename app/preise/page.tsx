"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AddonsSection from "./AddonsSection";

const PAKETE = [
  {
    num: "01",
    name: "Landingpage",
    preis: "500 €",
    einheit: "einmalig",
    beschreibung: "Perfekt für Einzelunternehmer, die schnell online sein wollen.",
    features: [
      "1 Seite (Landingpage)",
      "Responsive Design",
      "Kontaktformular",
      "SEO-Grundoptimierung",
      "Impressum & Datenschutz",
      "1 Runde Korrekturen",
    ],
    cta: "Landingpage anfragen",
    recommended: false,
  },
  {
    num: "02",
    name: "Business Website",
    preis: "1.000 €",
    einheit: "einmalig",
    beschreibung: "Die meistgebuchte Lösung für lokale Unternehmen.",
    features: [
      "Bis zu 5 Seiten",
      "Professionelles Design",
      "Kontaktformular & Karte",
      "SEO-Optimierung",
      "Google Analytics",
      "2 Runden Korrekturen",
      "Hosting-Einrichtung",
    ],
    cta: "Business Website anfragen",
    recommended: true,
  },
  {
    num: "03",
    name: "Premium Website",
    preis: "2.000 €",
    einheit: "einmalig",
    beschreibung: "Für Unternehmen, die einen starken digitalen Auftritt brauchen.",
    features: [
      "Unbegrenzte Seiten",
      "Individuelles Design",
      "Animationen & Effekte",
      "Blog / News-System",
      "Erweiterte SEO",
      "3 Runden Korrekturen",
      "Hosting & Domain",
      "1 Monat Support",
    ],
    cta: "Premium Website anfragen",
    recommended: false,
  },
  {
    num: "04",
    name: "AI & Enterprise",
    preis: "Auf Anfrage",
    einheit: "",
    beschreibung: "Komplexe Projekte, AI-Integration und maßgeschneiderte Lösungen.",
    features: [
      "Web-App Entwicklung",
      "Context Engineering",
      "AI-Integration & Chatbots",
      "API-Entwicklung",
      "Laufende Betreuung",
      "Individuelles Angebot",
    ],
    cta: "Angebot anfragen",
    recommended: false,
  },
];

const FAQ = [
  { f: "Gibt es monatliche Kosten?", a: "Nein. Du zahlst einmalig – fertig. Lediglich Hosting & Domain (ca. 10–15 €/Monat) kommen dazu, die du selbst abschließt." },
  { f: "Wie lange dauert ein Projekt?", a: "Eine Landingpage ist in 1–2 Wochen fertig. Business Websites dauern 2–4 Wochen, je nach Komplexität." },
  { f: "Was wenn ich nicht zufrieden bin?", a: "Wir besprechen alles vorab genau. Du hast immer Feedback-Runden inklusive. Am Ende stehst du zu 100% dahinter." },
  { f: "Kümmert ihr euch auch um Hosting?", a: "Auf Wunsch ja. Ich empfehle Vercel (für Next.js) oder Strato – und richte alles ein wenn gewünscht." },
];

function PaketCard({ paket, index }: { paket: typeof PAKETE[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        border: paket.recommended ? "1px solid #6366F130" : "1px solid var(--border-light)",
        background: paket.recommended ? "var(--bg-card)" : "transparent",
        padding: "clamp(1.75rem, 3vw, 2.5rem)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {paket.recommended && (
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
          Empfohlen
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
            color: paket.recommended ? "var(--text-primary)" : "#9CA3AF",
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
          border: paket.recommended ? "1px solid #6366F1" : "1px solid #1a1a1a",
          background: paket.recommended ? "#6366F1" : "transparent",
          color: "var(--text-primary)",
          textDecoration: "none",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = paket.recommended ? "#4F46E5" : "#111";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = paket.recommended ? "#6366F1" : "transparent";
        }}
      >
        {paket.cta}
      </Link>
    </motion.div>
  );
}

function FaqItem({ item, index }: { item: typeof FAQ[0]; index: number }) {
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
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

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
              PRICING
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Klare Preise.<br />Kein Kleingedrucktes.
            </h1>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: "var(--text-tertiary)", letterSpacing: "0.03em", maxWidth: "45ch", lineHeight: 1.75 }}>
              Festpreise — kein Stundensatz. Kein Abo. Du weißt vorher genau, was du zahlst.
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
            <PaketCard key={p.num} paket={p} index={i} />
          ))}
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.05em", maxWidth: 1200, margin: "1.5rem auto 0" }}>
          Alle Preise sind Festpreise — kein Stundensatz. Kein Abo. Kein Kleingedrucktes.
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
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            Häufige Fragen
          </h2>
          <div style={{ height: 1, background: "#111" }} />
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
          NICHT SICHER?
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", marginBottom: "1rem" }}>
          Ich helfe dir das richtige Paket zu finden.
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: "clamp(2rem, 4vw, 3rem)", maxWidth: "45ch", margin: "0 auto clamp(2rem, 4vw, 3rem)" }}>
          Schreib mir einfach. Keine Verpflichtung.
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
          JETZT BERATEN LASSEN →
        </Link>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Heilbronn – Moderne Next.js Websites für die Weinstadt | Contexflow AI",
  description:
    "Webdesign in Heilbronn. Kevin Götz (Contexflow AI) baut schnelle, individuelle Websites & KI-Lösungen für Unternehmen in Heilbronn und der Region. Festpreis ab 500€.",
};

export default function WebdesignHeilbronnPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <section
        style={{
          padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(4rem,8vw,6rem)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              color: "#6366F1",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Webdesign · Heilbronn
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem,5vw,3rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Webdesign Heilbronn –{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Websites die verkaufen
            </span>{" "}
            für Heilbronner Unternehmen
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Heilbronn ist ein starker Wirtschaftsstandort in Nordbaden-Württemberg – und Unternehmen
            hier brauchen eine digitale Präsenz die mithalten kann. Ich bin Kevin Götz von Contexflow
            AI, knapp eine Autostunde von Heilbronn entfernt in Mosbach. Ich baue individuelle
            Websites mit Next.js – schnell, modern, gefunden.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Was Heilbronner Unternehmen von mir bekommen
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>Website fertig in 7 Tagen – oder ich arbeite kostenlos nach</li>
            <li>Next.js – schneller und sicherer als WordPress</li>
            <li>Lokale SEO für Heilbronn, Neckarsulm, Bad Friedrichshall</li>
            <li>Kontaktformular, Google Analytics, SEO-Grundoptimierung inklusive</li>
            <li>Optional: KI-Chatbot für automatisierten Kundensupport</li>
            <li>Festpreis ab 500€ – kein Stundensatz, kein Abo</li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Warum nicht einfach Wix oder Jimdo?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            Baukästen wie Wix oder Jimdo sind günstig – aber sie ranken schlecht bei Google, laden
            langsam und sehen alle gleich aus. Wer in Heilbronn online gefunden werden will,
            braucht eine Website die technisch sauber ist. Next.js ist der Standard für
            professionelle Webentwicklung – und ich beherrsche ihn.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Branchen in Heilbronn
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Ich baue Websites für Handwerker, Gastronomen, Praxen, Immobilienmakler, Coaches und
            Dienstleister in Heilbronn, Neckarsulm, Bad Rappenau, Öhringen und der Region
            Heilbronn-Franken.
          </p>

          <Link
            href="/kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "14px 28px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366F1, #06B6D4)",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.95rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            Kostenloses Erstgespräch vereinbaren →
          </Link>
        </div>
      </section>
    </div>
  );
}

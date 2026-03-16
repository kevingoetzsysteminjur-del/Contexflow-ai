import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Mosbach – Moderne Websites für den Neckar-Odenwald-Kreis | Contexflow AI",
  description:
    "Professionelles Webdesign in Mosbach. Kevin Götz (Contexflow AI) baut schnelle Next.js Websites & KI-Lösungen für Unternehmen im Neckar-Odenwald-Kreis. Festpreis ab 500€.",
};

export default function WebdesignMosbachPage() {
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
            Webdesign · Mosbach
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
            Webdesign Mosbach –{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Moderne Websites
            </span>{" "}
            für Unternehmen im Neckar-Odenwald-Kreis
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Du suchst einen Webdesigner in Mosbach? Ich bin Kevin Götz von Contexflow AI – und ich
            baue moderne, schnelle Websites für lokale Unternehmen im Neckar-Odenwald-Kreis. Kein
            Template, kein Baukasten. Individuell entwickelt mit Next.js – der schnellsten
            Website-Technologie am Markt.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Warum lokales Webdesign besser ist
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            Ein Webdesigner aus Mosbach kennt die Region, die Zielgruppe und die lokalen
            Suchanfragen. Ich optimiere deine Website gezielt für Suchanfragen wie „Webdesign
            Mosbach", „Website erstellen Neckar-Odenwald" oder „[Deine Branche] Mosbach" – damit
            Kunden aus der Region dich finden. Keine Großagentur aus Frankfurt die dich nicht kennt.
            Direkter Kontakt, kurze Wege, persönliche Betreuung.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Was du bekommst
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>Professionelle Website in unter 7 Tagen</li>
            <li>Gebaut mit Next.js – blitzschnell und SEO-optimiert</li>
            <li>Lokale SEO für Mosbach und Umgebung</li>
            <li>Responsive Design – perfekt auf Handy und Desktop</li>
            <li>Optional: KI-Chatbot und Automatisierung</li>
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
            Branchen in Mosbach & Umgebung
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Ich arbeite mit Restaurants, Handwerkern, Ärzten, Immobilienmaklern, Fitnessstudios und
            anderen lokalen Dienstleistern in Mosbach, Neckarbischofsheim, Buchen, Sinsheim und im
            gesamten Neckar-Odenwald-Kreis. Egal ob du eine neue Website brauchst oder deine alte
            WordPress-Seite endlich ersetzen willst – ich helfe dir weiter.
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
          >
            Kostenloses Erstgespräch vereinbaren →
          </Link>
        </div>
      </section>
    </div>
  );
}

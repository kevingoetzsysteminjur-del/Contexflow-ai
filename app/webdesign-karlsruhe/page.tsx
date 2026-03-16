import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Karlsruhe – Next.js Websites & KI für die Fächerstadt | Contexflow AI",
  description:
    "Webdesign in Karlsruhe. Individuelle Next.js Websites & KI-Integration für Unternehmen in Karlsruhe und der TechnologieRegion. Kevin Götz (Contexflow AI). Festpreis ab 500€.",
};

export default function WebdesignKarlsruhePage() {
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
            Webdesign · Karlsruhe
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
            Webdesign Karlsruhe –{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tech-Websites
            </span>{" "}
            für die Fächerstadt
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Karlsruhe ist Deutschlands IT-Hauptstadt – hier erwarten Kunden und Partner digitale
            Kompetenz auf höchstem Niveau. Ich bin Kevin Götz von Contexflow AI und entwickle
            Websites mit Next.js und KI-Integration die diesen Ansprüchen gerecht werden. Schnell,
            modern, technisch auf dem neuesten Stand.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Webdesign auf Tech-Niveau – für Karlsruhe
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            In Karlsruhe sind Kunden technikaffin und haben hohe Erwartungen an Websites. Baukästen
            und veraltetes WordPress reichen hier nicht mehr. Ich baue mit Next.js – dem Framework
            das große Tech-Unternehmen weltweit einsetzen. Das Ergebnis: schnellste Ladezeiten,
            perfekte SEO-Werte und ein Design das Vertrauen aufbaut.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Was Karlsruher Unternehmen bekommen
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>Website-Entwicklung mit Next.js – kein Template</li>
            <li>Lieferzeit unter 7 Tage – Festpreis garantiert</li>
            <li>Lokale SEO für Karlsruhe, Ettlingen, Bretten, Bruchsal</li>
            <li>KI-Chatbot und Automatisierung optional</li>
            <li>API-Anbindungen und komplexe Webanwendungen möglich</li>
            <li>Preise ab 500€ – transparent, ohne versteckte Kosten</li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Für wen ich in Karlsruhe baue
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Startups, Tech-Unternehmen, Agenturen, Dienstleister, Handwerk, Gastronomie und alle
            die in Karlsruhe, Ettlingen, Pforzheim, Bruchsal und der TechnologieRegion Karlsruhe
            eine professionelle Website brauchen. Remote-Zusammenarbeit kein Problem.
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

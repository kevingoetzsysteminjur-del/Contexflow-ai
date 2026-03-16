import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Stuttgart – Individuelle Next.js Websites für Baden-Württembergs Metropole | Contexflow AI",
  description:
    "Webdesign in Stuttgart. Kevin Götz (Contexflow AI) entwickelt moderne Next.js Websites & KI-Lösungen für Unternehmen in Stuttgart und der Region. Festpreis ab 500€, unter 7 Tage Lieferzeit.",
};

export default function WebdesignStuttgartPage() {
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
            Webdesign · Stuttgart
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
            Webdesign Stuttgart –{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Premium Websites
            </span>{" "}
            für die Schwabenmetropole
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Stuttgart ist das wirtschaftliche Herz Baden-Württembergs – und hier zählt der erste
            Eindruck. Ich bin Kevin Götz von Contexflow AI und baue Websites die Stuttgart-typisch
            Qualität und Präzision ausstrahlen. Mit Next.js, KI-Integration und einem klaren Fokus
            auf Ergebnisse.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Webdesign für Stuttgart – qualitätsbewusst wie die Region
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            Stuttgarter Unternehmen stehen für Qualität – das sollte auch die Website widerspiegeln.
            Ich baue keine Massenware. Jede Website ist individuell konzipiert, auf deine Zielgruppe
            zugeschnitten und technisch auf dem höchsten Stand. Next.js statt WordPress bedeutet:
            schneller, sicherer, besser bei Google.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Was du von Contexflow AI in Stuttgart bekommst
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>Individuelle Website in Next.js – kein Baukasten</li>
            <li>Fertig in unter 7 Tagen – oder kostenlose Nacharbeit</li>
            <li>SEO für Stuttgart, Ludwigsburg, Böblingen, Esslingen</li>
            <li>KI-Chatbot und smarte Automatisierungen optional</li>
            <li>Professionelles Design das Vertrauen und Autorität ausstrahlt</li>
            <li>Festpreis ab 500€ – keine Überraschungen</li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Branchen in Stuttgart
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Ich unterstütze Unternehmen aus Automobil-Zulieferung, Maschinenbau, Medizin,
            Gastronomie, Einzelhandel, Beratung und Dienstleistung in Stuttgart,
            Stuttgart-Vaihingen, Ludwigsburg, Böblingen, Esslingen am Neckar und der Metropolregion
            Stuttgart.
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

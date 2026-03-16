import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Mannheim – Professionelle Websites & KI-Integration | Contexflow AI",
  description:
    "Webdesign in Mannheim. Kevin Götz (Contexflow AI) entwickelt moderne Next.js Websites & KI-Lösungen für Unternehmen in Mannheim und der Metropolregion Rhein-Neckar. Ab 500€ Festpreis.",
};

export default function WebdesignMannheimPage() {
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
            Webdesign · Mannheim
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
            Webdesign Mannheim –{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Performance-Websites
            </span>{" "}
            für die Quadratestadt
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Mannheim ist eine der wirtschaftlich stärksten Städte in Baden-Württemberg – und der
            Wettbewerb online ist entsprechend hart. Ich bin Kevin Götz von Contexflow AI und baue
            Websites die nicht nur gut aussehen, sondern auch performen. In Next.js. Mit SEO. Mit
            echtem Fokus auf Conversion.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Webdesign in Mannheim – was den Unterschied macht
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            In Mannheim konkurrieren viele Unternehmen um dieselben Suchbegriffe. Wer eine
            langsamere, schlechter optimierte Website hat, verliert. Ich baue mit Next.js –
            serverseitiges Rendering, schnelle Ladezeiten, perfekte Core Web Vitals. Das
            Google-Algorithmus belohnt das mit besseren Rankings. Deine Konkurrenz in Mannheim
            wird das spüren.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Leistungen für Mannheimer Unternehmen
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>Neue Website in unter 7 Tagen – fertig und live</li>
            <li>Next.js Entwicklung – kein WordPress, kein Baukasten</li>
            <li>Lokale SEO für Mannheim, Ludwigshafen, Rhein-Neckar</li>
            <li>KI-Chatbot für automatisierten Kundensupport</li>
            <li>Kontaktformular, Google Maps, Analytics inklusive</li>
            <li>Festpreise ab 500€ – alles inkl., keine Nachkosten</li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Branchen in Mannheim
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Ich unterstütze Unternehmen aus Gastronomie, Einzelhandel, Gesundheit, Immobilien,
            Handwerk, Bildung und Beratung in Mannheim, Ludwigshafen, Schwetzingen, Viernheim und
            der gesamten Metropolregion Rhein-Neckar.
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

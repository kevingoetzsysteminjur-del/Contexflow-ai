import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Heidelberg – Schnelle Next.js Websites für die Rhein-Neckar-Region | Contexflow AI",
  description:
    "Webdesign in Heidelberg und der Rhein-Neckar-Region. Kevin Götz (Contexflow AI) baut individuelle Next.js Websites & KI-Lösungen. Festpreis ab 500€, Lieferzeit unter 7 Tage.",
};

export default function WebdesignHeidelbergPage() {
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
            Webdesign · Heidelberg
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
            Webdesign Heidelberg –{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Individuelle Websites
            </span>{" "}
            für die Rhein-Neckar-Region
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Du suchst einen Webdesigner in Heidelberg oder der Rhein-Neckar-Region? Ich bin Kevin
            Götz von Contexflow AI aus Mosbach – nur eine kurze Strecke entfernt. Ich baue
            individuelle, blitzschnelle Websites mit Next.js für Unternehmen in Heidelberg,
            Mannheim, Sinsheim und der gesamten Metropolregion Rhein-Neckar.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Next.js statt WordPress – der Unterschied ist messbar
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            Websites in Heidelberg gibt es viele – aber die meisten laufen auf veralteten
            WordPress-Systemen die langsam, unsicher und schlecht bei Google ranken. Ich baue mit
            Next.js: serverseitig gerendert, Core Web Vitals optimiert, Google-freundlich. Deine
            Konkurrenz in Heidelberg hat noch nicht aufgeholt.
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Was ich für Heidelberger Unternehmen biete
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>Website-Erstellung in unter 7 Tagen</li>
            <li>Next.js – schnell, SEO-optimiert, skalierbar</li>
            <li>Lokale SEO für Heidelberg, Rhein-Neckar, Kurpfalz</li>
            <li>Responsive Design für Handy, Tablet und Desktop</li>
            <li>KI-Chatbots und Automatisierungen optional buchbar</li>
            <li>Festpreis ab 500€ – transparent, ohne Überraschungen</li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Für wen ich in Heidelberg baue
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Praxen, Kanzleien, Gastronomie, Tourismus, Einzelhandel, Coaches und Dienstleister in
            Heidelberg, Wiesloch, Sinsheim, Leimen und der gesamten Metropolregion Rhein-Neckar.
            Ich bin remote erreichbar und kann persönliche Termine in Heidelberg wahrnehmen.
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

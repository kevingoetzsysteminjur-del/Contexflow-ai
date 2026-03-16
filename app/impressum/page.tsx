import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Contexflow AI",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div
      style={{
        background: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(5rem,10vw,7rem)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Impressum
        </h1>
        <div
          style={{
            width: 48,
            height: 2,
            background: "#06B6D4",
            marginBottom: "3rem",
          }}
        />

        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#06B6D4",
              marginBottom: "0.75rem",
            }}
          >
            Angaben gemäß § 5 TMG
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            Kevin Goetz
            <br />
            Contexflow AI
            <br />
            <span style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
              [Straße und Hausnummer — wird nach Gewerbeanmeldung ergänzt]
            </span>
            <br />
            74821 Mosbach
            <br />
            Neckar-Odenwald-Kreis
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#06B6D4",
              marginBottom: "0.75rem",
            }}
          >
            Kontakt
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            E-Mail:{" "}
            <a
              href="mailto:contexflow.ai@gmx.net"
              style={{ color: "#06B6D4", textDecoration: "none" }}
            >
              contexflow.ai@gmx.net
            </a>
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#06B6D4",
              marginBottom: "0.75rem",
            }}
          >
            Steuernummer
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
          >
            [Steuernummer — wird nach Gewerbeanmeldung ergänzt]
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#06B6D4",
              marginBottom: "0.75rem",
            }}
          >
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            Kevin Goetz
            <br />
            <span style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
              [Straße und Hausnummer]
            </span>
            <br />
            74821 Mosbach
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#06B6D4",
              marginBottom: "0.75rem",
            }}
          >
            Streitschlichtung
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.875rem",
            }}
          >
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#06B6D4", textDecoration: "none" }}
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            <br />
            <br />
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#06B6D4",
              marginBottom: "0.75rem",
            }}
          >
            Haftung für Inhalte
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.875rem",
            }}
          >
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
        </section>
      </div>
    </div>
  );
}

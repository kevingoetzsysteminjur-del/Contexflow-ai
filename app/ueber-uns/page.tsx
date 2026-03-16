"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const timeline = [
  {
    jahr: "2024",
    ereignis: "AI entdeckt",
    detail: "Erste Experimente mit Claude und GPT. Faszination für Context Engineering – wie man AI wirklich nützlich macht.",
  },
  {
    jahr: "2025",
    ereignis: "Erste Websites gebaut",
    detail: "Selbst beigebracht: Next.js, Tailwind, moderne Webentwicklung. Mehrere eigene Projekte zum Üben.",
  },
  {
    jahr: "Anfang 2026",
    ereignis: "Contexflow AI gegründet",
    detail: "Gewerbeanmeldung in Mosbach. Klare Ausrichtung: Websites + Context Engineering für lokale Unternehmen.",
  },
  {
    jahr: "März 2026",
    ereignis: "Erste Projekte live",
    detail: "Erste echte Websites für echte Unternehmen. Der Anfang von etwas Größerem.",
  },
  {
    jahr: "Heute",
    ereignis: "Bereit für das nächste Projekt",
    detail: "Ich bin am Anfang – ehrlich gesagt. Aber ich bin hungrig, lernfähig und liefere echte Qualität.",
  },
];

const werte = [
  {
    title: "Qualität über Quantität",
    text: "Ich nehme wenige Projekte an, um jedem die volle Aufmerksamkeit zu geben. Kein Fließbandprinzip.",
    color: "#06B6D4",
  },
  {
    title: "Context first",
    text: "Gute Ergebnisse entstehen durch den richtigen Kontext. Das gilt für AI genauso wie für Websites.",
    color: "#8B5CF6",
  },
  {
    title: "Direkt und ehrlich",
    text: "Ich sage was ich denke. Wenn etwas nicht funktioniert, sage ich es bevor du Geld ausgibst.",
    color: "#F59E0B",
  },
  {
    title: "Lokal verwurzelt",
    text: "Ich bin aus Mosbach. Ich will lokalen Unternehmen helfen – das ist keine Zufälligkeit, das ist eine Entscheidung.",
    color: "#EF4444",
  },
];

export default function UeberUnsPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
        .werte-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 639px) {
          .werte-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(2rem,4vw,3rem)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p
            style={{
              color: "#06B6D4",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Über mich
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem,6vw,4rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Ich bin Kevin.
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem,2vw,1.2rem)",
              color: "var(--text-secondary)",
              maxWidth: 600,
              lineHeight: 1.7,
            }}
          >
            Context Engineer aus Mosbach. Ich baue Websites und AI-Systeme für lokale Unternehmen.
          </p>
        </div>
      </section>

      {/* Bio + Timeline */}
      <section
        style={{
          padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,2.5rem) clamp(4rem,8vw,6rem)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="about-grid">
            {/* Left: Bio */}
            <div>
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(99,102,241,0.15))",
                  border: "1px solid rgba(6,182,212,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "#06B6D4",
                  }}
                >
                  KG
                </span>
              </div>

              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                }}
              >
                Kevin Goetz
              </h2>
              <p
                style={{
                  color: "#06B6D4",
                  fontWeight: 600,
                  marginBottom: "1.5rem",
                  fontSize: "0.95rem",
                }}
              >
                Context Engineer · Mosbach
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "Ich bin kein klassischer Webentwickler und kein klassischer AI-Berater. Ich bin jemand der beides zusammenbringt – und daraus echte, nutzbare Produkte baut.",
                  "Context Engineering bedeutet für mich: AI-Systemen den richtigen Rahmen geben, damit sie wirklich helfen. Nicht einfach Prompts schreiben – sondern verstehen wie Maschinen denken, und das gezielt nutzen.",
                  "Ich bin ehrlich: Ich stehe am Anfang. Aber ich baue echte, nutzbare Produkte – und bin hungrig auf das nächste.",
                ].map((text, i) => (
                  <p
                    key={i}
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                      fontSize: "0.95rem",
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Timeline */}
            <div>
              <h3
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--text-tertiary)",
                  marginBottom: "2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Mein Weg
              </h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {timeline.map(({ jahr, ereignis, detail }, i) => (
                  <div key={jahr} style={{ display: "flex", gap: "1.25rem" }}>
                    {/* Dot + line */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#06B6D4",
                          marginTop: 4,
                        }}
                      />
                      {i < timeline.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            flex: 1,
                            background: "var(--border-color)",
                            margin: "4px 0",
                          }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div
                      style={{
                        paddingBottom: i < timeline.length - 1 ? "1.75rem" : 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: "#06B6D4",
                          fontFamily: "monospace",
                          opacity: 0.7,
                        }}
                      >
                        {jahr}
                      </span>
                      <h4
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          margin: "0.25rem 0 0.35rem",
                        }}
                      >
                        {ereignis}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section
        style={{
          padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,2.5rem)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          background: "var(--bg-secondary)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                color: "#06B6D4",
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Meine Werte
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem,4vw,2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Wofür ich stehe
            </h2>
          </div>
          <div className="werte-grid">
            {werte.map(({ title, text, color }) => (
              <div
                key={title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "1.75rem",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,2.5rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem,3vw,2rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Lokale Unternehmen digital stark machen.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              lineHeight: 1.7,
            }}
          >
            Mosbach ist keine Metropole – aber gute digitale Präsenz brauchst du trotzdem. Oder gerade deshalb.
          </p>
          <Link
            href="/kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "14px 28px",
              borderRadius: 10,
              background: "#06B6D4",
              color: "#000",
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
            Projekt besprechen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

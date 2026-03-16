"use client";
import { Globe, Brain, Terminal, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    accentColor: "#6366F1",
    title: "Website & Web App",
    desc: "Schnell, modern, konversionsorientiert. Mit Next.js gebaut – nicht mit Baukästen oder WordPress.",
    price: "Ab 500€",
    features: [
      "Responsive Design (Mobile-first)",
      "Blitzschnelle Ladezeiten (<2s)",
      "On-Page SEO inklusive",
      "Kontaktformular & Analytics",
      "Deployment & Hosting Setup",
      "1 Monat Support bei Premium",
    ],
  },
  {
    icon: Brain,
    accentColor: "#06B6D4",
    title: "KI-Integration & Chatbots",
    desc: "Intelligente Assistenten die wirklich helfen. Trainiert auf deinen Content, angepasst an dein Business.",
    price: "Auf Anfrage",
    features: [
      "KI-Chatbot auf deiner Website",
      "FAQ-Automatisierung",
      "Lead-Qualifizierung per AI",
      "E-Mail Automatisierung",
      "Zweisprachig (DE/EN) möglich",
      "Integration in bestehende Systeme",
    ],
  },
  {
    icon: Terminal,
    accentColor: "#8B5CF6",
    title: "Context Engineering",
    desc: "Die Kunst, KI so zu instruieren dass sie perfekt für dein Business denkt und antwortet.",
    price: "Auf Anfrage",
    features: [
      "Custom System Prompts",
      "RAG-Systeme aufbauen",
      "Workflow-Automatisierung",
      "AI Agent Development",
      "Prompt-Bibliotheken",
      "Team-Schulung & Beratung",
    ],
  },
];

const prozess = [
  { nr: "01", titel: "Erstgespräch", text: "Kostenloses 30-Minuten-Call. Ich verstehe dein Business, deine Ziele und dein Budget." },
  { nr: "02", titel: "Konzept", text: "Ich erstelle ein konkretes Konzept mit Zeitplan und Festpreis. Kein Stundenhonorar." },
  { nr: "03", titel: "Entwicklung", text: "Ich baue dein Projekt. Du bekommst regelmäßige Updates und kannst jederzeit Feedback geben." },
  { nr: "04", titel: "Launch", text: "Wir gehen live. Ich übergebe alles sauber und stehe für Fragen bereit." },
];

export default function LeistungenPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <style>{`
        .services-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        @media (max-width: 1023px) {
          .services-page-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .services-page-grid { grid-template-columns: 1fr; }
        }
        .prozess-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1023px) {
          .prozess-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 479px) {
          .prozess-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(3rem,6vw,4rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              color: "#6366F1",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Leistungen
          </p>
          <h1
            style={{
              fontSize: "clamp(2.2rem,5vw,3.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Was ich für dich tun kann
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem,2vw,1.2rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Drei Kernleistungen. Klare Preise. Kein Agentur-Bullshit.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section
        style={{
          padding: "0 clamp(1.5rem,5vw,2.5rem) clamp(5rem,10vw,7rem)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="services-page-grid">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 16,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: `${svc.accentColor}18`,
                      border: `1px solid ${svc.accentColor}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} style={{ color: svc.accentColor }} />
                  </div>

                  {/* Title + Price badge */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {svc.title}
                    </h2>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: svc.accentColor,
                        background: `${svc.accentColor}15`,
                        border: `1px solid ${svc.accentColor}30`,
                        borderRadius: 100,
                        padding: "4px 12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {svc.price}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {svc.desc}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      height: 1,
                      background: "var(--border-color)",
                      margin: "0 0 1.25rem",
                    }}
                  />

                  {/* Features label */}
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Inklusive
                  </p>

                  {/* Feature list */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 1.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {svc.features.map((f, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <Check
                          size={15}
                          style={{ color: svc.accentColor, flexShrink: 0, marginTop: 2 }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/kontakt"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "12px 20px",
                      borderRadius: 8,
                      background: svc.accentColor,
                      color: "#fff",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    Anfragen <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prozess */}
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
              Ablauf
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem,4vw,2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              So arbeiten wir zusammen
            </h2>
          </div>
          <div className="prozess-grid">
            {prozess.map(({ nr, titel, text }) => (
              <div
                key={nr}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  padding: "1.75rem",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "#6366F1",
                    opacity: 0.2,
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {nr}
                </p>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {titel}
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

      {/* Bottom CTA */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,2.5rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            Nicht sicher welche Leistung du brauchst? Lass uns kurz reden – kostenlos und unverbindlich.
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
              fontWeight: 600,
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
            Kostenloses Erstgespräch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

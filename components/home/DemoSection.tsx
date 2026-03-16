"use client";

import { useState } from "react";
import { UtensilsCrossed, Dumbbell, Palette, Bot } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function DemoSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,4vw,2.5rem)",
      }}
    >
      <style>{`
        @keyframes bento-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .bento-grid {
          display: grid;
          grid-template-areas: "ai restaurant restaurant" "ai fitness portfolio";
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 280px 220px;
          gap: 16px;
        }
        .bento-card {
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .bento-ai { grid-area: ai; }
        .bento-restaurant { grid-area: restaurant; }
        .bento-fitness { grid-area: fitness; }
        .bento-portfolio { grid-area: portfolio; }

        @media (max-width: 767px) {
          .bento-grid {
            grid-template-areas: "ai" "restaurant" "fitness" "portfolio" !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-card {
            min-height: 200px;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal>
          <p
            style={{
              color: "#6366F1",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              margin: "0 0 1rem 0",
            }}
          >
            Live Demos
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 200,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              margin: "0 0 0.75rem 0",
              lineHeight: 1.15,
            }}
          >
            So könnte{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #06B6D4, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              deine Website
            </span>{" "}
            aussehen
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              marginBottom: "3rem",
              margin: "0 0 3rem 0",
            }}
          >
            Echte Demos. Klick rein und überzeug dich selbst.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* AI Demo — tall left card */}
          <a
            href="https://contexflow.com/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-ai"
            style={{
              background:
                "linear-gradient(160deg, #0c1445 0%, #0891b2 60%, #0c4a6e 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "2rem",
              textDecoration: "none",
              transform:
                hoveredCard === "ai" ? "scale(1.02)" : "scale(1)",
              boxShadow:
                hoveredCard === "ai"
                  ? "0 20px 60px rgba(8,145,178,0.3)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredCard("ai")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Icon */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot
                size={64}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  filter: hoveredCard === "ai"
                    ? "drop-shadow(0 0 16px rgba(8,145,178,0.8))"
                    : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
            {/* Bottom content */}
            <div style={{ width: "100%" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#06B6D4",
                  background: "rgba(6,182,212,0.15)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  borderRadius: 100,
                  padding: "3px 10px",
                  marginBottom: "0.6rem",
                }}
              >
                KI & Automation
              </span>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  margin: "0 0 0.35rem 0",
                  letterSpacing: "0.01em",
                }}
              >
                AI Features Demo
              </h3>
              <p
                style={{
                  fontSize: "0.825rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.55,
                  margin: "0 0 0.75rem 0",
                }}
              >
                KI-Chatbot, FAQ-Bot, Lead-Qualifizierung – live & interaktiv.
              </p>
              <span
                style={{
                  fontSize: 13,
                  color: "#06B6D4",
                  letterSpacing: "0.05em",
                  fontWeight: 500,
                }}
              >
                Live Demo ansehen →
              </span>
            </div>
          </a>

          {/* Restaurant card — wide top right */}
          <a
            href="https://restaurant-bella-vista-sable.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-restaurant"
            style={{
              background:
                "linear-gradient(135deg, #7c1d00 0%, #ea580c 50%, #ff8c42 100%)",
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              textDecoration: "none",
              transform:
                hoveredCard === "restaurant" ? "scale(1.02)" : "scale(1)",
              boxShadow:
                hoveredCard === "restaurant"
                  ? "0 20px 60px rgba(234,88,12,0.3)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredCard("restaurant")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UtensilsCrossed
                size={56}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  filter: hoveredCard === "restaurant"
                    ? "drop-shadow(0 0 14px rgba(255,140,66,0.8))"
                    : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#F97316",
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: 100,
                  padding: "3px 10px",
                  marginBottom: "0.5rem",
                }}
              >
                Gastronomie
              </span>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  margin: "0 0 0.25rem 0",
                }}
              >
                Bella Vista – Restaurant & Café
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                  margin: "0 0 0.5rem 0",
                }}
              >
                Elegante Gastronomie-Website mit Speisekarte & Reservierung.
              </p>
              <span
                style={{
                  fontSize: 12,
                  color: "#F97316",
                  letterSpacing: "0.04em",
                }}
              >
                Live Demo ansehen →
              </span>
            </div>
          </a>

          {/* Fitness card */}
          <a
            href="https://fitness-studio-mauve.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-fitness"
            style={{
              background:
                "linear-gradient(135deg, #052e16 0%, #16a34a 50%, #4ade80 100%)",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem",
              textDecoration: "none",
              transform:
                hoveredCard === "fitness" ? "scale(1.02)" : "scale(1)",
              boxShadow:
                hoveredCard === "fitness"
                  ? "0 20px 60px rgba(22,163,74,0.3)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredCard("fitness")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Dumbbell
                size={44}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  filter: hoveredCard === "fitness"
                    ? "drop-shadow(0 0 12px rgba(74,222,128,0.8))"
                    : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#22C55E",
                  background: "rgba(34,197,94,0.15)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  borderRadius: 100,
                  padding: "3px 10px",
                  marginBottom: "0.5rem",
                }}
              >
                Fitness
              </span>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  margin: "0 0 0.2rem 0",
                }}
              >
                IRONPEAK – Fitness Studio
              </h3>
              <span
                style={{
                  fontSize: 12,
                  color: "#22C55E",
                  letterSpacing: "0.04em",
                }}
              >
                Live Demo ansehen →
              </span>
            </div>
          </a>

          {/* Portfolio card */}
          <a
            href="https://kevin-goetz-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-portfolio"
            style={{
              background:
                "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #c084fc 100%)",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem",
              textDecoration: "none",
              transform:
                hoveredCard === "portfolio" ? "scale(1.02)" : "scale(1)",
              boxShadow:
                hoveredCard === "portfolio"
                  ? "0 20px 60px rgba(124,58,237,0.3)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredCard("portfolio")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Palette
                size={44}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  filter: hoveredCard === "portfolio"
                    ? "drop-shadow(0 0 12px rgba(192,132,252,0.8))"
                    : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#8B5CF6",
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: 100,
                  padding: "3px 10px",
                  marginBottom: "0.5rem",
                }}
              >
                Portfolio
              </span>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#F5F5F7",
                  margin: "0 0 0.2rem 0",
                }}
              >
                Creative Portfolio
              </h3>
              <span
                style={{
                  fontSize: 12,
                  color: "#c084fc",
                  letterSpacing: "0.04em",
                }}
              >
                Live Demo ansehen →
              </span>
            </div>
          </a>
        </div>

        {/* Footnote */}
        <ScrollReveal delay={300}>
          <p
            style={{
              color: "var(--text-tertiary)",
              fontSize: 12,
              marginTop: "1.5rem",
              textAlign: "center",
              letterSpacing: "0.02em",
              lineHeight: 1.6,
            }}
          >
            * Bella Vista, IRONPEAK und Creative Portfolio sind Demo-Projekte ohne echten Kunden-Bezug.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

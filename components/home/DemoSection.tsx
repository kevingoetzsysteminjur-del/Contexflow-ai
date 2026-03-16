"use client";

import { useState } from "react";
import { UtensilsCrossed, Dumbbell, Palette, Bot } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const demos = [
  {
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #1c0a00 100%)",
    icon: UtensilsCrossed,
    tag: "Gastronomie",
    tagColor: "#F97316",
    title: "Bella Vista – Restaurant & Café",
    desc: "Elegante Gastronomie-Website mit Speisekarte, Reservierung und stimmungsvollem Design.",
    url: "#",
  },
  {
    gradient: "linear-gradient(135deg, #052e16 0%, #166534 50%, #000000 100%)",
    icon: Dumbbell,
    tag: "Fitness",
    tagColor: "#22C55E",
    title: "IRONPEAK – Fitness Studio",
    desc: "Kraftvolle Fitness-Website mit Kursplan, Mitgliedschaft und energetischem Design.",
    url: "#",
  },
  {
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #0a0a0a 100%)",
    icon: Palette,
    tag: "Portfolio",
    tagColor: "#8B5CF6",
    title: "Creative Portfolio",
    desc: "Minimalistisches Portfolio für Kreative mit Projekt-Galerie und Kontaktformular.",
    url: "#",
  },
  {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0891b2 50%, #030305 100%)",
    icon: Bot,
    tag: "KI & Automation",
    tagColor: "#06B6D4",
    title: "AI Features Demo",
    desc: "Interaktive Demo mit KI-Chatbot, Terminbuchung, FAQ-Bot, Lead-Qualifizierung – zweisprachig DE/EN.",
    url: "/demo",
  },
];

function DemoCard({ demo, delay }: { demo: typeof demos[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const Icon = demo.icon;

  const isInternal = demo.url !== "#" && !demo.url.startsWith("http");
  const isExternal = demo.url.startsWith("http");

  return (
    <ScrollReveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#0d0d14",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered
            ? `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${demo.tagColor}18`
            : "none",
        }}
      >
        {/* Top gradient area */}
        <div
          style={{
            height: 180,
            background: demo.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={48} style={{ color: "rgba(255,255,255,0.8)" }} />
        </div>

        {/* Bottom content area */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Tag */}
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: demo.tagColor,
              background: `${demo.tagColor}18`,
              border: `1px solid ${demo.tagColor}30`,
              borderRadius: 100,
              padding: "3px 10px",
              marginBottom: "0.75rem",
              alignSelf: "flex-start",
            }}
          >
            {demo.tag}
          </span>

          {/* Title */}
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#F5F5F7",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            {demo.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "0.875rem",
              color: "#71717A",
              lineHeight: 1.65,
              margin: "0.5rem 0 1rem",
            }}
          >
            {demo.desc}
          </p>

          {/* CTA Button */}
          <div style={{ marginTop: "auto" }}>
            {isInternal ? (
              <Link
                href={demo.url}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: demo.tagColor,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  opacity: btnHovered ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                Live Demo ansehen →
              </Link>
            ) : isExternal ? (
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: demo.tagColor,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  opacity: btnHovered ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                Live Demo ansehen →
              </a>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: demo.tagColor,
                  letterSpacing: "0.05em",
                  opacity: 0.5,
                  cursor: "default",
                }}
              >
                Live Demo ansehen →
              </span>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function DemoSection() {
  return (
    <section
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <style>{`
        @media (max-width: 639px) {
          .demo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#6366F1",
                marginBottom: "0.75rem",
              }}
            >
              DEMOS
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 200,
                color: "#F5F5F7",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
                margin: "0 0 0.5rem 0",
              }}
            >
              Live Demos
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#71717A",
                letterSpacing: "0.03em",
              }}
            >
              Klick rein und überzeug dich selbst. Alles von mir gebaut.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div
          className="demo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
        >
          {demos.map((demo, i) => (
            <DemoCard key={demo.title} demo={demo} delay={i * 100} />
          ))}
        </div>

        {/* Footnote */}
        <ScrollReveal delay={400}>
          <p
            style={{
              marginTop: "2rem",
              fontSize: 12,
              color: "#52525B",
              letterSpacing: "0.02em",
              lineHeight: 1.6,
            }}
          >
            * Bella Vista, IRONPEAK und Creative Portfolio sind Demo-Projekte. Die AI Features Demo ist live verfügbar.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const rows = [
  {
    label: "Preis",
    baukasten: { text: "Ab 10€/Monat", icon: "warn" },
    agentur: { text: "5.000–20.000€", icon: "bad" },
    contexflow: { text: "500–2.000€ Festpreis", icon: "good" },
  },
  {
    label: "Lieferzeit",
    baukasten: { text: "DIY", icon: "warn" },
    agentur: { text: "6–12 Wochen", icon: "bad" },
    contexflow: { text: "Unter 7 Tage", icon: "good" },
  },
  {
    label: "Design",
    baukasten: { text: "Template", icon: "bad" },
    agentur: { text: "Individuell", icon: "good" },
    contexflow: { text: "Individuell", icon: "good" },
  },
  {
    label: "Performance",
    baukasten: { text: "Langsam", icon: "bad" },
    agentur: { text: "Mittel", icon: "warn" },
    contexflow: { text: "Blitzschnell (Next.js)", icon: "good" },
  },
  {
    label: "SEO",
    baukasten: { text: "Basics", icon: "warn" },
    agentur: { text: "Gut", icon: "good" },
    contexflow: { text: "Inkl. lokales SEO", icon: "good" },
  },
  {
    label: "KI-Features",
    baukasten: { text: "Nein", icon: "bad" },
    agentur: { text: "Aufpreis", icon: "warn" },
    contexflow: { text: "Inklusive", icon: "good" },
  },
  {
    label: "Support",
    baukasten: { text: "Chatbot", icon: "bad" },
    agentur: { text: "Teuer", icon: "warn" },
    contexflow: { text: "Persönlich & direkt", icon: "good" },
  },
  {
    label: "Code gehört dir",
    baukasten: { text: "Nein", icon: "bad" },
    agentur: { text: "Meistens", icon: "warn" },
    contexflow: { text: "Ja, 100%", icon: "good" },
  },
] as const;

type IconType = "good" | "warn" | "bad";

function StatusIcon({ type }: { type: IconType }) {
  if (type === "good") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#052e16",
          border: "1px solid rgba(34,197,94,0.25)",
          color: "#22c55e",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
    );
  }
  if (type === "warn") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#1c1200",
          border: "1px solid rgba(245,158,11,0.25)",
          color: "#f59e0b",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        !
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#1c0000",
        border: "1px solid rgba(239,68,68,0.25)",
        color: "#ef4444",
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      ✕
    </span>
  );
}

type Column = "baukasten" | "agentur" | "contexflow";

interface CardProps {
  column: Column;
  title: string;
  subtitle?: string;
  isHighlighted?: boolean;
  animationDelay?: number;
}

function ComparisonCard({ column, title, subtitle, isHighlighted, animationDelay = 0 }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, animationDelay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animationDelay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        background: "#0d0d14",
        border: isHighlighted ? "2px solid #06B6D4" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isHighlighted ? "0 0 30px rgba(6,182,212,0.15)" : "none",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "1.5rem 1.5rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
        }}
      >
        {isHighlighted && (
          <div style={{ marginBottom: "0.75rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "#06B6D4",
                color: "#000",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "3px 12px",
                borderRadius: 100,
              }}
            >
              Empfohlen
            </span>
          </div>
        )}
        <p
          style={{
            fontSize: 13,
            fontWeight: isHighlighted ? 500 : 400,
            color: isHighlighted ? "#06B6D4" : "#9CA3AF",
            letterSpacing: "0.05em",
            margin: "0 0 0.2rem 0",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
        {subtitle && (
          <p
            style={{
              fontSize: 11,
              color: "#4B5563",
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Rows */}
      <div style={{ flex: 1 }}>
        {rows.map((row, i) => {
          const cell = row[column] as { text: string; icon: IconType };
          const isAlt = i % 2 === 1;
          return (
            <div
              key={row.label}
              style={{
                padding: "0.85rem 1.5rem",
                background: isAlt ? "rgba(255,255,255,0.02)" : "transparent",
                borderBottom:
                  i === rows.length - 1 ? "none" : "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#6B7280",
                }}
              >
                {row.label}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <StatusIcon type={cell.icon} />
                <span
                  style={{
                    fontSize: 13,
                    color: "#F5F5F7",
                    lineHeight: 1.4,
                  }}
                >
                  {cell.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VergleichsTabelle() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <style>{`
        .vergleich-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 767px) {
          .vergleich-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#6366F1",
              margin: "0 0 0.75rem 0",
            }}
          >
            VERGLEICH
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 200,
              color: "#F5F5F7",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Warum Contexflow?
          </h2>
        </div>

        {/* 3-column card grid */}
        <div className="vergleich-grid">
          <ComparisonCard
            column="baukasten"
            title="Baukasten (Wix, Jimdo)"
            animationDelay={0}
          />
          <ComparisonCard
            column="agentur"
            title="Klassische Agentur"
            animationDelay={100}
          />
          <ComparisonCard
            column="contexflow"
            title="Contexflow AI"
            isHighlighted
            animationDelay={200}
          />
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            Die Wahl ist klar.
          </p>
          <Link
            href="/kontakt"
            style={{
              display: "inline-block",
              color: "#06B6D4",
              fontSize: 14,
              letterSpacing: "0.08em",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#22d3ee";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#06B6D4";
            }}
          >
            Projekt anfragen →
          </Link>
        </div>
      </div>
    </section>
  );
}

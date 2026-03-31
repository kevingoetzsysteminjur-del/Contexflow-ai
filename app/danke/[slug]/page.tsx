"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const TEMPLATES: Record<string, { name: string; download: string }> = {
  "realestate-pro": { name: "RealEstate Pro", download: "/downloads/realestate-pro.zip" },
  "wellness": { name: "Wellness & Healing", download: "/downloads/wellness-healing.zip" },
  "gastro": { name: "Gastro", download: "/downloads/gastro.zip" },
  "fitstudio": { name: "FitStudio", download: "/downloads/fitstudio.zip" },
  "devportfolio": { name: "DevPortfolio", download: "/downloads/devportfolio.zip" },
};

const STEPS = [
  "ZIP entpacken",
  "Terminal öffnen und in den Ordner navigieren",
  "npm install ausführen",
  "npm run dev starten",
  "Browser öffnen: localhost:3000",
];

export default function DankePage() {
  const params = useParams();
  const slug = params.slug as string;
  const template = TEMPLATES[slug];

  if (!template) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-primary)" }}>Seite nicht gefunden.</p>
      </div>
    );
  }

  return (
      <div
        style={{
          background: "var(--bg-primary)",
          minHeight: "100vh",
          padding: "clamp(7rem, 12vw, 9rem) clamp(1.5rem, 4vw, 2.5rem) clamp(5rem, 10vw, 7rem)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          {/* Headline */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#22C55E",
              marginBottom: "1rem",
            }}
          >
            KAUF ERFOLGREICH
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 200,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
              marginBottom: "0.75rem",
            }}
          >
            Vielen Dank für deinen Kauf! 🎉
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
            }}
          >
            Du hast <strong style={{ color: "var(--text-primary)" }}>{template.name}</strong> erworben.
          </p>

          {/* Download Button */}
          <a
            href={template.download}
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2.5rem",
              background: "#6366F1",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 4,
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#4F46E5";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#6366F1";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download {template.name}
          </a>

          {/* Installation Guide */}
          <div
            style={{
              marginTop: "3.5rem",
              textAlign: "left",
              border: "1px solid var(--border-light)",
              borderRadius: 12,
              padding: "2rem",
              background: "var(--bg-card)",
            }}
          >
            <h2
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#6366F1",
                marginBottom: "1.5rem",
              }}
            >
              INSTALLATIONSANLEITUNG
            </h2>

            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {STEPS.map((step, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6366F1",
                      background: "#6366F115",
                      border: "1px solid #6366F130",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Support */}
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontSize: 14, color: "var(--text-tertiary)", marginBottom: "0.5rem" }}>
              Fragen? Schreib uns:
            </p>
            <a
              href="mailto:contexflow.ai@gmx.net"
              style={{ fontSize: 14, color: "#6366F1", textDecoration: "none" }}
            >
              contexflow.ai@gmx.net
            </a>
          </div>

          {/* Back link */}
          <div style={{ marginTop: "3rem" }}>
            <Link
              href="/templates"
              style={{
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"; }}
            >
              ← Zurück zum Template-Shop
            </Link>
          </div>
        </div>
      </div>
  );
}

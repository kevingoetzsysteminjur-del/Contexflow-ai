"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const [showWave, setShowWave] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;
      if (atBottom) {
        setShowWave(true);
        setTimeout(() => setShowWave(false), 2000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer style={{ borderTop: "1px solid var(--border-light)", background: "var(--bg-footer)" }}>
      <style>{`
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem clamp(1.5rem, 4vw, 2.5rem);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        @media (max-width: 479px) {
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        }
      `}</style>
      <div className="footer-inner">
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          CONTEXFLOW AI · 2026
        </span>

        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {t.footer.built.toUpperCase()}
        </span>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link
            href="/impressum"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
          >
            {t.footer.imprint.toUpperCase()}
          </Link>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>·</span>
          <Link
            href="/datenschutz"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
          >
            {t.footer.privacy.toUpperCase()}
          </Link>
        </div>
      </div>

      {/* Easter egg wave */}
      <div
        style={{
          textAlign: "center",
          fontSize: "2rem",
          opacity: showWave ? 1 : 0,
          transform: showWave ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          paddingBottom: showWave ? "1rem" : "0",
          height: showWave ? "auto" : 0,
          overflow: "hidden",
        }}
      >
        👋
      </div>
    </footer>
  );
}

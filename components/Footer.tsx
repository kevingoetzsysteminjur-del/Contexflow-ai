"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showWave, setShowWave] = useState(false);

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
    <footer style={{ borderTop: "1px solid #111", background: "#030305" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.5rem clamp(1.5rem, 4vw, 2.5rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#374151",
          }}
        >
          CONTEXFLOW AI · 2026
        </span>

        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#374151",
          }}
        >
          BUILT WITH NEXT.JS &amp; CLAUDE
        </span>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link
            href="/impressum"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#374151",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#374151"; }}
          >
            IMPRESSUM
          </Link>
          <span style={{ color: "#374151", fontSize: 10 }}>·</span>
          <Link
            href="/datenschutz"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#374151",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#374151"; }}
          >
            DATENSCHUTZ
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

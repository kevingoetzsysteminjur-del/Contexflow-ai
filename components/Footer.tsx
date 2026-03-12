"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #111120", background: "#050508" }}>
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "1.75rem clamp(1rem, 3vw, 2rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1F2937" }}>
          © 2026 CONTEXFLOW AI
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link
            href="/impressum"
            style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1F2937", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "#6366F1")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "#1F2937")}
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1F2937", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "#6366F1")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "#1F2937")}
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}

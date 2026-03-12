"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        background: "#050508",
        padding: "clamp(6rem, 14vw, 12rem) 1.5rem",
        textAlign: "center",
        borderTop: "1px solid #111120",
      }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        {/* Big heading */}
        <h2
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 200,
            color: "white",
            letterSpacing: "0.15em",
            lineHeight: 1,
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            textShadow: "0 0 60px rgba(99,102,241,0.15)",
          }}
        >
          BEREIT?
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#4B5563",
            letterSpacing: "0.05em",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.7,
          }}
        >
          Kostenlose Erstberatung. Kein Risiko.
        </p>

        {/* Morphing CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            href="/kontakt"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ textDecoration: "none", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading), sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                fontWeight: 200,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: hovered ? "white" : "#9CA3AF",
                transition: "color 0.3s",
              }}
            >
              Projekt starten →
            </span>
            <div style={{ position: "relative", width: "100%", height: "1px", background: "#1a1a2e" }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#6366F1",
                  transformOrigin: "left center",
                  boxShadow: "0 0 8px rgba(99,102,241,0.8)",
                }}
              />
            </div>
          </Link>
        </div>

        <p
          style={{
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "#374151",
            textTransform: "uppercase",
          }}
        >
          contexflow.ai@gmx.net · Mosbach
        </p>
      </div>
    </section>
  );
}

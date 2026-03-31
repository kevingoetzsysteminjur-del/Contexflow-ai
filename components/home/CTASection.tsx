"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(8rem, 15vw, 12rem) clamp(1.5rem, 4vw, 2.5rem)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          marginBottom: "1rem",
          margin: "0 0 1rem 0",
        }}
      >
        {t.cta.ready_for}
      </p>

      <h2
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 200,
          color: "var(--text-primary)",
          letterSpacing: "0.05em",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          margin: "0 0 clamp(3rem, 6vw, 5rem) 0",
        }}
      >
        {t.cta.your_project}
      </h2>

      {/* Morphing circle button */}
      <div style={{ display: "inline-block", position: "relative" }}>
        <Link
          href="/kontakt"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: hovered ? 280 : 120,
            height: 120,
            borderRadius: 60,
            border: "1px solid #6366F1",
            background: hovered ? "linear-gradient(135deg, #6366F1, #06B6D4)" : "transparent",
            color: "var(--text-primary)",
            textDecoration: "none",
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition:
              "width 0.5s cubic-bezier(0.76, 0, 0.24, 1), background 0.4s ease",
          }}
        >
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.span
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase" }}
              >
                {t.cta.start_project}
              </motion.span>
            ) : (
              <motion.span
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 18, letterSpacing: "0.1em" }}
              >
                {t.cta.go}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Info below */}
      <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.15em", margin: "0 0 0.5rem 0" }}>
          contexflow.ai@gmx.net
        </p>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.15em", margin: 0 }}>
          Deutschland & Zypern
        </p>
      </div>
    </section>
  );
}

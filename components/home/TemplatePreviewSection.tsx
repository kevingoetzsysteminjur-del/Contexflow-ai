"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

const PREVIEW_TEMPLATES = [
  {
    slug: "realestate-pro",
    gradient: "linear-gradient(135deg, #0c2d48 0%, #2389da 40%, #c2b280 100%)",
    title: "RealEstate Pro",
    price: "49 €",
    badge: "LAUNCH ANGEBOT 🔥",
    badgeColor: "#D4A853",
  },
  {
    slug: "wellness-healing",
    gradient: "linear-gradient(135deg, #2d4a3e 0%, #6b8f71 40%, #c9a96e 100%)",
    title: "Wellness & Healing",
    price: "39 €",
    badge: null,
    badgeColor: null,
  },
  {
    slug: "gastro",
    gradient: "linear-gradient(135deg, #7c1d00 0%, #ea580c 50%, #ff8c42 100%)",
    title: "Gastro",
    price: "29 €",
    badge: null,
    badgeColor: null,
  },
];

export default function TemplatePreviewSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLang();

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 1rem 0" }}>
            {t.templates_preview.label}
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 200, color: "var(--text-primary)", margin: 0 }}>
            {t.templates_preview.headline}
          </h2>
        </motion.div>

        <style>{`
          .template-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          @media (max-width: 767px) { .template-preview-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        <div className="template-preview-grid">
          {PREVIEW_TEMPLATES.map((tmpl, i) => (
            <motion.div
              key={tmpl.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/templates/${tmpl.slug}`}
                style={{
                  display: "block",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-card)",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform: hovered === tmpl.slug ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hovered === tmpl.slug ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
                }}
                onMouseEnter={() => setHovered(tmpl.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  background: tmpl.gradient,
                  height: 160,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {tmpl.badge && (
                    <span style={{
                      position: "absolute", top: 12, right: 12, fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.15em", color: tmpl.badgeColor!, background: `${tmpl.badgeColor}20`,
                      border: `1px solid ${tmpl.badgeColor}40`, borderRadius: 100, padding: "3px 10px",
                      textTransform: "uppercase",
                    }}>
                      {tmpl.badge}
                    </span>
                  )}
                  <span style={{ fontSize: "1.25rem", fontWeight: 200, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
                    {tmpl.title}
                  </span>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.25rem 0" }}>
                    {tmpl.title}
                  </h3>
                  <span style={{ fontSize: "0.9rem", color: "#6366F1", fontWeight: 500 }}>
                    {tmpl.price}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/templates"
            style={{
              fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#6366F1", textDecoration: "none", transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#4F46E5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
          >
            {t.templates_preview.all} →
          </Link>
        </div>
      </div>
    </section>
  );
}

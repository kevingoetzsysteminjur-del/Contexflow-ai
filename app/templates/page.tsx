"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

const TEMPLATES = [
  {
    slug: "realestate-pro",
    gradient: "linear-gradient(135deg, #0c2d48 0%, #2389da 40%, #c2b280 100%)",
    badge: "BESTSELLER",
    badgeColor: "#D4A853",
    title: "RealEstate Pro",
    price: "149",
    oldPrice: "299",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Supabase", "3 Sprachen", "Admin-Panel", "SEO"],
    preview: "https://paphos-immobilien.vercel.app",
  },
  {
    slug: "wellness-healing",
    gradient: "linear-gradient(135deg, #2d4a3e 0%, #6b8f71 40%, #c9a96e 100%)",
    badge: null,
    badgeColor: null,
    title: "Wellness & Healing",
    price: "99",
    oldPrice: "199",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Supabase", "Shop", "Admin", "Chatbot"],
    preview: "https://braditsch-website.vercel.app",
  },
  {
    slug: "gastro",
    gradient: "linear-gradient(135deg, #7c1d00 0%, #ea580c 50%, #ff8c42 100%)",
    badge: null,
    badgeColor: null,
    title: "Gastro",
    price: "79",
    oldPrice: "149",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Responsive", "SEO"],
    preview: "https://restaurant-bella-vista-sable.vercel.app",
  },
  {
    slug: "fitstudio",
    gradient: "linear-gradient(135deg, #052e16 0%, #16a34a 50%, #0a0a0a 100%)",
    badge: null,
    badgeColor: null,
    title: "FitStudio",
    price: "79",
    oldPrice: "149",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Responsive", "Animationen"],
    preview: "https://fitness-studio-mauve.vercel.app",
  },
  {
    slug: "devportfolio",
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1e1b4b 50%, #312e81 100%)",
    badge: null,
    badgeColor: null,
    title: "DevPortfolio",
    price: "49",
    oldPrice: "99",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Animationen", "Dark Mode"],
    preview: null,
  },
  {
    slug: "coursehub",
    gradient: "linear-gradient(135deg, #4a1a0a 0%, #c2410c 40%, #d97706 100%)",
    badge: "COMING SOON",
    badgeColor: "#F59E0B",
    title: "CourseHub",
    price: "199",
    oldPrice: "399",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Supabase", "Auth", "Shop", "Zertifikate", "Forum"],
    preview: null,
  },
];

function TemplateCard({ template, index }: { template: typeof TEMPLATES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const { t } = useLang();

  const descKey = `${template.slug.replace("-", "_")}_desc` as string;
  const desc = (t.templates as Record<string, string>)[descKey] || "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-light)",
        borderRadius: 12,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Gradient Placeholder */}
      <div style={{
        background: template.gradient,
        height: 220,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {template.badge && (
          <span style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: template.badgeColor!,
            background: `${template.badgeColor}20`,
            border: `1px solid ${template.badgeColor}40`,
            borderRadius: 100,
            padding: "4px 12px",
            textTransform: "uppercase",
          }}>
            {template.badge}
          </span>
        )}
        <span style={{ fontSize: "2rem", fontWeight: 200, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          {template.title}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.5rem 0" }}>
          {template.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1rem 0", minHeight: 60 }}>
          {desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
          {template.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6366F1",
              background: "#6366F112",
              border: "1px solid #6366F125",
              borderRadius: 100,
              padding: "2px 8px",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {template.price} €
          </span>
          <span style={{ fontSize: "0.9rem", color: "var(--text-tertiary)", textDecoration: "line-through" }}>
            {template.oldPrice} €
          </span>
          <span style={{ fontSize: 10, color: "#22C55E", fontWeight: 500, letterSpacing: "0.05em" }}>
            {t.templates.launch_offer}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {template.preview && (
            <a
              href={template.preview}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: "0.7rem",
                border: "1px solid var(--border-light)",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
                borderRadius: 4,
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {t.templates.preview_btn} →
            </a>
          )}
          <Link
            href={template.slug === "coursehub" ? "/kontakt" : `/templates/${template.slug}`}
            style={{
              flex: 1,
              padding: "0.7rem",
              background: "#6366F1",
              color: "#fff",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
              borderRadius: 4,
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
          >
            {template.slug === "coursehub" ? t.templates.waitlist_btn + " →" : t.templates.buy_btn + " →"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function TemplatesPage() {
  const { t } = useLang();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--border-light)", padding: "clamp(7rem, 12vw, 9rem) clamp(1.5rem, 4vw, 2.5rem) clamp(3rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div ref={heroRef} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "1rem" }}>
              {t.templates.label}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              {t.templates.headline}
            </h1>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: "var(--text-tertiary)", letterSpacing: "0.03em", maxWidth: "55ch", lineHeight: 1.75 }}>
              {t.templates.subline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)", borderBottom: "1px solid var(--border-light)" }}>
        <style>{`
          .templates-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 1200px; margin: 0 auto; }
          @media (max-width: 767px) { .templates-grid { grid-template-columns: 1fr !important; } }
        `}</style>
        <div className="templates-grid">
          {TEMPLATES.map((tmpl, i) => (
            <TemplateCard key={tmpl.slug} template={tmpl} index={i} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)", borderBottom: "1px solid var(--border-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 1rem 0" }}>
            {t.templates.trust_label}
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 200, color: "var(--text-primary)", margin: "0 0 3rem 0" }}>
            {t.templates.trust_headline}
          </h2>
          <style>{`
            .trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
            @media (max-width: 767px) { .trust-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
          <div className="trust-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} style={{ border: "1px solid var(--border-light)", borderRadius: 12, padding: "1.5rem", background: "var(--bg-card)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.5rem 0" }}>
                  {(t.templates as Record<string, string>)[`trust${n}_title`]}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {(t.templates as Record<string, string>)[`trust${n}_desc`]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 200, color: "var(--text-primary)", margin: "0 0 1rem 0" }}>
          {t.templates.cta_headline}
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-tertiary)", margin: "0 0 2rem 0", maxWidth: "45ch", marginLeft: "auto", marginRight: "auto" }}>
          {t.templates.cta_text}
        </p>
        <Link
          href="/kontakt"
          style={{
            display: "inline-block",
            padding: "0.875rem 2.5rem",
            border: "1px solid #6366F1",
            background: "transparent",
            color: "var(--text-primary)",
            textDecoration: "none",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          {t.templates.cta_btn} →
        </Link>
      </section>
    </div>
  );
}

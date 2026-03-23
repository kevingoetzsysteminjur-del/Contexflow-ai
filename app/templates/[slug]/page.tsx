"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";

const TEMPLATE_DATA: Record<string, {
  gradient: string;
  title: string;
  price: string;
  oldPrice: string;
  tags: string[];
  features: string[];
  preview: string | null;
}> = {
  "realestate-pro": {
    gradient: "linear-gradient(135deg, #0c2d48 0%, #2389da 40%, #c2b280 100%)",
    title: "RealEstate Pro",
    price: "149",
    oldPrice: "299",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Supabase", "i18n", "Admin-Panel"],
    features: ["Property-Listings mit Filter & Suche", "Finanzierungsrechner", "Stadtteil-Map mit Infos", "Blog / News System", "Admin Panel", "Dreisprachig (DE/EN/GR)", "SEO-optimiert", "Kontaktformular"],
    preview: "https://paphos-immobilien.vercel.app",
  },
  "wellness-healing": {
    gradient: "linear-gradient(135deg, #2d4a3e 0%, #6b8f71 40%, #c9a96e 100%)",
    title: "Wellness & Healing",
    price: "99",
    oldPrice: "199",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Supabase", "E-Commerce"],
    features: ["Audio-Shop mit Player", "Veranstaltungskalender", "Galerie / Portfolio", "KI-Chatbot", "CMS / Admin", "Dreisprachig", "SEO-optimiert", "Kontaktformular"],
    preview: "https://braditsch-website.vercel.app",
  },
  "gastro": {
    gradient: "linear-gradient(135deg, #7c1d00 0%, #ea580c 50%, #ff8c42 100%)",
    title: "Gastro",
    price: "79",
    oldPrice: "149",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    features: ["Digitale Speisekarte", "Online-Reservierung", "Galerie", "Responsive Design", "SEO-optimiert", "Kontaktformular"],
    preview: "https://restaurant-bella-vista-sable.vercel.app",
  },
  "fitstudio": {
    gradient: "linear-gradient(135deg, #052e16 0%, #16a34a 50%, #0a0a0a 100%)",
    title: "FitStudio",
    price: "79",
    oldPrice: "149",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    features: ["Kursplan", "Trainer-Profile", "Mitgliedschaften", "Preistabelle", "Responsive Design", "Animationen", "Kontaktformular"],
    preview: "https://fitness-studio-mauve.vercel.app",
  },
  "devportfolio": {
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1e1b4b 50%, #312e81 100%)",
    title: "DevPortfolio",
    price: "49",
    oldPrice: "99",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    features: ["Projekt-Showcase", "Skills Section", "Blog", "Dark Mode", "Animationen", "Kontaktformular"],
    preview: null,
  },
  "coursehub": {
    gradient: "linear-gradient(135deg, #4a1a0a 0%, #c2410c 40%, #d97706 100%)",
    title: "CourseHub",
    price: "199",
    oldPrice: "399",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Supabase", "Auth"],
    features: ["Mitgliederbereich", "Video-Player", "Zertifikat-System", "Shop", "Community-Forum", "Anatomie-Lexikon", "Admin Panel", "Auth System"],
    preview: null,
  },
};

export default function TemplateDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const template = TEMPLATE_DATA[slug];
  const { t } = useLang();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  if (!template) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-primary)" }}>Template not found.</p>
      </div>
    );
  }

  const descKey = `${slug.replace("-", "_")}_desc` as string;
  const desc = (t.templates as Record<string, string>)[descKey] || "";

  const FAQ = [
    { q: t.templates.faq_q1, a: t.templates.faq_a1 },
    { q: t.templates.faq_q2, a: t.templates.faq_a2 },
    { q: t.templates.faq_q3, a: t.templates.faq_a3 },
    { q: t.templates.faq_q4, a: t.templates.faq_a4 },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "clamp(7rem, 12vw, 9rem) clamp(1.5rem, 4vw, 2.5rem) clamp(3rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div ref={heroRef} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <Link href="/templates" style={{ fontSize: 12, color: "#6366F1", textDecoration: "none", letterSpacing: "0.1em" }}>
              ← {t.templates.label}
            </Link>

            {/* Gradient Preview */}
            <div style={{
              background: template.gradient,
              height: 300,
              borderRadius: 12,
              marginTop: "1.5rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ fontSize: "3rem", fontWeight: 200, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                {template.title}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 200, color: "var(--text-primary)", margin: "0 0 1rem 0" }}>
              {template.title}
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.8, margin: "0 0 2rem 0", maxWidth: "60ch" }}>
              {desc}
            </p>

            {/* Price + Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 600, color: "var(--text-primary)" }}>{template.price} €</span>
                <span style={{ fontSize: "1rem", color: "var(--text-tertiary)", textDecoration: "line-through" }}>{template.oldPrice} €</span>
              </div>
              {template.preview && (
                <a href={template.preview} target="_blank" rel="noopener noreferrer" style={{
                  padding: "0.75rem 1.5rem", border: "1px solid var(--border-light)", color: "var(--text-primary)",
                  fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", borderRadius: 4,
                }}>
                  {t.templates.detail_demo} →
                </a>
              )}
              <button style={{
                padding: "0.75rem 2rem", background: "#6366F1", color: "#fff", border: "none",
                fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 4, cursor: "pointer",
              }}>
                {t.templates.detail_buy} →
              </button>
            </div>
          </motion.div>

          {/* Features */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 1.5rem 0" }}>
              {t.templates.detail_features}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}>
              {template.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: 14, color: "var(--text-secondary)" }}>
                  <span style={{ color: "#22C55E", fontSize: 12 }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 1rem 0" }}>
              {t.templates.detail_stack}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {template.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 12, color: "#6366F1", background: "#6366F112", border: "1px solid #6366F125",
                  borderRadius: 100, padding: "4px 12px",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "2rem" }}>
            <h2 style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 0.75rem 0" }}>
              {t.templates.detail_faq_label}
            </h2>
            <h3 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 200, color: "var(--text-primary)", margin: "0 0 2rem 0" }}>
              {t.templates.detail_faq_headline}
            </h3>
            {FAQ.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border-light)", padding: "1.25rem 0" }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 400, color: "var(--text-primary)", margin: "0 0 0.5rem 0" }}>{item.q}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function BlogPreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLang();

  const posts = [
    { title: t.blog.post1_title, desc: t.blog.post1_desc, date: t.blog.post1_date },
    { title: t.blog.post2_title, desc: t.blog.post2_desc, date: t.blog.post2_date },
    { title: t.blog.post3_title, desc: t.blog.post3_desc, date: t.blog.post3_date },
  ];

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
            {t.blog.label}
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 200, color: "var(--text-primary)", margin: 0 }}>
            {t.blog_preview?.headline || "Aus dem Blog"}
          </h2>
        </motion.div>

        <style>{`
          .blog-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          @media (max-width: 767px) { .blog-preview-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        <div className="blog-preview-grid">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/blog"
                style={{
                  display: "block",
                  border: "1px solid var(--border-light)",
                  borderRadius: 16,
                  padding: "1.75rem",
                  background: "var(--bg-card)",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#6366F140";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                  {post.date}
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--text-primary)", margin: "0.75rem 0 0.5rem 0", lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {post.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/blog"
            style={{
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6366F1",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#4F46E5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
          >
            {t.blog_preview?.all || "Alle Artikel"} →
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLang();

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(5rem, 10vw, 8rem) 1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: "center",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 200,
            fontStyle: "italic",
            color: "var(--text-primary)",
            lineHeight: 1.5,
            margin: "0 0 1.5rem 0",
          }}
        >
          &ldquo;{t.social_proof.quote}&rdquo;
        </p>

        <p
          style={{
            fontSize: 14,
            color: "var(--text-tertiary)",
            marginBottom: "2rem",
            margin: "0 0 2rem 0",
          }}
        >
          {t.social_proof.trust}
        </p>

        <Link
          href="/kontakt"
          style={{
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6366F1",
            display: "inline-block",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const arrow = (e.currentTarget as HTMLElement).querySelector(".arrow") as HTMLElement;
            if (arrow) arrow.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            const arrow = (e.currentTarget as HTMLElement).querySelector(".arrow") as HTMLElement;
            if (arrow) arrow.style.transform = "translateX(0)";
          }}
        >
          {t.social_proof.cta}{" "}
          <span
            className="arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.2s ease",
            }}
          >
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}

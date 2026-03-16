"use client";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function WebdesignMosbachPage() {
  const { t } = useLang();
  const c = t.webdesign.mosbach;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <section
        style={{
          padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(4rem,8vw,6rem)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              color: "#6366F1",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {c.label}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem,5vw,3rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {c.h1}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.h1_accent}
            </span>{" "}
            {c.h1_suffix}
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            {c.intro}
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            {c.h2_why}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            {c.why}
          </p>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            {c.h2_what}
          </h2>
          <ul
            style={{
              color: "var(--text-secondary)",
              lineHeight: 2,
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <li>{c.li1}</li>
            <li>{c.li2}</li>
            <li>{c.li3}</li>
            <li>{c.li4}</li>
            <li>{c.li5}</li>
            <li>{c.li6}</li>
          </ul>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            {c.h2_branches}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            {c.branches}
          </p>

          <Link
            href="/kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "14px 28px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366F1, #06B6D4)",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.95rem",
              transition: "opacity 0.2s",
            }}
          >
            {t.webdesign.cta_btn}
          </Link>
        </div>
      </section>
    </div>
  );
}

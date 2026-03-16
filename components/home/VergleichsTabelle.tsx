"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

type IconType = "good" | "warn" | "bad";

type RowData = {
  labelKey: string;
  baukasten: { textKey: string; icon: IconType };
  agentur: { textKey: string; icon: IconType };
  contexflow: { textKey: string; icon: IconType };
};

const ROW_DEFS: RowData[] = [
  {
    labelKey: "rows.preis",
    baukasten: { textKey: "values.baukasten_price", icon: "warn" },
    agentur: { textKey: "values.agentur_price", icon: "bad" },
    contexflow: { textKey: "values.cf_price", icon: "good" },
  },
  {
    labelKey: "rows.lieferzeit",
    baukasten: { textKey: "values.baukasten_delivery", icon: "warn" },
    agentur: { textKey: "values.agentur_delivery", icon: "bad" },
    contexflow: { textKey: "values.cf_delivery", icon: "good" },
  },
  {
    labelKey: "rows.design",
    baukasten: { textKey: "values.template", icon: "bad" },
    agentur: { textKey: "values.individual", icon: "good" },
    contexflow: { textKey: "values.individual", icon: "good" },
  },
  {
    labelKey: "rows.performance",
    baukasten: { textKey: "values.slow", icon: "bad" },
    agentur: { textKey: "values.medium", icon: "warn" },
    contexflow: { textKey: "values.fast", icon: "good" },
  },
  {
    labelKey: "rows.seo",
    baukasten: { textKey: "values.basics", icon: "warn" },
    agentur: { textKey: "values.good", icon: "good" },
    contexflow: { textKey: "values.incl_seo", icon: "good" },
  },
  {
    labelKey: "rows.ki",
    baukasten: { textKey: "values.no", icon: "bad" },
    agentur: { textKey: "values.surcharge", icon: "warn" },
    contexflow: { textKey: "values.included", icon: "good" },
  },
  {
    labelKey: "rows.support",
    baukasten: { textKey: "values.chatbot", icon: "bad" },
    agentur: { textKey: "values.expensive", icon: "warn" },
    contexflow: { textKey: "values.personal", icon: "good" },
  },
  {
    labelKey: "rows.code",
    baukasten: { textKey: "values.code_no", icon: "bad" },
    agentur: { textKey: "values.code_mostly", icon: "warn" },
    contexflow: { textKey: "values.code_yes", icon: "good" },
  },
];

function StatusIcon({ type }: { type: IconType }) {
  if (type === "good") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.25)",
          color: "#22c55e",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
    );
  }
  if (type === "warn") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.25)",
          color: "#f59e0b",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        !
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.25)",
        color: "#ef4444",
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      ✕
    </span>
  );
}

type Column = "baukasten" | "agentur" | "contexflow";

interface CardProps {
  column: Column;
  title: string;
  isHighlighted?: boolean;
  animationDelay?: number;
  recommendedLabel: string;
  rows: { label: string; text: string; icon: IconType }[];
}

function ComparisonCard({ column, title, isHighlighted, animationDelay = 0, recommendedLabel, rows }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, animationDelay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animationDelay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        background: "var(--bg-card)",
        border: isHighlighted ? "2px solid #06B6D4" : "1px solid var(--border-color)",
        boxShadow: isHighlighted ? "0 0 30px rgba(6,182,212,0.15)" : "var(--card-shadow)",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "1.5rem 1.5rem 1.25rem",
          borderBottom: "1px solid var(--border-light)",
          position: "relative",
        }}
      >
        {isHighlighted && (
          <div style={{ marginBottom: "0.75rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "#06B6D4",
                color: "#000",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "3px 12px",
                borderRadius: 100,
              }}
            >
              {recommendedLabel}
            </span>
          </div>
        )}
        <p
          style={{
            fontSize: 13,
            fontWeight: isHighlighted ? 500 : 400,
            color: isHighlighted ? "#06B6D4" : "var(--text-secondary)",
            letterSpacing: "0.05em",
            margin: "0 0 0.2rem 0",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
      </div>

      {/* Rows */}
      <div style={{ flex: 1 }}>
        {rows.map((row, i) => {
          const isAlt = i % 2 === 1;
          return (
            <div
              key={row.label}
              style={{
                padding: "0.85rem 1.5rem",
                background: isAlt ? "var(--bg-card-hover)" : "transparent",
                borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-light)",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-tertiary)",
                }}
              >
                {row.label}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <StatusIcon type={row.icon} />
                <span style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.4 }}>
                  {row.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getNestedKey(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return "";
  }, obj) as string;
}

export default function VergleichsTabelle() {
  const { t } = useLang();
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const compT = t.comparison as unknown as Record<string, unknown>;

  function buildRows(col: Column) {
    return ROW_DEFS.map((row) => ({
      label: getNestedKey(compT, row.labelKey),
      text: getNestedKey(compT, row[col].textKey),
      icon: row[col].icon,
    }));
  }

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <style>{`
        .vergleich-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 767px) {
          .vergleich-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#6366F1",
              margin: "0 0 0.75rem 0",
            }}
          >
            {t.comparison.label.toUpperCase()}
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 200,
              color: "var(--text-primary)",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {t.comparison.headline}
          </h2>
        </div>

        {/* 3-column card grid */}
        <div className="vergleich-grid">
          <ComparisonCard
            column="baukasten"
            title={t.comparison.baukasten}
            animationDelay={0}
            recommendedLabel={t.comparison.recommended}
            rows={buildRows("baukasten")}
          />
          <ComparisonCard
            column="agentur"
            title={t.comparison.agentur}
            animationDelay={100}
            recommendedLabel={t.comparison.recommended}
            rows={buildRows("agentur")}
          />
          <ComparisonCard
            column="contexflow"
            title={t.comparison.contexflow}
            isHighlighted
            animationDelay={200}
            recommendedLabel={t.comparison.recommended}
            rows={buildRows("contexflow")}
          />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginBottom: "1rem" }}>
            {t.comparison.cta.split("→")[0].trim()}
          </p>
          <Link
            href="/kontakt"
            style={{
              display: "inline-block",
              color: "#06B6D4",
              fontSize: 14,
              letterSpacing: "0.08em",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#22d3ee"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#06B6D4"; }}
          >
            {t.comparison.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

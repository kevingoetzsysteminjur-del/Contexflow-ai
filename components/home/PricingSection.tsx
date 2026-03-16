"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { UrgencyBadge } from "@/components/home/UrgencyBanner";
import { GarantieBadge } from "@/components/home/GarantieSection";
import { useLang } from "@/contexts/LanguageContext";

type Tier = {
  num: string;
  name: string;
  price: string;
  unit: string;
  tags: string[];
  recommended: boolean;
};

function Row({ tier, index, recommendedLabel }: { tier: Tier; index: number; recommendedLabel: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: "1px solid var(--border-light)",
        padding: "clamp(1.5rem, 3vw, 2rem) 0",
        display: "grid",
        gridTemplateColumns: "2rem 1fr auto",
        gap: "clamp(1rem, 3vw, 2.5rem)",
        alignItems: "center",
        position: "relative",
        transition: "background 0.3s ease",
      }}
      className="pricing-row"
    >
      {/* Number */}
      <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
        {tier.num}
      </span>

      {/* Name + Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.75rem 1.5rem" }}>
        <span
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontWeight: 300,
            color: tier.recommended ? "var(--text-primary)" : "var(--text-secondary)",
            letterSpacing: "0.04em",
            transition: "color 0.3s",
          }}
        >
          {tier.name}
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {tier.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "2px 8px",
                border: "1px solid var(--border-color)",
                color: "var(--text-tertiary)",
                letterSpacing: "0.05em",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {tier.recommended && (
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#6366F1",
              border: "1px solid #6366F140",
              padding: "2px 8px",
              borderRadius: 2,
            }}
          >
            {recommendedLabel}
          </span>
        )}
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <span
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 200,
            color: tier.recommended ? "var(--text-primary)" : "var(--text-tertiary)",
            letterSpacing: "0.02em",
          }}
        >
          {tier.price}
        </span>
        {tier.unit && (
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: "0.4rem" }}>{tier.unit}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const { t } = useLang();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-5% 0px" });

  const TIERS: Tier[] = [
    {
      num: "01",
      name: t.pricing.tier1_name,
      price: t.pricing.tier1_price,
      unit: t.pricing.onetime,
      tags: [t.pricing.tier1_tag1, t.pricing.tier1_tag2, t.pricing.tier1_tag3, t.pricing.tier1_tag4],
      recommended: false,
    },
    {
      num: "02",
      name: t.pricing.tier2_name,
      price: t.pricing.tier2_price,
      unit: t.pricing.onetime,
      tags: [t.pricing.tier2_tag1, t.pricing.tier2_tag2, t.pricing.tier2_tag3, t.pricing.tier2_tag4],
      recommended: true,
    },
    {
      num: "03",
      name: t.pricing.tier3_name,
      price: t.pricing.tier3_price,
      unit: t.pricing.onetime,
      tags: [t.pricing.tier3_tag1, t.pricing.tier3_tag2, t.pricing.tier3_tag3, t.pricing.tier3_tag4],
      recommended: false,
    },
    {
      num: "04",
      name: t.pricing.tier4_name,
      price: t.pricing.on_request,
      unit: "",
      tags: [t.pricing.tier4_tag1, t.pricing.tier4_tag2, t.pricing.tier4_tag3, t.pricing.tier4_tag4],
      recommended: false,
    },
  ];

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Urgency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "1.5rem" }}
        >
          <UrgencyBadge />
        </motion.div>

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", marginBottom: "0.75rem" }}>
              {t.pricing.label.toUpperCase()}
            </p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.2 }}>
              {t.pricing.title}
            </h2>
          </div>
          <Link
            href="/preise"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              transition: "color 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#6366F1")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")}
          >
            {t.pricing.all_details}
          </Link>
        </motion.div>

        {/* Divider top */}
        <div style={{ height: 1, background: "var(--border-light)", marginBottom: 0 }} />

        {/* Rows */}
        {TIERS.map((tier, i) => (
          <Row key={tier.num} tier={tier} index={i} recommendedLabel={t.pricing.recommended} />
        ))}

        {/* Footer note */}
        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>
          {t.pricing.note}
        </p>

        {/* Guarantee badge */}
        <div style={{ marginTop: "1.5rem" }}>
          <GarantieBadge />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Shield, Server } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function CaseStudySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLang();

  const RESULTS = [
    { icon: Clock, color: "#6366F1", titleKey: "r1_title", descKey: "r1_desc" },
    { icon: Shield, color: "#06B6D4", titleKey: "r2_title", descKey: "r2_desc" },
    { icon: Server, color: "#8B5CF6", titleKey: "r3_title", descKey: "r3_desc" },
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
        >
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 1rem 0" }}>
            {t.case_study.label}
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 200, color: "var(--text-primary)", margin: "0 0 3rem 0" }}>
            {t.case_study.headline}
          </h2>
        </motion.div>

        <style>{`
          .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          @media (max-width: 767px) { .case-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        <div className="case-grid">
          {RESULTS.map((item, i) => {
            const Icon = item.icon;
            const title = t.case_study[item.titleKey as keyof typeof t.case_study] as string;
            const desc = t.case_study[item.descKey as keyof typeof t.case_study] as string;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: 16,
                  padding: "2rem",
                  background: "var(--bg-card)",
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${item.color}12`,
                  border: `1px solid ${item.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={24} style={{ color: item.color }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.5rem 0" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

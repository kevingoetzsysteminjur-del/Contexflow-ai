"use client";

import { useState } from "react";
import { Monitor, MessageSquare, Cpu } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

export default function WhatIBuild() {
  const { t } = useLang();

  const SERVICES = [
    {
      id: "websites",
      icon: Monitor,
      iconColor: "#6366F1",
      accentColor: "#6366F1",
      title: t.what_i_build.svc1_title,
      desc: t.what_i_build.svc1_desc,
      tags: ["Next.js", "SEO", "Responsive", "< 1 Woche"],
      animation: "icon-pulse",
      glowColor: "rgba(99,102,241,0.25)",
    },
    {
      id: "ki",
      icon: MessageSquare,
      iconColor: "#06B6D4",
      accentColor: "#06B6D4",
      title: t.what_i_build.svc2_title,
      desc: t.what_i_build.svc2_desc,
      tags: ["Chatbot", "Automation", "Claude AI", "24/7"],
      animation: "icon-bounce",
      glowColor: "rgba(6,182,212,0.25)",
    },
    {
      id: "context",
      icon: Cpu,
      iconColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      title: t.what_i_build.svc3_title,
      desc: t.what_i_build.svc3_desc,
      tags: ["Prompt Design", "RAG", "AI Agents", "Effizienz"],
      animation: "cursor-blink-icon",
      glowColor: "rgba(139,92,246,0.25)",
    },
  ];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,4vw,2.5rem)",
      }}
    >
      <style>{`
        @keyframes icon-pulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 0px currentColor); }
          50% { opacity: 0.85; filter: drop-shadow(0 0 8px currentColor); }
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes cursor-blink-icon {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 767px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#6366F1",
              marginBottom: "1rem",
              margin: "0 0 1rem 0",
            }}
          >
            {t.what_i_build.label}
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 200,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              margin: "0 0 0.75rem 0",
              lineHeight: 1.15,
            }}
          >
            {t.what_i_build.headline_prefix}{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #6366F1, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.what_i_build.headline_accent}
            </span>
          </h2>
          <p
            style={{
              color: "var(--text-tertiary)",
              fontSize: "1.05rem",
              marginBottom: "3.5rem",
              margin: "0 0 3.5rem 0",
            }}
          >
            {t.what_i_build.subline}
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hovered === service.id;

            return (
              <ScrollReveal key={service.id} delay={i * 120}>
                <div
                  onMouseEnter={() => setHovered(service.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${isHovered ? service.accentColor + "50" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 16,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                    boxShadow: isHovered
                      ? `0 12px 40px ${service.glowColor}, 0 0 0 1px ${service.accentColor}20`
                      : "none",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    minHeight: 260,
                  }}
                >
                  {/* Icon wrapper */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: `${service.accentColor}12`,
                      border: `1px solid ${service.accentColor}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={28}
                      style={{
                        color: service.iconColor,
                        animation: isHovered
                          ? `${service.animation} 1.8s ease-in-out infinite`
                          : "none",
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        margin: "0 0 0.6rem 0",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {service.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                    }}
                  >
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: service.accentColor,
                          background: `${service.accentColor}10`,
                          border: `1px solid ${service.accentColor}25`,
                          borderRadius: 100,
                          padding: "3px 9px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { Building2, Scissors, Music } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    name: "Immobilienmakler Website",
    desc: "Premium Website mit KI-Chatbot, Bewertungstool, Mehrsprachigkeit (DE/EN/TR) und über 20 Features.",
    icon: Building2,
    accent: "#C9A96E",
    tags: ["Next.js", "Supabase", "KI-Chatbot", "i18n"],
  },
  {
    name: "Barbershop Website",
    desc: "Zweisprachige Website mit Online-Terminbuchung und modernem Schwarz-Weiß Design.",
    icon: Scissors,
    accent: "#EF4444",
    tags: ["Next.js", "Booking", "Zweisprachig"],
  },
  {
    name: "Klangtherapie Plattform",
    desc: "E-Commerce Plattform mit Audio-Shop, Admin-Panel, KI-Chatbot und Supabase Backend.",
    icon: Music,
    accent: "#8B5CF6",
    tags: ["Next.js", "Supabase", "E-Commerce", "Admin"],
  },
];

function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <ScrollReveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 16,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${project.accent}18` : "none",
          cursor: "default",
        }}
      >
        {/* Icon + badge row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: `${project.accent}15`,
              border: `1px solid ${project.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.3s ease",
              boxShadow: hovered ? `0 0 16px ${project.accent}40` : "none",
            }}
          >
            <Icon size={24} color={project.accent} />
          </div>
        </div>

        {/* Name + description */}
        <div>
          <h3
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              fontWeight: 600,
              color: "#F5F5F7",
              letterSpacing: "0.02em",
              marginBottom: "0.5rem",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#71717A",
              lineHeight: 1.65,
              letterSpacing: "0.01em",
            }}
          >
            {project.desc}
          </p>
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "#6B7280",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4,
                padding: "3px 8px",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  return (
    <section
      style={{
        background: "#050508",
        borderTop: "1px solid #111",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#6366F1",
                marginBottom: "0.75rem",
              }}
            >
              PORTFOLIO
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 200,
                color: "#F5F5F7",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
                margin: "0 0 0.5rem 0",
              }}
            >
              Ausgewählte Projekte
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#4B5563",
                letterSpacing: "0.03em",
              }}
            >
              Anonymisierte Beispiele aus echten Kundenprojekten
            </p>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

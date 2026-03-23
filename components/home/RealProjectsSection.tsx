"use client";

import { useState } from "react";
import { Globe, Home, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const PROJECTS = [
  {
    id: "braditsch",
    icon: Globe,
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #6366F1 50%, #8B5CF6 100%)",
    glowColor: "rgba(99,102,241,0.3)",
    accentColor: "#6366F1",
    link: "https://braditsch-website.vercel.app",
    badge: "LIVE",
    badgeColor: "#22C55E",
  },
  {
    id: "paphos",
    icon: Home,
    gradient: "linear-gradient(135deg, #0c2d48 0%, #06B6D4 50%, #22D3EE 100%)",
    glowColor: "rgba(6,182,212,0.3)",
    accentColor: "#06B6D4",
    link: "https://paphos-immobilien.vercel.app",
    badge: "LIVE",
    badgeColor: "#22C55E",
  },
  {
    id: "massage",
    icon: BookOpen,
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #9333EA 50%, #C084FC 100%)",
    glowColor: "rgba(147,51,234,0.3)",
    accentColor: "#9333EA",
    link: null,
    badge: "IN ENTWICKLUNG",
    badgeColor: "#F59E0B",
  },
];

export default function RealProjectsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useLang();

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,4vw,2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6366F1", margin: "0 0 1rem 0" }}>
            {t.real_projects.label}
          </p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 200, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: "0 0 0.75rem 0", lineHeight: 1.15 }}>
            {t.real_projects.headline}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", margin: "0 0 3rem 0" }}>
            {t.real_projects.subline}
          </p>
        </ScrollReveal>

        <style>{`
          .real-projects-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          @media (max-width: 767px) {
            .real-projects-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="real-projects-grid">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            const isHovered = hovered === project.id;
            const projectT = t.real_projects[project.id as keyof typeof t.real_projects] as { cat: string; name: string; desc: string };

            const CardWrapper = project.link ? "a" : "div";
            const linkProps = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <ScrollReveal key={project.id}>
                <CardWrapper
                  {...linkProps}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: project.gradient,
                    borderRadius: 20,
                    padding: "2rem",
                    textDecoration: "none",
                    minHeight: 280,
                    position: "relative",
                    overflow: "hidden",
                    cursor: project.link ? "pointer" : "default",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    boxShadow: isHovered ? `0 20px 60px ${project.glowColor}` : "none",
                  }}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Badge */}
                  <span style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: project.badgeColor,
                    background: `${project.badgeColor}20`,
                    border: `1px solid ${project.badgeColor}40`,
                    borderRadius: 100,
                    padding: "3px 10px",
                  }}>
                    {project.id === "massage" ? t.real_projects.badge_dev : t.real_projects.badge_live}
                  </span>

                  {/* Icon */}
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={56} style={{
                      color: "rgba(255,255,255,0.9)",
                      filter: isHovered ? `drop-shadow(0 0 16px ${project.accentColor})` : "none",
                      transition: "filter 0.3s ease",
                    }} />
                  </div>

                  {/* Content */}
                  <div>
                    <span style={{
                      display: "inline-block",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: project.accentColor,
                      background: `${project.accentColor}20`,
                      border: `1px solid ${project.accentColor}40`,
                      borderRadius: 100,
                      padding: "3px 10px",
                      marginBottom: "0.5rem",
                    }}>
                      {projectT.cat}
                    </span>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#F5F5F7", margin: "0 0 0.25rem 0" }}>
                      {projectT.name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5, margin: "0 0 0.5rem 0" }}>
                      {projectT.desc}
                    </p>
                    {project.link && (
                      <span style={{ fontSize: 12, color: project.accentColor, letterSpacing: "0.04em" }}>
                        {t.real_projects.view} →
                      </span>
                    )}
                  </div>
                </CardWrapper>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

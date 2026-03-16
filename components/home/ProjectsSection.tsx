"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    name: "Immobilienmakler Website",
    category: "Immobilien · Web App",
    url: "#",
    bg: "linear-gradient(135deg, #1a1208 0%, #2d1f0a 40%, #0a0a0a 100%)",
    accent: "#C9A96E",
    label: "IMMO",
  },
  {
    name: "Klangtherapie Plattform",
    category: "Wellness · Web App",
    url: "#",
    bg: "linear-gradient(135deg, #0d0818 0%, #1a0f2e 40%, #080808 100%)",
    accent: "#8B5CF6",
    label: "KLANG",
  },
  {
    name: "Barbershop Website",
    category: "Barbershop · Live",
    url: "#",
    bg: "linear-gradient(135deg, #120808 0%, #1f0a0a 40%, #0a0a0a 100%)",
    accent: "#DC2626",
    label: "BARBER",
  },
];

function ProjectItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={ref}
      style={{ position: "relative", height: "60vh", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10%",
          background: project.bg,
          y,
        }}
      />

      {/* Grid texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${project.accent}11 1px, transparent 1px), linear-gradient(90deg, ${project.accent}11 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,8,0.55)" }} />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9CA3AF" }}>
              Live
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(4rem, 8vw, 7rem)",
              fontWeight: 900,
              color: project.accent,
              opacity: 0.06,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom row */}
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "4px 10px",
              border: `1px solid ${project.accent}40`,
              marginBottom: "0.75rem",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: project.accent,
            }}
          >
            {project.label}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 200,
              color: "white",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            {project.name}
          </h3>
          <p style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {project.category}
          </p>
        </div>
      </div>

      {/* Hover CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(5,5,8,0.4)",
        }}
      >
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "12px 28px",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "border-color 0.2s, background 0.2s",
            background: "rgba(99,102,241,0.15)",
            borderColor: "#6366F1",
          }}
        >
          Ansehen →
        </Link>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section style={{ background: "#050508", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "clamp(4rem, 8vw, 7rem) 1.5rem clamp(2rem, 4vw, 3rem)" }}>
        <p
          style={{
            color: "#6366F1",
            fontSize: "11px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          Selected Work
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {projects.map((p, i) => (
          <ProjectItem key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

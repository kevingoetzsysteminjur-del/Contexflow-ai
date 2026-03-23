"use client";
import { useState } from "react";

const TECHS = ["Next.js", "Tailwind CSS", "shadcn/ui", "Claude AI", "Hetzner Server", "Docker", "Nginx", "Supabase"];

export default function TechStack() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
          TOOLS
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 200,
            color: "var(--text-primary)",
            marginBottom: "3rem",
            margin: "0 0 3rem 0",
          }}
        >
          Mein Stack
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {TECHS.map((tech, i) => (
            <div
              key={i}
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: hovered === i ? "var(--text-primary)" : "var(--text-tertiary)",
                  transition: "color 0.3s ease",
                  cursor: "default",
                  display: "block",
                }}
              >
                {tech}
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "#6366F1",
                  transform: hovered === i ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 14,
            color: "var(--text-tertiary)",
            fontStyle: "italic",
            marginTop: "2.5rem",
            margin: "2.5rem 0 0 0",
          }}
        >
          Ich nutze nicht was trendy ist. Ich nutze was funktioniert.
        </p>
      </div>
    </section>
  );
}

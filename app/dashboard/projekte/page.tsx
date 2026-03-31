"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  progress: number;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  in_progress: "In Bearbeitung",
  completed: "Abgeschlossen",
  on_hold: "Pausiert",
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  in_progress: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  completed: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  on_hold: { bg: "rgba(148,163,184,0.15)", color: "#94a3b8" },
};

export default function ProjektePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/projekte")
      .then((r) => r.json())
      .then((d) => { setProjects(d.projects ?? []); setLoading(false); });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
          Meine Projekte
        </h1>
      </div>

      {loading ? (
        <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Projekte...</div>
      ) : projects.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            border: "1px dashed var(--border-color)",
            borderRadius: 8,
          }}
        >
          <FolderKanban size={40} style={{ color: "var(--text-tertiary)", margin: "0 auto 1rem" }} />
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Noch keine Projekte vorhanden.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {projects.map((project, i) => {
            const statusStyle = STATUS_COLORS[project.status] ?? STATUS_COLORS.in_progress;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 400, color: "var(--text-primary)", marginBottom: 4 }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                        {project.description}
                      </p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          flex: 1,
                          maxWidth: 200,
                          height: 4,
                          background: "var(--border-color)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${project.progress}%`,
                            height: "100%",
                            background: "#6366F1",
                            borderRadius: 2,
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{project.progress}%</span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "0.3rem 0.6rem",
                      borderRadius: 4,
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {STATUS_LABELS[project.status] ?? project.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

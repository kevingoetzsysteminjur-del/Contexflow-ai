"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Circle } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: string;
  completedAt: string | null;
  order: number;
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: string;
  dueDate: string;
  lexofficeId: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  progress: number;
  createdAt: string;
  milestones: Milestone[];
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
const INV_STATUS_LABELS: Record<string, string> = { pending: "Ausstehend", paid: "Bezahlt", overdue: "Überfällig" };
const INV_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  paid: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  overdue: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
};

function MilestoneIcon({ status }: { status: string }) {
  if (status === "completed") return <CheckCircle2 size={20} color="#34d399" />;
  if (status === "in_progress") return <Clock size={20} color="#6366F1" />;
  return <Circle size={20} color="var(--text-tertiary)" />;
}

function formatEur(n: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n); }
function formatDate(d: string) { return new Date(d).toLocaleDateString("de-DE"); }

export default function ProjektDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dashboard/projects/${id}`)
      .then((r) => r.json())
      .then((d) => { setProject(d.project ?? null); setInvoices(d.invoices ?? []); setLoading(false); });
  }, [id]);

  if (loading) return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Projekt...</p>;
  if (!project) return <p style={{ color: "#f87171" }}>Projekt nicht gefunden.</p>;

  const statusStyle = STATUS_COLORS[project.status] ?? STATUS_COLORS.in_progress;
  const completedMilestones = project.milestones.filter((m) => m.status === "completed").length;
  const totalMilestones = project.milestones.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 720 }}
    >
      <Link
        href="/dashboard/projekte"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: 12, color: "var(--text-secondary)", textDecoration: "none", marginBottom: "1.5rem" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
      >
        <ArrowLeft size={14} /> Zurück zur Übersicht
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: 300, color: "var(--text-primary)" }}>
            {project.title}
          </h1>
          <span style={{ fontSize: 12, padding: "0.35rem 0.75rem", borderRadius: 20, background: statusStyle.bg, color: statusStyle.color, flexShrink: 0 }}>
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
        </div>

        {project.description && (
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.6 }}>{project.description}</p>
        )}

        {/* Progress */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Gesamtfortschritt</span>
            <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-primary)" }}>{project.progress}%</span>
          </div>
          <div style={{ height: 6, background: "var(--border-color)", borderRadius: 3, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", background: "#6366F1", borderRadius: 3 }}
            />
          </div>
          {totalMilestones > 0 && (
            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 6 }}>
              {completedMilestones} von {totalMilestones} Meilensteinen abgeschlossen
            </p>
          )}
        </div>
      </div>

      {/* Timeline / Milestones */}
      {project.milestones.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Projektfortschritt
          </h2>

          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 9, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #6366F1, rgba(99,102,241,0.1))" }} />

            {project.milestones.map((ms, i) => (
              <motion.div
                key={ms.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative", marginBottom: "1.5rem" }}
              >
                {/* Dot */}
                <div style={{ position: "absolute", left: -29, top: 2, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", borderRadius: "50%" }}>
                  <MilestoneIcon status={ms.status} />
                </div>

                <div style={{
                  background: "var(--bg-secondary)",
                  border: `1px solid ${ms.status === "in_progress" ? "rgba(99,102,241,0.3)" : "var(--border-color)"}`,
                  borderRadius: 8,
                  padding: "1rem 1.25rem",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)" }}>{ms.title}</h3>
                    <span style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background: ms.status === "completed" ? "rgba(52,211,153,0.15)" : ms.status === "in_progress" ? "rgba(99,102,241,0.15)" : "rgba(148,163,184,0.12)",
                      color: ms.status === "completed" ? "#34d399" : ms.status === "in_progress" ? "#818cf8" : "#94a3b8",
                      flexShrink: 0,
                    }}>
                      {ms.status === "completed" ? "Abgeschlossen" : ms.status === "in_progress" ? "In Bearbeitung" : "Geplant"}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{ms.description}</p>
                  {ms.completedAt && (
                    <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8 }}>
                      Abgeschlossen am {formatDate(ms.completedAt)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Zugehörige Rechnungen */}
      {invoices.length > 0 && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Rechnungen
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {invoices.map((inv) => {
              const s = INV_STATUS_COLORS[inv.status] ?? INV_STATUS_COLORS.pending;
              return (
                <Link
                  key={inv.id}
                  href={`/dashboard/rechnungen/${inv.id}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, textDecoration: "none", transition: "border-color 0.2s ease", flexWrap: "wrap", gap: "0.5rem" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#6366F140"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; }}
                >
                  <div>
                    <p style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 400 }}>Rechnung #{inv.number}</p>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Fällig: {formatDate(inv.dueDate)}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {inv.lexofficeId && (
                      <span style={{ fontSize: 10, padding: "2px 6px", background: "rgba(52,211,153,0.15)", color: "#34d399", borderRadius: 4 }}>Lexoffice</span>
                    )}
                    <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 400 }}>{formatEur(Number(inv.amount))}</p>
                    <span style={{ fontSize: 11, padding: "0.25rem 0.5rem", borderRadius: 4, background: s.bg, color: s.color }}>
                      {INV_STATUS_LABELS[inv.status]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

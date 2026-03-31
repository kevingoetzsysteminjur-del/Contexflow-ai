"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Project { id: string; title: string; description?: string; status: string; progress: number; createdAt: string; user: { id: string; name: string; email: string }; }

const STATUS_LABELS: Record<string, string> = { in_progress: "In Bearbeitung", completed: "Abgeschlossen", on_hold: "Pausiert" };
const STATUS_COLORS: Record<string, string> = { in_progress: "#f59e0b", completed: "#34d399", on_hold: "#94a3b8" };

function inputStyle(): React.CSSProperties {
  return { padding: "0.4rem 0.6rem", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 4, color: "var(--text-primary)", fontSize: 12, outline: "none" };
}

export default function AdminProjektePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ status?: string; progress?: number; description?: string }>({});

  async function load() {
    const r = await fetch("/api/admin/projekte");
    const d = await r.json();
    setProjects(d.projects ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function saveEdit(id: string) {
    await fetch(`/api/admin/projekte/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editData) });
    setEditingId(null); load();
  }

  async function deleteProject(id: string) {
    if (!confirm("Projekt wirklich löschen?")) return;
    await fetch(`/api/admin/projekte/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)" }}>Alle Projekte</h1>
        <input
          placeholder="Suche nach Projekt oder Kunde..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle(), padding: "0.5rem 0.75rem", minWidth: 220, fontSize: 13 }}
        />
      </div>

      {loading ? (
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Projekte...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Projekttitel", "Kunde", "Status", "Progress", "Erstellt", ""].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 0.75rem", textAlign: "left", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-secondary)", fontWeight: 400, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: "1px solid var(--border-light)", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "0.75rem", color: "var(--text-primary)" }}>
                    {editingId === p.id ? (
                      <input value={editData.description ?? p.description ?? ""} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Beschreibung" style={inputStyle()} />
                    ) : (
                      <span style={{ fontWeight: 400 }}>{p.title}</span>
                    )}
                  </td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{p.user.name}</td>
                  <td style={{ padding: "0.75rem" }}>
                    {editingId === p.id ? (
                      <select value={editData.status ?? p.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} style={inputStyle()}>
                        <option value="in_progress">In Bearbeitung</option>
                        <option value="completed">Abgeschlossen</option>
                        <option value="on_hold">Pausiert</option>
                      </select>
                    ) : (
                      <span style={{ fontSize: 11, padding: "0.25rem 0.5rem", borderRadius: 4, background: `${STATUS_COLORS[p.status]}18`, color: STATUS_COLORS[p.status] }}>
                        {STATUS_LABELS[p.status] ?? p.status}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    {editingId === p.id ? (
                      <input type="number" min={0} max={100} value={editData.progress ?? p.progress} onChange={(e) => setEditData({ ...editData, progress: Number(e.target.value) })} style={{ ...inputStyle(), width: 60 }} />
                    ) : (
                      <span style={{ color: "var(--text-primary)" }}>{p.progress}%</span>
                    )}
                  </td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{new Date(p.createdAt).toLocaleDateString("de-DE")}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      {editingId === p.id ? (
                        <>
                          <button onClick={() => saveEdit(p.id)} style={{ fontSize: 11, padding: "0.25rem 0.5rem", background: "#F59E0B", color: "#000", border: "none", borderRadius: 4, cursor: "pointer" }}>Speichern</button>
                          <button onClick={() => setEditingId(null)} style={{ fontSize: 11, padding: "0.25rem 0.5rem", background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-color)", borderRadius: 4, cursor: "pointer" }}>Abbrechen</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingId(p.id); setEditData({}); }} style={{ fontSize: 11, padding: "0.25rem 0.5rem", background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-color)", borderRadius: 4, cursor: "pointer" }}>Bearbeiten</button>
                          <button onClick={() => deleteProject(p.id)} style={{ fontSize: 11, padding: "0.25rem 0.5rem", background: "transparent", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 4, cursor: "pointer" }}>Löschen</button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)", fontSize: 14 }}>Keine Projekte gefunden.</p>}
        </div>
      )}
    </motion.div>
  );
}

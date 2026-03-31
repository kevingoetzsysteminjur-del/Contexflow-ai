"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Project { id: string; title: string; description?: string; status: string; progress: number; createdAt: string; }
interface Invoice { id: string; number: string; amount: number; status: string; dueDate: string; }
interface Customer { id: string; name: string; email: string; createdAt: string; projects: Project[]; invoices: Invoice[]; customerConversations: { id: string }[]; }

const STATUS_PROJ = ["in_progress", "completed", "on_hold"];
const STATUS_INV = ["pending", "paid", "overdue"];

function formatEur(n: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n); }

function inputStyle(): React.CSSProperties {
  return { width: "100%", padding: "0.6rem 0.75rem", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 5, color: "var(--text-primary)", fontSize: 13, outline: "none", boxSizing: "border-box" };
}

export default function KundeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const [showProjForm, setShowProjForm] = useState(false);
  const [projForm, setProjForm] = useState({ title: "", description: "", status: "in_progress", progress: 0 });
  const [projLoading, setProjLoading] = useState(false);

  const [showInvForm, setShowInvForm] = useState(false);
  const [invForm, setInvForm] = useState({ number: "", amount: "", status: "pending", dueDate: "", lexofficeId: "" });
  const [invLoading, setInvLoading] = useState(false);

  const [editingProj, setEditingProj] = useState<string | null>(null);
  const [editProjData, setEditProjData] = useState<Partial<Project>>({});

  async function load() {
    const r = await fetch(`/api/admin/kunden/${id}`);
    const d = await r.json();
    setCustomer(d.customer);
    setLoading(false);
  }

  useEffect(() => { load(); }, [id]);

  async function createProject() {
    setProjLoading(true);
    await fetch("/api/admin/projekte", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...projForm, userId: id }) });
    setProjLoading(false); setShowProjForm(false); setProjForm({ title: "", description: "", status: "in_progress", progress: 0 }); load();
  }

  async function createInvoice() {
    setInvLoading(true);
    await fetch("/api/admin/rechnungen", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...invForm, userId: id, amount: parseFloat(invForm.amount), lexofficeId: invForm.lexofficeId || undefined }) });
    setInvLoading(false); setShowInvForm(false); setInvForm({ number: "", amount: "", status: "pending", dueDate: "", lexofficeId: "" }); load();
  }

  async function updateProject(projId: string) {
    await fetch(`/api/admin/projekte/${projId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editProjData) });
    setEditingProj(null); load();
  }

  async function deleteProject(projId: string) {
    if (!confirm("Projekt wirklich löschen?")) return;
    await fetch(`/api/admin/projekte/${projId}`, { method: "DELETE" });
    load();
  }

  async function updateInvoiceStatus(invId: string, status: string) {
    await fetch(`/api/admin/rechnungen/${invId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  async function deleteInvoice(invId: string) {
    if (!confirm("Rechnung wirklich löschen?")) return;
    await fetch(`/api/admin/rechnungen/${invId}`, { method: "DELETE" });
    load();
  }

  async function openChat() {
    const convId = customer?.customerConversations[0]?.id;
    if (convId) { router.push(`/admin/chat/${convId}`); return; }
    router.push("/admin/chat");
  }

  if (loading) return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Kundendaten...</p>;
  if (!customer) return <p style={{ color: "#f87171" }}>Kunde nicht gefunden.</p>;

  const btnStyle: React.CSSProperties = { padding: "0.5rem 1rem", borderRadius: 5, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 400 };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)", marginBottom: "0.5rem" }}>{customer.name}</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>{customer.email}</p>
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>Registriert: {new Date(customer.createdAt).toLocaleDateString("de-DE")}</p>
      <button onClick={openChat} style={{ ...btnStyle, background: "#6366F1", color: "#fff", marginBottom: "2rem" }}>Chat öffnen</button>

      {/* Projekte */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)" }}>Projekte ({customer.projects.length})</h2>
          <button onClick={() => setShowProjForm(!showProjForm)} style={{ ...btnStyle, background: "#F59E0B20", color: "#F59E0B", border: "1px solid #F59E0B40" }}>+ Hinzufügen</button>
        </div>
        {showProjForm && (
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input placeholder="Projekttitel *" value={projForm.title} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} style={inputStyle()} />
            <input placeholder="Beschreibung" value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })} style={inputStyle()} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <select value={projForm.status} onChange={(e) => setProjForm({ ...projForm, status: e.target.value })} style={{ ...inputStyle(), flex: 1 }}>
                <option value="in_progress">In Bearbeitung</option>
                <option value="completed">Abgeschlossen</option>
                <option value="on_hold">Pausiert</option>
              </select>
              <input type="number" min={0} max={100} placeholder="Progress %" value={projForm.progress} onChange={(e) => setProjForm({ ...projForm, progress: Number(e.target.value) })} style={{ ...inputStyle(), width: 100 }} />
            </div>
            <button onClick={createProject} disabled={projLoading || !projForm.title} style={{ ...btnStyle, background: "#F59E0B", color: "#000", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {projLoading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />} Erstellen
            </button>
          </div>
        )}
        {customer.projects.map((p) => (
          <div key={p.id} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 6, padding: "0.75rem 1rem", marginBottom: "0.5rem" }}>
            {editingProj === p.id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input value={editProjData.title ?? p.title} onChange={(e) => setEditProjData({ ...editProjData, title: e.target.value })} style={inputStyle()} />
                <input value={editProjData.description ?? p.description ?? ""} onChange={(e) => setEditProjData({ ...editProjData, description: e.target.value })} style={inputStyle()} />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select value={editProjData.status ?? p.status} onChange={(e) => setEditProjData({ ...editProjData, status: e.target.value })} style={{ ...inputStyle(), flex: 1 }}>
                    {STATUS_PROJ.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input type="number" min={0} max={100} value={editProjData.progress ?? p.progress} onChange={(e) => setEditProjData({ ...editProjData, progress: Number(e.target.value) })} style={{ ...inputStyle(), width: 80 }} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => updateProject(p.id)} style={{ ...btnStyle, background: "#F59E0B", color: "#000" }}>Speichern</button>
                  <button onClick={() => setEditingProj(null)} style={{ ...btnStyle, background: "transparent", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>Abbrechen</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 13, color: "var(--text-primary)" }}>{p.title}</p>
                  <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>{p.status} · {p.progress}%</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => { setEditingProj(p.id); setEditProjData({}); }} style={{ ...btnStyle, background: "transparent", border: "1px solid var(--border-color)", color: "var(--text-secondary)", padding: "0.3rem 0.6rem" }}>Bearbeiten</button>
                  <button onClick={() => deleteProject(p.id)} style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", padding: "0.3rem 0.6rem" }}>Löschen</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rechnungen */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)" }}>Rechnungen ({customer.invoices.length})</h2>
          <button onClick={() => setShowInvForm(!showInvForm)} style={{ ...btnStyle, background: "#F59E0B20", color: "#F59E0B", border: "1px solid #F59E0B40" }}>+ Hinzufügen</button>
        </div>
        {showInvForm && (
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input placeholder="Rechnungsnummer *" value={invForm.number} onChange={(e) => setInvForm({ ...invForm, number: e.target.value })} style={inputStyle()} />
            <input type="number" placeholder="Betrag (€) *" value={invForm.amount} onChange={(e) => setInvForm({ ...invForm, amount: e.target.value })} style={inputStyle()} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <select value={invForm.status} onChange={(e) => setInvForm({ ...invForm, status: e.target.value })} style={{ ...inputStyle(), flex: 1 }}>
                <option value="pending">Ausstehend</option>
                <option value="paid">Bezahlt</option>
                <option value="overdue">Überfällig</option>
              </select>
              <input type="date" value={invForm.dueDate} onChange={(e) => setInvForm({ ...invForm, dueDate: e.target.value })} style={{ ...inputStyle(), flex: 1 }} />
            </div>
            <input placeholder="Lexoffice ID (optional)" value={invForm.lexofficeId} onChange={(e) => setInvForm({ ...invForm, lexofficeId: e.target.value })} style={inputStyle()} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
            </div>
            <button onClick={createInvoice} disabled={invLoading || !invForm.number || !invForm.amount || !invForm.dueDate} style={{ ...btnStyle, background: "#F59E0B", color: "#000", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {invLoading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />} Erstellen
            </button>
          </div>
        )}
        {customer.invoices.map((inv) => (
          <div key={inv.id} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 6, padding: "0.75rem 1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <p style={{ fontSize: 13, color: "var(--text-primary)" }}>#{inv.number} · {formatEur(Number(inv.amount))}</p>
              <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Fällig: {new Date(inv.dueDate).toLocaleDateString("de-DE")}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <select value={inv.status} onChange={(e) => updateInvoiceStatus(inv.id, e.target.value)} style={{ ...inputStyle(), width: "auto", padding: "0.3rem 0.5rem", fontSize: 12 }}>
                {STATUS_INV.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => deleteInvoice(inv.id)} style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", padding: "0.3rem 0.6rem" }}>Löschen</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}

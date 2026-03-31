"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Invoice { id: string; number: string; amount: number; status: string; dueDate: string; user: { id: string; name: string; email: string }; }

const STATUS_LABELS: Record<string, string> = { pending: "Ausstehend", paid: "Bezahlt", overdue: "Überfällig" };
const STATUS_COLORS: Record<string, string> = { pending: "#f59e0b", paid: "#34d399", overdue: "#f87171" };

function formatEur(n: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n); }

export default function AdminRechnungenPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("alle");

  async function load() {
    const r = await fetch("/api/admin/rechnungen");
    const d = await r.json();
    setInvoices(d.invoices ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/rechnungen/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  async function deleteInvoice(id: string) {
    if (!confirm("Rechnung wirklich löschen?")) return;
    await fetch(`/api/admin/rechnungen/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = filter === "alle" ? invoices : invoices.filter((i) => i.status === filter);
  const total = invoices.reduce((s, i) => s + Number(i.amount), 0);
  const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + Number(i.amount), 0);
  const open = invoices.filter((i) => i.status === "pending").reduce((s, i) => s + Number(i.amount), 0);
  const overdue = invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + Number(i.amount), 0);

  const inputS: React.CSSProperties = { padding: "0.35rem 0.6rem", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 4, color: "var(--text-primary)", fontSize: 12, outline: "none" };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Alle Rechnungen</h1>

      {!loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Gesamt", value: formatEur(total), color: "var(--text-primary)" },
            { label: "Bezahlt", value: formatEur(paid), color: "#34d399" },
            { label: "Offen", value: formatEur(open), color: "#f59e0b" },
            { label: "Überfällig", value: formatEur(overdue), color: "#f87171" },
          ].map((item) => (
            <div key={item.label} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1rem" }}>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 4, letterSpacing: "0.06em" }}>{item.label.toUpperCase()}</p>
              <p style={{ fontSize: 16, fontWeight: 300, color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {["alle", "pending", "paid", "overdue"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{ padding: "0.35rem 0.75rem", borderRadius: 4, border: "1px solid var(--border-color)", background: filter === s ? "#F59E0B" : "transparent", color: filter === s ? "#000" : "var(--text-secondary)", fontSize: 12, cursor: "pointer", transition: "all 0.15s ease" }}
          >
            {s === "alle" ? "Alle" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Rechnungen...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Nr.", "Kunde", "Betrag", "Status", "Fällig", ""].map((h) => (
                  <th key={h} style={{ padding: "0.75rem", textAlign: "left", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-secondary)", fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: "1px solid var(--border-light)", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "0.75rem", color: "var(--text-primary)" }}>#{inv.number}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{inv.user.name}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-primary)", fontWeight: 400 }}>{formatEur(Number(inv.amount))}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <select value={inv.status} onChange={(e) => updateStatus(inv.id, e.target.value)} style={{ ...inputS, color: STATUS_COLORS[inv.status] }}>
                      <option value="pending">Ausstehend</option>
                      <option value="paid">Bezahlt</option>
                      <option value="overdue">Überfällig</option>
                    </select>
                  </td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{new Date(inv.dueDate).toLocaleDateString("de-DE")}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <button onClick={() => deleteInvoice(inv.id)} style={{ fontSize: 11, padding: "0.25rem 0.5rem", background: "transparent", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 4, cursor: "pointer" }}>Löschen</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)", fontSize: 14 }}>Keine Rechnungen gefunden.</p>}
        </div>
      )}
    </motion.div>
  );
}

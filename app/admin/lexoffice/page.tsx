"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface VoucherItem {
  id: string;
  voucherNumber: string;
  contactName: string;
  totalGrossAmount: number;
  openAmount: number;
  voucherStatus: string;
  voucherDate: string;
  dueDate: string | null;
}

interface Customer { id: string; name: string; email: string; }

const STATUS_LABELS: Record<string, string> = {
  open: "Offen", paid: "Bezahlt", overdue: "Überfällig", draft: "Entwurf", voided: "Storniert",
};
const STATUS_COLORS: Record<string, string> = {
  open: "#f59e0b", paid: "#34d399", overdue: "#f87171", draft: "#94a3b8", voided: "#6b7280",
};

function formatEur(n: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n); }
function formatDate(d: string) { return new Date(d).toLocaleDateString("de-DE"); }

export default function LexofficePage() {
  const [invoices, setInvoices] = useState<VoucherItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const [invRes, custRes] = await Promise.all([
      fetch("/api/lexoffice/invoices"),
      fetch("/api/admin/kunden"),
    ]);
    const invData = await invRes.json();
    const custData = await custRes.json();
    setInvoices(invData.content ?? []);
    setCustomers(custData.customers ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function assignInvoice(lexofficeId: string, voucherNumber: string, amount: number, status: string) {
    const customerId = selectedCustomer[lexofficeId];
    if (!customerId) return;
    setAssigning(lexofficeId);
    setSuccess(null); setError(null);

    const res = await fetch("/api/admin/rechnungen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: customerId,
        number: voucherNumber,
        amount,
        status: status === "paid" ? "paid" : status === "overdue" ? "overdue" : "pending",
        dueDate: new Date().toISOString(),
        lexofficeId,
      }),
    });

    setAssigning(null);
    if (res.ok) setSuccess(`Rechnung ${voucherNumber} erfolgreich zugeordnet.`);
    else setError("Fehler beim Zuordnen.");
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)" }}>Lexoffice Rechnungen</h1>
        <button
          onClick={load}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 0.75rem", background: "transparent", border: "1px solid var(--border-color)", borderRadius: 6, cursor: "pointer", fontSize: 12, color: "var(--text-secondary)" }}
        >
          <RefreshCw size={13} /> Aktualisieren
        </button>
      </div>

      {success && <p style={{ fontSize: 13, color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 6, padding: "0.6rem 0.75rem", marginBottom: "1rem" }}>{success}</p>}
      {error && <p style={{ fontSize: 13, color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "0.6rem 0.75rem", marginBottom: "1rem" }}>{error}</p>}

      {loading ? (
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Lexoffice-Rechnungen...</p>
      ) : invoices.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Keine Rechnungen gefunden. Bitte API-Key prüfen.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Nummer", "Kontakt", "Betrag", "Status", "Datum", "Kunde zuordnen"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem", textAlign: "left", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-secondary)", fontWeight: 400, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: "1px solid var(--border-light)", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "0.75rem", color: "var(--text-primary)", fontWeight: 400 }}>{inv.voucherNumber}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{inv.contactName}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-primary)" }}>{formatEur(inv.totalGrossAmount)}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${STATUS_COLORS[inv.voucherStatus] ?? "#94a3b8"}20`, color: STATUS_COLORS[inv.voucherStatus] ?? "#94a3b8" }}>
                      {STATUS_LABELS[inv.voucherStatus] ?? inv.voucherStatus}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{formatDate(inv.voucherDate)}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <select
                        value={selectedCustomer[inv.id] ?? ""}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, [inv.id]: e.target.value })}
                        style={{ padding: "0.35rem 0.5rem", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 4, color: "var(--text-primary)", fontSize: 12, outline: "none", minWidth: 140 }}
                      >
                        <option value="">Kunde wählen...</option>
                        {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <button
                        onClick={() => assignInvoice(inv.id, inv.voucherNumber, inv.totalGrossAmount, inv.voucherStatus)}
                        disabled={!selectedCustomer[inv.id] || assigning === inv.id}
                        style={{ padding: "0.35rem 0.6rem", background: "#F59E0B", color: "#000", border: "none", borderRadius: 4, cursor: selectedCustomer[inv.id] ? "pointer" : "not-allowed", fontSize: 11, opacity: !selectedCustomer[inv.id] ? 0.5 : 1, whiteSpace: "nowrap" }}
                      >
                        {assigning === inv.id ? "..." : "Zuordnen"}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

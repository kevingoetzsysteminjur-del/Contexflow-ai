"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Receipt, FileText } from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: string;
  dueDate: string;
  lexofficeId: string | null;
  pdfUrl: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Ausstehend",
  paid: "Bezahlt",
  overdue: "Überfällig",
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  paid: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  overdue: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
};

function formatEur(amount: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE");
}

export default function RechnungenPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/rechnungen")
      .then((r) => r.json())
      .then((d) => { setInvoices(d.invoices ?? []); setLoading(false); });
  }, []);

  const total = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalPending = invoices.filter((i) => i.status !== "paid").reduce((sum, inv) => sum + Number(inv.amount), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
          Rechnungen
        </h1>
      </div>

      {!loading && invoices.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Gesamt", value: formatEur(total), color: "var(--text-primary)" },
            { label: "Bezahlt", value: formatEur(totalPaid), color: "#34d399" },
            { label: "Offen", value: formatEur(totalPending), color: "#f59e0b" },
          ].map((item) => (
            <div key={item.label} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.08em", marginBottom: 6 }}>{item.label.toUpperCase()}</p>
              <p style={{ fontSize: 18, fontWeight: 300, color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Rechnungen...</div>
      ) : invoices.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px dashed var(--border-color)", borderRadius: 8 }}>
          <Receipt size={40} style={{ color: "var(--text-tertiary)", margin: "0 auto 1rem" }} />
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Noch keine Rechnungen vorhanden.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {invoices.map((invoice, i) => {
            const statusStyle = STATUS_COLORS[invoice.status] ?? STATUS_COLORS.pending;
            const hasPdf = !!(invoice.lexofficeId || invoice.pdfUrl);
            return (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/dashboard/rechnungen/${invoice.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 8,
                    padding: "1rem 1.25rem",
                    textDecoration: "none",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#6366F140"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; }}
                >
                  <div>
                    <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 400 }}>
                      Rechnung #{invoice.number}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                      Fällig: {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {invoice.lexofficeId && (
                      <span style={{ fontSize: 10, padding: "2px 6px", background: "rgba(52,211,153,0.15)", color: "#34d399", borderRadius: 4 }}>Lexoffice</span>
                    )}
                    {hasPdf && (
                      <FileText size={13} color="var(--text-tertiary)" />
                    )}
                    <p style={{ fontSize: 15, fontWeight: 400, color: "var(--text-primary)" }}>
                      {formatEur(Number(invoice.amount))}
                    </p>
                    <span style={{ fontSize: 11, padding: "0.3rem 0.6rem", borderRadius: 4, background: statusStyle.bg, color: statusStyle.color }}>
                      {STATUS_LABELS[invoice.status] ?? invoice.status}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  lexofficeId: string | null;
  pdfUrl: string | null;
}

interface LineItem {
  id: string | null;
  type: string;
  name: string;
  description: string | null;
  quantity: number;
  unitName: string;
  unitPrice: { netAmount: number; grossAmount: number; taxRatePercentage: number };
  lineItemAmount: number;
}

interface LexofficeData {
  voucherNumber: string;
  voucherDate: string;
  lineItems: LineItem[];
  totalPrice: { totalNetAmount: number; totalGrossAmount: number; totalTaxAmount: number; currency: string };
  files: { documentFileId: string } | null;
}

const STATUS_LABELS: Record<string, string> = { pending: "Ausstehend", paid: "Bezahlt", overdue: "Überfällig" };
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  paid: { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  overdue: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
};

function formatEur(n: number) { return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n); }
function formatDate(d: string) { return new Date(d).toLocaleDateString("de-DE"); }

export default function RechnungDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [lexofficeData, setLexofficeData] = useState<LexofficeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dashboard/invoices/${id}`)
      .then((r) => r.json())
      .then((d) => { setInvoice(d.invoice ?? null); setLexofficeData(d.lexofficeData ?? null); setLoading(false); });
  }, [id]);

  if (loading) return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Rechnung...</p>;
  if (!invoice) return <p style={{ color: "#f87171" }}>Rechnung nicht gefunden.</p>;

  const statusStyle = STATUS_COLORS[invoice.status] ?? STATUS_COLORS.pending;
  const pdfHref = invoice.lexofficeId ? `/api/lexoffice/invoices/${invoice.lexofficeId}/pdf` : invoice.pdfUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 680 }}
    >
      <Link
        href="/dashboard/rechnungen"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: 12, color: "var(--text-secondary)", textDecoration: "none", marginBottom: "1.5rem" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
      >
        <ArrowLeft size={14} /> Zurück zur Übersicht
      </Link>

      {/* Header Card */}
      <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 10, padding: "1.75rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: 6, textTransform: "uppercase" }}>Rechnung</p>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)" }}>#{invoice.number}</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "inline-block", fontSize: 13, padding: "0.4rem 1rem", borderRadius: 20, background: statusStyle.bg, color: statusStyle.color, marginBottom: 8 }}>
              {STATUS_LABELS[invoice.status] ?? invoice.status}
            </span>
            <p style={{ fontSize: "2rem", fontWeight: 300, color: "var(--text-primary)" }}>{formatEur(Number(invoice.amount))}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-light)" }}>
          <div>
            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Fälligkeitsdatum</p>
            <p style={{ fontSize: 13, color: "var(--text-primary)" }}>{formatDate(invoice.dueDate)}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Erstellt am</p>
            <p style={{ fontSize: 13, color: "var(--text-primary)" }}>{formatDate(invoice.createdAt)}</p>
          </div>
          {invoice.lexofficeId && (
            <div>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Quelle</p>
              <span style={{ fontSize: 11, padding: "2px 8px", background: "rgba(52,211,153,0.15)", color: "#34d399", borderRadius: 4 }}>Lexoffice</span>
            </div>
          )}
        </div>

        {pdfHref && (
          <div style={{ marginTop: "1.25rem" }}>
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.25rem", background: "#6366F1", color: "#fff", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: 400, transition: "background 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#818cf8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
            >
              <FileText size={16} />
              Rechnung als PDF öffnen
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      {/* Lexoffice Positionen */}
      {lexofficeData && lexofficeData.lineItems.length > 0 && (
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Positionen
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  {["Beschreibung", "Menge", "Einzelpreis", "Gesamt"].map((h) => (
                    <th key={h} style={{ padding: "0.5rem 0.75rem", textAlign: h === "Beschreibung" ? "left" : "right", fontSize: 11, letterSpacing: "0.06em", color: "var(--text-secondary)", fontWeight: 400, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lexofficeData.lineItems.filter((l) => l.type !== "custom").map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "0.75rem", color: "var(--text-primary)", maxWidth: 280 }}>
                      <p style={{ fontWeight: 400 }}>{item.name}</p>
                      {item.description && <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{item.description}</p>}
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                      {item.quantity} {item.unitName}
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                      {formatEur(item.unitPrice.netAmount)}
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "right", color: "var(--text-primary)", fontWeight: 400, whiteSpace: "nowrap" }}>
                      {formatEur(item.lineItemAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summen */}
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: "2rem" }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Netto</span>
              <span style={{ fontSize: 12, color: "var(--text-primary)", minWidth: 100, textAlign: "right" }}>{formatEur(lexofficeData.totalPrice.totalNetAmount)}</span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>MwSt.</span>
              <span style={{ fontSize: 12, color: "var(--text-primary)", minWidth: 100, textAlign: "right" }}>{formatEur(lexofficeData.totalPrice.totalTaxAmount)}</span>
            </div>
            <div style={{ display: "flex", gap: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.4rem" }}>
              <span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)" }}>Brutto</span>
              <span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)", minWidth: 100, textAlign: "right" }}>{formatEur(lexofficeData.totalPrice.totalGrossAmount)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Fallback wenn keine Lexoffice-Daten */}
      {!lexofficeData && !pdfHref && (
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <FileText size={16} color="var(--text-tertiary)" />
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Das PDF wird in Kürze bereitgestellt.</p>
        </div>
      )}
    </motion.div>
  );
}

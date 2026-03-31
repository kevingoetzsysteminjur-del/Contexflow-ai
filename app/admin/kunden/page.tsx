"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { projects: number; invoices: number };
}

export default function KundenPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/kunden").then((r) => r.json()).then((d) => { setCustomers(d.customers ?? []); setLoading(false); });
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Alle Kunden</h1>

      {loading ? (
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Kunden...</p>
      ) : customers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px dashed var(--border-color)", borderRadius: 8 }}>
          <Users size={40} style={{ color: "var(--text-tertiary)", margin: "0 auto 1rem" }} />
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Noch keine Kunden registriert.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Name", "E-Mail", "Registriert", "Projekte", "Rechnungen", ""].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-secondary)", fontWeight: 400, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ borderBottom: "1px solid var(--border-light)", transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "0.75rem 1rem", color: "var(--text-primary)", fontWeight: 400 }}>{c.name}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)" }}>{c.email}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)" }}>{new Date(c.createdAt).toLocaleDateString("de-DE")}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--text-primary)", textAlign: "center" }}>{c._count.projects}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--text-primary)", textAlign: "center" }}>{c._count.invoices}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <Link
                      href={`/admin/kunden/${c.id}`}
                      style={{ fontSize: 12, color: "#F59E0B", textDecoration: "none", padding: "0.3rem 0.6rem", border: "1px solid #F59E0B40", borderRadius: 4, transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F59E0B18"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      Details →
                    </Link>
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

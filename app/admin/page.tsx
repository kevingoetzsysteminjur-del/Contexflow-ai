"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, FolderKanban, Receipt, MessageSquare, EuroIcon } from "lucide-react";

interface Stats {
  customerCount: number;
  projectCount: number;
  invoiceCount: number;
  openInvoicesTotal: number;
  unreadMessages: number;
  recentUsers: { id: string; name: string; email: string; createdAt: string }[];
  recentMessages: { id: string; content: string; createdAt: string; sender: { name: string } }[];
}

function formatEur(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  const cards = [
    { icon: Users, label: "Kunden", value: stats?.customerCount ?? "—", color: "#F59E0B" },
    { icon: FolderKanban, label: "Projekte", value: stats?.projectCount ?? "—", color: "#6366F1" },
    { icon: Receipt, label: "Rechnungen", value: stats?.invoiceCount ?? "—", color: "#8b5cf6" },
    { icon: EuroIcon, label: "Offen (€)", value: stats ? formatEur(stats.openInvoicesTotal) : "—", color: "#f87171" },
    { icon: MessageSquare, label: "Ungelesen", value: stats?.unreadMessages ?? "—", color: "#34d399" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 300, color: "var(--text-primary)" }}>
          Willkommen, Kevin
        </h1>
        <p style={{ marginTop: "0.5rem", fontSize: 14, color: "var(--text-secondary)" }}>Admin-Übersicht von contexflow</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1.25rem" }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${card.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                <Icon size={18} color={card.color} />
              </div>
              <p style={{ fontSize: 24, fontWeight: 300, color: "var(--text-primary)" }}>{card.value}</p>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 4, letterSpacing: "0.05em" }}>{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1.25rem" }}>
          <h2 style={{ fontSize: 13, fontWeight: 400, color: "var(--text-primary)", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            LETZTE REGISTRIERUNGEN
          </h2>
          {stats?.recentUsers.length === 0 && <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Keine Kunden vorhanden.</p>}
          {stats?.recentUsers.map((u) => (
            <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)" }}>
              <div>
                <p style={{ fontSize: 13, color: "var(--text-primary)" }}>{u.name}</p>
                <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>{u.email}</p>
              </div>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{formatDate(u.createdAt)}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1.25rem" }}>
          <h2 style={{ fontSize: 13, fontWeight: 400, color: "var(--text-primary)", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            LETZTE NACHRICHTEN
          </h2>
          {stats?.recentMessages.length === 0 && <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Keine Nachrichten.</p>}
          {stats?.recentMessages.map((m) => (
            <div key={m.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <p style={{ fontSize: 12, color: "#F59E0B", fontWeight: 400 }}>{m.sender.name}</p>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{formatDate(m.createdAt)}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {m.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

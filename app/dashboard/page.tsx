"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Receipt, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Stats {
  projectCount: number;
  invoiceCount: number;
  pendingInvoices: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const [projRes, invRes] = await Promise.all([
        fetch("/api/dashboard/projekte"),
        fetch("/api/dashboard/rechnungen"),
      ]);
      const projData = await projRes.json();
      const invData = await invRes.json();
      setStats({
        projectCount: projData.projects?.length ?? 0,
        invoiceCount: invData.invoices?.length ?? 0,
        pendingInvoices: invData.invoices?.filter((i: { status: string }) => i.status === "pending").length ?? 0,
      });
    }
    load();
  }, []);

  const cards = [
    {
      icon: FolderKanban,
      label: "Projekte",
      value: stats?.projectCount ?? "—",
      color: "#6366F1",
    },
    {
      icon: Receipt,
      label: "Rechnungen",
      value: stats?.invoiceCount ?? "—",
      color: "#8b5cf6",
    },
    {
      icon: TrendingUp,
      label: "Offen",
      value: stats?.pendingInvoices ?? "—",
      color: "#f59e0b",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
          }}
        >
          Willkommen, {user?.name ?? "—"}
        </h1>
        <p style={{ marginTop: "0.5rem", fontSize: 14, color: "var(--text-secondary)" }}>
          Hier findest du eine Übersicht deiner Aktivitäten.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: `${card.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Icon size={20} color={card.color} />
              </div>
              <p style={{ fontSize: 28, fontWeight: 300, color: "var(--text-primary)" }}>{card.value}</p>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, letterSpacing: "0.05em" }}>
                {card.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

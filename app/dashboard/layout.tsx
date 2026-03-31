"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FolderKanban, Receipt, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Übersicht", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/projekte", label: "Projekte", icon: FolderKanban },
  { href: "/dashboard/rechnungen", label: "Rechnungen", icon: Receipt },
  { href: "/dashboard/profil", label: "Profil", icon: User },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function isActive(item: (typeof NAV_ITEMS)[0]) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/");
  }

  const SidebarContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.5rem 1rem",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: 11,
          letterSpacing: "0.3em",
          fontWeight: 300,
          color: "var(--text-primary)",
          textDecoration: "none",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          display: "block",
        }}
        onClick={() => setSidebarOpen(false)}
      >
        CONTEXFLOW
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 0.75rem",
                borderRadius: 6,
                textDecoration: "none",
                fontSize: 13,
                color: active ? "#6366F1" : "var(--text-secondary)",
                background: active ? "rgba(99,102,241,0.1)" : "transparent",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
        {user && (
          <div style={{ marginBottom: "0.75rem", padding: "0 0.75rem" }}>
            <p style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 400 }}>{user.name}</p>
            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.6rem 0.75rem",
            borderRadius: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "var(--text-secondary)",
            width: "100%",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)";
            (e.currentTarget as HTMLElement).style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          <LogOut size={16} />
          Abmelden
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: 250,
          flexShrink: 0,
          borderRight: "1px solid var(--border-color)",
          background: "var(--bg-primary)",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          display: "none",
        }}
        className="dashboard-sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 9998,
              }}
            />
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 250,
                height: "100vh",
                background: "var(--bg-primary)",
                borderRight: "1px solid var(--border-color)",
                zIndex: 9999,
                overflowY: "auto",
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        className="dashboard-main"
        style={{
          flex: 1,
          minHeight: "100vh",
          padding: "2rem 1.5rem",
        }}
      >
        {/* Mobile header */}
        <div
          className="dashboard-mobile-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              padding: "0.4rem",
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Menu size={18} />
          </button>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--text-secondary)" }}>DASHBOARD</span>
          <div style={{ width: 34 }} />
        </div>

        {children}
      </main>

      <style>{`
        @media (min-width: 768px) {
          .dashboard-sidebar { display: block !important; }
          .dashboard-main { margin-left: 250px; }
          .dashboard-mobile-header { display: none !important; }
        }
      `}</style>
    </div>
  );
}

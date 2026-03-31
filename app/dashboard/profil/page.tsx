"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [nameSuccess, setNameSuccess] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameLoading, setNameLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: 6,
    color: "var(--text-primary)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    letterSpacing: "0.1em",
    color: "var(--text-secondary)",
    marginBottom: 6,
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#6366F1";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--border-color)";
    e.currentTarget.style.boxShadow = "none";
  }

  async function handleNameUpdate(e: React.FormEvent) {
    e.preventDefault();
    setNameError("");
    setNameSuccess("");
    setNameLoading(true);
    const res = await fetch("/api/dashboard/profil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setNameLoading(false);
    if (!res.ok) setNameError(data.error ?? "Fehler beim Speichern.");
    else setNameSuccess("Name erfolgreich aktualisiert.");
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");
    if (newPassword.length < 8) { setPwError("Das neue Passwort muss mindestens 8 Zeichen lang sein."); return; }
    if (newPassword !== newPasswordConfirm) { setPwError("Die Passwörter stimmen nicht überein."); return; }
    setPwLoading(true);
    const res = await fetch("/api/dashboard/passwort", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    setPwLoading(false);
    if (!res.ok) setPwError(data.error ?? "Fehler beim Ändern.");
    else {
      setPwSuccess("Passwort erfolgreich geändert.");
      setOldPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 480 }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.02em", color: "var(--text-primary)", marginBottom: "2rem" }}>
        Mein Profil
      </h1>

      {/* Name ändern */}
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
          Persönliche Daten
        </h2>
        <form onSubmit={handleNameUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          <div>
            <label style={labelStyle}>E-MAIL (nicht änderbar)</label>
            <input
              type="email"
              value={user?.email ?? ""}
              readOnly
              style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }}
            />
          </div>
          {nameError && (
            <p style={{ fontSize: 13, color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "0.5rem 0.75rem" }}>
              {nameError}
            </p>
          )}
          {nameSuccess && (
            <p style={{ fontSize: 13, color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 6, padding: "0.5rem 0.75rem" }}>
              {nameSuccess}
            </p>
          )}
          <button
            type="submit"
            disabled={nameLoading}
            style={{
              padding: "0.75rem",
              background: "#6366F1",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              cursor: nameLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: nameLoading ? 0.6 : 1,
            }}
          >
            {nameLoading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
            Speichern
          </button>
        </form>
      </div>

      {/* Passwort ändern */}
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 400, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
          Passwort ändern
        </h2>
        <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>AKTUELLES PASSWORT</label>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required placeholder="••••••••" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div>
            <label style={labelStyle}>NEUES PASSWORT</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="Mindestens 8 Zeichen" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div>
            <label style={labelStyle}>NEUES PASSWORT WIEDERHOLEN</label>
            <input type="password" value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} required placeholder="••••••••" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          {pwError && (
            <p style={{ fontSize: 13, color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "0.5rem 0.75rem" }}>
              {pwError}
            </p>
          )}
          {pwSuccess && (
            <p style={{ fontSize: 13, color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 6, padding: "0.5rem 0.75rem" }}>
              {pwSuccess}
            </p>
          )}
          <button
            type="submit"
            disabled={pwLoading}
            style={{
              padding: "0.75rem",
              background: "#6366F1",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              cursor: pwLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: pwLoading ? 0.6 : 1,
            }}
          >
            {pwLoading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
            Passwort ändern
          </button>
        </form>
      </div>

      <button
        onClick={async () => { await signOut({ redirect: false }); router.push("/"); }}
        style={{
          padding: "0.75rem 1.5rem",
          background: "none",
          border: "1px solid rgba(248,113,113,0.3)",
          borderRadius: 6,
          color: "#f87171",
          fontSize: 14,
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        Abmelden
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}

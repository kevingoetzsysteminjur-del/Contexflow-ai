"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Ein Fehler ist aufgetreten.");
    } else {
      router.push("/login?registered=1");
    }
  }

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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        padding: "2rem 1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              fontWeight: 300,
              color: "var(--text-primary)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            CONTEXFLOW
          </Link>
          <h1
            style={{
              marginTop: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "var(--text-primary)",
            }}
          >
            Konto erstellen
          </h1>
          <p style={{ marginTop: "0.5rem", fontSize: 14, color: "var(--text-secondary)" }}>
            Registriere dich kostenlos
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="name" style={labelStyle}>NAME</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Max Mustermann"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>E-MAIL</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="deine@email.de"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>PASSWORT</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mindestens 8 Zeichen"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm" style={labelStyle}>PASSWORT WIEDERHOLEN</label>
            <input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: 13,
                color: "#f87171",
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: 6,
                padding: "0.6rem 0.75rem",
              }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.8rem",
              background: loading ? "rgba(99,102,241,0.6)" : "#6366F1",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.05em",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = "#818cf8";
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = "#6366F1";
            }}
          >
            {loading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
            {loading ? "Registrieren..." : "Registrieren"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: 13, color: "var(--text-secondary)" }}>
          Bereits ein Konto?{" "}
          <Link href="/login" style={{ color: "#6366F1", textDecoration: "none" }}>
            Hier anmelden
          </Link>
        </p>
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

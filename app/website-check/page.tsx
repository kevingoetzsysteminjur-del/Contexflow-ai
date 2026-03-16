"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOALS = [
  "Mehr Kunden",
  "Besseres Design",
  "Schnellere Ladezeit",
  "Besseres Google-Ranking",
  "KI-Features",
];

type FormData = {
  url: string;
  goals: string[];
  name: string;
  email: string;
  phone: string;
};

export default function WebsiteCheckPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    url: "",
    goals: [],
    name: "",
    email: "",
    phone: "",
  });

  const totalSteps = 3;

  function toggleGoal(goal: string) {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(goal)
        ? f.goals.filter((g) => g !== goal)
        : [...f.goals, goal],
    }));
  }

  function canProceed() {
    if (step === 1) return form.url.trim().length > 0;
    if (step === 2) return form.goals.length > 0;
    if (step === 3) return form.name.trim().length > 0 && form.email.trim().length > 0;
    return false;
  }

  async function handleSubmit() {
    if (!canProceed()) return;
    setLoading(true);
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: 2,
    padding: "0.85rem 1rem",
    fontSize: 15,
    color: "var(--text-primary)",
    outline: "none",
    letterSpacing: "0.02em",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--text-tertiary)",
    marginBottom: "0.5rem",
    display: "block",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(7rem, 12vw, 9rem) clamp(1.5rem, 4vw, 2rem) clamp(4rem, 8vw, 6rem)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        {!submitted ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#6366F1",
                  margin: "0 0 0.75rem 0",
                }}
              >
                KOSTENLOS
              </p>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 200,
                  color: "var(--text-primary)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.2,
                  margin: "0 0 0.75rem 0",
                }}
              >
                Kostenloser Website-Check
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-tertiary)", margin: 0, lineHeight: 1.6 }}>
                In 3 Schritten zu deinem persönlichen Feedback.
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      color: i + 1 <= step ? "#6366F1" : "var(--text-tertiary)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Schritt {i + 1}
                  </span>
                ))}
              </div>
              <div
                style={{
                  height: 2,
                  background: "var(--bg-secondary)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                    borderRadius: 2,
                    minWidth: step === 1 ? 0 : undefined,
                  }}
                />
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 300,
                        color: "var(--text-primary)",
                        margin: "0 0 1.5rem 0",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Welche Website soll gecheckt werden?
                    </h2>
                    <div>
                      <label style={labelStyle}>Deine Website-URL</label>
                      <input
                        type="url"
                        placeholder="www.deine-website.de"
                        value={form.url}
                        onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLInputElement).style.borderColor = "#6366F1";
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLInputElement).style.borderColor = "var(--input-border)";
                        }}
                      />
                      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: "0.5rem", margin: "0.5rem 0 0 0" }}>
                        Falls du noch keine Website hast, trag einfach "keine Website" ein.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h2
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 300,
                        color: "var(--text-primary)",
                        margin: "0 0 0.5rem 0",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Was ist dein Ziel?
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--text-tertiary)", margin: "0 0 1.5rem 0" }}>
                      Mehrfachauswahl möglich.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                      {GOALS.map((goal) => {
                        const selected = form.goals.includes(goal);
                        return (
                          <button
                            key={goal}
                            onClick={() => toggleGoal(goal)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.85rem",
                              padding: "0.9rem 1.1rem",
                              background: selected ? "#6366F110" : "var(--input-bg)",
                              border: `1px solid ${selected ? "#6366F160" : "var(--input-border)"}`,
                              borderRadius: 2,
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <span
                              style={{
                                width: 18,
                                height: 18,
                                border: `1px solid ${selected ? "#6366F1" : "var(--border-color)"}`,
                                borderRadius: 2,
                                background: selected ? "#6366F1" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                transition: "all 0.2s ease",
                                fontSize: 11,
                                color: "#fff",
                              }}
                            >
                              {selected && "✓"}
                            </span>
                            <span
                              style={{
                                fontSize: 14,
                                color: selected ? "var(--text-primary)" : "var(--text-secondary)",
                                transition: "color 0.2s ease",
                              }}
                            >
                              {goal}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <h2
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 300,
                        color: "var(--text-primary)",
                        margin: "0 0 1.5rem 0",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Wohin soll dein Check geschickt werden?
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={labelStyle}>
                          Name <span style={{ color: "#6366F1" }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Dein Name"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLInputElement).style.borderColor = "#6366F1";
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLInputElement).style.borderColor = "var(--input-border)";
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>
                          E-Mail <span style={{ color: "#6366F1" }}>*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="deine@email.de"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLInputElement).style.borderColor = "#6366F1";
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLInputElement).style.borderColor = "var(--input-border)";
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Telefon (optional)</label>
                        <input
                          type="tel"
                          placeholder="+49 ..."
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLInputElement).style.borderColor = "#6366F1";
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLInputElement).style.borderColor = "var(--input-border)";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2.5rem",
              }}
            >
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-tertiary)",
                    padding: "0.75rem 1.5rem",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    borderRadius: 2,
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#6366F1";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                  }}
                >
                  ← Zurück
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  onClick={() => canProceed() && setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  style={{
                    background: canProceed() ? "#6366F1" : "var(--border-color)",
                    border: "none",
                    color: canProceed() ? "#fff" : "var(--text-tertiary)",
                    padding: "0.75rem 2rem",
                    fontSize: 13,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: canProceed() ? "pointer" : "not-allowed",
                    borderRadius: 2,
                    transition: "background 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (canProceed()) (e.currentTarget as HTMLElement).style.background = "#4F46E5";
                  }}
                  onMouseLeave={(e) => {
                    if (canProceed()) (e.currentTarget as HTMLElement).style.background = "#6366F1";
                  }}
                >
                  Weiter →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  style={{
                    background: canProceed() ? "#6366F1" : "var(--border-color)",
                    border: "none",
                    color: canProceed() ? "#fff" : "var(--text-tertiary)",
                    padding: "0.75rem 2rem",
                    fontSize: 13,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: canProceed() ? "pointer" : "not-allowed",
                    borderRadius: 2,
                    transition: "background 0.2s ease",
                    minWidth: 140,
                  }}
                >
                  {loading ? "Wird gesendet..." : "Jetzt prüfen →"}
                </button>
              )}
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", paddingTop: "2rem" }}
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "1px solid #6366F160",
                background: "#6366F115",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem",
                fontSize: 28,
                color: "#6366F1",
              }}
            >
              ✓
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 200,
                color: "var(--text-primary)",
                letterSpacing: "0.03em",
                margin: "0 0 1rem 0",
                lineHeight: 1.3,
              }}
            >
              Danke!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: "0 auto 2.5rem",
                maxWidth: 420,
              }}
            >
              Du bekommst deinen persönlichen Website-Check innerhalb von
              <strong style={{ color: "var(--text-primary)", fontWeight: 400 }}> 24 Stunden </strong>
              per E-Mail.
            </motion.p>

            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#6366F1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
              }}
            >
              ← Zurück zur Startseite
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
}

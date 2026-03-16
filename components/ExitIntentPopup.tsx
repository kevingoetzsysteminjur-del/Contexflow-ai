"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function ExitIntentPopup() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const already = sessionStorage.getItem("exitPopupShown");
    if (already) return;

    // Don't show on touch/mobile devices — mouseleave doesn't work there
    const isTouchDevice = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    if (isTouchDevice) return;
    if (window.innerWidth <= 768) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY < 10) {
        setVisible(true);
        sessionStorage.setItem("exitPopupShown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    // Small delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setVisible(false), 2500);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setVisible(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 9998,
            }}
          />

          {/* Popup box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              width: "min(480px, calc(100vw - 2rem))",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "clamp(1.75rem, 5vw, 2.5rem)",
            }}
          >
            {/* X button */}
            <button
              onClick={() => setVisible(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-tertiary)",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")}
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                {/* Headline */}
                <h2
                  style={{
                    fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
                    fontWeight: 300,
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.02em",
                    lineHeight: 1.3,
                    paddingRight: "1.5rem",
                  }}
                >
                  {t.exit_popup.title}
                </h2>

                {/* Body text */}
                <p
                  style={{
                    fontSize: "clamp(0.875rem, 1.5vw, 0.975rem)",
                    color: "var(--text-tertiary)",
                    lineHeight: 1.75,
                    marginBottom: "1.75rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.exit_popup.text}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.exit_popup.url_placeholder}
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--input-border)",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      letterSpacing: "0.02em",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--input-border)")}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.exit_popup.email_placeholder}
                    required
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--input-border)",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      letterSpacing: "0.02em",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--input-border)")}
                  />
                  <button
                    type="submit"
                    style={{
                      marginTop: "0.25rem",
                      background: "#C5A028",
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.85rem 1.5rem",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#0a0805",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "opacity 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.85";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {t.exit_popup.cta}
                  </button>
                </form>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "1rem 0",
                  textAlign: "center",
                  minHeight: 160,
                }}
              >
                <span style={{ fontSize: 36 }}>✅</span>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    color: "var(--text-primary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.exit_popup.thanks}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-tertiary)", letterSpacing: "0.02em" }}>
                  Dein Website-Check ist reserviert.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

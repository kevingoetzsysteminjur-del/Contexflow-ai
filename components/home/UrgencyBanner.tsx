"use client";

import { SLOTS_CONFIG } from "@/lib/config";
import { useLang } from "@/contexts/LanguageContext";

export function UrgencyBadge() {
  const { t } = useLang();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(245, 158, 11, 0.12)",
        border: "1px solid rgba(245, 158, 11, 0.35)",
        borderRadius: "4px",
        padding: "3px 10px",
        fontSize: 11,
        letterSpacing: "0.08em",
        color: "#F59E0B",
        fontWeight: 500,
      }}
    >
      <span style={{ fontSize: 9 }}>🔥</span>
      {t.urgency.slot_free.replace("{remaining}", String(SLOTS_CONFIG.remaining))}
    </span>
  );
}

export default function UrgencyBanner() {
  const { t } = useLang();
  const taken = SLOTS_CONFIG.total - SLOTS_CONFIG.remaining;

  return (
    <div
      style={{
        background: "rgba(245, 158, 11, 0.06)",
        borderTop: "1px solid rgba(245, 158, 11, 0.2)",
        borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
        padding: "0.75rem clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem 2rem",
        }}
      >
        {/* Slot circles */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {Array.from({ length: SLOTS_CONFIG.total }).map((_, i) => {
            const isTaken = i < taken;
            return (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: isTaken
                    ? "rgba(245, 158, 11, 0.25)"
                    : "transparent",
                  border: isTaken
                    ? "1.5px solid rgba(245, 158, 11, 0.5)"
                    : "1.5px solid #F59E0B",
                  boxShadow: isTaken
                    ? "none"
                    : "0 0 6px rgba(245, 158, 11, 0.6), 0 0 12px rgba(245, 158, 11, 0.3)",
                  position: "relative",
                }}
              >
                {isTaken && (
                  <svg
                    viewBox="0 0 16 16"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <line
                      x1="4"
                      y1="4"
                      x2="12"
                      y2="12"
                      stroke="rgba(245,158,11,0.5)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="12"
                      y1="4"
                      x2="4"
                      y2="12"
                      stroke="rgba(245,158,11,0.5)"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Text */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
              fontWeight: 500,
              color: "#F59E0B",
              letterSpacing: "0.02em",
            }}
          >
            {t.urgency.month_free.replace("{remaining}", String(SLOTS_CONFIG.remaining))}
          </span>
          <span
            style={{
              width: 1,
              height: 14,
              background: "rgba(245,158,11,0.3)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "clamp(0.75rem, 1.3vw, 0.8rem)",
              color: "rgba(245,158,11,0.65)",
              letterSpacing: "0.02em",
            }}
          >
            {t.urgency.quality_note.replace("{total}", String(SLOTS_CONFIG.total))}
          </span>
        </div>
      </div>
    </div>
  );
}

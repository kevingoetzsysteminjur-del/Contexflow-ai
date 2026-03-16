"use client";

import { useEffect, useState } from "react";

export default function LiveVisitorBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Initialize with random number between 3 and 8
    const initial = Math.floor(Math.random() * 6) + 3;
    setCount(initial);

    // Update every 30-45 seconds
    function scheduleUpdate() {
      const delay = Math.floor(Math.random() * 15000) + 30000; // 30-45s
      return setTimeout(() => {
        setCount((prev) => {
          if (prev === null) return initial;
          const direction = Math.random() > 0.5 ? 1 : -1;
          const next = prev + direction;
          return Math.min(12, Math.max(2, next));
        });
        scheduleUpdate();
      }, delay);
    }

    const timer = scheduleUpdate();
    return () => clearTimeout(timer);
  }, []);

  if (count === null) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "6rem",
        left: "1.5rem",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        background: "rgba(3, 3, 5, 0.82)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "100px",
        padding: "5px 12px 5px 9px",
        fontSize: 12,
        color: "rgba(255,255,255,0.55)",
        letterSpacing: "0.02em",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Green dot */}
      <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#22C55E",
            opacity: 0.4,
            animation: "live-ping 2s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#22C55E",
          }}
        />
      </span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{count}</span>
      <span>Personen schauen sich gerade diese Seite an</span>

      <style>{`
        @keyframes live-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

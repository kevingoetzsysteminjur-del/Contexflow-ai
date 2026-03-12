"use client";
import { useState } from "react";

const TEXT = "WEBSITES · AI INTEGRATION · CONTEXT ENGINEERING · AUTOMATION · CHATBOTS · WEB APPS · ";

export default function MarqueeBanner() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        background: "#6366F1",
        overflow: "hidden",
        padding: 0,
        height: 48,
        display: "flex",
        alignItems: "center",
        cursor: "default",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: `marquee 30s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#030305",
            fontWeight: 500,
            paddingRight: 0,
          }}
        >
          {TEXT}{TEXT}
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#030305",
            fontWeight: 500,
          }}
        >
          {TEXT}{TEXT}
        </span>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

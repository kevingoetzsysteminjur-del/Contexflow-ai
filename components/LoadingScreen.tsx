"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [step, setStep] = useState(0); // 0=hidden, 1=word shown, 2=ai shown, 3=fading
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2800);
    const t4 = setTimeout(() => setGone(true), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: step === 3 ? 0 : 1,
        transition: step === 3 ? "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        pointerEvents: step === 3 ? "none" : "all",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", letterSpacing: "0.3em" }}>
        <span
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 200,
            color: "white",
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          CONTEXFLOW
        </span>
        <span
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 200,
            color: "#6366F1",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          .AI
        </span>
      </div>
    </div>
  );
}

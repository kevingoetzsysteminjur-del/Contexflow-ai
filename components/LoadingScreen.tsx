"use client";

import { useEffect, useState } from "react";

const WORD = "CONTEXFLOW";
const LETTERS = WORD.split("");

export default function LoadingScreen() {
  const [shown, setShown] = useState<boolean[]>(new Array(LETTERS.length).fill(false));
  const [fadeOut, setFadeOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    LETTERS.forEach((_, i) => {
      setTimeout(() => {
        setShown(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 80 + i * 130);
    });

    const totalReveal = 80 + LETTERS.length * 130 + 500;
    const t1 = setTimeout(() => setFadeOut(true), totalReveal);
    const t2 = setTimeout(() => setGone(true), totalReveal + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
        flexDirection: "column",
        gap: "2rem",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <div style={{ display: "flex", letterSpacing: "0.3em" }}>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
              fontWeight: 200,
              color: "white",
              opacity: shown[i] ? 1 : 0,
              transform: shown[i] ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              display: "inline-block",
            }}
          >
            {letter}
          </span>
        ))}
        <span
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
            fontWeight: 200,
            color: "#6366F1",
            opacity: shown[LETTERS.length - 1] ? 1 : 0,
            transform: shown[LETTERS.length - 1] ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
            display: "inline-block",
          }}
        >
          .AI
        </span>
      </div>

      {/* Loading bar */}
      <div style={{ width: "40px", height: "1px", background: "#111120", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#6366F1",
          animation: "loading-fill 1.8s ease forwards",
          boxShadow: "0 0 6px rgba(99,102,241,0.8)",
        }} />
      </div>

      <style>{`
        @keyframes loading-fill {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }
      `}</style>
    </div>
  );
}

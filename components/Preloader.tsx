"use client";
import { useEffect, useState } from "react";

type Phase = "loading" | "revealing" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    // Skip if already seen this session
    if (typeof window !== "undefined" && sessionStorage.getItem("preloader-seen")) {
      setPhase("done");
      return;
    }

    const t1 = setTimeout(() => {
      setPhase("revealing");
    }, 2200);

    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("preloader-seen", "1");
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  const curtainStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: "50%",
    background: "var(--bg-primary)",
    zIndex: 2,
    transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
    willChange: "transform",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999 }}>
      {/* Top curtain */}
      <div
        style={{
          ...curtainStyle,
          top: 0,
          transform: phase === "revealing" ? "translateY(-100%)" : "translateY(0%)",
        }}
      />
      {/* Bottom curtain */}
      <div
        style={{
          ...curtainStyle,
          bottom: 0,
          transform: phase === "revealing" ? "translateY(100%)" : "translateY(0%)",
        }}
      />
      {/* Loading content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
          opacity: phase === "revealing" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#F5F5F7",
            margin: 0,
            animation: "preloader-pulse 1.5s ease-in-out infinite",
          }}
        >
          LOADING
        </p>
        <div style={{ width: 280, height: 1, background: "#111", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              background: "#6366F1",
              animation: "preloader-line 2s ease forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}

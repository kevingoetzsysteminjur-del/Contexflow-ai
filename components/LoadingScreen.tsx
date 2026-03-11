"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const hideTimer = setTimeout(() => setVisible(false), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#05050a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <Image
        src="/contexflow-logo.svg"
        alt="Contexflow AI"
        width={200}
        height={60}
        priority
        style={{ objectFit: "contain" }}
      />
      <div
        style={{
          width: "40px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
          animation: "loading-bar 1s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes loading-bar {
          0%   { transform: scaleX(0.2); opacity: 0.4; }
          50%  { transform: scaleX(1);   opacity: 1;   }
          100% { transform: scaleX(0.2); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

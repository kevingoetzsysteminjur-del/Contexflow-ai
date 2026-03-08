"use client";

import { useEffect, useRef } from "react";

const cardStyle: React.CSSProperties = {
  width: "360px",
  height: "220px",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  border: "1px solid rgba(34,211,238,0.3)",
  boxShadow: "0 0 0 1px rgba(34,211,238,0.05), 0 25px 80px rgba(0,0,0,0.8), 0 0 60px rgba(34,211,238,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
  flexShrink: 0,
};

function CardFront() {
  return (
    <div className="card" style={{ ...cardStyle, background: "linear-gradient(135deg, #060d1a 0%, #0a1628 50%, #060a12 100%)" }}>
      {/* Top-right glow */}
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "220px", height: "220px", background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
      {/* Bottom accent line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, rgba(34,211,238,0.8) 0%, rgba(34,211,238,0.1) 40%, transparent 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="none" stroke="#22d3ee" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))" }} />
            <polygon points="18,8 28,14 28,22 18,28 8,22 8,14" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="0.8" style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.4))" }} />
            <circle cx="18" cy="18" r="3.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,1))" }} />
            <line x1="18" y1="14.5" x2="18" y2="8" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
            <line x1="18" y1="21.5" x2="18" y2="28" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
          </svg>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#f4f4f5", letterSpacing: "0.05em" }}>Contexflow</div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#22d3ee", letterSpacing: "0.15em", marginTop: "-2px" }}>AI</div>
          </div>
        </div>

        {/* Name */}
        <div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, textShadow: "0 0 30px rgba(34,211,238,0.2)" }}>Kevin Goetz</div>
          <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "20px", height: "1px", background: "#22d3ee", opacity: 0.6 }} />
            <span style={{ fontSize: "11px", color: "#22d3ee", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Context Engineer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack() {
  const items = [
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
      label: "E-Mail", value: "contexflow.ai@gmx.net", highlight: false,
    },
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
      label: "Standort", value: "Mosbach, Baden-Württemberg", highlight: false,
    },
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
      label: "Website", value: "contexflow-ai.vercel.app", highlight: true,
    },
  ];

  return (
    <div className="card" style={{ ...cardStyle, background: "linear-gradient(135deg, #060a12 0%, #0a1628 50%, #060d1a 100%)" }}>
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
      {/* Top line */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.8) 50%, transparent 100%)" }} />
      {/* Center glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Corner brackets */}
      <div style={{ position: "absolute", bottom: "16px", left: "16px", width: "20px", height: "20px", borderBottom: "1.5px solid rgba(34,211,238,0.4)", borderLeft: "1.5px solid rgba(34,211,238,0.4)" }} />
      <div style={{ position: "absolute", top: "16px", right: "16px", width: "20px", height: "20px", borderTop: "1.5px solid rgba(34,211,238,0.4)", borderRight: "1.5px solid rgba(34,211,238,0.4)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", padding: "28px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 12px rgba(34,211,238,0.1)" }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: "9px", color: "rgba(34,211,238,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "2px" }}>{item.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: item.highlight ? "#22d3ee" : "#d4d4d8", textShadow: item.highlight ? "0 0 20px rgba(34,211,238,0.5)" : "none" }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisitenkartenPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ["#22d3ee", "#06b6d4", "#67e8f9", "#a5f3fc", "#ffffff"];
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.6 + 0.1, color: colors[Math.floor(Math.random() * colors.length)] });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      });
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 30% 20%, #020b18 0%, #05050a 40%, #000000 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "48px", padding: "40px 20px", position: "relative", overflow: "hidden" }}>

      {/* Particles - screen only */}
      <canvas ref={canvasRef} className="screen-only" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <div className="screen-only" style={{ position: "fixed", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div className="screen-only" style={{ position: "fixed", bottom: "-200px", right: "-200px", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Header - screen only */}
      <div className="screen-only" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "11px", color: "#22d3ee", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px", opacity: 0.8 }}>Visitenkarte</p>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1 }}>Kevin Goetz</h1>
        <p style={{ fontSize: "13px", color: "#22d3ee", marginTop: "6px", letterSpacing: "0.15em" }}>Context Engineer · Contexflow AI</p>
      </div>

      {/* Cards - both visible in browser AND print */}
      <div className="cards-row" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "row", gap: "32px", alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
        <div>
          <p className="screen-only" style={{ fontSize: "10px", color: "rgba(34,211,238,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", marginBottom: "10px" }}>Vorderseite</p>
          <CardFront />
        </div>
        <div>
          <p className="screen-only" style={{ fontSize: "10px", color: "rgba(34,211,238,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", marginBottom: "10px" }}>Rückseite</p>
          <CardBack />
        </div>
      </div>

      {/* Print button - screen only */}
      <button
        className="screen-only"
        onClick={() => window.print()}
        style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "10px", padding: "14px 32px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.06) 100%)", border: "1px solid rgba(34,211,238,0.4)", color: "#22d3ee", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 30px rgba(34,211,238,0.1), inset 0 1px 0 rgba(255,255,255,0.05)", transition: "all 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.12) 100%)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(34,211,238,0.25), inset 0 1px 0 rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.06) 100%)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(34,211,238,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Als PDF speichern
      </button>

      <style>{`
        @page { size: A4 landscape; margin: 0; }

        @media print {
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .screen-only { display: none !important; }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            background: #05050a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Hide the outer page wrapper entirely */
          body > div {
            all: unset !important;
            display: block !important;
            width: 297mm !important;
            height: 210mm !important;
            background: #05050a !important;
            position: relative !important;
          }

          /* Pin the cards row to center of A4 landscape */
          .cards-row {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            display: flex !important;
            flex-direction: row !important;
            gap: 20mm !important;
            align-items: center !important;
          }

          .card {
            width: 85mm !important;
            height: 55mm !important;
            border-radius: 4mm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}

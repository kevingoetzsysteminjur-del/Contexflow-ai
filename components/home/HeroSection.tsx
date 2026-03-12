"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  op: number;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId: number;
    const mouse = { x: -1000, y: -1000 };

    function init() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Max 50 particles – atmospheric, not overwhelming
      const count = window.innerWidth < 768 ? 22 : 50;
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.15,  // very slow
          vy: (Math.random() - 0.5) * 0.15,
          op: 0.06 + Math.random() * 0.14,    // very subtle
        };
      });
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 180 && d > 0) {
          const f = (180 - d) / 180;
          p.vx += (dx / d) * f * 0.025;  // gentle pull
          p.vy += (dy / d) * f * 0.025;
        }
        p.vx += (p.ox - p.x) * 0.002;
        p.vy += (p.oy - p.y) * 0.002;
        p.vx *= 0.96;  // more damping = slower
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        const boost = d < 180 ? (180 - d) / 180 * 0.2 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${Math.min(p.op + boost, 0.4)})`;
        ctx.fill();
      }
      // Connections – sparse and subtle
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 140) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    init();
    tick();
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => init();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        marginTop: "-64px",
        background: "#050508",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "64px 24px 0",
        }}
      >
        <div style={{ animation: "hero-fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
          <p
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: 200,
              color: "white",
              letterSpacing: "0.3em",
              lineHeight: 1,
              textShadow: "0 0 60px rgba(99,102,241,0.18)",
              margin: 0,
            }}
          >
            CONTEXFLOW
          </p>
          <p
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: 200,
              color: "#6366F1",
              letterSpacing: "0.3em",
              lineHeight: 1.1,
              textShadow: "0 0 60px rgba(99,102,241,0.4)",
              margin: 0,
              animation: "hero-fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.3s both",
            }}
          >
            .AI
          </p>
        </div>

        <p
          style={{
            marginTop: "3rem",
            color: "#374151",
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            animation: "hero-fade-in 1s ease 2.2s both",
          }}
        >
          Context Engineering · Mosbach · 2026
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          animation: "hero-fade-in 1s ease 2.8s both",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, #6366F160)",
            animation: "scroll-pulse 3s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

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
      const count = window.innerWidth < 768 ? 55 : 130;
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return { x, y, ox: x, oy: y, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, op: 0.08 + Math.random() * 0.22 };
      });
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 160 && d > 0) {
          const f = (160 - d) / 160;
          p.vx += (dx / d) * f * 0.07;
          p.vy += (dy / d) * f * 0.07;
        }
        p.vx += (p.ox - p.x) * 0.003;
        p.vy += (p.oy - p.y) * 0.003;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.x += p.vx;
        p.y += p.vy;
        const boost = d < 160 ? (160 - d) / 160 * 0.38 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${Math.min(p.op + boost, 0.65)})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 115) * 0.13})`;
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

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "64px",
          textAlign: "center",
          padding: "64px 24px 0",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: 200,
              color: "white",
              letterSpacing: "0.3em",
              lineHeight: 1,
              textShadow: "0 0 80px rgba(99,102,241,0.25), 0 0 40px rgba(99,102,241,0.15)",
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
              textShadow: "0 0 80px rgba(99,102,241,0.55), 0 0 40px rgba(99,102,241,0.35)",
              margin: 0,
            }}
          >
            .AI
          </p>
        </div>

        <p
          style={{
            marginTop: "3rem",
            color: "#4B5563",
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
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
        }}
      >
        <span style={{ color: "#374151", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background: "linear-gradient(to bottom, transparent, #6366F1)",
            animation: "scroll-pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

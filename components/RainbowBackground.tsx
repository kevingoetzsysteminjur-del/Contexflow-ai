"use client";

import { useEffect, useRef } from "react";

export default function RainbowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Static twinkling stars
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.0 + 0.2,
      alpha: Math.random() * 0.35 + 0.05,
      twinkleSpeed: 0.003 + Math.random() * 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Slow drifting colored nebula particles
    const particles = Array.from({ length: 35 }, (_, i) => ({
      ox: Math.random(),
      oy: Math.random(),
      r: Math.random() * 2.0 + 0.8,
      hue: (i / 35) * 360,
      t: Math.random() * Math.PI * 2,
      speed: 0.00006 + Math.random() * 0.00008,
      floatR: 0.025 + Math.random() * 0.035,
      alpha: 0.25 + Math.random() * 0.2,
    }));

    // Large slow nebula clouds
    const nebulae = [
      { ox: 0.15, oy: 0.25, hue: 200, r: 220, t: 0,            speed: 0.00004 },
      { ox: 0.78, oy: 0.18, hue: 280, r: 180, t: Math.PI,      speed: 0.00005 },
      { ox: 0.5,  oy: 0.6,  hue: 160, r: 200, t: Math.PI/2,    speed: 0.000035 },
      { ox: 0.85, oy: 0.75, hue: 30,  r: 160, t: Math.PI*1.5,  speed: 0.00006 },
      { ox: 0.2,  oy: 0.8,  hue: 320, r: 150, t: 1,            speed: 0.000045 },
    ];

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() / 1000;

      // 1. Nebula clouds
      nebulae.forEach((n) => {
        n.t += n.speed * 60;
        n.hue = (n.hue + 0.02) % 360;
        const x = (n.ox + Math.sin(n.t) * 0.05) * canvas.width;
        const y = (n.oy + Math.cos(n.t * 0.6) * 0.04) * canvas.height;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, n.r);
        grad.addColorStop(0,   `hsla(${n.hue}, 70%, 45%, 0.04)`);
        grad.addColorStop(0.5, `hsla(${n.hue}, 70%, 35%, 0.02)`);
        grad.addColorStop(1,   `hsla(${n.hue}, 70%, 30%, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 2. Twinkling stars
      stars.forEach((s) => {
        const twinkle = Math.sin(t * s.twinkleSpeed * 10 + s.twinkleOffset);
        const a = s.alpha * (0.6 + 0.4 * twinkle);
        const x = s.x * canvas.width;
        const y = s.y * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      // 3. Rainbow drifting particles with glow
      particles.forEach((p) => {
        p.t += p.speed * 60;
        p.hue = (p.hue + 0.03) % 360;
        const x = (p.ox + Math.sin(p.t) * p.floatR) * canvas.width;
        const y = (p.oy + Math.cos(p.t * 0.75) * p.floatR) * canvas.height;

        // Glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.r * 6);
        grad.addColorStop(0,   `hsla(${p.hue}, 80%, 55%, ${p.alpha * 0.4})`);
        grad.addColorStop(0.3, `hsla(${p.hue}, 80%, 45%, ${p.alpha * 0.12})`);
        grad.addColorStop(1,   `hsla(${p.hue}, 80%, 40%, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Soft core
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.alpha * 0.7})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const BLOBS = [
  { x: 0.25, y: 0.4, sx: 0.4, sy: 0.3, ox: 0, oy: 1, r: 0.55, c: "rgba(99,102,241," },
  { x: 0.75, y: 0.6, sx: 0.3, sy: 0.5, ox: 2, oy: 0, r: 0.45, c: "rgba(139,92,246," },
  { x: 0.5, y: 0.2, sx: 0.25, sy: 0.4, ox: 4, oy: 2, r: 0.65, c: "rgba(67,56,202," },
  { x: 0.1, y: 0.8, sx: 0.5, sy: 0.2, ox: 1, oy: 3, r: 0.4, c: "rgba(147,51,234," },
  { x: 0.85, y: 0.35, sx: 0.35, sy: 0.45, ox: 3, oy: 1, r: 0.5, c: "rgba(79,70,229," },
];

export default function HeroSection() {
  const { t } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let rafId: number;
    let running = false;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw(time: number) {
      if (!running) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const t = time * 0.00012;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const isMobile = W < 768;
      const blobs = isMobile ? BLOBS.slice(0, 3) : BLOBS;

      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.sx + b.ox) * 0.18 + (mx - 0.5) * 0.04) * W;
        const by = (b.y + Math.cos(t * b.sy + b.oy) * 0.14 + (my - 0.5) * 0.04) * H;
        const r = b.r * Math.min(W, H) * 0.55;
        const grd = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grd.addColorStop(0, b.c + (isMobile ? "0.10)" : "0.14)"));
        grd.addColorStop(0.5, b.c + "0.05)");
        grd.addColorStop(1, b.c + "0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }
      rafId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; rafId = requestAnimationFrame(draw); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(rafId); }
    });
    observer.observe(canvas);
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
      const cx = (e.clientX / window.innerWidth - 0.5) * -3;
      const cy = (e.clientY / window.innerHeight - 0.5) * -3;
      setContentOffset({ x: cx, y: cy });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", marginTop: "-64px", background: "var(--bg-primary)", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "64px 1.5rem 0",
          transform: `translate(${contentOffset.x}px, ${contentOffset.y}px)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "1.5rem", animation: "hero-fade 0.8s ease 0.5s both" }}>
          {t.hero.we_build}
        </p>

        <div>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(4rem, 10vw, 9rem)",
            fontWeight: 200,
            color: "var(--text-primary)",
            letterSpacing: "0.12em",
            lineHeight: 1,
            margin: 0,
            animation: "hero-fade 0.9s ease 0.8s both",
          }}>{t.hero.digital}</p>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(4rem, 10vw, 9rem)",
            fontWeight: 200,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.12em",
            lineHeight: 1,
            margin: 0,
            animation: "hero-fade 0.9s ease 1.1s both",
          }}>{t.hero.experiences}</p>
        </div>

        <p style={{
          marginTop: "2rem",
          fontSize: 14,
          color: "var(--text-tertiary)",
          letterSpacing: "0.08em",
          animation: "hero-fade 0.8s ease 1.5s both",
        }}>
          {t.hero.hero_subtext}
        </p>
      </div>

      {/* SCROLL indicator bottom left */}
      <div style={{ position: "absolute", bottom: "2rem", left: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <p style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{t.hero.scroll}</p>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #6366F1, transparent)", animation: "scroll-line 2.5s ease-in-out infinite" }} />
      </div>

      {/* Year bottom right */}
      <p style={{ position: "absolute", bottom: "2rem", right: "clamp(1.5rem, 3vw, 2.5rem)", fontSize: 10, letterSpacing: "0.2em", color: "var(--text-tertiary)" }}>© 2026</p>

      <style>{`
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

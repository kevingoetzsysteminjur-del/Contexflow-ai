"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

type SliderItem = {
  title: string;
  result: string;
  before: { label: string; gradient: string; font?: string };
  after: { label: string; gradient: string };
};

const SLIDERS: SliderItem[] = [
  {
    title: "Klangtherapie Plattform",
    result: "3x schnellere Ladezeit · Modernes Design · SEO-optimiert",
    before: {
      label: "Alte Wix-Website",
      gradient: "linear-gradient(135deg, #1a1412 0%, #2d1f1a 50%, #3a2510 100%)",
      font: "serif",
    },
    after: {
      label: "Neue Contexflow Website",
      gradient: "linear-gradient(135deg, #030305 0%, #0d0d20 50%, #0a0518 100%)",
    },
  },
  {
    title: "Barbershop Website",
    result: "Conversion-Rate +180% · Professionelle Außenwirkung · Google Top 3",
    before: {
      label: "Veraltete WordPress-Seite",
      gradient: "linear-gradient(135deg, #111 0%, #1e1a10 50%, #261e08 100%)",
      font: "serif",
    },
    after: {
      label: "Neue Contexflow Website",
      gradient: "linear-gradient(135deg, #030305 0%, #0a0d20 50%, #050a18 100%)",
    },
  },
  {
    title: "Immobilienmakler Website",
    result: "Professionelle Positionierung · 100% Eigenständigkeit · Premium-Auftritt",
    before: {
      label: "Kein Web-Auftritt",
      gradient: "linear-gradient(135deg, #12100e 0%, #1e1810 50%, #2a1e0c 100%)",
      font: "serif",
    },
    after: {
      label: "Neue Contexflow Website",
      gradient: "linear-gradient(135deg, #030305 0%, #0d0a20 50%, #080518 100%)",
    },
  },
];

function BeforeAfterSlider({ item, index }: { item: SliderItem; index: number }) {
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateValue = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setValue(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updateValue(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    updateValue(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      updateValue(e.clientX);
    };
    const onMouseUp = () => { dragging.current = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      updateValue(e.touches[0].clientX);
    };
    const onTouchEnd = () => { dragging.current = false; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [updateValue]);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Slider container */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: "relative",
          width: "100%",
          height: 260,
          borderRadius: 4,
          overflow: "hidden",
          cursor: "ew-resize",
          border: "1px solid #111",
          userSelect: "none",
        }}
      >
        {/* BEFORE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: item.before.gradient,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: 40,
              height: 3,
              background: "#6B380040",
              borderRadius: 2,
              marginBottom: "0.5rem",
            }}
          />
          {[1, 2, 3].map((l) => (
            <div
              key={l}
              style={{
                width: `${80 - l * 10}%`,
                height: 8,
                background: "#ffffff08",
                borderRadius: 1,
                fontFamily: item.before.font,
              }}
            />
          ))}
          <div
            style={{
              marginTop: "1rem",
              padding: "0.4rem 1rem",
              border: "1px solid #6B380060",
              borderRadius: 2,
              fontSize: 12,
              color: "#9C7A3A",
              fontFamily: item.before.font,
            }}
          >
            {item.before.label}
          </div>
        </div>

        {/* AFTER — clipped from left */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: item.after.gradient,
            clipPath: `inset(0 ${100 - value}% 0 0)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: 40,
              height: 3,
              background: "#6366F160",
              borderRadius: 2,
              marginBottom: "0.5rem",
            }}
          />
          {[1, 2, 3].map((l) => (
            <div
              key={l}
              style={{
                width: `${80 - l * 10}%`,
                height: 8,
                background: "linear-gradient(90deg, #6366F120, #8B5CF220)",
                borderRadius: 1,
              }}
            />
          ))}
          <div
            style={{
              marginTop: "1rem",
              padding: "0.4rem 1rem",
              border: "1px solid #6366F140",
              borderRadius: 2,
              fontSize: 12,
              color: "#8B9CF6",
            }}
          >
            {item.after.label}
          </div>
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${value}%`,
            width: 1,
            background: "rgba(255,255,255,0.3)",
            pointerEvents: "none",
          }}
        />

        {/* Handle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${value}%`,
            transform: "translate(-50%, -50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--bg-primary)",
            border: "1px solid #6366F180",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            boxShadow: "0 0 0 4px #6366F115",
          }}
        >
          <div style={{ display: "flex", gap: 3 }}>
            <span style={{ fontSize: 10, color: "#6366F1" }}>◀</span>
            <span style={{ fontSize: 10, color: "#6366F1" }}>▶</span>
          </div>
        </div>

        {/* Labels */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9C7A3A",
            opacity: value > 20 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          VORHER
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6366F1",
            opacity: value < 80 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          NACHHER
        </div>
      </div>

      {/* Caption */}
      <div style={{ marginTop: "1rem" }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: "#F5F5F7",
            margin: "0 0 0.3rem 0",
            letterSpacing: "0.03em",
          }}
        >
          {item.title}
        </p>
        <p style={{ fontSize: 12, color: "#4B5563", margin: 0, letterSpacing: "0.04em" }}>
          Ergebnis: {item.result}
        </p>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.4 });

  return (
    <section
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-light)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#6366F1",
              marginBottom: "0.75rem",
              margin: "0 0 0.75rem 0",
            }}
          >
            VORHER / NACHHER
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 200,
              color: "#F5F5F7",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            So verwandeln wir Websites
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#6B7280",
              marginTop: "0.75rem",
              margin: "0.75rem 0 0 0",
            }}
          >
            Zieh den Regler um Vorher und Nachher zu vergleichen.
          </p>
        </motion.div>

        {/* Sliders grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <style>{`
            @media (max-width: 767px) { .ba-grid { grid-template-columns: 1fr !important; } }
            @media (min-width: 768px) and (max-width: 1023px) { .ba-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
          <div
            className="ba-grid"
            style={{ display: "contents" }}
          >
            {SLIDERS.map((item, i) => (
              <BeforeAfterSlider key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

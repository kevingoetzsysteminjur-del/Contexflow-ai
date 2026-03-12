"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "Ich baue keine Websites.",
  "Ich baue Maschinen die verkaufen.",
  "Jede Zeile Code hat einen Zweck.",
  "Jedes Pixel hat eine Funktion.",
  "Kein Agentur-Bullshit. Keine Templates.",
  "Nur Ergebnisse.",
];

function Line({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: "var(--font-heading), sans-serif",
        fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
        fontWeight: 200,
        color: "white",
        letterSpacing: "0.02em",
        lineHeight: 1.2,
        margin: 0,
      }}
    >
      {text}
    </motion.p>
  );
}

export default function ManifestoSection() {
  const signRef = useRef(null);
  const signInView = useInView(signRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      style={{
        background: "#0A0A0F",
        padding: "clamp(5rem, 12vw, 10rem) 1.5rem",
      }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vw, 1.75rem)" }}>
          {lines.map((line, i) => (
            <Line key={i} text={line} index={i} />
          ))}
        </div>

        <motion.p
          ref={signRef}
          initial={{ opacity: 0 }}
          animate={signInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginTop: "clamp(2rem, 4vw, 3.5rem)",
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6366F1",
          }}
        >
          — Kevin Götz, Context Engineer
        </motion.p>
      </div>
    </section>
  );
}

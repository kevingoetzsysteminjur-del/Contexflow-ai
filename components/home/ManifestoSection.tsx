"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Word({ word, index, total, progress }: WordProps) {
  const start = Math.max(0, (index - 0.5) / total);
  const end = Math.min(1, (index + 0.5) / total);
  const opacity = useTransform(progress, [start, end], [0.08, 1]);

  return (
    <motion.span style={{ opacity, display: "inline" }}>
      {word}{" "}
    </motion.span>
  );
}

export default function ManifestoSection() {
  const { t } = useLang();
  const words = t.manifesto.text.split(" ");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        padding: "clamp(6rem, 12vw, 10rem) 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </p>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: "block",
            fontSize: 14,
            color: "#6366F1",
            marginTop: "3rem",
            fontStyle: "italic",
          }}
        >
          {t.manifesto.author}
        </motion.span>
      </div>
    </section>
  );
}

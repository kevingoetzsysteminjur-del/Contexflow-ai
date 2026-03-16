"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type CellValue = {
  text: string;
  good?: boolean;
  bad?: boolean;
};

type Row = {
  feature: string;
  baukasten: CellValue;
  agentur: CellValue;
  contexflow: CellValue;
};

const ROWS: Row[] = [
  {
    feature: "Preis",
    baukasten: { text: "Ab 10 € / Monat", bad: true },
    agentur: { text: "5.000–20.000 €", bad: true },
    contexflow: { text: "500–2.000 € (Festpreis)", good: true },
  },
  {
    feature: "Lieferzeit",
    baukasten: { text: "Sofort (DIY)" },
    agentur: { text: "6–12 Wochen", bad: true },
    contexflow: { text: "Unter 7 Tage", good: true },
  },
  {
    feature: "Design",
    baukasten: { text: "Template", bad: true },
    agentur: { text: "Individuell" },
    contexflow: { text: "Individuell", good: true },
  },
  {
    feature: "Performance",
    baukasten: { text: "Langsam", bad: true },
    agentur: { text: "Mittel" },
    contexflow: { text: "Blitzschnell (Next.js)", good: true },
  },
  {
    feature: "SEO",
    baukasten: { text: "Basics" },
    agentur: { text: "Gut" },
    contexflow: { text: "Inkl. lokalem SEO", good: true },
  },
  {
    feature: "KI-Features",
    baukasten: { text: "Nein", bad: true },
    agentur: { text: "Aufpreis", bad: true },
    contexflow: { text: "Inklusive", good: true },
  },
  {
    feature: "Support",
    baukasten: { text: "Chatbot", bad: true },
    agentur: { text: "Teuer", bad: true },
    contexflow: { text: "Persönlich (Kevin direkt)", good: true },
  },
  {
    feature: "Code-Eigentum",
    baukasten: { text: "Nein", bad: true },
    agentur: { text: "Meistens" },
    contexflow: { text: "Ja, gehört dir", good: true },
  },
];

function CellContent({ cell }: { cell: CellValue }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      }}
    >
      {cell.good && (
        <span style={{ color: "#6366F1", fontSize: 14, flexShrink: 0 }}>✓</span>
      )}
      {cell.bad && (
        <span style={{ color: "#374151", fontSize: 12, flexShrink: 0 }}>✗</span>
      )}
      <span
        style={{
          fontSize: "clamp(11px, 1.5vw, 13px)",
          color: cell.good ? "#F5F5F7" : cell.bad ? "#4B5563" : "#9CA3AF",
          lineHeight: 1.4,
          textAlign: "center",
        }}
      >
        {cell.text}
      </span>
    </div>
  );
}

export default function VergleichsTabelle() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.4 });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, amount: 0.15 });

  return (
    <section
      style={{
        background: "#030305",
        borderTop: "1px solid #111",
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
              margin: "0 0 0.75rem 0",
            }}
          >
            VERGLEICH
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
            Warum Contexflow?
          </h2>
        </motion.div>

        {/* Table wrapper — scrollable on mobile */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 30 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <div style={{ minWidth: 620 }}>
            {/* Column headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                gap: 0,
                borderBottom: "1px solid #111",
                paddingBottom: "1.25rem",
                marginBottom: 0,
              }}
            >
              <div />

              {/* Baukasten */}
              <div style={{ textAlign: "center", padding: "0 0.5rem" }}>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  Baukasten
                </p>
                <p style={{ fontSize: 10, color: "#2a2a3a", margin: "0.25rem 0 0 0" }}>
                  Wix, Jimdo
                </p>
              </div>

              {/* Agentur */}
              <div style={{ textAlign: "center", padding: "0 0.5rem" }}>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  Klassische Agentur
                </p>
                <p style={{ fontSize: 10, color: "#2a2a3a", margin: "0.25rem 0 0 0" }}>
                  Teuer & langsam
                </p>
              </div>

              {/* Contexflow */}
              <div
                style={{
                  textAlign: "center",
                  padding: "0.75rem 0.75rem",
                  border: "1px solid #6366F140",
                  borderBottom: "none",
                  borderRadius: "4px 4px 0 0",
                  background: "#0a0a18",
                  position: "relative",
                }}
              >
                {/* Empfohlen badge */}
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#6366F1",
                    color: "#fff",
                    fontSize: 9,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 2,
                    whiteSpace: "nowrap",
                  }}
                >
                  Empfohlen
                </div>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#6366F1",
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  Contexflow
                </p>
                <p style={{ fontSize: 10, color: "#4B5563", margin: "0.25rem 0 0 0" }}>
                  Kevin Götz
                </p>
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => {
              const isLast = i === ROWS.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                    gap: 0,
                    borderBottom: isLast ? "none" : "1px solid #0d0d14",
                  }}
                >
                  {/* Feature label */}
                  <div
                    style={{
                      padding: "1rem 0",
                      paddingRight: "1rem",
                      fontSize: 13,
                      color: "#6B7280",
                      letterSpacing: "0.04em",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {row.feature}
                  </div>

                  {/* Baukasten */}
                  <div
                    style={{
                      padding: "1rem 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CellContent cell={row.baukasten} />
                  </div>

                  {/* Agentur */}
                  <div
                    style={{
                      padding: "1rem 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CellContent cell={row.agentur} />
                  </div>

                  {/* Contexflow — highlighted */}
                  <div
                    style={{
                      padding: "1rem 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#0a0a18",
                      borderLeft: "1px solid #6366F140",
                      borderRight: "1px solid #6366F140",
                      borderBottom: isLast ? "1px solid #6366F140" : "none",
                    }}
                  >
                    <CellContent cell={row.contexflow} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { GripVertical } from "lucide-react";

type Lang = "de" | "en";

const TX = {
  de: {
    before: "Vorher", after: "Nachher",
    drag: "Ziehen zum Vergleichen",
    oldTag: "Letzte Aktualisierung: 15. März 2016",
    oldTitle: "Herzlich Willkommen auf unserer Internetseite!",
    oldSub: "Hier finden Sie alle Informationen über unsere Produkte und Dienstleistungen.",
    oldLink: "» Mehr erfahren (Link defekt)",
    oldCopy: "© 2008 Musterfirma GmbH | Impressum | Datenschutz | Sitemap",
    newTitle: "Ihr Unternehmen. Digital. Erfolgreich.",
    newSub: "Modernes Design · Blitzschnell · KI-gestützt",
    newCta: "Jetzt starten",
    newChat: "Hallo! Wie kann ich helfen? 👋",
  },
  en: {
    before: "Before", after: "After",
    drag: "Drag to compare",
    oldTag: "Last updated: March 15, 2016",
    oldTitle: "Welcome to Our Website!",
    oldSub: "Here you will find all information about our products and services.",
    oldLink: "» Learn more (link broken)",
    oldCopy: "© 2008 Sample Company Ltd | Imprint | Privacy | Sitemap",
    newTitle: "Your Business. Digital. Successful.",
    newSub: "Modern Design · Lightning Fast · AI-Powered",
    newCta: "Get started",
    newChat: "Hello! How can I help? 👋",
  },
};

export default function BeforeAfterSlider({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const mm = (e: MouseEvent) => move(e.clientX);
    const tm = (e: TouchEvent) => move(e.touches[0].clientX);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tm, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", up);
    };
  }, [move]);

  return (
    <div className="space-y-3">
      <p className="text-zinc-500 text-sm text-center">{tx.drag}</p>
      <div
        ref={containerRef}
        className="relative h-[380px] rounded-2xl overflow-hidden border border-white/10 select-none cursor-col-resize"
      >
        {/* OLD SITE */}
        <div className="absolute inset-0 bg-[#d4d0c8]">
          <div className="bg-[#003399] px-4 py-2 flex gap-4 items-center">
            <span style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", fontSize: 14, fontWeight: "bold" }}>
              🏠 MUSTERFIRMA.DE
            </span>
            {["Start", "Über uns", "Produkte", "Kontakt"].map(l => (
              <span key={l} style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffffff", fontSize: 11, textDecoration: "underline", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
          <div className="px-5 py-4">
            <div className="bg-[#c0c0c0] border-2 border-[#808080] p-4 mb-3">
              <div style={{ fontFamily: "Comic Sans MS, cursive", color: "#cc0000", fontSize: 20, fontWeight: "bold" }}>
                {tx.oldTitle}
              </div>
              <div style={{ fontFamily: "Times New Roman, serif", color: "#333333", fontSize: 13, marginTop: 8 }}>
                {tx.oldSub}
              </div>
              <div style={{ fontFamily: "Comic Sans MS, cursive", color: "#0000cc", fontSize: 12, marginTop: 12 }}>
                {tx.oldLink}
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "Arial, sans-serif" }}>
              <tbody>
                {[["Produkt A","19,99 €","✓"], ["Produkt B","29,99 €","✗"], ["Produkt C","9,99 €","✓"]].map(([n,p,a], i) => (
                  <tr key={i} style={{ background: i % 2 ? "#c8c8c8" : "#e0e0e0" }}>
                    <td style={{ padding: "3px 6px", border: "1px solid #999" }}>{n}</td>
                    <td style={{ padding: "3px 6px", border: "1px solid #999" }}>{p}</td>
                    <td style={{ padding: "3px 6px", border: "1px solid #999", color: a === "✓" ? "green" : "red" }}>{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 12 }}>
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style={{ border: "2px solid #666", width: 180, height: 60, background: "#999", display: "block" }} />
              <span style={{ fontFamily: "Comic Sans MS", fontSize: 9, color: "#666" }}>Bild lädt... (IE6 empfohlen)</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-[#003399] px-4 py-1.5">
            <span style={{ fontFamily: "Arial, sans-serif", color: "#ffffff", fontSize: 9 }}>{tx.oldCopy}</span>
          </div>
          <div className="absolute top-8 right-2 bg-yellow-200 border-2 border-yellow-500 px-2 py-1 rounded text-xs" style={{ fontFamily: "Comic Sans MS", color: "#cc0000" }}>
            ⚠️ {tx.oldTag}
          </div>
        </div>

        {/* NEW SITE – clipped */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div className="h-full bg-gradient-to-br from-[#0a0a1a] via-[#0d0d20] to-[#12082a]">
            {/* Nav */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <span className="text-white text-xs font-black">CF</span>
                </div>
                <span className="text-white font-bold text-sm">Ihr Unternehmen</span>
              </div>
              <div className="flex gap-4">
                {["Leistungen","Projekte","Kontakt"].map(l => (
                  <span key={l} className="text-zinc-400 text-xs hover:text-white transition-colors">{l}</span>
                ))}
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">{tx.newCta}</div>
            </div>
            {/* Hero */}
            <div className="px-6 pt-8 pb-4">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs mb-4">✦ KI-gestützte Lösung</div>
              <h2 className="text-white text-2xl font-black leading-tight mb-2">
                {tx.newTitle}
              </h2>
              <p className="text-indigo-300 text-sm mb-4">{tx.newSub}</p>
              <div className="flex gap-2">
                <div className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">{tx.newCta} →</div>
                <div className="px-4 py-2 rounded-xl border border-white/10 text-zinc-300 text-xs">Demo buchen</div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 px-6 mt-2">
              {[["98%","Zufriedenheit"],["24/7","Erreichbar"],["5 Tage","Lieferzeit"]].map(([v,l]) => (
                <div key={l} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-indigo-300 font-black text-lg">{v}</div>
                  <div className="text-zinc-500 text-xs">{l}</div>
                </div>
              ))}
            </div>
            {/* Chat widget */}
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <div className="bg-[#1a1a2e] border border-indigo-500/40 rounded-2xl rounded-br-sm px-3 py-2 text-xs text-zinc-200 max-w-[140px]">
                {tx.newChat}
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <span className="text-white text-sm">💬</span>
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-semibold border border-white/20 backdrop-blur">
          ← {tx.before}
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-600/80 text-white text-xs font-semibold border border-indigo-400/40 backdrop-blur">
          {tx.after} →
        </div>

        {/* Divider + Handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/60 pointer-events-none"
          style={{ left: `${pos}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-col-resize z-10"
          style={{ left: `${pos}%` }}
          onMouseDown={() => { dragging.current = true; }}
          onTouchStart={() => { dragging.current = true; }}
        >
          <GripVertical size={16} className="text-zinc-700" />
        </div>
      </div>
    </div>
  );
}

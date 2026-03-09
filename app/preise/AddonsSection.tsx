"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const addons = [
  { key: "chat", icon: "🤖", name: "KI-Chatbot", desc: "24/7 automatische Kundenanfragen beantworten", price: 500 },
  { key: "booking", icon: "📅", name: "Terminbuchung", desc: "Online-Kalender mit automatischer Bestätigung", price: 300 },
  { key: "seo", icon: "🔍", name: "SEO-Paket", desc: "Erweiterte Suchmaschinenoptimierung & Monitoring", price: 400 },
  { key: "lead", icon: "🎯", name: "Lead-Qualifizierung", desc: "Automatischer Fragebogen mit Bewertungssystem", price: 350 },
  { key: "analytics", icon: "📊", name: "Analytics-Dashboard", desc: "Echtzeit-Besucherstatistiken & Conversion-Tracking", price: 250 },
  { key: "care", icon: "🛡️", name: "Wartung & Support", desc: "Monatliche Updates, Backups & technischer Support", price: 99, monthly: true },
];

export default function AddonsSection() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(key: string) {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  const oneTime = addons.filter(a => selected.includes(a.key) && !a.monthly).reduce((s, a) => s + a.price, 0);
  const monthly = addons.find(a => a.key === "care" && selected.includes("care"));

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Zusatzoptionen</p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Erweitere dein Paket.</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
          Kombiniere dein Website-Paket mit KI-Features. Wähle was du brauchst – der Preis aktualisiert sich live.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {addons.map(addon => {
          const on = selected.includes(addon.key);
          return (
            <button
              key={addon.key}
              onClick={() => toggle(addon.key)}
              className={`text-left rounded-2xl border p-5 transition-all duration-200 ${
                on
                  ? "border-cyan-400/50 bg-cyan-400/5 scale-[1.01]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-2xl">{addon.icon}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                  on ? "border-cyan-400 bg-cyan-500" : "border-zinc-600"
                }`}>
                  {on && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              <h3 className={`font-bold text-sm mb-1 ${on ? "text-cyan-300" : "text-zinc-200"}`}>{addon.name}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-3">{addon.desc}</p>
              <p className={`text-sm font-semibold ${on ? "text-cyan-400" : "text-zinc-400"}`}>
                +{addon.price} €{addon.monthly ? "/Monat" : " einmalig"}
              </p>
            </button>
          );
        })}
      </div>

      {/* Live total */}
      {selected.length > 0 && (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-zinc-400 text-xs mb-1">Zusatzoptionen gesamt</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              {oneTime > 0 && (
                <span className="text-3xl font-black text-white">+{oneTime.toLocaleString("de-DE")} € <span className="text-zinc-500 text-sm font-normal">einmalig</span></span>
              )}
              {monthly && (
                <span className="text-lg font-bold text-cyan-400">+{monthly.price} €/Monat</span>
              )}
            </div>
          </div>
          <Link
            href={`/kontakt?addons=${selected.join(",")}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold text-sm transition-all hover:scale-105 whitespace-nowrap"
          >
            Angebot anfragen <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}

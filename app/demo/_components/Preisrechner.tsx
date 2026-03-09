"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap } from "lucide-react";

type Lang = "de" | "en";

const TX = {
  de: {
    packages: [
      { key: "starter", label: "Starter", base: 1500, desc: "Ideal für Einzelunternehmer & kleine Betriebe", features: ["Bis zu 5 Unterseiten", "Kontaktformular", "Mobil-optimiert", "Basis-SEO", "2 Wochen Lieferzeit"] },
      { key: "pro", label: "Professional", base: 3000, desc: "Für wachsende Unternehmen mit mehr Bedarf", features: ["Bis zu 12 Unterseiten", "Blog / News", "Google Analytics", "Erweitertes SEO", "CMS Integration"], popular: true },
      { key: "premium", label: "Premium", base: 5000, desc: "Komplettlösung für anspruchsvolle Projekte", features: ["Unbegrenzte Seiten", "E-Commerce", "Individuelle Funktionen", "KI-Integration inklusive", "Priority Support"] },
    ],
    addons: [
      { key: "chat", label: "KI-Chatbot", price: 500, icon: "🤖" },
      { key: "booking", label: "Terminbuchung", price: 300, icon: "📅" },
      { key: "seo", label: "SEO-Paket", price: 400, icon: "🔍" },
      { key: "care", label: "Wartung / Monat", price: 99, icon: "🛡️", monthly: true },
    ],
    totalLabel: "Gesamtpreis",
    monthlyLabel: "/ Monat Wartung",
    cta: "Angebot anfordern",
    popular: "Beliebt",
    from: "ab",
    addonsTitle: "Zusatzoptionen",
    oneTime: "einmalig",
  },
  en: {
    packages: [
      { key: "starter", label: "Starter", base: 1500, desc: "Ideal for freelancers & small businesses", features: ["Up to 5 subpages", "Contact form", "Mobile optimized", "Basic SEO", "2 weeks delivery"] },
      { key: "pro", label: "Professional", base: 3000, desc: "For growing businesses with more needs", features: ["Up to 12 subpages", "Blog / News", "Google Analytics", "Advanced SEO", "CMS Integration"], popular: true },
      { key: "premium", label: "Premium", base: 5000, desc: "Complete solution for demanding projects", features: ["Unlimited pages", "E-Commerce", "Custom features", "AI integration included", "Priority support"] },
    ],
    addons: [
      { key: "chat", label: "AI Chatbot", price: 500, icon: "🤖" },
      { key: "booking", label: "Appointment booking", price: 300, icon: "📅" },
      { key: "seo", label: "SEO package", price: 400, icon: "🔍" },
      { key: "care", label: "Maintenance / month", price: 99, icon: "🛡️", monthly: true },
    ],
    totalLabel: "Total price",
    monthlyLabel: "/ month maintenance",
    cta: "Request quote",
    popular: "Popular",
    from: "from",
    addonsTitle: "Add-ons",
    oneTime: "one-time",
  },
};

export default function Preisrechner({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const [selectedPkg, setSelectedPkg] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  function toggleAddon(key: string) {
    setSelectedAddons(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }

  const basePrice = tx.packages[selectedPkg].base;
  const addonTotal = tx.addons.filter(a => selectedAddons.includes(a.key) && !a.monthly).reduce((s, a) => s + a.price, 0);
  const monthly = tx.addons.find(a => a.key === "care" && selectedAddons.includes("care"));
  const total = basePrice + addonTotal;

  return (
    <div className="space-y-6">
      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tx.packages.map((pkg, i) => (
          <button
            key={pkg.key}
            onClick={() => setSelectedPkg(i)}
            className={`relative rounded-2xl border p-5 text-left transition-all duration-200 ${
              selectedPkg === i
                ? "border-indigo-500/60 bg-indigo-500/10 scale-[1.02]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            {(pkg as any).popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center gap-1">
                <Zap size={10} /> {tx.popular}
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-bold ${selectedPkg === i ? "text-indigo-300" : "text-zinc-300"}`}>{pkg.label}</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPkg === i ? "border-indigo-400 bg-indigo-500" : "border-zinc-600"}`}>
                {selectedPkg === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
            <div className="mb-2">
              <span className="text-zinc-500 text-xs">{tx.from} </span>
              <span className={`text-2xl font-black ${selectedPkg === i ? "text-white" : "text-zinc-300"}`}>
                {pkg.base.toLocaleString("de-DE")} €
              </span>
            </div>
            <p className="text-zinc-500 text-xs mb-4">{pkg.desc}</p>
            <ul className="space-y-1.5">
              {pkg.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                  <Check size={11} className={selectedPkg === i ? "text-indigo-400" : "text-zinc-600"} />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Addons */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">{tx.addonsTitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tx.addons.map(addon => {
            const on = selectedAddons.includes(addon.key);
            return (
              <button
                key={addon.key}
                onClick={() => toggleAddon(addon.key)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  on ? "border-indigo-500/60 bg-indigo-500/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="text-xl mb-1">{addon.icon}</div>
                <div className={`text-xs font-semibold mb-0.5 ${on ? "text-indigo-300" : "text-zinc-300"}`}>{addon.label}</div>
                <div className="text-xs text-zinc-500">
                  +{addon.price} €{(addon as any).monthly ? `/${lang === "de" ? "Mo" : "mo"}` : ""}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Total */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-zinc-400 text-xs mb-1">{tx.totalLabel}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{total.toLocaleString("de-DE")} €</span>
            <span className="text-zinc-500 text-sm">{tx.oneTime}</span>
          </div>
          {monthly && (
            <p className="text-indigo-300 text-sm mt-1">+ {monthly.price} € {tx.monthlyLabel}</p>
          )}
        </div>
        <a
          href="https://contexflow.com/kontakt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/30 whitespace-nowrap"
        >
          {tx.cta} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

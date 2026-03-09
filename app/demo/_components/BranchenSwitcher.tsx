"use client";

import { useState } from "react";
import { Building2, UtensilsCrossed, Stethoscope, Wrench, Scale } from "lucide-react";

type Lang = "de" | "en";

const BRANCHEN = {
  de: [
    {
      key: "immo",
      label: "Immobilien",
      icon: Building2,
      color: { pill: "bg-amber-500/20 text-amber-300 border-amber-500/40", active: "bg-amber-500", bg: "from-amber-950 to-zinc-950", accent: "text-amber-400", border: "border-amber-500/20", btn: "bg-amber-600 hover:bg-amber-500" },
      mock: {
        logo: "🏠 ImmoPlus", tagline: "Ihr Traumhaus. Unsere Leidenschaft.",
        hero: "Immobilien in Mosbach & Umgebung", sub: "Kostenlose Bewertung · Diskret · Erfolgreich",
        nav: ["Kaufen", "Vermieten", "Bewertung", "Kontakt"],
        stats: [["150+", "Verkäufe"], ["12 J.", "Erfahrung"], ["4.9★", "Bewertung"]],
        cta: "Jetzt Bewertung anfragen",
      },
    },
    {
      key: "restaurant",
      label: "Restaurant",
      icon: UtensilsCrossed,
      color: { pill: "bg-rose-500/20 text-rose-300 border-rose-500/40", active: "bg-rose-500", bg: "from-rose-950 to-zinc-950", accent: "text-rose-400", border: "border-rose-500/20", btn: "bg-rose-600 hover:bg-rose-500" },
      mock: {
        logo: "🍽️ Bella Vista", tagline: "Authentische italienische Küche.",
        hero: "Tisch reservieren", sub: "Mo–Fr ab 12 Uhr · Sa & So ab 11 Uhr",
        nav: ["Speisekarte", "Reservieren", "Galerie", "Über uns"],
        stats: [["4.8★", "Google"], ["1200+", "Gäste/Monat"], ["20 J.", "Tradition"]],
        cta: "Jetzt reservieren",
      },
    },
    {
      key: "arzt",
      label: "Arztpraxis",
      icon: Stethoscope,
      color: { pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40", active: "bg-cyan-500", bg: "from-cyan-950 to-zinc-950", accent: "text-cyan-400", border: "border-cyan-500/20", btn: "bg-cyan-600 hover:bg-cyan-500" },
      mock: {
        logo: "⚕️ Dr. Müller", tagline: "Hausarztpraxis · Ihre Gesundheit liegt uns am Herzen.",
        hero: "Online Termin buchen", sub: "Kassenärztlich · Mo–Fr 8–18 Uhr",
        nav: ["Leistungen", "Team", "Termin", "Kontakt"],
        stats: [["24h", "Online-Termin"], ["3500+", "Patienten"], ["KV", "Zugelassen"]],
        cta: "Termin online buchen",
      },
    },
    {
      key: "handwerk",
      label: "Handwerk",
      icon: Wrench,
      color: { pill: "bg-orange-500/20 text-orange-300 border-orange-500/40", active: "bg-orange-500", bg: "from-orange-950 to-zinc-950", accent: "text-orange-400", border: "border-orange-500/20", btn: "bg-orange-600 hover:bg-orange-500" },
      mock: {
        logo: "🔧 Wagner Elektro", tagline: "Meisterbetrieb seit 1998.",
        hero: "Ihr zuverlässiger Elektriker", sub: "Notdienst 24/7 · Sofort-Angebot",
        nav: ["Leistungen", "Referenzen", "Notdienst", "Kontakt"],
        stats: [["24/7", "Notdienst"], ["500+", "Projekte"], ["HWK", "Zertifiziert"]],
        cta: "Sofortangebot anfordern",
      },
    },
    {
      key: "kanzlei",
      label: "Kanzlei",
      icon: Scale,
      color: { pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", active: "bg-emerald-500", bg: "from-emerald-950 to-zinc-950", accent: "text-emerald-400", border: "border-emerald-500/20", btn: "bg-emerald-600 hover:bg-emerald-500" },
      mock: {
        logo: "⚖️ Kanzlei Bauer", tagline: "Ihr Recht. Unsere Stärke.",
        hero: "Rechtssicherheit für Unternehmen & Privatpersonen", sub: "Erstberatung · Diskret · Erfolgreich",
        nav: ["Rechtsgebiete", "Team", "Beratung", "Kontakt"],
        stats: [["30+", "Jahre Erfahrung"], ["98%", "Erfolgsquote"], ["DAV", "Mitglied"]],
        cta: "Kostenlose Erstberatung",
      },
    },
  ],
  en: [
    {
      key: "immo",
      label: "Real Estate",
      icon: Building2,
      color: { pill: "bg-amber-500/20 text-amber-300 border-amber-500/40", active: "bg-amber-500", bg: "from-amber-950 to-zinc-950", accent: "text-amber-400", border: "border-amber-500/20", btn: "bg-amber-600 hover:bg-amber-500" },
      mock: {
        logo: "🏠 ImmoPlus", tagline: "Your dream home. Our passion.",
        hero: "Real estate in the region", sub: "Free valuation · Discreet · Successful",
        nav: ["Buy", "Rent", "Valuation", "Contact"],
        stats: [["150+", "Sales"], ["12 Y.", "Experience"], ["4.9★", "Rating"]],
        cta: "Request free valuation",
      },
    },
    {
      key: "restaurant",
      label: "Restaurant",
      icon: UtensilsCrossed,
      color: { pill: "bg-rose-500/20 text-rose-300 border-rose-500/40", active: "bg-rose-500", bg: "from-rose-950 to-zinc-950", accent: "text-rose-400", border: "border-rose-500/20", btn: "bg-rose-600 hover:bg-rose-500" },
      mock: {
        logo: "🍽️ Bella Vista", tagline: "Authentic Italian cuisine.",
        hero: "Book a table", sub: "Mon–Fri from 12pm · Sat & Sun from 11am",
        nav: ["Menu", "Reserve", "Gallery", "About us"],
        stats: [["4.8★", "Google"], ["1200+", "Guests/mo"], ["20 Y.", "Tradition"]],
        cta: "Reserve now",
      },
    },
    {
      key: "arzt",
      label: "Medical practice",
      icon: Stethoscope,
      color: { pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40", active: "bg-cyan-500", bg: "from-cyan-950 to-zinc-950", accent: "text-cyan-400", border: "border-cyan-500/20", btn: "bg-cyan-600 hover:bg-cyan-500" },
      mock: {
        logo: "⚕️ Dr. Müller", tagline: "General practice · Your health is our concern.",
        hero: "Book online appointment", sub: "Insurance accepted · Mon–Fri 8am–6pm",
        nav: ["Services", "Team", "Appointment", "Contact"],
        stats: [["24h", "Online booking"], ["3500+", "Patients"], ["GMS", "Approved"]],
        cta: "Book appointment online",
      },
    },
    {
      key: "handwerk",
      label: "Tradespeople",
      icon: Wrench,
      color: { pill: "bg-orange-500/20 text-orange-300 border-orange-500/40", active: "bg-orange-500", bg: "from-orange-950 to-zinc-950", accent: "text-orange-400", border: "border-orange-500/20", btn: "bg-orange-600 hover:bg-orange-500" },
      mock: {
        logo: "🔧 Wagner Electric", tagline: "Master tradesman since 1998.",
        hero: "Your reliable electrician", sub: "Emergency service 24/7 · Instant quote",
        nav: ["Services", "References", "Emergency", "Contact"],
        stats: [["24/7", "Emergency"], ["500+", "Projects"], ["Cert.", "Certified"]],
        cta: "Request instant quote",
      },
    },
    {
      key: "kanzlei",
      label: "Law firm",
      icon: Scale,
      color: { pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", active: "bg-emerald-500", bg: "from-emerald-950 to-zinc-950", accent: "text-emerald-400", border: "border-emerald-500/20", btn: "bg-emerald-600 hover:bg-emerald-500" },
      mock: {
        logo: "⚖️ Bauer Law", tagline: "Your rights. Our strength.",
        hero: "Legal security for businesses & individuals", sub: "Initial consultation · Discreet · Successful",
        nav: ["Practice areas", "Team", "Consultation", "Contact"],
        stats: [["30+", "Years exp."], ["98%", "Success rate"], ["BAR", "Member"]],
        cta: "Free initial consultation",
      },
    },
  ],
};

export default function BranchenSwitcher({ lang }: { lang: Lang }) {
  const list = BRANCHEN[lang];
  const [active, setActive] = useState(0);
  const branch = list[active];
  const c = branch.color;

  return (
    <div className="space-y-5">
      {/* Branch Buttons */}
      <div className="flex flex-wrap gap-2">
        {list.map((b, i) => {
          const Icon = b.icon;
          return (
            <button
              key={b.key}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                active === i
                  ? `${b.color.pill} scale-105`
                  : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon size={14} />
              {b.label}
            </button>
          );
        })}
      </div>

      {/* Mock Preview */}
      <div className={`rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} overflow-hidden transition-all duration-300`}>
        {/* Mock Nav */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className={`font-bold text-sm ${c.accent}`}>{branch.mock.logo}</span>
          <div className="hidden sm:flex gap-5">
            {branch.mock.nav.map((n) => (
              <span key={n} className="text-zinc-500 text-xs hover:text-white transition-colors cursor-pointer">{n}</span>
            ))}
          </div>
          <button className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold ${c.btn} transition-colors`}>
            {branch.mock.cta}
          </button>
        </div>

        {/* Mock Hero */}
        <div className="px-6 py-8">
          <p className="text-zinc-500 text-xs mb-2">{branch.mock.tagline}</p>
          <h3 className="text-white text-2xl md:text-3xl font-black mb-2">{branch.mock.hero}</h3>
          <p className={`text-sm mb-6 ${c.accent}`}>{branch.mock.sub}</p>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            {branch.mock.stats.map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-center">
                <div className={`font-black text-lg ${c.accent}`}>{v}</div>
                <div className="text-zinc-500 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Footer */}
        <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-zinc-700 text-xs">Powered by Contexflow AI</span>
          <span className={`text-xs ${c.accent}`}>KI-gestützt ✦</span>
        </div>
      </div>
    </div>
  );
}

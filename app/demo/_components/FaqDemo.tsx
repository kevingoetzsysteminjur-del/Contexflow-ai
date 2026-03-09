"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

type Lang = "de" | "en";

const FAQS = {
  de: [
    {
      q: "Was kostet eine professionelle Website?",
      a: "Die Kosten hängen vom Umfang ab. Eine Landingpage startet ab 500 €, eine Business-Website mit mehreren Unterseiten ab 1.000 € und Premium-Projekte mit individuellen Funktionen ab 2.000 €. Alle Preise sind einmalig – keine monatlichen Agenturgebühren.",
    },
    {
      q: "Wie lange dauert die Erstellung einer Website?",
      a: "Eine Landingpage ist oft in 5–7 Werktagen fertig. Eine komplette Business-Website dauert typischerweise 1–3 Wochen. Der genaue Zeitrahmen hängt von der Komplexität und wie schnell Inhalte und Feedback von Ihrer Seite kommen.",
    },
    {
      q: "Was ist Context Engineering und warum brauche ich das?",
      a: "Context Engineering bedeutet, KI-Systeme mit dem richtigen Wissen über Ihr Unternehmen auszustatten. So kann ein KI-Chatbot auf Ihrer Website Ihre spezifischen Produkte, Preise und Prozesse erklären – statt generischer Antworten zu geben. Das Ergebnis: bessere Kundenerfahrung, weniger Support-Aufwand.",
    },
    {
      q: "Kann KI wirklich meinem lokalen Unternehmen helfen?",
      a: "Ja! KI-Chatbots beantworten häufige Fragen rund um die Uhr, qualifizieren Leads automatisch und buchen Termine – ohne dass Sie dabei sein müssen. Lokale Unternehmen wie Arztpraxen, Handwerker oder Restaurants profitieren enorm von diesen Automatisierungen.",
    },
    {
      q: "Bleibe ich Eigentümer meiner Website?",
      a: "Selbstverständlich! Nach Projektabschluss gehört Ihnen alles: Code, Domain, Hosting-Zugang. Wir liefern keine Mietlösung, sondern Ihr eigenes digitales Eigentum. Sie können jederzeit selbst Änderungen vornehmen oder uns weiterhin beauftragen.",
    },
  ],
  en: [
    {
      q: "How much does a professional website cost?",
      a: "Costs depend on scope. A landing page starts at €500, a multi-page business website from €1,000 and premium projects with custom features from €2,000. All prices are one-time – no monthly agency fees.",
    },
    {
      q: "How long does it take to build a website?",
      a: "A landing page can often be ready in 5–7 business days. A complete business website typically takes 1–3 weeks. The exact timeline depends on complexity and how quickly you provide content and feedback.",
    },
    {
      q: "What is Context Engineering and why do I need it?",
      a: "Context Engineering means equipping AI systems with the right knowledge about your business. This allows an AI chatbot on your website to explain your specific products, prices and processes – instead of giving generic answers. The result: better customer experience, less support effort.",
    },
    {
      q: "Can AI really help my local business?",
      a: "Absolutely! AI chatbots answer common questions 24/7, automatically qualify leads and book appointments – without you having to be present. Local businesses like doctor's offices, tradespeople or restaurants benefit enormously from these automations.",
    },
    {
      q: "Do I own my website?",
      a: "Of course! After project completion, everything belongs to you: code, domain, hosting access. We don't deliver a rental solution but your own digital property. You can make changes yourself at any time or continue to work with us.",
    },
  ],
};

export default function FaqDemo({ lang }: { lang: Lang }) {
  const faqs = FAQS[lang];
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = query.trim()
    ? faqs.filter((f) =>
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase())
      )
    : faqs;

  const placeholder = lang === "de" ? "FAQ durchsuchen..." : "Search FAQ...";
  const noResult = lang === "de" ? "Keine Treffer gefunden." : "No results found.";

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-500/50 transition-colors">
        <Search size={16} className="text-zinc-500 flex-shrink-0" />
        <input
          className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-zinc-500"
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(null); }}
        />
      </div>

      {/* FAQ Items */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-zinc-500 text-sm text-center py-6">{noResult}</p>
        )}
        {filtered.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "border-indigo-500/40 bg-indigo-500/5" : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className={`text-sm font-medium ${isOpen ? "text-indigo-300" : "text-zinc-200"}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-400" : ""}`}
                />
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

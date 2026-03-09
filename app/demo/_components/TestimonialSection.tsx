"use client";

import { Star } from "lucide-react";

type Lang = "de" | "en";

const TESTIMONIALS = {
  de: [
    {
      initials: "AA",
      name: "Ali Artun",
      firma: "Plan A Immobilien und Finanzierung",
      color: "from-indigo-600 to-violet-600",
      stars: 5,
      text: "Kevin hat unsere Website in kürzester Zeit komplett neu aufgebaut. Das Ergebnis ist modern, schnell und kommt bei unseren Kunden sehr gut an. Absolut professionelle Zusammenarbeit!",
    },
    {
      initials: "MK",
      name: "Maria Kellner",
      firma: "Kellner Steuerberatung",
      color: "from-emerald-600 to-teal-600",
      stars: 5,
      text: "Endlich eine Website die unsere Kanzlei wirklich repräsentiert. Der KI-Chatbot beantwortet einfache Fragen automatisch – das spart uns täglich Zeit. Sehr zu empfehlen!",
    },
    {
      initials: "TW",
      name: "Thomas Wagner",
      firma: "Wagner Elektrotechnik GmbH",
      color: "from-orange-600 to-amber-600",
      stars: 5,
      text: "Binnen einer Woche hatten wir unsere neue Website live. Kunden finden uns jetzt über Google und die Online-Terminbuchung läuft vollautomatisch. Top Preis-Leistungs-Verhältnis!",
    },
  ],
  en: [
    {
      initials: "AA",
      name: "Ali Artun",
      firma: "Plan A Real Estate & Finance",
      color: "from-indigo-600 to-violet-600",
      stars: 5,
      text: "Kevin completely rebuilt our website in no time. The result is modern, fast and very well received by our clients. Absolutely professional collaboration!",
    },
    {
      initials: "MK",
      name: "Maria Kellner",
      firma: "Kellner Tax Consulting",
      color: "from-emerald-600 to-teal-600",
      stars: 5,
      text: "Finally a website that truly represents our firm. The AI chatbot answers simple questions automatically – saving us time every day. Highly recommended!",
    },
    {
      initials: "TW",
      name: "Thomas Wagner",
      firma: "Wagner Electrical Engineering GmbH",
      color: "from-orange-600 to-amber-600",
      stars: 5,
      text: "Within a week our new website was live. Customers now find us on Google and the online appointment booking runs fully automatically. Great value for money!",
    },
  ],
};

export default function TestimonialSection({ lang }: { lang: Lang }) {
  const list = TESTIMONIALS[lang];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.map((t, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
        >
          {/* Stars */}
          <div className="flex gap-1">
            {Array.from({ length: t.stars }).map((_, j) => (
              <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
            ))}
          </div>

          {/* Quote */}
          <p className="text-zinc-300 text-sm leading-relaxed flex-1">
            „{t.text}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/5">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white font-bold text-sm">{t.initials}</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">{t.name}</p>
              <p className="text-zinc-500 text-xs leading-tight mt-0.5">{t.firma}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

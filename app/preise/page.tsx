import Link from "next/link";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";

const pakete = [
  {
    name: "Landingpage",
    preis: "500 €",
    einheit: "einmalig",
    highlight: false,
    beschreibung: "Perfekt fur Einzelunternehmer die schnell online sein wollen.",
    features: [
      "1 Seite (Landingpage)",
      "Responsive Design",
      "Kontaktformular",
      "SEO-Grundoptimierung",
      "Impressum & Datenschutz",
      "1 Runde Korrekturen",
    ],
    cta: "Landingpage anfragen",
    color: "text-zinc-300",
    border: "border-white/10",
    bg: "bg-white/[0.03]",
    btnClass: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
  },
  {
    name: "Business Website",
    preis: "1.000 €",
    einheit: "einmalig",
    highlight: true,
    beschreibung: "Die meistgebuchte Losung fur lokale Unternehmen.",
    features: [
      "Bis zu 5 Seiten",
      "Professionelles Design",
      "Kontaktformular & Karte",
      "SEO-Optimierung",
      "Google Analytics",
      "2 Runden Korrekturen",
      "Hosting-Einrichtung",
    ],
    cta: "Business Website anfragen",
    color: "text-cyan-400",
    border: "border-cyan-400/40",
    bg: "bg-cyan-400/5",
    btnClass: "bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold shadow-lg shadow-cyan-500/20",
  },
  {
    name: "Premium Website",
    preis: "2.000 €",
    einheit: "einmalig",
    highlight: false,
    beschreibung: "Fur Unternehmen die einen starken digitalen Auftritt brauchen.",
    features: [
      "Unbegrenzte Seiten",
      "Individuelles Design",
      "Animationen & Effekte",
      "Blog / News-System",
      "Erweiterte SEO",
      "3 Runden Korrekturen",
      "Hosting & Domain",
      "1 Monat Support",
    ],
    cta: "Premium Website anfragen",
    color: "text-violet-400",
    border: "border-violet-400/20",
    bg: "bg-violet-400/5",
    btnClass: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
  },
  {
    name: "Enterprise",
    preis: "Auf Anfrage",
    einheit: "",
    highlight: false,
    beschreibung: "Komplexe Projekte, AI-Integration und massgeschneiderte Losungen.",
    features: [
      "Web-App Entwicklung",
      "Context Engineering",
      "AI-Integration & Chatbots",
      "API-Entwicklung",
      "Laufende Betreuung",
      "Individuelles Angebot",
    ],
    cta: "Angebot anfragen",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
    btnClass: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
  },
];

const faq = [
  { f: "Gibt es monatliche Kosten?", a: "Nein. Du zahlst einmalig – fertig. Lediglich Hosting & Domain (ca. 10-15 €/Monat) kommen dazu, die du selbst abschliesst." },
  { f: "Wie lange dauert ein Projekt?", a: "Eine Landingpage ist in 1-2 Wochen fertig. Business Websites dauern 2-4 Wochen, je nach Komplexitat." },
  { f: "Was wenn ich nicht zufrieden bin?", a: "Wir besprechen alles vorab genau. Du hast immer Feedback-Runden inklusive. Am Ende stehst du zu 100% dahinter." },
  { f: "Kummert ihr euch auch um Hosting?", a: "Auf Wunsch ja. Ich empfehle Vercel (fur Next.js) oder Strato – und richte alles ein wenn gewunscht." },
];

export default function PreisePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-blob absolute -top-40 right-1/3 w-96 h-96 rounded-full bg-cyan-500 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Preise</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Klare Preise. Kein Kleingedrucktes.
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Festpreise, keine Stundensatze. Du weisst vorher genau was du zahlst.
          </p>
        </div>
      </section>

      {/* Pakete */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {pakete.map(({ name, preis, einheit, highlight, beschreibung, features, cta, color, border, bg, btnClass }) => (
            <div
              key={name}
              className={`relative rounded-2xl border ${border} ${bg} p-6 flex flex-col ${highlight ? "ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-[#05050a]" : ""}`}
            >
              {highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 text-zinc-900 text-xs font-bold">
                    <Zap size={12} />
                    Beliebt
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={`font-black text-lg mb-1 ${color}`}>{name}</h3>
                <p className="text-zinc-500 text-xs mb-4">{beschreibung}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">{preis}</span>
                  {einheit && <span className="text-zinc-500 text-sm mb-1">{einheit}</span>}
                </div>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className={`${color} shrink-0 mt-0.5`} />
                    <span className="text-zinc-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt"
                className={`w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${btnClass}`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-black text-white mb-12 text-center">Haufige Fragen</h2>
          <div className="space-y-6">
            {faq.map(({ f, a }) => (
              <div key={f} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <h3 className="text-white font-bold mb-2">{f}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-black text-white mb-5">Nicht sicher welches Paket passt?</h2>
        <p className="text-zinc-400 mb-10 max-w-lg mx-auto">Schreib mir einfach. Ich helfe dir das richtige Paket fur dein Budget und deine Ziele zu finden.</p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold transition-all hover:scale-105 shadow-xl shadow-cyan-500/20"
        >
          Jetzt beraten lassen <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

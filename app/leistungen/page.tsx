import Link from "next/link";
import { Globe, Brain, Zap, CheckCircle, ArrowRight } from "lucide-react";

const leistungen = [
  {
    icon: Globe,
    title: "Website-Entwicklung",
    subtitle: "Dein digitales Aushangschild",
    desc: "Ich baue moderne, schnelle Websites die nicht nur gut aussehen, sondern auch konvertieren. Mobile-first, SEO-optimiert und auf deine Zielgruppe zugeschnitten.",
    features: [
      "Responsive Design fur alle Gerate",
      "Ladezeit unter 2 Sekunden",
      "SEO-Grundoptimierung inklusive",
      "Kontaktformular & Impressum",
      "Google Analytics Integration",
      "Hosting-Einrichtung auf Wunsch",
    ],
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    glow: "shadow-cyan-500/10",
    preis: "Ab 500 €",
  },
  {
    icon: Brain,
    title: "Context Engineering",
    subtitle: "AI die wirklich funktioniert",
    desc: "Context Engineering ist die Kunst, AI-Systemen den richtigen Kontext zu geben. Ich designe Prompts, Strukturen und Workflows die konsistent gute Ergebnisse liefern.",
    features: [
      "Prompt-Design & Optimierung",
      "System-Prompts fur Chatbots",
      "RAG-Systeme & Knowledge Bases",
      "Workflow-Automatisierung",
      "AI-Agenten-Entwicklung",
      "Claude, GPT-4, Gemini Integration",
    ],
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    glow: "shadow-violet-500/10",
    preis: "Auf Anfrage",
  },
  {
    icon: Zap,
    title: "AI-Integration",
    subtitle: "Automatisierung die spart",
    desc: "Ich integriere KI direkt in deine bestehenden Prozesse. Von einfachen Chatbots bis zu komplexen Automatisierungen – du sparst Zeit und Geld.",
    features: [
      "Chatbot fur deine Website",
      "Automatische Antworten per Email",
      "Dokument-Analyse & -Verarbeitung",
      "CRM-Integration",
      "Zapier / Make Automatisierungen",
      "Custom API-Verbindungen",
    ],
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    glow: "shadow-amber-500/10",
    preis: "Auf Anfrage",
  },
];

const prozess = [
  { nr: "01", titel: "Erstgesprach", text: "Kostenloses 30-Minuten-Call. Ich verstehe dein Business, deine Ziele und dein Budget." },
  { nr: "02", titel: "Konzept", text: "Ich erstelle ein konkretes Konzept mit Zeitplan und Festpreis. Kein Stundenhonorar." },
  { nr: "03", titel: "Entwicklung", text: "Ich baue dein Projekt. Du bekommst regelmasige Updates und kannst jederzeit Feedback geben." },
  { nr: "04", titel: "Launch", text: "Wir gehen live. Ich ubergebe alles sauber und stehe fur Fragen bereit." },
];

export default function LeistungenPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-blob absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-cyan-500 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Leistungen</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 max-w-3xl">
            Was ich fur dich tun kann
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
            Webentwicklung, Context Engineering und AI-Integration aus einer Hand. Kein Overhead, kein Bullshit – nur Ergebnisse.
          </p>
        </div>
      </section>

      {/* Leistungen */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-8">
        {leistungen.map(({ icon: Icon, title, subtitle, desc, features, color, bg, border, preis }, i) => (
          <div
            key={title}
            className={`rounded-2xl border ${border} ${bg} p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start`}
          >
            {/* Links */}
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className={`w-14 h-14 rounded-2xl ${bg} border ${border} flex items-center justify-center mb-6`}>
                <Icon size={26} className={color} />
              </div>
              <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${color}`}>{subtitle}</p>
              <h2 className="text-3xl font-black text-white mb-4">{title}</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">{desc}</p>
              <div className={`inline-block px-4 py-2 rounded-xl ${bg} border ${border} ${color} font-bold text-sm`}>
                {preis}
              </div>
            </div>
            {/* Rechts: Features */}
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <p className="text-zinc-300 font-semibold text-sm uppercase tracking-wider mb-4">Inklusive</p>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckCircle size={16} className={`${color} shrink-0`} />
                    <span className="text-zinc-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Prozess */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Ablauf</p>
            <h2 className="text-4xl font-black text-white">So arbeiten wir zusammen</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prozess.map(({ nr, titel, text }) => (
              <div key={nr} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <p className="text-5xl font-black text-cyan-400/20 mb-4">{nr}</p>
                <h3 className="text-white font-bold mb-2">{titel}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-black text-white mb-5">Klingt gut?</h2>
        <p className="text-zinc-400 mb-10 max-w-lg mx-auto">Lass uns reden. Das Erstgesprach ist kostenlos und unverbindlich.</p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold transition-all hover:scale-105 shadow-xl shadow-cyan-500/20"
        >
          Jetzt Erstgesprach buchen <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

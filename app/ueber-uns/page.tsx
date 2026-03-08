import Link from "next/link";
import { ArrowRight, Code2, Brain, Target, Heart } from "lucide-react";

const werte = [
  {
    icon: Code2,
    titel: "Qualitat uber Quantitat",
    text: "Ich nehme wenige Projekte an, um jedem die volle Aufmerksamkeit zu geben. Kein Fliessbandprinzip.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    icon: Brain,
    titel: "Context first",
    text: "Gute Ergebnisse entstehen durch den richtigen Kontext. Das gilt fur AI genauso wie fur Websites.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    icon: Target,
    titel: "Direkt und ehrlich",
    text: "Ich sage was ich denke. Wenn etwas nicht funktioniert, sage ich es – bevor du Geld ausgibst.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    icon: Heart,
    titel: "Lokal verwurzelt",
    text: "Ich bin aus Mosbach. Meine Kunden sind lokale Unternehmen. Das ist kein Zufall – das ist meine Mission.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
];

const timeline = [
  { jahr: "2024", ereignis: "Erstes AI-Projekt", detail: "Erste Experimente mit Claude und GPT. Context Engineering entdeckt." },
  { jahr: "2025", ereignis: "Contexflow AI gegründet", detail: "Kombination aus Webentwicklung und Context Engineering. Die Firma nimmt Form an." },
  { jahr: "2026", ereignis: "Erster Kunde", detail: "Plan A Immobilien – die erste Live-Website geht online. 1.500 €." },
  { jahr: "Heute", ereignis: "Wachstum", detail: "Drei Projekte, klare Vision, mehr Kunden in der Pipeline." },
];

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-blob absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-violet-500 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Uber uns</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 max-w-3xl">
            Ich bin Kevin. Das ist meine Geschichte.
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
            Context Engineer aus Mosbach. Ich baue Websites und AI-Systeme fur lokale Unternehmen – weil ich glaube, dass gute Technologie nicht nur Grosskonzernen gehort.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Avatar + Bio */}
          <div>
            {/* Avatar */}
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-900/50 to-zinc-900 border border-cyan-400/20 flex items-center justify-center mb-8">
              <span className="text-5xl font-black text-cyan-400">KG</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Kevin Goetz</h2>
            <p className="text-cyan-400 font-semibold mb-6">Context Engineer · Mosbach</p>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Ich bin kein klassischer Webentwickler. Ich bin jemand der die Schnittstelle zwischen menschlichem Denken und maschineller Intelligenz liebt – und daraus nutzbare Produkte baut.
              </p>
              <p>
                Context Engineering bedeutet fur mich: AI-Systemen den richtigen Rahmen geben, damit sie wirklich helfen. Nicht einfach prompts schreiben – sondern verstehen wie Maschinen denken, und das nutzen.
              </p>
              <p>
                Meine Kunden sind lokale Unternehmen in Mosbach und Umgebung: Immobilienmakler, Restaurants, Handwerker, Fitness-Studios. Menschen die eine gute Website brauchen – und jemanden der ihnen erklaert warum AI ihnen helfen kann.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-white font-black text-xl mb-8">Mein Weg</h3>
            <div className="space-y-0">
              {timeline.map(({ jahr, ereignis, detail }, i) => (
                <div key={jahr} className="flex gap-6">
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-zinc-800 my-1" />}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <span className="text-cyan-400/60 text-xs font-mono">{jahr}</span>
                    <h4 className="text-white font-bold mt-0.5">{ereignis}</h4>
                    <p className="text-zinc-400 text-sm mt-1">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Meine Werte</p>
            <h2 className="text-4xl font-black text-white">Wofur ich stehe</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {werte.map(({ icon: Icon, titel, text, color, bg, border }) => (
              <div key={titel} className={`rounded-2xl border ${border} ${bg} p-8`}>
                <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center mb-5`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{titel}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Vision</p>
        <h2 className="text-4xl font-black text-white mb-6">
          Lokale Unternehmen digital stark machen.
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
          Mosbach ist keine Metropole – aber gute digitale Prasenz brauchst du trotzdem. Oder gerade deshalb. Ich mochte der erste Ansprechpartner fur lokale Unternehmen sein, wenn es um Websites und AI geht.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold transition-all hover:scale-105 shadow-xl shadow-cyan-500/20"
        >
          Projekt besprechen <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

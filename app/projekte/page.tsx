import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projekte = [
  {
    kuerzel: "PA",
    name: "Plan A Immobilien und Finanzierung",
    typ: "Immobilien-Website",
    beschreibung:
      "Professionelle Website fur einen Immobilienmakler aus der Region. Klares Design, schnelle Ladezeiten, Kontaktformular und Objektuebersicht. Der erste echte Kunde von Contexflow AI.",
    tags: ["Next.js", "Tailwind CSS", "Immobilien", "Mosbach"],
    status: "Live",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    bg: "from-cyan-900/30 to-zinc-900/50",
    accent: "bg-cyan-400",
    echo: "text-cyan-400",
    border: "border-cyan-400/20",
  },
  {
    kuerzel: "BV",
    name: "Bella Vista Restaurant",
    typ: "Restaurant-Website",
    beschreibung:
      "Demo-Website fur ein italienisches Restaurant. Elegantes dunkles Design mit Speisekarte, Galerie und Reservierungsformular. Zeigt was eine moderne Gastronomie-Website leisten kann.",
    tags: ["Next.js", "Tailwind CSS", "Restaurant", "Demo"],
    budget: "Demo",
    status: "Demo",
    demoHref: "/projekte/bella-vista",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    bg: "from-amber-900/20 to-zinc-900/50",
    accent: "bg-amber-400",
    echo: "text-amber-400",
    border: "border-amber-400/20",
  },
  {
    kuerzel: "EM",
    name: "Elektro Mosbach – Meisterbetrieb",
    typ: "Handwerker-Website",
    beschreibung:
      "Demo-Website fur einen Elektriker-Meisterbetrieb. Helles, professionelles Design in Blau/Gelb mit Notdienst-Banner, Leistungsuebersicht, Team, Referenzgalerie und Kontaktformular.",
    tags: ["Next.js", "Tailwind CSS", "Handwerk", "Demo"],
    budget: "Demo",
    status: "Demo",
    demoHref: "/projekte/handwerker",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    bg: "from-blue-900/20 to-zinc-900/50",
    accent: "bg-blue-400",
    echo: "text-blue-400",
    border: "border-blue-400/20",
  },
  {
    kuerzel: "IP",
    name: "IRONPEAK Fitness Studio",
    typ: "Fitness-Website",
    beschreibung:
      "Demo-Website fur ein modernes Fitness-Studio. Kraftvolles, dunkles Design mit Kursplan, Mitgliedschaft-Paketen und Online-Anmeldung. Perfekt fur Fitness-Unternehmen die Mitglieder gewinnen wollen.",
    tags: ["Next.js", "Tailwind CSS", "Fitness", "Demo"],
    budget: "Demo",
    status: "Demo",
    demoHref: "/projekte/ironpeak",
    statusColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    bg: "from-rose-900/20 to-zinc-900/50",
    accent: "bg-rose-400",
    echo: "text-rose-400",
    border: "border-rose-400/20",
  },
];

export default function ProjektePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-blob absolute -top-40 left-1/3 w-96 h-96 rounded-full bg-violet-500 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Projekte</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 max-w-3xl">
            Meine Referenzen
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
            Ein echter Kunde. Drei Demo-Projekte die zeigen was moglich ist. Mehr kommen.
          </p>
        </div>
      </section>

      {/* Projekte */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-10">
        {projekte.map(({ kuerzel, name, typ, beschreibung, tags, budget, status, demoHref, statusColor, bg, echo, border }: { kuerzel: string; name: string; typ: string; beschreibung: string; tags: string[]; budget?: string; status: string; demoHref?: string; statusColor: string; bg: string; echo: string; border: string; accent?: string }) => (
          <div
            key={name}
            className={`rounded-3xl border ${border} bg-gradient-to-br ${bg} overflow-hidden`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Thumbnail */}
              <div className="relative min-h-64 flex items-center justify-center bg-black/20 border-b md:border-b-0 md:border-r border-white/5">
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-24 h-24 rounded-2xl bg-white/5 border ${border} flex items-center justify-center`}>
                    <span className={`${echo} font-black text-3xl`}>{kuerzel}</span>
                  </div>
                  <p className={`${echo} text-sm font-semibold`}>{typ}</p>
                </div>
                {/* Corner badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusColor}`}>
                    {status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">{name}</h2>
                  <p className="text-zinc-400 leading-relaxed mb-6">{beschreibung}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {budget === "Demo" ? (
                    <p className="text-zinc-600 text-sm">Demo-Projekt</p>
                  ) : null}
                  {demoHref && (
                    <Link
                      href={demoHref}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors`}
                    >
                      <ExternalLink size={14} />
                      Demo ansehen
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-black text-white mb-5">Dein Projekt hier?</h2>
          <p className="text-zinc-400 mb-10 max-w-lg mx-auto">Ich freue mich darauf, dein Unternehmen digital nach vorne zu bringen.</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold transition-all hover:scale-105 shadow-xl shadow-cyan-500/20"
          >
            Projekt anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

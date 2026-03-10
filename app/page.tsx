import Link from "next/link";
import { ArrowRight, Globe, Brain, Zap, CheckCircle } from "lucide-react";

const leistungen = [
  {
    icon: Globe,
    title: "Website-Entwicklung",
    desc: "Moderne, schnelle Websites die Kunden gewinnen. Von der Landingpage bis zur komplexen Business-Website.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    icon: Brain,
    title: "Context Engineering",
    desc: "AI-Systeme mit dem richtigen Kontext füttern. Bessere Ergebnisse durch präzise Prompts und Strukturen.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    icon: Zap,
    title: "AI-Integration",
    desc: "Künstliche Intelligenz direkt in dein Unternehmen einbauen. Automatisierung, Chatbots, smarte Workflows.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
];

const referenzen = [
  {
    name: "Plan A Immobilien",
    typ: "Immobilien-Website",
    status: "Live",
    kuerzel: "PA",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    name: "Bella Vista Restaurant",
    typ: "Restaurant-Website",
    budget: "Demo",
    status: "Demo",
    kuerzel: "BV",
    statusColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    name: "IRONPEAK Fitness",
    typ: "Fitness-Studio Website",
    budget: "Demo",
    status: "Demo",
    kuerzel: "IP",
    statusColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
];

const vorteile = [
  "Mobil-optimiert & blitzschnell",
  "SEO-freundlich von Anfang an",
  "Kein Abo, kein Bullshit",
  "Direkte Kommunikation mit Kevin",
  "Lieferung in 2-4 Wochen",
  "Lokaler Anbieter aus Mosbach",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-blob absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#05050a_80%)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-xs font-medium tracking-wider uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Contexflow AI · Mosbach
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-d1 text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-4xl">
            Websites die{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
              verkaufen.
            </span>
            <br />
            Context der{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              funktioniert.
            </span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up-d2 text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            Kevin Goetz, Context Engineer aus Mosbach. Ich baue moderne Websites und AI-Systeme für lokale Unternehmen – schnell, günstig, und mit echten Ergebnissen.
          </p>

          {/* CTA */}
          <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              Jetzt Projekt starten
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projekte"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all"
            >
              Referenzen ansehen
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-d4 flex flex-wrap gap-8 mt-16 pt-12 border-t border-white/5">
            {[
              { wert: "6", label: "Projekte" },
              { wert: "3", label: "Echter Kunde" },
              { wert: "< 2W", label: "Lieferzeit" },
              { wert: "300 €", label: "Ab Preis" },
            ].map(({ wert, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-cyan-400" style={{ fontFamily: "var(--font-stats)" }}>{wert}</p>
                <p className="text-zinc-500 text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen Preview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Was ich mache</p>
          <h2 className="text-4xl font-black text-white mb-4">Drei Kernleistungen</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Alles aus einer Hand. Kein Agentur-Overhead, direkte Kommunikation, faire Preise.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leistungen.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div key={title} className={`card-block rounded-2xl border ${border} ${bg} p-8 hover:scale-[1.02] transition-transform`}>
              <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center mb-6`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/leistungen" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 transition-colors">
            Alle Leistungen ansehen <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Vorteile */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Warum Contexflow</p>
              <h2 className="text-4xl font-black text-white mb-5">Kein Agentur-Bullshit. Echte Ergebnisse.</h2>
              <p className="text-zinc-400 leading-relaxed">
                Ich bin Kevin, ein einzelner Context Engineer aus Mosbach. Kein Team das dich weiterreicht, keine versteckten Kosten, keine leeren Versprechen. Du sprichst direkt mit mir – von Anfang bis Ende.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vorteile.map((v) => (
                <div key={v} className="card-block flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                  <CheckCircle size={16} className="text-cyan-400 shrink-0" />
                  <span className="text-zinc-300 text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Referenzen Preview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Referenzen</p>
          <h2 className="text-4xl font-black text-white mb-4">Meine Projekte</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Ein echter Kunde, zwei Demo-Projekte – und mehr kommen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {referenzen.map(({ name, typ, budget, status, kuerzel, statusColor }) => (
            <div key={name} className="card-block rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:border-cyan-400/30 transition-colors">
              <div className="h-40 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 mb-5 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <span className="text-cyan-400 font-black text-xl">{kuerzel}</span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-white font-bold mb-1">{name}</h3>
                  <p className="text-zinc-500 text-sm">{typ}</p>
                </div>
                <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}>{status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/projekte" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 transition-colors">
            Alle Projekte ansehen <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Kundenstimmen */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Kundenstimmen</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">Was Kunden sagen.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Echtes Feedback – Platzhalter bis Bewertungen eintreffen */}
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 flex flex-col gap-4 min-h-[160px] items-center justify-center text-center">
            <p className="text-zinc-600 text-sm">Feedback folgt in Kürze.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 flex flex-col gap-4 min-h-[160px] items-center justify-center text-center">
            <p className="text-zinc-600 text-sm">Feedback folgt in Kürze.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="card-block relative rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/30 to-zinc-900/30 p-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="glow-blob absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500 blur-[80px]" />
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Bereit für dein Projekt?</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">Kostenlose Erstberatung. Kein Risiko. Ich melde mich innerhalb von 24 Stunden.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-bold transition-all hover:scale-105 shadow-xl shadow-cyan-500/30"
              >
                Jetzt Kontakt aufnehmen <ArrowRight size={16} />
              </Link>
              <Link
                href="/preise"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
              >
                Preise ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

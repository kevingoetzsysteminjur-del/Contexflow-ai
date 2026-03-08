import Link from "next/link";
import { ArrowLeft, Dumbbell, Flame, Shield, Clock, ChevronRight, Check, MapPin, Phone } from "lucide-react";

const kurse = [
  { name: "IRON STRENGTH", zeit: "Mo / Mi / Fr · 07:00", trainer: "Coach Alex", level: "Alle Level", farbe: "border-rose-500/30 bg-rose-500/5" },
  { name: "PEAK HIIT", zeit: "Di / Do · 18:00", trainer: "Coach Sarah", level: "Fortgeschritten", farbe: "border-orange-500/30 bg-orange-500/5" },
  { name: "POWERLIFTING", zeit: "Mo / Do / Sa · 10:00", trainer: "Coach Mike", level: "Fortgeschritten", farbe: "border-red-500/30 bg-red-500/5" },
  { name: "MOBILITY & CORE", zeit: "Di / Fr · 07:30", trainer: "Coach Lisa", level: "Alle Level", farbe: "border-amber-500/30 bg-amber-500/5" },
  { name: "BOXING FIT", zeit: "Mi / Sa · 18:30", trainer: "Coach Tom", level: "Alle Level", farbe: "border-rose-500/30 bg-rose-500/5" },
  { name: "OPEN GYM", zeit: "Täglich · 06:00 – 23:00", trainer: "–", level: "Alle Level", farbe: "border-zinc-700/50 bg-zinc-800/30" },
];

const pakete = [
  {
    name: "STARTER",
    preis: "29",
    features: ["Gerätebereich", "Umkleide & Duschen", "1 Einführungskurs"],
    farbe: "border-zinc-700",
    btn: "border border-white/20 text-white hover:bg-white/5",
  },
  {
    name: "PEAK",
    preis: "49",
    highlight: true,
    features: ["Gerätebereich", "Alle Gruppenkurse", "Sauna & Wellness", "Ernährungsberatung", "Personal Training Rabatt"],
    farbe: "border-rose-500/50",
    btn: "bg-rose-500 hover:bg-rose-400 text-white font-bold",
  },
  {
    name: "ELITE",
    preis: "79",
    features: ["Alles aus PEAK", "2x Personal Training/Monat", "Körperanalyse", "Priority Booking", "Guest Passes"],
    farbe: "border-zinc-700",
    btn: "border border-white/20 text-white hover:bg-white/5",
  },
];

export default function IronpeakPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Demo Banner */}
      <div className="bg-rose-500/10 border-b border-rose-500/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-rose-400 text-sm">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          Demo-Website · Erstellt von Contexflow AI
        </div>
        <Link href="/projekte" className="flex items-center gap-1.5 text-rose-400/70 hover:text-rose-400 text-xs transition-colors">
          <ArrowLeft size={13} />
          Zurück zu Projekten
        </Link>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-[#080808] to-[#080808]" />
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-5"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0px, #ef4444 2px, transparent 2px, transparent 30px)",
            }}
          />
        </div>
        {/* Glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-rose-600 blur-[120px] opacity-15" />

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-bold tracking-widest uppercase mb-6">
              <Flame size={12} />
              Mosbach · Since 2019
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-4">
              <span className="text-white">IRON</span>
              <span className="text-rose-500">PEAK</span>
            </h1>
            <p className="text-zinc-400 text-xl leading-relaxed mb-8">
              Kein Mainstream-Gym. Kein Hype. Nur echtes Training, echter Fortschritt, echte Community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#mitgliedschaft" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-black transition-all hover:scale-105 shadow-xl shadow-rose-500/20">
                Mitglied werden
                <ChevronRight size={16} />
              </a>
              <a href="#kurse" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 text-white font-semibold transition-all">
                Kursplan ansehen
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Dumbbell, zahl: "200+", label: "Geräte", farbe: "text-rose-400" },
              { icon: Flame, zahl: "500+", label: "Mitglieder", farbe: "text-orange-400" },
              { icon: Shield, zahl: "5", label: "Trainer", farbe: "text-amber-400" },
              { icon: Clock, zahl: "17h", label: "Täglich geöffnet", farbe: "text-rose-400" },
            ].map(({ icon: Icon, zahl, label, farbe }) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 flex flex-col gap-3">
                <Icon size={20} className={farbe} />
                <div>
                  <p className={`text-3xl font-black ${farbe}`}>{zahl}</p>
                  <p className="text-zinc-500 text-sm">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Dumbbell, titel: "Freie Gewichte First", text: "50m² Freihantelfläche, Barbells, Kettlebells, Plates. Für echte Athleten." },
              { icon: Flame, titel: "High Intensity Kurse", text: "6 verschiedene Kursformate. Geführt von zertifizierten Coaches. Täglich." },
              { icon: Shield, titel: "Deine Community", text: "Kein Gedrängel, kein Ellenbogen. Nur Menschen die sich gegenseitig pushen." },
            ].map(({ icon: Icon, titel, text }) => (
              <div key={titel} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-5">
                  <Icon size={22} className="text-rose-400" />
                </div>
                <h3 className="text-white font-black text-lg mb-3">{titel}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kursplan */}
      <section id="kurse" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-rose-400 text-sm font-bold uppercase tracking-widest mb-3">Kursplan</p>
          <h2 className="text-4xl font-black text-white">Dein Training. Dein Tempo.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kurse.map(({ name, zeit, trainer, level, farbe }) => (
            <div key={name} className={`rounded-2xl border ${farbe} p-6`}>
              <h3 className="text-white font-black text-lg mb-3">{name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock size={13} className="text-zinc-600" />
                  {zeit}
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Shield size={13} className="text-zinc-600" />
                  {trainer}
                </div>
                <div className="mt-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs">{level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mitgliedschaft */}
      <section id="mitgliedschaft" className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-rose-400 text-sm font-bold uppercase tracking-widest mb-3">Mitgliedschaft</p>
            <h2 className="text-4xl font-black text-white">Wähle deinen Plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pakete.map(({ name, preis, features, farbe, btn, highlight }) => (
              <div
                key={name}
                className={`relative rounded-2xl border ${farbe} ${highlight ? "bg-rose-500/5 ring-2 ring-rose-500/30" : "bg-white/[0.02]"} p-8 flex flex-col`}
              >
                {highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black">BELIEBT</span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">{name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black text-white">{preis} €</span>
                    <span className="text-zinc-500 text-sm mb-2">/Monat</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check size={14} className="text-rose-400 shrink-0" />
                      <span className="text-zinc-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className={`w-full text-center px-4 py-3 rounded-xl text-sm transition-all ${btn}`}>
                  Jetzt starten
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-rose-400 text-sm font-bold uppercase tracking-widest mb-4">Kontakt</p>
            <h2 className="text-4xl font-black text-white mb-6">Komm vorbei. Probiere es aus.</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={16} className="text-rose-400 shrink-0" />
                Industriestraße 15, 74821 Mosbach
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Phone size={16} className="text-rose-400 shrink-0" />
                +49 6261 99999
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Clock size={16} className="text-rose-400 shrink-0" />
                Mo – So: 06:00 – 23:00 Uhr
              </div>
            </div>
            <a
              href="tel:+496261999999"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black transition-all hover:scale-105 shadow-lg shadow-rose-500/20"
            >
              Probetraining buchen
            </a>
          </div>
          {/* Map Placeholder */}
          <div className="h-64 rounded-2xl border border-white/5 bg-zinc-900 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-rose-400/30 mx-auto mb-3" />
              <p className="text-zinc-600 text-sm">Industriestraße 15, Mosbach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-sm font-black">IRONPEAK <span className="font-normal">Fitness Studio · Mosbach</span></p>
          <p className="text-zinc-700 text-xs">
            Demo-Website erstellt von{" "}
            <Link href="/" className="text-rose-400/60 hover:text-rose-400 transition-colors">Contexflow AI</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

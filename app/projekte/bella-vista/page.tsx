import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Star, ChevronRight } from "lucide-react";

const menu = [
  {
    kategorie: "Antipasti",
    gerichte: [
      { name: "Bruschetta al Pomodoro", beschreibung: "Geröstetes Brot mit Tomaten, Basilikum & Olivenöl", preis: "8,90 €" },
      { name: "Burrata con Prosciutto", beschreibung: "Frische Burrata mit Parmaschinken & Rucola", preis: "14,90 €" },
      { name: "Carpaccio di Manzo", beschreibung: "Dünn geschnittenes Rinderfilet, Parmesan & Kapern", preis: "16,50 €" },
    ],
  },
  {
    kategorie: "Pasta",
    gerichte: [
      { name: "Spaghetti all'Amatriciana", beschreibung: "Guanciale, Pecorino, San Marzano Tomaten", preis: "17,90 €" },
      { name: "Tagliatelle al Tartufo", beschreibung: "Frische Pasta, schwarze Trüffelcreme & Parmesan", preis: "24,90 €" },
      { name: "Rigatoni alla Norma", beschreibung: "Aubergine, Tomatensugo, Ricotta salata", preis: "16,50 €" },
    ],
  },
  {
    kategorie: "Secondi",
    gerichte: [
      { name: "Branzino al Forno", beschreibung: "Ofengebackener Wolfsbarsch, Kapern & Zitrone", preis: "32,00 €" },
      { name: "Costata di Manzo", beschreibung: "400g Ribeye vom Grill, Rosmarinkartoffeln", preis: "42,00 €" },
      { name: "Vitello Tonnato", beschreibung: "Zartes Kalbfleisch, Thunfischsauce, Kapern", preis: "22,50 €" },
    ],
  },
];

const bewertungen = [
  { name: "Sophie M.", text: "Das beste italienische Restaurant weit und breit. Die Burrata ist ein Traum.", sterne: 5 },
  { name: "Thomas K.", text: "Authentische Küche, tolles Ambiente. Wir kommen immer wieder.", sterne: 5 },
  { name: "Laura B.", text: "Das Tartufo-Tagliatelle ist sensationell. Absolute Empfehlung!", sterne: 5 },
];

export default function BellaVistaPage() {
  return (
    <div className="min-h-screen bg-[#0a0700] text-white">
      {/* Demo Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-400 text-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Demo-Website · Erstellt von Contexflow AI
        </div>
        <Link href="/projekte" className="flex items-center gap-1.5 text-amber-400/70 hover:text-amber-400 text-xs transition-colors">
          <ArrowLeft size={13} />
          Zurück zu Projekten
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-[#0a0700] to-[#0a0700]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 0%, #f59e0b 0%, transparent 70%)",
          }}
        />
        {/* Dekoratives Muster */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #f59e0b 0px, #f59e0b 1px, transparent 1px, transparent 20px)",
          }}
        />
        <div className="relative text-center px-6">
          <p className="text-amber-400/70 text-sm tracking-[0.3em] uppercase mb-4">Ristorante · Mosbach</p>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-2" style={{ fontStyle: "italic" }}>
            Bella Vista
          </h1>
          <p className="text-amber-300/60 text-xl tracking-widest mb-8">— Cucina Italiana —</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#reservierung" className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold transition-all hover:scale-105">
              Tisch reservieren
            </a>
            <a href="#menu" className="px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold transition-all">
              Speisekarte
            </a>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <ChevronRight size={20} className="rotate-90 animate-bounce" />
        </div>
      </section>

      {/* Über uns */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 text-sm tracking-widest uppercase mb-4">Unsere Geschichte</p>
            <h2 className="text-4xl font-black text-white mb-6">Authentische Küche seit 1998</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Bella Vista steht für echte italienische Küche – keine Kompromisse, keine Convenience. Jede Pasta wird täglich frisch gemacht, jede Sauce nach Familienrezept gekocht.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Unser Küchenchef Marco Ferretti bringt die Aromen Siziliens direkt auf deinen Teller – mit Zutaten von lokalen Bauern und importierten Spezialitäten aus Italien.
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { zahl: "25+", label: "Jahre Erfahrung" },
              { zahl: "100%", label: "Frische Pasta" },
              { zahl: "4,9 ★", label: "Google Bewertung" },
              { zahl: "50+", label: "Stammgäste" },
            ].map(({ zahl, label }) => (
              <div key={label} className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-6 text-center">
                <p className="text-3xl font-black text-amber-400 mb-1">{zahl}</p>
                <p className="text-zinc-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öffnungszeiten */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Clock size={24} className="text-amber-400" />
              <div>
                <p className="text-white font-bold mb-1">Öffnungszeiten</p>
                <p className="text-zinc-400 text-sm">Di – Fr: 17:00 – 23:00</p>
                <p className="text-zinc-400 text-sm">Sa – So: 12:00 – 23:00</p>
                <p className="text-zinc-500 text-xs mt-1">Montag Ruhetag</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <MapPin size={24} className="text-amber-400" />
              <div>
                <p className="text-white font-bold mb-1">Adresse</p>
                <p className="text-zinc-400 text-sm">Hauptstraße 42</p>
                <p className="text-zinc-400 text-sm">74821 Mosbach</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Phone size={24} className="text-amber-400" />
              <div>
                <p className="text-white font-bold mb-1">Reservierung</p>
                <p className="text-zinc-400 text-sm">+49 6261 00000</p>
                <p className="text-zinc-400 text-sm">info@bellavista-mosbach.de</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speisekarte */}
      <section id="menu" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm tracking-widest uppercase mb-3">La Carta</p>
          <h2 className="text-4xl font-black text-white">Unsere Speisekarte</h2>
        </div>
        <div className="space-y-12">
          {menu.map(({ kategorie, gerichte }) => (
            <div key={kategorie}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-widest">{kategorie}</h3>
                <div className="flex-1 h-px bg-amber-500/10" />
              </div>
              <div className="space-y-4">
                {gerichte.map(({ name, beschreibung, preis }) => (
                  <div key={name} className="flex items-start justify-between gap-6 py-4 border-b border-white/5">
                    <div>
                      <p className="text-white font-semibold mb-1">{name}</p>
                      <p className="text-zinc-500 text-sm">{beschreibung}</p>
                    </div>
                    <p className="text-amber-400 font-bold shrink-0">{preis}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bewertungen */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm tracking-widest uppercase mb-3">Recensioni</p>
            <h2 className="text-4xl font-black text-white">Was unsere Gäste sagen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bewertungen.map(({ name, text, sterne }) => (
              <div key={name} className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: sterne }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">"{text}"</p>
                <p className="text-zinc-500 text-xs font-semibold">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservierung */}
      <section id="reservierung" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-amber-400 text-sm tracking-widest uppercase mb-4">Prenota</p>
        <h2 className="text-4xl font-black text-white mb-6">Tisch reservieren</h2>
        <p className="text-zinc-400 mb-10">Rufen Sie uns an oder schreiben Sie uns – wir freuen uns auf Ihren Besuch.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+4962610000" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold transition-all hover:scale-105">
            <Phone size={16} />
            Jetzt anrufen
          </a>
          <a href="mailto:info@bellavista-mosbach.de" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 hover:bg-white/5 text-white font-semibold transition-all">
            <Mail size={16} />
            E-Mail senden
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-sm italic">Bella Vista Ristorante · Mosbach</p>
          <p className="text-zinc-700 text-xs">
            Demo-Website erstellt von{" "}
            <Link href="/" className="text-amber-400/60 hover:text-amber-400 transition-colors">Contexflow AI</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

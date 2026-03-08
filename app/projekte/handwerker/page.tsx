"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Zap, Home, Sun, ShieldAlert, CheckCircle, Star, ChevronRight, Wrench } from "lucide-react";

const leistungen = [
  {
    icon: Zap,
    titel: "Elektroinstallation",
    beschreibung: "Neuinstallation, Sanierung und Erweiterung von Elektroanlagen in Wohn- und Gewerbeimmobilien. VDE-geprüft und normgerecht.",
    punkte: ["Unterverteilungen & Sicherungskästen", "Steckdosen & Schalter", "Beleuchtungsinstallation", "E-Check & Prüfung"],
  },
  {
    icon: Home,
    titel: "Smart Home",
    beschreibung: "Intelligente Haussteuerung für mehr Komfort, Sicherheit und Energieeffizienz. Von der einfachen Zeitschaltuhr bis zur vollautomatisierten Anlage.",
    punkte: ["KNX / Busch-Jaeger", "Lichtsteuerung & Szenen", "Jalousie & Heizungssteuerung", "Sprachsteuerung (Alexa, Google)"],
  },
  {
    icon: Sun,
    titel: "Photovoltaik",
    beschreibung: "Planung und Installation von Photovoltaikanlagen für Privat und Gewerbe. Inklusive Speicher, Wallbox und Netzeinspeisemanagement.",
    punkte: ["Dachanalyse & Planung", "Montage & Inbetriebnahme", "Batteriespeicher", "Wallbox & E-Mobilität"],
  },
  {
    icon: ShieldAlert,
    titel: "Notdienst 24h",
    beschreibung: "Stromausfall, Kurzschluss oder defekte Sicherung? Wir sind rund um die Uhr für Sie erreichbar – auch an Wochenenden und Feiertagen.",
    punkte: ["Reaktionszeit unter 60 Min.", "Verfügbar 365 Tage im Jahr", "Festpreise auch im Notdienst", "Provisorische Absicherung"],
    notdienst: true,
  },
];

const team = [
  { kuerzel: "HM", name: "Hans Müller", rolle: "Geschäftsführer & Meister", seit: "Seit 1998", farbe: "bg-blue-600" },
  { kuerzel: "MK", name: "Markus Klein", rolle: "Elektromeister", seit: "Seit 2005", farbe: "bg-blue-700" },
  { kuerzel: "TW", name: "Tobias Weber", rolle: "Geselle & Smart-Home-Spezialist", seit: "Seit 2018", farbe: "bg-blue-800" },
  { kuerzel: "LF", name: "Laura Fischer", rolle: "Büroleitung & Auftragsplanung", seit: "Seit 2012", farbe: "bg-yellow-600" },
];

const referenzen = [
  { titel: "Einfamilienhaus Mosbach", beschreibung: "Komplettsanierung der Elektroanlage, Smart-Home-Integration", tag: "Privat", farbe: "bg-blue-50 border-blue-100" },
  { titel: "Bürogebäude Neckarbischofsheim", beschreibung: "Neuinstallation 3-geschossiges Bürogebäude, 48 Arbeitsplätze", tag: "Gewerbe", farbe: "bg-yellow-50 border-yellow-100" },
  { titel: "PV-Anlage Billigheim", beschreibung: "12 kWp Anlage mit 10 kWh Speicher und Wallbox", tag: "Photovoltaik", farbe: "bg-green-50 border-green-100" },
  { titel: "Ferienwohnungen Aglasterhausen", beschreibung: "Smart-Home-Nachrüstung in 6 Ferienapartments", tag: "Smart Home", farbe: "bg-blue-50 border-blue-100" },
  { titel: "Gaststätte Zum Ochsen, Mosbach", beschreibung: "Komplette Neuinstallation nach Brandschaden", tag: "Gewerbe", farbe: "bg-yellow-50 border-yellow-100" },
  { titel: "Reihenhaus-Siedlung Elztal", beschreibung: "PV + Speicher für 8 Einheiten, Gemeinschaftswallbox", tag: "Photovoltaik", farbe: "bg-green-50 border-green-100" },
];

const bewertungen = [
  { name: "Familie Bauer", text: "Schnell, sauber, zuverlässig. Haben unsere gesamte Elektrik saniert. Absolut empfehlenswert!", sterne: 5 },
  { name: "K. Hoffmann", text: "Notdienst kam innerhalb von 45 Minuten. Professionell und faire Preise auch nachts.", sterne: 5 },
  { name: "Ferienwohnungen Maier", text: "Smart-Home-Installation top umgesetzt. Team sehr kompetent und freundlich.", sterne: 5 },
];

export default function HandwerkerPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Demo Banner */}
      <div className="bg-blue-600 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-100 text-sm">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          Demo-Website · Erstellt von Contexflow AI
        </div>
        <Link href="/projekte" className="flex items-center gap-1.5 text-blue-200 hover:text-white text-xs transition-colors">
          <ArrowLeft size={13} />
          Zurück zu Projekten
        </Link>
      </div>

      {/* Notdienst-Banner */}
      <div className="bg-yellow-400 px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <ShieldAlert size={18} className="text-yellow-900 shrink-0" />
            <p className="text-yellow-900 font-bold text-sm">
              Stromausfall? Notfall? – Wir sind <span className="underline">24/7</span> für Sie da!
            </p>
          </div>
          <a
            href="tel:+4962610000"
            className="flex items-center gap-2 bg-yellow-900 hover:bg-yellow-800 text-yellow-100 font-black px-4 py-1.5 rounded-lg text-sm transition-colors shrink-0"
          >
            <Phone size={14} />
            06261 / 00 00 00
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm leading-tight">Elektro Mosbach</p>
              <p className="text-blue-600 text-xs leading-tight">Meisterbetrieb seit 1998</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#leistungen" className="hover:text-blue-600 transition-colors">Leistungen</a>
            <a href="#team" className="hover:text-blue-600 transition-colors">Team</a>
            <a href="#referenzen" className="hover:text-blue-600 transition-colors">Referenzen</a>
            <a href="#kontakt" className="hover:text-blue-600 transition-colors">Kontakt</a>
          </div>
          <a
            href="tel:+4962610000"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors"
          >
            <Phone size={14} />
            Anrufen
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        {/* Hintergrund-Muster */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10"
          style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, transparent 60%)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={12} />
              Meisterbetrieb · Mosbach · Seit 1998
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5">
              Ihr Elektriker<br />
              <span className="text-yellow-400">in Mosbach</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Elektroinstallation, Smart Home und Photovoltaik – von Meisterhand. Über 25 Jahre Erfahrung, faire Preise, pünktliche Ausführung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+4962610000"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black transition-all hover:scale-105 shadow-lg shadow-yellow-400/20"
              >
                <Phone size={16} />
                06261 / 00 00 00
              </a>
              <a
                href="#leistungen"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold transition-all"
              >
                Leistungen ansehen <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { zahl: "25+", label: "Jahre Erfahrung", icon: "🏆" },
              { zahl: "1.200+", label: "Projekte", icon: "⚡" },
              { zahl: "24/7", label: "Notdienst", icon: "🚨" },
              { zahl: "4,9 ★", label: "Google Bewertung", icon: "⭐" },
            ].map(({ zahl, label, icon }) => (
              <div key={label} className="rounded-2xl bg-white/10 border border-white/20 p-5 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-3xl font-black text-yellow-400">{zahl}</p>
                <p className="text-blue-200 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Unsere Leistungen</p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Was wir für Sie tun</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Alles aus einer Hand – von der einfachen Steckdose bis zur kompletten Photovoltaikanlage.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leistungen.map(({ icon: Icon, titel, beschreibung, punkte, notdienst }) => (
            <div
              key={titel}
              className={`rounded-2xl border p-8 ${notdienst ? "border-yellow-300 bg-yellow-50" : "border-gray-100 bg-gray-50 hover:border-blue-200"} transition-colors`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${notdienst ? "bg-yellow-400" : "bg-blue-600"}`}>
                <Icon size={22} className={notdienst ? "text-yellow-900" : "text-white"} />
              </div>
              {notdienst && (
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-black uppercase tracking-wider mb-3">
                  24/7 verfügbar
                </span>
              )}
              <h3 className="text-xl font-black text-gray-900 mb-3">{titel}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{beschreibung}</p>
              <ul className="space-y-2">
                {punkte.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={15} className={notdienst ? "text-yellow-600 shrink-0" : "text-blue-600 shrink-0"} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Warum wir */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🔐", titel: "VDE-geprüft", text: "Alle Arbeiten normgerecht nach VDE-Vorschriften" },
              { icon: "📋", titel: "Festpreise", text: "Transparente Angebote – keine bösen Überraschungen" },
              { icon: "⏱️", titel: "Pünktlich", text: "Vereinbarte Termine werden eingehalten" },
              { icon: "🧹", titel: "Sauber", text: "Wir verlassen die Baustelle so sauber wie wir sie vorfanden" },
            ].map(({ icon, titel, text }) => (
              <div key={titel}>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-black text-yellow-400 mb-2">{titel}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Unser Team</p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Meisterbetrieb mit Erfahrung</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Vier Fachleute, ein Ziel: Ihre Elektroanlage in besten Händen.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ kuerzel, name, rolle, seit, farbe }) => (
            <div key={name} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-20 h-20 rounded-2xl ${farbe} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-black text-2xl">{kuerzel}</span>
              </div>
              <h3 className="font-black text-gray-900 mb-1">{name}</h3>
              <p className="text-blue-600 text-sm font-medium mb-1">{rolle}</p>
              <p className="text-gray-400 text-xs">{seit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referenzen */}
      <section id="referenzen" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Referenzen</p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Ausgewählte Projekte</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Aus über 1.200 abgeschlossenen Projekten – ein kleiner Einblick.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {referenzen.map(({ titel, beschreibung, tag, farbe }) => (
              <div key={titel} className={`rounded-2xl border ${farbe} bg-white p-6 hover:shadow-md transition-shadow`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Wrench size={16} className="text-white" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    tag === "Gewerbe" ? "bg-yellow-100 text-yellow-700" :
                    tag === "Photovoltaik" ? "bg-green-100 text-green-700" :
                    tag === "Smart Home" ? "bg-purple-100 text-purple-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>{tag}</span>
                </div>
                <h3 className="font-black text-gray-900 mb-2">{titel}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{beschreibung}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bewertungen */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Bewertungen</p>
          <h2 className="text-4xl font-black text-gray-900">Was unsere Kunden sagen</h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
            <span className="text-gray-500 text-sm ml-2">4,9 · 87 Bewertungen</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bewertungen.map(({ name, text, sterne }) => (
            <div key={name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: sterne }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
              <p className="text-gray-400 text-xs font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notdienst CTA */}
      <section className="bg-yellow-400">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <ShieldAlert size={48} className="text-yellow-900 mx-auto mb-5" />
          <h2 className="text-4xl font-black text-yellow-900 mb-3">Elektrischer Notfall?</h2>
          <p className="text-yellow-800 text-lg mb-8 max-w-lg mx-auto">
            Wir sind 365 Tage im Jahr, rund um die Uhr für Sie erreichbar. Reaktionszeit unter 60 Minuten.
          </p>
          <a
            href="tel:+4962610000"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-yellow-900 hover:bg-yellow-800 text-yellow-100 font-black text-2xl transition-all hover:scale-105 shadow-2xl"
          >
            <Phone size={28} />
            06261 / 00 00 00
          </a>
          <p className="text-yellow-700 text-sm mt-4">24 Stunden · 7 Tage · 365 Tage im Jahr</p>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-4">Kontakt</p>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Wir sind für Sie da</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Telefon</p>
                  <a href="tel:+4962610000" className="text-gray-900 font-black text-xl hover:text-blue-600 transition-colors">06261 / 00 00 00</a>
                  <p className="text-gray-400 text-xs mt-0.5">Mo–Fr 7–18 Uhr · Notdienst 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">E-Mail</p>
                  <a href="mailto:info@elektro-mosbach.de" className="text-gray-900 font-bold hover:text-blue-600 transition-colors">info@elektro-mosbach.de</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Adresse</p>
                  <p className="text-gray-900 font-bold">Industriestraße 8</p>
                  <p className="text-gray-500 text-sm">74821 Mosbach</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Öffnungszeiten</p>
                  <p className="text-gray-900 font-bold">Mo – Fr: 07:00 – 18:00</p>
                  <p className="text-gray-500 text-sm">Sa nach Vereinbarung</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kontaktformular */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <h3 className="font-black text-gray-900 text-xl mb-6">Kostenlose Anfrage</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-xs font-medium mb-1.5 block">Vorname</label>
                  <input className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-400 transition-colors" placeholder="Max" />
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-medium mb-1.5 block">Nachname</label>
                  <input className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-400 transition-colors" placeholder="Mustermann" />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-xs font-medium mb-1.5 block">Telefon</label>
                <input className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-400 transition-colors" placeholder="06261 / ..." />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-medium mb-1.5 block">Leistung</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-400 transition-colors">
                  <option>Elektroinstallation</option>
                  <option>Smart Home</option>
                  <option>Photovoltaik</option>
                  <option>Notdienst</option>
                  <option>Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-xs font-medium mb-1.5 block">Ihre Nachricht</label>
                <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none" placeholder="Beschreiben Sie kurz Ihr Anliegen..." />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors"
              >
                Anfrage senden
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center">
              <Zap size={14} className="text-yellow-400" />
            </div>
            <p className="text-gray-600 text-sm font-bold">Elektro Mosbach · Meisterbetrieb seit 1998</p>
          </div>
          <p className="text-gray-400 text-xs">
            Demo-Website erstellt von{" "}
            <Link href="/" className="text-blue-500 hover:text-blue-600 transition-colors">Contexflow AI</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

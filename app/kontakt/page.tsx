"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    firma: "",
    leistung: "",
    budget: "",
    nachricht: "",
  });
  const [gesendet, setGesendet] = useState(false);
  const [laden, setLaden] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.nachricht.trim()) return;
    setLaden(true);

    const subject = encodeURIComponent(
      `Anfrage: ${form.leistung || "Website"} – ${form.name}${form.firma ? ` (${form.firma})` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `E-Mail: ${form.email}\n` +
      `Firma: ${form.firma || "–"}\n` +
      `Leistung: ${form.leistung || "–"}\n` +
      `Budget: ${form.budget || "–"}\n\n` +
      `Nachricht:\n${form.nachricht}`
    );

    window.location.href = `mailto:contexflow.ai@gmx.net?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLaden(false);
      setGesendet(true);
    }, 1000);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-blob absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-cyan-500 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Kontakt</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 max-w-3xl">
            Lass uns reden.
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
            Schreib mir – ich antworte in der Regel innerhalb von 24 Stunden. Das Erstgesprach ist kostenlos und unverbindlich.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Kontaktinfos */}
          <div className="space-y-8">
            <div>
              <h2 className="text-white font-black text-xl mb-6">Direktkontakt</h2>
              <div className="space-y-4">
                <a
                  href="mailto:contexflow.ai@gmx.net"
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 hover:border-cyan-400/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs mb-0.5">E-Mail</p>
                    <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">contexflow.ai@gmx.net</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs mb-0.5">Standort</p>
                    <p className="text-white text-sm font-medium">Mosbach, Neckar-Odenwald-Kreis</p>
                    <p className="text-zinc-500 text-xs">Baden-Wurttemberg, Deutschland</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
              <h3 className="text-white font-bold mb-2">Schnelle Antwort</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Ich antworte in der Regel <span className="text-cyan-400 font-semibold">innerhalb von 24 Stunden</span> – oft viel schneller.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
              <h3 className="text-white font-bold mb-3">Fur wen?</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                {["Restaurants & Cafes", "Immobilien & Makler", "Aerzte & Therapeuten", "Handwerker & Dienstleister", "Fitness & Sport", "Einzelhandel"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formular */}
          <div className="md:col-span-2">
            {gesendet ? (
              <div className="h-full flex items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-16 text-center">
                <div>
                  <CheckCircle size={56} className="text-emerald-400 mx-auto mb-6" />
                  <h3 className="text-white font-black text-2xl mb-3">Nachricht erhalten!</h3>
                  <p className="text-zinc-400 max-w-sm mx-auto">
                    Danke, {form.name}! Ich melde mich so bald wie moglich bei dir. Schau auch in deinen Spam-Ordner.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-zinc-400 text-xs font-medium mb-1.5 block">Dein Name *</label>
                    <input
                      name="name"
                      required
                      placeholder="Max Mustermann"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-400/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 text-xs font-medium mb-1.5 block">E-Mail *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="max@firma.de"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-400/5 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 text-xs font-medium mb-1.5 block">Firma / Unternehmensname</label>
                  <input
                    name="firma"
                    placeholder="Muster GmbH (optional)"
                    value={form.firma}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-400/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-zinc-400 text-xs font-medium mb-1.5 block">Gesuchte Leistung</label>
                    <select
                      name="leistung"
                      value={form.leistung}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                    >
                      <option value="" className="bg-zinc-900">Bitte wahlen...</option>
                      <option value="Landingpage" className="bg-zinc-900">Landingpage (ab 500 €)</option>
                      <option value="Business Website" className="bg-zinc-900">Business Website (ab 1.000 €)</option>
                      <option value="Premium Website" className="bg-zinc-900">Premium Website (ab 2.000 €)</option>
                      <option value="Context Engineering" className="bg-zinc-900">Context Engineering</option>
                      <option value="AI-Integration" className="bg-zinc-900">AI-Integration</option>
                      <option value="Beratung" className="bg-zinc-900">Erstberatung / Ich bin unsicher</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-xs font-medium mb-1.5 block">Budget-Vorstellung</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                    >
                      <option value="" className="bg-zinc-900">Bitte wahlen...</option>
                      <option value="bis 500€" className="bg-zinc-900">Bis 500 €</option>
                      <option value="500–1.000€" className="bg-zinc-900">500 – 1.000 €</option>
                      <option value="1.000–2.000€" className="bg-zinc-900">1.000 – 2.000 €</option>
                      <option value="uber 2.000€" className="bg-zinc-900">Uber 2.000 €</option>
                      <option value="unklar" className="bg-zinc-900">Noch unklar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 text-xs font-medium mb-1.5 block">Deine Nachricht *</label>
                  <textarea
                    name="nachricht"
                    required
                    rows={5}
                    placeholder="Erzahl mir von deinem Projekt, deiner Firma und was du dir vorstellst..."
                    value={form.nachricht}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-400/5 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={laden}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-900 font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                >
                  {laden ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-900/30 border-t-zinc-900 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Nachricht senden
                    </>
                  )}
                </button>

                <p className="text-zinc-600 text-xs text-center">
                  * Pflichtfelder. Deine Daten werden vertraulich behandelt.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

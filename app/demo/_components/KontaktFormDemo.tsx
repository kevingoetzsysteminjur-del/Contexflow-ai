"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, RotateCcw } from "lucide-react";

type Lang = "de" | "en";

const TX = {
  de: {
    name: "Ihr Name *",
    email: "Ihre E-Mail *",
    branche: "Branche auswählen",
    branchen: ["Immobilien", "Restaurant / Gastronomie", "Arztpraxis / Gesundheit", "Handwerk / Gewerbe", "Kanzlei / Beratung", "E-Commerce / Shop", "Sonstiges"],
    msg: "Ihre Nachricht *",
    cta: "Nachricht senden",
    sending: "KI analysiert...",
    aiLabel: "KI-Assistent",
    aiOnline: "● Antwortet in Echtzeit",
    rec: {
      Immobilien: "Professional",
      "Restaurant / Gastronomie": "Starter",
      "Arztpraxis / Gesundheit": "Professional",
      "Handwerk / Gewerbe": "Starter",
      "Kanzlei / Beratung": "Premium",
      "E-Commerce / Shop": "Premium",
      Sonstiges: "Professional",
    } as Record<string, string>,
    buildMsg: (name: string, branche: string, paket: string) =>
      `Danke, ${name}! 👋 Ich habe Ihre Anfrage erhalten.\n\nBasierend auf Ihrer Branche **${branche}** empfehle ich Ihnen unser **${paket}-Paket** – das passt perfekt zu Ihren Anforderungen.\n\nIch melde mich persönlich innerhalb von **24 Stunden** bei Ihnen. Bis bald! 🚀`,
    reset: "Neue Anfrage",
    required: "Bitte füllen Sie alle Pflichtfelder aus.",
  },
  en: {
    name: "Your name *",
    email: "Your email *",
    branche: "Select industry",
    branchen: ["Real estate", "Restaurant / Hospitality", "Medical practice / Health", "Trades / Crafts", "Law firm / Consulting", "E-Commerce / Shop", "Other"],
    msg: "Your message *",
    cta: "Send message",
    sending: "AI analyzing...",
    aiLabel: "AI Assistant",
    aiOnline: "● Responding in real time",
    rec: {
      "Real estate": "Professional",
      "Restaurant / Hospitality": "Starter",
      "Medical practice / Health": "Professional",
      "Trades / Crafts": "Starter",
      "Law firm / Consulting": "Premium",
      "E-Commerce / Shop": "Premium",
      Other: "Professional",
    } as Record<string, string>,
    buildMsg: (name: string, branche: string, paket: string) =>
      `Thank you, ${name}! 👋 I have received your inquiry.\n\nBased on your industry **${branche}** I recommend our **${paket} package** – it's a perfect fit for your needs.\n\nI will personally get back to you within **24 hours**. Talk soon! 🚀`,
    reset: "New inquiry",
    required: "Please fill in all required fields.",
  },
};

function parseText(t: string) {
  return t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
}

export default function KontaktFormDemo({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const [form, setForm] = useState({ name: "", email: "", branche: "", msg: "" });
  const [phase, setPhase] = useState<"form" | "sending" | "chat">("form");
  const [chatText, setChatText] = useState("");
  const [fullText, setFullText] = useState("");
  const [error, setError] = useState(false);

  function submit() {
    if (!form.name.trim() || !form.email.trim() || !form.branche || !form.msg.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setPhase("sending");
    const paket = tx.rec[form.branche] ?? "Professional";
    const msg = tx.buildMsg(form.name, form.branche, paket);
    setTimeout(() => {
      setFullText(msg);
      setPhase("chat");
    }, 1800);
  }

  // Typewriter effect
  const idx = useRef(0);
  useEffect(() => {
    if (phase !== "chat") { idx.current = 0; setChatText(""); return; }
    const iv = setInterval(() => {
      idx.current++;
      setChatText(fullText.slice(0, idx.current));
      if (idx.current >= fullText.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, [phase, fullText]);

  if (phase === "chat") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-indigo-600/20 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center">
            <Bot size={18} className="text-indigo-300" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{tx.aiLabel}</p>
            <p className="text-emerald-400 text-xs">{tx.aiOnline}</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-5 py-4 text-sm text-zinc-200 leading-relaxed max-w-lg"
            dangerouslySetInnerHTML={{ __html: parseText(chatText) }}
          />
          <button
            onClick={() => { setPhase("form"); setForm({ name: "", email: "", branche: "", msg: "" }); }}
            className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm border border-white/10 px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw size={13} /> {tx.reset}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4 max-w-xl">
      {error && (
        <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          {tx.required}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <input
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
          placeholder={tx.name}
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
          placeholder={tx.email}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <select
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-colors"
        style={{ color: form.branche ? "white" : "#52525b" }}
        value={form.branche}
        onChange={e => setForm({ ...form, branche: e.target.value })}
      >
        <option value="" disabled style={{ color: "#52525b", background: "#0a0a1a" }}>{tx.branche}</option>
        {tx.branchen.map(b => (
          <option key={b} value={b} style={{ background: "#0a0a1a", color: "white" }}>{b}</option>
        ))}
      </select>
      <textarea
        rows={4}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-indigo-500/50 transition-colors resize-none"
        placeholder={tx.msg}
        value={form.msg}
        onChange={e => setForm({ ...form, msg: e.target.value })}
      />
      <button
        onClick={submit}
        disabled={phase === "sending"}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-all"
      >
        {phase === "sending" ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {tx.sending}
          </>
        ) : (
          <><Send size={14} /> {tx.cta}</>
        )}
      </button>
    </div>
  );
}

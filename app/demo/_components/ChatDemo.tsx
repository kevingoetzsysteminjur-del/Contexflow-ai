"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

type Lang = "de" | "en";
interface Msg { role: "bot" | "user"; text: string; }

const TX = {
  de: {
    welcome: "Hallo! 👋 Ich bin Ihr KI-Assistent. Wie kann ich Ihnen heute helfen?",
    quick: ["Öffnungszeiten", "Was kostet das?", "Termin buchen", "Kontakt"],
    placeholder: "Nachricht schreiben...",
    typing: "KI tippt",
    answers: [
      { keys: ["öffnung","uhr","wann","zeit","offen"], text: "Wir sind **Mo–Fr von 9–18 Uhr** erreichbar. Samstags von 10–14 Uhr. Per E-Mail sind wir jederzeit für Sie da! 🕘" },
      { keys: ["preis","kostet","kosten","budget","euro","€","teuer","günstig"], text: "Unsere Leistungen starten ab **500 € für eine Landingpage**, ab 1.000 € für eine Business-Website und ab 2.000 € für Premium-Projekte. Gerne erstellen wir ein individuelles Angebot! 💶" },
      { keys: ["termin","buchen","buchung","vereinbaren","meeting","gespräch"], text: "Sehr gerne! Nutzen Sie einfach unsere **smarte Terminbuchung** weiter unten auf dieser Seite. In wenigen Klicks haben Sie Ihren Wunschtermin gesichert. 📅" },
      { keys: ["kontakt","erreichen","anrufen","email","mail","telefon"], text: "Sie erreichen uns unter **info@beispiel.de** oder telefonisch unter **+49 7261 123456**. Wir melden uns innerhalb von 24 Stunden! 📬" },
      { keys: ["ki","ai","künstlich","chatbot","assistent","automatisier"], text: "KI-Lösungen sind der Schlüssel zur digitalen Zukunft Ihres Unternehmens. Wir integrieren **Chatbots, automatische FAQ und Lead-Qualifizierung** nahtlos in Ihre Website. 🤖" },
      { keys: ["website","seite","homepage","webseite","design"], text: "Wir entwickeln **moderne, schnelle Websites** mit Next.js und React. Mobile-first, SEO-optimiert und immer mit dem gewissen Extra. Schauen Sie sich unsere Projekte an! 🌐" },
    ],
    fallback: "Vielen Dank für Ihre Anfrage! 🙏 Für individuelle Anliegen stehe ich Ihnen gerne persönlich zur Verfügung. Schreiben Sie uns an **info@beispiel.de** – wir antworten innerhalb von 24 Stunden.",
    send: "Senden",
  },
  en: {
    welcome: "Hello! 👋 I'm your AI assistant. How can I help you today?",
    quick: ["Opening hours", "How much does it cost?", "Book appointment", "Contact"],
    placeholder: "Type a message...",
    typing: "AI is typing",
    answers: [
      { keys: ["opening","hours","when","open","time"], text: "We are available **Mon–Fri 9am–6pm**. On Saturdays from 10am–2pm. Via email, we're always here for you! 🕘" },
      { keys: ["price","cost","budget","expensive","cheap","how much"], text: "Our services start at **€500 for a landing page**, €1,000 for a business website and €2,000+ for premium projects. We're happy to create a custom quote! 💶" },
      { keys: ["appoint","book","schedule","meeting","call"], text: "Absolutely! Simply use our **smart booking tool** further down on this page. Secure your preferred slot in just a few clicks. 📅" },
      { keys: ["contact","reach","call","email","phone"], text: "Reach us at **info@example.com** or by phone at **+49 7261 123456**. We respond within 24 hours! 📬" },
      { keys: ["ai","chatbot","assistant","automat","artificial"], text: "AI solutions are the key to your business's digital future. We integrate **chatbots, automatic FAQ and lead qualification** seamlessly into your website. 🤖" },
      { keys: ["website","page","homepage","design","web"], text: "We build **modern, fast websites** with Next.js and React. Mobile-first, SEO-optimized and always with that special touch. 🌐" },
    ],
    fallback: "Thank you for your message! 🙏 For individual inquiries, I'm happy to assist personally. Email us at **info@example.com** – we reply within 24 hours.",
    send: "Send",
  },
};

function parseText(t: string) {
  return t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

export default function ChatDemo({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: tx.welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  // reset when lang changes
  useEffect(() => {
    setMsgs([{ role: "bot", text: TX[lang].welcome }]);
  }, [lang]);

  function getAnswer(text: string) {
    const lower = text.toLowerCase();
    for (const a of TX[lang].answers) {
      if (a.keys.some((k) => lower.includes(k))) return a.text;
    }
    return TX[lang].fallback;
  }

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMsgs((p) => [...p, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, { role: "bot", text: getAnswer(msg) }]);
    }, 1000 + Math.random() * 600);
  }

  return (
    <div className="flex flex-col h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-indigo-600/20 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center">
          <Bot size={18} className="text-indigo-300" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">KI-Assistent</p>
          <p className="text-emerald-400 text-xs">● Online</p>
        </div>
        <div className="ml-auto flex gap-1">
          {[..."···"].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-white/20" />)}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "bot" && (
              <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex-shrink-0 flex items-center justify-center mt-1">
                <Bot size={13} className="text-indigo-300" />
              </div>
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-white/10 text-zinc-200 rounded-bl-sm border border-white/10"
              }`}
              dangerouslySetInnerHTML={{ __html: parseText(m.text) }}
            />
            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center mt-1">
                <User size={13} className="text-zinc-400" />
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 items-end">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
              <Bot size={13} className="text-indigo-300" />
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-white/5">
        {tx.quick.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10">
        <div className="flex gap-2 items-center bg-white/5 rounded-xl px-3 py-2 border border-white/10 focus-within:border-indigo-500/50 transition-colors">
          <input
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-zinc-500"
            placeholder={tx.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            className="w-7 h-7 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 flex items-center justify-center transition-all"
          >
            <Send size={13} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["preis", "kosten", "kostet", "budget", "euro", "€", "wie viel", "wieviel", "teuer"],
    answer: "Eine Website bei Contexflow AI startet ab **500 €** für eine Landingpage. Eine Business-Website gibt es ab **1.000 €**, Premium ab **2.000 €**. Alles einmalig – keine monatlichen Agenturgebühren. 💡",
  },
  {
    keywords: ["lang", "lange", "dauer", "dauert", "zeit", "wochen", "tage", "fertig", "wann"],
    answer: "In der Regel ist deine Website in **1–2 Wochen** fertig. Bei komplexeren Projekten können es bis zu 3 Wochen sein. Wir halten dich immer auf dem Laufenden. ⚡",
  },
  {
    keywords: ["technologie", "tech", "stack", "framework", "next", "react", "tailwind", "womit", "gebaut", "programmier"],
    answer: "Wir bauen mit modernsten Technologien: **Next.js**, **React**, **Tailwind CSS** und **TypeScript**. Das sorgt für blitzschnelle Ladezeiten und top Google-Rankings. 🚀",
  },
  {
    keywords: ["wo", "standort", "ort", "stadt", "mosbach", "region", "adresse", "sitz", "ansässig", "lokal"],
    answer: "Wir sind in **Mosbach** im Neckar-Odenwald-Kreis ansässig – aber wir arbeiten für Kunden in ganz Deutschland, komplett remote. 📍",
  },
  {
    keywords: ["kontakt", "kontaktier", "schreib", "email", "mail", "erreichen", "melden", "anruf", "telefon"],
    answer: "Am schnellsten erreichst du Kevin per E-Mail: **contexflow.ai@gmx.net** – oder direkt über das [Kontaktformular](/kontakt). Antwort innerhalb von 24 Stunden! 📬",
  },
  {
    keywords: ["context engineering", "context", "kontext", "was macht ihr", "was ist", "erkläre", "erklär", "bedeutet"],
    answer: "**Context Engineering** bedeutet, AI-Systeme mit dem richtigen Kontext zu füttern, damit sie wirklich nützliche Ergebnisse liefern. Statt generischer AI-Outputs bekommst du präzise, auf dein Business zugeschnittene Antworten und Automatisierungen. 🧠",
  },
  {
    keywords: ["ai", "ki", "künstlich", "intelligenz", "integration", "chatbot", "automatisier", "workflow"],
    answer: "Wir integrieren **Künstliche Intelligenz** direkt in dein Unternehmen – Chatbots, automatisierte Workflows, smarte Assistenten. Alles pragmatisch und auf deinen Betrieb zugeschnitten. 🤖",
  },
  {
    keywords: ["referenz", "projekt", "beispiel", "portfolio", "kunde", "arbeit", "zeig"],
    answer: "Unser erster echter Kunde ist **Plan A Immobilien** aus Mosbach – die Website ist live! Außerdem gibt es Demo-Projekte für ein Restaurant und ein Fitness-Studio. Schau gerne auf der [Projekte-Seite](/projekte) vorbei. 🌐",
  },
  {
    keywords: ["hallo", "hi", "hey", "guten", "morgen", "abend", "tag", "servus", "moin"],
    answer: "Hey! 👋 Ich bin **CF Bot**, der Assistent von Contexflow AI. Ich kann dir Fragen zu Preisen, Leistungen, Technologien und mehr beantworten. Was möchtest du wissen?",
  },
];

const WELCOME: Message = {
  role: "bot",
  text: "Hey! 👋 Ich bin **CF Bot** von Contexflow AI. Wie kann ich dir helfen?\n\nDu kannst mich z.B. fragen:\n- 💰 Was kostet eine Website?\n- ⏱ Wie lange dauert es?\n- 📍 Wo seid ihr?\n- 🧠 Was ist Context Engineering?",
};

function parseMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-400 underline hover:text-cyan-300" target="_self">$1</a>')
    .replace(/\n/g, "<br/>");
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  function findAnswer(text: string): string {
    const lower = text.toLowerCase();
    for (const faq of FAQ) {
      if (faq.keywords.some((k) => lower.includes(k))) {
        return faq.answer;
      }
    }
    return "Gute Frage! 🤔 Schreib uns direkt an **contexflow.ai@gmx.net** und Kevin meldet sich persönlich bei dir.";
  }

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: findAnswer(trimmed) }]);
    }, 800);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl shadow-black/60 transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 rounded-t-2xl bg-zinc-900/80">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
            <Bot size={16} className="text-cyan-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">CF Bot</p>
            <p className="text-emerald-400 text-xs mt-0.5">● Online</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-zinc-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-zinc-900 font-medium rounded-br-sm"
                    : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
                }`}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
              />
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10">
          <div className="flex gap-2 items-center bg-zinc-800 rounded-xl px-3 py-2 border border-white/5 focus-within:border-cyan-500/50 transition-colors">
            <input
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-zinc-500"
              placeholder="Frag mich etwas..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="text-cyan-400 hover:text-cyan-300 disabled:text-zinc-600 transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white"
            : "bg-cyan-500 hover:bg-cyan-400 text-zinc-900 hover:scale-110"
        }`}
        aria-label="Chat öffnen"
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}

"use client";

import { useState } from "react";
import { Flame, ThermometerSun, Info, RotateCcw, ArrowRight } from "lucide-react";

type Lang = "de" | "en";

const TX = {
  de: {
    steps: [
      {
        q: "Wie groß ist Ihr Unternehmen?",
        opts: [
          { label: "Solo / Freelancer", score: 2 },
          { label: "2–10 Mitarbeiter", score: 3 },
          { label: "11–50 Mitarbeiter", score: 3 },
          { label: "50+ Mitarbeiter", score: 2 },
        ],
      },
      {
        q: "Wie ist Ihre aktuelle Website-Situation?",
        opts: [
          { label: "Keine Website vorhanden", score: 3 },
          { label: "Website ist veraltet (5+ Jahre)", score: 3 },
          { label: "Website ist okay, aber nicht optimal", score: 2 },
          { label: "Website ist gut, suche Optimierung", score: 1 },
        ],
      },
      {
        q: "Welches Budget planen Sie ein?",
        opts: [
          { label: "Unter 500 €", score: 1 },
          { label: "500 – 1.500 €", score: 2 },
          { label: "1.500 – 3.000 €", score: 3 },
          { label: "Über 3.000 €", score: 3 },
        ],
      },
      {
        q: "Wann möchten Sie starten?",
        opts: [
          { label: "So schnell wie möglich", score: 3 },
          { label: "In den nächsten 1–2 Monaten", score: 2 },
          { label: "In 3–6 Monaten", score: 1 },
          { label: "Noch nicht sicher", score: 1 },
        ],
      },
    ],
    results: {
      hot: {
        icon: Flame,
        label: "Hot Lead 🔥",
        color: "from-orange-600/30 to-red-600/20",
        border: "border-orange-500/40",
        textColor: "text-orange-400",
        text: "Perfekte Ausgangslage! Sie haben klare Vorstellungen, ein passendes Budget und möchten zeitnah starten. Lassen Sie uns sprechen – ich melde mich innerhalb von 24 Stunden persönlich bei Ihnen.",
        cta: "Jetzt Kontakt aufnehmen",
      },
      warm: {
        icon: ThermometerSun,
        label: "Warm Lead ✨",
        color: "from-amber-600/30 to-yellow-600/20",
        border: "border-amber-500/40",
        textColor: "text-amber-400",
        text: "Gute Voraussetzungen! Ein paar Details müssen wir noch klären, aber das Potenzial ist da. In einem kostenlosen Erstgespräch finden wir gemeinsam die beste Lösung für Sie.",
        cta: "Kostenloses Erstgespräch buchen",
      },
      info: {
        icon: Info,
        label: "Info-Lead 💡",
        color: "from-blue-600/30 to-indigo-600/20",
        border: "border-blue-500/40",
        textColor: "text-blue-400",
        text: "Sie sammeln noch Informationen – das ist völlig in Ordnung! Schauen Sie sich gerne unsere Preise und Referenzen an. Wenn Sie bereit sind, stehen wir für ein unverbindliches Gespräch zur Verfügung.",
        cta: "Mehr erfahren",
      },
    },
    next: "Weiter",
    restart: "Neu starten",
    step: "Frage",
    of: "von",
  },
  en: {
    steps: [
      {
        q: "How large is your company?",
        opts: [
          { label: "Solo / Freelancer", score: 2 },
          { label: "2–10 employees", score: 3 },
          { label: "11–50 employees", score: 3 },
          { label: "50+ employees", score: 2 },
        ],
      },
      {
        q: "What is your current website situation?",
        opts: [
          { label: "No website yet", score: 3 },
          { label: "Website is outdated (5+ years)", score: 3 },
          { label: "Website is okay but not optimal", score: 2 },
          { label: "Website is good, looking for optimization", score: 1 },
        ],
      },
      {
        q: "What budget are you planning?",
        opts: [
          { label: "Under €500", score: 1 },
          { label: "€500 – €1,500", score: 2 },
          { label: "€1,500 – €3,000", score: 3 },
          { label: "Over €3,000", score: 3 },
        ],
      },
      {
        q: "When would you like to start?",
        opts: [
          { label: "As soon as possible", score: 3 },
          { label: "Within the next 1–2 months", score: 2 },
          { label: "In 3–6 months", score: 1 },
          { label: "Not sure yet", score: 1 },
        ],
      },
    ],
    results: {
      hot: {
        icon: Flame,
        label: "Hot Lead 🔥",
        color: "from-orange-600/30 to-red-600/20",
        border: "border-orange-500/40",
        textColor: "text-orange-400",
        text: "Perfect starting point! You have clear goals, a suitable budget and want to start soon. Let's talk – I'll personally reach out within 24 hours.",
        cta: "Get in touch now",
      },
      warm: {
        icon: ThermometerSun,
        label: "Warm Lead ✨",
        color: "from-amber-600/30 to-yellow-600/20",
        border: "border-amber-500/40",
        textColor: "text-amber-400",
        text: "Great potential! A few details still need to be clarified, but the foundation is there. In a free initial consultation we'll find the best solution for you together.",
        cta: "Book free consultation",
      },
      info: {
        icon: Info,
        label: "Info Lead 💡",
        color: "from-blue-600/30 to-indigo-600/20",
        border: "border-blue-500/40",
        textColor: "text-blue-400",
        text: "You're still gathering information – that's completely fine! Check out our pricing and references. When you're ready, we're available for a no-obligation conversation.",
        cta: "Learn more",
      },
    },
    next: "Next",
    restart: "Start over",
    step: "Question",
    of: "of",
  },
};

export default function LeadDemo({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const totalScore = answers.reduce((s, a) => s + a, 0);
  const resultKey = totalScore >= 10 ? "hot" : totalScore >= 7 ? "warm" : "info";
  const result = tx.results[resultKey];
  const ResultIcon = result.icon;
  const progress = ((step) / tx.steps.length) * 100;

  function next() {
    if (selected === null) return;
    const score = tx.steps[step].opts[selected].score;
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step + 1 >= tx.steps.length) {
      setDone(true);
    } else {
      setStep(s => s + 1);
      setSelected(null);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDone(false);
  }

  if (done) {
    return (
      <div className={`rounded-2xl border bg-gradient-to-br ${result.color} ${result.border} p-8 text-center space-y-4`}>
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-white/10 border ${result.border}`}>
          <ResultIcon size={28} className={result.textColor} />
        </div>
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Ihr Ergebnis</p>
          <h3 className={`text-2xl font-black ${result.textColor}`}>{result.label}</h3>
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">{result.text}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href="https://contexflow.com/kontakt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all"
          >
            {result.cta} <ArrowRight size={14} />
          </a>
          <button
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm transition-colors"
          >
            <RotateCcw size={14} /> {tx.restart}
          </button>
        </div>
      </div>
    );
  }

  const current = tx.steps[step];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>{tx.step} {step + 1} {tx.of} {tx.steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">{current.q}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                selected === i
                  ? "bg-indigo-600/30 border-indigo-500/60 text-indigo-200 scale-[1.02]"
                  : "bg-white/[0.03] border-white/10 text-zinc-300 hover:border-indigo-500/30 hover:text-white"
              }`}
            >
              <span className={`inline-block w-5 h-5 rounded-full border mr-2.5 text-xs flex-shrink-0 items-center justify-center
                ${selected === i ? "border-indigo-400 bg-indigo-500" : "border-zinc-600"}`}
                style={{ display: "inline-flex" }}
              >
                {selected === i && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        disabled={selected === null}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all"
      >
        {tx.next} <ArrowRight size={15} />
      </button>
    </div>
  );
}

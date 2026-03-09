"use client";

import { useState, useRef } from "react";
import { Bot, Calendar, HelpCircle, Target, Globe, ArrowDown, ExternalLink, Sparkles, SplitSquareHorizontal, BarChart2, ImageIcon, Layers, TrendingUp, Mail } from "lucide-react";
import ChatDemo from "./_components/ChatDemo";
import BookingDemo from "./_components/BookingDemo";
import FaqDemo from "./_components/FaqDemo";
import LeadDemo from "./_components/LeadDemo";
import BeforeAfterSlider from "./_components/BeforeAfterSlider";
import AnalyticsDashboard from "./_components/AnalyticsDashboard";
import ImageGenDemo from "./_components/ImageGenDemo";
import BranchenSwitcher from "./_components/BranchenSwitcher";
import AnimatedStats from "./_components/AnimatedStats";
import KontaktFormDemo from "./_components/KontaktFormDemo";

type Lang = "de" | "en";

const TX = {
  de: {
    badge: "KI-Features Demo",
    hero: {
      h1a: "Ihre Website.",
      h1b: "Intelligent.",
      sub: "KI-Chatbots, smarte Terminbuchung, automatische FAQ und Lead-Qualifizierung aus einer Hand. Sehen Sie live, was KI für Ihr Unternehmen tun kann.",
      cta: "Features entdecken",
    },
    sections: [
      {
        id: "chatbot",
        num: "01",
        icon: Bot,
        color: "indigo",
        label: "KI-Chatbot",
        title: "Ihr Assistent. Rund um die Uhr.",
        sub: "Beantworten Sie häufige Fragen automatisch – 24/7, ohne Wartezeit. Der Chatbot kennt Ihre Preise, Öffnungszeiten und Prozesse.",
      },
      {
        id: "buchung",
        num: "02",
        icon: Calendar,
        color: "violet",
        label: "Terminbuchung",
        title: "Smarte Terminverwaltung.",
        sub: "Kunden buchen selbstständig ihren Wunschtermin. Die KI empfiehlt den optimalen Zeitslot basierend auf Verfügbarkeit und Auslastung.",
      },
      {
        id: "faq",
        num: "03",
        icon: HelpCircle,
        color: "purple",
        label: "FAQ-Assistent",
        title: "Wissen. Sofort abrufbar.",
        sub: "Ein intelligenter FAQ-Assistent filtert die passenden Antworten in Echtzeit während der Nutzer tippt. Weniger Support-Aufwand für Sie.",
      },
      {
        id: "leads",
        num: "04",
        icon: Target,
        color: "fuchsia",
        label: "Lead-Qualifizierung",
        title: "Qualifizierte Leads. Automatisch.",
        sub: "Ein smarter Fragebogen ermittelt in 4 Schritten, wie gut ein Besucher als Kunde passt. Sie sehen sofort: Hot Lead, Warm Lead oder Info-Lead.",
      },
      {
        id: "slider",
        num: "05",
        icon: SplitSquareHorizontal,
        color: "indigo",
        label: "Vorher / Nachher",
        title: "Der Unterschied. Sichtbar.",
        sub: "Ziehen Sie den Slider und sehen Sie live, was eine moderne Website ausmacht. Von veraltet zu professionell – in einem Drag.",
      },
      {
        id: "analytics",
        num: "06",
        icon: BarChart2,
        color: "violet",
        label: "Live Analytics",
        title: "Daten. In Echtzeit.",
        sub: "Ein vollständiges Analytics-Dashboard wie es auf Ihrer Website läuft. Besucher, Conversions, Traffic-Quellen – alles im Blick.",
      },
      {
        id: "imagegen",
        num: "07",
        icon: ImageIcon,
        color: "purple",
        label: "KI-Bildgenerierung",
        title: "Bilder auf Knopfdruck.",
        sub: "Beschreiben Sie ein Bild in Worten – die KI generiert es. Ideal für Website-Content, Social Media und Marketing-Materialien.",
      },
      {
        id: "branchen",
        num: "08",
        icon: Layers,
        color: "indigo",
        label: "Branchen-Preview",
        title: "Ihre Branche. Ihr Design.",
        sub: "Wählen Sie Ihre Branche und sehen Sie live wie eine maßgeschneiderte Website für Sie aussehen würde.",
      },
      {
        id: "stats",
        num: "09",
        icon: TrendingUp,
        color: "purple",
        label: "Unsere Zahlen",
        title: "Fakten. Die überzeugen.",
        sub: "Zahlen sprechen für sich. Scrollen Sie herunter und sehen Sie unsere Ergebnisse in Aktion.",
      },
      {
        id: "kontakt",
        num: "10",
        icon: Mail,
        color: "fuchsia",
        label: "KI-Kontaktformular",
        title: "Schreiben Sie uns. Die KI antwortet.",
        sub: "Senden Sie eine Anfrage und erleben Sie wie unsere KI sofort eine personalisierte Antwort mit Paket-Empfehlung generiert.",
      },
    ],
    footer: {
      by: "Entwickelt von",
      tag: "KI-gestützte Web-Lösungen für Ihr Unternehmen",
      cta: "Eigene KI-Features anfragen",
    },
    langBtn: "EN",
  },
  en: {
    badge: "AI Features Demo",
    hero: {
      h1a: "Your Website.",
      h1b: "Intelligent.",
      sub: "AI chatbots, smart scheduling, automatic FAQ and lead qualification in one solution. See live what AI can do for your business.",
      cta: "Discover features",
    },
    sections: [
      {
        id: "chatbot",
        num: "01",
        icon: Bot,
        color: "indigo",
        label: "AI Chatbot",
        title: "Your assistant. Around the clock.",
        sub: "Answer common questions automatically – 24/7, without waiting time. The chatbot knows your prices, opening hours and processes.",
      },
      {
        id: "buchung",
        num: "02",
        icon: Calendar,
        color: "violet",
        label: "Appointment Booking",
        title: "Smart appointment management.",
        sub: "Customers book their preferred appointment independently. AI recommends the optimal time slot based on availability and workload.",
      },
      {
        id: "faq",
        num: "03",
        icon: HelpCircle,
        color: "purple",
        label: "FAQ Assistant",
        title: "Knowledge. Instantly accessible.",
        sub: "An intelligent FAQ assistant filters the right answers in real time as the user types. Less support effort for you.",
      },
      {
        id: "leads",
        num: "04",
        icon: Target,
        color: "fuchsia",
        label: "Lead Qualification",
        title: "Qualified leads. Automatically.",
        sub: "A smart questionnaire determines in 4 steps how well a visitor fits as a customer. You immediately see: Hot Lead, Warm Lead or Info Lead.",
      },
      {
        id: "slider",
        num: "05",
        icon: SplitSquareHorizontal,
        color: "indigo",
        label: "Before / After",
        title: "The difference. Visible.",
        sub: "Drag the slider and see live what a modern website looks like. From outdated to professional – in one drag.",
      },
      {
        id: "analytics",
        num: "06",
        icon: BarChart2,
        color: "violet",
        label: "Live Analytics",
        title: "Data. In real time.",
        sub: "A complete analytics dashboard as it runs on your website. Visitors, conversions, traffic sources – all at a glance.",
      },
      {
        id: "imagegen",
        num: "07",
        icon: ImageIcon,
        color: "purple",
        label: "AI Image Generation",
        title: "Images at the push of a button.",
        sub: "Describe an image in words – the AI generates it. Ideal for website content, social media and marketing materials.",
      },
      {
        id: "branchen",
        num: "08",
        icon: Layers,
        color: "indigo",
        label: "Industry Preview",
        title: "Your industry. Your design.",
        sub: "Select your industry and see live what a tailored website would look like for you.",
      },
      {
        id: "stats",
        num: "09",
        icon: TrendingUp,
        color: "purple",
        label: "Our Numbers",
        title: "Facts. That convince.",
        sub: "Numbers speak for themselves. Scroll down and see our results in action.",
      },
      {
        id: "kontakt",
        num: "10",
        icon: Mail,
        color: "fuchsia",
        label: "AI Contact Form",
        title: "Write to us. The AI responds.",
        sub: "Send an inquiry and experience how our AI instantly generates a personalized response with package recommendation.",
      },
    ],
    footer: {
      by: "Developed by",
      tag: "AI-powered web solutions for your business",
      cta: "Request your own AI features",
    },
    langBtn: "DE",
  },
};

const colorMap: Record<string, { pill: string; border: string; glow: string; icon: string; num: string }> = {
  indigo: {
    pill: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    glow: "bg-indigo-600",
    icon: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    num: "text-indigo-500",
  },
  violet: {
    pill: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    border: "border-violet-500/20 hover:border-violet-500/40",
    glow: "bg-violet-600",
    icon: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    num: "text-violet-500",
  },
  purple: {
    pill: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    border: "border-purple-500/20 hover:border-purple-500/40",
    glow: "bg-purple-600",
    icon: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    num: "text-purple-500",
  },
  fuchsia: {
    pill: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
    border: "border-fuchsia-500/20 hover:border-fuchsia-500/40",
    glow: "bg-fuchsia-600",
    icon: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    num: "text-fuchsia-500",
  },
};

export default function DemoPage() {
  const [lang, setLang] = useState<Lang>("de");
  const featuresRef = useRef<HTMLDivElement>(null);
  const tx = TX[lang];

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#060610] text-white overflow-x-hidden">

      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLang(l => l === "de" ? "en" : "de")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur text-zinc-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
        >
          <Globe size={14} />
          {tx.langBtn}
        </button>
      </div>

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-fuchsia-600/8 blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 animate-pulse">
          <Sparkles size={14} />
          {tx.badge} · Contexflow AI
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 tracking-tight">
          <span className="text-white">{tx.hero.h1a}</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
            {tx.hero.h1b}
          </span>
        </h1>

        {/* Sub */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          {tx.hero.sub}
        </p>

        {/* CTA */}
        <button
          onClick={scrollToFeatures}
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm transition-all hover:scale-105 shadow-2xl shadow-indigo-500/30"
        >
          {tx.hero.cta}
          <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* SECTIONS */}
      <div ref={featuresRef} className="relative max-w-5xl mx-auto px-6 py-16 space-y-32">
        {tx.sections.map((section, idx) => {
          const c = colorMap[section.color];
          const Icon = section.icon;
          return (
            <section key={section.id} id={section.id}>
              {/* Section Header */}
              <div className="flex items-start gap-4 mb-8">
                <span className={`text-5xl font-black ${c.num} opacity-30 leading-none tabular-nums`}>
                  {section.num}
                </span>
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-3 ${c.pill}`}>
                    <Icon size={11} />
                    {section.label}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{section.title}</h2>
                  <p className="text-zinc-400 text-base leading-relaxed max-w-xl">{section.sub}</p>
                </div>
              </div>

              {/* Demo Card */}
              <div className={`rounded-3xl border bg-white/[0.02] backdrop-blur p-6 md:p-8 transition-colors ${c.border}`}>
                {section.id === "chatbot" && <ChatDemo lang={lang} />}
                {section.id === "buchung" && <BookingDemo lang={lang} />}
                {section.id === "faq" && <FaqDemo lang={lang} />}
                {section.id === "leads" && <LeadDemo lang={lang} />}
                {section.id === "slider" && <BeforeAfterSlider lang={lang} />}
                {section.id === "analytics" && <AnalyticsDashboard lang={lang} />}
                {section.id === "imagegen" && <ImageGenDemo lang={lang} />}
                {section.id === "branchen" && <BranchenSwitcher lang={lang} />}
                {section.id === "stats" && <AnimatedStats lang={lang} />}
                {section.id === "kontakt" && <KontaktFormDemo lang={lang} />}
              </div>
            </section>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-zinc-500 text-sm">{tx.footer.by}</span>
              <a
                href="https://contexflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                Contexflow AI <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-zinc-600 text-xs">{tx.footer.tag}</p>
          </div>
          <a
            href="https://contexflow.com/kontakt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30"
          >
            {tx.footer.cta} <ExternalLink size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}

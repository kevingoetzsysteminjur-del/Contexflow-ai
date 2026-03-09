"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, TrendingDown, Zap, Star } from "lucide-react";

type Lang = "de" | "en";

const STATS = {
  de: [
    { icon: Clock, value: "24/7", label: "Erreichbar", sub: "Ihr KI-Assistent schläft nie.", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", isText: true },
    { icon: TrendingDown, value: 60, suffix: "%", label: "Weniger Support-Aufwand", sub: "Häufige Fragen beantwortet die KI automatisch.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
    { icon: Zap, value: 7, suffix: " Tage", label: "Ø Lieferzeit", sub: "Von der Anfrage zur fertigen Website.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { icon: Star, value: 100, suffix: "%", label: "Eigentum des Kunden", sub: "Code, Domain & Hosting gehören Ihnen.", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" },
  ],
  en: [
    { icon: Clock, value: "24/7", label: "Available", sub: "Your AI assistant never sleeps.", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", isText: true },
    { icon: TrendingDown, value: 60, suffix: "%", label: "Less support effort", sub: "Common questions answered automatically by AI.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
    { icon: Zap, value: 7, suffix: " days", label: "Avg. delivery time", sub: "From inquiry to finished website.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { icon: Star, value: 100, suffix: "%", label: "Client ownership", sub: "Code, domain & hosting belong to you.", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" },
  ],
};

function useCountUp(target: number, active: boolean, suffix = "") {
  const [display, setDisplay] = useState("0" + suffix);
  useEffect(() => {
    if (!active) return;
    const dur = 1800, steps = 60;
    let t = 0;
    const iv = setInterval(() => {
      t++;
      const progress = 1 - Math.pow(1 - t / steps, 3);
      const cur = Math.round(target * progress);
      setDisplay(cur + suffix);
      if (t >= steps) clearInterval(iv);
    }, dur / steps);
    return () => clearInterval(iv);
  }, [target, active, suffix]);
  return display;
}

function StatCard({ stat, active }: { stat: typeof STATS.de[0]; active: boolean }) {
  const Icon = stat.icon;
  const val = useCountUp(
    typeof stat.value === "number" ? stat.value : 0,
    active,
    (stat as any).suffix ?? ""
  );
  const display = (stat as any).isText ? stat.value : val;

  return (
    <div className={`rounded-2xl border ${stat.border} ${stat.bg} p-7 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform duration-300`}>
      <div className={`w-12 h-12 rounded-2xl ${stat.bg} border ${stat.border} flex items-center justify-center ${stat.color}`}>
        <Icon size={22} />
      </div>
      <div className={`text-5xl font-black ${stat.color} tabular-nums leading-none`}>
        {display}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{stat.label}</p>
        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{stat.sub}</p>
      </div>
    </div>
  );
}

export default function AnimatedStats({ lang }: { lang: Lang }) {
  const stats = STATS[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => <StatCard key={i} stat={s} active={active} />)}
    </div>
  );
}

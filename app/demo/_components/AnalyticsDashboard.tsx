"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Eye, Clock, Zap } from "lucide-react";

type Lang = "de" | "en";

const TX = {
  de: {
    live: "LIVE",
    metrics: [
      { label: "Besucher heute", icon: Users, value: 247, suffix: "", color: "text-indigo-400" },
      { label: "Seitenaufrufe", icon: Eye, value: 1839, suffix: "", color: "text-violet-400" },
      { label: "Verweildauer", icon: Clock, value: 3, suffix: " Min.", color: "text-purple-400" },
      { label: "Conversion Rate", icon: TrendingUp, value: 4.7, suffix: "%", color: "text-fuchsia-400", decimal: true },
    ],
    chart: "Besucher der letzten 24h",
    vsYesterday: "vs. gestern",
    sources: "Traffic-Quellen",
    sourceList: [
      { label: "Organische Suche", pct: 48, color: "bg-indigo-500" },
      { label: "Direktzugriff", pct: 27, color: "bg-violet-500" },
      { label: "Social Media", pct: 15, color: "bg-purple-500" },
      { label: "Referral", pct: 10, color: "bg-fuchsia-500" },
    ],
  },
  en: {
    live: "LIVE",
    metrics: [
      { label: "Visitors today", icon: Users, value: 247, suffix: "", color: "text-indigo-400" },
      { label: "Page views", icon: Eye, value: 1839, suffix: "", color: "text-violet-400" },
      { label: "Avg. duration", icon: Clock, value: 3, suffix: " min", color: "text-purple-400" },
      { label: "Conversion rate", icon: TrendingUp, value: 4.7, suffix: "%", color: "text-fuchsia-400", decimal: true },
    ],
    chart: "Visitors last 24h",
    vsYesterday: "vs. yesterday",
    sources: "Traffic sources",
    sourceList: [
      { label: "Organic search", pct: 48, color: "bg-indigo-500" },
      { label: "Direct", pct: 27, color: "bg-violet-500" },
      { label: "Social media", pct: 15, color: "bg-purple-500" },
      { label: "Referral", pct: 10, color: "bg-fuchsia-500" },
    ],
  },
};

const RAW_DATA = [8,12,6,9,18,24,31,27,19,38,52,48,61,55,72,68,85,79,91,83,76,64,47,32];
const W = 400, H = 80;
function buildPath(data: number[]) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - (v / max) * H * 0.9 - H * 0.05,
  ]);
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
}

function useCountUp(target: number, decimal = false, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1500, steps = 60;
    const inc = target / steps;
    let cur = 0, t = 0;
    const iv = setInterval(() => {
      t++;
      cur = Math.min(target, target * (1 - Math.pow(1 - t / steps, 3)));
      setVal(cur);
      if (t >= steps) clearInterval(iv);
    }, dur / steps);
    return () => clearInterval(iv);
  }, [target, active]);
  return decimal ? val.toFixed(1) : Math.round(val).toLocaleString("de-DE");
}

function Metric({ metric, active, vsYesterday }: { metric: typeof TX.de.metrics[0]; active: boolean; vsYesterday: string }) {
  const Icon = metric.icon;
  const val = useCountUp(metric.value, (metric as any).decimal, active);
  const pct = useRef((Math.random() * 15 + 3).toFixed(1));
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 text-xs">{metric.label}</span>
        <div className={`w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${metric.color}`}>
          <Icon size={13} />
        </div>
      </div>
      <span className={`text-3xl font-black ${metric.color}`}>
        {val}{metric.suffix}
      </span>
      <span className="text-emerald-400 text-xs flex items-center gap-1">
        <TrendingUp size={10} /> +{pct.current}% {vsYesterday}
      </span>
    </div>
  );
}

export default function AnalyticsDashboard({ lang }: { lang: Lang }) {
  const tx = TX[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pathLen, setPathLen] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (active && pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, [active]);

  const path = buildPath(RAW_DATA);
  const areaPath = path + ` L${W},${H} L0,${H} Z`;

  return (
    <div ref={ref} className="space-y-6">
      {/* Live badge */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {tx.live}
        </span>
        <span className="text-zinc-600 text-xs">Simulierte Echtzeit-Daten</span>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tx.metrics.map((m, i) => <Metric key={i} metric={m} active={active} vsYesterday={tx.vsYesterday} />)}
      </div>

      {/* Chart + Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-zinc-400 text-xs font-semibold mb-4">{tx.chart}</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#chartGrad)" />
            <path
              ref={pathRef}
              d={path}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={pathLen > 0 ? {
                strokeDasharray: pathLen,
                strokeDashoffset: active ? 0 : pathLen,
                transition: "stroke-dashoffset 1.8s ease",
              } : {}}
            />
          </svg>
          <div className="flex justify-between text-zinc-600 text-xs mt-2">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
          </div>
        </div>

        {/* Sources */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-zinc-400 text-xs font-semibold mb-4">{tx.sources}</p>
          <div className="space-y-3">
            {tx.sourceList.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">{s.label}</span>
                  <span className="text-zinc-300 font-semibold">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color} transition-all duration-[1500ms] ease-out`}
                    style={{ width: active ? `${s.pct}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

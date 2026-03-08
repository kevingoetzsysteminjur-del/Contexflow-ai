import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Preise", href: "/preise" },
  { label: "Uber uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#08080f] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding */}
        <div>
          <p className="text-white font-bold text-lg mb-1">Contexflow AI</p>
          <p className="text-cyan-400/70 text-xs uppercase tracking-widest mb-4">Kevin Goetz · Context Engineer</p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Websites die verkaufen.<br />Context der funktioniert.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-zinc-300 font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</p>
          <ul className="space-y-2">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-zinc-500 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1 group">
                  {label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <p className="text-zinc-300 font-semibold text-sm mb-4 uppercase tracking-wider">Kontakt</p>
          <div className="space-y-3">
            <a href="mailto:contexflow.ai@gmx.net" className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 text-sm transition-colors">
              <Mail size={14} />
              contexflow.ai@gmx.net
            </a>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <MapPin size={14} />
              Mosbach, Neckar-Odenwald-Kreis
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-zinc-500 text-xs">© 2026 Contexflow AI · Kevin Goetz · Mosbach</p>
        <div className="flex items-center gap-4">
          <Link href="/impressum" className="text-zinc-400 hover:text-cyan-400 text-xs transition-colors">Impressum</Link>
          <span className="text-zinc-700">·</span>
          <Link href="/datenschutz" className="text-zinc-400 hover:text-cyan-400 text-xs transition-colors">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}

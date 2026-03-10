"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/projekte", label: "Projekte" },
  { href: "/preise", label: "Preise" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <WolfLogo />
          <div>
            <p className="text-white font-bold text-sm leading-tight tracking-wide" style={{ fontFamily: "var(--font-logo)" }}>Contexflow AI</p>
            <p className="text-cyan-400/70 text-[10px] leading-tight tracking-widest uppercase">Context Engineering</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "text-cyan-400 bg-cyan-400/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="hidden md:inline-flex px-4 py-2 rounded-lg border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400 font-semibold text-sm transition-all"
          >
            ✦ Demo
          </Link>
          <Link
            href="/kontakt"
            className="hidden md:inline-flex px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-900 font-semibold text-sm transition-colors"
          >
            Projekt starten
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#05050a]/95 backdrop-blur-xl px-6 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setOpen(false)}
            className="block mt-3 px-4 py-2.5 rounded-lg border border-indigo-500/40 text-indigo-300 font-semibold text-sm text-center"
          >
            ✦ Demo
          </Link>
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-2.5 rounded-lg bg-cyan-500 text-zinc-900 font-semibold text-sm text-center"
          >
            Projekt starten
          </Link>
        </div>
      )}
    </header>
  );
}

function WolfLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="18" cy="18" r="17" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
      {/* Wolf head - geometric */}
      <path d="M10 8 L14 16 L10 16 L18 28 L26 16 L22 16 L26 8 L20 12 L18 6 L16 12 Z" fill="#22d3ee" fillOpacity="0.9" />
      {/* Eyes */}
      <circle cx="15" cy="19" r="1.5" fill="#05050a" />
      <circle cx="21" cy="19" r="1.5" fill="#05050a" />
    </svg>
  );
}

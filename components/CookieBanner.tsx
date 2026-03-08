"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed bottom-0 left-0 right-0 bg-[#0a0a14] border-t border-cyan-400/20 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl"
    >
      <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
        Diese Website verwendet ausschließlich technisch notwendige Cookies.{" "}
        <Link href="/datenschutz" className="text-cyan-400 hover:underline">
          Datenschutzerklärung
        </Link>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 border border-white/10 rounded-lg transition-colors"
        >
          Ablehnen
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 text-sm font-semibold text-[#05050a] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function CookieBanner() {
  const { t } = useLang();
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
      style={{ zIndex: 9999, background: "var(--bg-card)", borderTop: "1px solid var(--border-color)" }}
      className="fixed bottom-0 left-0 right-0 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl"
    >
      <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
        {t.cookie.text}{" "}
        <Link href="/datenschutz" style={{ color: "#6366F1" }}>
          {t.footer.privacy}
        </Link>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="px-4 py-2 text-sm rounded-lg transition-colors"
          style={{ color: "var(--text-tertiary)", border: "1px solid var(--border-color)", background: "transparent" }}
        >
          {t.cookie.decline}
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          style={{ background: "#6366F1", color: "#fff" }}
        >
          {t.cookie.accept}
        </button>
      </div>
    </div>
  );
}

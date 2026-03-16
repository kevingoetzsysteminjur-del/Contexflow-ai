"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, t, setLang } = useLang();

  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/leistungen", label: t.nav.services },
    { href: "/ueber-uns", label: t.nav.about },
    { href: "/kontakt", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        @media (max-width: 639px) { .nav-desktop { display: none !important; } }
        @media (min-width: 640px) { .nav-mobile-btn { display: none !important; } }
        .theme-toggle-btn:hover { background: var(--border-color) !important; }
        .lang-btn { background: none; border: none; cursor: pointer; padding: 2px 4px; font-size: 11px; letter-spacing: 0.1em; font-family: inherit; transition: color 0.2s ease; }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: 64,
          background: scrolled ? "var(--bg-navbar)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 2.5rem)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 12,
              letterSpacing: "0.3em",
              fontWeight: 300,
              color: "var(--text-primary)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            CONTEXFLOW
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: pathname === link.href ? "#6366F1" : "var(--text-tertiary)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <button
                className="lang-btn"
                onClick={() => setLang("de")}
                style={{ color: lang === "de" ? "var(--text-primary)" : "var(--text-tertiary)", fontWeight: lang === "de" ? 600 : 400 }}
                title="Deutsch"
              >
                DE
              </button>
              <span style={{ color: "var(--border-color)", fontSize: 11 }}>|</span>
              <button
                className="lang-btn"
                onClick={() => setLang("en")}
                style={{ color: lang === "en" ? "var(--text-primary)" : "var(--text-tertiary)", fontWeight: lang === "en" ? 600 : 400 }}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Theme toggle */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              style={{
                background: "none",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
                padding: "6px 8px",
                borderRadius: 8,
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link
              href="/kontakt"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #6366F1",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 11,
                letterSpacing: "0.1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "background 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              CF
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "flex-end",
            }}
            aria-label="Menu"
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 1,
                background: "var(--text-primary)",
                transformOrigin: "center",
                transition: "transform 0.3s ease",
                transform: open ? "rotate(45deg) translateY(4.5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: open ? 24 : 16,
                height: 1,
                background: "#6366F1",
                transformOrigin: "center",
                transition: "transform 0.3s ease, width 0.3s ease",
                transform: open ? "rotate(-45deg) translateY(-4.5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--bg-primary)",
              zIndex: 9990,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: "clamp(2.5rem, 7vw, 4rem)",
                    fontWeight: 200,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: pathname === link.href ? "#6366F1" : "var(--text-primary)",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = pathname === link.href ? "#6366F1" : "var(--text-primary)";
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile: language + theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <button
                className="lang-btn"
                onClick={() => setLang("de")}
                style={{ color: lang === "de" ? "var(--text-primary)" : "var(--text-tertiary)", fontWeight: lang === "de" ? 600 : 400, fontSize: 14 }}
              >
                DE
              </button>
              <span style={{ color: "var(--text-tertiary)" }}>|</span>
              <button
                className="lang-btn"
                onClick={() => setLang("en")}
                style={{ color: lang === "en" ? "var(--text-primary)" : "var(--text-tertiary)", fontWeight: lang === "en" ? 600 : 400, fontSize: 14 }}
              >
                EN
              </button>
              <button
                onClick={toggleTheme}
                style={{
                  background: "none",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: 6,
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/projekte", label: "Projekte" },
  { href: "/preise", label: "Preise" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "64px",
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #111120" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          padding: "0 clamp(1rem, 3vw, 2rem)",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/contexflow-logo.svg"
            alt="Contexflow AI"
            width={130}
            height={38}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 2.5vw, 2rem)",
          }}
          className="desktop-nav"
        >
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: active ? "#6366F1" : "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = "white"; }}
                onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = "#6B7280"; }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            padding: "8px",
          }}
          className="mobile-toggle"
          aria-label="Menu"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span style={{ width: 22, height: 1, background: open ? "transparent" : "white", transition: "all 0.3s", display: "block", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span style={{ width: 22, height: 1, background: "white", transition: "all 0.3s", display: "block", transform: open ? "rotate(-45deg)" : "none" }} />
            {!open && <span style={{ width: 14, height: 1, background: "#6366F1", display: "block" }} />}
          </div>
        </button>
      </header>

      {/* Mobile fullscreen overlay */}
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
              background: "#050508",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={href}
                  style={{
                    fontFamily: "var(--font-heading), sans-serif",
                    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                    fontWeight: 200,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: pathname === href ? "#6366F1" : "white",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#374151", textTransform: "uppercase", marginTop: "1rem" }}
            >
              Contexflow AI · Mosbach
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 639px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}

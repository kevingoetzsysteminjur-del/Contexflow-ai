"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "START" },
  { href: "/leistungen", label: "SERVICES" },
  { href: "/ueber-uns", label: "ABOUT" },
  { href: "/kontakt", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: 64,
          background: scrolled ? "rgba(3,3,5,0.85)" : "transparent",
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
              color: "#F5F5F7",
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
                  color: pathname === link.href ? "#6366F1" : "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = "#6B7280";
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/kontakt"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #6366F1",
                background: "transparent",
                color: "#F5F5F7",
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
                background: "#F5F5F7",
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
              background: "#030305",
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
                    color: pathname === link.href ? "#6366F1" : "#F5F5F7",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6366F1"; }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = pathname === link.href ? "#6366F1" : "#F5F5F7";
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

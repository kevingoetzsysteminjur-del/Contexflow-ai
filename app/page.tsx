"use client";

import HeroSection from "@/components/home/HeroSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import ServicesSection from "@/components/home/ServicesSection";
import WasIchBaue from "@/components/home/WasIchBaue";
import MarqueeStats from "@/components/home/MarqueeStats";
import TechStack from "@/components/home/TechStack";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <ServicesSection />
      <WasIchBaue />
      <MarqueeStats />
      <TechStack />
      <ProcessSection />

      {/* Referenzen */}
      <section
        style={{
          background: "#0A0A0F",
          padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
          textAlign: "center",
          borderTop: "1px solid #0d0d18",
        }}
      >
        <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)",
              fontWeight: 200,
              color: "#6B7280",
              letterSpacing: "0.05em",
              lineHeight: 1.7,
            }}
          >
            3 Kunden. 6 Projekte. Details persönlich.
          </p>
          <a
            href="/kontakt"
            style={{
              display: "inline-block",
              marginTop: "1.75rem",
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6366F1",
              textDecoration: "none",
              transition: "opacity 0.4s ease",
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.opacity = "0.6")}
            onMouseLeave={e => ((e.target as HTMLElement).style.opacity = "1")}
          >
            Projekt starten →
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}

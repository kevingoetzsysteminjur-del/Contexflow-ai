import HeroSection from "@/components/home/HeroSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
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
      <ProjectsSection />
      <MarqueeStats />
      <TechStack />
      <ProcessSection />

      {/* Testimonial placeholder */}
      <section
        style={{
          background: "#050508",
          padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
          textAlign: "center",
          borderTop: "1px solid #111120",
        }}
      >
        <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              fontWeight: 200,
              color: "white",
              letterSpacing: "0.05em",
              lineHeight: 1.6,
            }}
          >
            &ldquo;Die besten Referenzen sind meine Live-Projekte.&rdquo;
          </p>
          <p style={{ marginTop: "1.5rem", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#374151" }}>
            — Kevin Götz
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

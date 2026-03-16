"use client";
import HeroSection from "@/components/home/HeroSection";
import UrgencyBanner from "@/components/home/UrgencyBanner";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import WebsiteCheckSection from "@/components/home/WebsiteCheckSection";
import StatsSection from "@/components/home/StatsSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import TechStack from "@/components/home/TechStack";
import ProjectsSection from "@/components/home/ProjectsSection";
import SectionCTA from "@/components/home/SectionCTA";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import PerformanceSection from "@/components/home/PerformanceSection";
import ProcessSection from "@/components/home/ProcessSection";
import ROIRechner from "@/components/home/ROIRechner";
import PricingSection from "@/components/home/PricingSection";
import VergleichsTabelle from "@/components/home/VergleichsTabelle";
import GarantieSection from "@/components/home/GarantieSection";
import SocialProof from "@/components/home/SocialProof";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <UrgencyBanner />
      <MarqueeBanner />
      <WebsiteCheckSection />
      <StatsSection />
      <ManifestoSection />
      <WhatIBuild />
      <TechStack />
      <ProjectsSection />
      <SectionCTA
        text="Alle Projekte ansehen – Lass dich inspirieren →"
        href="/projekte"
        variant="secondary"
      />
      <BeforeAfterSection />
      <PerformanceSection />
      <ProcessSection />
      <ROIRechner />
      <SectionCTA
        text="Klingt gut? Lass uns reden →"
        href="/kontakt"
        variant="primary"
      />
      <PricingSection />
      <SectionCTA
        text="Welches Paket passt zu dir? Lass uns reden."
        href="/kontakt"
        variant="primary"
      />
      <VergleichsTabelle />
      <SectionCTA
        text="Jetzt Projekt anfragen"
        href="/kontakt"
        variant="primary"
      />
      <GarantieSection />
      <SocialProof />
      <CTASection />
    </>
  );
}

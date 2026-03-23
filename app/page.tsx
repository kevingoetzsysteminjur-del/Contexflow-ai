"use client";
import HeroSection from "@/components/home/HeroSection";
import UrgencyBanner from "@/components/home/UrgencyBanner";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import WebsiteCheckSection from "@/components/home/WebsiteCheckSection";
import StatsSection from "@/components/home/StatsSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import RealProjectsSection from "@/components/home/RealProjectsSection";
import CaseStudySection from "@/components/home/CaseStudySection";
import DemoSection from "@/components/home/DemoSection";
import TechStack from "@/components/home/TechStack";
import SectionCTA from "@/components/home/SectionCTA";
import ProcessSection from "@/components/home/ProcessSection";
import ROIRechner from "@/components/home/ROIRechner";
import PricingSection from "@/components/home/PricingSection";
import VergleichsTabelle from "@/components/home/VergleichsTabelle";
import GarantieSection from "@/components/home/GarantieSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import CTASection from "@/components/home/CTASection";
import { useLang } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <HeroSection />
      <UrgencyBanner />
      <MarqueeBanner />
      <WebsiteCheckSection />
      <StatsSection />
      <ManifestoSection />
      <WhatIBuild />
      <RealProjectsSection />
      <CaseStudySection />
      <DemoSection />
      <TechStack />
      <ProcessSection />
      <ROIRechner />
      <SectionCTA
        text={t.home.cta_roi}
        href="/kontakt"
        variant="primary"
      />
      <PricingSection />
      <SectionCTA
        text={t.home.cta_pricing}
        href="/kontakt"
        variant="primary"
      />
      <VergleichsTabelle />
      <SectionCTA
        text={t.home.cta_request}
        href="/kontakt"
        variant="primary"
      />
      <GarantieSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  );
}

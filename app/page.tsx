"use client";
import HeroSection from "@/components/home/HeroSection";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import ManifestoSection from "@/components/home/ManifestoSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import StatsSection from "@/components/home/StatsSection";
import TechStack from "@/components/home/TechStack";
import WebsiteCheckSection from "@/components/home/WebsiteCheckSection";
import ProcessSection from "@/components/home/ProcessSection";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import ROIRechner from "@/components/home/ROIRechner";
import PricingSection from "@/components/home/PricingSection";
import VergleichsTabelle from "@/components/home/VergleichsTabelle";
import SocialProof from "@/components/home/SocialProof";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <ManifestoSection />
      <WhatIBuild />
      <StatsSection />
      <WebsiteCheckSection />
      <TechStack />
      <ProcessSection />
      <BeforeAfterSection />
      <ROIRechner />
      <PricingSection />
      <VergleichsTabelle />
      <SocialProof />
      <CTASection />
    </>
  );
}

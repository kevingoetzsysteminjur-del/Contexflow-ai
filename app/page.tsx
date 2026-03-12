"use client";
import HeroSection from "@/components/home/HeroSection";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import ManifestoSection from "@/components/home/ManifestoSection";
import WhatIBuild from "@/components/home/WhatIBuild";
import StatsSection from "@/components/home/StatsSection";
import TechStack from "@/components/home/TechStack";
import ProcessSection from "@/components/home/ProcessSection";
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
      <TechStack />
      <ProcessSection />
      <SocialProof />
      <CTASection />
    </>
  );
}

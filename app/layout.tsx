import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import RainbowBackground from "@/components/RainbowBackground";
import ChatBot from "@/components/ChatBot";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Premium heading font — modern, distinctive, tech-forward
const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Clean, highly readable body font
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Logo + stats — geometric, strong
const syne = Syne({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contexflow AI – Websites die verkaufen",
  description: "Kevin Goetz, Context Engineer aus Mosbach. Webentwicklung, Context Engineering und AI-Integration für lokale Unternehmen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${bricolage.variable} ${dmSans.variable} ${syne.variable} antialiased bg-[#05050a]`}>
        <LoadingScreen />
        <RainbowBackground />
        <Navbar />
        <main className="pt-16" style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
        <CookieBanner />
        <ChatBot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

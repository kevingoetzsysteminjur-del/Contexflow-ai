import type { Metadata } from "next";
import { Space_Grotesk, Outfit, Syne, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import RainbowBackground from "@/components/RainbowBackground";
import ChatBot from "@/components/ChatBot";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const syne = Syne({
  variable: "--font-stats",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const orbitron = Orbitron({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Contexflow AI – Websites die verkaufen",
  description: "Kevin Goetz, Context Engineer aus Mosbach. Webentwicklung, Context Engineering und AI-Integration für lokale Unternehmen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${spaceGrotesk.variable} ${outfit.variable} ${syne.variable} ${orbitron.variable} antialiased bg-[#05050a]`}>
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

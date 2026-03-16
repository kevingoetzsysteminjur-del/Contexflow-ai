import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ChatBot from "@/components/ChatBot";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import LiveVisitorBadge from "@/components/LiveVisitorBadge";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import MobileStickyBar from "@/components/MobileStickyBar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contexflow AI – Digital Experiences",
  description:
    "Kevin Götz, Context Engineer aus Mosbach. Websites, AI Integration und Context Engineering für lokale Unternehmen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${inter.variable} antialiased`} style={{ background: "#030305" }}>
        <Preloader />
        <SmoothScroll />
        <Navbar />
        <main className="pt-16" style={{ position: "relative", zIndex: 1 }}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <ChatBot />
        <LiveVisitorBadge />
        <ExitIntentPopup />
        <MobileStickyBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

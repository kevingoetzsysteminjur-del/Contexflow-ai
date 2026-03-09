import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import RainbowBackground from "@/components/RainbowBackground";
import ChatBot from "@/components/ChatBot";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contexflow AI – Websites die verkaufen",
  description: "Kevin Goetz, Context Engineer aus Mosbach. Webentwicklung, Context Engineering und AI-Integration für lokale Unternehmen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05050a]`}>
        <RainbowBackground />
        <Navbar />
        <main className="pt-16" style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
        <CookieBanner />
        <ChatBot />
        <Analytics />
      </body>
    </html>
  );
}

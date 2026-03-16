import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Karlsruhe – Next.js Websites & KI für die Fächerstadt | Contexflow AI",
  description:
    "Webdesign in Karlsruhe. Individuelle Next.js Websites & KI-Integration für Unternehmen in Karlsruhe und der TechnologieRegion. Kevin Götz (Contexflow AI). Festpreis ab 500€.",
};

export default function WebdesignKarlsruheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

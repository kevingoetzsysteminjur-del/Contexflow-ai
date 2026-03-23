import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Heidelberg – Schnelle Next.js Websites für die Rhein-Neckar-Region | Contexflow AI",
  description:
    "Webdesign in Heidelberg und der Rhein-Neckar-Region. Kevin Götz (Contexflow AI) baut individuelle Next.js Websites & KI-Lösungen. Festpreis ab 1.000€, Lieferzeit unter 7 Tage.",
};

export default function WebdesignHeidelbergLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

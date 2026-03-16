import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Mosbach – Moderne Websites für den Neckar-Odenwald-Kreis | Contexflow AI",
  description:
    "Professionelles Webdesign in Mosbach. Kevin Götz (Contexflow AI) baut schnelle Next.js Websites & KI-Lösungen für Unternehmen im Neckar-Odenwald-Kreis. Festpreis ab 500€.",
};

export default function WebdesignMosbachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

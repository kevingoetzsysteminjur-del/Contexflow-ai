import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Heilbronn – Moderne Next.js Websites für die Weinstadt | Contexflow AI",
  description:
    "Webdesign in Heilbronn. Kevin Götz (Contexflow AI) baut schnelle, individuelle Websites & KI-Lösungen für Unternehmen in Heilbronn und der Region. Festpreis ab 1.000€.",
};

export default function WebdesignHeilbronnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

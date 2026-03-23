import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Stuttgart – Individuelle Next.js Websites für Baden-Württembergs Metropole | Contexflow AI",
  description:
    "Webdesign in Stuttgart. Kevin Götz (Contexflow AI) entwickelt moderne Next.js Websites & KI-Lösungen für Unternehmen in Stuttgart und der Region. Festpreis ab 1.000€, unter 7 Tage Lieferzeit.",
};

export default function WebdesignStuttgartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

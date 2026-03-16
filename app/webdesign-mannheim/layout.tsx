import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign Mannheim – Professionelle Websites & KI-Integration | Contexflow AI",
  description:
    "Webdesign in Mannheim. Kevin Götz (Contexflow AI) entwickelt moderne Next.js Websites & KI-Lösungen für Unternehmen in Mannheim und der Metropolregion Rhein-Neckar. Ab 500€ Festpreis.",
};

export default function WebdesignMannheimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

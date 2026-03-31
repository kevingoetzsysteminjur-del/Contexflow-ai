import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danke – Contexflow AI",
  robots: { index: false, follow: false },
};

export default function DankeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import de from "@/locales/de.json";
import en from "@/locales/en.json";

type Lang = "de" | "en";
type Translations = typeof de;

interface LangContextValue {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const translations = { de, en };

const LangContext = createContext<LangContextValue>({
  lang: "de",
  t: de,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "de" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

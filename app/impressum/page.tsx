import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Contexflow AI",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold text-white mb-2">Impressum</h1>
      <div className="w-12 h-0.5 bg-cyan-400 mb-10" />

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">Angaben gemäß § 5 TMG</h2>
        <p className="text-zinc-300 leading-relaxed">
          Kevin Goetz<br />
          Contexflow AI<br />
          <span className="text-zinc-500 italic">[Straße und Hausnummer — wird nach Gewerbeanmeldung ergänzt]</span><br />
          74821 Mosbach<br />
          Neckar-Odenwald-Kreis
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">Kontakt</h2>
        <p className="text-zinc-300 leading-relaxed">
          E-Mail:{" "}
          <a href="mailto:contexflow.ai@gmx.net" className="text-cyan-400 hover:underline">
            contexflow.ai@gmx.net
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">Steuernummer</h2>
        <p className="text-zinc-300 leading-relaxed">
          <span className="text-zinc-500 italic">[Steuernummer — wird nach Gewerbeanmeldung ergänzt]</span>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <p className="text-zinc-300 leading-relaxed">
          Kevin Goetz<br />
          <span className="text-zinc-500 italic">[Straße und Hausnummer]</span><br />
          74821 Mosbach
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">Streitschlichtung</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>
          <br /><br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">Haftung für Inhalte</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </section>
    </div>
  );
}

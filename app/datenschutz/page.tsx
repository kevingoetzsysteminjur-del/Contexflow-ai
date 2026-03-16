import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Contexflow AI",
  robots: { index: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "#06B6D4",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          lineHeight: 1.8,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <div
      style={{
        background: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(5rem,10vw,7rem)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Datenschutzerklärung
        </h1>
        <div
          style={{
            width: 48,
            height: 2,
            background: "#06B6D4",
            marginBottom: "3rem",
          }}
        />

        <Section title="1. Verantwortlicher">
          <p>Verantwortlicher im Sinne der DSGVO ist:</p>
          <p style={{ color: "var(--text-primary)" }}>
            Kevin Goetz · Contexflow AI
            <br />
            74821 Mosbach, Neckar-Odenwald-Kreis
            <br />
            E-Mail:{" "}
            <a
              href="mailto:contexflow.ai@gmx.net"
              style={{ color: "#06B6D4", textDecoration: "none" }}
            >
              contexflow.ai@gmx.net
            </a>
          </p>
        </Section>

        <Section title="2. Hosting (Vercel)">
          <p>
            Diese Website wird gehostet bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
            CA 94104, USA.
          </p>
          <p>
            Vercel verarbeitet beim Aufruf der Website automatisch sogenannte Server-Logfiles, die
            Ihr Browser übermittelt. Dazu gehören: IP-Adresse, Browsertyp und -version,
            verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Datum und
            Uhrzeit der Serveranfrage.
          </p>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse). Weitere Informationen finden Sie in der{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#06B6D4", textDecoration: "none" }}
            >
              Datenschutzerklärung von Vercel
            </a>
            .
          </p>
        </Section>

        <Section title="3. Kontaktformular">
          <p>
            Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
            dem Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
          </p>
          <p>
            Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung der in das
            Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit
            widerrufen.
          </p>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
            Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für
            die Datenspeicherung entfällt.
          </p>
        </Section>

        <Section title="4. Cookies">
          <p>
            Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den
            Betrieb der Website erforderlich sind (z. B. zur Speicherung Ihrer
            Cookie-Einstellungen).
          </p>
          <p>
            Wir verwenden keine Tracking-Cookies, keine Analyse-Cookies und keine Cookies von
            Drittanbietern zu Werbezwecken. Es werden keine personenbezogenen Daten über Cookies an
            Dritte weitergegeben.
          </p>
          <p>
            Die Rechtsgrundlage für technisch notwendige Cookies ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </Section>

        <Section title="5. SSL-Verschlüsselung">
          <p>
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
            vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte
            Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf
            „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
          <p>
            Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
            übermitteln, nicht von Dritten mitgelesen werden.
          </p>
        </Section>

        <Section title="6. Ihre Rechte">
          <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {[
              [
                "Auskunft (Art. 15 DSGVO)",
                "Sie haben das Recht, Auskunft über Ihre bei uns gespeicherten Daten zu erhalten.",
              ],
              [
                "Berichtigung (Art. 16 DSGVO)",
                "Sie haben das Recht, unrichtige Daten berichtigen zu lassen.",
              ],
              [
                "Löschung (Art. 17 DSGVO)",
                "Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen.",
              ],
              [
                "Einschränkung (Art. 18 DSGVO)",
                "Sie haben das Recht, die Verarbeitung Ihrer Daten einschränken zu lassen.",
              ],
              [
                "Widerspruch (Art. 21 DSGVO)",
                "Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen.",
              ],
              [
                "Datenübertragbarkeit (Art. 20 DSGVO)",
                "Sie haben das Recht, Ihre Daten in einem maschinenlesbaren Format zu erhalten.",
              ],
            ].map(([titel, text]) => (
              <li
                key={titel}
                style={{
                  borderLeft: "2px solid rgba(6,182,212,0.3)",
                  paddingLeft: "0.875rem",
                }}
              >
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{titel}:</span>{" "}
                {text}
              </li>
            ))}
          </ul>
          <p>
            Zur Geltendmachung Ihrer Rechte wenden Sie sich an:{" "}
            <a
              href="mailto:contexflow.ai@gmx.net"
              style={{ color: "#06B6D4", textDecoration: "none" }}
            >
              contexflow.ai@gmx.net
            </a>
          </p>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
            Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
          </p>
        </Section>

        <Section title="7. Aktualität">
          <p>
            Diese Datenschutzerklärung hat den Stand März 2026 und kann bei Bedarf aktualisiert
            werden.
          </p>
        </Section>
      </div>
    </div>
  );
}

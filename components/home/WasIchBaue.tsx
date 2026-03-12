"use client";

export default function WasIchBaue() {
  return (
    <section style={{ background: "#0A0A0F", padding: "clamp(4rem, 8vw, 7rem) 1.5rem" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <p style={{ color: "#6366F1", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          Was ich baue
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "#111120",
          }}
          className="mockup-grid"
        >
          {/* 01 — Website Mockup */}
          <div style={{ background: "#050508", padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", marginBottom: "1.25rem" }}>01 — Websites</p>

            {/* Laptop frame */}
            <div style={{ border: "1px solid #1a1a2e", borderRadius: "6px", padding: "10px", background: "#08080f", marginBottom: "1.25rem", overflow: "hidden" }}>
              {/* Browser bar */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "8px", alignItems: "center" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a1a2e", display: "block" }} />
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a1a2e", display: "block" }} />
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366F1", opacity: 0.4, display: "block" }} />
                <div style={{ flex: 1, height: 4, background: "#111120", borderRadius: 2, marginLeft: 4 }} />
              </div>
              {/* Website blocks */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ height: 20, background: "linear-gradient(90deg, #6366F120, transparent)", borderRadius: 2, animation: "wb-1 4s ease-in-out infinite" }} />
                <div style={{ height: 8, width: "70%", background: "#111120", borderRadius: 2, animation: "wb-2 4s ease-in-out infinite 0.3s" }} />
                <div style={{ height: 8, width: "50%", background: "#111120", borderRadius: 2, animation: "wb-2 4s ease-in-out infinite 0.5s" }} />
                <div style={{ height: 30, background: "#0d0d1a", borderRadius: 3, marginTop: 4, animation: "wb-3 4s ease-in-out infinite 0.7s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 40, height: 6, background: "#6366F1", borderRadius: 2, opacity: 0.6 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginTop: 4 }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <div key={i} style={{ height: 28, background: "#0d0d1a", borderRadius: 3, animation: `wb-3 4s ease-in-out infinite ${0.9 + d}s` }} />
                  ))}
                </div>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.7 }}>
              Moderne, blitzschnelle Seiten die Kunden konvertieren.
            </p>
          </div>

          {/* 02 — Chat Mockup */}
          <div style={{ background: "#050508", padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", marginBottom: "1.25rem" }}>02 — AI Integration</p>

            {/* Chat widget */}
            <div style={{ border: "1px solid #1a1a2e", borderRadius: "6px", padding: "10px", background: "#08080f", marginBottom: "1.25rem" }}>
              {/* Chat header */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingBottom: "8px", borderBottom: "1px solid #111120", marginBottom: "8px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366F1", boxShadow: "0 0 6px #6366F1" }} />
                <span style={{ fontSize: "10px", color: "#9CA3AF", letterSpacing: "0.1em" }}>KI-Assistent</span>
              </div>
              {/* Messages */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minHeight: "90px" }}>
                <div style={{ alignSelf: "flex-start", background: "#111120", borderRadius: "0 6px 6px 6px", padding: "5px 8px", fontSize: "10px", color: "#9CA3AF", animation: "msg-in 8s ease-in-out infinite", maxWidth: "80%" }}>
                  Hallo! Wie kann ich helfen?
                </div>
                <div style={{ alignSelf: "flex-end", background: "#6366F120", border: "1px solid #6366F130", borderRadius: "6px 0 6px 6px", padding: "5px 8px", fontSize: "10px", color: "#9CA3AF", animation: "msg-in 8s ease-in-out infinite 1.2s", maxWidth: "80%" }}>
                  Ich brauche eine Website.
                </div>
                <div style={{ alignSelf: "flex-start", background: "#111120", borderRadius: "0 6px 6px 6px", padding: "5px 8px", fontSize: "10px", color: "#9CA3AF", animation: "msg-in 8s ease-in-out infinite 2.4s", maxWidth: "80%" }}>
                  Perfekt! Was ist dein Ziel?
                </div>
                {/* Typing indicator */}
                <div style={{ alignSelf: "flex-start", background: "#111120", borderRadius: "0 6px 6px 6px", padding: "6px 10px", animation: "typing-pulse 8s ease-in-out infinite 3.6s", display: "flex", gap: "3px" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366F1", display: "block", animation: "dot-bounce 1.2s ease-in-out infinite" }} />
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366F1", display: "block", animation: "dot-bounce 1.2s ease-in-out infinite 0.2s" }} />
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366F1", display: "block", animation: "dot-bounce 1.2s ease-in-out infinite 0.4s" }} />
                </div>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.7 }}>
              Chatbots und Automatisierung die für dich arbeiten.
            </p>
          </div>

          {/* 03 — Dashboard Mockup */}
          <div style={{ background: "#050508", padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6366F1", marginBottom: "1.25rem" }}>03 — Context Engineering</p>

            {/* Dashboard */}
            <div style={{ border: "1px solid #1a1a2e", borderRadius: "6px", padding: "10px", background: "#08080f", marginBottom: "1.25rem" }}>
              {/* Mini stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 10 }}>
                {[["94%", "Genauigkeit"], ["3×", "Output"]].map(([val, lbl]) => (
                  <div key={lbl} style={{ background: "#111120", borderRadius: 3, padding: "4px 6px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#6366F1" }}>{val}</p>
                    <p style={{ fontSize: "8px", color: "#374151", letterSpacing: "0.1em", textTransform: "uppercase" }}>{lbl}</p>
                  </div>
                ))}
              </div>
              {/* Bar chart */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "60px" }}>
                {[
                  { h: "40%", d: "0s" },
                  { h: "70%", d: "0.2s" },
                  { h: "55%", d: "0.4s" },
                  { h: "90%", d: "0.6s" },
                  { h: "65%", d: "0.8s" },
                ].map((bar, i) => (
                  <div key={i} style={{ flex: 1, background: "#111120", borderRadius: "2px 2px 0 0", height: "100%", display: "flex", alignItems: "flex-end" }}>
                    <div
                      style={{
                        width: "100%",
                        background: `linear-gradient(to top, #6366F1, #818CF8)`,
                        borderRadius: "2px 2px 0 0",
                        animation: `bar-grow 6s ease-out infinite ${bar.d}`,
                        maxHeight: bar.h,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "5px", marginTop: 4 }}>
                {["Mo", "Di", "Mi", "Do", "Fr"].map(d => (
                  <p key={d} style={{ flex: 1, fontSize: "7px", color: "#374151", textAlign: "center" }}>{d}</p>
                ))}
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "#4B5563", lineHeight: 1.7 }}>
              AI-Systeme mit präzisem Kontext für bessere Ergebnisse.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wb-1 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes wb-2 {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        @keyframes wb-3 {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes msg-in {
          0% { opacity: 0; transform: translateY(6px); }
          8% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; }
          92% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes typing-pulse {
          0%, 45% { opacity: 0; }
          50% { opacity: 1; }
          80% { opacity: 1; }
          92% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes dot-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-3px); }
        }
        @keyframes bar-grow {
          0%, 5% { height: 0%; }
          50% { height: 100%; }
          90% { height: 100%; }
          98%, 100% { height: 0%; }
        }
        @media (max-width: 640px) {
          .mockup-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Contexflow AI | Webdesign & KI aus Mosbach",
  description: "Ehrliche Artikel zu Webdesign, KI-Integration und was lokale Unternehmen wirklich brauchen. Von Kevin Götz, Contexflow AI, Mosbach.",
};

export default function BlogPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <section
        style={{
          padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(4rem,8vw,6rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              color: "#6366F1",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Blog
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Artikel & Guides
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              marginBottom: "3rem",
              lineHeight: 1.7,
            }}
          >
            Ehrliche Einblicke zu Webdesign, KI und was lokale Unternehmen wirklich brauchen.
          </p>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              textAlign: "left",
            }}
          >
            {[
              {
                slug: "was-kostet-eine-website-2026",
                title: "Was kostet eine Website 2026?",
                desc: "Ehrliche Preise statt Agentur-Blabla. Was wirklich hinter den Zahlen steckt.",
                date: "März 2026",
              },
              {
                slug: "nextjs-vs-wordpress",
                title: "Warum Next.js besser ist als WordPress",
                desc: "Warum ich kein einziges WordPress-Projekt mehr annehme – und was ich stattdessen baue.",
                date: "März 2026",
              },
              {
                slug: "ki-chatbot-fuer-website",
                title: "KI-Chatbot für deine Website",
                desc: "Brauchst du wirklich einen KI-Chatbot? Eine ehrliche Einschätzung.",
                date: "März 2026",
              },
              {
                slug: "webdesign-mosbach",
                title: "Webdesign Mosbach – Warum lokal besser ist",
                desc: "Warum lokale Unternehmen einen lokalen Entwickler brauchen.",
                date: "März 2026",
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 12,
                  padding: "1.5rem",
                  textDecoration: "none",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  boxShadow: "var(--card-shadow)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#6366F1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#6366F1",
                    letterSpacing: "0.1em",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  {post.date}
                </p>
                <h2
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {post.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

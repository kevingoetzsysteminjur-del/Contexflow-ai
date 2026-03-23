"use client";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function BlogPage() {
  const { t } = useLang();

  const posts = [
    {
      slug: "eigener-server-website",
      title: t.blog.post1_title,
      desc: t.blog.post1_desc,
      date: t.blog.post1_date,
    },
    {
      slug: "context-engineering",
      title: t.blog.post2_title,
      desc: t.blog.post2_desc,
      date: t.blog.post2_date,
    },
    {
      slug: "5-fehler-firmen-website",
      title: t.blog.post3_title,
      desc: t.blog.post3_desc,
      date: t.blog.post3_date,
    },
    {
      slug: "webdesign-mosbach",
      title: t.blog.post4_title,
      desc: t.blog.post4_desc,
      date: t.blog.post4_date,
    },
  ];

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
            {t.blog.label}
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
            {t.blog.headline}
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              marginBottom: "3rem",
              lineHeight: 1.7,
            }}
          >
            {t.blog.subline}
          </p>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              textAlign: "left",
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
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

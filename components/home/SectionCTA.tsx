import Link from "next/link";

interface SectionCTAProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
  subtext?: string;
}

export default function SectionCTA({ text, href, variant = "primary", subtext }: SectionCTAProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 2.5rem)",
        borderTop: "1px solid #111",
        background: "#030305",
      }}
    >
      <Link
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: isPrimary ? "0.75rem 2rem" : "0.6rem 1.75rem",
          background: isPrimary ? "transparent" : "transparent",
          border: isPrimary
            ? "1px solid rgba(99,102,241,0.4)"
            : "1px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
          fontSize: "clamp(0.8rem, 1.5vw, 0.875rem)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: isPrimary ? "#6366F1" : "rgba(255,255,255,0.4)",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (isPrimary) {
            el.style.background = "rgba(99,102,241,0.08)";
            el.style.borderColor = "rgba(99,102,241,0.7)";
            el.style.color = "#818CF8";
          } else {
            el.style.borderColor = "rgba(255,255,255,0.25)";
            el.style.color = "rgba(255,255,255,0.65)";
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (isPrimary) {
            el.style.background = "transparent";
            el.style.borderColor = "rgba(99,102,241,0.4)";
            el.style.color = "#6366F1";
          } else {
            el.style.borderColor = "rgba(255,255,255,0.1)";
            el.style.color = "rgba(255,255,255,0.4)";
          }
        }}
      >
        {text}
      </Link>
      {subtext && (
        <p
          style={{
            fontSize: 11,
            color: "#374151",
            letterSpacing: "0.08em",
            textAlign: "center",
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}

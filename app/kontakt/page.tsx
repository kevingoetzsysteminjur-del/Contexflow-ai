"use client";
import { useState } from "react";
import { Mail, MapPin, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function KontaktPage() {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(t.kontakt.error_msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--input-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: 8,
    padding: "12px 16px",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        .contact-input:focus {
          border-color: #6366F1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .two-col-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 479px) {
          .two-col-fields { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          padding: "clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,2.5rem) clamp(2rem,4vw,3rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p
            style={{
              color: "#6366F1",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {t.kontakt.label}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem,6vw,4rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              lineHeight: 1.1,
            }}
          >
            {t.kontakt.headline}
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem,2vw,1.15rem)",
              lineHeight: 1.7,
            }}
          >
            {t.kontakt.subline}
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section
        style={{
          padding: "0 clamp(1.5rem,5vw,2.5rem) clamp(5rem,10vw,7rem)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="contact-grid">
            {/* LEFT: Form */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 16,
                padding: "clamp(1.5rem,4vw,2.5rem)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "1.75rem",
                }}
              >
                {t.kontakt.form_title}
              </h2>

              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.25rem",
                      fontSize: "1.75rem",
                      color: "#22C55E",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t.kontakt.success_title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    {t.kontakt.success_text}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <div>
                    <label style={labelStyle}>{t.kontakt.label_name}</label>
                    <input
                      required
                      className="contact-input"
                      style={inputStyle}
                      placeholder={t.kontakt.placeholder_name}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>{t.kontakt.label_email}</label>
                    <input
                      required
                      type="email"
                      className="contact-input"
                      style={inputStyle}
                      placeholder={t.kontakt.placeholder_email}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>

                  <div className="two-col-fields">
                    <div>
                      <label style={labelStyle}>{t.kontakt.label_company}</label>
                      <input
                        className="contact-input"
                        style={inputStyle}
                        placeholder={t.kontakt.placeholder_company}
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, company: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.kontakt.label_phone}</label>
                      <input
                        className="contact-input"
                        style={inputStyle}
                        placeholder={t.kontakt.placeholder_phone}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>{t.kontakt.label_service}</label>
                    <select
                      className="contact-input"
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={formData.service}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, service: e.target.value }))
                      }
                    >
                      <option value="">{t.kontakt.select_placeholder}</option>
                      <option value="website">{t.kontakt.svc_website}</option>
                      <option value="ai">{t.kontakt.svc_ai}</option>
                      <option value="both">{t.kontakt.svc_both}</option>
                      <option value="context">{t.kontakt.svc_context}</option>
                      <option value="other">{t.kontakt.svc_other}</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>{t.kontakt.label_budget}</label>
                    <select
                      className="contact-input"
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, budget: e.target.value }))
                      }
                    >
                      <option value="">{t.kontakt.select_placeholder}</option>
                      <option value="under500">{t.kontakt.budget_under500}</option>
                      <option value="500-1000">{t.kontakt.budget_500_1000}</option>
                      <option value="1000-2000">{t.kontakt.budget_1000_2000}</option>
                      <option value="over2000">{t.kontakt.budget_over2000}</option>
                      <option value="unknown">{t.kontakt.budget_unknown}</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>{t.kontakt.label_message}</label>
                    <textarea
                      required
                      className="contact-input"
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: 120,
                      }}
                      placeholder={t.kontakt.placeholder_message}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                    />
                  </div>

                  {error && (
                    <p style={{ fontSize: 13, color: "#EF4444", textAlign: "center" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "14px 20px",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "opacity 0.2s",
                      opacity: loading ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    {loading ? t.kontakt.btn_sending : (
                      <>{t.kontakt.btn_send} <ArrowRight size={16} /></>
                    )}
                  </button>

                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-tertiary)",
                      textAlign: "center",
                    }}
                  >
                    {t.kontakt.required_note}
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT: Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Direct contact */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "1.75rem",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {t.kontakt.direct_title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    {
                      icon: Mail,
                      label: "contexflow.ai@gmx.net",
                      href: "mailto:contexflow.ai@gmx.net",
                      color: "#6366F1",
                    },
                    {
                      icon: MapPin,
                      label: t.kontakt.location_label,
                      href: null,
                      color: "#06B6D4",
                    },
                    {
                      icon: Clock,
                      label: t.kontakt.response_label,
                      href: null,
                      color: "#22C55E",
                    },
                  ].map(({ icon: Icon, label, href, color }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.875rem",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: `${color}15`,
                          border: `1px solid ${color}25`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            color: "var(--text-primary)",
                            textDecoration: "none",
                            fontSize: "0.9rem",
                            lineHeight: 1.5,
                            paddingTop: 4,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = color;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                          }}
                        >
                          {label}
                        </a>
                      ) : (
                        <span
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.9rem",
                            lineHeight: 1.5,
                            paddingTop: 4,
                          }}
                        >
                          {label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    height: 1,
                    background: "var(--border-color)",
                    margin: "1.5rem 0",
                  }}
                />

                <a
                  href="https://wa.me/4915900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "12px 20px",
                    borderRadius: 8,
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  <MessageSquare size={16} /> {t.kontakt.whatsapp_btn}
                </a>
              </div>

              {/* For whom */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  padding: "1.75rem",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                    marginBottom: "1rem",
                  }}
                >
                  {t.kontakt.for_whom_label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {t.kontakt.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        padding: "4px 12px",
                        borderRadius: 100,
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

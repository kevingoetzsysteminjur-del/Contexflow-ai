import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, firma, leistung, budget, nachricht } = await req.json();

    if (!name?.trim() || !email?.trim() || !nachricht?.trim()) {
      return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Kontaktformular <onboarding@resend.dev>",
      to: "contexflow.ai@gmx.net",
      replyTo: email,
      subject: `Anfrage: ${leistung || "Website"} – ${name}${firma ? ` (${firma})` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4; margin-bottom: 24px;">Neue Kontaktanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #71717a; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; color: #111; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a; font-size: 13px;">E-Mail</td><td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #71717a; font-size: 13px;">Firma</td><td style="padding: 8px 0; color: #111;">${firma || "–"}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a; font-size: 13px;">Leistung</td><td style="padding: 8px 0; color: #111;">${leistung || "–"}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a; font-size: 13px;">Budget</td><td style="padding: 8px 0; color: #111;">${budget || "–"}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #71717a; font-size: 13px; margin-bottom: 8px;">Nachricht</p>
          <p style="color: #111; line-height: 1.7; white-space: pre-wrap;">${nachricht}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #a1a1aa; font-size: 11px;">Gesendet über das Kontaktformular auf contexflow.com</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
  }
}

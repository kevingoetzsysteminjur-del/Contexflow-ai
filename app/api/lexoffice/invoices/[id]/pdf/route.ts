import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInvoiceById, getInvoicePdfBuffer } from "@/lib/lexoffice";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const role = (session.user as { role?: string }).role;

  if (role !== "admin") {
    const invoice = await prisma.invoice.findFirst({
      where: { lexofficeId: id, userId: session.user.id },
    });
    if (!invoice) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const invoice = await getInvoiceById(id);
  if (!invoice?.files?.documentFileId) {
    return NextResponse.json({ error: "Kein PDF verfügbar." }, { status: 404 });
  }

  const buffer = await getInvoicePdfBuffer(invoice.files.documentFileId);
  if (!buffer) return NextResponse.json({ error: "PDF konnte nicht geladen werden." }, { status: 502 });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="rechnung-${invoice.voucherNumber}.pdf"`,
    },
  });
}

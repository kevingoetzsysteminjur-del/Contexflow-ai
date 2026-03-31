import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getInvoiceById } from "@/lib/lexoffice";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const role = (session.user as { role?: string }).role;

  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) return NextResponse.json({ error: "Rechnung nicht gefunden." }, { status: 404 });
  if (role !== "admin" && invoice.userId !== session.user.id) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  let lexofficeData = null;
  if (invoice.lexofficeId) {
    lexofficeData = await getInvoiceById(invoice.lexofficeId);
  }

  return NextResponse.json({ invoice, lexofficeData });
}

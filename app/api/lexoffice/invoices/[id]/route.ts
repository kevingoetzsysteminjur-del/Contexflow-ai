import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInvoiceById } from "@/lib/lexoffice";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const role = (session.user as { role?: string }).role;

  // Kunden dürfen nur auf Rechnungen zugreifen die ihnen zugeordnet sind
  if (role !== "admin") {
    const invoice = await prisma.invoice.findFirst({
      where: { lexofficeId: id, userId: session.user.id },
    });
    if (!invoice) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const data = await getInvoiceById(id);
  if (!data) return NextResponse.json({ error: "Rechnung nicht gefunden." }, { status: 404 });

  return NextResponse.json(data);
}

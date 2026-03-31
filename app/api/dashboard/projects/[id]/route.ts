import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const role = (session.user as { role?: string }).role;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      milestones: { orderBy: { order: "asc" } },
      user: { select: { id: true, name: true } },
    },
  });

  if (!project) return NextResponse.json({ error: "Projekt nicht gefunden." }, { status: 404 });
  if (role !== "admin" && project.userId !== session.user.id) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  // Rechnungen des Projekts (alle Rechnungen des Kunden – zukünftig könnten Projekte Rechnungen direkt verlinken)
  const invoices = await prisma.invoice.findMany({
    where: { userId: project.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ project, invoices });
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const { id } = await params;
  const { number, amount, status, dueDate } = await req.json();

  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      ...(number !== undefined && { number }),
      ...(amount !== undefined && { amount }),
      ...(status !== undefined && { status }),
      ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
    },
  });

  return NextResponse.json({ invoice });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const { id } = await params;
  await prisma.invoice.delete({ where: { id } });
  return NextResponse.json({ message: "Rechnung gelöscht." });
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const customers = await prisma.user.findMany({
    where: { role: "customer" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { projects: true, invoices: true } },
    },
  });

  return NextResponse.json({ customers });
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const [
    customerCount,
    projectCount,
    invoiceCount,
    invoices,
    unreadMessages,
    recentUsers,
    recentMessages,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "customer" } }),
    prisma.project.count(),
    prisma.invoice.count(),
    prisma.invoice.findMany({ select: { amount: true, status: true } }),
    prisma.message.count({
      where: {
        read: false,
        conversation: { adminId: session.user.id },
        senderId: { not: session.user.id },
      },
    }),
    prisma.user.findMany({
      where: { role: "customer" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { sender: { select: { name: true } } },
    }),
  ]);

  const openInvoicesTotal = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + Number(i.amount), 0);

  return NextResponse.json({
    customerCount,
    projectCount,
    invoiceCount,
    openInvoicesTotal,
    unreadMessages,
    recentUsers,
    recentMessages,
  });
}

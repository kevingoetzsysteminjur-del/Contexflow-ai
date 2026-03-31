import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const userId = session.user.id;
  const role = (session.user as { role?: string }).role;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true, email: true } },
      admin: { select: { id: true, name: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!conversation) return NextResponse.json({ error: "Konversation nicht gefunden." }, { status: 404 });

  if (role !== "admin" && conversation.customerId !== userId) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  // Mark unread messages from the other party as read
  const otherPartyId = role === "admin" ? conversation.customerId : conversation.adminId;
  await prisma.message.updateMany({
    where: { conversationId: id, senderId: otherPartyId, read: false },
    data: { read: true },
  });

  return NextResponse.json({ conversation });
}

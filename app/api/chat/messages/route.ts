import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const userId = session.user.id;
  const { conversationId, content } = await req.json();

  if (!conversationId || !content?.trim()) {
    return NextResponse.json({ error: "conversationId und content sind erforderlich." }, { status: 400 });
  }

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation) return NextResponse.json({ error: "Konversation nicht gefunden." }, { status: 404 });

  const role = (session.user as { role?: string }).role;
  if (role !== "admin" && conversation.customerId !== userId) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const message = await prisma.message.create({
    data: { conversationId, senderId: userId, content: content.trim() },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
  });

  return NextResponse.json({ message }, { status: 201 });
}

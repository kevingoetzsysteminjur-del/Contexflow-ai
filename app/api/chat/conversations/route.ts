import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const userId = session.user.id;
  const role = (session.user as { role?: string }).role;

  if (role === "admin") {
    const conversations = await prisma.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      include: {
        customer: { select: { id: true, name: true, email: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: {
            messages: { where: { read: false, senderId: { not: userId } } },
          },
        },
      },
    });
    return NextResponse.json({ conversations });
  }

  const conversations = await prisma.conversation.findMany({
    where: { customerId: userId },
    include: {
      admin: { select: { id: true, name: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return NextResponse.json({ conversations });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const userId = session.user.id;
  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "Nachricht darf nicht leer sein." }, { status: 400 });

  const admin = await prisma.user.findFirst({ where: { role: "admin" } });
  if (!admin) return NextResponse.json({ error: "Kein Admin gefunden." }, { status: 404 });

  let conversation = await prisma.conversation.findFirst({
    where: { customerId: userId },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { customerId: userId, adminId: admin.id, lastMessageAt: new Date() },
    });
  }

  const message = await prisma.message.create({
    data: { conversationId: conversation.id, senderId: userId, content: content.trim() },
  });

  await prisma.conversation.update({
    where: { id: conversation.id },
    data: { lastMessageAt: new Date() },
  });

  return NextResponse.json({ conversation, message }, { status: 201 });
}

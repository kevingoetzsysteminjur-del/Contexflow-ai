import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const userId = session.user.id;
  const role = (session.user as { role?: string }).role;

  let count: number;

  if (role === "admin") {
    count = await prisma.message.count({
      where: {
        read: false,
        senderId: { not: userId },
        conversation: { adminId: userId },
      },
    });
  } else {
    count = await prisma.message.count({
      where: {
        read: false,
        senderId: { not: userId },
        conversation: { customerId: userId },
      },
    });
  }

  return NextResponse.json({ count });
}

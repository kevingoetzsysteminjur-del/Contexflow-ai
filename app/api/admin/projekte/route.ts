import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const { userId, title, description, status, progress } = await req.json();
  if (!userId || !title) return NextResponse.json({ error: "userId und title sind erforderlich." }, { status: 400 });

  const project = await prisma.project.create({
    data: { userId, title, description: description ?? null, status: status ?? "in_progress", progress: progress ?? 0 },
  });

  return NextResponse.json({ project }, { status: 201 });
}

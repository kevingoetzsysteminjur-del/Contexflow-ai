import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || name.trim().length === 0) {
    return NextResponse.json({ error: "Name darf nicht leer sein." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim() },
  });

  return NextResponse.json({ message: "Profil aktualisiert." });
}

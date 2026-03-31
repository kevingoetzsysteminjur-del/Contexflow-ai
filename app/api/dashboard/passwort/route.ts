import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { oldPassword, newPassword } = await req.json();

  if (!oldPassword || !newPassword) {
    return NextResponse.json({ error: "Alle Felder sind erforderlich." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Das neue Passwort muss mindestens 8 Zeichen lang sein." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "Benutzer nicht gefunden." }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Das aktuelle Passwort ist falsch." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "Passwort erfolgreich geändert." });
}

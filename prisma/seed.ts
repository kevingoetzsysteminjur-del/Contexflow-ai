import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD Umgebungsvariable ist nicht gesetzt.");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: "contexflow.ai@gmx.net" },
    update: { role: "admin", password: hashedPassword },
    create: {
      name: "Kevin Götz",
      email: "contexflow.ai@gmx.net",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin-User erstellt/aktualisiert: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Ali Artun suchen
  const ali = await prisma.user.findFirst({
    where: { email: "ali@plana-immobilien.de" },
  });

  if (!ali) {
    console.log("Kein User mit email ali@plana-immobilien.de gefunden.");
    console.log("Verfügbare User:");
    const users = await prisma.user.findMany({ select: { email: true, name: true } });
    users.forEach((u) => console.log(` - ${u.name} (${u.email})`));
    process.exit(1);
  }

  // Projekt suchen
  let project = await prisma.project.findFirst({
    where: { userId: ali.id, title: { contains: "Plan A Immobilien" } },
  });

  if (!project) {
    console.log("Kein Projekt 'Plan A Immobilien' gefunden. Erstelle es...");
    project = await prisma.project.create({
      data: {
        userId: ali.id,
        title: "Plan A Immobilien Website",
        description: "Professionelle Partner-Plattform für Immobilien-Finanzierung mit mehrsprachigem Support.",
        status: "in_progress",
        progress: 78,
      },
    });
  }

  // Bestehende Milestones löschen
  await prisma.projectMilestone.deleteMany({ where: { projectId: project.id } });

  const milestones = [
    {
      title: "Projektplanung & Konzept",
      description: "Anforderungsanalyse, Sitemap-Erstellung, Design-Konzept und Wireframes für die Partner-Plattform erstellt.",
      status: "completed",
      completedAt: new Date("2025-11-01"),
      order: 1,
    },
    {
      title: "Grundstruktur & Layout",
      description: "Next.js Projekt aufgesetzt, Basis-Layout mit Navigation, Footer, und responsivem Design implementiert. Dark Mode integriert.",
      status: "completed",
      completedAt: new Date("2025-11-15"),
      order: 2,
    },
    {
      title: "Finanzierungs-Modul (5 Tabs)",
      description: "Komplettes Finanzierungsmodul mit 5 Tabs implementiert: Übersicht, Kalkulator, Vergleich, Dokumente, Anfrage. Interaktive Berechnungen und Formulare.",
      status: "completed",
      completedAt: new Date("2025-12-01"),
      order: 3,
    },
    {
      title: "Mehrsprachigkeit DE/EN/TR",
      description: "Dreisprachige Unterstützung für Deutsch, Englisch und Türkisch eingebaut. Alle Texte, Formulare und UI-Elemente übersetzt.",
      status: "completed",
      completedAt: new Date("2025-12-20"),
      order: 4,
    },
    {
      title: "Partner-Aufbereitungsbereich",
      description: "Aufbereitungs-Sektion für Immobilien-Partner erstellt: Exposé-Generator, Bildergalerie-Upload, Objekt-Details-Formulare.",
      status: "completed",
      completedAt: new Date("2026-01-10"),
      order: 5,
    },
    {
      title: "Dark Mode & Design-Feinschliff",
      description: "Vollständiger Dark Mode mit Farbschema-Umschaltung. Design-Feinschliffe: Animationen, Hover-Effekte, Typography, Spacing-Optimierungen.",
      status: "completed",
      completedAt: new Date("2026-01-25"),
      order: 6,
    },
    {
      title: "Admin-Panel",
      description: "Admin-Panel für Immobilien-Verwaltung. Grundfunktionen erstellt, aber es gibt noch einen Bug der behoben werden muss.",
      status: "in_progress",
      completedAt: null,
      order: 7,
    },
    {
      title: "Testing & Go-Live",
      description: "Finales Testing auf allen Geräten, Performance-Optimierung, SEO-Setup, und Deployment auf Production-Server.",
      status: "planned",
      completedAt: null,
      order: 8,
    },
  ];

  for (const ms of milestones) {
    await prisma.projectMilestone.create({
      data: { projectId: project.id, ...ms },
    });
  }

  console.log(`✓ ${milestones.length} Meilensteine für "${project.title}" (${ali.name}) erstellt.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

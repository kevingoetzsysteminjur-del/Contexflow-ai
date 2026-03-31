import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInvoices } from "@/lib/lexoffice";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  const contactName = req.nextUrl.searchParams.get("contactName") ?? undefined;
  const data = await getInvoices(contactName);

  if (!data) {
    return NextResponse.json({ error: "Lexoffice nicht erreichbar." }, { status: 502 });
  }

  return NextResponse.json(data);
}

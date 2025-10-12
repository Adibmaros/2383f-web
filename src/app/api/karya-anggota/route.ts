import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const karya = await prisma.karya.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(karya);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching karya" }, { status: 500 });
  }
}

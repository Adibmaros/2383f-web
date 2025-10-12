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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const karya = await prisma.karya.create({
      data: body,
    });
    return NextResponse.json(karya);
  } catch (error) {
    return NextResponse.json({ error: "Error creating karya" }, { status: 500 });
  }
}

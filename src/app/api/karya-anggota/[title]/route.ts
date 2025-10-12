import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { title: string } }) {
  try {
    const decodedTitle = decodeURIComponent(params.title);
    const karya = await prisma.karya.findFirst({
      where: { title: decodedTitle },
    });

    if (!karya) {
      return NextResponse.json({ error: "Karya not found" }, { status: 404 });
    }

    return NextResponse.json(karya);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching karya" }, { status: 500 });
  }
}

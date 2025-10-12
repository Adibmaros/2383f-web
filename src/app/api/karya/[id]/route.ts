import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const karya = await prisma.karya.update({
      where: { id: Number(params.id) },
      data: body,
    });
    return NextResponse.json(karya);
  } catch (error) {
    return NextResponse.json({ error: "Error updating karya" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.karya.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Karya deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting karya" }, { status: 500 });
  }
}

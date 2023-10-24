import { checkIfAdmin } from "@/lib/helpers/authentication";
import prisma from "@/lib/utils/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page: number = parseInt(searchParams.get("page")!);

  if (isNaN(page)) {
    return NextResponse.json({ error: "Invalid API request" }, { status: 400 });
  }

  const { userId } = auth();

  const isAdmin = await checkIfAdmin(userId);

  if (!isAdmin) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const data = await prisma.order.findMany({
    take: 2,
    skip: (page - 1) * 2,
  });

  return NextResponse.json({ data }, { status: 200 });
}

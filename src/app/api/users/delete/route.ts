import { auth, clerkClient } from "@clerk/nextjs";
import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (user?.role !== "ADMIN") {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  const data = await request.json();

  try {
    await clerkClient.users.deleteUser(data.userId);
    await prisma.user.delete({
      where: {
        id: data.userId,
      },
    });
    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

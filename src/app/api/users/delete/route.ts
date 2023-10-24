import { auth, clerkClient } from "@clerk/nextjs";
import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server";
import { checkIfAdmin } from "@/lib/helpers/authentication";

export async function POST(request: Request) {
  const { userId } = auth();

  const isAdmin = await checkIfAdmin(userId);

  if(!isAdmin){
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

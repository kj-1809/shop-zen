import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import { updateUserValidator } from "@/lib/validators/api-request";
import { UserRole } from "@prisma/client";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const user = await prisma?.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (user && user.role !== "ADMIN") {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const data = await request.json();


    const validatedData = updateUserValidator.safeParse(data)

    if(!validatedData.success){
      return NextResponse.json({error : "Invalid input data"} , {status : 400});
    }

    await prisma.user.update({
      where: {
        id: validatedData.data.userId!,
      },
      data: {
        name: validatedData.data.name,
        role: validatedData.data.role as UserRole,
      },
    });

    await clerkClient.users.updateUser(data.userId, {
      firstName: data.name,
      lastName: "",
    });
  } catch (err) {
    return NextResponse.json({ error: "Some internal error" }, { status: 500 });
  }

  return NextResponse.json({ code: "SUCCESS" }, { status: 200 });
}

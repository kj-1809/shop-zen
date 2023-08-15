import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET(request: Request)  {
  const { userId } = auth();
  const url = new URL(request.url)
  const userIdToBeFetched = url.searchParams.get("userId");
  
  if (!userId) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  if(!userIdToBeFetched){
    return NextResponse.json({error : "Please input a valid user ID"} , {status : 400});
  }

  try {

    const adminUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!adminUser || adminUser.role !== "ADMIN") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userIdToBeFetched
      },
    });
    return NextResponse.json({ user }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: "Some internal error." },
      { status: 500 }
    );

  }
}

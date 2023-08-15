import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import { updateProductValidator } from "@/lib/validators/api-request";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (!userData || userData.role !== "ADMIN") {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const validatedData = updateProductValidator.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input", reason: validatedData.error },
        { status: 400 }
      );
    }
    await prisma.product.update({
      where: {
        id: validatedData.data.productId,
      },
      data: {
        name: validatedData.data.name,
        price: validatedData.data.price,
        description: validatedData.data.description,
        imageUrls: {
          create : validatedData.data.imageUrls
        },
      },
    });
    return NextResponse.json({ code: "SUCCESS" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Some error occured on the server" },
      { status: 500 }
    );
  }
}

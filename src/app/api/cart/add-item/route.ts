import prisma from "@/lib/utils/prisma";
import { addToCartValidator } from "@/lib/validators/api-request";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("request forwared ");
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      {
        code: "UNAUTHORIZED",
      },
      { status: 401 }
    );
  }

  const data = await request.json();
  const validData = addToCartValidator.safeParse(data);

  if (!validData.success) {
    return NextResponse.json(
      {
        code: "Input data is not valid !",
      },
      {
        status: 400,
      }
    );
  }

  await prisma.cartItem.upsert({
    create: {
      user: {
        connect: {
          id: userId,
        },
      },
      product: {
        connect: {
          id: validData.data.productId,
        },
      },
      quantity: 1,
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
    where: {
      productId_userId: {
        productId: validData.data.productId,
        userId: userId,
      },
    },
  });

  return NextResponse.json(
    {
      code: "SUCCESS",
    },
    { status: 200 }
  );
}

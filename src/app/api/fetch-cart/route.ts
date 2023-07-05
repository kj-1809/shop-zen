import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/utils/prisma";

export async function GET(request: Request) {
  const { userId } = auth();

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: userId!,
      },
      include: {
        product: {
          select: {
            imageUrls: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return NextResponse.json(cartItems, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

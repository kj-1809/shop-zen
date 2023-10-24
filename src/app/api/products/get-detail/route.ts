import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function GET(request: Request) {
  const { userId } = auth();
  console.log(userId)

  if (!userId) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  try {
    if (!productId) {
      return NextResponse.json({ error: "Enter product Id" }, { status: 400 });
    }
    const productData = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include : {
        imageUrls : true
      }
    });
    return NextResponse.json({ productData }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Some internal error occured !" },
      { status: 500 }
    );
  }
}

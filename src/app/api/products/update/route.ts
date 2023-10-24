import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import { updateProductValidator } from "@/lib/validators/api-request";
import { checkIfAdmin } from "@/lib/helpers/authentication";

export async function POST(request: Request) {
  const { userId } = auth();

	const isAdmin = await checkIfAdmin(userId);
  if(!isAdmin){
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

    await prisma.$transaction([
      prisma.product.update({
        where: {
          id: validatedData.data.productId,
        },
        data: {
          imageUrls: {
            deleteMany: {},
          },
        },
      }),
      prisma.product.update({
        where: {
          id: validatedData.data.productId,
        },
        data: {
          name: validatedData.data.name,
          price: validatedData.data.price,
          description: validatedData.data.description,
          imageUrls: {
            create: validatedData.data.imageUrls,
          },
        },
      }),
    ]);

    return NextResponse.json({ code: "SUCCESS" }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: "Some error occured on the server" },
      { status: 500 }
    );
  }
}

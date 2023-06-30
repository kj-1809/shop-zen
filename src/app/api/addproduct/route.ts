import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import { addProductValidator } from "@/lib/validators/api-request";

export async function POST(request: Request) {
	// check if user is authorized
	const { userId } = auth();
	console.log("userId : " ,  userId)
	if (!userId) {
		return NextResponse.json(
			{ error: "UNAUTHORIZED" },
			{
				status: 401,
			}
		);
	}
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user || user.role !== "ADMIN") {
		return NextResponse.json(
			{ error: "UNAUTHORIZED" },
			{
				status: 401,
			}
		);
	}

	// if user id authorized then do the following
	const body = await request.json();
	const validation = addProductValidator.safeParse(body);
	console.log("zod validation : ", validation);

	if (!validation.success) {
		return NextResponse.json(
			{
				error: "Invalid Data",
				errorDetails : validation.error
			},
			{ status: 400 }
		);
	}

	await prisma.product.create({
		data: {
			name: body.name,
			description: body.description,
			price: body.price,
			imageUrls : {
				create : body.imageUrls
			}		
		},
	});

	return NextResponse.json(
		{
			success: "Added product successfully !",
		},
		{
			status: 200,
		}
	);
}

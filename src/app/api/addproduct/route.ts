import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/utils/lib/prisma";

export async function POST(request: Request) {
	// check if user is authorized 
	const { userId } = auth();
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

	await prisma.product.create({
		data: {
			name: body.name,
			description: body.description,
			price: body.price,
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

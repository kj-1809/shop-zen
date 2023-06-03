import prisma from "@/lib/utils/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { addReviewValidator } from "@/lib/validators/api-request";
export async function POST(request: Request) {
	const body = await request.json();

	const { userId } = auth();

	if (!userId) {
		return NextResponse.json(
			{ code: "UNAUTHORIZED" },
			{
				status: 401,
			}
		);
	}
	console.log("user id . :", userId);

	const validation = addReviewValidator.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(
			{
				code: "UNAUTHORIZED",
			},
			{
				status: 400,
			}
		);
	}

	const addedReview = await prisma.review.create({
		data: {
			description: body.reviewText,
			user: {
				connect: {
					id: userId,
				},
			},
			product: {
				connect: {
					id: body.productId,
				},
			},
		},
	});

	console.log("review : ", addedReview);
	return NextResponse.json({ code: "SUCCESS" }, { status: 200 });
}
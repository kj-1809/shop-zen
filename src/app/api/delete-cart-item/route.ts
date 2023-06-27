import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/utils/prisma";
import { deleteCartItemValidator } from "@/lib/validators/api-request";

export async function POST(request: Request) {
	const { userId } = auth();

	if (!userId) {
		return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
	}

	const data = await request.json();
	const validData = deleteCartItemValidator.safeParse(data);

	if(!validData.success){
		return NextResponse.json(
			{
				error: "Invalid Data",
			},
			{ status: 400 }
		);
	}

	try {
		await prisma.cartItem.delete({
			where: {
				id: validData.data.id,
			},
		});
    return NextResponse.json({code : "SUCCESS"} , {status : 200});
	} catch (err) {
		return NextResponse.json({ error: err }, { status: 500 });
	}

}

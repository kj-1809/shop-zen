import prisma from "@/lib/utils/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	console.log("hey there im in create order route ");
	const { userId } = auth();
	const checkoutSession = await request.json();

	if (!userId) {
		return NextResponse.json(
			{ error: "UNAUTHORIZED" },
			{
				status: 401,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			}
		);
	}

	console.log("checkoutSession : ", checkoutSession);
	console.log("line_items : ", checkoutSession.line_items);
	console.log(
		"price : ",
		checkoutSession.line_items?.data[0].price?.product.metadata.productId!
	);

	const orderItems = checkoutSession.line_items?.data.map((orderItem: any) => {
		return {
			quantity: orderItem.quantity,
			product: {
				connect: {
					id: orderItem?.price?.product.metadata.productId,
				},
			},
		};
	});

	console.log("orderItems : ", orderItems);
	console.log("payment intent : ", checkoutSession.payment_intent);

	try {
		await prisma.order.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
				address: `${checkoutSession.customer_details?.address?.line1} , ${checkoutSession.customer_details?.address?.line2} , ${checkoutSession.customer_details?.address?.city} , ${checkoutSession.customer_details?.address?.state} , ${checkoutSession.customer_details?.address?.country} , PIN - ${checkoutSession.customer_details?.address?.postal_code}`,
				total: checkoutSession.amount_total,
				paymentId: checkoutSession.payment_intent as string,
				items: {
					create: orderItems as any,
				},
				paymentStatus: "SUCCESSFUL",
			},
		});
		return NextResponse.json(
			{ code: "SUCCESS" },
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			}
		);
	} catch (err) {
		return NextResponse.json(
			{ error: err },
			{
				status: 500,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			}
		);
	}
}

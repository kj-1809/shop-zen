import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2022-11-15",
	});
	const { userId } = auth();

	const data = await request.json();
	const line_items = data.cartItems.map((cartItem: any) => {
		return {
			price_data: {
				currency: "inr",
				product_data: {
					name: cartItem.product.name,
					metadata: {
						productId: cartItem.productId,
					},
				},
				unit_amount: cartItem.product.price * 100,
			},
			quantity: cartItem.quantity,
		};
	});

	try {
		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: "payment",
			success_url: `${process.env.BASE_URL}/checkout/orderplaced?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.BASE_URL}`,
			shipping_address_collection: {
				allowed_countries: ["IN", "US"],
			},
			metadata: {
				userId: userId,
			},
		});
		return NextResponse.json(
			{ paymentLink: session.url, session },
			{
				status: 200,
			}
		);
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message },
			{ status: err.statusCode || 500 }
		);
	}
}

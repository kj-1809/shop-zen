import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2022-11-15",
	});

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
			success_url: "http://localhost:3000/checkout/orderplaced",
			cancel_url: "http://localhost:3000/checkout/orderplaced?status=false",
			shipping_address_collection : {
				allowed_countries : ["IN" , "US"] 
			} 
		});
		return NextResponse.json(
			{ paymentLink: session.url },
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

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/utils/prisma";

export async function POST(request: Request) {
	console.log("Het there");
	const endpointSecret =
		"whsec_217ca9bac9f103b984e67f7250fe24c49fa3a3757db85ef69697aa58ed4aefdc";
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2022-11-15",
	});

	const sig = headers().get("stripe-signature");
	let event;

	if (!sig) {
		return NextResponse.json(
			{ error: "Please enter a valid signature" },
			{ status: 401 }
		);
	}

	const data = await request.text();
	try {
		console.log("try entered!");
		event = stripe.webhooks.constructEvent(data, sig, endpointSecret);
		console.log("event : ", event);
		
		
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}

	return NextResponse.json({ success: "ok" });
}

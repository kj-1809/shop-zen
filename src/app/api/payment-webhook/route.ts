import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
  const endpointSecret =
    "whsec_217ca9bac9f103b984e67f7250fe24c49fa3a3757db85ef69697aa58ed4aefdc";
  const signingSecret = "whsec_Ch6Er6tkCnIW6zJCGznl4fxyRnlS0oph";

  const sig = headers().get("stripe-signature");
  let event;

  if (!sig) {
    return NextResponse.json(
      { error: "Please enter a valid signature" },
      { status: 401 }
    );
  }

  console.log("I am here in the payment webhook");

  const data = await request.text();

  try {
    event = stripe.webhooks.constructEvent(data, sig, signingSecret);
    console.log("event : ", event);

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted: any = event.data.object;
        //create order
        console.log("creating order..");
        const response = createOrder(
          checkoutSessionCompleted.id,
          checkoutSessionCompleted.metadata.userId
        );
        return NextResponse.json(
          { success: "Everything was a success !", response },
          { status: 200 }
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, code: "Some error occured in the webhook !" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: "ok" }, { status: 200 });
}

async function createOrder(sessionId: string, userId: string) {
  const checkoutSession: any = await stripe.checkout.sessions.retrieve(
    sessionId,
    {
      expand: ["line_items.data.price.product"],
    }
  );

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
        paymentStatus:
          checkoutSession.payment_status === "paid" ? "SUCCESSFUL" : "PENDING",
      },
    });
    // empty the user cart as well

    // return NextResponse.json({ success: "success" }, { status: 200 });
    return "success";
  } catch (err) {
    console.log(err);
    return "error";
    // return NextResponse.json({ err }, { status: 500 });
  }
}

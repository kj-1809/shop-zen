import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export async function POST(request: Request) {
  console.log("Endpoint HIT");
  const user = await request.json();

  try {
    await prisma.user.create({
      data: {
        email: user.data.email_addresses[0].email_address,
        name: user.data.first_name + " " + user.data.last_name,
        id: user.data.id,
        profileImageUrl: user.data.image_url,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e });
  }

  return NextResponse.json({ ok: true });
}

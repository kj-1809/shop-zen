import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { userId } = auth();
	if (!userId) {
		return NextResponse.json(
			{ error: "UNAUTHORIZED" },
			{
				status: 401,
			}
		);
	}

  // fetch current user data
  // if user is not admin return the same
 
}

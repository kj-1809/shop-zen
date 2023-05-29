import { NextResponse } from "next/server"

export async function POST(request : Request){
  console.log("Endpoint HIT")

  console.log(await request.json())

  return NextResponse.json({ok : true})
}
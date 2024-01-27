import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import Event from "@/(backend)/models/event";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  await mongoDbConnect();
  console.log("post ran")
  try {
    const body = await request.json();
    // console.log(body)
    const eventData = body.formData;
    await Event.create(eventData)
    console.log(eventData)

    return NextResponse.json(
      { message: "Event Was Successfully Created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  await mongoDbConnect();
  const events = await Event.find();
  return NextResponse.json({ events });
}



export async function DELETE(request:any){
const id = request.nextUrl.searchParams.get("id");
await mongoDbConnect()
await Event.findByIdAndDelete(id)

return NextResponse.json({message:"Event Deleted"}, {status:201})
}
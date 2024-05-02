import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import Event from "@/(backend)/models/event";
import Order from "@/(backend)/models/order";
import User from "@/(backend)/models/user";
import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

// import { getCurrentUser } from "@/utils/getUserDetails";

export async function POST(request: any) {
  await mongoDbConnect();
  console.log("post ran");
  try {
    const body = await request.json();
    const eventData = body;
    const image = eventData.eventFlyer;
    const result = await cloudinary.uploader.upload(image)

   if (!result) {
     throw new Error("Error uploading image to Cloudinary");
   }
    console.log("d",result)
    const a = await Event.create({
      ...eventData,
      eventHost:eventData?.eventHost,
      eventFlyer: {
        public_id: result?.public_id,
        secure_url: result?.secure_url,
      },
    });
    console.log(a);

    return NextResponse.json(
      { message: "Event Was Successfully Created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  await mongoDbConnect();
  try {
    
    // const a = await Event.find()
    let events = await Event.find().populate({
      path: "orders",
      model:Order,
      populate: {
        path: "userId",
        model: User, 
      },
    });
    
    return NextResponse.json({ events });
  } catch (error) {
     return NextResponse.json(
       { error: error, },
       { status: 500 }
     );
  }
  
}


export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await mongoDbConnect();
  await Event.findByIdAndDelete(id);

  return NextResponse.json({ message: "Event Deleted" }, { status: 201 });
}

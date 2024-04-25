import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import Event from "@/(backend)/models/event";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  await mongoDbConnect();
  //   const category = req.category
  // const category = req.nextUrl.searchParams.get("category");
  // console.log('i am ',params.category )
  const { category } = params;
  
  const regexCategory = category ? category.toLowerCase().split(" ") : []; // Convert category to lowercase
  console.log("ggg", regexCategory);
  const events = await Event.find({
    eventCategory: { $regex: regexCategory.join("|"), $options: "i" },
  }).populate({
    path:"orders",
    populate:{
        path:"userId",
        model:"User"
    }

  });
  return NextResponse.json({ events });
}

// export async function DELETE(request: any) {
//   const id = request.nextUrl.searchParams.get("id");
//   await mongoDbConnect();
//   await Event.findByIdAndDelete(id);

//   return NextResponse.json({ message: "Event Deleted" }, { status: 201 });
// }

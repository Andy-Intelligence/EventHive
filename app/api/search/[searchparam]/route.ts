// import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect"
// import Event from "@/(backend)/models/event"
// import { NextResponse } from "next/server"

// export async function GET(request: any, { params }: any) {
//     await connectMongoDb();
    
//     try {
//         const { searchparam } = params;

//         // Define the aggregation pipeline
//         const pipeline = [
//             {
//                 $match: {
//                     $or: [
//                         { eventTitle: { $regex: searchparam, $options: 'i' } },
//                         { eventId: { $regex: searchparam, $options: 'i' } },
//                         { eventGuest: { $regex: searchparam, $options: 'i' } },
//                         { eventEntertainments: { $regex: searchparam, $options: 'i' } },
//                         { eventLocation: { $regex: searchparam, $options: 'i' } },
//                         { eventHost: { $regex: searchparam, $options: 'i' } },
//                         { eventDate: { $regex: searchparam, $options: 'i' } },
//                         { eventDetails: { $regex: searchparam, $options: 'i' } },
//                         { eventDescription: { $regex: searchparam, $options: 'i' } },
//                         { eventCategory: { $regex: searchparam, $options: 'i' } },
//                         { eventFee: { $regex: searchparam, $options: 'i' } }
//                     ]
//                 }
//             }
//         ];

//         // Perform aggregation using the pipeline
//         const events = await Event.aggregate(pipeline);

//         // Return the events as JSON with status 200 if found
//         return NextResponse.json({ events }, { status: 200 });
        
//     } catch (error:any) {
//         // Return an error message with status 400 if an error occurs
//         return NextResponse.json({ error: error.message }, { status: 400 });
//     }
// }



import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";
import Event from "@/(backend)/models/event";
import Order from "@/(backend)/models/order"; // Import Order model
import User from "@/(backend)/models/user"; // Import User model
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
    console.log(params)
  await connectMongoDb();

  try {
    const { searchparam } = params;

    // Perform search in the database
    const events = await Event.find({
      $or: [
        { eventTitle: { $regex: searchparam, $options: "i" } },
        { eventId: { $regex: searchparam, $options: "i" } },
        { eventGuest: { $regex: searchparam, $options: "i" } },
        { eventEntertainments: { $regex: searchparam, $options: "i" } },
        { eventLocation: { $regex: searchparam, $options: "i" } },
        // { eventHost:  searchparam},
        // { eventDate: searchparam},
        // { eventFee: searchparam },
        { eventDetails: { $regex: searchparam, $options: "i" } },
        { eventDescription: { $regex: searchparam, $options: "i" } },
        { eventCategory: { $regex: searchparam, $options: "i" } },
      ],
    }).populate({
      path: "orders",
      model: Order,
      populate: {
        path: "userId",
        model: User,
      },
    });

    console.log("bbbbbbbbbbbbbbbbbbbbb")

    // Return the populated events as JSON with status 200
    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    // Return an error message with status 400 if an error occurs
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}





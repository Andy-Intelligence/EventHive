import { compileWelcomeTemplate, sendMail } from "@/utils/mail";
import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";
import { NextResponse } from "next/server";
import { formatDate } from "@/utils/helpingFunctions/functions";
import Order from "@/(backend)/models/order";
import mongoose from "mongoose";
import Event from "@/(backend)/models/event";




export async function POST(request: any) {
  // console.log("uuuuuuuuuuuuuuueeeeeeeeeeeeeeeeeeee",event)
  try {
    const bodi = await request.json();
    let {
    eventId, userId, numTickets 
    } = bodi.formData;
    // console.log(email, password);

    await connectMongoDb();

  if (
    !mongoose.Types.ObjectId.isValid(eventId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return NextResponse.json({mesage:"invalid user or event"},{status:404});
  }

   const event = await Event.findById(eventId);

   // Check if event exists
   if (!event) {
     return NextResponse.json(
       { mesage: "event not found" },
       { status: 404 }
     );
   }

   // Calculate total price based on event price
   const totalPrice = event?.eventFee * numTickets;

  // Create a new order
//   const order = new Order({ eventId, userId, numTickets, totalPrice });
// await Order.find()
const order = await Order.create({ eventId, userId, numTickets, totalPrice });


  // Save the order to the database
 const savedOrder =  await order.save();

 event.orders.push(new mongoose.Types.ObjectId(savedOrder._id));

        // Save the updated event document
        await event.save();

    return NextResponse.json(
      { order:savedOrder,
        message: "order saved successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";
import Event from "@/(backend)/models/event";
import { NextResponse } from "next/server";
import User from "@/(backend)/models/user";
import Order from "@/(backend)/models/order";
// export async function PUT(request: any, { params }: any) {
//   const { id } = params;
//   await connectMongoDb;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await Event.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Event Updated" }, { status: 500 });
// }

export async function GET(request: any, { params }: any) {
  const { id } = params;
  connectMongoDb();
  try {
    // Find all orders for the given event ID
    const orders = await Order.find({eventId: id });

    // Extract user IDs from the orders
    const userIds = orders.map((order) => order.userId);

    // Fetch user details based on user IDs
    const users = await User.find({ _id: { $in: userIds } });

    // Return the list of users attending the event
     return NextResponse.json({ users }, { status: 201 });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Handle the error appropriately
  }
 
}

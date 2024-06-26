import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect"
import Event from "@/(backend)/models/event"
import { NextResponse } from "next/server"
import Order from "@/(backend)/models/order"
import User from "@/(backend)/models/user"

export async function PUT(request:any,{params}:any){
   try{
    const {id} = params
    await connectMongoDb
    const {newTitle:title,newDescription:description} = await request.json()
    await Event.findByIdAndUpdate(id,{title,description})
    return NextResponse.json({message:"Event Updated"}, {status:500})
} catch (error) {
    return NextResponse.json({error:error})
}

}





export async function GET(request:any,{params}:any){
    
    try{
      console.log("ddkkkkkkkkkkkkkkk", params);
      const { id } = params;
      connectMongoDb();
      const event = await Event.findOne({ _id: id }).populate([
        {
          path: "orders",
          model: Order,
          populate: {
            path: "userId",
            model: User,
          },
        },
        {
          path: "eventHost", // Assuming "eventHost" is the path to populate
          model: User, // Assuming "User" is the model for the event host
        },
      ]);

      const similarEvents = await Event.find({
        eventCategory: event.eventCategory,
        _id: { $ne: id }, // Exclude the current event from recommendations
      }).limit(3); // Limit to 5 recommendations

      const similarUpcomingEvents = await Event.find({
        eventCategory: event.eventCategory,
        eventDate: { $gte: new Date() },
        _id: { $ne: id },
      })
        .limit(6)
        .sort({ eventDate: 1 });

      return NextResponse.json({ event,similarEvents,similarUpcomingEvents }, { status: 201 });
    } catch (error) {
    return NextResponse.json({error:error})
}
}
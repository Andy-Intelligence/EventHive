import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect"
import Event from "@/(backend)/models/event"
import { NextResponse } from "next/server"

export async function GET(request:any, {params}:any){
    // const body = await request.json();
    // const {
    //     searchQuery
    //   } = body.searchQuery;
    console.log(params)
    await connectMongoDb()
    const searchparam = {params}

    try {
        const event = await Event.find({eventTitle:searchparam})
        return NextResponse.json({event},{status:201})
        
    } catch (error) {
        return NextResponse.json({error:error})
    }


}
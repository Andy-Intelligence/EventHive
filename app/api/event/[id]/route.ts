import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect"
import Event from "@/(backend)/models/event"
import { NextResponse } from "next/server"

export async function PUT(request:any,{params}:any){
    const {id} = params
    await connectMongoDb
    const {newTitle:title,newDescription:description} = await request.json()
    await Event.findByIdAndUpdate(id,{title,description})
    return NextResponse.json({message:"Event Updated"}, {status:500})

}





export async function GET(request:any,{params}:any){
    const {id} = params
    connectMongoDb()
    const event = await Event.findOne({_id:id})
    return NextResponse.json({event},{status:201})
}
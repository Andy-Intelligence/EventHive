import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect"
import Event from "@/(backend)/models/event"
import { NextResponse } from "next/server"

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
        console.log("ddkkkkkkkkkkkkkkk",params)
    const {id} = params
    connectMongoDb()
    const event = await Event.findOne({_id:id})
    return NextResponse.json({event},{status:201})


} catch (error) {
    return NextResponse.json({error:error})
}
}
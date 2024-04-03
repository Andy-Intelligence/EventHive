import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import User from "@/(backend)/models/user";
import { NextResponse } from "next/server";

export async function POST(request:any) {
await mongoDbConnect()
try {
    const body = await request.json()
    const email = body.email
    const res = await User.findOne({email:email})

    if(res){
        // console.log(res)
        
        return NextResponse.json(res,{status:201})
    }
} catch (error) {
    return NextResponse.json({message:"The User was not found"},{status:404})
}
}

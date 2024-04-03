import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import User from "@/(backend)/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";

export async function POST(request: any) {
const body = await request.json()
const {email,password,username,repeatPassword} = body.formData
console.log(email,password)
await connectMongoDb()

try {
    const existingUser = await User.findOne({email})
    
    if(existingUser){
        return NextResponse.json({message:"Email in use Already"},{status:400})
    }
    if(password !== repeatPassword){
        return NextResponse.json({message:"password does not match"},{status:400})
    }
    
    const hashPassword = await bcrypt.hash(password,5)
    console.log('bbb')
    const newUser = new User({
        username:username,
        email:email,
        password:hashPassword,
        role:"user"
    })

    await newUser.save()

    return NextResponse.json({message:"User is registered"},{status:200})
} catch (error:any) {
    return NextResponse.json({message:error},{status:500})
}

}

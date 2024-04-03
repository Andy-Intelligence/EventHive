import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import User from "@/(backend)/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";

// export async function PUT(request: any, { params }: any) {
//   const { id } = params;
//   await connectMongoDb;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await Event.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Event Updated" }, { status: 500 });
// }

export async function PUT(request: any, {params}:any) {

  const {id} = params
  const body = await request.json();
  const { email, password, username } = body.formData;
  // console.log(email, password);
  await connectMongoDb();

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      email,
      // password,
      username,
    },{new:true});

    if (updatedUser) {
      return NextResponse.json(
        { message: "User details updated" },
        { status: 200 }
      );
    }

    await updatedUser.save();

    return NextResponse.json(
      { message: "User Updates is Saved" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

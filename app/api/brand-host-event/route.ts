import mongoDbConnect from "@/(backend)/connectionToDatabase/mongoDbConnect";
import User from "@/(backend)/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";

export async function POST(request: any) {
  const body = await request.json();
  const {
    businessName,
    companyEmail,
    businessAccountNumber:accountNumber,
    businessBankName:bankName,
    bussinessAccountName:accountName,
    userId,
  } = body.formData;

  await connectMongoDb();

  try {
    // Find the user by userId
    const user = await User.findOne({ _id: userId });

    if (user) {
      // If user is found, update the user information
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            businessName,
            companyEmail,
            accountNumber,
            bankName,
            accountName,
            role:"eventHost"
          },
        },
        { new: true } // Return the updated document
      );

      return NextResponse.json(
        { message: "User Brand information updated", user: updatedUser },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User Brand not found with the provided userId" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

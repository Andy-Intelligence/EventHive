import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/(backend)/models/user";

export async function getSession() {
  return await getServerSession(options);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    await connectMongoDb();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return null;
    }

    
    // Return the user details as a plain JavaScript object
    return {...user._doc} 
  } catch (error) {
    // Handle errors (log or rethrow if necessary)
    console.error("Error fetching current user:", error);
    return null;
  }
}
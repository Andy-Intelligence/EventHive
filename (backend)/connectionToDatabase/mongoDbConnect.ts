import mongoose from "mongoose";

const connectMongoDb = async () => {
  const uri = process.env.MONGODB_URI ?? "";

  try {
    const conn = await mongoose.connect(uri);
 
    
  } catch (error) {
    console.error("there was an error connecting to mongoDB:",error);
  }
};



export default connectMongoDb;

// conn.on("connected", () => console.log("connected"));
// conn.on("open", () => console.log("open"));
// conn.on("disconnected", () => console.log("disconnected"));
// conn.on("reconnected", () => console.log("reconnected"));
// conn.on("disconnecting", () => console.log("disconnecting"));
// conn.on("close", () => console.log("close"));

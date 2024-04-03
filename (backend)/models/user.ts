import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    username: { type: String, required: false },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    // password: { type: String, select: false },
    image: { type: String },
    role: { type: String, enum: ["user", "eventHost"], default: "user" },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    dateOfBirth: { type: String, required: false },
    accountNumber: { type: String, default: 0 },
    bankName: { type: String, required: false },
    accountName: { type: String, required: false },
    businessName: { type: String, required: false },
    companyEmail: { type: String, required: false },
    businessAccountNumber: { type: Number, default: 0 },
    businessBankName: { type: String, required: false },
    bussinessAccountName: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mithileshl:Lohakare123@cluster0.dq71m3j.mongodb.net/mydatabase");
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
};

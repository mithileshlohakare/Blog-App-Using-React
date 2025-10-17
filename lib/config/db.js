import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect("");
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
};

import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('Your connect link')
    console.log("DB connected");
}
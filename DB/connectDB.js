import mongoose from "mongoose";
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database Connected!");
  } catch (error) {
    console.log("error while connecting DB:", error);
  }
};
export default connectDB;

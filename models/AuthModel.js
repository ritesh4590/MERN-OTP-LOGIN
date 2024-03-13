import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: Number,
      required: true,
    },
    otp: {
      type: Number,
    },
    verifyToken: {
      type: String,
    },
    expiryTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function (expireTime) {
  try {
    return jwt.sign({}, process.env.JWT_SECRET_KEY, {
      expiresIn: expireTime,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const User = mongoose.model("user", userSchema);
export default User;

import User from "../models/AuthModel.js";
import sendMessage from "../utils/sendMessage.js";

const generateOTP = async (req, res) => {
  const { phoneNo } = req.body;
  try {
    if (!phoneNo) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Phone No:" });
    }

    const userExist = await User.findOne({ phoneNo });
    const currentDate1 = new Date();
    const expiryTime = new Date(currentDate1.getTime() + 1 * 60000);
    if (userExist) {
      const updatedOTP = Math.floor(100000 + Math.random() * 900000);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userExist._id },
        {
          otp: updatedOTP,
          expiryTime,
          verifyToken: await userExist.generateToken("30d"),
        },
        { new: true }
      );
      const options = {
        body: `Uphaar OTP is ${updatedOTP}.use this to verify your mobile,App is being developed by Ritesh`,
        to: `+91 ${phoneNo}`,
      };
      sendMessage(options);
      return res
        .status(200)
        .json({ success: true, message: "User already exists", updatedUser });
    } else {
      const currentDate2 = new Date();
      const otp = Math.floor(100000 + Math.random() * 900000);
      const expiryTime = new Date(currentDate2.getTime() + 2 * 60000);
      const newUser = new User({
        phoneNo,
        otp,
        expiryTime,
        verifyToken: await userExist.generateToken("30d"),
      });
      await newUser.save();
      const options = {
        body: `Uphaar OTP is ${otp}.use this to verify your mobile,App is being developed by Ritesh`,
        to: `+91 ${phoneNo}`,
      };
      sendMessage(options);
      return res
        .status(200)
        .json({ success: true, message: "This is new User", newUser });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const verifyOTP = async (req, res) => {
  const { phoneNo, otp } = req.body;
  try {
    if (!phoneNo) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter Phone No" });
    }
    if (!otp) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter OTP" });
    }
    const userExist = await User.findOne({ phoneNo });
    const currentDate3 = new Date();
    if (userExist) {
      const otpVerified = otp == userExist.otp;
      const checkExpired = currentDate3 < userExist.expiryTime;
      if (otpVerified && checkExpired) {
        return res
          .status(200)
          .json({ success: true, message: "OTP Verified", userExist });
      } else {
        return res.status(401).json({ success: false, message: "OTP Expired" });
      }
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export { generateOTP, verifyOTP };

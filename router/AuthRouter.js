import express from "express";
const router = express.Router();
import { generateOTP, verifyOTP } from "../controllers/AuthController.js";

router.route("/generateOTP").post(generateOTP);
router.route("/verifyOTP").post(verifyOTP);

export default router;

import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import AuthRoute from "./router/AuthRouter.js";
import connectDB from "./DB/connectDB.js";

const PORT = process.env.PORT || 8000;

connectDB(process.env.MONGO_URL);

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/v1", AuthRoute);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    // credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({extended: true,limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js'
import carRouter from "./routes/car.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/car", carRouter)

export default app;

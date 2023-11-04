import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", ".env") });
import { env } from "./config/env";
import logger from "./utils/logger.utils";

import express, { Application, NextFunction, Request, Response } from "express";
import cookieparser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDb from "./utils/connectDb";
import userRouter from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error";

const app: Application = express();
const PORT = Number(env.PORT) || 4000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log("server started ");
  await connectToDb();
});

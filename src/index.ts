import express, { Request, Response, NextFunction, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../src/routes/userRoutes";
import departmentRouter from "../src/routes/departmentRoutes";
import courseRouter from "../src/routes/courseRoutes";
import assignRouter from "../src/routes/assignRoutes";
import enrollRouter from "../src/routes/enrollRoutes";
import profRouter from "../src/routes/professorRoutes";
import resultRouter from "../src/routes/resultRoute";
import adminRouter from "../src/routes/adminRoutes";
import studentRouter from "../src/routes/studentRoutes";
import graphRouter from "../src/routes/graphsRoutes";
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";

//initialization
dotenv.config();
const app = express();
//middleware
// Specify the allowed origin(s)
const allowedOrigins = [
  "https://erp-frontend-alpha.vercel.app",
  "http://localhost:3000",
];

// Enable CORS for all routes
app.use(
  cors({
    origin: function (origin: any, callback) {
      // Check if the origin is in the allowed list, or if it's a same-origin request (null)
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Your routes and other middleware
// ...

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// HealthCheckApi
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.cookie("myCookie", "cookieValue", { maxAge: 900000, httpOnly: true });
  res.status(200).json({
    type: "Success",
    msg: "Heath Check Api",
  });
});

//routes
app.use("/backend-api/auth", userRouter);
app.use("/backend-api/department", departmentRouter);
app.use("/backend-api/course", courseRouter);
app.use("/backend-api/assign", assignRouter);
app.use("/backend-api/enroll", enrollRouter);
app.use("/backend-api/prof", profRouter);
app.use("/backend-api/result", resultRouter);
app.use("/backend-api/admin", adminRouter);
app.use("/backend-api/student", studentRouter);
app.use("/backend-api/graph", graphRouter);

//error handling
app.use(
  (err: errorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
      type: "error",
      msg: err.message,
    });
  }
);

//server activation
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

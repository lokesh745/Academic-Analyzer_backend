import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler"; // Replace with the actual path

interface Payload {
  email: string;
  // Add other properties based on your JWT payload structure
}

declare global {
  namespace Express {
    interface Request {
      uniqueIdentity?: string;
      role?: string;
      departmentName?: string;
    }
  }
}

export const verifyJwt = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new errorHandler(401, "Unauthorized Request"));
    }

    const secret_key: string | undefined = process.env.ACCESS_TOKEN_PUBLIC;
    if (!secret_key) {
      return next(
        new errorHandler(500, "Internal Server Error: Missing secret key")
      );
    }

    let decode: Payload;

    try {
      decode = jwt.verify(token, secret_key) as Payload;
    } catch (error) {
      return next(new errorHandler(401, "Unauthorized Request: Invalid token"));
    }

    const user = await prisma.user.findUnique({
      where: {
        email: decode.email,
      },
    });
    if (!user) {
      return next(new errorHandler(401, "Invalid AccessToken"));
    }
    req.uniqueIdentity = user.email;
    req.role = user.role;
    req.departmentName = user.department_name;
    next();
  } catch (error) {
    return next(new errorHandler(500, "Internal server error"));
  }
};

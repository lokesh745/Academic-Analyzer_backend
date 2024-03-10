import { Request, Response, NextFunction } from "express";
import { user } from "../../models/user.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../utils/generateTokens";

export type cookieOPtions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: any;
};

export const login = async (
  req: Request<{}, {}, user>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (email.trim() === "") {
      return next(new errorHandler(400, "email is Empty"));
    }
    const old_user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!old_user) {
      return next(new errorHandler(404, "User Does Not Exist"));
    }
    const isMatch = bcrypt.compareSync(password, old_user.password);
    if (!isMatch) {
      return next(new errorHandler(401, "Invalid User Password"));
    }
    const token = await generateAccessToken(old_user.email);
    const options: cookieOPtions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("accessToken", token, options);

    res.status(200).json({
      type: "Success",
      id: old_user.id,
      role: old_user.role,
      msg: "User Logged In Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

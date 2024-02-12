import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import { cookieOPtions } from "./login";
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.uniqueIdentity,
    },
  });
  if (user) {
    const options: cookieOPtions = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).clearCookie("accessToken", options).json({
      type: "Success",
      msg: "User Logged Out Successfully",
    });
  } else {
    return next(new errorHandler(500, "Something Went Wrong"));
  }
};

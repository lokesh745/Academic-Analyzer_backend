import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";

export const myProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.uniqueIdentity,
      },
      select: {
        email: true,
        role: true,
      },
    });
    if (user) {
      return res.status(200).json({
        type: "Success",
        msg: "User Logged In Successfully",
        user,
      });
    } else {
      return res.status(404).json({
        type: "Warning",
        msg: "User Not Found !",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Something Went Wrong"));
  }
};

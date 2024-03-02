import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

export const getUserDetails = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  const data = req.query.id;
  try {
    const result = await prisma.user.findUnique({
      where: {
        rollNo: data,
      },
    });
    if (result) {
      res.status(200).json({
        type: "Success",
        list: result,
      });
    } else {
      res.status(404).json({
        type: "Error",
        msg: "Data Not Found",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

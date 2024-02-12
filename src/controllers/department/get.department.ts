import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
export const getDeptInfo = async (
  req: Request<{}, {}, {}, { code: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.query.code;
    const data = await prisma.department.findUnique({
      where: {
        code: code,
      },
    });
    if (data?.code) {
      res.status(200).json({
        type: "Success",
        data: data,
      });
    } else {
      res.status(404).json({
        type: "error",
        msg: "Data not found",
      });
    }
  } catch (error) {
    // console.log(error);
    return next(new errorHandler(500, "Internal server error"));
  }
};

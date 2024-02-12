import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
export const deleteDept = async (
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
      await prisma.department.delete({
        where: {
          code,
        },
      });
      res.status(200).json({
        type: "success",
        msg: "Department Deleted Successfully",
      });
    } else {
      return next(new errorHandler(404, "Entry Not Found"));
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal server error"));
  }
};

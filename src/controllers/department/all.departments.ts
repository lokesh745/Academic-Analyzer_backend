import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

export const allDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.department.findMany();
    res.status(200).json({
      type: "Success",
      list: data,
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

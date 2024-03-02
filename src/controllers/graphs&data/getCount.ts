import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
export const getCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const TOTAL = await prisma.user.count();
    const TOTAL2 = await prisma.department.count();
    const TOTAL3 = await prisma.course.count();
    const STUDENT = await prisma.user.count({
      where: {
        role: process.env.STUDENT,
      },
    });

    const PROF = await prisma.user.count({
      where: {
        role: process.env.PROFESSOR,
      },
    });
    res.status(200).json({
      type: "Success",
      total: TOTAL,
      student: STUDENT,
      professor: PROF,
      dept: TOTAL2,
      courses: TOTAL3,
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

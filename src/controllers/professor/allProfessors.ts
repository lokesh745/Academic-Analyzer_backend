import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

export const allProf = async (
  req: Request<{}, {}, {}, { department: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const dept = req.query.department;
    if (dept.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          AND: [{ role: process.env.PROFESSOR }, { department_name: dept }],
        },
        select: {
          rollNo: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNo: true,
          role: true,
          department_name: true,
        },
      });
      res.status(200).json({
        type: "Success",
        list: data,
      });
    } else {
      const data = await prisma.user.findMany({
        where: {
          role: process.env.PROFESSOR,
        },
        select: {
          id: true,
          rollNo: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNo: true,
          role: true,
          department_name: true,
        },
      });
      res.status(200).json({
        type: "Success",
        list: data,
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

interface parameters {
  role: string;
  department: string;
}

export const getAllUsers = async (
  req: Request<{}, {}, {}, parameters>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role, department } = req.query;
    if (role.length > 0 && department.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          AND: [{ role }, { department_name: department }],
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
    } else if (role.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          role: role,
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
    } else if (department.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          department_name: department,
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
    }
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

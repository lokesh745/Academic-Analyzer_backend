import { Request, Response, NextFunction } from "express";
import { department } from "../../models/department.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

export const addDepartment = async (
  req: Request<{}, {}, department>,
  res: Response,
  next: NextFunction
) => {
  try {
    const dep = await prisma.department.findUnique({
      where: {
        code: req.body.code,
      },
    });
    if (dep) {
      return next(new errorHandler(409, "Duplicate Department_Code Error"));
    }
    const newDepartment = await prisma.department.create({
      data: {
        code: req.body.code,
        name: req.body.name,
      },
    });
    res.status(201).json({
      type: "success",
      newDepartment,
      msg: "Department Added Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal server error"));
  }
};

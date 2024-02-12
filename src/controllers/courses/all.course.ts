import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

type filters = {
  sem: string;
  department: string;
};

export const allCourses = async (
  req: Request<{}, {}, {}, filters>,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = [];
    if (req.query.sem != "" && req.query.department != "") {
      data = await prisma.course.findMany({
        where: {
          AND: [
            { sem: Number(req.query.sem) },
            { department_name: req.query.department },
          ],
        },
      });
    } else if (req.query.sem != "") {
      data = await prisma.course.findMany({
        where: { sem: Number(req.query.sem) },
      });
    } else if (req.query.department != "") {
      data = await prisma.course.findMany({
        where: { department_name: req.query.department },
      });
    } else {
      data = await prisma.course.findMany();
    }
    res.status(200).json({
      type: "Success",
      list: data,
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

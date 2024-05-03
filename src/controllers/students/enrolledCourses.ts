import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

type customFilters = {
  sem: string;
  year: string;
  user_id: number;
};

export const enrolledToStudent = async (
  req: Request<{}, {}, {}, customFilters>,
  res: Response,
  next: NextFunction
) => {
  try {
    let stud = [];
    if (req.query.sem != "" && req.query.year != "") {
      stud = await prisma.enrollment.findMany({
        where: {
          AND: [
            { user_id: Number(req.query.user_id) },
            { sem: Number(req.query.sem) },
            { year: Number(req.query.year) },
          ],
        },
        select: {
          course: true,
          year: true,
        },
      });
    } else if (req.query.sem != "") {
      stud = await prisma.enrollment.findMany({
        where: {
          AND: [
            { user_id: Number(req.query.user_id) },
            { sem: Number(req.query.sem) },
          ],
        },
        select: {
          course: true,
          year: true,
        },
      });
    } else if (req.query.year != "") {
      stud = await prisma.enrollment.findMany({
        where: {
          AND: [
            { user_id: Number(req.query.user_id) },
            { year: Number(req.query.year) },
          ],
        },
        select: {
          course: true,
          year: true,
        },
      });
    } else {
      stud = await prisma.enrollment.findMany({
        where: {
          user_id: Number(req.query.user_id),
        },
        select: {
          course: true,
          year: true,
        },
      });
    }
    res.status(200).json({
      type: "Success",
      list: stud,
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

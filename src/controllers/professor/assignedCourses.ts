import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

type filters = {
  sem: string;
  year: string;
};

type customFilters = {
  sem: string;
  year: string;
  user_id: number;
};

export const assignCourses = async (
  req: Request<{}, {}, {}, filters>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.uniqueIdentity,
      },
      select: {
        id: true,
      },
    });
    let prof = [];
    if (req.query.sem != "" && req.query.year != "") {
      prof = await prisma.assign.findMany({
        where: {
          AND: [
            { user_id: user?.id },
            { sem: Number(req.query.sem) },
            { year: Number(req.query.year) },
          ],
        },
      });
    } else if (req.query.sem != "") {
      prof = await prisma.assign.findMany({
        where: {
          AND: [{ user_id: user?.id }, { sem: Number(req.query.sem) }],
        },
      });
    } else if (req.query.year != "") {
      prof = await prisma.assign.findMany({
        where: {
          AND: [{ user_id: user?.id }, { year: Number(req.query.year) }],
        },
      });
    } else {
      prof = await prisma.assign.findMany({
        where: {
          user_id: user?.id,
        },
      });
    }
    res.status(200).json({
      type: "Success",
      list: prof,
    });
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

export const assignToProf = async (
  req: Request<{}, {}, {}, customFilters>,
  res: Response,
  next: NextFunction
) => {
  try {
    let prof = [];
    if (req.query.sem != "" && req.query.year != "") {
      prof = await prisma.assign.findMany({
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
      prof = await prisma.assign.findMany({
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
      prof = await prisma.assign.findMany({
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
      prof = await prisma.assign.findMany({
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
      list: prof,
    });
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

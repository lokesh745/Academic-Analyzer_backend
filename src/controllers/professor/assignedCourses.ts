import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import fs from "fs";
import jsonGenerator from "csvtojson";
import path from "path";

type filters = {
  sem: string;
  year: string;
};

type customFilters = {
  sem: string;
  year: string;
  user_id: number;
};

type multpleEntryCsv = {
  rollNo: string;
  course_id: string;
  year: number;
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

export const assignMultipleToProf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
  const data: Array<multpleEntryCsv> = await jsonGenerator().fromFile(filepath);
  try {
    data.forEach(async (item) => {
      const user = await prisma.user.findUnique({
        where: {
          rollNo: item.rollNo,
        },
        select: {
          id: true,
        },
      });
      const course = await prisma.course.findUnique({
        where: {
          id: item.course_id,
        },
        select: {
          id: true,
          sem: true,
        },
      });
      if (user && course) {
        const res = await prisma.assign.findMany({
          where: {
            AND: [
              { user_id: Number(user.id) },
              { course_id: course.id },
              { sem: Number(course.sem) },
              { year: Number(item.year) },
            ],
          },
        });

        if (res.length === 0) {
          await prisma.assign.create({
            data: {
              user_id: Number(user.id),
              course_id: course.id,
              sem: Number(course.sem),
              year: Number(item.year),
            },
          });
        }
      }
    });
    res.status(200).json({
      type: "Success",
      msg: "Professors Assigned Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  } finally {
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
  }
};

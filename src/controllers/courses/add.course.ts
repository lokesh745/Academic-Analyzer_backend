import { Request, Response, NextFunction } from "express";
import { course } from "../../models/course.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
export const addCourse = async (
  req: Request<{}, {}, course>,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: req.body.id,
      },
    });
    if (course) {
      return next(new errorHandler(409, "Duplicate course_code Error"));
    } else {
      const newCourse = await prisma.course.create({
        data: {
          id: req.body.id,
          course_name: req.body.course_name,
          credits: req.body.credits,
          sem: req.body.sem,
          department_name: req.body.department_name,
        },
      });
      res.status(201).json({
        type: "success",
        newCourse,
        msg: "Course Added Successfully",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal server error"));
  }
};

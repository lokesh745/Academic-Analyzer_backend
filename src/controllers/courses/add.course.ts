import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { course } from "../../models/course.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import jsonGenerator from "csvtojson";
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

export const addMultipleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
  const data: Array<course> = await jsonGenerator().fromFile(filepath);
  try {
    console.log(data);
    console.log(data.length);
    data.forEach(async (item) => {
      const result = await prisma.course.findUnique({
        where: {
          id: item.id,
        },
      });
      if (!result) {
        await prisma.course.create({
          data: {
            id: item.id,
            course_name: item.course_name,
            credits: Number(item.credits),
            sem: Number(item.sem),
            department_name: item.department_name,
          },
        });
      }
    });
    res.status(201).json({
      type: "success",
      msg: "Course Added Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal server error"));
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

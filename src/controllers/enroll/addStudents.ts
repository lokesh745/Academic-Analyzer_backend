import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { enroll, multipleEnroll } from "../../models/enroll.model";
import jsonGenerator from "csvtojson";
import path from "path";
import fs from "fs";
import { decodeRole } from "../../utils/getRole";
import prisma from "../../utils/prisma";
export const addStudent = async (
  req: Request<{}, {}, enroll>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id,
      },
      select: {
        role: true,
      },
    });

    if (user && user.role == process.env.STUDENT) {
      const data = await prisma.enrollment.findUnique({
        where: {
          course_id_year_sem_user_id: {
            course_id: req.body.course_id,
            year: req.body.year,
            sem: req.body.sem,
            user_id: req.body.user_id,
          },
        },
      });
      if (data) {
        return next(new errorHandler(409, "Already Enrolled"));
      } else {
        const newEnroll = await prisma.enrollment.create({
          data: {
            user_id: req.body.user_id,
            course_id: req.body.course_id,
            year: req.body.year,
            sem: req.body.sem,
          },
        });
        if (newEnroll) {
          res.status(201).json({
            type: "Success",
            msg: "Student Enrolled Successfully",
            newEnroll,
          });
        } else {
          res.status(401).json({
            type: "warning",
            msg: "something went wrong",
          });
        }
      }
    } else {
      res.status(401).json({
        type: "error",
        msg: "authorization error prof & admin can't be enrolled",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

export const addMultipleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
  const data: Array<multipleEnroll> = await jsonGenerator().fromFile(filepath);
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
        const res = await prisma.enrollment.findMany({
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
          await prisma.enrollment.create({
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
      msg: "Students Enrolled Successfully",
    });
  } catch (error: any) {
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

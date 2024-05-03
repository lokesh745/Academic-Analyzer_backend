import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { result, result_multiple } from "../../models/result.model";
import prisma from "../../utils/prisma";
import fs from "fs";
import path from "path";
import jsonGenerator from "csvtojson";
import { marksToGrade, result_data_object } from "../../utils/resultData";
import { resultDetails } from "../../utils/resultData";
import { assign as assignType } from "../../models/assign.model";
import { enroll } from "../../models/enroll.model";
import { exit } from "process";

export const addNewResult = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
    const data: Array<result> = await jsonGenerator().fromFile(filepath);
    res.status(200).json({
      type: "Success",
      msg: "Result Added Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

export const addMultipleResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
  try {
    const data: Array<result_multiple> =
      await jsonGenerator().fromFile(filepath);
    data.forEach(async (item) => {
      const courseDetails = await prisma.course.findUnique({
        where: {
          id: item.course_id,
        },
        select: {
          sem: true,
          credits: true,
          id: true,
        },
      });
      const prof = await prisma.user.findUnique({
        where: {
          email: req.uniqueIdentity,
        },
        select: {
          id: true,
          department_name: true
        },
      });
      const stud = await prisma.user.findUnique({
        where: {
          rollNo: String(item.rollNo),
        },
        select: {
          id: true,
        },
      });

      if (courseDetails?.credits !== undefined) {
        const check1: Array<assignType> = await prisma.assign.findMany({
          where: {
            AND: [
              { sem: courseDetails?.sem },
              { year: Number(item.year) },
              { course_id: courseDetails?.id },
              { user_id: prof?.id },
            ],
          },
          select: {
            sem: true,
            year: true,
            course_id: true,
            user_id: true
          }
        });
        const check2: Array<enroll> = await prisma.enrollment.findMany({
          where: {
            AND: [
              { sem: courseDetails?.sem },
              { year: Number(item.year) },
              { course_id: courseDetails?.id },
              { user_id: stud?.id },
            ],
          },
          select: {
            sem: true,
            year: true,
            course_id: true,
            user_id: true
          }
        });
        if (check1.length !== 0 && check2.length !== 0) {
          const output = resultDetails(item.course_id);
          console.log(output);
          let total = output.ese + output.isa + output.mse;
          let obtained = Number(item.ese) + Number(item.isa) + Number(item.mse);
          let percentage = (obtained / total) * 100;
          const grade = marksToGrade(percentage);
          let totalPoints = courseDetails.credits * grade.grade;
          console.log(totalPoints, prof?.department_name);

          const duplicate = await prisma.result.findMany({
            where: {
              AND: [
                { sem: courseDetails.sem },
                { departmentId: prof?.department_name },
                { courseID: courseDetails.id },
                { rollNo: String(item.rollNo) },
                { year: Number(item.year) }
              ]
            }
          });
          if (duplicate.length !== 0) {
            return;
          }
          else {
            await prisma.result.create({
              data: {
                sem: courseDetails.sem,
                courseID: courseDetails.id,
                departmentId: String(prof?.department_name),
                rollNo: String(item.rollNo),
                mse: Number(item.mse),
                ese: Number(item.ese),
                isa: Number(item.isa),
                creditEarned: courseDetails.credits,
                gradeObtained: String(grade.letter),
                gradePoint: grade.grade,
                total: totalPoints,
                year: Number(item.year)
              }
            });
          }
        }
      }
    });
    res.status(200).json({
      type: "Success",
      msg: "Records added successfully",
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

import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { result } from "../../models/result.model";
import prisma from "../../utils/prisma";

export const addNewResult = async (
  req: Request<{}, {}, result>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await prisma.result.findFirst({
      where: {
        AND: [
          { rollNo: req.body.rollNo },
          { departmentId: req.body.departmentId },
          { sem: req.body.sem },
        ],
      },
    });
    if (result) {
      res.status(409).json({
        type: "Success",
        msg: "Record Already Present ",
      });
    } else {
      const data = await prisma.result.create({
        data: {
          sem: req.body.sem,
          courseID: req.body.courseId,
          departmentId: req.body.departmentId,
          rollNo: req.body.rollNo,
          credits_earned: req.body.credits_earned,
        },
      });
      res.status(200).json({
        type: "Success",
        msg: "Result Added Successfully",
        list: data,
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

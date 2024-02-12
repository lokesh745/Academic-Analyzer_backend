import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { assign } from "../../models/assign.model";
import prisma from "../../utils/prisma";

export const addProfessor = async (
  req: Request<{}, {}, assign>,
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

    if (user && user.role == process.env.PROFESSOR) {
      const data = await prisma.assign.findUnique({
        where: {
          course_id_year_sem: {
            course_id: req.body.course_id,
            year: req.body.year,
            sem: req.body.sem,
          },
        },
      });
      if (data) {
        return next(new errorHandler(409, "Already Assigned"));
      } else {
        const newAssign = await prisma.assign.create({
          data: {
            user_id: req.body.user_id,
            course_id: req.body.course_id,
            year: req.body.year,
            sem: req.body.sem,
          },
        });
        if (newAssign) {
          res.status(201).json({
            type: "Success",
            msg: "Professor Successfully Assigned",
            newAssign,
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
        msg: "authorization error role is student",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

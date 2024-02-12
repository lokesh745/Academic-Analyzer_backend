import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { enroll } from "../../models/enroll.model";

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
      const newEnroll = await prisma.enrollment.create({
        data: {
          user_id: req.body.user_id,
          course_id: req.body.course_id,
          year: req.body.year,
          sem: req.body.sem,
          prof: req.body.prof,
        },
      });
      if (newEnroll) {
        res.status(201).json({
          type: "Success",
          newEnroll,
        });
      } else {
        res.status(401).json({
          type: "warning",
          msg: "something went wrong",
        });
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

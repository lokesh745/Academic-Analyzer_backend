import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";

export const getCourse = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.query.id;
    const result = await prisma.course.findUnique({
      where: {
        id: data,
      },
    });
    if (result) {
      res.status(200).json({
        type: "Success",
        list: result,
      });
    } else {
      res.status(404).json({
        type: "error",
        msg: "Course Not Found",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";

export const deleteCourse = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.query.id;
    if (data) {
      await prisma.course.delete({
        where: {
          id: data,
        },
      });
      res.status(200).json({
        type: "Success",
        msg: "Course Deleted Successfully",
      });
    } else {
      res.status(404).json({
        type: "Error",
        msg: "Id Not Found",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

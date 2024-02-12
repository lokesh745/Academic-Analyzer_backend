import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";

export const deleteUser = async (
  req: Request<{}, {}, {}, { rollNo: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.query.rollNo;
    if (data) {
      await prisma.user.delete({
        where: {
          rollNo: data,
        },
      });
      res.status(200).json({
        type: "Success",
        msg: "User Deleted Successfully",
      });
    } else {
      res.status(404).json({
        type: "Error",
        msg: "rollNo Not Found",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

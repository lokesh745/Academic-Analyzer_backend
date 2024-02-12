import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

type feild = {
  id: string;
};

export const allStudents = async (
  req: Request<{}, {}, {}, feild>,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = [];
    data = await prisma.enrollment.findMany({
      where: {
        prof: Number(req.query.id),
      },
      select: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            department_name: true,
            email: true,
            rollNo: true,
            phoneNo: true,
          },
        },
      },
    });

    res.status(200).json({
      type: "Success",
      list: data,
    });
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

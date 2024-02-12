import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";

type Filter = {
  dept: string;
  batch: string;
};

export const List = async (
  req: Request<{}, {}, {}, Filter>,
  res: Response,
  next: NextFunction
) => {
  const dept = req.query.dept;
  const batch = req.query.batch;
  try {
    if (dept.length > 0 && batch.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          AND: [
            { role: process.env.STUDENT },
            { department_name: dept },
            { passout_year: Number(batch) },
          ],
        },
      });
      res.status(200).json({
        type: "Success",
        list: data,
      });
    } else if (dept.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          AND: [{ role: process.env.STUDENT }, { department_name: dept }],
        },
      });
      res.status(200).json({
        type: "Success",
        list: data,
      });
    } else if (batch.length > 0) {
      const data = await prisma.user.findMany({
        where: {
          AND: [{ role: process.env.STUDENT }, { passout_year: Number(batch) }],
        },
      });
      res.status(200).json({
        type: "Success",
        list: data,
      });
    } else {
      const data = await prisma.user.findMany({
        where: {
          role: process.env.STUDENT,
        },
      });
      res.status(200).json({
        type: "Success",
        list: data,
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
export const editDept = async (
  req: Request<{}, {}, { code: string; name: string }, { code: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.query.code;
    const old_data = await prisma.department.findUnique({
      where: {
        code: code,
      },
    });
    if (old_data) {
      const new_data = await prisma.department.update({
        where: {
          code,
        },
        data: {
          code: req.body.code,
          name: req.body.name,
        },
      });
      res.status(200).json({
        type: "Success",
        data: new_data,
        msg: "Department Updated Successfully",
      });
    } else {
      res.status(404).json({
        type: "Error",
        msg: "Department not found",
      });
    }
  } catch (error) {
    return next(new errorHandler(500, "Internal server error"));
  }
};
